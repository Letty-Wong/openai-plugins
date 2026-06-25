# FT-01 Fast Track Product Journey Report

## Decision Boundary

- Branch: `V4-gate-a-fix`
- Scope completed: FT-00 route switch and FT-01 `08.7 -> 15.8`
- Stop point: before FT-02 `15.8 -> 16.1`
- Production entry: `/`
- Legacy entry: `/legacy`
- Debug alias: `/spatial-lab`

## What Changed

- `/` now renders `PresentationStageV4` instead of the old `PresentationShell`.
- The old presenter implementation is isolated at `/legacy`.
- `/spatial-lab` remains a debug alias for the same V4 stage.
- `SpatialLabStage` and `SpatialLabClientStage` remain as compatibility exports, while the production names are now:
  - `PresentationStageV4`
  - `PresentationStageClientV4`
- `/` and `/spatial-lab` both accept `beat` and `mode` query params for review positioning.

## FT-01 Product Journey

The implemented range is:

```text
08.7 -> 09.1 -> 10.1 -> 11.1 -> 12.1 -> 13.1 -> 14.1 -> 15.8
```

The stage target model keeps:

- `actor.product-stage` as the featured actor from `08.7` through `15.8`.
- `actor.integration-ring` as the same shared ring geometry and support actor.
- Stable artifact ids `artifact.F01` through `artifact.F06`.
- At most three visible artifacts at once.
- Scene-level workstation targets, so most intra-scene Beats do not become separate spatial pushes.

Artifact modes now progress as:

```text
source -> benefit -> poster -> storyboard -> email-faq -> department-output
```

`15.8` freezes with:

```text
快，还不够。
```

## Evidence

No-cut recording evidence was generated from keyboard-driven page operation, not manual state screenshots.

| Direction | Viewport | Video |
| --- | --- | --- |
| `08.7 -> 15.8` | `1366 x 768` | `review/spatial-lab/recordings/ft01/forward-08-7-to-15-8-1366x768.webm` |
| `15.8 -> 08.7` | `1366 x 768` | `review/spatial-lab/recordings/ft01/backward-15-8-to-08-7-1366x768.webm` |
| `08.7 -> 15.8` | `1920 x 1080` | `review/spatial-lab/recordings/ft01/forward-08-7-to-15-8-1920x1080.webm` |
| `15.8 -> 08.7` | `1920 x 1080` | `review/spatial-lab/recordings/ft01/backward-15-8-to-08-7-1920x1080.webm` |

Intermediate frame folders were regenerated for video synthesis and then omitted
from the commit so the review package stays small. The checked-in evidence is
the four keyboard-driven `.webm` recordings above.

## Validation

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run test`: passed
- `npm run build`: passed

## Known Limits

- This is still graybox production staging, not final visual polish.
- No real product asset, QR code, business facts, or formal CTA was added.
- FT-02 forward tunnel `15.8 -> 16.1` was not started.
- FT-03 safety/action route and FT-04 final pullback were not started.
- The old VisualStage remains available only through `/legacy` and was not improved.
