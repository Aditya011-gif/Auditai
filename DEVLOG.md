# Devlog

## Day 1 — 2026-05-21
**Hours worked:** 6  
**What I built:**
- Scaffolded Next.js App Router project with TypeScript, Tailwind, and Prisma.
- Wrote `prisma/schema.prisma` with `Audit` and `Lead` models (separate to protect lead privacy on public report routes).
- Built `lib/audit-engine/index.ts` with 8 deterministic rule branches covering Cursor, ChatGPT, Gemini, OpenAI API, Anthropic API, GitHub Copilot, Windsurf, and a high-spend catch-all. Added `clampSavings` and `withSavings` guards.
- Built `lib/audit-engine/pricing.ts` with a `pricingCatalog` keyed by tool ID and a `getPlanPrice` helper.
- Added currency conversion in `lib/currency.ts` so INR/EUR users get correct thresholds and plan-price comparisons.
- Built `POST /api/audits` (Zod validation → engine → Anthropic haiku summary with fallback → Prisma write → slug return).
- Built `POST /api/leads` (Prisma write → Resend transactional email).
- Built `/report/[slug]` page reading only sanitized `Audit` fields; lead capture modal appears after report content.
- Set up Vitest with 4 test files covering engine rules, validation, and component rendering.
- Wrote all required documentation stubs (README, ARCHITECTURE, DEVLOG, REFLECTION, TESTS, PRICING_DATA, PROMPTS, GTM, ECONOMICS, USER_INTERVIEWS, LANDING_COPY, METRICS).
- Set up `.github/workflows/ci.yml` to run lint, typecheck, and tests on every push.

**What I learned:** Separating the `Audit` and `Lead` Prisma models upfront was the right call — it made the public report route trivially safe without query gymnastics. The `withSavings` guard (demoting a recommendation to `"monitor"` when the optimized cost exceeds self-reported spend) turned out to be essential for INR users where USD thresholds compare incorrectly without currency conversion.

**Blockers:** Production Supabase project and Resend domain verification not yet done. Vercel deployment URL pending. `ANTHROPIC_API_KEY` not confirmed in prod environment.

**Plan for tomorrow:** Deploy to Vercel, connect Supabase, verify Resend sender domain, capture three screenshots, and run a Lighthouse pass.

---

## Day 2 — 2026-05-22
**Hours worked:** 0  
**What I did:** No work done. Update this entry honestly after the session.  
**What I learned:** TBD  
**Blockers:** TBD  
**Plan for tomorrow:** TBD

---

## Day 3 — 2026-05-23
**Hours worked:** 0  
**What I did:** No work done. Update this entry honestly after the session.  
**What I learned:** TBD  
**Blockers:** TBD  
**Plan for tomorrow:** TBD

---

## Day 4 — 2026-05-24
**Hours worked:** 0  
**What I did:** No work done. Update this entry honestly after the session.  
**What I learned:** TBD  
**Blockers:** TBD  
**Plan for tomorrow:** TBD

---

## Day 5 — 2026-05-25
**Hours worked:** 0  
**What I did:** No work done. Update this entry honestly after the session.  
**What I learned:** TBD  
**Blockers:** TBD  
**Plan for tomorrow:** TBD

---

## Day 6 — 2026-05-26
**Hours worked:** 0  
**What I did:** No work done. Update this entry honestly after the session.  
**What I learned:** TBD  
**Blockers:** TBD  
**Plan for tomorrow:** TBD

---

## Day 7 — 2026-05-27
**Hours worked:** 0  
**What I did:** No work done. Update this entry honestly after the session.  
**What I learned:** TBD  
**Blockers:** TBD  
**Final action:** Submit after verifying Vercel deployment, all env vars set, screenshots added to README, and Lighthouse score ≥ 90.
