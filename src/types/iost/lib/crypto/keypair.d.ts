declare namespace IOST {
  class KeyPair {
    public id: string
    public t: string
    public seckey: string
    public pubkey: string

    constructor(priKeyBytes: Buffer, algType?: Algorithm)

    static newKeyPair: (algType?: Algorithm) => KeyPair

    B58SecKey: () => string
    B58PubKey: () => string
  }
}
