interface Window {
  IWalletJS?: {
    account?: { name: string; network: string };
    enable: () => Promise<string>;
    network?: string;
    newIOST: (IOST: any) => void;
    setAccount: (params: { account: string; network: string }) => void;
  };
}
