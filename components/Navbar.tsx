"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletConnectButton } from "./WalletConnectButton";
import { Home, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="gradient-bg-header sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/landing" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text-gradient tracking-tight">
                Financial Copilot
              </h1>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Enterprise Web3 Analytics
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/landing"
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                pathname === "/landing"
                  ? "text-white bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              scroll={false}
            >
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </div>
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
                pathname === "/dashboard"
                  ? "text-white bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              scroll={false}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </Link>
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

