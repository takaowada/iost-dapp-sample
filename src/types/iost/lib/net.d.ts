declare namespace IOST {
  class Net {
    constructor(rpc: RPC)

    getProvider: () => HTTPProvider
    getNodeInfo: () => Promise<string>
  }
}
