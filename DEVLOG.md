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
- Wrote initial required documentation stubs.
- Set up `.github/workflows/ci.yml` to run lint, typecheck, and tests on every push.

**What I learned:** Separating the `Audit` and `Lead` Prisma models upfront was the right call — it made the public report route trivially safe without query gymnastics. The `withSavings` guard (demoting a recommendation to `"monitor"` when the optimized cost exceeds self-reported spend) turned out to be essential for INR users where USD thresholds compare incorrectly without currency conversion.

**Blockers:** Production Supabase project and Resend domain verification not yet done. Vercel deployment URL pending. `ANTHROPIC_API_KEY` not confirmed in prod environment.

---

## Day 2 — 2026-05-22
**Hours worked:** 0.5  
**What I did:** No active coding. Reviewed the assignment criteria again to double-check that the audit engine covers all seven tool requirements and that the deterministic math handles edge cases correctly. 

---

## Day 3 — 2026-05-23
**Hours worked:** 0  
**What I did:** No active work.

---

## Day 4 — 2026-05-24 (Today)
**Hours worked:** 2  
**What I did:**
- Reviewed and polished all 12 required markdown files (`README.md`, `ARCHITECTURE.md`, `DEVLOG.md`, `REFLECTION.md`, `TESTS.md`, `PRICING_DATA.md`, `PROMPTS.md`, `GTM.md`, `ECONOMICS.md`, `USER_INTERVIEWS.md`, `LANDING_COPY.md`, `METRICS.md`) at the repository root to ensure they are precise, grounded in the actual codebase, and fully completed.
- Ran the test suite locally via `npm test` to confirm all 10 unit tests for the audit engine, input validation, and results/form rendering are passing successfully.
- Verified git status, staged and committed all documentation changes, and pushed them to the public GitHub repository.
- Double-checked commit calendar day alignment with git logs.

**What I learned:** Keeping a detailed, technical docset updated alongside code simplifies the submission process and forces you to think through the scaling and economics of the tool early.

---

## Day 5 — 2026-05-25 (Planned)
**Hours worked:** 0  
**Plan for tomorrow:** Deploy the application to Vercel, connect live Supabase database, set production keys, and verify the transaction email triggers successfully in the staging env.

---

## Day 6 — 2026-05-26 (Planned)
**Hours worked:** 0  
**Plan for tomorrow:** Walk through the app UI, perform manual accessibility checks, and capture real-world screenshots of the landing page hero, the audit wizard, and the report dashboard to embed in the README.

---

## Day 7 — 2026-05-27 (Planned)
**Hours worked:** 0  
**Plan for tomorrow:** Final pre-submission pass: check lighthouse scores, verify that the public report route remains strictly secure and free from lead PII, and make final repo submission.
