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
    <div className="h-full flex flex-col gradient-bg-card-premium rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-pink-600/20 to-blue-600/20 shadow-lg">
          <Sparkles className="w-5 h-5 gradient-text-gradient" />
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text-gradient">Goal Simulator</h2>
          <p className="text-xs text-gray-400 mt-0.5">AI Strategy Planning</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="e.g., How do I grow $1,000 to $5,000 in 6 months?"
            className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !goalText.trim()}
            className="px-5 py-3 btn-gradient rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
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
              className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm backdrop-blur-sm"
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
              <div className="p-5 bg-black/40 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 gradient-text-blue">
                  Strategy
                </h3>
                <p className="text-gray-200 leading-relaxed">{strategy.strategy}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-black/40 rounded-xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2 gradient-text-pink">
                    Timeline
                  </h3>
                  <p className="text-white font-bold text-lg">{strategy.timeline}</p>
                </div>
                <div className="p-5 bg-black/40 rounded-xl border border-white/10 backdrop-blur-sm">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2 gradient-text-blue">
                    Expected Return
                  </h3>
                  <p className="text-white font-bold text-lg gradient-text-gradient">
                    {strategy.expectedReturn}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-black/40 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 gradient-text-pink">
                  Risk Rating
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-800/50 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-500"
                      style={{ width: `${(strategy.risk / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-bold text-lg min-w-[3rem]">{strategy.risk}/10</span>
                </div>
              </div>

              <div className="p-5 bg-black/40 rounded-xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 gradient-text-blue">
                  Actionable Steps
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">{strategy.suggestion}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

