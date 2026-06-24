# FIX-A4 Visual Clarity Evidence Report

Status: `READY_FOR_HUMAN_GATE_A_REVIEW`

Gate A decision entering this work: `FAIL_VISUAL_CLARITY`

Gate B remains: `INVALID_UNTIL_GATE_A_PASS`

Branch: `V4-gate-a-fix`

Scope:

`01.1 -> 02.1 -> 03.1 -> 04.7 -> 05.1 -> 08.7`

This package does not implement `08.7 -> 09.1`, does not modify `/`, and does not add formal product assets, final typography, particles, textures, or QR code.

## What Changed

- Actor outer wrappers are transparent pose containers.
- Debug bounds are debug-mode only.
- `cameraPresence` separates script lifecycle from audience visibility.
- Each checked Beat has exactly one `featured` actor, at most two `support` actors, and at most one `ambient` actor.
- Generic actors without bodies no longer draw empty review rectangles.
- `WorldTypography` is the single main headline owner.
- `ScreenCopyLayer` no longer repeats `target.copy.headline`.
- Artifact identity remains stable, but visible Artifact count is capped at three.
- World tone now changes the actual viewport background, grid, text, and surface variables.
- Ring segment progress maps to five CSS variables and visible `stroke-dasharray`.
- Ring gap maps to visible `stroke-dashoffset`.
- FIX-A4 proof Beats use explicit camera targets:
  - `01.1`: `camera.fix-a4.judgement-entry`
  - `02.1`: `camera.fix-a4.judgement-through`
  - `03.1`: `camera.fix-a4.trend-depth`
  - `04.7`: `camera.fix-a4.gap-consequence`
  - `05.1`: `camera.fix-a4.ledger-arrival`
  - `08.7`: `camera.fix-a4.capability-core`

## Validation

Passed:

- `npm run lint`
- `npm run typecheck`
- `npm run test` (`187/187`)
- `npm run build`

## Screenshots

1366x768:

- `review/spatial-lab/screenshots/fix-a4/fix-a4-01-1-1366x768.jpg`
- `review/spatial-lab/screenshots/fix-a4/fix-a4-03-1-1366x768.jpg`
- `review/spatial-lab/screenshots/fix-a4/fix-a4-05-1-1366x768.jpg`
- `review/spatial-lab/screenshots/fix-a4/fix-a4-08-7-1366x768.jpg`

1920x1080:

- `review/spatial-lab/screenshots/fix-a4/fix-a4-01-1-1920x1080.jpg`
- `review/spatial-lab/screenshots/fix-a4/fix-a4-03-1-1920x1080.jpg`
- `review/spatial-lab/screenshots/fix-a4/fix-a4-05-1-1920x1080.jpg`
- `review/spatial-lab/screenshots/fix-a4/fix-a4-08-7-1920x1080.jpg`

## Recordings

1366x768:

- `review/spatial-lab/recordings/fix-a4/forward-01-1-to-08-7-1366x768.webm`
- `review/spatial-lab/recordings/fix-a4/backward-08-7-to-01-1-1366x768.webm`
- `review/spatial-lab/recordings/fix-a4/fast-next10-prev10-1366x768.webm`
- `review/spatial-lab/recordings/fix-a4/reduced-motion-forward-1366x768.webm`

1920x1080:

- `review/spatial-lab/recordings/fix-a4/forward-01-1-to-08-7-1920x1080.webm`
- `review/spatial-lab/recordings/fix-a4/backward-08-7-to-01-1-1920x1080.webm`
- `review/spatial-lab/recordings/fix-a4/fast-next10-prev10-1920x1080.webm`
- `review/spatial-lab/recordings/fix-a4/reduced-motion-forward-1920x1080.webm`

## Human Review Notes

This report does not mark Gate A as passed.

Human review still needs to confirm:

- review mode no longer shows empty translucent actor cards;
- one clear protagonist is visible at a time;
- title duplication is resolved;
- Ring progress and gap are visible enough for graybox approval;
- `01.1 -> 08.7` reads as one continuous stage path;
- fast forward/backward operation does not flash back or rebuild visibly.
