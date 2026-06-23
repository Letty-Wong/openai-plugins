# Gate B Review Decision Record

Decision: INVALID_UNTIL_GATE_A_PASS

## Scope

Gate B covers only the V4 `/spatial-lab` greybox evidence for:

- SR-04: `08.7 -> 09.1` horizontal product turn;
- SR-05: `15.8 -> 16.1` forward safety portal;
- SR-06: `20.10 -> 21.1` backward final loop reveal.

Gate B evidence is invalid until Gate A has passed human review. Do not continue SR-04, SR-05, SR-06, or SR-07 work while this decision is `INVALID_UNTIL_GATE_A_PASS`.

## Required Evidence Before PASS

- `review/spatial-lab/screenshots/gate-b/sr04-09-1-1366x768.jpg`
- `review/spatial-lab/screenshots/gate-b/sr04-09-1-1920x1080.jpg`
- `review/spatial-lab/screenshots/gate-b/sr05-16-1-1366x768.jpg`
- `review/spatial-lab/screenshots/gate-b/sr05-16-1-1920x1080.jpg`
- `review/spatial-lab/screenshots/gate-b/sr06-21-1-1366x768.jpg`
- `review/spatial-lab/screenshots/gate-b/sr06-21-1-1920x1080.jpg`
- no-cut recordings for all three transitions, including forward and backward playback.
- Human review notes confirming actor identity continuity, camera direction, depth layering, placeholder boundaries, and reduced-motion behavior.

## Decision Values

- `INVALID_UNTIL_GATE_A_PASS`: Gate B evidence was produced before Gate A was accepted and cannot be used as valid transition evidence yet.
- `PENDING_HUMAN_REVIEW`: evidence package exists, but human review has not approved it.
- `PASS`: Gate B passed; SR-07 may start.
- `SMALL_FIX`: only small Gate B fixes are allowed.
- `FAIL`: return to V4 spatial hierarchy, StageTarget, and PoseTransitionRuntime correction.

## Human Notes

Fill this section during review.
