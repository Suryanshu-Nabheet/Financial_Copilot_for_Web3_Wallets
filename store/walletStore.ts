import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  transactions: any[];
  tokens: any[];
  setAddress: (address: string | null) => void;
  setBalance: (balance: string | null) => void;
  setIsConnected: (connected: boolean) => void;
  setTransactions: (transactions: any[]) => void;
  setTokens: (tokens: any[]) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      balance: null,
      isConnected: false,
      transactions: [],
      tokens: [],
      setAddress: (address) => set({ address }),
      setBalance: (balance) => set({ balance }),
      setIsConnected: (isConnected) => set({ isConnected }),
      setTransactions: (transactions) => set({ transactions }),
      setTokens: (tokens) => set({ tokens }),
      reset: () =>
        set({
          address: null,
          balance: null,
          isConnected: false,
          transactions: [],
          tokens: [],
        }),
    }),
    {
      name: "wallet-storage",
    }
  )
);

