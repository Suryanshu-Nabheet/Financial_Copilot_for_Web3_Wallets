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
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="gradient-bg-card-premium rounded-2xl p-6 card-hover group"
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-pink-600/20 group-hover:from-blue-500/30 group-hover:to-pink-500/30 transition-all duration-300 shadow-lg">
            <Icon className="w-6 h-6 gradient-text-gradient" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-bold gradient-text-gradient leading-tight">{insight.title}</h3>
            <span className="flex-shrink-0 text-xs px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-pink-600/20 rounded-lg text-gray-300 border border-white/10 font-semibold uppercase tracking-wider">
              {insight.type || "general"}
            </span>
          </div>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">{insight.description}</p>
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Impact:</span>
            <div className="flex gap-1.5 flex-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    i < insight.impactScore
                      ? "bg-gradient-to-r from-blue-500 to-pink-500 shadow-sm"
                      : "bg-gray-800/50"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-400 min-w-[2rem] text-right">
              {insight.impactScore}/10
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

