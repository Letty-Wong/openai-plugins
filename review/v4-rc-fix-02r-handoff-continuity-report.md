# V4 RC-FIX-02R Handoff Continuity Patch

## Status

- Package: `RC-FIX-02R`
- Scope: five handoff continuity blockers only
- Branch: `V4-gate-a-fix`
- Legacy route: not modified
- Runtime architecture: no new runtime
- Assets: no real product image, QR code, product facts, price, MOQ, certification, or registration link added

## Real Beat Pairs Checked

The patch uses the real Beat order from `src/content/beats.ts`:

- `03.7 -> 04.1`
- `07.8 -> 08.1`
- `08.7 -> 09.1`
- `16.1 -> 16.2`
- `17.9 -> 18.1`

Note: Scene 17 ends at `17.9`, not `17.8`.

## Changes

### 03.7 -> 04.1

- Kept one persistent early judgement shell.
- The shell now always contains judgement, trend, and gap/consequence layers.
- Scene 04 uses `gap` state from `04.1`, not only at `04.7`.
- This prevents `03.7 -> 04.1` from flashing back to the default judgement state.

### 07.8 -> 08.1

- Added `transition-plan.rcfix02r.ledger-to-capability`.
- The plan moves from repetition compression into capability accumulation without adding a new macro route.
- Ring screen-composed position is held at the handoff.
- ProductStage remains present in the persistent actor tree and offscreen before the 08.7 product entry.

### 08.7 -> 09.1

- Added endpoint equality tests for the existing FT-01 product turn plan.
- Checks use screen-composed pose: `screenX = camera.x + actor.x`, `screenY = camera.y + actor.y`.
- `08.7 final == plan state A`.
- `plan final == 09.1 target`.

### 16.1 -> 16.2

- Scene 16 now holds the same safety shell endpoint after `16.1`.
- Ring, ProductStage, SafetyBoundary, four safety nodes, camera, portal, and ring geometry remain aligned.
- The first Scene 16 follow-up Beat changes text/emphasis without a spatial snap.

### 17.9 -> 18.1

- Added `transition-plan.rcfix02r.review-handoff`.
- The plan moves from data/tool boundary into the human review queue.
- HumanReview and ActionConfirmGate stay in the persistent actor tree before becoming visible.
- Safety nodes remain visible across the handoff.

## Evidence

Recordings:

- `review/spatial-lab/recordings/rc-fix-02r/judgement-final-03-7-to-04-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-fix-02r/ledger-to-capability-07-8-to-08-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-fix-02r/product-turn-08-7-to-09-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-fix-02r/product-turn-08-7-to-09-1-1920x1080.webm`
- `review/spatial-lab/recordings/rc-fix-02r/safety-first-16-1-to-16-2-1366x768.webm`
- `review/spatial-lab/recordings/rc-fix-02r/safety-first-16-1-to-16-2-1920x1080.webm`
- `review/spatial-lab/recordings/rc-fix-02r/review-handoff-17-9-to-18-1-1366x768.webm`

## Review Text Check

Passed for:

- `03.7`
- `04.1`
- `07.8`
- `08.1`
- `08.7`
- `09.1`
- `16.1`
- `16.2`
- `17.9`
- `18.1`

Checked that review mode does not expose:

- `artifact.F01`
- `camera.xxx`
- `product-source-gate`
- `PLACEHOLDER`
- `stage-target`
- `Spatial Lab`
- `WorldCamera`
- `StageTarget`
- `Gate A`
- `Gate B`

## Validation

Passed:

- `npm run lint`
- `npm run typecheck`
- `npm run test` (`216` tests)
- `npm run build`

## Stop Condition

Stop for human review.

This patch does not open `RC-VISUAL-02`, does not add a new FT/VP phase, and does not modify `/legacy`.
