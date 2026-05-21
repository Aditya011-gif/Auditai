import { nanoid } from "nanoid";
import type { AuditInput, AuditResult, SelectedTool, ToolRecommendation } from "@/types/audit";
import { getPlanPrice, pricingCatalog } from "./pricing";

function clampSavings(value: number) {
  return Math.max(0, Math.round(value));
}

function estimatedPlanSpend(tool: SelectedTool, plan: string, fallback: number) {
  const planPrice = getPlanPrice(tool.id, plan);
  if (!planPrice) return fallback;
  return Math.round(planPrice.perSeat ? planPrice.monthly * tool.seats : planPrice.monthly);
}

function baseRecommendation(tool: SelectedTool): ToolRecommendation {
  const catalog = pricingCatalog[tool.id];
  return {
    toolId: tool.id,
    toolName: catalog.name,
    currentPlan: tool.plan,
    optimizedPlan: tool.plan,
    currentSpend: Math.round(tool.monthlySpend),
    optimizedSpend: Math.round(tool.monthlySpend),
    monthlySavings: 0,
    annualSavings: 0,
    confidence: 82,
    explanation: `${catalog.name} appears aligned with the stated usage. Keep monitoring utilization before renewing annual commitments.`,
    alternatives: [],
    action: "keep"
  };
}

function withSavings(rec: ToolRecommendation, optimizedSpend: number): ToolRecommendation {
  const monthlySavings = clampSavings(rec.currentSpend - optimizedSpend);
  return {
    ...rec,
    optimizedSpend: Math.max(0, Math.round(optimizedSpend)),
    monthlySavings,
    annualSavings: monthlySavings * 12
  };
}

function recommendForTool(input: AuditInput, tool: SelectedTool): ToolRecommendation {
  let rec = baseRecommendation(tool);

  if (tool.id === "cursor" && tool.plan === "Business" && tool.seats < 5) {
    rec = {
      ...rec,
      optimizedPlan: "Pro",
      confidence: 91,
      explanation: "Business plan pricing is inefficient for small engineering teams under 5 users unless admin controls are mandatory.",
      alternatives: ["GitHub Copilot Business for policy controls", "Windsurf Pro for lower seat cost"],
      action: "downgrade"
    };
    return withSavings(rec, estimatedPlanSpend(tool, "Pro", tool.seats * 20));
  }

  if (tool.id === "chatgpt" && tool.plan === "Team" && tool.seats <= 2) {
    rec = {
      ...rec,
      optimizedPlan: "Plus",
      confidence: 89,
      explanation: "For one or two users, ChatGPT Plus usually captures the core assistant value without paying for team administration.",
      alternatives: ["Claude Pro for writing-heavy work", "Per-seat review before next renewal"],
      action: "downgrade"
    };
    return withSavings(rec, estimatedPlanSpend(tool, "Plus", tool.seats * 20));
  }

  if (tool.id === "gemini" && tool.plan === "Ultra" && tool.usageIntensity === "low") {
    rec = {
      ...rec,
      optimizedPlan: "Pro",
      confidence: 87,
      explanation: "Low Gemini usage rarely justifies Ultra-level access; Pro is the financially cleaner default until usage proves otherwise.",
      alternatives: ["ChatGPT Plus for general assistant work", "Gemini API for bursty workloads"],
      action: "downgrade"
    };
    return withSavings(rec, estimatedPlanSpend(tool, "Pro", Math.max(20, tool.seats * 19.99)));
  }

  if (tool.id === "openai-api" && tool.monthlySpend > 500 && input.primaryUseCase === "writing") {
    rec = {
      ...rec,
      optimizedPlan: "Claude Max + capped OpenAI API",
      confidence: 84,
      explanation: "Writing-heavy teams often move repeated drafting and review from metered API calls into capped subscription seats.",
      alternatives: ["Claude Max for heavy writing", "Batch API for non-urgent generation", "Prompt caching where available"],
      action: "switch"
    };
    return withSavings(rec, Math.max(200, tool.monthlySpend * 0.55));
  }

  if (tool.id === "anthropic-api" && tool.monthlySpend > 750 && tool.usageIntensity !== "low") {
    rec = {
      ...rec,
      optimizedPlan: "Anthropic API with batch/cache controls",
      confidence: 80,
      explanation: "High Claude API spend should be split into latency-sensitive calls and batch/cacheable work before buying more capacity.",
      alternatives: ["Batch API for async jobs", "Claude Team seats for human drafting", "Credex credit sourcing"],
      action: "credits"
    };
    return withSavings(rec, tool.monthlySpend * 0.72);
  }

  if (tool.id === "github-copilot" && tool.plan === "Enterprise" && tool.seats < 10) {
    rec = {
      ...rec,
      optimizedPlan: "Business",
      confidence: 78,
      explanation: "Small teams often do not need enterprise-level Copilot controls before security and procurement requirements mature.",
      alternatives: ["Cursor Pro for agent-heavy coding", "Windsurf Teams for lower list price"],
      action: "downgrade"
    };
    return withSavings(rec, estimatedPlanSpend(tool, "Business", tool.seats * 19));
  }

  if (tool.id === "windsurf" && tool.plan === "Teams" && tool.seats < 4) {
    rec = {
      ...rec,
      optimizedPlan: "Pro",
      confidence: 76,
      explanation: "Teams packaging is usually premature below four active users unless centralized billing is the main requirement.",
      alternatives: ["Cursor Pro", "GitHub Copilot Individual"],
      action: "downgrade"
    };
    return withSavings(rec, estimatedPlanSpend(tool, "Pro", tool.seats * 15));
  }

  if (tool.monthlySpend > 1000) {
    rec = {
      ...rec,
      optimizedPlan: `${tool.plan} via negotiated credits`,
      confidence: 74,
      explanation: "This spend level is large enough that procurement discipline and discounted credits matter more than another small downgrade.",
      alternatives: ["Credex discounted credits", "Quarterly vendor true-up", "Usage caps by team"],
      action: "credits"
    };
    return withSavings(rec, tool.monthlySpend * 0.78);
  }

  return rec;
}

