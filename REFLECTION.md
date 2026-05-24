# Reflection

## 1. Hardest Bug

The hardest technical problem was the `withSavings` guard for currency-converted users. The engine stores all thresholds in USD (e.g. `convertUsd(500, input.currency)` for the OpenAI API rule trigger) and converts plan prices the same way. Without the guard, an INR user entering ₹800/month for Cursor Business 4-seat would trigger the downgrade rule, and the engine would recommend a "savings" of ₹400/month — but the optimized plan at ₹20 × 4 in USD-to-INR terms was actually ₹6,700, far above the user's self-reported spend. `withSavings` detects when `optimizedSpend >= currentSpend` and demotes `action` to `"monitor"` with an explanation to check invoice currency and applied credits. The test `tests/audit-engine.test.ts` — "does not recommend a converted plan that costs more than current INR spend" — covers exactly this case.

The second hard problem was the data boundary between `Audit` and `Lead`. The public report route needed to be shareable without leaking email, company, or role. The solution was a deliberate Prisma model split: `POST /api/audits` stores the full report, `POST /api/leads` stores contact details referencing the slug. The `/report/[slug]` page fetches only `Audit` fields. No join or conditional filtering is required at query time because the fields are in different tables.

## 2. Decision Reversed

Early in scaffolding I considered keeping the audit engine purely client-side (no API route, no database) so the demo would work without any environment setup. That would have made running the project zero-friction, but it directly breaks three Credex requirements: shareable report URLs need a server-side slug store, lead capture needs a backend write + email trigger, and the audit result must be reproducible from a URL. I reversed the decision and added the full API route + Prisma path. The tradeoff is that running locally requires `DATABASE_URL` and the project cannot be demoed without at least a local SQLite or a Supabase connection, but the submission becomes what was actually asked for: a launchable tool, not a local calculator.

## 3. Week 2 Build

- **Benchmark mode:** compare a team's AI spend per engineer or per use case against anonymized p25/p50/p75 from audits in the same stage bucket. This turns the report from a one-off calculator into a recurring reference.
- **PDF export:** generate a finance-readable summary of the report (tool, current plan, recommended plan, monthly savings, annual savings) so founders can share it with a CFO or procurement without sending a link.
- **Pricing snapshot versioning:** add a `PricingSnapshot` table with a `validFrom` date. Each `Audit` stores a `snapshotId` so the report remains reproducible even after Cursor or OpenAI changes list prices.
- **Renewal-date alerts:** let users opt into an email 30 days before their stated annual renewal date so the tool creates a second touch without requiring a new audit.

## 4. AI Usage

AI was used to accelerate boilerplate: Next.js page scaffolding, Prisma schema drafts, Tailwind layout structure, and test case stubs. I did not use AI for:
- Pricing data (verified directly at each vendor's pricing page on 2026-05-21).
- Audit rule math (each rule threshold and savings calculation is manually derived and covered by a named test case).
- User interview content (the file is a capture template; real conversations must fill it before submission).

The specific risk with AI in this project is hallucinated pricing — a model trained before a vendor repriced will confidently give the wrong number. Every price in `PRICING_DATA.md` and `lib/audit-engine/pricing.ts` was cross-checked against a live vendor URL.

## 5. Self-Rating

| Area | Score | Rationale |
|------|-------|-----------|
| Discipline | 7/10 | Strong day-one scope, correct model split, honest no-savings state. Final score depends on real daily commits. |
| Code quality | 8/10 | Typed engine, Zod validation, `clampSavings` guard, currency conversion, 5 test files, CI workflow. |
| Design sense | 8/10 | Dark premium UI, Framer Motion transitions, Recharts dashboard. Needs screenshot polish after deployment. |
| Problem-solving | 8/10 | INR `withSavings` guard and `Audit`/`Lead` model split are non-obvious correctness decisions, not just scaffolding. |
| Entrepreneurial thinking | 7/10 | GTM, economics, and metrics are grounded in the Credex credit-sourcing angle. Real interviews must still validate positioning. |
