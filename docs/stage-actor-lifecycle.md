# 舞台演员生命周期合同

## 目的

当前问题不是单个 Beat 动画太弱，而是同一个视觉对象没有被当成同一个“舞台演员”管理。

一个演员在舞台上只能经历：

1. 入场：上一 Beat 不在场，当前 Beat 开始在场。
2. 保持：上一 Beat 已在场，当前 Beat 继续在场，只允许移动、变形、换状态。
3. 退场：当前 Beat 是最后一次在场，下一 Beat 不再在场。
4. 离场：当前 Beat 不在场，不允许残留可见层。

禁止：

- 连续多个 Beat 里同一个演员反复从 0 opacity / scale 入场。
- 同一个演员还在连续区间内时提前退场。
- 同一个演员没有退场就用另一个 DOM 副本重新入场。
- 同一个语义对象同时由主舞台、滚动层、路线层、连续对象层各自动画。

## 生命周期判定规则

每个 Beat 都必须先计算 actor lifecycle：

```text
previousVisible = actor appears in previous Beat
currentVisible = actor appears in current Beat
nextVisible = actor appears in next Beat

if !previousVisible && currentVisible -> enter
if previousVisible && currentVisible -> hold
if currentVisible && !nextVisible -> exit after hold state
if !currentVisible -> off
```

连续区间内：

- `enter` 只允许发生在区间第一个 Beat。
- `exit` 只允许发生在区间最后一个 Beat。
- 中间 Beat 必须是 `hold`，可以改变位置、比例、角色、文案、路径进度，但不能重新入场。

## 当前代码里的重复演员

### 1. 全局滚动长卷

Actor id: `stage.scroll-world`

当前来源：

- `src/presentation/stage/ScrollNarrativeLayer.tsx`
  - `.scroll-world-runway`
  - `.scroll-world-runway-track`
  - `.scroll-world-runway-scene`
- `src/presentation/core/PresentationShell.tsx`
  - 原生滚动变量：`--free-scroll-runway-x`、`--native-scroll-runway-y`、`--native-scroll-stage-tilt`

出现区间：

- `01.1` 到 `21.8` 全程在场。

生命周期：

- `01.1`: enter
- `01.2` 到 `21.8`: hold
- 课程结束后才允许 exit

当前风险：

- 不应该按 Scene 或 Beat 重新入场。
- 只能平移、缩放、倾斜、景深移动。
- 不能被 `StageMotionRuntime` 或 `ContinuityMotionRuntime` 当作普通页面卡反复 fade。

### 2. IntegrationRing 接入环

Actor id: `actor.integration-ring`

当前来源：

- `src/presentation/stage/IntegrationRing.tsx`
- `src/presentation/stage/VisualStage.tsx`
  - `.integration-geometry`
  - `.ring-wrap`
- `src/presentation/motion/StageMotionRuntime.tsx`
  - `01.1`、`03.5` 会对 `.integration-ring` 入场
- `src/presentation/motion/motion-registry.ts`
  - `01.1`、`03.5`、`16.3`、`21.8` 都引用接入环/能力环概念

出现区间：

- `01.1` 起建立身份。
- `01.1` 到 `08.7` 是接入/判断/四本账角色。
- `09.1` 到 `15.x` 可降级为背景结构，但不能销毁身份。
- `16.x` 到 `18.x` 变为安全边界角色。
- `19.x` 到 `21.8` 变为行动路径/能力回路角色。

生命周期：

- `01.1`: enter
- `01.2` 到 `21.8`: hold / role morph
- 课程结束后 exit

当前风险：

- `03.5` 对 `.integration-ring` 再次 `from opacity: 0`，这违反连续身份。
- 后续 `16.3` 如果实现为重新出现，也会违反合同。

整改方向：

- `IntegrationRing` 只能在 `01.1` 入场一次。
- 之后只改 `data-ring-role`、位置、大小、线宽、透明度、路径进度。
- `StageMotionRuntime` 需要知道 ring lifecycle，连续区间内不能再 `from opacity: 0`。

### 3. 产品舞台 / 产品本体

Actor id: `actor.product-stage`

当前来源：

- `src/presentation/stage/ProductStage.tsx`
  - `.product-stage-shell`
  - `data-product-id`
  - `data-render-state`
- `src/presentation/stage/VisualStage.tsx`
  - `ProductStage renderState="silhouette" | "warm" | "neutral"`
  - 出现在 `product-slot`、`product`、`technical-facts`、`benefit-translation`、`output-freeze`、`safety`、`finale`
- `src/presentation/stage/ContinuityObjectLayer.tsx`
  - `.continuity-object-product`，仅作为资料/事实/卖点注释层，不再绘制产品本体
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
  - `.actor-product`，仅作为世界标记层，不再绘制产品 ghost

