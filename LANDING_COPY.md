# Landing Copy

## Hero Section

- **Headline:** Your AI Stack Is Bleeding Money
- **Subheadline:** Enter your tools, plans, and spend. Get a specific savings report in 3 minutes — no login, no billing access required.
- **Primary CTA:** Run Free Audit →
- **Secondary CTA:** View Example Report

**Design note:** The headline is intentionally confrontational. The subheadline immediately answers the objection "but what does it actually do?" with three concrete constraints (tools, plans, spend) and three concrete promises (specific, 3 minutes, no login). Both CTAs are present above the fold.

## Social Proof Strip

_Mocked for MVP. Replace with real figures from the database after the first 50 audits._

- `$2.4M+ analyzed AI spend`
- `2,300+ audits generated`
- `18% median savings found`

**Note:** The social proof strip is honest mocking, not fabrication — the numbers are directionally plausible for the target audience but must be replaced with real database counts as soon as they are available. If real numbers are lower, use them. A lower real number is more credible than a higher mock.

## FAQ

**Is this connected to my billing account?**  
No. You enter your spend manually. We never ask for API keys, OAuth tokens, or billing access.

**Does AI calculate the savings?**  
No. Savings are calculated by deterministic rules based on your tool, plan, seat count, and usage intensity. The AI model writes a 100-word summary of the output — it does not produce the numbers.

**When does Credex appear?**  
Credex is surfaced in reports where the top recommendation is `action === "credits"` — typically when self-reported monthly spend exceeds $1,000 or when API usage suggests credit sourcing would produce more savings than a plan downgrade.

**Is the public report private?**  
The public report URL is accessible without login but contains only audit data. Your name, email, company, and role are stored separately and never appear on the report page.

**What if my stack is already efficient?**  
The report will say so clearly. It does not manufacture savings. The honest zero-savings state reads: "Your AI stack looks relatively disciplined — the current spend is not showing obvious waste." You will also see a note to re-run when seats, API traffic, or model mix changes.

## Testimonials

_Use real quotes from user interviews before submission. The placeholders below are illustrative of the target voice — replace them._

- "This found the exact plan mismatch I kept ignoring during renewal." — Maya R., seed-stage founder
- "The report was finance-readable, not just another AI dashboard." — Dev S., engineering manager
- "We used it as a procurement checklist before adding more seats." — Lena K., ops lead

## Report Page Lead Capture Modal

**Headline:** Want to save `[X]`/month?  
**Subheadline:** Leave your email and we'll send you the full report with a Credex savings plan.  
**CTA:** Send me the report →  
**Fine print:** No spam. One email with your report and a Credex introduction.

_The modal fires when the report section is visible and `totals.monthlySavings > 0`. If savings are zero, the modal does not appear; instead a "Get pricing-change alerts" prompt is shown._
