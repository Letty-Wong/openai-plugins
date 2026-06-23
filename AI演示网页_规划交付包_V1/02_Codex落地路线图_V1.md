# Codex 落地路线图 V1

> 目标：把《21 幕视觉分镜规格 V1｜总版》逐步实现为可靠、可逆、离线可运行的讲师演示网页。  
> 原则：一次只完成一个可验收工作包；每个工作包通过后再进入下一个。  
> 首版技术：Next.js + TypeScript + GSAP + SVG + DOM + 2.5D 产品图。  
> 非目标：一次性生成完整动画网站、先上 WebGL、接入实时 AI、先做后台或先做移动端营销页。

---

## 1. Codex 的工作协议

每次交给 Codex 的任务都应包含四部分：

```text
Goal        本轮只解决什么
Context     需要读取哪些规格和现有代码
Constraints 本轮禁止做什么
Done when   可以客观验证的完成条件
```

每次工作包结束，Codex 必须报告：

1. 修改和新增的文件。
2. 关键设计决策。
3. 运行过的命令与结果。
4. 尚未解决的问题。
5. 三个目标视口的截图或测试结果。

禁止用“顺便重构”“顺便换库”扩大范围。新增依赖必须说明现有能力为何不足。

---

## 2. 建议仓库结构

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                       # 演示模式入口
│   └── browse/page.tsx                # 后期会后浏览模式
├── presentation/
│   ├── core/
│   │   ├── PresentationShell.tsx
│   │   ├── PresentationController.ts
│   │   ├── TransitionOrchestrator.ts
│   │   ├── state-types.ts
│   │   ├── state-resolver.ts
│   │   ├── keyboard.ts
│   │   └── persistence.ts
│   ├── stage/
│   │   ├── VisualStage.tsx
│   │   ├── BackgroundSystem.tsx
│   │   ├── IntegrationRing.tsx
│   │   ├── TypographySystem.tsx
│   │   ├── ArtifactLayer.tsx
│   │   ├── ProductStage.tsx
│   │   ├── SharedShellLayer.tsx
│   │   └── AtmosphereSystem.tsx
│   ├── geometry/
│   │   ├── LedgerDial.tsx
│   │   ├── SafetyBoundary.tsx
│   │   ├── ScenarioRadar.tsx
│   │   ├── ActionPath.tsx
│   │   └── CapabilityLoop.tsx
│   ├── presenter/
│   │   ├── PresenterHUD.tsx
│   │   ├── PresenterNotes.tsx
│   │   ├── ChapterNavigator.tsx
│   │   ├── QRDock.tsx
│   │   └── QAPanel.tsx
│   └── scenes/
│       ├── judgement/
│       ├── business-value/
│       ├── product-generation/
│       ├── safety/
│       ├── diagnosis/
│       └── action/
├── content/
│   ├── scenes.ts
│   ├── beats.ts
│   ├── speaker-notes.ts
│   ├── product-facts.ts
│   ├── output-cards.ts
│   ├── safety-demo.ts
│   ├── milestones.ts
│   ├── qa.ts
│   └── cta.ts
├── styles/
│   ├── tokens.css
│   ├── typography.css
│   ├── presentation.css
│   └── reduced-motion.css
└── lib/
    ├── invariant.ts
    ├── preload.ts
    └── asset-registry.ts

public/
└── presentation/
    ├── product/
    ├── parts/
    ├── outputs/
    ├── textures/
    ├── qr/
    └── fonts/

docs/
├── design-baseline.md
├── scene-spec-master.md
├── asset-manifest.md
├── content-status.md
└── implementation-log.md

tests/
├── unit/
├── integration/
└── e2e/
```

实际目录应尊重现有仓库，不为追求此结构而无必要迁移。

---

## 3. 必须先写入 `AGENTS.md` 的规则

```md
# Project objective

Build an original full-screen presenter-controlled web experience with
21 scenes and 144 beats. The source manuscript provides speaker meaning;
the master scene specification controls visual and interaction behavior.

