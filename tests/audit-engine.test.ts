import { describe, expect, it } from "vitest";
import { runAudit } from "@/lib/audit-engine";
import { defaultAuditInput } from "@/lib/default-audit";
import type { AuditInput } from "@/types/audit";

function withOneTool(overrides: Partial<AuditInput["tools"][number]>, input: Partial<AuditInput> = {}) {
  return {
    ...defaultAuditInput,
    primaryUseCase: input.primaryUseCase ?? defaultAuditInput.primaryUseCase,
    tools: [
      {
        id: "cursor",
        enabled: true,
        plan: "Business",
        monthlySpend: 160,
        seats: 4,
        usageIntensity: "high",
        ...overrides
      }
    ]
  } as AuditInput;
}

describe("audit engine", () => {
  it("downgrades Cursor Business for teams under five seats", () => {
    const result = runAudit(withOneTool({ id: "cursor", plan: "Business", seats: 4, monthlySpend: 160 }));
    expect(result.recommendations[0].optimizedPlan).toBe("Pro");
    expect(result.recommendations[0].monthlySavings).toBe(80);
  });

  it("downgrades ChatGPT Team for two users", () => {
    const result = runAudit(withOneTool({ id: "chatgpt", plan: "Team", seats: 2, monthlySpend: 60 }));
    expect(result.recommendations[0].optimizedPlan).toBe("Plus");
    expect(result.recommendations[0].monthlySavings).toBe(20);
  });

  it("downgrades Gemini Ultra for low usage", () => {
    const result = runAudit(withOneTool({ id: "gemini", plan: "Ultra", seats: 1, monthlySpend: 200, usageIntensity: "low" }));
    expect(result.recommendations[0].optimizedPlan).toBe("Pro");
    expect(result.recommendations[0].monthlySavings).toBeGreaterThan(170);
  });

  it("moves writing-heavy OpenAI API spend toward capped subscription usage", () => {
    const result = runAudit(withOneTool({ id: "openai-api", plan: "API direct", monthlySpend: 850 }, { primaryUseCase: "writing" }));
    expect(result.recommendations[0].optimizedPlan).toContain("Claude Max");
    expect(result.totals.monthlySavings).toBeGreaterThan(300);
  });

  it("does not manufacture savings when a stack is already efficient", () => {
    const result = runAudit(withOneTool({ id: "claude", plan: "Pro", seats: 1, monthlySpend: 20, usageIntensity: "medium" }, { primaryUseCase: "research" }));
    expect(result.totals.monthlySavings).toBe(0);
    expect(result.recommendations[0].action).toBe("keep");
  });
});

