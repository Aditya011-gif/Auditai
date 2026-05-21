import { NextResponse } from "next/server";
import { getSampleReport } from "@/lib/sample-report";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "example") return NextResponse.json(getSampleReport());
  const audit = await prisma.audit.findUnique({ where: { slug } });
  if (!audit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    slug: audit.slug,
    tools: audit.tools,
    savings: audit.savings,
    recommendations: audit.recommendations,
    summary: audit.summary,
    createdAt: audit.createdAt
  });
}

