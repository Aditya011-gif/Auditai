import type { AuditInput, SelectedTool } from "@/types/audit";

export const defaultTools: SelectedTool[] = [
  { id: "cursor", enabled: true, plan: "Business", monthlySpend: 160, seats: 4, usageIntensity: "high" },
  { id: "github-copilot", enabled: false, plan: "Business", monthlySpend: 76, seats: 4, usageIntensity: "medium" },
  { id: "claude", enabled: false, plan: "Pro", monthlySpend: 40, seats: 2, usageIntensity: "medium" },
  { id: "chatgpt", enabled: true, plan: "Team", monthlySpend: 60, seats: 2, usageIntensity: "medium" },
  { id: "gemini", enabled: false, plan: "Ultra", monthlySpend: 200, seats: 1, usageIntensity: "low" },
  { id: "windsurf", enabled: false, plan: "Teams", monthlySpend: 90, seats: 3, usageIntensity: "medium" },
  { id: "openai-api", enabled: true, plan: "API direct", monthlySpend: 850, seats: 1, usageIntensity: "high" },
  { id: "anthropic-api", enabled: false, plan: "API direct", monthlySpend: 0, seats: 1, usageIntensity: "medium" }
];

export const defaultAuditInput: AuditInput = {
  teamSize: 4,
  companyStage: "seed",
  primaryUseCase: "writing",
  currency: "USD",
  tools: defaultTools,
  apiUsage: {
    tokenSpend: 850,
    requestVolume: 120000,
    averageMonthlyUsage: "Marketing drafts, customer support macros, and weekly analysis summaries."
  }
};
