# 舞台剧式演员重排方案

## 这次先停下来做什么

你指出的问题是对的：当前视觉层仍然像很多 PPT 页叠在一起，而不是一场连续舞台剧。

根因不是某个动画参数不对，而是“演员身份”没有先定清楚。旧逻辑里很多视觉对象按 Beat 或 frameKind 重新生成，导致同一个东西看起来反复上场、退场不干净、甚至多套副本同时在场。

本文件只做重新归纳和推进合同：

- 不修改旧视觉逻辑。
- 不新增依赖。
- 不实现新动画。
- 不改路由和控制器。
- 先定义演员，再安排场景，再决定入场、保持、退场。

## 最终呈现应该像什么

目标不是 144 页 PPT，也不是普通长网页。

目标是一座全屏舞台：

- 21 个 Scene 是五幕戏的场景变化。
- 144 个 Beat 是导演 cue，不是 144 张页面。
- 同一个演员只要还在场，就必须保持身份连续。
- 一个演员只在首次出现时入场，只在使命结束时退场。
- 中间 Beat 只能移动、变形、换灯光、换角色，不能反复从 0 opacity 或新 DOM 进场。
- 右侧控制器属于讲师后台，不应长期压在观众主画面上。

## 舞台硬规则

每个演员在每个 Beat 只有四种状态：

| 状态 | 含义 | 允许动作 | 禁止动作 |
| --- | --- | --- | --- |
| `enter` | 上一 Beat 不在场，当前 Beat 首次在场 | 入场、路径绘制、轻量显现 | 同一连续区间内重复入场 |
| `hold` | 上一 Beat 在场，当前 Beat 继续在场 | 移动、缩放、变形、换状态、换主次 | 从 0 opacity 重新出现 |
| `exit` | 当前 Beat 是最后一次在场 | 退场、让位、收束 | 提前退场后又马上重进 |
| `off` | 当前 Beat 不在场 | 不可见、不可交互 | 残留可见层 |

验收句很简单：

一个演员站在舞台上时，只能继续表演，不能反复上场。

## 核心演员表 V2

| 演员 ID | 中文名 | 首次入场 | 退场/继承 | 主身体归属 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `actor.integration-ring` | 接入环 / 能力环 | `01.1` | 课程结束 | `PersistentActorLayer` + `IntegrationRing` | 全程同一个几何身份，不能在 `03.5`、`16.3`、`21.8` 重新入场 |
| `actor.judgement-question` | 判断问题 | `01.1` | `04.7` 后让位 | 待统一 | 第一幕主冲突，后续不能继续用大字标题抢主舞台 |
| `actor.ledger-dial` | 四本账圆盘 | `05.1` | `08.6` 后退为背景或离场 | 待统一 | 只在 `05.1` 入场，后续象限强调是 hold |
| `actor.product-stage` | 产品主体 | `08.7` | 课程结束 | `PersistentActorLayer` + `ProductStage` | 后半程主角，`09.2`、`16.3`、`21.8` 都不能再次 reveal |
| `actor.source-packet` | 产品资料包 | `10.1` | `19.x` 退场或转背景证据 | 待统一 | `source-packet`、`source-packet-mini`、`object-source-track` 应视为同一演员 |
| `actor.fact-benefit-system` | 参数到利益转译链 | `10.4` | `16.x` 并入安全/证据或退场 | 待统一 | FactCard 和 BenefitMaster 是同一条转译链，不应多副本同显 |
| `actor.output-system` | 输出卡片系统 | `12.x` 或 `15.8` | `19.x` 归档或退场 | 待统一 | frozen/review/approved 是状态，不是三套组件 |
| `actor.safety-boundary` | 安全边界 | `16.1` | 终幕低优先级保持 | 待统一 | 不是锁盾图标墙，是灯光、边界和执行约束 |
| `actor.human-review` | 人工审核节点 | `18.7` | `19.x` 转背景或退场 | 待统一 | compact 是状态，不是新节点 |
| `actor.action-confirm-gate` | 负责人确认门 | `18.7` | 行动授权完成后退场或转徽标 | 待统一 | 不能和 CTA 混成一个对象 |
| `actor.scenario-radar` | 场景诊断雷达 | `19.1` | `19.9` 融入行动路径 | 待统一 | `19.7` 只能是强调，不是首次入场 |
| `actor.action-path` | 行动路径 | `19.9` | `21.7` 转入 CTA dock | `PersistentActorLayer` | `20.10` 是收束强调，不能重画整条路径 |
| `actor.cta-dock` | CTA / 二维码舱 | 待确认：`19.x` compact 或 `21.7` 首次 | 课程结束 | 待统一 | compact/expanded 必须是同一 CTA 身份 |
| `actor.global-route` | 全局路线提示 | `01.1` | 课程结束 | 待裁剪 | 只能保留一套观众可见路线系统 |
| `actor.presenter-controls` | 讲师控制器 | `01.1` | 课程结束 | 讲师 UI 层 | 默认应可折叠，不属于观众主画面 |

