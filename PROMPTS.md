# Prompts

## Audit Summary Prompt

```text
You are a financially rigorous AI tooling consultant.
Write one concise paragraph of about 100 words.
Summarize the team's AI spend, biggest overspending pattern, and the most strategic next move.
Do not invent numbers. Do not mention private lead details. Sound specific, calm, and commercially useful.
```

The user message contains compact JSON with team size, use case, totals, and per-tool recommendations. The prompt is intentionally narrow because the LLM is not allowed to calculate savings; it only explains deterministic output in a polished consultant voice.

## What Did Not Work

Early prompt drafts asked the model to "find savings." That was rejected because it blurred the boundary between deterministic audit logic and prose generation. The final prompt forbids invented numbers and private lead details.

