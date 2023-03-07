import Iost from 'iost';
import { Memo } from './types/memo';

const CONTRACT_ADDRESS = 'Contract8iaQifhsGgbABKXFuen6tLL4xbonD87TiSWTYh3VLV93';
const CONTRACT_OWNER = 'alice';

export interface Network {
  host: string;
  id: string;
  chainId: number;
  gasRatio: number;
  gasLimit: number;
  delay: number;
  expiration: number;
  defaultLimit: number;
}

const MAINNET: Network = {
  host: 'http://api.iost.io',
  id: 'MAINNET',
  chainId: 1024,
  gasRatio: 1,
  gasLimit: 2000000,
  delay: 0,
  expiration: 90,
  defaultLimit: 1000000,
};

const LOCALNET: Network = {
  host: 'http://127.0.0.1:30001',
  id: 'LOCALNET',
  chainId: 1020,
  gasRatio: 1,
  gasLimit: 2000000,
  delay: 0,
  expiration: 90,
  defaultLimit: 1000000,
};

export default class IOSUtil {
  private static _instance: IOSUtil;
  private _iwallet: any = null;
  private _iost: IOST.IOST;
  private _network: Network = LOCALNET;
  private _account: string = '';
  private static _login: boolean = false;

  private constructor() {
    this._iost = new IOST.IOST();
  }

  static getInstance(): IOSUtil {
    console.log('getInstance')
    if (!IOSUtil._instance) {
      IOSUtil._instance = new IOSUtil();
      console.log('New IOST')
    }
    return IOSUtil._instance;
  }

  public async init(): Promise<void> {
    console.log('init');
    this._iwallet = window['IWalletJS'];

    console.log('iwallet:', this._iwallet);

    if (!this._iwallet) {
      throw new Error('Please use Chrome, And install iWallet extension. ');
    }

    this._iost = this._iwallet.newIOST(Iost)
    if (!this._iost) {
      throw new Error('Please use iWallet plugin.');
    }

    if (this._iwallet.network === MAINNET.id) {
      this._network = MAINNET;
    }
    const provider = new Iost.HTTPProvider(this._network.host);
    const rpc = new Iost.RPC(provider);
    this._iost.rpc = rpc;
    this._iost.currentRPC = rpc;
    this._iwallet.iost.setRPC(rpc);
    this._iost.config.gasLimit = 1000000;

    try {
      this._account = await this._iwallet.enable();
      console.log('Login account:', this._account);
    } catch (e) {
      throw new Error('The iWallet locked. Unlock iWallet. ');
    }

    if (!this._account) {
      throw new Error('Please login.');
    }
    this._iost.setAccount(this._account);

    console.log(`Logged in by ${this._account}`);
    IOSUtil._login = true;
  }

  getAccount(): string {
    return this._account;
  }

  async _callABI(contract: string, method: string, args: any[]): Promise<IOST.CallBack> {
    console.log('Start to callABI().');
    const tx = this._iost.callABI(contract, method, args);
    tx.setChainID(this._network.chainId);
    tx.amount_limit = [{ token: "*", value: "unlimited" }];

    const handler = this._iost.signAndSend(tx);
    return handler;
  };

  async putMemo(id: string, memo: string): Promise<IOST.CallBack> {
    return this._callABI(CONTRACT_ADDRESS, 'putMemo', [id, memo]);
  }

  async getMemos(): Promise<Memo[]> {
    const memos: Memo[] = [];
    if (this._iost && this._iost.rpc) {
      const res = await this._iost.rpc.blockchain.getContractStorageFields(CONTRACT_ADDRESS, this._iost.currentAccount, true);
      if (!res || !res.fields) {
        return [];
      }
      const ids = res.fields;
      for (let i = 0; i < ids.length; i++) {
        const res = await this._iost.rpc.blockchain.getContractStorage(
          CONTRACT_ADDRESS,
          this._iost.currentAccount,
          ids[i],
          true
        );
        let memo = res.data;
        if (!memo) {
          memo = '';
        }
        memos.push({ id: ids[i], memo: memo });
      }
    }

    return memos;
  }
}