# Non-negotiable architecture

- Scene ids are scene-01 through scene-21.
- Beat ids are stable and data-driven.
- Use absolute target states; never accumulate transforms from click history.
- Keep one IntegrationRing geometry identity across all scenes.
- Keep one ProductStage from scene 08.7 through scene 21.
- Keep artifact ids stable across shared-element transitions.
- Q&A is a submode of scene 21, not scene 22.
- Presentation mode is keyboard/controls driven, not scroll driven.
- All readable content remains semantic HTML.

# Visual constraints

- Use near-black, warm paper, signal red, metal gray.
- No blue-purple AI gradients, robot imagery, code rain, platform-logo walls,
  generic lock/shield icon grids, or default full-screen fades.
- Use only the five transition families defined in the master specification.
- One primary movement, one supporting movement, one optional ambient loop per beat.

# Content integrity

- Content status is VERIFIED, APPROVED, PLACEHOLDER, or DO_NOT_USE.
- Never invent MOQ, price, lead time, warranty, certifications, performance
  figures, diagnostic scores, availability, dates, or seat counts.
- Content approval and execution authorization are separate states.
- Demo data must be public, fictional, or anonymized.

# Technical constraints

- V1 uses SVG, DOM, CSS masks and GSAP.
- Do not add Three.js/WebGL until the full 2.5D path passes acceptance.
- Do not add smooth scrolling to presentation mode.
- Do not create one timeline that owns the entire site.
- Every animation scope must clean up on unmount and on navigation interruption.
- Images must have local fallbacks and explicit dimensions.
- The full presentation must work offline after assets are loaded locally.

# Validation

Use the repository's package manager and run the available equivalents of:
- lint
- typecheck
- unit tests
- end-to-end tests
- production build

Validate at 1920x1080 and 1366x768, with reduced motion and offline mode.
```

---

# 4. 分阶段工作包

## WP-00｜仓库审计，不修改业务代码

### 目标

确认现有技术栈、包管理器、路由、样式方案、测试能力和构建限制。

### Codex 提示词

```text
Goal:
Audit the current repository for the 21-scene presenter-controlled website.
Do not implement the presentation yet.

Context:
Read AGENTS.md if present, package manifests, tsconfig, app/router structure,
existing styling, animation libraries, tests, CI, asset conventions, and build scripts.
Read docs/scene-spec-master.md if it exists.

Constraints:
- Do not add dependencies.
- Do not move or delete existing files.
- Do not change production code except creating docs/repo-audit.md.
- Do not assume pnpm; identify the existing package manager.

Done when:
Create docs/repo-audit.md containing:
1. Current stack and versions.
2. Existing useful components and conflicts.
3. Proposed minimal file changes.
4. Exact commands for lint, typecheck, test, e2e, and build.
5. Risks for full-screen keyboard presentation, SVG morphing, offline assets,
   state restoration, and screenshot testing.
