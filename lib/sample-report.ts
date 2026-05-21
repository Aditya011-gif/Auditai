import { runAudit, createFallbackSummary } from "@/lib/audit-engine";
import { defaultAuditInput } from "@/lib/default-audit";

export function getSampleReport() {
  const result = runAudit(defaultAuditInput);
  return { ...result, slug: "example", summary: createFallbackSummary(result) };
}
