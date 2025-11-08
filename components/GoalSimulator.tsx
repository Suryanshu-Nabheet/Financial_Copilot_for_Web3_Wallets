"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Sparkles } from "lucide-react";

interface Strategy {
  strategy: string;
  timeline: string;
  risk: number;
  suggestion: string;
  expectedReturn: string;
}

export function GoalSimulator() {
  const [goalText, setGoalText] = useState("");
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goalText }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate strategy");
      }

      const data = await response.json();
      setStrategy(data.strategy);
    } catch (err) {
      setError("Failed to generate strategy. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-semibold">Goal Simulator</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="e.g., How do I grow $1,000 to $5,000 in 6 months?"
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !goalText.trim()}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {strategy && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">
                  Strategy
                </h3>
                <p className="text-white">{strategy.strategy}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">
                    Timeline
                  </h3>
                  <p className="text-white font-semibold">{strategy.timeline}</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">
                    Expected Return
                  </h3>
                  <p className="text-white font-semibold neon-blue">
                    {strategy.expectedReturn}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">
                  Risk Rating
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                      style={{ width: `${(strategy.risk / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-semibold">{strategy.risk}/10</span>
                </div>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">
                  Actionable Steps
                </h3>
                <p className="text-white text-sm">{strategy.suggestion}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