Report findings before any implementation.
```

### 验收门

- 只新增审计文档。
- 明确包管理器和运行命令。
- 识别现有路由和样式，不凭空初始化第二套框架。

---

## WP-01｜项目合同、文档与基础验证

### 目标

把设计总版、素材清单和工程规则放进仓库，建立可重复的验证命令。

### 交付

- `AGENTS.md`
- `docs/design-baseline.md`
- `docs/scene-spec-master.md`
- `docs/asset-manifest.md`
- `docs/implementation-log.md`
- 必要的 `lint / typecheck / test / build` 脚本

### 约束

- 不做视觉页面。
- 不添加动画依赖，除非仓库尚无 GSAP 且本轮明确获准。
- 不把未授权字体或参考站资产提交到仓库。

### 验收门

所有基础命令可运行；文档路径稳定；README 指向主演示入口但不承诺尚未完成的功能。

---

## WP-02｜内容、ID 与绝对状态 Schema

### 目标

先把 21 Scene、144 Beat、讲师备注、Q&A、CTA 和内容状态变成类型安全的数据，不写复杂视觉。

### 交付

```text
src/content/scenes.ts
src/content/beats.ts
src/content/speaker-notes.ts
src/content/qa.ts
src/content/cta.ts
src/presentation/core/state-types.ts
src/presentation/core/state-resolver.ts
```

### 关键要求

- 通过测试断言 Scene 为 21、Beat 为 144。
- 每个 Beat 有唯一 ID、所属 Scene、屏幕短句、讲师 cue、目标状态引用和 reduced-motion 目标。
- 目标状态是绝对值。
- `DO_NOT_USE` 内容在 resolver 层即不可进入观众输出。
- CTA 未配置时状态为 placeholder，不生成随机二维码。

### 示例类型

```ts
type BeatSpec = {
  id: string;
  sceneId: string;
  speakerCue: string;
  screenCopy?: ScreenCopy;
  targetStateId: string;
  transitionPreset: string;
  reducedMotionStateId: string;
};
```

### 验收门

无 UI 也能通过测试遍历所有 Scene/Beat，并从任意 ID 得到确定目标状态。

---

## WP-03｜演示控制壳与状态恢复

### 目标

完成一个只有占位画面的可用演示播放器。

### 交付

- `PresentationShell`
- `PresentationController`
- URL hash / localStorage 恢复
- 下一／上一 Beat
- 下一／上一 Scene
- 重置、全屏、备注、减少动态
- 章节导航
- 基础 Q&A 子模式

### 约束

- 此阶段不做正式视觉动画。
- 控制器与视觉组件解耦。
- 快速按键只保留最新意图。
- 观众画面与讲师 HUD 分层。

### E2E 场景

1. 从 `scene-01/01.1` 前进到 `scene-02/02.1`。
2. 后退后状态正确。
3. 直接跳转 `scene-15/15.7` 并刷新，仍恢复。
4. Scene 21 进入 Q&A，切换 1—6，Esc 返回。
5. reduced-motion 可手动开关并持久化。

### 验收门

不依赖动画也可以完整演示 144 个占位 Beat，导航无错位。

---

## WP-04｜视觉 Token、固定舞台和接入环

### 目标

建立可截图的统一舞台，不实现逐章动画。

### 交付

- 全局颜色、排版和安全区 Token。
- `VisualStage`、`BackgroundSystem`、`TypographySystem`。
- 5 分段 `IntegrationRing` inline SVG。
- 前后环层与文字前后层。
- `StructuralUI`。
- 1920×1080、1366×768 布局。

### 静态关键帧

只完成四张：

- Scene 01.2：Hero。
- Scene 09.2：产品登场占位。
- Scene 16.3：安全边界。
- Scene 21.8：终幕与 CTA 占位。

### 验收门

四张静态截图已经具有统一品牌气质；不依靠动画掩盖排版问题。

---

## WP-05A｜高风险原型：接入环、文字遮挡与经营圆盘

### 范围

```text
01.1 → 02.4
03.5 → 04.7 → 05.1
```

### 验证

- 接入环不会重建或闪烁。
- 巨型文字前后层基线完全一致。
- 环能从立面变为轨道，再汇入经营盘。
- 快速前进／后退无残留。
- reduced-motion 直接建立终态。

### 禁止

不继续制作 Scene 06 以后；不添加 Three.js；不美化粒子。

---

## WP-05B｜高风险原型：产品连续性与参数转译

### 范围

```text
08.7 → 09.2
10.4 → 11.6
```

### 验证

- SIL 与 WARM 产品占位像素级对齐。
- 产品锚点稳定。
- 事实卡穿环后保持同一 ID 并成为利益卡。
- 来源线和 `sourceId` 可追溯。
- 未确认字段不能进入 APPROVED 输出。

### 验收门

即使只有占位产品图，也能看懂“真实产品 → 真实资料 → 翻译客户利益”。

---

## WP-05C｜高风险原型：共享容器、冻结与终幕闭合

### 范围

```text
12.3 → 13.2
14.7 → 15.8 → 16.3
20.10 → 21.8 → Q&A
```

### 验证

- 海报是同一容器扩张为视频工作台。
- 输出卡保留身份并重排到五部门。
- Scene 15 冻结真正停止全部环境循环。
- WARM → RED 产品不跳位。
- 安全边界、行动路径和能力环共享几何。
- Q&A 退出后终幕恢复。

### 决策门

三个高风险原型全部通过后，才允许大规模补全 21 幕动画。

---

## WP-06｜21 幕静态终态骨架

### 目标

为每个 Scene 的主要 Beat 建立最终静态构图；动画仍保持最少。

### 要求

- 每个 Scene 至少有一个可拍照终态。
- 所有屏幕短句来自配置。
- 所有缺失资产使用明确 DRAFT / PLACEHOLDER / TO_SHOOT。
- Scene 09—16 只使用一个 ProductStage。
- Scene 16—21 只使用一套共享几何坐标系。

### 验收门

关闭所有动画后，21 幕仍能按顺序完成讲解。

---

## WP-07｜第一章动画：Scene 01—04

### 目标

完成判断、文字墙、时代轨道、人效双路径和经营盘交接。

### 重点测试

- 21 个 Beat 全部可逆。
- 两家企业从同一初始状态出发。
- 差距逐步累积，不使用恐吓式坠落。
- 04.7 与 05.1 无整屏淡黑／闪白。

---

## WP-08｜第二章动画：Scene 05—08

### 目标

完成外扩、内收、前进、沉淀四种方向语法，并把抽象能力交给真实产品。

### 重点测试

- 开源不使用金币和成交增长。
- 节流不删除人员节点。
- AI 输出明确为初稿。
- HumanReviewNode 保持主路径。
- 08.7 的产品槽与 09.1 产品注册一致。

---

## WP-09｜产品生成动画：Scene 09—16

### 目标

完成产品、资料、利益、销售素材、视频分镜、多岗位输出、部门重排与安全转折。

### 建议内部拆分

```text
09—11  产品与事实
12—14  ContentShell 与输出
15—16  部门复用、冻结和安全转折
```

### 重点测试

- ProductStage 生命周期唯一。
- ContentShell 生命周期唯一。
- OutputCard ID 稳定。
- 未确认 MOQ、质保等字段被人工确认节点阻挡。
- Scene 15 后退能恢复 15.6 的环境运动。
- Scene 16 进入后停止产品悬浮与指针视差。

---

## WP-10｜安全、诊断与行动：Scene 17—21

### 目标

完成资料分级、工具准入、内容审核、权限确认、场景雷达、行动路线、终幕和 Q&A。

### 重点测试

- 公开／脱敏／禁止三类资料动作不同。
- 内容批准不自动获得执行权限。
- 不展示真实工具安全排名。
- 诊断不生成伪精确分数。
- QR 未配置时显示不可误扫的占位。
- 路线在 Scene 21 由真实样板填补缺口。

---

## WP-11｜主演示可靠性与会后浏览模式

### 主演示

- 本地资产预加载。
- 图片失败回退。
- 全屏失败回退。
- 断网、刷新和长时间停留。
- 可选的演示前 preflight 检查页：分辨率、字体、关键图片、二维码配置。

### 会后浏览

- 复用同一数据。
- 语义化纵向阅读。
- 移动端取消透视轨道和长距离共享元素。
- 增加必要正文、来源与 CTA。
- 不反向影响主演示控制器。

### 验收门

主演示优先通过；浏览模式问题不得阻塞现场版本发布。

---

## WP-12｜最终素材替换、性能和现场彩排

### 素材替换顺序

1. 产品 SIL / WARM / NEUTRAL / RED。
2. 产品部件与锚点。
3. 正式产品事实与利益映射。
4. 海报、话术、分镜、邮件、FAQ。
5. 品牌、讲师、主办、日期。
6. 正式 CTA、二维码与隐私说明。
7. 可选场景图、流水视频和声音。

### 最终验证命令

使用仓库实际脚本执行等价命令：

```text
lint
 typecheck
 unit tests
 e2e tests
 production build
