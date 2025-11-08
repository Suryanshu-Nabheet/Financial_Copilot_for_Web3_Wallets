import { create } from "zustand";

export interface Insight {
  title: string;
  description: string;
  impactScore: number;
  type?: "gas" | "portfolio" | "swap" | "volume" | "general";
}

interface InsightState {
  insights: Insight[];
  isLoading: boolean;
  setInsights: (insights: Insight[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useInsightStore = create<InsightState>((set) => ({
  insights: [],
  isLoading: false,
  setInsights: (insights) => set({ insights }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

