import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendAuditEmail } from "@/lib/email/send-audit-email";
import { leadSchema } from "@/lib/validation/audit";
import type { AuditInput, AuditResult, ToolRecommendation } from "@/types/audit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (!checkRateLimit(`lead:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "Too many lead attempts." }, { status: 429 });
  }

  const body = await request.json();
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 });
  }

  const audit = await prisma.audit.findUnique({ where: { slug: parsed.data.auditSlug } });
  if (!audit) {
    return NextResponse.json({ error: "Audit not found." }, { status: 404 });
  }

  await prisma.lead.create({
    data: {
      email: parsed.data.email,
      company: parsed.data.company || null,
      role: parsed.data.role || null,
      teamSize: parsed.data.teamSize || null,
      auditId: audit.id
    }
  });

  const result: AuditResult = {
    slug: audit.slug,
    input: audit.tools as unknown as AuditInput,
    recommendations: audit.recommendations as unknown as ToolRecommendation[],
    totals: audit.savings as AuditResult["totals"],
    summary: audit.summary,
    generatedAt: audit.createdAt.toISOString()
  };

  const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? request.nextUrl.origin}/report/${audit.slug}`;
  await sendAuditEmail({ email: parsed.data.email, reportUrl, result });

  return NextResponse.json({ ok: true });
}

