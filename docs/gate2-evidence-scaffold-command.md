# Gate 2 Evidence Scaffold Command

## Command

```sh
npm run review:gate2:scaffold
```

## Purpose

This command creates the local evidence workspace for Gate 2 human review:

- `review/gate2/README.md`
- `review/gate2/command-logs/README.md`
- `review/gate2/recordings/README.md`
- `review/gate2/screenshots/1366/README.md`
- `review/gate2/screenshots/1920/README.md`

It is safe to run more than once. Existing files are left untouched.

## Boundary

This command does not:

- capture screenshots;
- record videos;
- create fake `.png` or `.mp4` files;
- approve Gate 2;
- start WP-38;
- open real product, CTA, QR, or business material gates.

## Human Next Step

After running the scaffold, use `npm run review:gate2:kit` and save the real
human review evidence into the created folders. Text command logs can be
captured with `npm run review:gate2:logs`; screenshots and no-cut recordings
still require human capture. Use `npm run review:gate2:evidence` to check what
is still missing.