## 目前一模一样或语义重复的组件

下面这些必须被归为同一个演员，后续不能再各画各的。

| 同一演员 | 当前重复来源 | 应该怎么处理 |
| --- | --- | --- |
| 接入环 | `IntegrationRing`、旧 `.integration-geometry`、动画里直接找 `.integration-ring` | 保留一个主身体；后续 Beat 只改状态，不重复入场 |
| 产品主体 | `ProductStage`、`ContinuityObjectLayer` 的 product object、`ScrollNarrativeLayer` 的 product marker | `ProductStage` 是唯一产品身体；其他只做注释或世界标记 |
| 产品资料包 | `.source-packet`、`.source-packet-mini`、`.object-source-track` | 合并为资料包演员的不同尺寸状态 |
| 参数/卖点转译 | `.fact-card`、`.benefit-master`、`.object-fact-track`、`.object-benefit-track` | 合并为转译链演员；卡片到轨道是 morph |
| 输出卡片 | `OutputCardStack`、`.output-cards .mini-card` | 合并为输出系统；模式变化通过 `data-output-mode` 表达 |
| 安全边界 | `.safety-boundary`、`ApprovalGate`、`BoundaryLoop`、部分 `ScenarioRadar compact` | 安全边界是一个系统，审核和授权门是附着节点 |
| 人工审核 | `HumanReviewNode`、compact 审核提示 | 同一个审核节点，不因 compact 重新入场 |
| 负责人确认 | `ActionConfirmGate`、执行轨道提示 | 独立授权门，不归并到 CTA |
| 场景诊断 | `ScenarioRadar`、场景 token、诊断网格 | `19.1` 入场，`19.7` 强调，不重新进场 |
| 行动路径 | 主 `ActionPath`、`ContinuityObjectLayer` action object、`ScrollNarrativeLayer` action marker | 主路径只保留一个；其他做注释或世界标记 |
| CTA | `CtaDock`、`.action-object-cta` | compact 和 expanded 是同一 CTA dock 的状态 |
| 全局路线 | `CinematicRouteLayer`、`StorySpine`、`StructuralUI`、`ScrollNarrativeLayer` 多套路线 | 只能保留一套观众可见路线，其余降级为调试或删除 |

## 五幕重新安排

### Act I：判断

范围：Scene 01 到 Scene 04。

在场演员：

- 接入环
- 判断问题
- 全局路线低优先级

主角：判断问题。

进出场：

- `01.1` 接入环和判断问题一起入场。
- `01.2` 到 `04.7` 都是 hold，不能继续用新标题页替代演员表演。
- `04.7` 判断问题完成使命。
- `05.1` 判断问题让位给四本账圆盘。

### Act II：四本账

范围：Scene 05 到 Scene 08.6。

在场演员：

- 接入环
- 四本账圆盘
- 全局路线低优先级

主角：四本账圆盘。

进出场：

- `05.1` 圆盘首次入场。
- `05.x` 到 `08.6` 只做象限强调、关系变化和视角调整。
- `08.7` 产品主体入场后，圆盘退为背景坐标或离场。

### Act III：产品与输出

范围：Scene 08.7 到 Scene 15。

在场演员：

- 产品主体
- 资料包
- 参数到利益转译链
- 输出系统
- 接入环背景
- 全局路线低优先级

主角：产品主体。

进出场：

- `08.7` 产品主体首次入场。
- `09.2` 是产品状态变化，不是第二次 reveal。
- `10.x` 资料包和事实来源进场。
- `10.4` 到 `15.x` 转译链持续在场。
- Scene 15 输出系统冻结后，进入安全审查。

### Act IV：安全边界

范围：Scene 16 到 Scene 18。

在场演员：

- 产品主体
- 输出系统
- 安全边界
- 人工审核节点
- 负责人确认门
- 接入环背景

主角：安全边界。

进出场：

- `16.1` 安全边界入场。
- 产品不下场，只是灯光和边界角色改变。
- `18.7` 人工审核节点和负责人确认门分开入场。
- `18.8` 后它们只能保持、压缩或退到背景，不能重新出现一遍。

