# V4 RC Customer Preview Candidate Report

Date: 2026-06-28
Branch: `V4-gate-a-fix`
Scope: RC-0 / RC-1 / RC-2 only

## Decision

V4 is treated as the current customer-preview candidate. This pass does not add
new architecture, new FT/VP phases, a second runtime, real product assets,
business facts, QR codes, or changes to `/legacy`.

The only code-level RC-2 cleanup in this pass is CTA placeholder wording:
`真实二维码待确认` is now standardized to `二维码待配置`.

## Preview Focus

Only these customer-facing checkpoints are considered for this RC pass:

- `08.7 -> 15.8`: product journey.
- `15.8 -> 16.1`: safety tunnel.
- `20.10 -> 21.1`: pullback closure.

The intent is to verify whether the candidate can be previewed as a continuous
stage, not to perfect all 144 beats or replace placeholders with final assets.

## RC Visual Notes

- Product journey: candidate evidence generated. Product, ring, and artifact
  identities remain stable while the story advances through the product/output
  section.
- Safety tunnel: candidate evidence generated. The safety endpoint keeps
  `资料 / 工具 / 内容 / 权限` visible and avoids exposing debug language in
  review mode.
- Pullback closure: candidate evidence generated. The final frame keeps the
  ring, product evidence, action route, and CTA placeholder in one closure field.
- Review mode text check: `08.7`, `15.8`, `16.1`, `20.10`, and `21.1` were
  checked for engineering-language leaks. No forbidden debug strings were found.

## Remaining Placeholders

Only these placeholder categories are allowed in the customer preview:

- 产品素材待替换
- 业务字段待确认
- 二维码待配置

The preview still must not claim real MOQ, price, certification, warranty,
delivery time, availability, CTA URL, QR code, or business performance facts.

## Screenshots

1366 x 768:

- `review/spatial-lab/screenshots/rc-candidate/08-7-1366x768.png`
- `review/spatial-lab/screenshots/rc-candidate/15-8-1366x768.png`
- `review/spatial-lab/screenshots/rc-candidate/16-1-1366x768.png`
- `review/spatial-lab/screenshots/rc-candidate/20-10-1366x768.png`
- `review/spatial-lab/screenshots/rc-candidate/21-1-1366x768.png`

1920 x 1080:

- `review/spatial-lab/screenshots/rc-candidate/08-7-1920x1080.png`
- `review/spatial-lab/screenshots/rc-candidate/15-8-1920x1080.png`
- `review/spatial-lab/screenshots/rc-candidate/16-1-1920x1080.png`
- `review/spatial-lab/screenshots/rc-candidate/20-10-1920x1080.png`
- `review/spatial-lab/screenshots/rc-candidate/21-1-1920x1080.png`

## Recordings

1366 x 768:

- `review/spatial-lab/recordings/rc-candidate/product-journey-08-7-to-15-8-1366x768.webm`
- `review/spatial-lab/recordings/rc-candidate/safety-tunnel-15-8-to-16-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-candidate/finale-pullback-20-10-to-21-1-1366x768.webm`
- `review/spatial-lab/recordings/rc-candidate/reduced-safety-tunnel-15-8-to-16-1-1366x768.webm`

1920 x 1080:

- `review/spatial-lab/recordings/rc-candidate/product-journey-08-7-to-15-8-1920x1080.webm`
- `review/spatial-lab/recordings/rc-candidate/safety-tunnel-15-8-to-16-1-1920x1080.webm`
- `review/spatial-lab/recordings/rc-candidate/finale-pullback-20-10-to-21-1-1920x1080.webm`
- `review/spatial-lab/recordings/rc-candidate/reduced-safety-tunnel-15-8-to-16-1-1920x1080.webm`

## Validation

- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run test`: passed
- `npm run build`: passed

## Stop Condition

Stop here for human review. Do not continue to VP-03, do not add new
architecture, and do not expand the animation system before this RC candidate is
visually accepted or given a short blocking-fix list.
