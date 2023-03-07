declare namespace IOST {
  class IOST {
    public rpc?: RPC;
    public account?: Account;
    public serverTimeDif: number;
    public config: Config;

    constructor(config?: Config);

    callABI: (contract: string, abi: string, args: ArgTypes[]) => Tx
    transfer: (
      token: string,
      from: string,
      to: string,
      amount: string,
      memo?: string
    ) => Tx;
    newAccount: (
      name: string,
      creator: string,
      ownerkey: string,
      activekey: string,
      initialRAM: number,
      initialGasPledge: number
    ) => Tx;
    signAndSend: (tx: Tx) => CallBack;
    currentAccount: string;
    currentRPC: RPC;
    setRPC: (rpc: RPC) => Promise<void>;
    setAccount: (account: string) => void;
  }

  type ArgTypes = string | number | boolean;

  interface Config {
    gasRatio: number;
    gasLimit: number;
    delay: number;
    expiration: number;
    defaultLimit: 'unlimited' | number;
  }
}