export function runAudit(input: AuditInput, summary = ""): AuditResult {
  const enabledTools = input.tools.filter((tool) => tool.enabled);
  const recommendations = enabledTools.map((tool) => recommendForTool(input, tool));
  const monthlySpend = recommendations.reduce((sum, item) => sum + item.currentSpend, 0);
  const optimizedMonthlySpend = recommendations.reduce((sum, item) => sum + item.optimizedSpend, 0);
  const monthlySavings = clampSavings(monthlySpend - optimizedMonthlySpend);
  const savingsPercentage = monthlySpend > 0 ? Math.round((monthlySavings / monthlySpend) * 100) : 0;

  return {
    slug: `audit-${nanoid(10)}`,
    input,
    recommendations,
    totals: {
      monthlySpend,
      optimizedMonthlySpend,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      savingsPercentage
    },
    summary,
    generatedAt: new Date().toISOString()
  };
}

export function createFallbackSummary(result: Pick<AuditResult, "recommendations" | "totals" | "input">) {
  const top = [...result.recommendations].sort((a, b) => b.monthlySavings - a.monthlySavings)[0];
  if (!top || result.totals.monthlySavings < 100) {
    return "Your AI stack looks relatively disciplined. The current spend is not showing obvious waste, so the best next step is monitoring usage by team and revisiting vendor commitments before renewal dates. Keep the report active and re-run it when seats, API traffic, or model mix changes.";
  }

  return `Your team is spending about $${result.totals.monthlySpend.toLocaleString()} per month on AI tools, with an estimated $${result.totals.monthlySavings.toLocaleString()} in monthly savings available. The clearest opportunity is ${top.toolName}, where ${top.explanation.toLowerCase()} Prioritize plan right-sizing first, then move high-volume API workloads into credits, batch jobs, or capped subscription plans.`;
}

