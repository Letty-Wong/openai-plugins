# Gate 2 Evidence Workspace

This folder is only for human review evidence. It does not approve Gate 2, does not start WP-38, and does not open material gates.

## Evidence Index

| Category | File | Purpose |
| --- | --- | --- |
| command-log | `review/gate2/command-logs/preflight-gate2.txt` | Save output from npm run preflight:gate2. |
| command-log | `review/gate2/command-logs/review-gate2.txt` | Save output from npm run review:gate2. |
| command-log | `review/gate2/command-logs/audit-materials.txt` | Save output from npm run audit:materials. |
| command-log | `review/gate2/command-logs/status-gates.txt` | Save output from npm run status:gates. |
| recording | `review/gate2/recordings/gate2-a-08-09-horizontal-turn.mp4` | No-cut recording A: 08.7 -> 09.1 -> 08.7 -> 09.1. |
| recording | `review/gate2/recordings/gate2-b-15-16-forward-portal.mp4` | No-cut recording B: 15.8 -> 16.1 -> 15.8 -> 16.1. |
| recording | `review/gate2/recordings/gate2-c-20-21-dolly-back.mp4` | No-cut recording C: 20.10 -> 21.1 plus quick right/left/right. |
| recording | `review/gate2/recordings/gate2-d-reduced-motion.mp4` | No-cut recording D: reduced motion into 16.1. |
| screenshot | `review/gate2/screenshots/1366/08.7-product-entry.png` | 1366 screenshot: product already on stage before horizontal product turn. |
| screenshot | `review/gate2/screenshots/1366/09.1-horizontal-turn.png` | 1366 screenshot: turn-horizontal-product graybox. |
| screenshot | `review/gate2/screenshots/1366/15.8-output-freeze.png` | 1366 screenshot: output freeze before portal. |
| screenshot | `review/gate2/screenshots/1366/16.1-forward-portal.png` | 1366 screenshot: portal-forward-safety graybox. |
| screenshot | `review/gate2/screenshots/1366/20.10-action-closeup.png` | 1366 screenshot: action path close-up. |
| screenshot | `review/gate2/screenshots/1366/21.1-dolly-back.png` | 1366 screenshot: dolly-back-finale graybox. |
| screenshot | `review/gate2/screenshots/1920/09.1-horizontal-turn.png` | 1920 screenshot: large-screen horizontal turn. |
| screenshot | `review/gate2/screenshots/1920/16.1-forward-portal.png` | 1920 screenshot: large-screen forward portal. |
| screenshot | `review/gate2/screenshots/1920/21.1-dolly-back.png` | 1920 screenshot: large-screen dolly back. |
| decision | `docs/gate2-review-decision-record.md` | Fill PASS, SMALL_FIX, or FAIL only after human review. |

## Rules

- Keep screenshots and recordings as real review evidence only.
- Do not create fake `.png` or `.mp4` files.
- Do not add real product assets, QR codes, or business facts here.
- Use `npm run review:gate2:evidence` to inspect what is still missing.
- Record the final decision in `docs/gate2-review-decision-record.md` after human review.
