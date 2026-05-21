import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { runAudit } from "@/lib/audit-engine";
import { generateAuditSummary } from "@/lib/ai/summary";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { auditInputSchema } from "@/lib/validation/audit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!checkRateLimit(`audit:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many audits. Try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  const parsed = auditInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const firstPass = runAudit(parsed.data);
  const summary = await generateAuditSummary(firstPass);
  const result = { ...firstPass, summary };

  try {
    await prisma.audit.create({
      data: {
        slug: result.slug!,
        tools: parsed.data as unknown as Prisma.InputJsonValue,
        spend: { monthlySpend: result.totals.monthlySpend } as Prisma.InputJsonValue,
        savings: result.totals as unknown as Prisma.InputJsonValue,
        recommendations: result.recommendations as unknown as Prisma.InputJsonValue,
        summary
      }
    });
  } catch (error) {
    console.error("audit_persist_failed", error);
    return NextResponse.json({ error: "Audit persistence failed. Check DATABASE_URL and Prisma setup." }, { status: 500 });
  }

  return NextResponse.json({ slug: result.slug, result });
}
