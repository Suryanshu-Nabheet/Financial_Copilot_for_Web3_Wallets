import { NextResponse } from "next/server";
import { getTransactions, getERC20Tokens, getETHBalance } from "@/lib/web3";
import { storeTransactionEmbedding, getUserTransactions } from "@/lib/pinecone";
import { generateEmbedding } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Fetch transactions and balance
    const [balance, transactions, tokens] = await Promise.all([
      getETHBalance(address as `0x${string}`),
      getTransactions(address as `0x${string}`),
      getERC20Tokens(address as `0x${string}`),
    ]);

    // Store transactions in Pinecone (simplified - in production, you'd batch these)
    // For now, we'll just return the data and let the frontend handle storage

    return NextResponse.json({
      balance,
      transactions,
      tokens,
    });
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Get stored transactions from Pinecone
    const storedTransactions = await getUserTransactions(address);

    return NextResponse.json({ transactions: storedTransactions });
  } catch (error: any) {
    console.error("Error fetching stored transactions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch stored transactions" },
      { status: 500 }
    );
  }
}

