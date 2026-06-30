# V4 RC Lock Report

## Lock Decision

- Locked commit: `8c27c961a1aa059746f484e590ca8362291895c8`
- Branch at lock: `V4-gate-a-fix`
- Lock label: `v4-rc-preview-1`
- Decision: V4 customer preview motion and visual candidate is locked for the next asset/content phase.

This lock does not claim final production readiness. It preserves the current customer preview state so later product assets, business facts, CTA configuration, or deployment work can be compared against a known working baseline.

## Accepted Continuity Paths

- `02.1 -> 03.2`
- `03.7 -> 04.1`
- `07.8 -> 08.1`
- `08.7 -> 09.1`
- `14.7 -> 15.1`
- `15.8 -> 16.1`
- `16.1 -> 17.1`
- `17.9 -> 18.1`
- `20.10 -> 21.1`

These paths are accepted for the V4 customer preview lock. Future work should not rewrite the motion runtime, StageTarget architecture, `/legacy`, or the major transition structures unless a new explicit unlock decision is made.

## Current Evidence

- `review/spatial-lab/screenshots/rc-visual-02-premium/`
- `review/spatial-lab/recordings/rc-visual-02-premium/`
- `review/spatial-lab/recordings/rc-fix-02s/`
- `review/v4-motion-lock-report.md`
- `review/v4-rc-visual-02-premium-report.md`

Existing evidence is treated as customer preview evidence, not final launch evidence.

## Known Non-Blocking Issues

- Product remains a placeholder visual.
- Business facts are pending.
- CTA and QR configuration are pending.
- Final typography and texture can be improved later.

Do not invent product parameters, pricing, MOQ, certifications, lead times, QR codes, or real business links to close these items.

## Next Phase

- `PRODUCT-ASSET-01`: replace the placeholder ProductStage visual with approved product assets while preserving the same DOM actor, anchors, and motion targets.
- `CONTENT-FACT-01`: fill real business content only through verified or approved facts.
- `CTA-CONFIG-01`: configure the real CTA and QR only after the target link or entry is approved.
- `FINAL-QA-01`: run final viewport, fullscreen, reduced-motion, offline, refresh, and fast-navigation checks.

## Lock Constraints

- No further visual polishing belongs to this lock package.
- No further motion repair belongs to this lock package.
- `/legacy` remains untouched.
- Runtime and StageTarget are not changed by this lock.
- Existing untracked audit prompt files are not part of the lock.
