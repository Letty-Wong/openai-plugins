# 舞台剧式重构规划

## 这次先停下来的原因

当前问题不是动画不够多，也不是某一层样式不够明显，而是舞台方法错了。

现在的实现仍然带着 PPT 思路：每个 Beat 像一页，页面里各自生成视觉组件。结果是同一个语义对象会在不同层、不同 Beat、不同 frameKind 里重新出现，观众看到的就是“演员反复上场、下场不干净、组件叠在一起”。

后续必须改成舞台剧方法：

- 先定演员。
- 再定每个演员的入场、在场、转场、退场。
- 最后才安排每个 Scene 的灯光、镜头、文字和节奏。

本文件只做规划，不修改旧逻辑，不新增依赖，不实现动画。

## 最终呈现目标

目标不是做 144 页 PPT，也不是把整套演示变成普通网页长滚动。

目标是一个全屏演示剧场：

- 21 个 Scene 和 144 个 Beat 仍然保留。
- 讲师仍能用键盘、控制器、跳转、Q&A 子模式控制演示。
- 视觉上要像连续舞台：同一个演员从上场到下场保持身份，不在连续区间里反复生成。
- 每个 Beat 是 cue，不是新页面。
- 画面推进可以像 La Revoltosa / NANFU 那样有连续滚动感，但生产演示模式不能违反 `AGENTS.md` 的约束。

## 当前合同冲突

你希望有“完全自由滚动”的感觉；`AGENTS.md` 当前写明：

- Presentation mode is keyboard/controls driven, not scroll driven.
- Do not add smooth scrolling to presentation mode.
- Use absolute target states; never accumulate transforms from click history.

因此下一轮实现必须先按下面的边界推进：

- 允许做连续舞台视觉。
- 允许用滚轮作为进入下一 Beat / 上一 Beat 的输入辅助。
- 允许让画面看起来像一整屏连续推进。
- 不允许让生产演示的状态依赖滚动像素累计。
- 不允许用 smooth-scroll 库、滚动惯性或一个全局 scroll timeline 接管整套演示。

如果后续要真正改成原生自由滚动产品，需要先人工批准修改 `AGENTS.md` 的架构合同。

## 舞台语法

### Actor 演员

演员是一个有稳定身份的视觉对象，例如接入环、产品、行动路径、CTA。

演员必须有：

- `actorId`
- 唯一语义身份
- 唯一主 DOM 所有权
- 首次入场 Beat
- 最后退场 Beat
- 在场区间
- 可变状态
- 允许变形方式
- 禁止重复生成的副本来源

### Scene 场

Scene 不是页面。Scene 是灯光、景深、构图和讲师语义的组合。

同一个演员跨 Scene 出现时，不能重新上场，只能改变：

- 位置
- 比例
- 透明度
- 光照
- 线条进度
- 角色状态
- 附着的说明文字

### Beat 节拍

Beat 是 cue，不是页面。

Beat 只能告诉导演：

- 当前哪些演员在场
- 谁是主角
- 谁退为背景
- 哪些演员做一次主运动
- 哪些演员保持稳定
- 哪些演员准备退场

### Lifecycle 生命周期

每个演员在任意 Beat 只能处于四种状态之一：

- `enter`: 上一个 Beat 不在场，当前 Beat 首次在场。
- `hold`: 上一个 Beat 在场，当前 Beat 继续在场。
- `exit`: 当前 Beat 是最后一次在场，下一 Beat 不在场。
- `off`: 当前 Beat 不在场，不能残留可见层。

硬规则：

- 连续区间内 `enter` 只能发生一次。
- 连续区间内 `exit` 只能发生一次。
- 演员不能没有入场就退场。
- 演员不能没有退场又再次入场。
- 同一个语义对象不能由多个层同时画出主身体。

## 核心演员表

