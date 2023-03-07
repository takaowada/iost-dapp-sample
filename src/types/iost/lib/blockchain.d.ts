declare namespace IOST {
  class Blockchain {
    constructor(IOST: IOST)

    getChainInfo: () => Promise<string>
    getBlockByHash: (hash: string, complete: boolean) => Promise<string>
    getBlockByNum: (num: number, complete: boolean) => Promise<string>
    getBalance: (
      address: string,
      tokenSymbol?: string,
      useLongestChain?: number
    ) => Promise<string>
    getToken721Balance: (
      address: string,
      tokenSymbol: string,
      useLongestChain?: number
    ) => Promise<string>
    getToken721Metadata: (
      tokenSymbol: string,
      tokenID: string,
      useLongestChain?: number
    ) => Promise<string>
    getToken721Owner: (
      tokenSymbol: string,
      tokenID: string,
      useLongestChain?: number
    ) => Promise<string>
    getContract: (id: string, useLongestChain?: number) => Promise<string>
    getContractStorage: (
      contractID: string,
      key: string,
      field?: string,
      pending?: boolean
    ) => Promise<{ data: string }>
    getContractStorageFields: (
      contractID: string,
      key: string,
      pending?: boolean
    ) => Promise<any>
    getAccountInfo: (id: string, reversible: boolean) => Promise<string>
    getGasRatio: () => Promise<string>
    getGasUsage: (actionName: string) => Promise<string>
    getExchangeContractInfo: () => Promise<string>
  }
}
