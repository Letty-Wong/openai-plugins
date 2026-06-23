# WP-31R / WP-32R 空间 Pose 与 Runtime 收口

## WP-32R 最新追加

WP-32R 已开始把 `SpatialPose` 从“诊断数据”推进为“演员布局目标”：

- `PersistentActorLayer` 继续保持单一演员身体，不新增视觉层。
- 每个可见持久演员现在输出 `data-spatial-function` 与 `data-spatial-occlusion`。
- 每个可见持久演员现在输出 CSS 变量：
  - `--spatial-pose-x`
  - `--spatial-pose-y`
  - `--spatial-pose-z`
  - `--spatial-pose-scale`
  - `--spatial-pose-opacity`
- `.persistent-actor` 使用这些变量做 wrapper 级 `translate3d` 与 `scale`。
- 角色透明度改为 `--actor-role-opacity`，与空间姿态透明度分开。

仍未完成：

- 三个关键转场灰盒的完整运动。
- `ArtifactSystem` 归并。
- 历史 page-chain CSS 的彻底隔离。

详细记录见 `docs/spatial-pose-application.md`。

## 目标

WP-31R 把 WP-30R 的灰盒判断逻辑抽成正式 TypeScript 数据合同，并把 `ContinuityMotionRuntime` 从旧页面链 selector 中解耦。

本轮仍不接入真实产品素材、真实二维码或未确认业务事实。

## 已完成

### 1. 新增 `spatial-poses.ts`

新增文件：

- `src/presentation/stage/spatial-poses.ts`

它现在是以下空间合同的代码来源：

- `RoutePhase`
- `BeatMovementKind`
- `CameraPose`
- `SpatialPose`
- `spatialRouteSegments`
- `spatialTransitionBeatIds`
- `getRoutePhaseForScene`
- `getBeatMovementKind`
- `getCameraPoseForScene`
- `getSpatialPoseForActor`

### 2. SpatialStage 改为读取数据

`SpatialStage` 不再在组件内部写：

- route phase 判断
- movement kind 判断
- camera pose 判断

它只负责渲染：

- `data-spatial-stage`
- `data-camera-pose-id`
- `data-route-phase`
- `data-beat-movement-kind`
- `data-focus-actor-id`
- `WorldCamera` CSS 变量

### 3. 持久演员补 spatial pose id

`PersistentActorLayer` 中的主要演员现在都带：

- `data-spatial-pose-id`

例如：

- `actor.integration-ring`
- `actor.product-stage`
- `actor.action-path`
- `actor.cta-dock`

这让后续浏览器验收可以检查“同一个演员在不同 Beat 中是换 pose，不是换身体”。

### 4. ContinuityMotionRuntime 清理旧 selector

`ContinuityMotionRuntime` 当前只控制仍在观众主舞台中的层：

- `.background-system`
- `.spatial-stage`
- `.texture-atmosphere`
- `.typography-back`
- `.artifact-layer`
- `.persistent-actor-layer`
- `.product-stage`
- `.integration-geometry`
- `.visual-copy`
- `.shared-shells`

它不再操作：

- `.scroll-narrative-layer`
- `.scroll-continuum-shell`
- `.scroll-flow-field`
- `.scroll-curtain-field`
- `.scroll-cinema-*`
- `.story-spine`
- `.cinematic-route-layer`
- `.continuity-object-layer`
- `.route-map-line-active`

## 验收结果

已通过：

- `npm run lint`
- `npm run typecheck`
- `npm run test`，85 tests
- `npm run build`

## 当前边界

WP-31R 仍是结构收口，不是最终美术。

WP-31R 完成时仍未完成：

- 更宽范围的浏览器视觉验收和截图归档。
- 把 spatial pose 的 x/y/z/scale/opacity 直接应用到演员布局。WP-32R
  已完成首版应用，仍需浏览器视觉确认。
- 清理历史 CSS 中的大量页面链样式。
- 重新做 1366x768 和 1920x1080 的主观视觉验收。

## 下一步

建议 WP-32R：

1. 在 1366x768 和 1920x1080 下复验 `data-spatial-pose-id`、三次 spatial Beat 和 placeholder 状态。
2. 开始把 `SpatialPose` 应用到主要演员布局，而不仅是数据属性。
3. 清理或隔离历史页面链 CSS，避免后续维护者误以为它们仍是主舞台视觉。