出现区间：

- `08.7` 首次入场。
- `08.7` 到 `21.8` 必须保持同一个产品身份。

生命周期：

- `08.7`: enter
- `09.1` 到 `21.8`: hold
- 课程结束后 exit

当前风险：

- 同一个产品曾被渲染成三套视觉副本：`ProductStage`、`ContinuityObjectLayer`、`ScrollNarrativeLayer` 产品 ghost。
- 当前已移除 `ContinuityObjectLayer` 内的第二套产品外形，并把 `ScrollNarrativeLayer` 产品 ghost 降级为抽象世界标记。
- `ProductStage` 在不同 `frameKind` 分支里条件渲染，React 层面可能反复挂载/卸载。
- `09.2`、`16.3`、`21.8` 如果后续实现为 reveal/fade，会造成“产品再次上场”。

整改方向：

- 产品本体只能有一个主 DOM：优先保留 `ProductStage` 作为唯一产品演员。
- `ContinuityObjectLayer` 可改为产品注释/资料轨道，不再画另一套产品外形。
- `ScrollNarrativeLayer` 只能显示产品所在 Scene 面板，不再画独立产品 ghost。
- `renderState` 只能代表同一产品的状态变化：`silhouette -> warm -> neutral -> safety/finale`。

### 4. 产品资料包 / SourcePacket

Actor id: `actor.source-packet`

当前来源：

- `src/presentation/stage/VisualStage.tsx`
  - `TechnicalFacts`
  - `SourcePacketMini`
  - `.source-packet`
  - `.source-packet-mini`
- `src/presentation/stage/ContinuityObjectLayer.tsx`
  - `.object-source-track`
- `src/presentation/stage/VisualStage.tsx`
  - `data-source-id`

出现区间：

- `10.x` 首次明确入场。
- `10.x` 到 `18.x` 保持为资料/事实/边界来源。
- `19.x` 后可降级为行动路径背景引用。

生命周期：

- Scene 10 第一个 technical-facts Beat: enter
- Scene 10 到 Scene 18: hold
- 进入 Scene 19 时 exit 或 background-hold，二者必须二选一。

当前风险：

- `source-packet` 和 `source-packet-mini` 是不同 DOM，但语义相同。
- `object-source-track` 又是第三个表达。

整改方向：

- 统一为 `actor.source-packet`。
- 大小变化用 variant，不用卸载后再挂载。

### 5. FactCard / BenefitMaster 转译链

Actor id: `actor.fact-to-benefit`

当前来源：

- `src/presentation/stage/VisualStage.tsx`
  - `.fact-card`
  - `.benefit-master`
  - `.fact-lines`
- `src/presentation/stage/ContinuityObjectLayer.tsx`
  - `.object-fact-track`
  - `.object-benefit-track`

出现区间：

- Scene 10 资料事实建立。
- Scene 11 参数转卖点。
- Scene 12 到 Scene 15 作为产品样板依据继续存在。

生命周期：

- Scene 10: enter
- Scene 10 到 Scene 15: hold / transform
- Scene 16 进入安全边界时转入 `actor.source-packet` 或 exit

当前风险：

- `.fact-card` 和 `.object-fact-track` 是同一事实的两个副本。
- `.benefit-master` 和 `.object-benefit-track` 是同一卖点的两个副本。

整改方向：

- 同一 fact/benefit 只保留一个可见载体。
- 从卡片变为轨道时使用 shared actor transform，而不是新元素入场。

### 6. OutputCardStack 输出卡片

Actor id: `actor.output-cards`

当前来源：

- `src/presentation/stage/VisualStage.tsx`
  - `OutputCardStack`
  - `.output-card-stack`
  - `.output-card`
- `src/presentation/stage/VisualStage.tsx`
  - `.output-cards`
  - `.mini-card`

出现区间：

- Scene 15 输出冻结前后首次成组出现。
- Scene 16 到 Scene 18 进入安全审核。

生命周期：

- Scene 15 output-freeze: enter
- Scene 15 到 Scene 18: hold
- Scene 19: exit 或归档为背景证据

当前风险：

- `.output-cards .mini-card` 和 `OutputCardStack` 语义重复。
- `mode="frozen" | "review" | "approved"` 是同一组输出状态，不应触发重新入场。

整改方向：

- 输出卡片用一个 actor 和一个 `data-output-mode`。
- frozen/review/approved 只能改变状态样式。

### 7. HumanReviewNode 人工审核节点

Actor id: `actor.human-review`

当前来源：

- `src/presentation/stage/VisualStage.tsx`
  - `HumanReviewNode`
  - `.human-review-node`
- `src/presentation/stage/VisualStage.tsx`
  - `ApprovalGate`
  - `BoundaryLoop`
  - `ScenarioRadar compact`