### Act V：行动路径与 CTA

范围：Scene 19 到 Scene 21。

在场演员：

- 场景诊断雷达
- 行动路径
- CTA dock
- 产品主体
- 安全边界背景
- 全局路线低优先级

主角：先是场景诊断雷达，再是行动路径，最后是 CTA dock。

进出场：

- `19.1` 场景诊断雷达入场。
- `19.9` 行动路径正式入场。
- `20.10` 只是行动路径收束，不是重新画路径。
- `21.7` CTA dock 扩展为终点。
- `21.8` 终幕保持稳定，不能有循环动画干扰扫码和 Q&A。

## 和“自由滚动感”的关系

你希望观感更像整屏自由滚动，这个方向可以做，但需要分清两件事：

- 观众看到的运动可以像连续滚动。
- 生产演示状态仍应由 Beat 控制，避免滚动像素累计导致不可复现。

当前 `AGENTS.md` 仍写着：

- Presentation mode is keyboard/controls driven, not scroll driven.
- Do not add smooth scrolling to presentation mode.
- Use absolute target states; never accumulate transforms from click history.

所以短期策略建议是：

- 先用舞台演员生命周期修掉重复入场和叠层。
- 再把滚轮/触控板作为上一 Beat / 下一 Beat 的输入方式。
- 视觉上做连续舞台和长卷推进。
- 暂时不把生产模式改成真正按滚动像素驱动。

如果要改成真正自由滚动产品，需要先人工批准修改 `AGENTS.md` 的架构合同。

## 下一步整改顺序

### WP-21R-A：只做演员合同校准

目标：

- 校准 `stage-actors.ts` 的命名、首次入场和最后退场。
- 把 `fact-to-benefit` 命名统一为 `fact-benefit-system` 或反过来统一。
- 明确 `cta-dock` 到底从 `19.x` compact 入场，还是 `21.7` 首次入场。
- 明确 `output-system` 是从 `12.x` 开始，还是从 `15.8` 开始。

验收：

- 所有演员连续区间只有一次 enter。
- 所有演员退场后不再可见。
- 任何 actor 不能没有入场就进入 hold 或 exit。

### WP-21R-B：裁剪重复观众层

目标：

- 保留一个观众可见的全局路线系统。
- 其他路线层降级为隐藏、开发辅助或删除。
- `ContinuityObjectLayer` 只做注释，不画产品和行动路径主身体。
- `ScrollNarrativeLayer` 只做世界空间，不画产品/行动/路线的主身体。

验收：

- 同屏不会出现多套路线路径、多套产品、多套 CTA。
- 主角第一眼可读。
- 1366x768 不再堆叠拥挤。

### WP-21R-C：导演运行时

目标：

- `StageMotionRuntime` 改为严格读取 actor lifecycle。
- `enter` 才能播入场。
- `hold` 只能播移动、强调、状态 morph。
- `exit` 只能在演员最后一个 Beat 播。

验收：

- `03.5` 不让接入环重新入场。
- `09.2` 不让产品重新 reveal。
- `18.8` 不让审核节点重新入场。
- `20.10` 不重画整条行动路径。
- `21.8` 不让 CTA 循环干扰扫码或 Q&A。

### WP-21R-D：视觉读感整理

目标：

- 折叠右侧讲师按钮。
- 降低工程 HUD。
- 每一屏只突出一个主角。
- 大字标题退为舞台提示，不再像 PPT 页标题。
- 同一演员在连续 Beat 中以移动和变形延续，不靠反复显隐。

验收：

- 观众能一眼知道当前主角是谁。
- 看起来像同一舞台连续调度。
- 不再出现“演员重新上场”的违和感。

## 当前需要你确认的点

先不要继续改旧逻辑，建议你确认这 5 个关键决定：

1. CTA dock 是否允许从 Scene 19 开始 compact 预告，还是必须到 `21.7` 才首次出现？
2. 输出系统应从 `12.x` 开始入场，还是从 `15.8` 输出冻结时才入场？
3. 四本账圆盘在 `08.7` 后是完全退场，还是作为产品背后的经营坐标低透明保持？
4. 全局路线只保留哪一种：长卷路线、左侧/底部进度脊柱、还是简化成一个极低优先级的舞台轨迹？
5. 是否暂时保持“Beat 控制 + 滚动观感”，不修改 `AGENTS.md` 为真正自由滚动？

确认后再进入 WP-21R-A。没有确认前，不建议继续 patch 旧视觉层。
