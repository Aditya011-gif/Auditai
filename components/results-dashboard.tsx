"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownRight, Calendar, CheckCircle2, Lock, Mail, Sparkles } from "lucide-react";
import type { AuditResult } from "@/types/audit";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const colors = ["#2dd4bf", "#818cf8", "#f472b6", "#facc15", "#60a5fa", "#fb7185", "#34d399", "#c084fc"];

export function ResultsDashboard({ result }: { result: AuditResult }) {
  const [leadOpen, setLeadOpen] = useState(result.totals.monthlySavings > 0);
  const highSavings = result.totals.monthlySavings > 500;
  const pieData = result.recommendations.map((item) => ({ name: item.toolName, value: item.currentSpend }));
  const barData = result.recommendations.map((item) => ({
    name: item.toolName,
    current: item.currentSpend,
    optimized: item.optimizedSpend,
    savings: item.monthlySavings
  }));

  return (
    <main className="min-h-screen bg-background bg-mesh px-4 py-8 text-foreground sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="font-semibold">AuditAI</Link>
          <div className="flex gap-3">
            <Button asChild variant="secondary"><Link href="/audit">Run another audit</Link></Button>
            <Button onClick={() => setLeadOpen(true)}>Email report</Button>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-sm text-primary">
              <Sparkles className="size-4" /> {highSavings ? "Credex-qualified savings" : "Optimization report"}
            </div>
            <h1 className="text-balance text-4xl font-semibold sm:text-6xl">{formatCurrency(result.totals.monthlySavings)} monthly savings found</h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Metric label="Annual savings" value={formatCurrency(result.totals.annualSavings)} />
              <Metric label="Savings rate" value={formatPercent(result.totals.savingsPercentage)} />
              <Metric label="Current spend" value={`${formatCurrency(result.totals.monthlySpend)}/mo`} />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-white/10 bg-white/[.04] p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold"><Mail className="size-5 text-primary" /> Consultant summary</h2>
            <p className="leading-7 text-muted-foreground">{result.summary}</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-muted-foreground">
              {highSavings ? "This audit surfaces enough monthly waste to justify a Credex credit consultation." : "This stack is close to efficient. Keep monitoring renewal dates and usage growth."}
            </div>
          </motion.div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <ChartCard title="Spend distribution">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={100} paddingAngle={4}>
                  {pieData.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #243041", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Current vs optimized">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #243041", borderRadius: 12 }} />
                <Bar dataKey="current" fill="#fb7185" radius={[8, 8, 0, 0]} />
                <Bar dataKey="optimized" fill="#2dd4bf" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          {result.recommendations.map((item, index) => (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              key={item.toolId}
              className="rounded-2xl border border-white/10 bg-white/[.04] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{item.toolName}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.currentPlan} to {item.optimizedPlan}</p>
                </div>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-sm text-primary">{item.confidence}% confidence</span>
              </div>
              <p className="mt-4 leading-7 text-muted-foreground">{item.explanation}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <SmallStat label="Current" value={formatCurrency(item.currentSpend)} />
                <SmallStat label="Optimized" value={formatCurrency(item.optimizedSpend)} />
                <SmallStat label="Savings" value={formatCurrency(item.monthlySavings)} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.alternatives.map((alt) => <span key={alt} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">{alt}</span>)}
              </div>
            </motion.article>
          ))}
        </section>

        <section className="my-8 rounded-2xl border border-white/10 bg-white/[.04] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">{highSavings ? <ArrowDownRight className="size-5 text-primary" /> : <CheckCircle2 className="size-5 text-primary" />} {highSavings ? "Capture more savings with Credex" : "You are spending well"}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{highSavings ? "Your report crosses the threshold where discounted credits and procurement support can materially change annual burn." : "Get notified when new pricing changes affect your stack."}</p>
            </div>
            <Button onClick={() => setLeadOpen(true)}>{highSavings ? "Book consultation" : "Get alerts"} <Calendar className="size-4" /></Button>
          </div>
        </section>
      </div>
      {leadOpen ? <LeadCapture result={result} onClose={() => setLeadOpen(false)} /> : null}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>;
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-black/20 p-3"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 font-semibold">{value}</p></div>;
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><h2 className="mb-4 text-lg font-semibold">{title}</h2>{children}</div>;
}

function LeadCapture({ result, onClose }: { result: AuditResult; onClose: () => void }) {
  const [state, setState] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function submit(formData: FormData) {
    setState("saving");
    const response = await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        company: formData.get("company"),
        role: formData.get("role"),
        teamSize: formData.get("teamSize"),
        website: formData.get("website"),
        auditSlug: result.slug
      }),
      headers: { "content-type": "application/json" }
    });
    setState(response.ok ? "done" : "error");
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass w-full max-w-lg rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Send this report</h2>
          <button className="text-muted-foreground" onClick={onClose}>Close</button>
        </div>
        <p className="mb-5 flex gap-2 text-sm text-muted-foreground"><Lock className="size-4 shrink-0 text-primary" /> Your email and company details stay private and are not shown on the public report.</p>
        {state === "done" ? (
          <div className="rounded-2xl bg-primary/15 p-5 text-primary">Saved. Check your inbox for the audit summary.</div>
        ) : (
          <form action={submit} className="space-y-3">
            <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
            <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-white/10 bg-[#0d111a] p-3 outline-none" />
            <input name="company" placeholder="Company optional" className="w-full rounded-xl border border-white/10 bg-[#0d111a] p-3 outline-none" />
            <input name="role" placeholder="Role optional" className="w-full rounded-xl border border-white/10 bg-[#0d111a] p-3 outline-none" />
            <input name="teamSize" placeholder="Team size optional" type="number" min={1} className="w-full rounded-xl border border-white/10 bg-[#0d111a] p-3 outline-none" />
            {state === "error" ? <p className="text-sm text-rose-300">Could not save the lead. Please try again.</p> : null}
            <Button className="w-full" disabled={state === "saving"}>{state === "saving" ? "Saving..." : "Send report"}</Button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
