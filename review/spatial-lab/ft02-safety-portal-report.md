# FT-02 Safety Portal Review Report

Branch: `V4-gate-a-fix`

Scope: FT-01.1 plus FT-02 only.

## Decision State

- FT-00 entry switch remains accepted: `/` loads `PresentationStageV4`; `/legacy` keeps the old implementation isolated.
- FT-01.1 is implemented: product anchor correction, shared ArtifactShell variants, audience-facing copy cleanup, and 15.8 freeze emphasis.
- FT-02 is implemented as a graybox forward safety portal from `15.8` to `16.1`.
- FT-03, FT-04, formal visual polish, true product assets, QR codes, and business facts were not started.

## FT-01.1 Changes

- Product journey keeps `actor.product-stage` near the viewport center by coordinating camera x and product x instead of checking product x alone.
- Product journey artifacts now share one stable shell and change by `mode`:
  - `source`
  - `benefit`
  - `poster`
  - `storyboard`
  - `email-faq`
  - `department-output`
  - `review`
- Review mode no longer exposes engineering labels such as artifact ids or route phase names in the main audience stage.
- Beat `15.8` now uses `快，还不够。` as the main headline and sets the world motion state to `frozen`.

## FT-02 Changes

- Beat `16.1` has a direct absolute endpoint target for the safety world.
- The `15.8 -> 16.1` transition uses a waypoint plan instead of a single endpoint tween:
  - `W0 frozen-output`
  - `W1 portal-preview`
  - `W2 approach-ring`
  - `W3 cross-ring-edge`
  - `W4 establish-safety-world`
- Ring, product, artifacts, camera, portal preview, world tone, and old-world opacity are all expressed as absolute waypoint states.
- The same `PoseTransitionRuntime` plays the waypoint plan; no second motion runtime was added.
- Reduced motion keeps the same final identities but uses the short endpoint path.

## Evidence

Screenshots:

- `review/spatial-lab/screenshots/ft02/15.8-freeze-1366x768.png`
- `review/spatial-lab/screenshots/ft02/16.1-safety-1366x768.png`
- `review/spatial-lab/screenshots/ft02/15.8-freeze-1920x1080.png`
- `review/spatial-lab/screenshots/ft02/16.1-safety-1920x1080.png`

Recordings:

- `review/spatial-lab/recordings/ft02/forward-15-8-to-16-1-1366x768.webm`
- `review/spatial-lab/recordings/ft02/backward-16-1-to-15-8-1366x768.webm`
- `review/spatial-lab/recordings/ft02/fast-toggle-6x-1366x768.webm`
- `review/spatial-lab/recordings/ft02/reduced-forward-15-8-to-16-1-1366x768.webm`
- `review/spatial-lab/recordings/ft02/forward-15-8-to-16-1-1920x1080.webm`
- `review/spatial-lab/recordings/ft02/backward-16-1-to-15-8-1920x1080.webm`
- `review/spatial-lab/recordings/ft02/fast-toggle-6x-1920x1080.webm`
- `review/spatial-lab/recordings/ft02/reduced-forward-15-8-to-16-1-1920x1080.webm`

Manual preview URLs:

- `http://127.0.0.1:3000/?mode=review&beat=15.8`
- `http://127.0.0.1:3000/?mode=review&beat=16.1`
- `http://127.0.0.1:3000/?mode=debug&beat=16.1`

## Validation

Commands to run before handoff:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Known Limits

- This is still a graybox safety portal, not final visual design.
- Real product images, QR codes, formal CTA materials, and business facts remain gated.
- The portal effect is implemented as controlled waypoint motion, not a final cinematic treatment.
- Only the `15.8 -> 16.1` tunnel has been implemented in this pass.
- `20.10 -> 21.1` back-pull closure has not started.
