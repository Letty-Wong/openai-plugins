# Gate A Decision Record

Decision: `FAIL_VISUAL_CLARITY`

Next: `FIX-A4`

Branch: `V4-gate-a-fix`

Reviewed baseline commit:

`144a7b8fe7c2ea75ccd7cf96e0057600af1f9a59`

## Decision

FIX-A3 engineering contracts are useful and should be preserved, but Human Gate A does not pass visual review.

Gate B remains:

`INVALID_UNTIL_GATE_A_PASS`

Do not start FIX-B1, SR-04, SR-05, SR-06, or SR-07 while this decision is active.

## Failure Reasons

- Review mode still produced empty translucent actor rectangles.
- Main headline appeared in both WorldTypography and ScreenCopyLayer.
- Actor role did not produce a strict lead/support/latent visual hierarchy.
- Artifact identity was stable, but too many cards remained visible together.
- World tone was data-only and did not change the stage background.
- Ring segment progress and gap were not visible enough in geometry.
- The reviewed stage still read as page/card composition rather than a continuous proof route.

## FIX-A4 Scope

Only prove visual clarity for:

`01.1 -> 02.1 -> 03.1 -> 04.7 -> 05.1 -> 08.7`

Do not modify the old `/` main entry and do not implement the `08.7 -> 09.1` transition.
