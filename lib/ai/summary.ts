import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { AuditResult } from "@/types/audit";
import { createFallbackSummary } from "@/lib/audit-engine";

export const SUMMARY_PROMPT = `You are a financially rigorous AI tooling consultant.
Write one concise paragraph of about 100 words.
Summarize the team's AI spend, biggest overspending pattern, and the most strategic next move.
Do not invent numbers. Do not mention private lead details. Sound specific, calm, and commercially useful.`;

export async function generateAuditSummary(result: AuditResult): Promise<string> {
  const payload = {
    teamSize: result.input.teamSize,
    useCase: result.input.primaryUseCase,
    totals: result.totals,
    recommendations: result.recommendations.map((item) => ({
      tool: item.toolName,
      currentPlan: item.currentPlan,
      optimizedPlan: item.optimizedPlan,
      monthlySavings: item.monthlySavings,
      reason: item.explanation
    }))
  };

  try {
    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const message = await anthropic.messages.create({
        model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
        max_tokens: 220,
        temperature: 0.3,
        system: SUMMARY_PROMPT,
        messages: [{ role: "user", content: JSON.stringify(payload) }]
      });
      const text = message.content.find((part) => part.type === "text")?.text;
      if (text) return text.trim();
    }

    if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const response = await openai.responses.create({
        model: process.env.OPENAI_MODEL ?? "gpt-5-mini",
        input: `${SUMMARY_PROMPT}\n\nAudit JSON:\n${JSON.stringify(payload)}`
      });
      if (response.output_text) return response.output_text.trim();
    }
  } catch {
    return createFallbackSummary(result);
  }

  return createFallbackSummary(result);
}

