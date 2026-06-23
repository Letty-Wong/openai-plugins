# WP-30R 空间舞台灰盒

## 目标

本轮把 ChatGPT 纠偏报告中的“同一空间、同一相机、同一演员”落到主舞台结构上。

WP-30R 不是最终视觉美术，也不是接入真实产品素材，而是先完成架构纠偏：

- 观众主舞台不再挂载页面链式 `ScrollNarrativeLayer`。
- 新增 `SpatialStage` 作为单一空间灰盒。
- 新增 `WorldCamera` 作为镜头姿态容器。
- 持久演员仍由 `PersistentActorLayer` 负责。
- 缺失产品素材、二维码和业务事实继续保持 placeholder。

## 本轮完成

### 1. 主舞台挂载改造

`VisualStage` 现在挂载：

- `BackgroundSystem`
- `SpatialStage`
- `TextureAtmosphere`
- `TypographySystem`
- `FrameArtifacts`
- `PersistentActorLayer`
- `FrameCopy`
- `ContinuityMotionRuntime`
- `StageMotionRuntime`

`ScrollNarrativeLayer` 源码仍保留，但不再由 `VisualStage` 挂载。

### 2. SpatialStage 灰盒

`SpatialStage` 提供：

- `data-spatial-stage="world-camera-graybox"`
- `data-camera-pose-id`
- `data-route-phase`
- `data-beat-movement-kind`
- `data-focus-actor-id`

它只画空间关系、路线锚点和镜头读数，不创建新的产品、CTA 或业务输出主体。

### 3. WorldCamera 灰盒

`WorldCamera` 使用绝对 CSS 变量表达镜头姿态：

- `--camera-x`
- `--camera-y`
- `--camera-z`
- `--camera-scale`
- `--camera-rotate-x`
- `--camera-rotate-y`
- `--camera-rotate-z`

这些值由当前 Scene 的绝对状态推导，不从滚动位置、点击次数或历史 transform 累加。

### 4. 三次重大空间转场

灰盒已标记三次 `spatial` movement：

- `09.1`：从垂直账本路线转入横向产品旅程。
- `16.1`：从产品/输出空间沿 Z 轴进入安全边界。
- `21.1`：从行动路径沿 Z 轴后拉到完整闭环。

## 旧页面链层状态

以下层进入 legacy/reference 状态：

- `ScrollNarrativeLayer`
- `scroll-continuum-shell`
- 相邻 Scene 露边
- `scroll-flow-field`
- `scroll-curtain-field`
- `scroll-world-runway`
- `scroll-theater-shell`

它们可以暂时留在源码和历史测试里作为参考，但不能重新挂回观众主舞台，也不能继续作为最终视觉方向强化。

## 当前边界

WP-31R 已继续完成：

- 已把 `CameraPose` / `SpatialPose` 抽成正式 TypeScript 数据表。
- 已清理 `ContinuityMotionRuntime` 中对旧页面链 selector 的兼容引用。

当前仍未完成：

- 尚未做浏览器级视觉验收和截图归档。
- 尚未重新排布所有演员在世界坐标系中的最终位置。

## 下一步

建议 WP-32R 做浏览器复验与 pose 应用：

1. 浏览器复验 `data-spatial-pose-id`、三次 spatial Beat 和 placeholder 状态。
2. 开始把 `SpatialPose` 应用到主要演员布局，而不仅是数据属性。
3. 清理或隔离历史页面链 CSS。
