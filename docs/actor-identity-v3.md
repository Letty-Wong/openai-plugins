# WP-29R 演员身份 V3

## 目标

本文件把“先定演员，再安排场景”的方法落实成可检查的演员表。后续实现必须围绕这些演员做入场、持场、退场和换功能，不能继续按 Beat 创建一批看起来相似的新组件。

## 演员规则

1. 一个视觉对象只有一个 `actorId`。
2. 同一 `actorId` 在可见区间内只能有一次入场和一次退场。
3. 连续多个 Beat 出现时，中间生命周期必须是 `hold`。
4. 演员可以改变角色、姿态、深度、遮挡和功能，但不能被复制成第二套身体。
5. 如果一个旧组件与演员身份重复，旧组件只能保留为源码参考或局部零件，不能在观众主舞台再次渲染完整身体。

## 当前演员清单

| ActorId | 中文名称 | 可见区间 | 主体身份 | 最终归属 |
| --- | --- | --- | --- | --- |
| `stage.scroll-world` | 临时滚动世界 | `01.1 -> 21.9` | 旧页面链灰盒 | WP-30R 后应被 `SpatialStage` / `WorldCamera` 替代。 |
| `actor.integration-ring` | 接入环 | `01.1 -> 21.9` | 全局连续演员 | 最终保留。所有环形、边界、闭环角色都应是它的 pose/role。 |
| `actor.judgement-question` | 判断问题 | `01.1 -> 04.7` | 开场判断主角 | 最终保留。 |
| `actor.ledger-dial` | 四本账圆盘 | `05.1 -> 08.6` | 经营账本主角 | 最终保留。 |
| `actor.product-stage` | 产品舞台 | `08.7 -> 21.9` | 产品连续主角 | 最终保留，素材未到时使用占位产品。 |
| `actor.source-packet` | 资料包 | `10.1 -> 19.8` | 产品资料/证据 | 应并入 `ArtifactSystem`。 |
| `actor.fact-to-benefit` | 事实到卖点 | `10.1 -> 15.8` | 转译链路 | 应并入 `ArtifactSystem`。 |
| `actor.output-cards` | 输出卡片 | `15.8 -> 18.8` | 业务输出样板 | 应并入 `ArtifactSystem`，缺事实保持 placeholder。 |
| `actor.safety-boundary` | 安全边界 | `16.1 -> 21.9` | 审核/防护空间 | 最终保留，可作为 `IntegrationRing` 的边界角色协同。 |
| `actor.human-review` | 人工审核节点 | `18.7 -> 19.8` | 内容审核 | 独立业务演员，不能等同执行授权。 |
| `actor.action-confirm-gate` | 负责人确认门 | `18.7 -> 19.8` | 执行授权 | 独立业务演员，不能等同内容审核。 |
| `actor.scenario-radar` | 场景雷达 | `19.1 -> 19.8` | 场景诊断 | 后续可成为行动前的空间扫描 pose。 |
| `actor.action-path` | 行动路径 | `19.9 -> 21.6` | 行动路线主角 | 最终保留，跨 Scene 20/21 不能重新入场。 |
| `actor.cta-dock` | CTA / 二维码 dock | `19.1 -> 21.9` | CTA 容器 | 最终保留，二维码缺失时必须 placeholder。 |
| `actor.global-route` | 全局路线辅助 | `01.1 -> 21.9` | 历史路线/脊柱层 | 不作为最终演员扩展，后续转为调试/备注或由 WorldCamera 取代。 |
| `actor.presenter-controls` | 讲师控件 | `01.1 -> 21.9` | 控制演员 | 保留，但演示时应可折叠，不能抢观众主屏。 |

## IntegrationRing 角色表

`IntegrationRing` 是全局连续演员，不是每段重新出现的新图形。

| 范围 | Role / Pose | 说明 |
| --- | --- | --- |
| `01.1 -> 04.7` | 判断入口 / 连接问题 | 围绕判断问题形成入口。 |
| `05.1 -> 08.6` | 账本圆盘骨架 | 与四本账形成经营结构。 |
| `08.7 -> 15.8` | 产品接入 / 资料通道 | 作为产品资料进入系统的空间口。 |
| `16.1 -> 18.9` | 安全边界 / 审核通道 | 不新建第二个安全环。 |
| `19.1 -> 21.6` | 场景雷达 / 行动路线框架 | 支撑诊断到行动路径。 |
| `21.7 -> 21.9` | 完整闭环 | 后拉镜头中成为完整系统结构。 |

