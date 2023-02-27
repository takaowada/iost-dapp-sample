import Iost from 'iost';

const CONTRACT_ADDRESS = 'Contract8iaQifhsGgbABKXFuen6tLL4xbonD87TiSWTYh3VLV93';
const CONTRACT_OWNER = 'alice';
const IOST_NODE_URL = 'http://localhost:30001'

export default class IOSUtil {
  private static _instance: IOSUtil;
  private _iwallet?: any;
  private _iost?: Iost.IOST;
  private _account?: Iost.Account;
  private static _login: boolean = false;

  private constructor() {
    this.init();
  }

  static getInstance() {
    console.log('getInstance')
    if (!IOSUtil._instance) {
      IOSUtil._instance = new IOSUtil();
      console.log('New IOST')
    }
    if (!IOSUtil._login) {
      throw new Error('Not logged in.');
    }
    return IOSUtil._instance;
  }

  public async init() {
    this._iwallet = window['IWalletJS'];
    if (!this._iwallet) {
      throw new Error('Please use Chrome, And install iWallet extension. ');
    }
    try {
      this._account = await this._iwallet.enable();
      console.log('Login account:', this._account);
    } catch (e) {
      throw new Error('The iWallet locked. Unlock iWallet. ');
    }
    if (!this._account) {
      throw new Error('Please login.');
    }
    this._iost = this._iwallet.newIOST(Iost)
    if (!this._iost) {
      throw new Error('Please login.');
    }

    const provider = new Iost.HTTPProvider(IOST_NODE_URL);
    const rpc = new Iost.RPC(provider);
    this._iost.setAccount(this._account);
    this._iost.rpc = rpc;
    this._iost.currentRPC = rpc;
    this._iwallet.iost.setRPC(rpc);
    this._iost.config.gasLimit = 1000000;

    IOSUtil._login = true;
  }

  getAccount() {
    return this._account;
  }

  async _callABI(contract: string, method: string, args: []) {
    console.log('Start to callABI().');
    const tx = this._iost.callABI(contract, method, args);
    tx.setChainID(1020);
    tx.amount_limit = [{ token: "*", value: "unlimited" }];

    const handler = this._iost.signAndSend(tx);
    return handler;
  };

  async putMemo(id: string, memo: string) {
    return this._callABI(CONTRACT_ADDRESS, 'putMemo', [id, memo]);
  }

  async getMemos() {
    const res = await this._iost.rpc.blockchain.getContractStorageFields(CONTRACT_ADDRESS, this._iost.currentAccount, true);
    if (!res || !res.fields) {
      return [];
    }
    const ids = res.fields;
    const memos: Memo[] = [];
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
    return memos;
  }
}
