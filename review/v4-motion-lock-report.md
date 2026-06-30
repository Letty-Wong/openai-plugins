# V4 Motion Lock Report

## Decision

V4 motion and continuity are locked for the customer preview baseline.

- Motion lock commit: `66b566f`
- Commit title: `Keep safety route review sizing stable`
- Branch: `V4-gate-a-fix`
- Decision label: `V4-RC-Motion-Lock`

This report freezes the current motion model as the baseline for visual and content finishing. Future customer-preview work should improve styling, assets, copy, evidence capture, and deployment readiness without rewriting the motion system.

## Locked Scope

The following are locked unless a severe regression is found:

- `PoseTransitionRuntime`
- `StageTarget` architecture and transition plan model
- V4 route ownership: `/` is V4, `/legacy` remains isolated
- Persistent actor identity for `IntegrationRing`, `ProductStage`, `ArtifactShell`, `ActionPath`, and `CtaDock`
- Existing key transition structures for `08.7 -> 09.1`, `15.8 -> 16.1`, and `20.10 -> 21.1`

## Protected Continuity Paths

These paths are the customer-preview continuity baseline:

| Path | Representative Beat Pair | Protection Intent |
| --- | --- | --- |
| `02 -> 03` | `02.1 -> 03.1` | Judgement shell remains continuous. |
| `03 -> 04` | `03.7 -> 04.1` | Trend/gap handoff avoids flashing back. |
| `07 -> 08` | `07.8 -> 08.1` | Ledger compresses into capability without product remount. |
| `08 -> 09` | `08.7 -> 09.1` | Product journey begins with the same Ring and Product actors. |
| `14 -> 15` | `14.7 -> 15.1` | Typography handoff enters naturally. |
| `15 -> 16` | `15.8 -> 16.1` | FT-02 spatial state tunnel remains intact. |
| `16 -> 17` | `16.6 -> 17.1` | Safety route sizing and actors remain continuous. |
| `17 -> 18` | `17.9 -> 18.1` | Review handoff introduces human review without a remount. |
| `20 -> 21` | `20.10 -> 21.1` | Final pullback loop remains the closing transition. |

## Existing Evidence Paths

Current evidence already exists from previous RC passes and remains useful for comparison:

- `review/spatial-lab/recordings/rc-fix-02s/`
- `review/spatial-lab/recordings/rc-visual-01/`
- `review/spatial-lab/screenshots/rc-visual-01/`
- `review/v4-rc-fix-02s-final-handoff-stability-report.md`
- `review/v4-rc-visual-01-report.md`

RC-VISUAL-02 should generate a new evidence folder rather than overwriting these.

## Rules After Lock

- Do not rewrite `PoseTransitionRuntime`.
- Do not rewrite `StageTarget`.
- Do not create new FT, VP, or RC architecture phases.
- Do not modify `/legacy`.
- Do not add real product facts, prices, MOQ, certifications, QR codes, registration links, or business claims without confirmation.
- Do not add per-Beat entrance animations for all 144 Beats.
- Do not expose debug strings in review mode.

## Allowed Next Work

RC-VISUAL-02 may adjust:

- `src/styles/spatial-lab.css`
- Visual tokens
- Existing graybox visual styling
- Product placeholder styling
- ArtifactShell styling
- Ring visual styling
- Audience-facing text presentation

RC-VISUAL-02 must not change motion ownership or transition structure.
