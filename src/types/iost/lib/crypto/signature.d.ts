declare namespace IOST {
  class Signature {
    public algorithm?: string
    public pubkey?: string
    public sig?: string

    constructor(info: string | null, keyPair: KeyPair)

    toJSON: () => {
      algorithm: 'SECP256K1' | 'ED25519'
      public_key: string
      signature: string
    }
    static fromJSON: (json: string) => Signature
    verify: (info: string) => boolean
  }
}
