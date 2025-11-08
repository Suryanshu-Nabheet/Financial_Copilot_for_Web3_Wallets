"use client";

import { useAccount, useDisconnect, useBalance, useConnect } from "wagmi";
import { useWalletStore } from "@/store/walletStore";
import { useEffect, useState } from "react";
import { formatAddress } from "@/lib/utils";
import { Wallet, LogOut, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
  });
  const { setAddress, setBalance, setIsConnected, reset } = useWalletStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckingWallet, setIsCheckingWallet] = useState(false);

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

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message || "Failed to connect wallet");
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  // Check if wallet is available on mount
  useEffect(() => {
    if (typeof window !== "undefined" && connectors.length === 0) {
      // Wait a bit for connectors to initialize
      const timer = setTimeout(() => {
        if (connectors.length === 0 && typeof window.ethereum === "undefined") {
          // Wallet not detected, but don't show error until user tries to connect
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [connectors.length]);

  const handleConnect = async () => {
    try {
      setErrorMessage(null);
      setIsCheckingWallet(true);
      
      // Wait a moment for connectors to initialize if they're not ready
      if (connectors.length === 0) {
        // Wait a bit and check again (connectors might be loading)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // If still no connectors after waiting, check for wallet providers
        if (connectors.length === 0) {
          // Check if we're in a browser environment
          if (typeof window === "undefined") {
            setErrorMessage("Please open this app in a browser with a Web3 wallet installed.");
            setIsCheckingWallet(false);
            return;
          }
          
          // Check for common wallet providers
          const hasMetaMask = typeof window.ethereum !== "undefined";
          const hasOtherWallet = typeof (window as any).web3 !== "undefined";
          
          if (!hasMetaMask && !hasOtherWallet) {
            setErrorMessage(
              "No wallet detected. Please install MetaMask (https://metamask.io) or another Web3 wallet extension, then refresh this page."
            );
            setIsCheckingWallet(false);
            return;
          } else {
            // Wallet exists but connector not ready - wait a bit more and try again
            await new Promise(resolve => setTimeout(resolve, 500));
            if (connectors.length > 0) {
              // Connectors are now ready, continue with connection
            } else {
              setErrorMessage(
                "Wallet detected but not ready. Please refresh the page and try again."
              );
              setIsCheckingWallet(false);
              return;
            }
          }
        }
      }

      // Find the injected connector (works with MetaMask, Coinbase Wallet, etc.)
      const injectedConnector = connectors.find(
        (c) => c.id === "injected" || c.type === "injected"
      );
      
      if (injectedConnector) {
        // Try to connect
        try {
          await connect({ connector: injectedConnector });
        } catch (connectError: any) {
          // Handle specific connection errors
          if (connectError?.message?.includes("User rejected")) {
            setErrorMessage("Connection cancelled. Please try again.");
          } else if (connectError?.message?.includes("No Ethereum provider")) {
            setErrorMessage("No wallet found. Please install MetaMask and refresh the page.");
          } else {
            throw connectError;
          }
        }
      } else {
        // Fallback: try the first available connector
        if (connectors.length > 0 && connectors[0]) {
          await connect({ connector: connectors[0] });
        } else {
          setErrorMessage(
            "No wallet connector available. Please install MetaMask or another Web3 wallet extension."
          );
        }
      }
    } catch (err: any) {
      console.error("Connection error:", err);
      const errorMsg = err.message || "Failed to connect wallet";
      
      // Provide more helpful error messages
      if (errorMsg.includes("User rejected") || errorMsg.includes("user rejected")) {
        setErrorMessage("Connection cancelled. Please approve the connection in your wallet.");
      } else if (errorMsg.includes("No Ethereum provider") || errorMsg.includes("provider")) {
        setErrorMessage("No wallet found. Please install MetaMask and refresh the page.");
      } else {
        setErrorMessage("Failed to connect. Please try again or refresh the page.");
      }
    } finally {
      setIsCheckingWallet(false);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-400 font-medium">Balance</div>
          <div className="text-lg font-bold gradient-text-blue">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} ETH` : "..."}
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 gradient-bg-card rounded-xl border border-white/10">
          <Wallet className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-mono text-gray-200">{formatAddress(address)}</span>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold text-sm shadow-lg hover:shadow-red-500/50"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleConnect}
        disabled={isPending || isCheckingWallet}
        className="btn-gradient px-8 py-3.5 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2.5 text-sm"
      >
        <Wallet className="w-5 h-5" />
        {isPending || isCheckingWallet ? "Connecting..." : "Connect Wallet"}
      </button>
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/30 backdrop-blur-sm"
        >
          <AlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </motion.div>
      )}
    </div>
  );
}

