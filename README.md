# AuditAI

AuditAI is a no-login AI spend audit tool for startup founders and engineering managers. It accepts self-reported stack data (tools, plans, seat counts, monthly spend, usage intensity), runs deterministic optimization rules across seven tool-specific rule branches plus a high-spend catch-all, generates a shareable public report, and gates lead capture until after the user sees quantified savings.

**Live URL:** _add Vercel URL before submission_  
**Tagline:** Stop Overpaying for AI Tools.

## Screenshots

_Add after deployment:_

- Landing page hero (`/`)
- Multi-step audit form (`/audit`)
- Shareable report dashboard (`/report/[slug]`)

## Quick Start

```bash
npm install
cp .env.example .env        # fill ANTHROPIC_API_KEY, RESEND_API_KEY, EMAIL_FROM, NEXT_PUBLIC_APP_URL
npm run db:generate          # generates Prisma client from prisma/schema.prisma
npm run dev                  # starts Next.js dev server on http://localhost:3000
```

For production: create a Supabase Postgres project, set `DATABASE_URL`, run `npm run db:push`, and deploy to Vercel with all four env vars set.

## Architecture Summary

- **Next.js App Router** — marketing page, multi-step audit form, public report pages, API routes, sitemap, and robots in a single project.
- **Prisma + Supabase Postgres** — `Audit` and `Lead` models with separate fields so public report routes never expose lead data.
- **`lib/audit-engine/index.ts`** — deterministic rule engine with eight rule branches (Cursor, ChatGPT, Gemini, OpenAI API, Anthropic API, GitHub Copilot, Windsurf, high-spend catch-all). LLMs are only used for the 100-word summary paragraph and fall back to `createFallbackSummary` if the API is unavailable.
- **Resend** — transactional confirmation email sent after a lead submits email post-report.
- **Zustand + `localStorage`** — multi-step form state survives page reloads without a backend session.

## Key Decisions

1. **Deterministic audit math:** all savings figures come from explicit rule logic in `lib/audit-engine/index.ts`, not from the LLM. The LLM prompt explicitly forbids inventing numbers.
2. **Email gate after value:** `POST /api/leads` is only callable from the report page after the user has seen savings. This satisfies the Credex post-value capture requirement.
3. **Separate `Audit` and `Lead` models:** the public report route (`/report/[slug]`) reads only `Audit` fields; email, company, and role are stored only on `Lead`.
4. **`clampSavings` guard:** all savings values go through `Math.max(0, Math.round(value))` so the engine can never display negative savings.
5. **Currency-aware math:** `convertUsd` converts every threshold and plan price into the user's currency before comparison, so INR and EUR users get correct recommendations.
6. **Honest zero-savings state:** if no rule fires and spend is below $1,000/mo, `action` is set to `"keep"` and the report says the stack looks disciplined — it does not manufacture waste.

## Scripts

```bash
npm run dev          # Next.js dev server
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm test             # Vitest unit tests (tests/)
npm run build        # Production build (verify before submission)
npm run db:generate  # Regenerate Prisma client after schema changes
npm run db:push      # Push schema to database (dev/staging)
```
