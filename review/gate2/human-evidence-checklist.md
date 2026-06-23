# Gate 2 Human Evidence Checklist

Current evidence status: `INCOMPLETE_HUMAN_EVIDENCE`

This file is a human capture checklist. It does not approve Gate 2, start WP-38, or open material gates.

## Command Logs

- [x] Save output from npm run preflight:gate2. -> `review/gate2/command-logs/preflight-gate2.txt`
- [x] Save output from npm run review:gate2. -> `review/gate2/command-logs/review-gate2.txt`
- [x] Save output from npm run audit:materials. -> `review/gate2/command-logs/audit-materials.txt`
- [x] Save output from npm run status:gates. -> `review/gate2/command-logs/status-gates.txt`

## Screenshots

- [ ] 1366 x 768 / 08.7 / 产品已在场，准备进入横向段。 / http://localhost:3000#scene-08/08.7 -> `review/gate2/screenshots/1366/08.7-product-entry.png`
- [ ] 1366 x 768 / 09.1 / 横向产品转弯灰盒。 / http://localhost:3000#scene-09/09.1 -> `review/gate2/screenshots/1366/09.1-horizontal-turn.png`
- [ ] 1366 x 768 / 15.8 / 输出冻结，准备穿环。 / http://localhost:3000#scene-15/15.8 -> `review/gate2/screenshots/1366/15.8-output-freeze.png`
- [ ] 1366 x 768 / 16.1 / Z 轴向前穿越灰盒。 / http://localhost:3000#scene-16/16.1 -> `review/gate2/screenshots/1366/16.1-forward-portal.png`
- [ ] 1366 x 768 / 20.10 / 行动路径近景。 / http://localhost:3000#scene-20/20.10 -> `review/gate2/screenshots/1366/20.10-action-closeup.png`
- [ ] 1366 x 768 / 21.1 / Z 轴后拉揭示灰盒。 / http://localhost:3000#scene-21/21.1 -> `review/gate2/screenshots/1366/21.1-dolly-back.png`
- [ ] 1920 x 1080 / 09.1 / 横向产品转弯灰盒。 / http://localhost:3000#scene-09/09.1 -> `review/gate2/screenshots/1920/09.1-horizontal-turn.png`
- [ ] 1920 x 1080 / 16.1 / Z 轴向前穿越灰盒。 / http://localhost:3000#scene-16/16.1 -> `review/gate2/screenshots/1920/16.1-forward-portal.png`
- [ ] 1920 x 1080 / 21.1 / Z 轴后拉揭示灰盒。 / http://localhost:3000#scene-21/21.1 -> `review/gate2/screenshots/1920/21.1-dolly-back.png`

## No-Cut Recordings

### [ ] 录屏 A: Scene 08 到 09 横向产品转弯

保存到：`review/gate2/recordings/gate2-a-08-09-horizontal-turn.mp4`

起点：http://localhost:3000#scene-08/08.7

1. 停留 2 秒。
2. 按一次右方向键进入 09.1。
3. 停留 3 秒。
4. 按一次左方向键回到 08.7。
5. 再按一次右方向键回到 09.1。

必须看见：

- 不是整页 fade。
- IntegrationRing 与 ProductStage 不是重新换身体。
- 产品仍是 shower-h1-placeholder，占位素材没有伪装成真实产品图。

### [ ] 录屏 B: Scene 15 到 16 Z 轴向前穿越

保存到：`review/gate2/recordings/gate2-b-15-16-forward-portal.mp4`

起点：http://localhost:3000#scene-15/15.8

1. 停留 2 秒。
2. 按一次右方向键进入 16.1。
3. 停留 3 秒。
4. 按一次左方向键回到 15.8。
5. 再按一次右方向键回到 16.1。

必须看见：

- 转场是向前穿过接入环进入安全空间。
- ProductStage 仍在场，不重新 reveal。
- 没有使用红光或真实素材伪装安全转折。

### [ ] 录屏 C: Scene 20 到 21 Z 轴后拉揭示

保存到：`review/gate2/recordings/gate2-c-20-21-dolly-back.mp4`

起点：http://localhost:3000#scene-20/20.10

1. 停留 2 秒。
2. 按一次右方向键进入 21.1。
3. 停留 3 秒。
4. 快速执行右、左、右，最后停在 21.1。
5. 停留 3 秒。

必须看见：

- 不是普通缩小页面，而是后拉揭示完整闭环。
- ActionPath 不重新入场成另一张终幕图。
- 快速操作后没有残留旧 transform 或旧灰盒变量。

### [ ] 录屏 D: Reduced Motion

保存到：`review/gate2/recordings/gate2-d-reduced-motion.mp4`

起点：http://localhost:3000#scene-15/15.8

1. 按 h 展开 presenter HUD。
2. 点击 Motion，打开 Reduced Motion。
3. 按一次右方向键进入 16.1。
4. 停留 3 秒。

必须看见：

- 16.1 的空间关系仍成立。
- 转场不做长距离运动。
- Gate 2 灰盒直接处于稳定终态。

## Decision Record

- [ ] Fill PASS, SMALL_FIX, or FAIL only after human review. -> `docs/gate2-review-decision-record.md`

## Final Check

- [ ] Run `npm run review:gate2:evidence` after adding screenshots and recordings.
- [ ] Only fill `docs/gate2-review-decision-record.md` after human review.
- [ ] Do not start WP-38 unless the decision record is explicitly `PASS`.
- [ ] Keep product assets, QR/CTA, and business facts as placeholders until their own gates open.
