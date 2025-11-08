import { Pinecone } from "@pinecone-database/pinecone";

let pineconeClient: Pinecone | null = null;

export function getPineconeClient(): Pinecone | null {
  try {
    if (!pineconeClient) {
      const apiKey = process.env.PINECONE_API_KEY;
      if (!apiKey) {
        console.warn("PINECONE_API_KEY is not set - Pinecone features will be disabled");
        return null;
      }
      // Pinecone v1.x only needs apiKey, no environment needed
      pineconeClient = new Pinecone({ 
        apiKey,
      } as any); // Type assertion to handle type mismatch
    }
    return pineconeClient;
  } catch (error) {
    console.error("Error initializing Pinecone client:", error);
    return null;
  }
}

export interface TransactionEmbedding {
  id: string;
  values: number[];
  metadata: {
    walletAddress: string;
    hash: string;
    date: string;
    token: string;
    valueUSD: number;
    gasSpentUSD: number;
    summary: string;
  };
}

export async function storeTransactionEmbedding(
  embedding: TransactionEmbedding
): Promise<void> {
  try {
    const client = getPineconeClient();
    if (!client) {
      console.warn("Pinecone not configured, skipping embedding storage");
      return;
    }
    const indexName = process.env.PINECONE_INDEX_NAME || "transaction_summary";
    const index = client.index(indexName);

    await index.upsert([embedding]);
  } catch (error) {
    console.error("Error storing transaction embedding:", error);
    // Don't throw - allow app to continue without Pinecone
  }
}

export async function getUserTransactions(
  walletAddress: string,
  limit: number = 100
): Promise<any[]> {
  try {
    const client = getPineconeClient();
    if (!client) {
      // Pinecone not configured, return empty array
      return [];
    }
    const indexName = process.env.PINECONE_INDEX_NAME || "transaction_summary";
    const index = client.index(indexName);

    // Use listPaginated to get all records with metadata filter
    // Note: Pinecone v3+ uses different query syntax
    try {
      const queryResponse = await index.query({
        vector: new Array(1536).fill(0), // Dummy vector for metadata filter
        topK: limit,
        includeMetadata: true,
        filter: {
          walletAddress: { $eq: walletAddress },
        },
      });

      return (
        queryResponse.matches?.map((match) => match.metadata) || []
      );
    } catch (queryError) {
      // If query fails (e.g., no index or wrong format), return empty array
      console.warn("Pinecone query failed, returning empty array:", queryError);
      return [];
    }
  } catch (error) {
    console.error("Error fetching user transactions from Pinecone:", error);
    // Return empty array if Pinecone is not configured
    return [];
  }
}

