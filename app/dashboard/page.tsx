"use client";

import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { Navbar } from "@/components/Navbar";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { InsightsCard } from "@/components/InsightsCard";
import { GoalSimulator } from "@/components/GoalSimulator";
import { PortfolioChart } from "@/components/Charts/PortfolioChart";
import { useWalletStore } from "@/store/walletStore";
import { useInsightStore } from "@/store/insightStore";
import { RefreshCw, TrendingUp, DollarSign, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const transactions = useWalletStore((state) => state.transactions);
  const balance = useWalletStore((state) => state.balance);
  const setTransactions = useWalletStore((state) => state.setTransactions);
  const setTokens = useWalletStore((state) => state.setTokens);
  const setBalance = useWalletStore((state) => state.setBalance);
  const { insights, setInsights, isLoading, setIsLoading } = useInsightStore();
  const [isFetching, setIsFetching] = useState(false);

  const fetchTransactions = useCallback(async () => {
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
  }, [address, setTransactions, setTokens, setBalance]);

  const fetchInsights = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          walletAddress: address,
          transactions: transactions,
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
  }, [address, transactions, setInsights, setIsLoading]);

  useEffect(() => {
    if (isConnected && address) {
      fetchTransactions();
      fetchInsights();
    }
  }, [isConnected, address, fetchTransactions, fetchInsights]);

  const totalGas = transactions.reduce((sum, tx) => {
    return sum + (parseFloat(tx.gasUsed || "0") * parseFloat(tx.gasPrice || "0"));
  }, 0);

  const totalValue = transactions.reduce((sum, tx) => {
    return sum + parseFloat(tx.value || "0");
  }, 0);

  return (
    <main className="min-h-screen gradient-bg-main">
      {/* Professional Header */}
      <Navbar />

      <div className="container mx-auto px-6 lg:px-8 py-12">
        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10 flex items-center justify-center glow-gradient">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/30 to-pink-600/30"></div>
              </div>
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 gradient-text-gradient">
              Connect Your Wallet to Get Started
            </h2>
            <p className="text-gray-300 mb-10 text-xl max-w-2xl mx-auto">
              Analyze your transactions, get AI-powered insights, and simulate
              financial goals with cutting-edge AI technology
            </p>
            <WalletConnectButton />
          </motion.div>
        ) : (
          <>
            {/* Professional Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="gradient-bg-card-premium rounded-2xl p-6 card-hover group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 group-hover:from-blue-500/30 group-hover:to-blue-700/30 transition-all duration-300">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Balance</span>
                </div>
                <p className="text-3xl font-bold gradient-text-blue mb-1">
                  {balance || "0.0000"}
                </p>
                <p className="text-xs text-gray-500 font-medium">ETH</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="gradient-bg-card-premium rounded-2xl p-6 card-hover group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-600/20 to-pink-800/20 group-hover:from-pink-500/30 group-hover:to-pink-700/30 transition-all duration-300">
                    <TrendingUp className="w-5 h-5 text-pink-400" />
                  </div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Total Value</span>
                </div>
                <p className="text-3xl font-bold gradient-text-pink mb-1">
                  {totalValue.toFixed(4)}
                </p>
                <p className="text-xs text-gray-500 font-medium">ETH</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="gradient-bg-card-premium rounded-2xl p-6 card-hover group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-pink-600/20 group-hover:from-blue-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Gas Spent</span>
                </div>
                <p className="text-3xl font-bold gradient-text-gradient mb-1">
                  {totalGas.toFixed(6)}
                </p>
                <p className="text-xs text-gray-500 font-medium">Gwei</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="gradient-bg-card-premium rounded-2xl p-6 card-hover group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-600/20 to-blue-600/20 group-hover:from-pink-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <RefreshCw className="w-5 h-5 text-pink-400" />
                  </div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Transactions</span>
                </div>
                <p className="text-3xl font-bold gradient-text-gradient mb-1">
                  {transactions.length}
                </p>
                <p className="text-xs text-gray-500 font-medium">Total Count</p>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Insights Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold gradient-text-gradient mb-2">AI-Powered Insights</h2>
                    <p className="text-sm text-gray-400">Real-time analysis of your wallet activity</p>
                  </div>
                  <button
                    onClick={fetchInsights}
                    disabled={isLoading}
                    className="btn-gradient px-6 py-3 rounded-xl disabled:opacity-50 flex items-center gap-2 text-sm font-semibold"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                    />
                    {isLoading ? "Analyzing..." : "Regenerate"}
                  </button>
                </div>

                {isLoading ? (
                  <div className="p-20 gradient-bg-card-premium rounded-2xl text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 mb-6">
                      <RefreshCw className="w-8 h-8 animate-spin gradient-text-gradient" />
                    </div>
                    <p className="text-gray-300 text-lg font-medium mb-2">Generating insights...</p>
                    <p className="text-gray-500 text-sm">Analyzing your transaction patterns</p>
                  </div>
                ) : insights.length > 0 ? (
                  <div className="space-y-5">
                    {insights.map((insight, index) => (
                      <InsightsCard key={index} insight={insight} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="p-20 gradient-bg-card-premium rounded-2xl text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 mb-6">
                      <BarChart3 className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-300 text-lg font-medium mb-2">
                      No insights available
                    </p>
                    <p className="text-gray-500 text-sm">
                      Connect your wallet and make transactions to get started
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
            <div className="mb-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold gradient-text-gradient mb-2">Portfolio Analytics</h2>
                <p className="text-sm text-gray-400">Track your transaction trends over time</p>
              </div>
              <PortfolioChart />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

