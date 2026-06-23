# Gate B｜三段关键空间转场灰盒审查包

## 当前结论

V4 `/spatial-lab` 已进入 Gate B 灰盒阶段。当前只验证三段关键空间转场的 `StageTarget` 目标状态，不代表最终视觉风格，不接入真实产品素材，不接入二维码。

本阶段覆盖：

- SR-04：`08.7 → 09.1`，纵向经营空间转入横向产品旅程；
- SR-05：`15.8 → 16.1`，横向输出高潮穿过接入环进入安全空间；
- SR-06：`20.10 → 21.1`，行动路线后拉揭示完整闭环。

## SR-04｜08 → 09 横向产品转场

目标：

```text
纵向经营空间
→ IntegrationRing 保持锚点
→ 轨道弯入横向
→ ProductStage 从 08.7 同一位置出现
→ 进入唯一横向产品旅程
```

当前落地：

- `09.1` 的 `transition.gate` 为 `SR-04`；
- `camera.poseId` 为 `camera.turn-horizontal-product`；
- `actor.product-stage` 在 `08.7` 和 `09.1` 保持同一个 actor id；
- `actor.integration-ring` 在转场中保持可见，并被标记为 `product-gate-turn`；
- 没有整屏 fade，也没有创建新的产品 actor。

## SR-05｜15 → 16 前向穿越安全门户

目标：

```text
横向输出高潮
→ 全部冻结
→ “快，还不够”
→ Ring 成为门户
→ Camera 沿 Z 轴向前穿过
→ 进入安全空间
→ 同一个 Ring 收为安全边界
```

当前落地：

- `16.1` 的 `transition.gate` 为 `SR-05`；
- `camera.poseId` 为 `camera.portal-forward-safety`；
- `actor.product-stage` 在 `15.8` 和 `16.1` 保持同一个 actor id；
- `actor.integration-ring` 被标记为 `portal-to-safety-boundary`；
- artifact 灰盒拥有明显的近、中、远 Z 层差异；
- camera scale 保持在轻量范围内，不用 `scale(8)` 假装穿越。

## SR-06｜20 → 21 后拉闭环揭示

目标：

```text
近距离行动路线
→ Camera 沿 Z 轴后拉
→ 原本不可见的外围结构出现
→ 行动路线被重新理解为完整接入环的一部分
→ 第一个样板补上缺口
```

当前落地：

- `21.1` 的 `transition.gate` 为 `SR-06`；
- `camera.poseId` 为 `camera.dolly-back-finale`；
- `actor.action-path` 在 `20.10` 和 `21.1` 保持同一个 actor id；
- `ring.gap` 收为 `0`，`ring.role` 为 `final-loop-reveal`；
- `actor.cta-dock` 仍然只是 placeholder actor，不接真实二维码；
- ProductStage 保持灰盒证据锚点，不重新 reveal。

## 浏览器审查要求

人工审查时应检查：

| 转场 | 必看 Beat | 重点 |
| --- | --- | --- |
| SR-04 | `08.7 → 09.1` | ProductStage 是否不是重新出现；Ring 是否是转向锚点 |
| SR-05 | `15.8 → 16.1` | 是否有近中远三层；不是简单放大；产品世界是否留在身后 |
| SR-06 | `20.10 → 21.1` | ActionPath 是否保持身份；后拉是否揭示完整闭环；CTA 是否仍是 placeholder |

## 当前边界

- 这是 Gate B 灰盒，不是视觉风格层。
- 没有正式产品图、二维码、粒子、纹理、最终字体或真实业务样板。
- 没有替换旧主演示入口。
- 未进入 SR-07、SR-08、SR-09 的 21 幕完整铺排。
- 后续仍需补充无剪辑录屏、正向/反向/快速输入、人审记录，才能把 Gate B 判定为人工 PASS。
