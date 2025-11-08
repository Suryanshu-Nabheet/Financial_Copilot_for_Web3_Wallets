"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { InsightsCard } from "@/components/InsightsCard";
import { GoalSimulator } from "@/components/GoalSimulator";
import { PortfolioChart } from "@/components/Charts/PortfolioChart";
import { useWalletStore } from "@/store/walletStore";
import { useInsightStore, Insight } from "@/store/insightStore";
import { RefreshCw, TrendingUp, DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { address, isConnected } = useAccount();
  const transactions = useWalletStore((state) => state.transactions);
  const balance = useWalletStore((state) => state.balance);
  const setTransactions = useWalletStore((state) => state.setTransactions);
  const setTokens = useWalletStore((state) => state.setTokens);
  const setBalance = useWalletStore((state) => state.setBalance);
  const { insights, setInsights, isLoading, setIsLoading } = useInsightStore();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      fetchTransactions();
      fetchInsights();
    }
  }, [isConnected, address]);

  const fetchTransactions = async () => {
    if (!address) return;
    
    setIsFetching(true);
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
        setTokens(data.tokens || []);
        setBalance(data.balance || "0");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchInsights = async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          walletAddress: address,
          transactions: transactions, // Pass transactions if Pinecone is empty
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setInsights(data.insights || []);
      }
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalGas = transactions.reduce((sum, tx) => {
    return sum + (parseFloat(tx.gasUsed || "0") * parseFloat(tx.gasPrice || "0"));
  }, 0);

  const totalValue = transactions.reduce((sum, tx) => {
    return sum + parseFloat(tx.value || "0");
  }, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold neon-blue mb-2">
                AI Financial Copilot
              </h1>
              <p className="text-gray-400">
                Your intelligent Web3 wallet assistant
              </p>
            </div>
            <WalletConnectButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Connect Your Wallet to Get Started
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Analyze your transactions, get AI-powered insights, and simulate
              financial goals
            </p>
            <WalletConnectButton />
          </motion.div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-gray-900 rounded-xl border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-400">ETH Balance</span>
                </div>
                <p className="text-2xl font-bold neon-blue">
                  {balance || "0.0000"} ETH
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-gray-900 rounded-xl border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-400">Total Value</span>
                </div>
                <p className="text-2xl font-bold neon-purple">
                  {totalValue.toFixed(4)} ETH
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-gray-900 rounded-xl border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">Total Gas</span>
                </div>
                <p className="text-2xl font-bold text-yellow-400">
                  {totalGas.toFixed(6)} Gwei
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-gray-900 rounded-xl border border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-400">Transactions</span>
                </div>
                <p className="text-2xl font-bold text-green-400">
                  {transactions.length}
                </p>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Insights Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">AI Insights</h2>
                  <button
                    onClick={fetchInsights}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 transition-colors flex items-center gap-2 text-sm"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                    />
                    Regenerate
                  </button>
                </div>

                {isLoading ? (
                  <div className="p-12 bg-gray-900 rounded-xl border border-gray-800 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
                    <p className="text-gray-400">Generating insights...</p>
                  </div>
                ) : insights.length > 0 ? (
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <InsightsCard key={index} insight={insight} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 bg-gray-900 rounded-xl border border-gray-800 text-center">
                    <p className="text-gray-400">
                      No insights available. Make some transactions to get started.
                    </p>
                  </div>
                )}
              </div>

              {/* Goal Simulator */}
              <div className="lg:col-span-1">
                <GoalSimulator />
              </div>
            </div>

            {/* Chart Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Portfolio Trends
              </h2>
              <PortfolioChart />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

