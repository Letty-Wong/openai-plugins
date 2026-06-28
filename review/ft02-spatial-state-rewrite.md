# FT-02 Spatial State Rewrite Review

## Scope

- Scope: V4 `15.8 -> 16.1` only.
- Not changed: `/legacy`, old `VisualStage`, old `frameKind` implementation, FT-04 finale pullback.
- Runtime model: GSAP is an interpolation executor only. FT-02 state meaning lives in `SpatialState[]`.

## State Diff

| State | Primary Anchor | World | Camera | Portal / Ring Meaning |
| --- | --- | --- | --- | --- |
| `state.ft02.A.frozen-compression-field` | `world.frozen-output` | `paper`, `frozen`, compression `0.86`, density `0.78` | stable on product evidence | no portal; ring is a boundary around compressed department output |
| `state.ft02.B.portal-emergence-field` | `actor.integration-ring` | `paper`, `portal`, compression `0.72`, density `0.88` | camera still held | portal becomes visible inside the same world; ring begins semantic transformation |
| `state.ft02.C.boundary-approach-field` | `camera.ft02.approach-ring` | `paper`, `portal`, compression `0.48`, density `0.96` | camera moves forward and focuses ring | near/mid/far separation appears; artifacts separate to both sides |
| `state.ft02.D.boundary-crossing-field` | `camera.ft02.cross-ring-edge` | `dark`, `portal`, compression `0.24`, density `0.92` | camera crosses the ring boundary | ring scale reaches `3.42`; portal radius reaches `620`; old world opacity drops to `0.2` |
| `state.ft02.E.safety-field-stable` | `world.safety-volume` | `dark`, `settled`, compression `0.34`, density `0.64` | camera resolves into safety volume | ring role becomes `safety-boundary`; safety boundary actor is featured |

## Camera Trajectory Log

| State | x | y | z | rotationX | rotationY | rotationZ | perspective | focusActorId |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| A | -34 | -12 | 72 | 1 | -5 | 0 | 1200 | `actor.product-stage` |
| B | -34 | -12 | 72 | 1 | -5 | 0 | 1200 | `actor.product-stage` |
| C | -20 | -18 | 230 | 1 | -5 | 0 | 1240 | `actor.integration-ring` |
| D | -10 | -16 | 420 | 0 | -3 | 0 | 1300 | `actor.integration-ring` |
| E | -24 | -10 | 178 | 0 | -1 | 0 | 1280 | `actor.integration-ring` |

## DOM Persistence Proof

- `IntegrationRing` remains `actor.integration-ring` in every state.
- `ProductStage` remains `actor.product-stage` in every state.
- Artifact ids remain stable (`artifact.F01` through `artifact.F06`); the visible artifacts keep `department-output` mode during the crossing and are not remounted as new objects.
- The render tree remains `ScreenViewport -> WorldCamera -> WorldSpace -> PersistentActors / ArtifactSystem / WorldTypography`.

## No Re-Entry Verification

- FT-02 plan now uses `model: "spatial-state"` and `states`, not `waypoints` or `duration`.
- `PoseTransitionRuntime` routes FT-02 through `playSpatialStatePlan`.
- `playSpatialStatePlan` interpolates from the current DOM pose to the next `SpatialState`; it does not define system meaning through a GSAP timeline.
- Runtime does not use `fromTo`.
- Runtime does not create a second Portal/Tunnel runtime.
- FT-04 remains explicitly `model: "legacy-waypoint"` for later migration.

## Validation

- Screenshots:
  - `review/spatial-lab/screenshots/ft02-spatial-state/15-8-1366x768.png`
  - `review/spatial-lab/screenshots/ft02-spatial-state/16-1-1366x768.png`
  - `review/spatial-lab/screenshots/ft02-spatial-state/15-8-1920x1080.png`
  - `review/spatial-lab/screenshots/ft02-spatial-state/16-1-1920x1080.png`
- Recordings:
  - `review/spatial-lab/recordings/ft02-spatial-state/forward-15-8-to-16-1-1366x768.webm`
  - `review/spatial-lab/recordings/ft02-spatial-state/backward-16-1-to-15-8-1366x768.webm`
  - `review/spatial-lab/recordings/ft02-spatial-state/fast-toggle-4x-1366x768.webm`
  - `review/spatial-lab/recordings/ft02-spatial-state/reduced-forward-15-8-to-16-1-1366x768.webm`
  - `review/spatial-lab/recordings/ft02-spatial-state/forward-15-8-to-16-1-1920x1080.webm`
  - `review/spatial-lab/recordings/ft02-spatial-state/backward-16-1-to-15-8-1920x1080.webm`
  - `review/spatial-lab/recordings/ft02-spatial-state/fast-toggle-4x-1920x1080.webm`
  - `review/spatial-lab/recordings/ft02-spatial-state/reduced-forward-15-8-to-16-1-1920x1080.webm`
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 203 tests.
- `npm run build`: passed.