```

### 现场测试矩阵

```text
1920×1080 Chrome 全屏
1366×768 Chrome 全屏
低对比投影
离线冷启动／已缓存启动
刷新恢复 01、09、15.7、16、19、21
快速连续前后 30 次
Reduced Motion
Q&A 进入／退出 20 次
Scene 21 停留 15 分钟
二维码 3—8 米距离实扫
```

最终发布前，业务方必须签字确认产品事实、商业字段、CTA 和隐私信息。

---

# 5. 每个工作包通用 Codex 提示词模板

```text
Goal:
Implement only [WORK PACKAGE NAME].

Context:
- Read AGENTS.md.
- Read docs/scene-spec-master.md.
- Read docs/repo-audit.md and docs/implementation-log.md.
- Inspect the existing implementation before editing.

Scope:
[List exact scene ids, beat ids, components, and files allowed to change.]

Constraints:
- Do not implement later work packages.
- Do not add dependencies unless the current stack cannot meet a stated requirement.
- Preserve all scene and beat ids.
- Use absolute target states.
- Keep shared object identities.
- Keep all readable text in semantic HTML.
- Provide reduced-motion behavior for every new transition.
- Do not invent content or business facts.

Done when:
[List objective visual, state, navigation, test, and screenshot criteria.]

Validation:
Run the repository's lint, typecheck, relevant tests, and build.
Add/update tests for the new state behavior.
Capture 1920x1080 and 1366x768 screenshots for the affected scenes.
Update docs/implementation-log.md with decisions, files, commands, and remaining risks.
```

---

# 6. Codex 审查清单

每次完成后人工检查：

### 状态

- 能否直接打开本轮最后一个 Beat 而不经过前序动画？
- 后退是否回到准确状态？
- 快速重复按键是否出现幽灵元素？
- 刷新是否恢复？

### 视觉

- 静止时是否像完成的设计，而不是动画暂停帧？
- 主焦点是否唯一？
- 是否无意加入蓝紫渐变、泛滥发光或默认卡片模板？
- 转场是否有因果，而不是为了动而动？

### 内容

- 是否把讲师长文误放进主屏？
- 是否出现未经确认的商业字段？
- 是否把 AI 输出表现成自动发布或自动执行？

### 工程

- 是否新增了重复状态源？
- 是否创建了第二个 ProductStage 或第二套接入环？
- 是否使用累计 transform？
- 动画是否在中断和卸载时清理？
- reduced-motion 是否保留逻辑？

---

# 7. 版本发布门

## Alpha

- WP-00—05C 完成。
- 演示壳可用。
- 四张静态关键视觉和所有高风险原型通过。

## Beta

- WP-06—10 完成。
- 21 幕、144 Beat、Q&A 全部可操作。
- 仍可使用少量明确占位素材。

## Release Candidate

- WP-11 完成。
- 离线、恢复、Reduced Motion 和两种演示分辨率通过。
- 正式 CTA 可扫。

## Final

- WP-12 完成。
- 产品事实、素材、链接和隐私信息通过业务审核。
- 现场设备完整彩排通过。

---

# 8. 当前建议的下一条 Codex 指令

在尚未给 Codex 仓库之前，不应让它开始写动画。拿到仓库后，第一条指令只执行 **WP-00 仓库审计**。审计通过后再执行 WP-01，之后严格按工作包推进。

最重要的开发纪律是：

> 先让任意 Scene / Beat 都能被确定地建立和恢复，再让它们动起来；先证明持续对象和共享容器成立，再增加视觉装饰。