| Actor ID | 中文名 | 主 DOM 所有权 | 首次入场 | 最后退场 | 舞台角色 |
| --- | --- | --- | --- | --- | --- |
| `actor.integration-ring` | 接入环 | `IntegrationRing` | `01.1` | 课程结束 | 世界几何、接入关系、安全边界、能力回路 |
| `actor.judgement-question` | 判断问题 | 判断题组/分岔文字 | `01.1` | `04.7` | 第一幕主冲突 |
| `actor.ledger-dial` | 四本账圆盘 | 经营圆盘 | `05.1` | `08.6` | 从判断转向经营结构 |
| `actor.product-stage` | 产品主体 | `ProductStage` | `08.7` | 课程结束 | 后半程主角，不能重复 reveal |
| `actor.source-packet` | 资料包 | Source packet | `10.1` | `18.x` 或转背景 | 产品事实来源 |
| `actor.fact-benefit-system` | 参数到利益转译链 | Fact/Benefit 系统 | `10.4` | `15.x` | 从资料到可用表达 |
| `actor.output-system` | 多岗位输出 | Output stack | `12.x` | `18.x` | 业务输出与审核对象 |
| `actor.safety-boundary` | 安全边界 | Boundary layer | `16.1` | `21.x` 背景保持 | 内容审批和执行授权边界 |
| `actor.human-review` | 人工审核节点 | HumanReviewNode | `18.7` | `19.x` 或转背景 | 内容可用性审核 |
| `actor.action-confirm-gate` | 负责人确认门 | ActionConfirmGate | `18.7` | `19.x` 或转背景 | 执行授权门 |
| `actor.scenario-radar` | 场景诊断雷达 | ScenarioRadar | `19.1` | `19.8` | 从问题转向行动场景选择 |
| `actor.action-path` | 行动路径 | ActionPath | `19.9` | `21.6` | 后段路线主角 |
| `actor.cta-dock` | CTA / 二维码舱 | CtaDock | `19.x` compact | 课程结束 | 行动终点，`21.7` 扩展 |
| `actor.global-route` | 全局路线提示 | 单一路线系统 | `01.1` | 课程结束 | 辅助层，不得压过主角 |
| `actor.presenter-controls` | 讲师控制器 | 控制 UI | `01.1` | 课程结束 | 可折叠，不属于观众主画面 |

## 演员生命周期表

| 演员 | 入场 | 保持/变形 | 退场/继承 | 禁止行为 |
| --- | --- | --- | --- | --- |
| 接入环 | `01.1` 形成一次 | 判断环、时间轨、经营结构、安全边界、能力回路 | 课程结束后退场 | `03.5`、`16.3`、`21.8` 不能再次从 0 入场 |
| 判断问题 | `01.1` 随接入关系进入 | `01.1 -> 04.7` 保持为问题张力 | `05.1` 让位给圆盘 | 后续不能以大字标题方式反复占主舞台 |
| 四本账圆盘 | `05.1` 进入 | `05.x -> 08.6` 解释经营结构 | `08.7` 退为产品背景或完全离场 | 不能和产品主体争主角 |
| 产品主体 | `08.7` 以占位产品入场 | `09.1 -> 21.8` 持续存在，状态从 silhouette 到 finale | 课程结束后退场 | `09.2`、`16.3`、`21.8` 不能再次 reveal |
| 资料包 | `10.1` 入场 | `10.x -> 18.x` 成为事实来源 | `19.x` 转背景证据或退场 | `source-packet`、`source-mini`、轨道不能三套同显 |
| 参数转译链 | `10.4` 入场 | `10.4 -> 15.x` 从参数变卖点 | `16.x` 合并进安全边界或输出证据 | Fact card 和 benefit track 不能重复画同一信息 |
| 输出系统 | `12.x` 入场 | `12.x -> 18.x` 从输出、冻结到审核 | `19.x` 归档或退场 | frozen/review/approved 是状态，不是新组件 |
| 安全边界 | `16.1` 入场 | `16.x -> 21.x` 从红光转为行动护栏 | 终幕保持低优先级 | 不能变成锁盾图标墙 |
| 人工审核节点 | `18.7` 入场 | `18.8 -> 19.x` compact 保持 | 行动路径成形后转背景或退场 | `18.8`、`19.x` 不能重新入场 |
| 负责人确认门 | `18.7` 入场 | `18.8 -> 19.x` 保持与审核分离 | 行动授权完成后退场或转徽标 | 不能被 CTA 接管 |
| 场景诊断雷达 | `19.1` 入场 | `19.1 -> 19.8` 扫描/选择 | `19.9` 融入行动路径 | `19.7` 不能作为首次入场 |
| 行动路径 | `19.9` 入场 | `20.x -> 21.6` 路线推进和收束 | `21.7` 转入 CTA dock | `20.10` 不能重新画整条路径 |
| CTA dock | `19.x` compact 入场 | `21.7` morph 成 expanded | 终幕保持稳定 | `21.8` 不能循环干扰扫码/Q&A |
| 全局路线 | `01.1` 入场 | 全程低优先级保持 | 课程结束退场 | 不能有多套路线层同时抢画面 |

