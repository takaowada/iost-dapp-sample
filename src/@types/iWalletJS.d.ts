interface Window {
  IWalletJS?: {
    account?: { name: string; network: Network };
    enable: () => Promise<string>;
    network?: string;
    newIOST: (IOST: any) => void;
    setAccount: (params: { account: string; network: string }) => void;
  };
}

type chrome = any

type Network = 'MAINNET' | 'TESTNET' | 'LOCALNET'
