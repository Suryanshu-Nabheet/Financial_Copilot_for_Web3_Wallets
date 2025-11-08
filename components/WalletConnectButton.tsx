"use client";

import { useAccount, useDisconnect, useBalance, useConnect } from "wagmi";
import { useWalletStore } from "@/store/walletStore";
import { useEffect } from "react";
import { formatAddress } from "@/lib/utils";
import { Wallet, LogOut } from "lucide-react";

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });
  const { setAddress, setBalance, setIsConnected, reset } = useWalletStore();

  useEffect(() => {
    if (address) {
      setAddress(address);
      setIsConnected(true);
      if (balance) {
        setBalance(balance.formatted);
      }
    } else {
      reset();
    }
  }, [address, balance, setAddress, setBalance, setIsConnected, reset]);

  const handleConnect = () => {
    const injectedConnector = connectors.find((c) => c.id === "injected");
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-400">Balance</div>
          <div className="text-lg font-semibold neon-blue">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ETH` : "..."}
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg border border-gray-800">
          <Wallet className="w-4 h-4" />
          <span className="text-sm font-mono">{formatAddress(address)}</span>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
    >
      <Wallet className="w-5 h-5" />
      Connect Wallet
    </button>
  );
}