- `src/presentation/motion/StageMotionRuntime.tsx`
  - `18.7` 对 `.human-review-node` 从 opacity 0 入场

出现区间：

- `18.7` 首次明确入场。
- `18.7` 到 `19.x` 可保持为 compact 审核依据。

生命周期：

- `18.7`: enter
- `18.8` 到 Scene 19 诊断段: hold / compact
- 进入纯行动路径后 exit 或降级为边界徽标

当前风险：

- `18.8` 和 `19.x` 再出现 compact 版本时，可能被当成另一个节点。
- 如果 `StageMotionRuntime` 每次命中 `18.7` 都从 opacity 0 入场，快速前后滚动会重复上场。

整改方向：

- 保留 `data-node-id={humanReviewNode.id}` 作为唯一身份。
- compact 是状态，不是新演员。

### 8. ActionConfirmGate 负责人确认门

Actor id: `actor.action-confirm-gate`

当前来源：

- `src/presentation/stage/VisualStage.tsx`
  - `ActionConfirmGate`
  - `.action-confirm-gate`
- `src/presentation/motion/StageMotionRuntime.tsx`
  - `18.7` 对 `.action-confirm-gate` 从 opacity 0 入场

出现区间：

- `18.7` 首次明确入场。
- `18.8` 至行动路径开始前保持。

生命周期：

- `18.7`: enter
- `18.8`: hold
- Scene 19 后根据行动授权状态 exit 或转为边界状态

当前风险：

- 它与 action path 的 CTA/执行路径容易混在一起。
- 负责人确认门不是 CTA，不允许被 `actor.cta-dock` 接管。

整改方向：

- 使用独立 actor id。
- 只在授权门生命周期内可见。

### 9. ScenarioRadar 诊断雷达

Actor id: `actor.scenario-radar`

当前来源：

- `src/presentation/stage/VisualStage.tsx`
  - `ScenarioRadar`
  - `.scenario-radar-stage`
  - `.radar-grid`
  - `.scenario-token`
- `src/presentation/motion/motion-registry.ts`
  - `19.7`

出现区间：

- Scene 19 beat 1 到 beat 8。

生命周期：

- `19.1`: enter
- `19.2` 到 `19.8`: hold
- `19.9`: exit into `actor.action-path`

当前风险：

- `19.7` 合同才声明 ScenarioRadar，但 Scene 19 前面多个 Beat 已经是 `scenario-radar` frameKind。
- 如果只在 `19.7` 入场，会出现“没有入场就已经在场”或“中途突然再次入场”。

整改方向：

- 入场应属于 Scene 19 第一个 scenario-radar Beat，而不是 `19.7`。
- `19.7` 只能是 hold/强调/扫描，不是入场。

### 10. ActionPath 行动路径

Actor id: `actor.action-path`

当前来源：

- `src/presentation/stage/VisualStage.tsx`
  - `ActionPath`
  - `.action-path-stage`
  - `.action-path-line`
  - `.selected-scenario`
  - `.milestone-node`
- `src/presentation/stage/ContinuityObjectLayer.tsx`
  - `.continuity-object-action`，仅作为行动注释/CTA/里程碑状态层，不再绘制行动路径本体
  - `.action-object-card`
  - `.action-object-milestones`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
  - `.actor-action`，仅作为世界标记层，不再绘制行动路径 ghost
- `src/presentation/motion/StageMotionRuntime.tsx`
  - `20.10` 对 `.action-path-line path`、`.selected-scenario`、`.milestone-node` 入场

出现区间：

- `19.9` 首次形成行动路径。
- Scene 20 全段保持。
- Scene 21 beat 1 到 6 继续保持。

生命周期：

- `19.9`: enter
- `20.1` 到 `21.6`: hold / path progress
- `21.7`: 转入 CTA dock，ActionPath 可降级背景或 exit

当前风险：

- `20.10` runtime 把行动路径重新从 strokeDashoffset 起画，违反 `19.9` 到 `21.6` 连续存在。
- 行动路径曾有三套副本：主舞台 ActionPath、ContinuityObjectLayer action object、ScrollNarrativeLayer action ghost。
- 当前已移除 `ContinuityObjectLayer` 内的第二条行动路径，并把 `ScrollNarrativeLayer` action ghost 降级为抽象世界标记。

整改方向：

- ActionPath 只能在 `19.9` 入场一次。
- `20.10` 应该是路径收束/强调，不是重新画整条路径。
- `selectedScenario.id` 必须贯穿，不允许新卡入场。

### 11. CTA / QRDock

Actor id: `actor.cta-dock`

当前来源：

- `src/presentation/stage/VisualStage.tsx`
  - `CtaDock`
  - `.qr-dock`
  - `data-cta-id`
