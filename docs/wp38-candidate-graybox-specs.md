# WP-38 候选灰盒工作包规格

## 当前状态

本文件只是候选规格，不代表 WP-38 已经启动。

启动前置条件：

```text
docs/gate2-review-decision-record.md
Decision: PASS
```

如果 Gate 2 仍是 `PENDING_HUMAN_REVIEW`、`SMALL_FIX` 或 `FAIL`，不得执行本文件中的实现工作。

## 共同边界

无论选择哪个 WP-38 候选包，都必须遵守：

- 不接真实产品素材。
- 不接真实二维码。
- 不补 MOQ、价格、认证、交期、质保、名额、日期等业务事实。
- 不做最终字体、纹理、光效精修。
- 不扩展到全 21 Scene 视觉生产。
- 不恢复旧 page-chain 主舞台。
- 不使用 `scrollY`、scroll timeline 或 IntersectionObserver 映射 Beat。
- 不新增 Three.js、WebGL、Framer Motion 或新的全局滚动动画库。
- 继续使用 `SpatialStage` / `WorldCamera` / `PersistentActorLayer`。
- 所有运动继续使用绝对 target state，不累计历史 transform。

## 二选一规则

Gate 2 通过后只能选择一个候选包：

| 候选包 | 适合情况 | 不适合情况 |
| --- | --- | --- |
| `WP-38R-A Scene 01-08 纵向连续灰盒` | 想先验证开场到四本账是否摆脱 PPT 感。 | 如果 Gate 2 的横向/穿越/后拉方向还没被接受。 |
| `WP-38R-B 横向产品段完整灰盒` | 想先验证产品旅程和资料转译是否是同一舞台。 | 如果产品占位结构在 Gate 2 里已经显得不连续。 |

两个包不能并行启动，也不能在同一轮里混做。

## WP-38R-A Scene 01-08 纵向连续灰盒

### 目标

验证 Scene 01 到 Scene 08 是否能作为一条向下推进的连续舞台路线成立，而不是 8 张大字页面。

### 范围

- Beat 范围：`01.1 -> 08.7`。
- 空间方向：垂直向下。
- 主要演员：
  - `actor.integration-ring`
  - `actor.judgement-question`
  - `actor.ledger-dial`
  - `actor.product-stage` 只允许在 `08.7` 作为占位产品入口出现。
- 主要检查：
  - 判断问题是否只入场一次。
  - 四本账圆盘是否只入场一次。
  - 接入环是否持续换角色，而不是反复出现新环。
  - `08.7` 是否自然成为产品旅程入口。

### 允许修改

- `spatial-poses.ts` 中 Scene 01-08 的 camera / actor pose 灰盒数据。
- `PersistentActorLayer` 的 actor pose 消费方式，但不能复制第二套演员身体。
- `presentation.css` 中与 Scene 01-08 灰盒位置、遮挡、层级相关的样式。
- 只读诊断 data attribute，用于浏览器验收。
- 针对 Scene 01-08 的测试和文档。

### 禁止修改

- 不改 `09.1`、`16.1`、`21.1` Gate 2 已验收方向，除非人工要求小修。
- 不接真实产品图。
- 不增加新的主舞台层。
- 不恢复 `ScrollNarrativeLayer`、`scroll-continuum-shell`、`scroll-flow-field` 或 `scroll-curtain-field`。
- 不把每个 Beat 做成独立空间推进；大多数 Beat 应保持 `stable`。

### 验收点

| 检查 | 通过条件 |
| --- | --- |
| 连续路线 | Scene 01-08 能看出向下推进，不像逐页翻页。 |
| 演员生命周期 | `judgement-question` 和 `ledger-dial` 没有重复入场。 |
| 接入环身份 | `IntegrationRing` 像同一个演员换功能。 |
| 产品入口 | `08.7` 的 `ProductStage` 是下一段入口，不是突然换页。 |
| Reduced Motion | 空间关系保留，运动明显减少。 |
| 素材 gate | 产品仍是占位，不出现假产品图或假业务事实。 |

## WP-38R-B 横向产品段完整灰盒

### 目标

验证 Scene 09 到 Scene 15 是否能作为一条横向产品旅程成立，并让资料、事实、卖点和输出样板像同一套 `ArtifactSystem` 的占位版本。

### 范围

- Beat 范围：`09.1 -> 15.8`。
- 空间方向：横向产品旅程。
- 主要演员：
  - `actor.product-stage`
  - `actor.integration-ring`
  - `actor.source-packet`
  - `actor.fact-to-benefit`
  - `actor.output-cards`
- 主要检查：
  - `ProductStage` 是否一直是同一个占位产品。
  - 资料包、事实转译、输出卡片是否能作为 `ArtifactSystem` 的候选结构连续存在。
  - `15.8` 是否自然冻结并准备进入 `16.1` 安全空间。

### 允许修改

- `spatial-poses.ts` 中 Scene 09-15 的 camera / actor pose 灰盒数据。
- `MiddleActors` 和 `PersistentActorLayer` 中 `source-packet`、`fact-to-benefit`、`output-cards` 的灰盒姿态与诊断属性。
- `presentation.css` 中与横向产品旅程灰盒相关的布局、遮挡、层级样式。
- `ArtifactSystem` 的类型或文档规划，但不得把 placeholder 包装成真实事实。
- 针对 Scene 09-15 的测试和文档。

### 禁止修改

- 不替换真实产品图片。
- 不补写产品参数、性能、认证、MOQ、价格、交期、质保。
- 不制作真实业务输出样板。
- 不播放 `09.2`、`16.3`、`21.8` 的素材型正式动画。
- 不把资料/卖点/输出拆成每 Beat 一套新卡片身体。
- 不接真实 CTA 或二维码。

### 验收点

| 检查 | 通过条件 |
| --- | --- |
| 横向路线 | Scene 09-15 能看出同一条产品旅程。 |
| 产品身份 | `ProductStage` 始终是 `shower-h1-placeholder` 或同等级占位。 |
| Artifact 连续性 | 资料、事实、卖点、输出像同一系统的不同功能状态。 |
| 进入安全段 | `15.8 -> 16.1` 能自然接上 Gate 2 穿越逻辑。 |
| Reduced Motion | 空间关系保留，运动明显减少。 |
| 素材 gate | 不出现假事实、假产品图、假输出样板。 |

## 共同测试要求

执行任一 WP-38 候选包后，至少运行：

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

并补充：

- `1366 x 768` 浏览器证据。
- `1920 x 1080` 浏览器证据。
- forward / backward 操作证据。
- 快速输入无残留证据。
- Reduced Motion 证据。
- placeholder / material gate 证据。

## 当前不启动原因

截至本文件创建时，Gate 2 决策仍是：

```text
PENDING_HUMAN_REVIEW
```

因此本文件只作为下一步规格，不能被解读为已经批准进入 WP-38。
