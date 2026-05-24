import { z } from "zod";

export const selectedToolSchema = z.object({
  id: z.enum(["cursor", "github-copilot", "claude", "chatgpt", "gemini", "windsurf", "openai-api", "anthropic-api"]),
  enabled: z.boolean(),
  plan: z.string().min(1),
  monthlySpend: z.number().min(0).max(250000),
  seats: z.number().int().min(1).max(5000),
  usageIntensity: z.enum(["low", "medium", "high"])
});

export const auditInputSchema = z.object({
  teamSize: z.number().int().min(1).max(5000),
  companyStage: z.enum(["solo", "pre-seed", "seed", "series-a", "growth"]),
  primaryUseCase: z.enum(["coding", "writing", "research", "data", "mixed"]),
  currency: z.enum(["USD", "INR", "EUR", "GBP"]),
  tools: z.array(selectedToolSchema).min(1).refine((tools) => tools.some((tool) => tool.enabled), {
    message: "Select at least one AI tool."
  }),
  apiUsage: z.object({
    tokenSpend: z.number().min(0).max(250000),
    requestVolume: z.number().int().min(0).max(100000000),
    averageMonthlyUsage: z.string().max(400)
  })
});

export const leadSchema = z.object({
  email: z.string().email(),
  company: z.string().max(120).optional().or(z.literal("")),
  role: z.string().max(120).optional().or(z.literal("")),
  teamSize: z.coerce.number().int().min(1).max(5000).optional(),
  auditSlug: z.string().min(6),
  website: z.string().max(0).optional()
});

export type AuditInputValues = z.infer<typeof auditInputSchema>;
export type LeadValues = z.infer<typeof leadSchema>;