- `src/presentation/stage/ContinuityObjectLayer.tsx`
  - `.action-object-cta`
- `src/presentation/motion/motion-registry.ts`
  - `19.7`、`21.8` 里引用 QRDock/CTA

出现区间：

- Scene 19 作为 compact placeholder 可出现。
- Scene 21.7 转为 expanded CTA dock。
- Scene 21.8 之后保持。

生命周期：

- Scene 19 compact self-check: enter
- Scene 19 到 Scene 21.6: hold compact / low priority
- `21.7`: morph to expanded
- `21.8`: hold still, no loop干扰扫码或提问

当前风险：

- `.action-object-cta` 和 `.qr-dock` 是同一 CTA 的两个视觉副本。
- `21.8` 如果后续实现成 CTA reveal，会造成已出现 CTA 再次入场。

整改方向：

- `data-cta-id={ctaPlaceholder.id}` 是唯一身份。
- compact/expanded 是状态，不是两个演员。

### 12. CinematicRoute / StorySpine / StructuralUI 路线信息

Actor id:

- `actor.global-route`
- `actor.presenter-marker`

当前来源：

- `src/presentation/stage/CinematicRouteLayer.tsx`
- `src/presentation/stage/StorySpine.tsx`
- `src/presentation/stage/StructuralUI.tsx`
- `src/presentation/stage/ScrollNarrativeLayer.tsx`
  - `.scroll-theater-route`
  - `.scroll-beat-constellation`

出现区间：

- 全程存在，但应是辅助层。

生命周期：

- `01.1`: enter
- 全程 hold
- 课程结束 exit

当前风险：

- 当前路线表达至少有四套，容易形成“组件叠一起”的观感。
- 它们不应该分别入场，也不应该盖过主演员。

整改方向：

- 只保留一个观众可见全局路线。
- 其他路线层改为隐藏、开发辅助或完全删除。

## 必须执行的实现顺序

### Step 1: 建立 Actor Registry

新增一个数据源，例如：

```text
src/presentation/stage/stage-actors.ts
```

每个 actor 定义：

- `actorId`
- `label`
- `ownedSelectors`
- `firstBeatId`
- `lastBeatId`
- `visibleBeatIds` 或 `visibleSceneRange`
- `stateByFrameKind`
- `duplicatesToRemove`

### Step 2: 运行时先算 lifecycle

新增 helper：

```text
getActorLifecycle(actorId, previousBeatId, currentBeatId, nextBeatId)
```

输出只允许：

```text
enter | hold | exit | off
```

### Step 3: 动画 runtime 只能按 lifecycle 执行

规则：

- lifecycle `enter`: 允许 opacity/scale/path draw 入场。
- lifecycle `hold`: 禁止从 opacity 0 入场；只允许 transform、状态 morph、路径进度。
- lifecycle `exit`: 允许退场，但必须确认 next Beat 不再使用该 actor。
- lifecycle `off`: 强制不可见并清理 transform。

### Step 4: 去掉同一 actor 的多副本可见表达

优先级：

1. 主舞台唯一 actor DOM。
2. 滚动长卷只负责空间和叙事面板。
3. ContinuityObjectLayer 只保留注释轨道，不画产品或行动路径副本。
4. CinematicRoute/StorySpine/StructuralUI 只保留一个观众可见路线系统。

## 下一轮代码整改验收

需要新增测试覆盖：

1. `actor.product-stage` 在 `08.7` 到 `21.8` 连续出现，只有 `08.7` 允许 enter。
2. `actor.action-path` 在 `19.9` 到 `21.6` 连续出现，`20.10` 不允许重新 path draw 入场。
3. `actor.cta-dock` 从 Scene 19 compact 到 `21.7` expanded 是 morph，不是新 DOM 入场。
4. `actor.integration-ring` 从 `01.1` 到 `21.8` 保持一个 SVG 身份。
5. `actor.human-review` 和 `actor.action-confirm-gate` 在 `18.7` 入场、`18.8` 保持，不能在 `19.x` 以 compact 版本重新入场。
6. 任意连续区间中，`enter` 次数不能超过 1，`exit` 次数不能超过 1，且 `exit` 不能早于区间最后一个 Beat。

## 当前最优先修复项

1. 产品三副本统一：已保留 `ProductStage` 为唯一产品本体，其他层只做注释/世界标记。
2. 行动路径三副本统一：已保留 `ActionPath` 为唯一行动路径本体，其他层只做注释/世界标记。
3. `StageMotionRuntime` 改为 lifecycle-aware，停止在 `03.5`、`20.10` 这类 hold Beat 做重新入场。
4. `ScenarioRadar` 入场点从 `19.7` 前移到 Scene 19 第一个 radar Beat。
5. CTA compact/expanded 改为同一个 `data-cta-id` 的状态 morph。
