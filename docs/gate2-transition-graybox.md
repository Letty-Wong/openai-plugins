# WP-33R Gate 2 三段关键转场灰盒

## 目标

本轮推进 ChatGPT 纠偏规划中的 Gate 2：

1. Scene 08 到 09：纵向经营路线转入唯一横向产品段。
2. Scene 15 到 16：生成/输出世界冻结后，沿 Z 轴向前穿过 `IntegrationRing`，进入安全空间。
3. Scene 20 到 21：行动路径近景沿 Z 轴向后拉远，揭示完整接入环。

本轮仍是灰盒，不做最终美术，不接真实产品图，不接真实二维码，不补业务事实。

## 已完成

### 1. 新增转场数据合同

`src/presentation/stage/spatial-poses.ts` 新增：

- `SpatialTransitionKind`
- `SpatialTransitionCue`
- `spatialTransitionCues`
- `getSpatialTransitionCue`
- `getCameraPoseForBeat`

三段转场现在有明确 `kind`：

| Beat | Kind | From | To | CameraPose |
| --- | --- | --- | --- | --- |
| `09.1` | `turn-horizontal-product` | `ledger` | `product` | `camera.turn-horizontal-product` |
| `16.1` | `portal-forward-safety` | `product` | `safety` | `camera.portal-forward-safety` |
| `21.1` | `dolly-back-finale` | `action` | `finale` | `camera.dolly-back-finale` |

### 2. SpatialStage 读取 Beat 级 camera pose

`SpatialStage` 不再只按 Scene 取 camera pose，而是：

- 普通 Beat：使用 Scene 级 camera pose。
- 三个 Gate 2 Beat：使用专用 transition camera pose。

DOM 新增：

- `data-spatial-transition-id`
- `data-spatial-transition-kind`

### 3. 在现有空间舞台内渲染灰盒

`SpatialTransitionGraybox` 只挂在 `SpatialStage` 内部，不新增观众主舞台层。

灰盒元素包括：

- `spatial-transition-axis`
- `spatial-transition-portal`
- `spatial-transition-reveal`

它们分别用于表达转向、穿越和后拉揭示。当前只使用 DOM/CSS，不使用真实素材、WebGL 或 Three.js。

## 边界

- 这不是最终动画。
- 这不是最终视觉风格。
- 这还没有提交 Gate 2 的无剪辑录屏。
- 旧 page-chain 源码仍保留为历史参考，但不挂回主舞台。

## 验收结果

命令验证已通过：

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

其中 `npm run test` 为 89 tests 全部通过。

浏览器复验已通过：

- `1366 x 768` 与 `1920 x 1080` 均检查了 `09.1`、`16.1`、`21.1`。
- `09.1` 输出 `data-spatial-transition-kind="turn-horizontal-product"` 和 `data-camera-pose-id="camera.turn-horizontal-product"`。
- `16.1` 输出 `data-spatial-transition-kind="portal-forward-safety"` 和 `data-camera-pose-id="camera.portal-forward-safety"`。
- `21.1` 输出 `data-spatial-transition-kind="dolly-back-finale"` 和 `data-camera-pose-id="camera.dolly-back-finale"`。
- 三段转场均在 `SpatialStage` 内渲染 1 个 axis、1 个 portal、1 个 reveal 灰盒标记。
- `.scroll-narrative-layer`、`.scroll-continuum-shell`、`.scroll-flow-field`、`.scroll-curtain-field` 挂载总数为 0。
- 产品仍为 placeholder，CTA 在可见时仍为 placeholder。

## 下一步

完成命令验证和浏览器复验后，下一轮应让三段转场从“可见灰盒状态”推进为“可前进/后退/快速打断的连续运动”，仍然只使用现有 actor 和 camera pose。
