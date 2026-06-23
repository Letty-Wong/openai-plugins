# WP-29R 空间运动圣经

## 目标

本文件把纠偏后的空间方向写成可执行合同。后续所有视觉、动画和重构都必须先符合这里的规则，再进入代码实现。

最终课件不是 144 张页面，也不是一条真实浏览器长网页，而是一个固定观众视口里的连续舞台：

- 一个世界坐标系。
- 一个主镜头。
- 一组持续存在的演员。
- Scene / Beat 只改变镜头、演员姿态、深度、遮挡、功能和讲师 cue。

## 核心原则

1. Presenter Mode 是主模式。键盘、按钮和讲师控制决定 Beat。
2. 滚轮和触控板只能触发离散上一 Beat / 下一 Beat，不能用滚动位置决定进度。
3. 任何演员不能因为换 Beat 被重新创建成另一套“看起来一样”的组件。
4. 连续出现的演员只允许 `enter -> hold -> exit`，中间不能重复入场。
5. 空间运动必须使用绝对目标状态，不能累加点击次数、滚动距离或历史 transform。
6. readable copy 继续使用语义 HTML，不能把正文烘焙进图片。
7. 缺失素材继续显示占位状态，不能用假产品图、假二维码或假业务数据补齐。

## 宏观路线

V1 只有一条主空间路线：

| 范围 | 空间方向 | 说明 |
| --- | --- | --- |
| Scene 01-08 | 垂直向下 | 从判断问题进入经营账本，像舞台纵深逐层下沉。 |
| Scene 08-09 | 转为横向 | 第一次重大空间转场，进入产品旅程。 |
| Scene 09-15 | 横向产品旅程 | 产品、资料、事实、卖点、输出围绕同一 ProductStage 展开。 |
| Scene 15-16 | Z 轴向前 | 第二次重大空间转场，穿过 IntegrationRing 进入安全/审核空间。 |
| Scene 16-20 | 垂直向下 | 安全边界、审核、确认、场景诊断和行动路径依次压实。 |
| Scene 20-21 | Z 轴后拉 | 第三次重大空间转场，拉远看见完整闭环与 CTA。 |

禁止把宏观路线改成反复向上、左右来回、或 21 个独立页面上下滚动。

## Beat Movement Kind

每个 Beat 后续都需要归入一种 movement kind：

| Kind | 占比目标 | 镜头 | 演员 | 用途 |
| --- | --- | --- | --- | --- |
| `stable` | 60-70% | 不移动或极轻微呼吸 | 只变强调、文案、遮挡或状态 | 讲师解释、信息确认、停顿。 |
| `actor` | 20-30% | 基本保持 | 演员移动、变形、换角色、显隐局部 | 同一演员在舞台上换动作。 |
| `spatial` | 约 10% | 允许主镜头或空间方向改变 | 多演员随空间一起重排 | 只用于三次重大空间转场和少数必要段落。 |

默认新 Beat 必须是 `stable`。只有在讲师意义需要空间变化时，才升级为 `actor` 或 `spatial`。

## CameraPose 合同

`CameraPose` 是观众看到世界的绝对镜头状态。未来代码实现前，应至少包含：

| 字段 | 类型意图 | 规则 |
| --- | --- | --- |
| `poseId` | 稳定字符串 | 必须可从 Beat 目标状态直接查到。 |
| `x` / `y` / `z` | 数值 | 世界坐标绝对值，不是增量。 |
| `scale` | 数值 | 控制推进/后拉，不叠加历史缩放。 |
| `rotationX` / `rotationY` / `rotationZ` | 数值 | 只用于 2.5D 透视，不制造 WebGL 依赖。 |
| `focusActorId` | actor id | 指向当前视觉主角，可为空。 |
| `depthBand` | `near` / `mid` / `far` | 控制演员层级，不用随机 z-index 抢层。 |
| `transitionFamily` | 规格内五种转场之一 | 不允许默认整屏 fade 替代真实空间运动。 |

