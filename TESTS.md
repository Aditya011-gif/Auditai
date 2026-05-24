# Tests

Run all tests:

```bash
npm test
```

Vitest is configured in `vitest.config.ts`. Tests live in `tests/`. The CI pipeline (`.github/workflows/ci.yml`) runs `npm run lint`, `npm run typecheck`, and `npm test` on every push to `main`.

## Test Files

### `tests/audit-engine.test.ts` — Deterministic rule coverage

Each test maps to one named rule branch in `lib/audit-engine/index.ts`.

| Test | Rule triggered | Assert |
|------|---------------|--------|
| Cursor Business 4-seat → Pro | `plan === "Business" && seats < 5` | `optimizedPlan === "Pro"`, `monthlySavings === 80` |
| ChatGPT Team 2-seat → Plus | `plan === "Team" && seats <= 2` | `optimizedPlan === "Plus"`, `monthlySavings === 20` |
| Gemini Ultra low-usage → Pro | `plan === "Ultra" && usageIntensity === "low"` | `optimizedPlan === "Pro"`, `monthlySavings > 170` |
| OpenAI API $850 writing → Claude Max | `spend > $500 && useCase === "writing"` | `optimizedPlan` contains `"Claude Max"`, `totals.monthlySavings > 300` |
| Efficient stack (Claude Pro 1-seat) | No rule fires | `monthlySavings === 0`, `action === "keep"` |
| Cursor Business 4-seat, INR ₹800/mo | Optimized cost > current spend | `monthlySavings === 0`, `action === "monitor"` (withSavings guard) |

### `tests/validation.test.ts` — API input validation

- Invalid email format is rejected by the Zod schema.
- Negative `monthlySpend` is rejected by the Zod schema.

### `tests/results-dashboard.test.tsx` — Report component

- `ResultsDashboard` renders monthly savings and annual savings figures from the sample report in `lib/sample-report.ts`.

### `tests/audit-form.test.tsx` — Form component

- `AuditForm` renders with the default form state from `lib/default-audit.ts` without crashing.

## What Is Not Tested Yet (Known Gaps)

- `POST /api/audits` and `POST /api/leads` route handlers (would need a test database or mock Prisma client).
- `/report/[slug]` page rendering with a real database record (needs integration test setup with Playwright or similar).
- Anthropic fallback path — the `createFallbackSummary` function is exercised manually but not in a named test.
- Resend email delivery (out of scope for unit tests; verify manually with a real `RESEND_API_KEY`).
