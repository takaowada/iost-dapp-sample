declare namespace IOST {
  class Transaction {
    constructor(IOST: IOST)

    sendTx: (tx: Tx) => Promise<string>
    getTxByHash: (hash: string) => Promise<string>
    getTxReceiptByHash: (hash: string) => Promise<string>
    getTxReceiptByTxHash: (txHash: string) => Promise<string>
  }
}
