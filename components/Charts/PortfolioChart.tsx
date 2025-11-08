"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useWalletStore } from "@/store/walletStore";
import { useMemo } from "react";

export function PortfolioChart() {
  const { transactions } = useWalletStore();

  const chartData = useMemo(() => {
    if (transactions.length === 0) {
      return [];
    }

    // Group transactions by date and calculate cumulative balance
    const grouped = transactions.reduce((acc: any, tx: any) => {
      const date = new Date(tx.timestamp * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      
      if (!acc[date]) {
        acc[date] = { date, value: 0, gas: 0 };
      }
      
      acc[date].value += parseFloat(tx.value || "0");
      acc[date].gas += parseFloat(tx.gasUsed || "0") * parseFloat(tx.gasPrice || "0");
      
      return acc;
    }, {});

    // Convert to array and calculate cumulative values
    let cumulativeValue = 0;
    let cumulativeGas = 0;
    
    return Object.values(grouped)
      .map((item: any) => {
        cumulativeValue += item.value;
        cumulativeGas += item.gas;
        return {
          date: item.date,
          value: cumulativeValue.toFixed(4),
          gas: cumulativeGas.toFixed(6),
        };
      })
      .slice(-30); // Last 30 days
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center gradient-bg-card rounded-2xl border border-white/10">
        <p className="text-gray-400">No transaction data available</p>
      </div>
    );
  }

  return (
    <div className="h-80 gradient-bg-card rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis
            dataKey="date"
            stroke="rgba(255, 255, 255, 0.5)"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="rgba(255, 255, 255, 0.5)" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            }}
            labelStyle={{ color: "#fff", fontWeight: "bold" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend 
            wrapperStyle={{ color: "rgba(255, 255, 255, 0.8)" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            name="ETH Value"
            dot={false}
            strokeDasharray=""
          />
          <Line
            type="monotone"
            dataKey="gas"
            stroke="#ec4899"
            strokeWidth={3}
            name="Gas (Gwei)"
            dot={false}
            strokeDasharray=""
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

