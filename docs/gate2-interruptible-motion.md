# WP-34R Gate 2 可中断连续运动首版

## 目标

WP-33R 已经让三段 Gate 2 转场具备明确灰盒状态。WP-34R 的目标是让这些灰盒状态在讲师操作中更接近验收要求：

- 前进时能看到转场灰盒进入目标状态。
- 后退时使用同一套绝对目标，不根据历史累计 transform。
- 快速连续输入时旧动画会被清理，新目标会接管。
- Reduced Motion 下直接到稳定状态。

本轮仍不接真实产品图、真实二维码、真实业务事实，也不做最终视觉精修。

## 实现方式

### 1. Runtime 只写 Gate 2 专用变量

`ContinuityMotionRuntime` 现在识别 `getSpatialTransitionCue(beatId)`。

如果当前 Beat 是 `09.1`、`16.1`、`21.1`，runtime 会给 `.spatial-transition-graybox` 写入：

- `--gate2-motion-x`
- `--gate2-motion-y`
- `--gate2-motion-opacity`
- `--gate2-axis-progress`
- `--gate2-portal-progress`
- `--gate2-reveal-progress`

这些变量只属于 Gate 2 灰盒，不属于 `WorldCamera`。

### 2. Camera 仍然由绝对 pose 控制

`WorldCamera` 继续读取 `CameraPose`：

- `--camera-x`
- `--camera-y`
- `--camera-z`
- `--camera-scale`
- `--camera-rotate-*`

WP-34R 没有让 runtime 写这些 camera 变量，避免产生两个 owner。

### 3. 中断清理

每次 Beat 改变时，runtime 会：

- kill 当前 `.spatial-transition-graybox` 上的 tween。
- 从当前 Beat 对应的起点变量进入终态变量。
- 在 reduced motion 或 hold 状态下直接设置终态。

这使快速前进、后退和跳转不会按点击次数叠加 transform。

## 当前边界

- 这仍是灰盒运动，不是最终转场动画。
- 还没有录制 Gate 2 人工验收视频。
- 真实素材和 CTA 仍等待 material gate。
- 旧 page-chain 源码仍保留为历史参考，但不挂回主舞台。

## 验收结果

命令验证已通过：

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

其中 `npm run test` 为 91 tests 全部通过。

浏览器复验已通过：

- `1366 x 768` 与 `1920 x 1080` 下，通过键盘前进/后退穿过 `09.1`、`16.1`、`21.1`。
- 三段转场的 runtime marker 分别输出 `turn-horizontal-product`、`portal-forward-safety`、`dolly-back-finale`。
- 快速 `20.10 -> 21.1 -> 20.10 -> 21.1` 后，Gate 2 变量回到稳定终态：
  - `--gate2-motion-x: 0px`
  - `--gate2-motion-y: 0px`
  - `--gate2-motion-opacity: 1`
  - `--gate2-axis-progress: 1`
  - `--gate2-portal-progress: 1`
  - `--gate2-reveal-progress: 1`
- Reduced Motion 通过真实 presenter control 开启后，`16.1` 的 `data-reduced-motion="true"`、`data-continuity-reduced="true"`，Gate 2 变量直接为终态。
- 旧 page-chain 挂载数为 0。
- 产品仍为 placeholder，CTA 在可见时仍为 placeholder。

## 下一步

下一轮应该做浏览器操作层面的 Gate 2 验收：

1. 在 `1366 x 768` 和 `1920 x 1080` 下连续前进/后退穿过三段转场。
2. 快速连续输入，确认不会残留旧 transform 或旧变量。
3. Reduced Motion 打开后复查三段转场直接到稳定状态。
4. 准备给人工验收的无剪辑录屏。
