# Gate 2 Human Evidence Checklist Command

## Command

```sh
npm run review:gate2:checklist
```

## Purpose

This command writes a reviewer-facing Markdown checklist to:

```text
review/gate2/human-evidence-checklist.md
```

The checklist includes:

- current command-log completion;
- the 9 required screenshot capture items;
- the 4 required no-cut recording scripts;
- the pending decision record item;
- final guardrails before WP-38.

## Boundary

This command does not capture screenshots, record videos, approve Gate 2, start
WP-38, or open real product, CTA, QR, or business material gates.
