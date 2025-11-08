# AI Financial Copilot for Web3 Wallets

A full-stack Next.js application that connects to crypto wallets, analyzes transaction data, and provides AI-powered financial insights.

## 🚀 Features

- **Wallet Connection**: Connect MetaMask or other injected wallets
- **Transaction Analysis**: Fetch and analyze ETH and ERC-20 transactions
- **AI Insights**: Get personalized insights about gas fees, portfolio diversification, and trading opportunities
- **Goal Simulator**: Ask questions like "How do I grow $1,000 to $5,000 in 6 months?" and get AI-generated strategies
- **Portfolio Charts**: Visualize your transaction trends over time
- **Dark Theme**: Beautiful dark UI with neon accents

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion
- **Web3**: Viem, Wagmi
- **AI**: OpenAI API
- **Vector Storage**: Pinecone DB
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Web3
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
OPENAI_API_KEY=your_openai_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=transaction_summary
NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_key_here
# OR
ETHERSCAN_API_KEY=your_etherscan_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Setup Instructions

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add it to `.env` as `OPENAI_API_KEY`

### Pinecone Setup
1. Go to [Pinecone](https://www.pinecone.io/)
2. Create a free account
3. Create a new index named `transaction_summary` with dimension 1536 (for OpenAI embeddings)
4. Copy your API key and environment to `.env`

### Alchemy or Etherscan API
- **Alchemy**: Get a free API key from [Alchemy](https://www.alchemy.com/)
- **Etherscan**: Get a free API key from [Etherscan](https://etherscan.io/apis)

## 📁 Project Structure

```
/app
  /api
    /transactions    # Transaction fetching endpoint
    /ai              # AI insights generation
    /goals           # Goal simulator endpoint
  /page.tsx          # Main dashboard
  /layout.tsx         # Root layout
  /providers.tsx      # Wagmi providers
/components
  WalletConnectButton.tsx
  InsightsCard.tsx
  GoalSimulator.tsx
  /Charts
    PortfolioChart.tsx
/lib
  web3.ts            # Web3 utilities
  ai.ts              # OpenAI integration
  pinecone.ts        # Pinecone integration
  utils.ts           # Helper functions
/store
  walletStore.ts     # Wallet state
  insightStore.ts    # Insights state
```

## 🎯 Usage

1. **Connect Wallet**: Click "Connect Wallet" and approve the connection in MetaMask
2. **View Transactions**: Your transactions will be automatically fetched and displayed
3. **Get Insights**: AI insights will be generated automatically, or click "Regenerate" for new insights
4. **Simulate Goals**: Type a financial goal in the Goal Simulator panel and get AI-generated strategies
5. **View Charts**: Check the Portfolio Trends chart to see your transaction history

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

The app will be live at `https://your-app.vercel.app`

## 🔒 Security Notes

- Never commit your `.env` file
- Keep your API keys secure
- Use environment variables for all sensitive data
- Consider rate limiting for production use

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⚠️ Disclaimer

This is a demonstration project. Always do your own research before making financial decisions. The AI-generated insights are suggestions and not financial advice.

