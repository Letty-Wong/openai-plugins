# Gate 2 Command Log Capture Command

## Command

```sh
npm run review:gate2:logs
```

## Purpose

This command writes the current local text output for Gate 2 review commands
into `review/gate2/command-logs/`:

- `preflight-gate2.txt`
- `review-gate2.txt`
- `audit-materials.txt`
- `status-gates.txt`

The generated text files are review evidence for the current local state.

## Boundary

This command does not:

- capture screenshots;
- record videos;
- create fake `.png` or `.mp4` files;
- approve Gate 2;
- start WP-38;
- open real product, CTA, QR, or business material gates.

## Human Next Step

After capturing the command logs, continue with the real screenshots and
no-cut recordings listed in `npm run review:gate2:kit`.
