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
      <div className="h-64 flex items-center justify-center bg-gray-900 rounded-xl border border-gray-800">
        <p className="text-gray-500">No transaction data available</p>
      </div>
    );
  }

  return (
    <div className="h-64 bg-gray-900 rounded-xl border border-gray-800 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00f0ff"
            strokeWidth={2}
            name="ETH Value"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="gas"
            stroke="#b026ff"
            strokeWidth={2}
            name="Gas (Gwei)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