## 五幕重排

### Act I: 判断

范围：Scene 01 到 Scene 04

在场演员：

- 接入环
- 判断问题
- 全局路线

主角：判断问题。

舞台动作：

- 接入环只入场一次。
- 问题从“你接入 AI 了吗”逐步变成“为什么接入没有效果”。
- 文字不是整屏 PPT，而是贴在接入环和路径断点上的舞台提示。

出场交接：

- 判断问题在 `04.7` 完成使命。
- `05.1` 不是新页面，而是判断结构转成四本账圆盘。

### Act II: 四本账

范围：Scene 05 到 Scene 08.6

在场演员：

- 接入环
- 四本账圆盘
- 全局路线

主角：四本账圆盘。

舞台动作：

- 圆盘只在 `05.1` 入场。
- 后续 Beat 只做象限强调、线索移动、关系收束。
- 接入环退为几何骨架。

出场交接：

- `08.7` 产品主体入场。
- 四本账圆盘退为产品背后的经营坐标，不再主导画面。

### Act III: 产品与输出

范围：Scene 08.7 到 Scene 15

在场演员：

- 产品主体
- 资料包
- 参数转译链
- 输出系统
- 接入环背景
- 全局路线低优先级

主角：产品主体。

舞台动作：

- 产品从 `08.7` 开始一直在场。
- `09.2` 是产品状态变化，不是第二次 reveal。
- 资料包、参数、卖点和输出都附着在同一个产品周围。
- 画面应该像产品被逐层解释，而不是每一页换一张卡。

出场交接：

- Scene 16 开始，产品仍在场。
- 输出系统进入安全边界审查。

### Act IV: 安全边界

范围：Scene 16 到 Scene 18

在场演员：

- 产品主体
- 输出系统
- 安全边界
- 人工审核节点
- 负责人确认门
- 接入环背景

主角：安全边界。

舞台动作：

- 安全不是独立图标墙，而是一套灯光和约束。
- 产品不消失，只是被安全边界重新照亮。
- `18.7` 必须清楚分离“内容审核”和“负责人确认”。

出场交接：

- 审核节点和确认门可转为行动路径的背景依据。
- Scene 19 开始转向场景诊断。

### Act V: 行动路径与 CTA

范围：Scene 19 到 Scene 21

在场演员：

- 场景诊断雷达
- 行动路径
- CTA dock
- 产品主体
- 安全边界背景
- 全局路线低优先级

主角：行动路径，终幕转为 CTA dock。

舞台动作：

- ScenarioRadar 在 `19.1` 入场，`19.9` 转行动路径。
- ActionPath 在 `19.9` 只入场一次。
- `20.10` 是路径收束，不是重新画路径。
- CTA 在前段可以 compact 预告，`21.7` 扩展成终点。
- Q&A 是 Scene 21 子模式，不开 Scene 22。

出场交接：

- 终幕保持稳定，不能有自动循环干扰 CTA 或问答。

## 新架构建议

### 1. Actor Registry

新增或重写统一演员注册表：

```text
src/presentation/stage/stage-actors.ts
```

每个 actor 必须声明：

- `actorId`
- `label`
- `ownedSelectors`
- `firstBeatId`
- `lastBeatId`
- `presence`
- `states`
- `duplicateSources`
- `dominanceByAct`

### 2. Stage Script

新增导演台本：

