import { NextResponse } from "next/server";
import { getUserTransactions } from "@/lib/pinecone";
import { generateInsights } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { walletAddress, transactions: providedTransactions } = await req.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Try to fetch from Pinecone first, fallback to provided transactions
    let transactions = await getUserTransactions(walletAddress);
    
    // If Pinecone is empty and transactions are provided, use those
    if (transactions.length === 0 && providedTransactions && providedTransactions.length > 0) {
      transactions = providedTransactions;
    }

    if (transactions.length === 0) {
      return NextResponse.json({
        insights: [
          {
            title: "No transaction history found",
            description:
              "Connect your wallet and make some transactions to get personalized insights.",
            impactScore: 0,
            type: "general",
          },
        ],
      });
    }

    // Generate AI insights
    const insights = await generateInsights(transactions);

    return NextResponse.json({ insights });
  } catch (error: any) {
    console.error("Error generating insights:", error);
    return NextResponse.json(
      {
        insights: [
          {
            title: "Error generating insights",
            description:
              "There was an error processing your request. Please try again later.",
            impactScore: 0,
            type: "general",
          },
        ],
      },
      { status: 500 }
    );
  }
}

