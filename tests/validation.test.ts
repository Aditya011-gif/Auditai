import { describe, expect, it } from "vitest";
import { auditInputSchema, leadSchema } from "@/lib/validation/audit";
import { defaultAuditInput } from "@/lib/default-audit";

describe("validation", () => {
  it("rejects invalid lead emails", () => {
    const parsed = leadSchema.safeParse({ email: "not-email", auditSlug: "audit-123456" });
    expect(parsed.success).toBe(false);
  });

  it("rejects negative spend", () => {
    const parsed = auditInputSchema.safeParse({
      ...defaultAuditInput,
      tools: [{ ...defaultAuditInput.tools[0], monthlySpend: -1 }]
    });
    expect(parsed.success).toBe(false);
  });
});