```text
src/presentation/stage/stage-script.ts
```

它不画 UI，只回答：

- 当前 Beat 哪些演员在场
- 当前主角是谁
- 哪些演员是背景
- 哪些演员发生 morph
- 哪些演员准备 exit

### 3. Stage Director Runtime

用一个导演运行时替代多个层各自动画：

```text
StageDirectorRuntime
```

职责：

- 根据 previous/current/next Beat 计算 actor lifecycle。
- 对 `enter` 播入场。
- 对 `hold` 只播状态变化。
- 对 `exit` 播退场。
- 对 `off` 清理可见残留。

它不能：

- 根据点击次数累加 transform。
- 让 hold 状态从 opacity 0 重新上场。
- 同时控制多个同义副本。

### 4. Persistent Actor Shells

`VisualStage` 后续应渲染稳定的演员外壳，而不是按 frameKind 分支反复挂载主体。

建议分层：

- `PersistentActorLayer`: 唯一演员身体。
- `SceneLightingLayer`: 灯光、遮罩、景深。
- `SceneAnnotationLayer`: 文案、标签、辅助线。
- `PresenterControlLayer`: 可折叠讲师控件。

### 5. Controls vs Scroll Feel

生产演示仍以 Beat 状态为权威。

可以保留：

- 左右键。
- 控制按钮。
- hash/localStorage 恢复。
- 滚轮/触控板触发上一 Beat / 下一 Beat。

暂不允许：

- smooth-scroll 库。
- scroll position 直接决定任意中间状态。
- 一个横跨 144 Beat 的全局 timeline。

如果未来批准自由滚动模式，必须作为独立模式设计，不能混进 presenter mode。

## 下一轮实现顺序

### WP-19R: 舞台重构准备

只做数据和测试：

- 完成 `stage-actors.ts` 的演员表。
- 完成 `stage-script.ts` 的 Beat 到演员关系。
- 增加 lifecycle 测试。
- 不改视觉。

验收：

- 每个 actor 的 enter/hold/exit/off 可以被测试枚举。
- 连续区间中不会出现重复 enter。
- 所有重复主身体都有待删除清单。

### WP-20R: 持久演员层

开始改结构：

- 建立 `PersistentActorLayer`。
- 把 `ProductStage`、`IntegrationRing`、`ActionPath` 改成稳定主体。
- 旧滚动层、路线层降级或移除重复主体。

验收：

- `ProductStage` 从 `08.7` 到 `21.8` 是同一主 DOM。
- `IntegrationRing` 从 `01.1` 到 `21.8` 是同一主 DOM。
- `ActionPath` 从 `19.9` 到 `21.6` 是同一主 DOM。

### WP-21R: 导演运行时

接入生命周期驱动动画：

- `enter`、`hold`、`exit` 分开处理。
- hold Beat 不再重新入场。
- 快速前进/后退不会残留 transform。

验收：

- `03.5` 不会让接入环重新入场。
- `09.2` 不会让产品重新 reveal。
- `20.10` 不会重画整条行动路径。
- reduced motion 仍保留语义状态。

### WP-22R: 舞台读感修正

最后才做视觉整理：

- 折叠右侧按钮。
- 降低工程 HUD。
- 每一屏只突出一个主角。
- 去掉大字 PPT 式重复标题。
- 让相邻 Beat 看起来像同一个舞台连续运动。

验收：

- 观众第一眼能看清主角。
- 同屏没有多套路线、多套产品、多套 CTA。
- 1366x768 和 1920x1080 都可读。

## 当前人工验收点

请先验收这份重排逻辑，而不是验收视觉效果。

需要确认：

- 演员表是否完整。
- 哪些演员应该合并或拆分。
- 产品主体是否从 `08.7` 一直保留到终幕。
- 行动路径是否从 `19.9` 才正式入场。
- CTA 是否允许从 Scene 19 compact 预告，还是必须到 `21.7` 才首次出现。
- 是否要修改 `AGENTS.md`，允许真正的自由滚动生产模式。

在这份演员表和生命周期未确认前，不建议继续修改旧视觉逻辑。
