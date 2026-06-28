# V4 RC-FIX-02 Continuity Repair Report

## Status

- Package: `RC-FIX-02`
- Branch: `V4-gate-a-fix`
- Scope: continuity repair only
- Legacy route: not modified
- Runtime architecture: no second runtime added
- Assets: no real product image, QR code, product parameter, MOQ, price, certification, registration link, or business fact added

## Goal

This pass addresses the manual review feedback that the V4 customer preview was structurally close, but several handoffs still felt like page or PPT changes because the end pose of one cue did not read as the start pose of the next cue.

The work intentionally avoids a new design phase. It only repairs the highest-risk continuity points:

- `02.1 -> 03.1`
- `03.1 -> 04.7`
- `05.1 -> 07.1`
- `08.7 -> 09.1`
- `15.8 -> 16.1`
- `16.1 -> 17.1`
- `18.9 -> 19.1`
- `20.10 -> 21.1`

## Code Changes

### Persistent Early-Scene Geometry

- `JudgementQuestionGreybox` now keeps one persistent shell for judgement and trend geometry.
- Scene 03 no longer swaps the whole actor body to a separate `TrendTrackGreybox` root.
- CSS variants cross-emphasize the same shell instead of remounting different visible bodies.

### Local Ledger Continuity

- Added local absolute targets for Scenes 05, 06, and 07.
- Scene 05 reads as ledger overview.
- Scene 06 reads as source expansion.
- Scene 07 reads as repetition compression.
- These are local actor and camera differences, not new macro spatial routes.

### Product Turn Handoff

- Added a small internal SpatialState plan for `08.7 -> 09.1`.
- The plan keeps `IntegrationRing`, `ProductStage`, and artifacts in the same world tree.
- Runtime executes it through the existing spatial state interpolation path.

### FT-02 Runtime Continuity

- FT-02 SpatialState playback now compiles to one continuous GSAP timeline.
- The runtime no longer chains state callbacks as independent playback units.
- GSAP still only interpolates absolute spatial states; it does not define the spatial model.

### Safety And Diagnostic Continuity

- Scene 17 gets distinct emphasis on the data/tool safety nodes.
- Safety boundary nodes remain visible through Scene 19 diagnostic handoff.
- Scene 19 de-emphasizes the safety nodes instead of removing the boundary too early.

### Finale Pullback Repair

- The final action route scale was reduced before the pullback.
- FT-04 waypoint action path sizing was tightened so `20.10 -> 21.1` reads as a camera-led reveal rather than an object zoom.

## Evidence

Screenshots:

- `review/spatial-lab/screenshots/rc-fix-02/`
- 16 files total
- Beats: `08.7`, `09.1`, `15.8`, `16.1`, `17.1`, `19.1`, `20.10`, `21.1`
- Sizes: `1366x768`, `1920x1080`

Recordings:

- `review/spatial-lab/recordings/rc-fix-02/`
- 12 files total
- `02.1 -> 03.1`
- `03.1 -> 04.7`
- `05.1 -> 07.1`
- `08.7 -> 09.1`
- `15.8 -> 16.1`
- `16.1 -> 17.1`
- `18.9 -> 19.1`
- `20.10 -> 21.1`
- `08.7 -> 09.1`, `15.8 -> 16.1`, and `20.10 -> 21.1` also include `1920x1080`
- Reduced motion evidence: `reduced-motion-safety-tunnel-15-8-to-16-1-1366x768.webm`

## Review Text Check

Passed for:

- `08.7`
- `09.1`
- `15.8`
- `16.1`
- `17.1`
- `19.1`
- `20.10`
- `21.1`

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
- `npm run test` (`210` tests)
- `npm run build`

## Known Boundaries

- This is not a final visual polish pass.
- Typography, texture, and real product replacement remain future work.
- `/legacy` remains a backup route and was not modified.
- The untracked uploaded FT-02 audit prompt remains excluded from this package.

## Next Decision

Stop for human review.

The next review should watch the generated recordings and decide whether these continuity repairs are enough for a customer preview lock, or whether a small `RC-FIX-02R` patch is needed for a specific blocking segment.
