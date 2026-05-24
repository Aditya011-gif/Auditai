# Prompts

## Audit Summary Prompt

The system prompt sent to `claude-3-5-haiku` in `app/api/audits/route.ts`:

```text
You are a financially rigorous AI tooling consultant.
Write one concise paragraph of about 100 words.
Summarize the team's AI spend, the biggest overspending pattern, and the most strategic next move.
Do not invent numbers — all figures come from the deterministic audit engine.
Do not mention private lead details (email, company, role).
Do not repeat the word "savings" more than twice.
Sound specific, calm, and commercially useful — not like a chatbot summary.
```

The user message is a compact JSON object containing:

```json
{
  "teamSize": 6,
  "stage": "seed",
  "primaryUseCase": "coding",
  "currency": "USD",
  "totals": {
    "monthlySpend": 420,
    "monthlySavings": 160,
    "savingsPercentage": 38
  },
  "recommendations": [
    {
      "toolName": "Cursor",
      "currentPlan": "Business",
      "optimizedPlan": "Pro",
      "monthlySavings": 80,
      "action": "downgrade",
      "explanation": "Business plan pricing is inefficient for small engineering teams under 5 users unless admin controls are mandatory."
    }
  ]
}
```

The user message is constructed in the API route and never includes the user's email, company name, or role.

## Fallback — `createFallbackSummary` (`lib/audit-engine/index.ts`)

If the Anthropic call fails or returns an error, the API route calls `createFallbackSummary` instead. The function:

1. Sorts recommendations by `monthlySavings` descending and picks the top one.
2. If `totals.monthlySavings < 100`, returns a "stack looks disciplined" message.
3. Otherwise, returns a template string citing the top tool name, the monthly spend, and the monthly savings, followed by a generic prioritization sentence.

This means the API route always returns a non-empty summary string. The fallback is deterministic and contains no invented numbers.

## What Did Not Work

**"Find savings" framing:** Early drafts asked the model to "analyze the AI stack and identify cost-saving opportunities." This was rejected because it invited the model to infer or invent savings amounts, blurring the boundary between deterministic rule output and prose generation. Any number the LLM produces that is not in the input JSON is an invented number.

**"Be concise" without a word count:** Without the "about 100 words" constraint, haiku regularly produced either a single sentence or a five-paragraph essay. The word-count instruction brought output into a consistent range.

**Role-playing as the product:** A draft that said "I am AuditAI and I found..." was rejected because it reads as marketing copy rather than a consultant voice, which is less likely to be forwarded to a CFO or used in a procurement conversation.