CameraPose 只能由 `WorldCamera` 或等价单一运行时拥有。其他组件不能同时写相同 camera CSS 变量。

## SpatialPose 合同

`SpatialPose` 是演员在世界里的绝对位置和身份状态。未来每个持久演员都应有：

| 字段 | 类型意图 | 规则 |
| --- | --- | --- |
| `actorId` | `StageActorId` | 必须来自演员表。 |
| `poseId` | 稳定字符串 | 同一姿态跨 Beat 复用，不重复命名。 |
| `role` | `lead` / `support` / `background` / `control` / `offstage` | 来自 stage script。 |
| `lifecycle` | `enter` / `hold` / `exit` / `off` | 连续区间内中间只能 hold。 |
| `x` / `y` / `z` | 数值 | 世界坐标绝对值。 |
| `scale` | 数值 | 绝对值。 |
| `opacity` | 数值 | 由一个 owner 写入。 |
| `occlusion` | 语义枚举 | 用于遮挡关系，不靠临时 z-index 堆叠。 |
| `function` | 语义角色 | 例如 ledger、product gate、safety boundary、CTA dock。 |

## 属性所有权

每个动画属性只能有一个运行时 owner：

| 属性族 | 允许 owner | 禁止 |
| --- | --- | --- |
| Camera transform / camera CSS vars | `WorldCamera` | `StageMotionRuntime`、单个演员组件、滚动监听。 |
| Actor transform | 对应 actor runtime 或 `PersistentActorLayer` | 多个 layer 同时写同一 selector。 |
| Actor opacity | 对应 actor runtime 或 reduced-motion resolver | CSS hover、GSAP、React state 三方同时写。 |
| SVG stroke offset | 当前 actor runtime | 全局 timeline 统一扫所有 path。 |
| CTA/Q&A state | `PresentationShell` / Q&A 子模式 | 新建 Scene 22 或外部表单假状态。 |
| Content status | content data / asset gate | 视觉层自行伪造 `VERIFIED` 或 `APPROVED`。 |

## 三次重大空间转场

### Scene 08 -> 09

意义：从经营账本转入产品旅程。

要求：

- `IntegrationRing` 不下场，转为产品入口/资料接入角色。
- `ProductStage` 在 `08.7` 入场后持续到 Scene 21。
- 镜头从垂直路线转为横向旅程。
- 真实产品素材未通过 gate 时继续使用 `shower-h1-placeholder`。

### Scene 15 -> 16

意义：从输出成果进入安全边界。

要求：

- `IntegrationRing` 转为安全边界/审核通道，不创建第二个环。
- `ProductStage` 留在场上，从 lead/support 转为被保护对象。
- `HumanReviewNode` 和 `ActionConfirmGate` 作为独立业务节点出现。
- 不用红光效果伪装真实素材 reveal，素材 gate 未过时保持静态占位。

### Scene 20 -> 21

意义：从行动路径后拉到完整闭环和 CTA。

要求：

- `ActionPath` 保持路径身份，不重新入场成新的终幕图形。
- `CtaDock` 可以成为 lead，但二维码仍必须是 placeholder，直到真实 CTA gate 通过。
- 镜头沿 Z 轴后拉，看到环、产品、安全和行动路径的关系。
- Q&A 是 Scene 21 子模式，不新增 Scene 22。

## Reduced Motion

Reduced motion 不是删除逻辑，而是替换运动方式：

- `stable`：保持静态目标状态。
- `actor`：直接到终态，最多短淡入。
- `spatial`：保持空间关系，但去掉长距离位移，最多 250ms。
- 所有 loop 默认关闭，除非后续合同明确允许低强度环境循环。

## WP-30R 入口条件

进入主舞台重构前，必须满足：

- 本文件存在并通过测试保护。
- `docs/actor-identity-v3.md` 存在并列出所有最终演员。
- `AGENTS.md` 明确禁止 scroll-position 驱动 Beat。
- 旧页面链层只能作为 legacy/reference，不能继续作为最终主视觉扩展。
