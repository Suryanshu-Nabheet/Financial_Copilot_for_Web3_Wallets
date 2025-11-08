import OpenAI from "openai";

let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn("OPENAI_API_KEY is not set - AI features will be disabled");
      return null;
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const client = getOpenAIClient();
    if (!client) {
      // Return dummy embedding if OpenAI is not configured
      return new Array(1536).fill(0);
    }
    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    // Return dummy embedding if API fails
    return new Array(1536).fill(0);
  }
}

export async function generateInsights(transactions: any[]): Promise<any[]> {
  try {
    const client = getOpenAIClient();
    if (!client) {
      // Return default insights if OpenAI is not configured
      return [
        {
          title: "AI features require configuration",
          description: "Please set OPENAI_API_KEY in your environment variables to enable AI insights.",
          impactScore: 0,
          type: "general",
        },
      ];
    }
    
    const prompt = `
Analyze the following wallet transactions and generate 3-5 actionable insights. Focus on:
- Gas fee trends and optimization opportunities
- Portfolio diversification patterns
- Swap opportunities and timing
- Trading volume trends
- Risk indicators

Transactions data:
${JSON.stringify(transactions.slice(0, 50)).slice(0, 6000)}

Return a JSON array with objects containing:
- "title": string (short, catchy title)
- "description": string (detailed explanation)
- "impactScore": number (1-10, where 10 is highest impact)
- "type": string (one of: "gas", "portfolio", "swap", "volume", "general")

Example format:
[
  {
    "title": "Gas fees increased by 13%",
    "description": "Your gas fees increased by 13% this week compared to last week. Consider batching transactions or using Layer 2 solutions.",
    "impactScore": 7,
    "type": "gas"
  }
]

Return ONLY valid JSON, no markdown formatting.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message?.content || "[]";
    // Clean up the response in case it has markdown code blocks
    const cleanedContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error("Error generating insights:", error);
    return [
      {
        title: "Unable to generate insights",
        description: "There was an error processing your transactions. Please try again later.",
        impactScore: 0,
        type: "general",
      },
    ];
  }
}

export async function generateGoalStrategy(
  goalText: string,
  marketData: any
): Promise<any> {
  try {
    const client = getOpenAIClient();
    if (!client) {
      // Return default strategy if OpenAI is not configured
      return {
        strategy: "Please set OPENAI_API_KEY in your environment variables to enable AI goal simulation.",
        timeline: "N/A",
        risk: 5,
        suggestion: "Configure your OpenAI API key to get personalized strategies.",
        expectedReturn: "N/A",
      };
    }
    
    const prompt = `
The user has the following financial goal: "${goalText}"

Current market data:
${JSON.stringify(marketData).slice(0, 2000)}

Generate a realistic DeFi or crypto investment strategy to achieve this goal. Include:
- Strategy overview (diversification approach, key tokens/DeFi protocols)
- Timeline (realistic timeframes)
- Risk rating (1-10, where 10 is highest risk)
- Specific suggestions (actionable steps)
- Expected return range (realistic percentage)

Return a JSON object with:
{
  "strategy": string (detailed strategy description),
  "timeline": string (e.g., "6 months", "1 year"),
  "risk": number (1-10),
  "suggestion": string (actionable steps),
  "expectedReturn": string (e.g., "15-25%")
}

Return ONLY valid JSON, no markdown formatting.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const content = response.choices[0].message?.content || "{}";
    const cleanedContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error("Error generating goal strategy:", error);
    return {
      strategy: "Unable to generate strategy at this time.",
      timeline: "N/A",
      risk: 5,
      suggestion: "Please try again later.",
      expectedReturn: "N/A",
    };
  }
}

