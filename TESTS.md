# Tests

Run all tests:

```bash
npm test
```

## Automated Tests

- `tests/audit-engine.test.ts`
  - Cursor Business under five seats recommends Cursor Pro.
  - ChatGPT Team with two users recommends ChatGPT Plus.
  - Gemini Ultra with low usage recommends Gemini Pro.
  - OpenAI API spend over `$500/mo` for writing recommends Claude Max/capped usage.
  - Already-efficient stack does not manufacture savings.
- `tests/validation.test.ts`
  - Invalid email is rejected.
  - Negative monthly spend is rejected.
- `tests/results-dashboard.test.tsx`
  - Results dashboard renders monthly and annual savings from the sample report.
- `tests/audit-form.test.tsx`
  - Audit form renders persisted default form state.

CI runs lint, typecheck, and tests through `.github/workflows/ci.yml`.

