export type UseCase = "coding" | "writing" | "research" | "data" | "mixed";
export type UsageIntensity = "low" | "medium" | "high";

export type ToolId =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "gemini"
  | "windsurf"
  | "openai-api"
  | "anthropic-api";

export interface SelectedTool {
  id: ToolId;
  enabled: boolean;
  plan: string;
  monthlySpend: number;
  seats: number;
  usageIntensity: UsageIntensity;
}

export interface AuditInput {
  teamSize: number;
  companyStage: "solo" | "pre-seed" | "seed" | "series-a" | "growth";
  primaryUseCase: UseCase;
  tools: SelectedTool[];
  apiUsage: {
    tokenSpend: number;
    requestVolume: number;
    averageMonthlyUsage: string;
  };
}

export interface ToolRecommendation {
  toolId: ToolId;
  toolName: string;
  currentPlan: string;
  optimizedPlan: string;
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  confidence: number;
  explanation: string;
  alternatives: string[];
  action: "keep" | "downgrade" | "switch" | "credits" | "monitor";
}

export interface AuditResult {
  slug?: string;
  input: AuditInput;
  recommendations: ToolRecommendation[];
  totals: {
    monthlySpend: number;
    optimizedMonthlySpend: number;
    monthlySavings: number;
    annualSavings: number;
    savingsPercentage: number;
  };
  summary: string;
  generatedAt: string;
}

