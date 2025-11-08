"use client";

import { motion } from "framer-motion";
import { Insight } from "@/store/insightStore";
import { TrendingUp, TrendingDown, Zap, DollarSign, BarChart3 } from "lucide-react";

interface InsightsCardProps {
  insight: Insight;
  index: number;
}

const iconMap = {
  gas: Zap,
  portfolio: BarChart3,
  swap: TrendingUp,
  volume: TrendingDown,
  general: DollarSign,
};

export function InsightsCard({ insight, index }: InsightsCardProps) {
  const Icon = iconMap[insight.type || "general"] || DollarSign;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-500 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-white">{insight.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{insight.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Impact Score:</span>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < insight.impactScore
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400">
              {insight.type || "general"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

