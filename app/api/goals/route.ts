import { NextResponse } from "next/server";
import { generateGoalStrategy } from "@/lib/ai";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { goalText } = await req.json();

    if (!goalText) {
      return NextResponse.json(
        { error: "Goal text is required" },
        { status: 400 }
      );
    }

    // Fetch market data from CoinGecko
    let marketData = {};
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/global",
        { timeout: 5000 }
      );
      marketData = response.data;
    } catch (error) {
      console.error("Error fetching market data:", error);
      // Continue with empty market data
    }

    // Generate goal strategy using AI
    const strategy = await generateGoalStrategy(goalText, marketData);

    return NextResponse.json({ strategy });
  } catch (error: any) {
    console.error("Error generating goal strategy:", error);
    return NextResponse.json(
      {
        strategy: {
          strategy: "Unable to generate strategy at this time.",
          timeline: "N/A",
          risk: 5,
          suggestion: "Please try again later.",
          expectedReturn: "N/A",
        },
      },
      { status: 500 }
    );
  }
}

