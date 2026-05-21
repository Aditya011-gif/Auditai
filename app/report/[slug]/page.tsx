import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultsDashboard } from "@/components/results-dashboard";
import { getSampleReport } from "@/lib/sample-report";
import { prisma } from "@/lib/prisma";
import type { AuditInput, AuditResult, ToolRecommendation } from "@/types/audit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getReport(slug: string): Promise<AuditResult | null> {
  if (slug === "example") return getSampleReport();

  try {
    const audit = await prisma.audit.findUnique({ where: { slug } });
    if (!audit) return null;
    return {
      slug: audit.slug,
      input: { ...(audit.tools as unknown as AuditInput), tools: (audit.tools as unknown as AuditInput).tools },
      recommendations: audit.recommendations as unknown as ToolRecommendation[],
      totals: audit.savings as AuditResult["totals"],
      summary: audit.summary,
      generatedAt: audit.createdAt.toISOString()
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) return { title: "Audit report not found" };
  return {
    title: `${report.totals.annualSavings.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} annual AI savings found`,
    description: report.summary,
    openGraph: {
      title: `AuditAI found ${report.totals.savingsPercentage}% AI spend savings`,
      description: report.summary,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: `AuditAI found ${report.totals.savingsPercentage}% savings`,
      description: report.summary
    }
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) notFound();
  return <ResultsDashboard result={report} />;
}

