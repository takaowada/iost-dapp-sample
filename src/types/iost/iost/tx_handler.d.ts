declare namespace IOST {
  class TxHandler {
    public tx: Tx
    public status: 'idle' | 'pending' | 'success' | 'failed'
    public Pending: (response: any) => void
    public Success: (response: any) => void
    public Failed: (res: any) => void

    constructor(tx: Tx, rpc: RPC)

    onPending: (c: CallBack) => TxHandler
    onSuccess: (c: CallBack) => TxHandler
    onFailed: (c: CallBack) => TxHandler
    send: () => TxHandler
    listen: (interval: number, times: number) => null

    static SinpleTx: (
      contract: string,
      abi: string,
      args: any,
      config: Config
    ) => Tx
  }
}