## ProductStage 规则

`ProductStage` 从 `08.7` 入场后一直在场，直到 `21.9`。它在不同段落中的身份变化如下：

| 范围 | 角色 | 素材规则 |
| --- | --- | --- |
| `08.7 -> 09.2` | 产品 reveal / 旅程入口 | 未通过素材 gate 时保持 `shower-h1-placeholder`。 |
| `10.1 -> 15.8` | 被资料、事实、卖点解释的对象 | 不补写未经确认的产品事实。 |
| `16.1 -> 18.9` | 被安全边界保护的对象 | 不播放素材型安全转折动画。 |
| `19.1 -> 21.9` | 行动路径和 CTA 的背景证据 | 可以 support，但不能消失后再重新进场。 |

## ArtifactSystem 收敛计划

以下演员现在已经存在，但最终应收敛为 `ArtifactSystem`，用稳定 artifact id 管理：

- `actor.source-packet`
- `actor.fact-to-benefit`
- `actor.output-cards`

未来 `ArtifactSystem` 至少应包含：

| Artifact 类别 | 状态来源 | 禁止事项 |
| --- | --- | --- |
| 产品资料 | asset/content manifest | 不伪造型号、认证、材质或性能。 |
| 事实卡 | `VERIFIED` / `APPROVED` 内容 | 不把 placeholder 包装成已审核事实。 |
| 卖点卡 | 已批准转译 | 不发明价格、MOQ、交期、质保。 |
| 输出样板 | fictional / public / anonymized demo | 不使用未授权客户数据。 |

## 场次安排

| Act | Beat 范围 | Lead | Support |
| --- | --- | --- | --- |
| 判断 | `01.1 -> 04.7` | `actor.judgement-question` | `actor.integration-ring`, `actor.global-route` |
| 四本账 | `05.1 -> 08.6` | `actor.ledger-dial` | `actor.integration-ring`, `actor.global-route` |
| 产品与输出 | `08.7 -> 15.8` | `actor.product-stage` | `actor.integration-ring`, `actor.source-packet`, `actor.fact-to-benefit`, `actor.output-cards` |
| 安全与确认 | `16.1 -> 18.9` | `actor.safety-boundary` | `actor.product-stage`, `actor.output-cards`, `actor.human-review`, `actor.action-confirm-gate` |
| 行动与 CTA | `19.1 -> 21.9` | `actor.scenario-radar` / `actor.action-path` / `actor.cta-dock` | `actor.product-stage`, `actor.safety-boundary`, `actor.cta-dock`, `actor.global-route` |

## 重复组件裁剪规则

后续 WP-30R 裁剪主舞台时，按以下规则处理：

| 旧对象 | 当前状态 | 后续处理 |
| --- | --- | --- |
| `scroll-continuum-shell` | 页面链参考层 | 从观众主舞台解除挂载。 |
| 相邻 Scene 露边 | 页面链参考层 | 不作为最终连续感来源。 |
| `scroll-flow-field` | 页面链参考层 | 不继续强化。 |
| `scroll-curtain-field` | 页面链参考层 | 不继续强化。 |
| `StorySpine` / `CinematicRouteLayer` / `ContinuityObjectLayer` | 历史源码参考 | 不重新挂回观众主舞台。 |
| frameKind 私有重复主体 | 已大量迁出 | 继续保持不渲染第二套身体。 |

## 验收口径

WP-30R 之前，人工验收只看本文件是否把演员身份讲清楚。

WP-30R 之后，浏览器验收必须确认：

- 同一个演员连续 Beat 内只有一个 DOM 主体。
- `IntegrationRing` 不重复出现。
- `ProductStage` 从 `08.7` 到 `21.9` 不下场重进。
- `ActionPath` 从 `19.9` 到 `21.6` 不下场重进。
- 讲师控件可以折叠，不遮挡观众主屏。
- 缺素材处仍是明确 placeholder。
