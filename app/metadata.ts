import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "AI Financial Copilot | Enterprise Web3 Analytics",
  description: "AI-powered financial insights for your Web3 wallet. Analyze transactions, optimize gas fees, and achieve your financial goals with cutting-edge AI technology.",
  keywords: ["Web3", "DeFi", "Crypto", "AI", "Wallet Analytics", "Blockchain", "Ethereum"],
  authors: [{ name: "Financial Copilot" }],
  creator: "Financial Copilot",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://financial-copilot.vercel.app",
    title: "AI Financial Copilot | Enterprise Web3 Analytics",
    description: "AI-powered financial insights for your Web3 wallet",
    siteName: "Financial Copilot",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Financial Copilot",
    description: "AI-powered financial insights for your Web3 wallet",
  },
  robots: {
    index: true,
    follow: true,
  },
};

