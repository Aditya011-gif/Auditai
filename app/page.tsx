import Link from "next/link";
import { ArrowRight, BadgeDollarSign, BarChart3, Bot, BrainCircuit, CheckCircle2, Github, LineChart, Lock, Share2, Sparkles, Zap } from "lucide-react";
import { DemoDashboard } from "@/components/demo-dashboard";
import { MotionSection } from "@/components/motion-section";
import { Button } from "@/components/ui/button";

const logos = ["Northstar", "Relay", "Patch", "Monarch", "Vector"];
const features = [
  ["Smart pricing analysis", "Plan-fit checks by seat count, use case, and spend level.", BadgeDollarSign],
  ["API cost optimization", "Separates metered work from subscription-friendly workloads.", LineChart],
  ["Alternative recommendations", "Suggests cheaper same-vendor or peer tools when defensible.", Sparkles],
  ["AI-generated summaries", "Consultant-style explanation with safe deterministic fallback.", Bot],
  ["Shareable reports", "Public URLs strip private lead data and render clean previews.", Share2],
  ["Benchmarking hooks", "Designed for spend-per-developer comparisons as data grows.", BarChart3]
];

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-mesh opacity-90" />
      <div className="absolute inset-0 noise opacity-30" />
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07080d]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Zap className="size-4" /></span>
            AuditAI
          </Link>
          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features">Features</a>
            <a href="#logic">Pricing Logic</a>
            <Link href="/report/example">Example Audit</Link>
            <a href="#faq">FAQ</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <Button asChild size="sm"><Link href="/audit">Run Audit</Link></Button>
        </div>
      </nav>

      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[1fr_.88fr] lg:px-8">
        <MotionSection className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-teal-100">
            <Sparkles className="size-4 text-primary" /> $2.4M+ analyzed AI spend
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
            Your AI Stack Is Probably Bleeding Money
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Analyze your AI subscriptions, API usage, and team plans to uncover hidden savings in seconds.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg"><Link href="/audit">Run Free Audit <ArrowRight className="size-4" /></Link></Button>
            <Button asChild size="lg" variant="secondary"><Link href="/report/example">View Example Report</Link></Button>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div><strong className="block text-2xl text-white">2,300+</strong>audits generated</div>
            <div><strong className="block text-2xl text-white">18%</strong>median savings</div>
            <div><strong className="block text-2xl text-white">0</strong>login required</div>
          </div>
        </MotionSection>
        <MotionSection delay={0.12}>
          <DemoDashboard />
        </MotionSection>
      </section>

      <section className="relative border-y border-white/10 bg-white/[.025] py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
          {logos.map((logo) => <span key={logo} className="font-semibold uppercase tracking-[0.24em]">{logo}</span>)}
        </div>
      </section>

      <MotionSection className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" id="logic">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold sm:text-5xl">Three minutes to a defensible audit</h2>
          <p className="mt-4 text-muted-foreground">No black-box math. AuditAI uses explicit business rules a finance lead can inspect.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {["Input your AI stack", "We analyze overspending", "Get optimization recommendations"].map((title, index) => (
            <div className="glass rounded-2xl p-6" key={title}>
              <span className="text-sm text-primary">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Seat count, plan fit, usage intensity, API spend, and credible alternatives are scored together.</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8" id="features">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-5xl">Built like a growth loop, not a calculator</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, copy, Icon]) => (
            <div key={title as string} className="group rounded-2xl border border-white/10 bg-white/[.045] p-6 transition hover:-translate-y-1 hover:bg-white/[.07]">
              <div className="mb-5 grid size-11 place-items-center rounded-xl bg-primary/15 text-primary shadow-glow">
                <Icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{title as string}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy as string}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-5xl">Reports people actually share</h2>
            <p className="mt-4 text-muted-foreground">The result page is built for screenshots, stakeholder forwarding, and Credex-qualified lead capture after value is delivered.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Credex surfaces only for high-savings audits", "Low-savings users get honest reassurance", "Open Graph and Twitter cards included", "Private lead details never appear publicly"].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" /> {item}
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <section id="faq" className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold sm:text-5xl">FAQ</h2>
        <div className="mt-10 space-y-4">
          {[
            ["Is this connected to my billing account?", "No. The MVP uses user-entered spend and plan data so founders can get a fast second opinion without OAuth friction."],
            ["Does AI calculate the savings?", "No. Savings are deterministic. AI only writes the short consultant-style summary."],
            ["When does Credex appear?", "Credex is highlighted for reports with more than $500 in monthly savings or high API/credit opportunities."],
            ["Is my email public?", "No. Public reports strip lead data and show only tools, recommendations, and savings."],
            ["Can this scale?", "The design is stateless at the app layer, with Postgres persistence and queue-ready seams for email and LLM calls."]
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
              <h3 className="font-semibold">{q}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative border-t border-white/10 px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row">
          <span>AuditAI - Stop Overpaying for AI Tools.</span>
          <div className="flex gap-5">
            <Link href="/audit">Run audit</Link><Link href="/report/example">Example</Link><a href="#">Privacy</a><a href="#">Terms</a><Github className="size-4" />
          </div>
        </div>
      </footer>
    </main>
  );
}

