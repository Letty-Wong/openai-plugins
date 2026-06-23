# Gate 2 Evidence Status Command

## Command

```sh
npm run review:gate2:evidence
```

## Purpose

This command checks whether the Gate 2 evidence files listed by
`npm run review:gate2:kit` exist and are non-empty.

It reports one of three states:

- `INCOMPLETE_HUMAN_EVIDENCE`: command logs, screenshots, recordings, or the
  decision record are still incomplete.
- `READY_FOR_DECISION`: all command logs, screenshots, and recordings exist,
  but the human decision is still pending.
- `REVIEW_DECIDED`: evidence files exist and the decision record has been
  filled with `PASS`, `SMALL_FIX`, or `FAIL`.

## Current Expected Status

The current expected status is `INCOMPLETE_HUMAN_EVIDENCE` because screenshots
and no-cut recordings still require human capture.

## Boundary

This command does not approve Gate 2, start WP-38, or open real product, CTA,
QR, or business material gates.
