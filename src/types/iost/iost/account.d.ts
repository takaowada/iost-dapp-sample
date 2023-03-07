declare namespace IOST {
  class Account {
    constructor(id: string)

    addKeyPair: (kp: KeyPair, permission?: string) => void
    getID: () => string
    getKeyPair: (permission: string) => KeyPair
    // static import: (json: string) => void
    sign: (t: Tx, permission: string) => void
    signTx: (t: Tx) => void
  }
}
