# Pricing Data

All prices are list prices used as directional inputs in `lib/audit-engine/pricing.ts`. Verify against live vendor pages before final submission. Each entry shows the exact URL and verification date.

## Cursor

| Plan | Price | Billing | Source | Verified |
|------|-------|---------|--------|----------|
| Hobby | $0/mo | — | https://cursor.com/pricing | 2026-05-21 |
| Pro | $20/user/month | monthly or annual | https://cursor.com/pricing | 2026-05-21 |
| Business | $40/user/month | monthly or annual | https://cursor.com/pricing | 2026-05-21 |
| Enterprise | custom; engine uses $80/user/month as a conservative placeholder | negotiated | https://cursor.com/pricing | 2026-05-21 |

Engine rule: Cursor Business → Pro is triggered at `seats < 5`, saving `seats × ($40 − $20) = seats × $20/mo`.

## GitHub Copilot

| Plan | Price | Source | Verified |
|------|-------|--------|----------|
| Individual | $10/user/month | https://github.com/features/copilot/plans | 2026-05-21 |
| Business | $19/user/month | https://github.com/features/copilot/plans | 2026-05-21 |
| Enterprise | $39/user/month | https://github.com/features/copilot/plans | 2026-05-21 |

Engine rule: Copilot Enterprise → Business is triggered at `seats < 10`, saving `seats × ($39 − $19) = seats × $20/mo`.

## Claude (Anthropic subscriptions)

| Plan | Price | Source | Verified |
|------|-------|--------|----------|
| Free | $0/mo | https://claude.com/pricing | 2026-05-21 |
| Pro | $20/user/month | https://claude.com/pricing | 2026-05-21 |
| Team | $30/user/month | https://claude.com/pricing | 2026-05-21 |
| Max | $100/user/month (baseline) | https://claude.com/pricing | 2026-05-21 |

Claude Pro is used as the recommended downgrade target for writing-heavy OpenAI API users. The Max plan is cited as the upgrade target for teams currently spending >$500/mo on OpenAI API for writing.

## Anthropic API (metered)

Pricing is per token, by model, with separate rates for cache writes and batch usage. The engine rule triggers at `monthlySpend > $750` and targets a 28 % reduction via batch/cache optimization. No flat price is hardcoded; the rule applies to the user's self-reported spend.

Source: https://docs.anthropic.com/en/docs/about-claude/pricing — verified 2026-05-21

## ChatGPT (OpenAI subscriptions)

| Plan | Price | Source | Verified |
|------|-------|--------|----------|
| Plus | $20/user/month | https://openai.com/chatgpt/pricing | 2026-05-21 |
| Team | $30/user/month (monthly billing) | https://openai.com/chatgpt/pricing | 2026-05-21 |
| Enterprise | custom; engine uses $60/user/month as a conservative placeholder | negotiated | https://openai.com/business/chatgpt-pricing/ | 2026-05-21 |

Engine rule: ChatGPT Team → Plus is triggered at `seats <= 2`, saving `seats × ($30 − $20) = seats × $10/mo`.

## OpenAI API (metered)

Pricing is per token by model. The engine rule triggers at `monthlySpend > $500` for writing-heavy use cases and targets a 45 % reduction by routing work to a capped Claude Max subscription. No flat price is hardcoded.

Source: https://openai.com/api/pricing — verified 2026-05-21

## Gemini (Google subscriptions)

| Plan | Price | Source | Verified |
|------|-------|--------|----------|
| Google AI Pro | $19.99/user/month | https://gemini.google/subscriptions/ | 2026-05-21 |
| Google AI Ultra | $249.99/user/month | https://gemini.google/subscriptions/ | 2026-05-21 |

Engine rule: Gemini Ultra → Pro is triggered at `usageIntensity === "low"`, saving approximately $230/user/month.

_Note: Google AI Ultra pricing has changed multiple times. Re-verify on submission day. The engine uses the list price at time of verification; if it has changed, update both this file and `lib/audit-engine/pricing.ts`._

## Gemini API (metered)

Pricing is per token by model. Metered; no flat price hardcoded in the engine.

Source: https://ai.google.dev/gemini-api/docs/pricing — verified 2026-05-21

## Windsurf (Codeium)

| Plan | Price | Source | Verified |
|------|-------|--------|----------|
| Free | $0/mo | https://windsurf.com/pricing | 2026-05-21 |
| Pro | $15/user/month | https://windsurf.com/pricing | 2026-05-21 |
| Teams | $30/user/month | https://windsurf.com/pricing | 2026-05-21 |
| Enterprise | custom; engine uses $60/user/month as a conservative placeholder | negotiated | https://windsurf.com/pricing | 2026-05-21 |

Engine rule: Windsurf Teams → Pro is triggered at `seats < 4`, saving `seats × ($30 − $15) = seats × $15/mo`.
