# RC-VISUAL-01 V4 Customer Preview Visual Pass

Date: 2026-06-28
Branch: `V4-gate-a-fix`
Commit scope: customer-preview visual polish only

## Decision

RC-VISUAL-01 keeps the current V4 architecture locked. This pass does not
modify `/legacy`, does not rewrite `StageTarget`, does not rewrite
`PoseTransitionRuntime`, does not add a new runtime, and does not add real
product assets, QR codes, or business facts.

## Visual Changes

- Review-mode composition now gives the five key frames larger stage bodies and
  quieter helper UI.
- `08.7` has a stronger ProductStage placeholder with a larger frosted backing,
  stronger line weight, clearer red anchors, and heavier product shadow.
- `15.8` keeps “快，还不够。” as the dominant freeze headline, enlarges the
  output structure, and clarifies the five department slots.
- `16.1` adds safety volume cues inside the existing safety-boundary actor:
  depth rings, a central control field, and stronger `资料 / 工具 / 内容 / 权限`
  nodes.
- `20.10` enlarges the action route and makes the time nodes easier to read.
- `21.1` strengthens the CTA dock while preserving placeholder-only language:
  `资料清单 / 场景诊断 / 样板计划 / 二维码待配置`.

## Evidence

Screenshots, 1366 x 768:

- `review/spatial-lab/screenshots/rc-visual-01/08-7-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-01/15-8-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-01/16-1-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-01/20-10-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-01/21-1-1366x768.png`

Screenshots, 1920 x 1080:

- `review/spatial-lab/screenshots/rc-visual-01/08-7-1920x1080.png`
- `review/spatial-lab/screenshots/rc-visual-01/15-8-1920x1080.png`
- `review/spatial-lab/screenshots/rc-visual-01/16-1-1920x1080.png`
- `review/spatial-lab/screenshots/rc-visual-01/20-10-1920x1080.png`
- `review/spatial-lab/screenshots/rc-visual-01/21-1-1920x1080.png`

Recordings, 1366 x 768:

- `review/spatial-lab/recordings/rc-visual-01/product-journey-08-7-to-15-8-1366x768.webm`
- `review/spatial-lab/recordings/rc-visual-01/safety-tunnel-15-8-to-16-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-visual-01/finale-pullback-20-10-to-21-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-visual-01/reduced-safety-tunnel-15-8-to-16-1-1366x768.webm`

Recordings, 1920 x 1080:

- `review/spatial-lab/recordings/rc-visual-01/product-journey-08-7-to-15-8-1920x1080.webm`
- `review/spatial-lab/recordings/rc-visual-01/safety-tunnel-15-8-to-16-1-1920x1080.webm`
- `review/spatial-lab/recordings/rc-visual-01/finale-pullback-20-10-to-21-1-1920x1080.webm`
- `review/spatial-lab/recordings/rc-visual-01/reduced-safety-tunnel-15-8-to-16-1-1920x1080.webm`

## Review Mode Language Check

The following key beats were checked for visible engineering/debug language:
`08.7`, `15.8`, `16.1`, `20.10`, and `21.1`.

No matches were found for `artifact.F`, `camera.`, `product-source-gate`,
`PLACEHOLDER`, `stage-target`, `Spatial Lab`, `WorldCamera`, `StageTarget`,
`Gate A`, or `Gate B`.

## Validation

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run test`: passed, 203 tests
- `npm run build`: passed

## Remaining Boundaries

- Product visuals remain premium placeholders, not real product materials.
- Business fields remain unconfirmed placeholders.
- CTA remains a QR/configuration placeholder; no real QR code or signup link is
  generated.

Stop here for human visual review. Do not continue to RC-VISUAL-02 or a new
planning phase before this pass is accepted or given a short blocking-fix list.
