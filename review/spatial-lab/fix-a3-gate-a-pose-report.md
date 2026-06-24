# FIX-A3 Gate A Pose Report

Status: `READY_FOR_HUMAN_GATE_A_REVIEW`

Scope:
- Branch: `V4-gate-a-fix`
- Route: `/spatial-lab`
- Work package: `FIX-A3｜独立绝对 StageTarget 与 Gate A`
- Gate B status remains `INVALID_UNTIL_GATE_A_PASS`
- No transition waypoint, formal product asset, QR code, particle, texture, final font, or old VisualStage change was added.

## StageTarget Independence

`src/presentation/spatial-lab/stage-target.ts` now uses a local V4 resolver chain:

BaseTarget -> Scene Patch -> Beat Patch -> Transition Metadata Patch -> Reduced Motion Patch -> validateStageTarget()

The V4 Spatial Lab resolver no longer calls:

- `getCameraPoseForBeat`
- `getSpatialPoseForActor`
- `getRoutePhaseForScene`

Generic beat-order drift was removed:

- no `orderInScene * 8`
- no `orderInScene * 10`
- no `beatDrift`

## MovementKind Distribution

Total Beats: 144

| Kind | Count | Ratio |
| --- | ---: | ---: |
| stable | 92 | 63.9% |
| actor | 38 | 26.4% |
| spatial | 14 | 9.7% |

Only `09.1`, `16.1`, and `21.1` carry the three key transition metadata records. FIX-A3 does not implement transition waypoints.

## Stable Beat Pose Equality

Checked adjacent stable Beat pairs: 54

Result: PASS

Equality covers:

- camera `x/y/z/scale/rotation/perspective`
- actor outer `x/y/z/scale/rotation/opacity`
- artifact outer `x/y/z/scale/opacity`

## Lifecycle Invariant

Checked every Actor and Artifact target across all 144 Beats.

Result: PASS

Enforced invariant:

- `lifecycle === "off"` -> `visible === false` and `opacity === 0`
- `visible === false` -> `opacity === 0`
- `visible === true` -> `lifecycle !== "off"`

## Ring Target

Ring pose is unified under:

`target.actors["actor.integration-ring"].geometry`

There is no separate `target.ring` pose source in Spatial Lab.

| Beat | Role | Segment Progress | World Tone |
| --- | --- | --- | --- |
| `01.1` | `judgement` | `[0.72, 0.64, 0.54, 0.48, 0.42]` | `dark` |
| `08.7` | `ledger` | `[0.78, 0.72, 0.66, 0.58, 0.52]` | `dark` |
| `16.1` | `safety-boundary` | `[0.96, 0.78, 0.52, 0.4, 0.32]` | `dark` |
| `21.1` | `final-loop` | `[1, 1, 1, 1, 1]` | `paper` |

`segmentProgress` is a five-value tuple.

## Product And Artifact Identity

Product:

- `actor.product-stage` is visible from `08.7`
- `actor.product-stage` remains visible through `21.9`
- `ProductStage` remains the reused component body inside the stable actor wrapper

Artifacts:

- `artifact.F01` through `artifact.F06` keep stable ids
- all six artifacts are visible at `10.1`
- all six artifacts keep ids through `21.9`

## Runtime/Input Hardening

FIX-A3 also completed the FIX-A2 hardening items:

- Keyboard uses functional state updates with a stable listener.
- Keyboard shortcuts ignore button/input/select/textarea/contenteditable targets.
- Wheel handling is scoped to `.spatial-lab-viewport`.
- Wheel only intercepts default scroll in `review` mode.
- Wheel has a 150ms idle reset.
- `PoseTransitionRuntime` no longer keeps an empty `gsap.context()`.
- Target updates still kill current tweens and tween/set absolute CSS variables.

## Screenshot Evidence

Generated screenshots:

- `review/spatial-lab/screenshots/fix-a3/fix-a3-01-1-1366x768.jpg`
- `review/spatial-lab/screenshots/fix-a3/fix-a3-01-1-1920x1080.jpg`
- `review/spatial-lab/screenshots/fix-a3/fix-a3-08-7-1366x768.jpg`
- `review/spatial-lab/screenshots/fix-a3/fix-a3-08-7-1920x1080.jpg`
- `review/spatial-lab/screenshots/fix-a3/fix-a3-16-1-1366x768.jpg`
- `review/spatial-lab/screenshots/fix-a3/fix-a3-16-1-1920x1080.jpg`
- `review/spatial-lab/screenshots/fix-a3/fix-a3-21-1-1366x768.jpg`
- `review/spatial-lab/screenshots/fix-a3/fix-a3-21-1-1920x1080.jpg`

## Validation Commands

Passed:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Remaining Human Review Items

Gate A still requires human review before Gate B or FIX-B1:

- inspect the screenshots at 1366x768 and 1920x1080
- manually operate fast next/previous inside `/spatial-lab`
- inspect reduced-motion behavior
- confirm the graybox direction is accepted
- only after acceptance may the project proceed to a single transition package
