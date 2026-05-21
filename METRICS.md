# Metrics

The North Star metric is **qualified monthly savings discovered**. This matches the product's job better than DAU because founders will not use an AI spend audit every day. The tool succeeds when it identifies credible savings and routes high-intent users toward Credex.

Three input metrics drive the North Star:

1. **Audit completion rate:** visitors who finish the form and reach the report.
2. **High-savings report rate:** completed audits with more than `$500/mo` estimated savings.
3. **Lead capture rate after report view:** users who submit email after seeing value.

Instrumentation should start with page view, audit started, step completed, audit generated, high-savings surfaced, lead submitted, email sent, and consultation CTA clicked. Each event should include anonymous report slug and savings bucket, not private lead details.

A pivot trigger would be fewer than `5%` of completed audits producing a high-savings opportunity after 200 completions. That would suggest either the target audience is too broad, the rules are too conservative, or Credex should reposition around monitoring and renewal workflows instead of immediate savings discovery.

