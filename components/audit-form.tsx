"use client";

import React from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { defaultTools } from "@/lib/default-audit";
import { pricingCatalog } from "@/lib/audit-engine/pricing";
import { auditInputSchema, type AuditInputValues } from "@/lib/validation/audit";
import { formatCurrency } from "@/lib/utils";
import { useAuditStore } from "@/store/audit-store";

const steps = ["Company", "Tools", "API", "Review"];
const useCases = [
  ["coding", "Coding"],
  ["writing", "Writing"],
  ["research", "Research"],
  ["data", "Data analysis"],
  ["mixed", "Mixed"]
] as const;

export function AuditForm() {
  const router = useRouter();
  const { draft, setDraft } = useAuditStore();
  const [step, setStep] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);
  const form = useForm<AuditInputValues>({
    resolver: zodResolver(auditInputSchema),
    defaultValues: draft,
    mode: "onChange"
  });
  const values = form.watch();

  useEffect(() => {
    const sub = form.watch((value) => setDraft(value as AuditInputValues));
    return () => sub.unsubscribe();
  }, [form, setDraft]);

  const selectedTools = useMemo(() => values.tools?.filter((tool) => tool.enabled) ?? [], [values.tools]);
  const totalSpend = useMemo(() => selectedTools.reduce((sum, tool) => sum + Number(tool.monthlySpend || 0), 0), [selectedTools]);

  async function onSubmit(input: AuditInputValues) {
    setSubmitting(true);
    const response = await fetch("/api/audits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input)
    });
    if (!response.ok) {
      setSubmitting(false);
      form.setError("root", { message: "Audit generation failed. Check your fields and try again." });
      return;
    }
    const data = (await response.json()) as { slug: string };
    router.push(`/report/${data.slug}`);
  }

  return (
    <main className="min-h-screen bg-background bg-mesh px-4 py-7 text-foreground sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground">AuditAI</Link>
          <div className="text-sm text-muted-foreground">{formatCurrency(totalSpend)}/mo selected</div>
        </div>
        <div className="glass rounded-2xl p-5 sm:p-7">
          <div className="mb-7 grid gap-2 sm:grid-cols-4">
            {steps.map((label, index) => (
              <button key={label} className={`rounded-full px-4 py-2 text-sm ${index === step ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground"}`} onClick={() => setStep(index)} type="button">
                {index < step ? <Check className="mr-1 inline size-4" /> : null}{label}
              </button>
            ))}
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.section key="company" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h1 className="text-3xl font-semibold">Tell us about the team</h1>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                      <span className="text-sm text-muted-foreground">Team size</span>
                      <input className="mt-2 w-full bg-transparent text-3xl font-semibold outline-none" type="number" min={1} {...form.register("teamSize", { valueAsNumber: true })} />
                    </label>
                    <label className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                      <span className="text-sm text-muted-foreground">Company stage</span>
                      <select className="mt-3 w-full rounded-xl border border-white/10 bg-[#0d111a] p-3" {...form.register("companyStage")}>
                        <option value="solo">Solo</option><option value="pre-seed">Pre-seed</option><option value="seed">Seed</option><option value="series-a">Series A</option><option value="growth">Growth</option>
                      </select>
                    </label>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-5">
                    {useCases.map(([value, label]) => (
                      <button type="button" key={value} onClick={() => form.setValue("primaryUseCase", value, { shouldValidate: true })} className={`rounded-2xl border p-4 text-left transition ${values.primaryUseCase === value ? "border-primary bg-primary/15" : "border-white/10 bg-white/[.04]"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.section>
              )}
              {step === 1 && (
                <motion.section key="tools" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <h1 className="text-3xl font-semibold">Select your AI stack</h1>
                      <p className="mt-2 text-sm text-muted-foreground">Toggle tools you pay for, then adjust plan, spend, seats, and usage.</p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm text-muted-foreground">
                      {selectedTools.length} tools · {formatCurrency(totalSpend)}/mo
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3">
                    {(values.tools ?? defaultTools).map((tool, index) => {
                      const catalog = pricingCatalog[tool.id];
                      return (
                        <div key={tool.id} className={`rounded-2xl border p-4 transition ${tool.enabled ? "border-primary/45 bg-primary/[.08] shadow-[0_0_40px_rgba(45,212,191,.08)]" : "border-white/10 bg-white/[.035] hover:bg-white/[.055]"}`}>
                          <div className="grid gap-4 md:grid-cols-[minmax(150px,1.05fr)_minmax(140px,1fr)_minmax(140px,1fr)_minmax(96px,.65fr)_minmax(150px,1fr)] md:items-end">
                            <label className="flex min-h-16 items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/10 px-4 py-3 md:min-h-[70px]">
                              <span>
                                <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">Tool</span>
                                <span className="mt-1 block font-semibold">{catalog.name}</span>
                              </span>
                              <input className="size-4 accent-primary" type="checkbox" {...form.register(`tools.${index}.enabled`)} />
                            </label>
                            <label className="block">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Plan</span>
                              <select className="h-12 w-full rounded-xl border border-white/10 bg-[#0d111a] px-3 outline-none transition focus:border-primary/60" {...form.register(`tools.${index}.plan`)}>
                                {catalog.plans.map((plan) => <option key={plan.plan} value={plan.plan}>{plan.plan}</option>)}
                              </select>
                            </label>
                            <label className="block">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Monthly spend</span>
                              <input aria-label={`${catalog.name} monthly spend`} className="h-12 w-full rounded-xl border border-white/10 bg-[#0d111a] px-3 outline-none transition focus:border-primary/60" type="number" min={0} {...form.register(`tools.${index}.monthlySpend`, { valueAsNumber: true })} />
                            </label>
                            <label className="block">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Seats</span>
                              <input aria-label={`${catalog.name} seats`} className="h-12 w-full rounded-xl border border-white/10 bg-[#0d111a] px-3 outline-none transition focus:border-primary/60" type="number" min={1} {...form.register(`tools.${index}.seats`, { valueAsNumber: true })} />
                            </label>
                            <label className="block">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Usage</span>
                              <select className="h-12 w-full rounded-xl border border-white/10 bg-[#0d111a] px-3 outline-none transition focus:border-primary/60" {...form.register(`tools.${index}.usageIntensity`)}>
                              <option value="low">Low usage</option><option value="medium">Medium usage</option><option value="high">High usage</option>
                              </select>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.section>
              )}
              {step === 2 && (
                <motion.section key="api" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h1 className="text-3xl font-semibold">API usage</h1>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                      <span className="text-sm text-muted-foreground">Estimated token spend</span>
                      <input className="mt-2 w-full bg-transparent text-3xl font-semibold outline-none" type="number" min={0} {...form.register("apiUsage.tokenSpend", { valueAsNumber: true })} />
                    </label>
                    <label className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                      <span className="text-sm text-muted-foreground">Monthly request volume</span>
                      <input className="mt-2 w-full bg-transparent text-3xl font-semibold outline-none" type="number" min={0} {...form.register("apiUsage.requestVolume", { valueAsNumber: true })} />
                    </label>
                  </div>
                  <textarea className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-white/[.04] p-4 outline-none" placeholder="Describe the heaviest API workflows..." {...form.register("apiUsage.averageMonthlyUsage")} />
                </motion.section>
              )}
              {step === 3 && (
                <motion.section key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h1 className="text-3xl font-semibold">Review your audit</h1>
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.04] p-5">
                    <div className="text-sm text-muted-foreground">Estimated current AI spend</div>
                    <div className="mt-2 text-5xl font-semibold">{formatCurrency(totalSpend)}<span className="text-lg text-muted-foreground">/mo</span></div>
                    <div className="mt-2 text-muted-foreground">{formatCurrency(totalSpend * 12)} estimated annual cost</div>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {values.tools?.filter((tool) => tool.enabled).map((tool) => <div className="rounded-xl bg-white/[.04] p-3 text-sm" key={tool.id}>{pricingCatalog[tool.id].name} - {tool.plan} - {formatCurrency(tool.monthlySpend)}</div>)}
                  </div>
                  {form.formState.errors.root ? <p className="mt-4 text-sm text-rose-300">{form.formState.errors.root.message}</p> : null}
                </motion.section>
              )}
            </AnimatePresence>
            <div className="mt-8 flex justify-between">
              <Button type="button" variant="secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft className="size-4" /> Back</Button>
              {step < 3 ? (
                <Button type="button" onClick={() => setStep(Math.min(3, step + 1))}>Next <ArrowRight className="size-4" /></Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null} Generate audit</Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
