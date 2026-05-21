# AuditAI

AuditAI is a no-login AI spend audit tool for startup founders and engineering managers who suspect their AI subscriptions and API usage have drifted out of control. It collects stack, seat, use-case, and spend data, runs deterministic optimization rules, generates a shareable report, and captures qualified Credex leads after value is shown.

**Live URL:** add Vercel URL before submission  
**Product tagline:** Stop Overpaying for AI Tools.

## Screenshots

Add 3 screenshots or a 30-second Loom/YouTube walkthrough after deployment:

- Landing page hero
- Multi-step audit flow
- Shareable report dashboard

## Quick Start

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

For production, create a Supabase Postgres project, set `DATABASE_URL`, run `npm run db:push`, and deploy to Vercel with `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, `EMAIL_FROM`, and `NEXT_PUBLIC_APP_URL`.

## Architecture Summary

- Next.js App Router renders the marketing page, audit form, public reports, metadata, sitemap, and API routes.
- Prisma writes audits, leads, and analytics events to Supabase Postgres.
- `lib/audit-engine` performs deterministic spend analysis; LLMs only write the short summary.
- Resend sends the confirmation email after lead capture.

## Decisions

1. **Deterministic audit math over AI reasoning:** savings must be explainable and testable, so the engine uses explicit rules.
2. **Email gate after value:** the report is shown first because Credex explicitly requires post-value capture.
3. **Public report sanitization:** report routes never expose email, company, or role.
4. **Prisma on Supabase Postgres:** keeps a typed schema while staying deployable on Vercel.
5. **Honest low-savings state:** the app says "you are spending well" instead of inventing waste, which improves trust.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

