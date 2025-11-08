import { createPublicClient, http, formatEther, formatUnits } from "viem";
import { mainnet } from "viem/chains";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(
    alchemyKey
      ? `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
      : "https://eth.llamarpc.com"
  ),
});

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  gasUsed: string;
  gasPrice: string;
  tokenSymbol?: string;
  tokenName?: string;
  tokenAddress?: string;
}

export async function getETHBalance(address: `0x${string}`): Promise<string> {
  const balance = await publicClient.getBalance({ address });
  return formatEther(balance);
}

export async function getTransactions(
  address: `0x${string}`,
  limit: number = 100
): Promise<Transaction[]> {
  try {
    // Using Etherscan API as fallback
    const etherscanKey = process.env.ETHERSCAN_API_KEY;
    if (etherscanKey) {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc&apikey=${etherscanKey}`
      );
      const data = await response.json();
      
      if (data.status === "1" && data.result) {
        return data.result.map((tx: any) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: formatEther(BigInt(tx.value || "0")),
          timestamp: parseInt(tx.timeStamp),
          gasUsed: formatUnits(BigInt(tx.gasUsed || "0"), "gwei"),
          gasPrice: formatUnits(BigInt(tx.gasPrice || "0"), "gwei"),
        }));
      }
    }

    // Fallback: return empty array if no API key
    return [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function getERC20Tokens(address: `0x${string}`): Promise<any[]> {
  try {
    const etherscanKey = process.env.ETHERSCAN_API_KEY;
    if (etherscanKey) {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=100&sort=desc&apikey=${etherscanKey}`
      );
      const data = await response.json();
      
      if (data.status === "1" && data.result) {
        return data.result.map((tx: any) => ({
          tokenAddress: tx.contractAddress,
          tokenName: tx.tokenName,
          tokenSymbol: tx.tokenSymbol,
          balance: tx.value,
          decimals: tx.tokenDecimal,
        }));
      }
    }
    return [];
  } catch (error) {
    console.error("Error fetching ERC20 tokens:", error);
    return [];
  }
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

