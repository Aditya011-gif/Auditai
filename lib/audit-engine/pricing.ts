import type { ToolId, UseCase } from "@/types/audit";

export interface PlanPrice {
  plan: string;
  monthly: number;
  perSeat: boolean;
  source: string;
}

export interface ToolPricing {
  id: ToolId;
  name: string;
  category: "coding" | "assistant" | "api";
  plans: PlanPrice[];
  bestFor: UseCase[];
}

export const pricingCatalog: Record<ToolId, ToolPricing> = {
  cursor: {
    id: "cursor",
    name: "Cursor",
    category: "coding",
    bestFor: ["coding"],
    plans: [
      { plan: "Hobby", monthly: 0, perSeat: false, source: "https://cursor.com/pricing" },
      { plan: "Pro", monthly: 20, perSeat: true, source: "https://cursor.com/pricing" },
      { plan: "Business", monthly: 40, perSeat: true, source: "https://cursor.com/pricing" },
      { plan: "Enterprise", monthly: 80, perSeat: true, source: "https://cursor.com/pricing" }
    ]
  },
  "github-copilot": {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "coding",
    bestFor: ["coding"],
    plans: [
      { plan: "Individual", monthly: 10, perSeat: true, source: "https://github.com/features/copilot/plans" },
      { plan: "Business", monthly: 19, perSeat: true, source: "https://github.com/features/copilot/plans" },
      { plan: "Enterprise", monthly: 39, perSeat: true, source: "https://github.com/features/copilot/plans" }
    ]
  },
  claude: {
    id: "claude",
    name: "Claude",
    category: "assistant",
    bestFor: ["writing", "research", "coding", "mixed"],
    plans: [
      { plan: "Free", monthly: 0, perSeat: false, source: "https://claude.com/pricing" },
      { plan: "Pro", monthly: 20, perSeat: true, source: "https://claude.com/pricing" },
      { plan: "Max", monthly: 100, perSeat: true, source: "https://claude.com/pricing" },
      { plan: "Team", monthly: 30, perSeat: true, source: "https://claude.com/pricing" },
      { plan: "Enterprise", monthly: 90, perSeat: true, source: "https://claude.com/pricing" },
      { plan: "API direct", monthly: 0, perSeat: false, source: "https://docs.anthropic.com/en/docs/about-claude/pricing" }
    ]
  },
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    category: "assistant",
    bestFor: ["writing", "research", "data", "mixed"],
    plans: [
      { plan: "Plus", monthly: 20, perSeat: true, source: "https://openai.com/chatgpt/pricing" },
      { plan: "Team", monthly: 30, perSeat: true, source: "https://openai.com/chatgpt/pricing" },
      { plan: "Enterprise", monthly: 60, perSeat: true, source: "https://openai.com/business/chatgpt-pricing/" },
      { plan: "API direct", monthly: 0, perSeat: false, source: "https://openai.com/api/pricing" }
    ]
  },
  gemini: {
    id: "gemini",
    name: "Gemini",
    category: "assistant",
    bestFor: ["research", "data", "mixed"],
    plans: [
      { plan: "Pro", monthly: 19.99, perSeat: true, source: "https://gemini.google/subscriptions/" },
      { plan: "Ultra", monthly: 199.99, perSeat: true, source: "https://gemini.google/subscriptions/" },
      { plan: "API", monthly: 0, perSeat: false, source: "https://ai.google.dev/gemini-api/docs/pricing" }
    ]
  },
  windsurf: {
    id: "windsurf",
    name: "Windsurf",
    category: "coding",
    bestFor: ["coding"],
    plans: [
      { plan: "Free", monthly: 0, perSeat: false, source: "https://windsurf.com/pricing" },
      { plan: "Pro", monthly: 15, perSeat: true, source: "https://windsurf.com/pricing" },
      { plan: "Teams", monthly: 30, perSeat: true, source: "https://windsurf.com/pricing" },
      { plan: "Enterprise", monthly: 60, perSeat: true, source: "https://windsurf.com/pricing" }
    ]
  },
  "openai-api": {
    id: "openai-api",
    name: "OpenAI API",
    category: "api",
    bestFor: ["data", "writing", "mixed"],
    plans: [{ plan: "API direct", monthly: 0, perSeat: false, source: "https://openai.com/api/pricing" }]
  },
  "anthropic-api": {
    id: "anthropic-api",
    name: "Anthropic API",
    category: "api",
    bestFor: ["coding", "writing", "research", "mixed"],
    plans: [{ plan: "API direct", monthly: 0, perSeat: false, source: "https://docs.anthropic.com/en/docs/about-claude/pricing" }]
  }
};

export function getPlanPrice(toolId: ToolId, plan: string) {
  return pricingCatalog[toolId].plans.find((item) => item.plan.toLowerCase() === plan.toLowerCase());
}

