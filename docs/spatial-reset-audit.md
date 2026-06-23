# WP-28R 空间连续性纠偏审计

## 目标

根据 `Codex纠偏与连续空间重构报告_V1.md`，项目从 WP-27 的页面式连续视觉转入空间连续性纠偏。

本轮不是推倒重写，而是保留已经证明有价值的底座：

- 21 Scene / 144 Beat 数据。
- 绝对目标状态。
- Presenter 控制、Q&A、URL/localStorage 恢复。
- reduced motion。
- 素材 gate。
- actor lifecycle。
- `PersistentActorLayer`。
- 历史重复层从主舞台解除挂载的成果。

## 已上升为项目合同的规则

已写入 `AGENTS.md`：

- Presenter Mode 是主模式。
- 演示状态不得由 `scrollY`、IntersectionObserver 或 scroll timeline 映射到 Beat。
- 鼠标滚轮和触控板只能在达到阈值后触发一次上一 Beat / 下一 Beat。
- Scene 和 Beat 是状态与 cue，不是 full-page scroll section。
- 不再用新增视觉辅助层解决连续感。
- WP-22 / WP-23 / WP-26 / WP-27 的页面式连续层进入 legacy/reference 状态，不能继续当最终架构强化。
- 最终宏观路线为：Scene 01-08 向下，Scene 08-09 转横向产品旅程，Scene 15-16 沿 Z 轴向前穿过接入环，Scene 16-20 回到向下，Scene 20-21 沿 Z 轴后拉揭示完整闭环。
- V1 只允许三个重大空间转场：08->09、15->16、20->21。
- `IntegrationRing` 是全局连续演员；ledger、安全边界、场景雷达、行动路线等应收敛为它的 role/pose。
- 产品资料、事实、卖点和输出应收敛为 `ArtifactSystem`。

## 本轮已完成代码纠偏

文件：

- `src/presentation/core/PresentationShell.tsx`
- `src/styles/presentation.css`
- `tests/wp18-scroll-theater.test.ts`
- `tests/wp28-spatial-correction.test.ts`

变化：

- 移除 `window.scroll` 监听。
- 移除 `window.scrollY -> rawIndex -> beatIndex -> jumpToBeat`。
- 移除 `window.scrollTo` 同步。
- 移除 144 个 `.native-scroll-beat` 空滚动 section。
- 删除 `.native-scroll-driver` / `.native-scroll-beat` CSS。
- 将 `data-navigation-mode` 改为 `presenter-cue-and-wheel`。
- 新增 wheel 阈值输入：触控板/滚轮达到阈值后只触发一次 `nextBeat` 或 `previousBeat`。
- 保留现有 Beat order 推导的视觉进度 CSS 变量，作为临时兼容层；这些变量现在由当前 Beat 绝对 order 推导，不再由滚动位置推导。

## 尚未完成的纠偏

还没有移除或重构：

- `ScrollNarrativeLayer`
- `scroll-continuum-shell`
- `scroll-flow-field`
- `scroll-curtain-field`
- 上下相邻 Scene 露边
- 页面式 Scene panel / slice / curtain 的主舞台结构
- `ContinuityMotionRuntime` 与 `StageMotionRuntime` 的属性所有权表
- `CameraPose`
- `SpatialPose`
- `BeatKind`
- `ArtifactSystem`

这些应进入后续 WP-29R / WP-30R / WP-31R。

## 当前风险

- 旧页面式连续层仍在主舞台中渲染；本轮只是停止它们继续由滚动位置驱动。
- 旧测试仍保留了部分历史层存在性断言；后续主舞台减法重构时需要同步改为“legacy source exists, audience mount disabled”。
- CSS 变量仍沿用部分 `native-scroll-*` 命名。它们现在不再代表真实滚动，应在空间姿态合同落地时重命名为 camera/pose 语义。

## 后续推进状态

WP-29R 已完成首版合同重置：

- 已新增 `docs/spatial-motion-bible.md`。
- 已新增 `docs/actor-identity-v3.md`。
- 已定义 CameraPose、SpatialPose、Beat movement kind 和属性所有权的规划口径。
- 已把 `IntegrationRing` 的全局 role/pose 与 `ArtifactSystem` 收敛方向写入合同。

WP-30R 已完成首版主舞台减法：

- 已新增 `SpatialStage` / `WorldCamera` 灰盒。
- `VisualStage` 已不再挂载 `ScrollNarrativeLayer`。
- 页面式连续层保留为 legacy/reference 源码，不再作为观众主舞台结构。

WP-31R 已完成首版类型与 runtime 收口：

- 已新增 `src/presentation/stage/spatial-poses.ts`。
- 已给主要持久演员补 `data-spatial-pose-id`。
- 已清理 `ContinuityMotionRuntime` 中旧页面链 selector 的兼容引用。

## 下一步

建议执行 WP-32R：

1. 浏览器复验 `data-spatial-pose-id`、三次 spatial Beat 和 placeholder 状态。
2. 开始把 `SpatialPose` 应用到主要演员布局。
3. 清理或隔离历史页面链 CSS。
