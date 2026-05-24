# Metrics

## North Star Metric

**Qualified monthly savings discovered** — the sum of `totals.monthlySavings` across completed audits in a rolling 30-day window, filtered to audits where `totals.monthlySavings > 0`.

This metric was chosen over DAU or audit count because:
- Founders use an AI spend audit at most quarterly, so daily active users is a misleading proxy for value delivered.
- Total audits can grow by attracting the wrong audience (very small or very efficient teams). Savings discovered filters for audits where real waste existed.
- The metric directly ties the tool's success to Credex's commercial interest: more savings discovered → more credit-sourcing conversations.

## Input Metrics

| Metric | Definition | Why it matters |
|--------|-----------|----------------|
| Audit completion rate | Audits completed ÷ audits started | Measures form friction. Target: ≥ 50% |
| High-savings report rate | Audits with `monthlySavings > $500` ÷ total completions | Measures audience fit. Target: ≥ 20% |
| Lead capture rate | Leads submitted ÷ report page views | Measures post-value conversion. Target: ≥ 20% |
| Consultation CTA click rate | Clicks on "Book a call" ÷ high-savings leads | Measures Credex intent. Target: ≥ 30% |

## Event Instrumentation

Each event should be logged with `reportSlug`, `savingsBucket` (`"none"`, `"low"` $1–$200, `"medium"` $200–$500, `"high"` $500+), and `currency`. No PII in analytics events.

| Event | Fired when |
|-------|-----------|
| `page_view` | Any route is loaded |
| `audit_started` | User begins the audit form (`/audit`) |
| `audit_step_completed` | User advances to the next form step (step index attached) |
| `audit_generated` | `POST /api/audits` returns 200, report slug received |
| `high_savings_surfaced` | Report page renders with `monthlySavings > $500` |
| `lead_submitted` | `POST /api/leads` returns 200 |
| `email_sent` | Resend API confirms delivery (webhook or success flag) |
| `consultation_cta_clicked` | User clicks the "Book a call" CTA on the report page |

## Pivot Trigger

If after **200 completed audits** the high-savings report rate is below **10%**, the tool is attracting the wrong audience or the rule thresholds are miscalibrated. Investigate:

1. What percentage of completions are solo founders with <$100/mo total spend? (audience mismatch)
2. Are most completions triggering the `"keep"` action across all tools? (thresholds may be too conservative)
3. Are users entering unrealistically low spend numbers? (form UX or trust issue)

If the root cause is audience mismatch, shift GTM to target 10–30 person engineering teams rather than individual founders.

## Reporting Cadence

- **Weekly:** audit completion rate, high-savings report rate, lead capture rate.
- **Monthly:** North Star (total savings discovered), consultation CTA click rate, inbound consultation bookings.
- **On milestone:** re-run pricing verification when any of the 7 covered vendors announces a price change.
