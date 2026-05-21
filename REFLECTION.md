# Reflection

This is a working draft. Replace the notes below with final, fully authentic answers after the seven-day build is complete.

## 1. Hardest bug

The hardest issue so far was keeping the assignment honest while still producing a complete scaffold quickly. Several required files ask for week-long evidence, real user interviews, screenshots, and deployment links that cannot truthfully exist on day one. I treated that as a product constraint rather than a paperwork problem: build the code and documentation structure now, but mark future evidence as pending instead of fabricating it. The technical version of the same bug appeared in the report flow: public reports need rich data but must not leak lead details. I resolved that by making audits and leads separate models and having the report route read only audit fields.

## 2. Decision reversed

I initially considered making the app fully client-first so the demo could work without any backend setup. That would have been faster, but it directly conflicts with the assignment requirement for real storage, transactional email, and shareable URLs. I reversed the decision and added Prisma, Supabase-compatible schema, and API routes. The tradeoff is more setup friction, but the submission becomes much closer to what Credex asked for: a launchable lead-generation asset rather than a local calculator.

## 3. Week 2 build

In week two I would add benchmark mode and PDF export. Benchmarking would turn the report from a one-off calculator into a stronger growth loop because founders could compare AI spend per developer or per employee against similar-stage companies. PDF export would make the report easier to forward to finance, procurement, or cofounders. I would also add a pricing-version table so each audit remains reproducible even when vendors change plan prices.

## 4. AI usage

AI was used for implementation acceleration, product copy shaping, and test planning. I did not trust AI with pricing facts, audit math, or assignment integrity requirements without checking the source document. The specific place AI can easily be wrong is user interviews: it can produce believable-looking fake conversations, but the assignment explicitly says fabricated interviews are an instant reject. I kept `USER_INTERVIEWS.md` as a capture template until real conversations happen.

## 5. Self-rating

- **Discipline:** 7/10 — strong day-one scope control, but final score depends on maintaining real daily commits.
- **Code quality:** 8/10 — typed engine, validation, tests, and API boundaries are clean for an MVP.
- **Design sense:** 8/10 — dark premium UI direction is stronger than a generic dashboard, with room for screenshot polish.
- **Problem-solving:** 8/10 — the implementation separates deterministic math from LLM prose and handles fallback paths.
- **Entrepreneurial thinking:** 7/10 — the flow matches lead-gen goals, but real interviews must still inform the final positioning.

