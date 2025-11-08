"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, BarChart3, Brain, TrendingUp, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get intelligent analysis of your wallet transactions with advanced AI algorithms.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Portfolio Analytics",
      description: "Track your assets, gas spending, and transaction trends with beautiful visualizations.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Zap,
      title: "Real-Time Monitoring",
      description: "Stay updated with instant notifications about your wallet activity and opportunities.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data stays private. We never store your private keys or sensitive information.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Goal Simulator",
      description: "Plan your financial goals with AI-driven strategies and market analysis.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Receive personalized suggestions to optimize your DeFi strategy and reduce costs.",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const benefits = [
    "Reduce gas fees by up to 30%",
    "Optimize portfolio diversification",
    "Identify profitable swap opportunities",
    "Track spending patterns",
    "Get risk assessments",
    "Access market insights",
  ];

  return (
    <div className="min-h-screen gradient-bg-main">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-pink-600/20 border border-white/10 mb-8"
              >
                <Sparkles className="w-4 h-4 gradient-text-gradient" />
                <span className="text-sm font-semibold gradient-text-gradient">
                  AI-Powered Web3 Financial Intelligence
                </span>
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text-gradient">
                  Your AI Financial
                </span>
                <br />
                <span className="text-white">Copilot for Web3</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Analyze transactions, optimize gas fees, and achieve your financial goals with
                cutting-edge AI technology designed for the decentralized economy.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link
                  href="/dashboard"
                  className="btn-gradient px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 group shadow-lg hover:shadow-blue-500/50 hover:shadow-pink-500/50"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#features"
                  className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-white/20 hover:border-white/40 transition-all text-white bg-white/5 hover:bg-white/10"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                {[
                  { value: "30%", label: "Gas Savings" },
                  { value: "24/7", label: "AI Monitoring" },
                  { value: "100%", label: "Private & Secure" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="gradient-bg-card-premium rounded-2xl p-6"
                  >
                    <div className="text-4xl font-bold gradient-text-gradient mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-spacing bg-black/20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text-gradient mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage and optimize your Web3 finances
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="gradient-bg-card-premium rounded-2xl p-8 card-hover group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-spacing">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold gradient-text-gradient mb-6">
                  Why Choose Financial Copilot?
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Take control of your Web3 finances with intelligent insights and automated
                  analysis powered by advanced AI technology.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="gradient-bg-card-premium rounded-3xl p-8 lg:p-12"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/30 to-pink-600/30 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 gradient-text-gradient" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Real-Time Analytics</h3>
                      <p className="text-gray-400 text-sm">Monitor your portfolio 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600/30 to-blue-600/30 flex items-center justify-center">
                      <Brain className="w-6 h-6 gradient-text-gradient" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">AI Insights</h3>
                      <p className="text-gray-400 text-sm">Get personalized recommendations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600/30 to-emerald-600/30 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Secure & Private</h3>
                      <p className="text-gray-400 text-sm">Your data never leaves your device</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-black/20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center gradient-bg-card-premium rounded-3xl p-12 lg:p-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text-gradient mb-6">
              Ready to Optimize Your Web3 Finances?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Connect your wallet and start getting AI-powered insights today. No sign-up required.
            </p>
            <Link
              href="/dashboard"
              className="btn-gradient px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-gray-400 text-sm">© 2024 Financial Copilot. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

