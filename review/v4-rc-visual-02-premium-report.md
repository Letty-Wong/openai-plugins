# V4 RC-VISUAL-02 Premium Component Visual Pass

## Summary

This pass replaces the reverted `RC-VISUAL-02` attempt with a stricter premium component visual pass.

Scope stays locked to customer-preview visual finish:

- no Runtime rewrite
- no StageTarget rewrite
- no `/legacy` work
- no real product assets
- no invented product facts, QR code, pricing, MOQ, certifications, or registration links

The motion lock baseline remains `66b566f`, with `5cfd445` documenting the protected motion routes.

## Rollback

- Reverted commit: `b8483c7 Polish V4 RC visual preview`
- Revert commit: `8fa78c2 Revert "Polish V4 RC visual preview"`

## Visual System

The premium pass is limited to seven approved visual component families:

1. `StageAtmosphere`
2. `IntegrationRing`
3. `ProductStage`
4. `ArtifactShell`
5. `SafetyControlVolume`
6. `ActionPath`
7. `CtaDock`

## Key Changes

- Added shared V4 visual tokens for near-black, warm paper, signal red, metal gray, borders, shadows, blur, and radius.
- Replaced the stronger engineering-grid background with low-contrast spatial gradients and faint structural lines.
- Refined the IntegrationRing as a precision signal structure instead of a glowing circle.
- Strengthened ProductStage as a premium placeholder with frosted backplate, metal line weight, red anchor points, and a baseline signal.
- Improved ArtifactShell morphology so modes differ by proportion and internal slots while keeping one stable shell.
- Reworked SafetyControlVolume with a dark control field, depth rings, central control field, and clear `资料 / 工具 / 内容 / 权限` nodes.
- Reworked ActionPath into a readable route with four time nodes.
- Reworked CtaDock into a final action module with `资料清单 / 场景诊断 / 样板计划 / 二维码待配置`.
- Adjusted WorldTypography toward large editorial titles while keeping project-required non-negative letter spacing.

## Evidence

Screenshots:

- `review/spatial-lab/screenshots/rc-visual-02-premium/08-7-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/08-7-1920x1080.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/15-8-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/15-8-1920x1080.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/16-1-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/16-1-1920x1080.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/20-10-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/20-10-1920x1080.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/21-1-1366x768.png`
- `review/spatial-lab/screenshots/rc-visual-02-premium/21-1-1920x1080.png`

Recordings:

- `review/spatial-lab/recordings/rc-visual-02-premium/product-journey-08-7-to-15-8-1366x768.webm`
- `review/spatial-lab/recordings/rc-visual-02-premium/product-journey-08-7-to-15-8-1920x1080.webm`
- `review/spatial-lab/recordings/rc-visual-02-premium/safety-tunnel-15-8-to-16-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-visual-02-premium/safety-tunnel-15-8-to-16-1-1920x1080.webm`
- `review/spatial-lab/recordings/rc-visual-02-premium/finale-pullback-20-10-to-21-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-visual-02-premium/finale-pullback-20-10-to-21-1-1920x1080.webm`
- `review/spatial-lab/recordings/rc-visual-02-premium/reduced-safety-tunnel-15-8-to-16-1-1366x768.webm`

## Validation

Commands:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

Results:

- `npm run lint`: pass
- `npm run typecheck`: pass
- `npm run test`: pass, 234 tests
- `npm run build`: pass

## Capture Status

Screenshot and recording capture completed after restarting Codex so the screen-capture permission could take effect.

Captured evidence:

- 10 static screenshots: five key Beats at `1366 x 768` and `1920 x 1080`
- 6 standard recordings: three key transitions at `1366 x 768` and `1920 x 1080`
- 1 reduced-motion recording: `15.8 -> 16.1` at `1366 x 768`

## Human Review

Review only:

- `08.7`
- `15.8`
- `16.1`
- `20.10`
- `21.1`
- `08.7 -> 15.8`
- `15.8 -> 16.1`
- `20.10 -> 21.1`
- reduced motion `15.8 -> 16.1`

Acceptance should focus on whether the page now reads as a customer-preview visual direction rather than a greybox engineering demo.
