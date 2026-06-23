# AI 演示网页项目完整进度汇报

本文档用于给 ChatGPT 或其他协作者快速了解项目背景、历史推进、当前状态、关键转向、已完成内容、当前偏差和下一步决策点。

## 0T. 2026-06-23 最新推进更新：WP-47 首版已完成

项目已新增 Gate 2 人工证据清单：

- 新增 `scripts/gate2-human-evidence-checklist.ts`。
- 新增 `npm run review:gate2:checklist`。
- 新增 `docs/gate2-human-evidence-checklist-command.md`。
- 新增 `review/gate2/human-evidence-checklist.md`。
- 该清单把命令日志、9 张截图、4 段无剪辑录屏和决策记录整理成可打勾 checklist。
- 当前命令日志已为 `[x]`，截图、录屏和决策仍为 `[ ]`，因为这些必须人工补充。
- 该命令不截图、不录屏、不批准 Gate 2、不启动 WP-38、不开放真实素材 gate。
- 当前验证通过：`npm run review:gate2:checklist`、`npm run review:gate2:evidence`、`npm run lint`、`npm run typecheck`、`npm run test`（144 tests）、`npm run build`。

## 0S. 2026-06-23 最新推进更新：WP-46 首版已完成

项目已新增 Gate 2 证据完整性检查：

- 新增 `scripts/gate2-evidence-status.ts`。
- 新增 `npm run review:gate2:evidence`。
- 新增 `docs/gate2-evidence-status-command.md`。
- 该命令检查 `npm run review:gate2:kit` 列出的所有证据文件是否存在且非空。
- 当前状态为 `INCOMPLETE_HUMAN_EVIDENCE`：命令日志 4/4，录屏 0/4，截图 0/9，决策 0/1。
- 该命令不批准 Gate 2、不启动 WP-38、不开放真实素材 gate。
- 当前验证通过：`npm run review:gate2:scaffold`、`npm run review:gate2:kit`、`npm run review:gate2:logs`、`npm run review:gate2:evidence`、`npm run lint`、`npm run typecheck`、`npm run test`（139 tests）、`npm run build`。

## 0R. 2026-06-23 最新推进更新：WP-45 首版已完成

项目已新增 Gate 2 命令日志采集：

- 新增 `scripts/gate2-command-log-capture.ts`。
- 新增 `npm run review:gate2:logs`。
- 新增 `docs/gate2-command-log-capture-command.md`。
- 新增/刷新 `review/gate2/command-logs/preflight-gate2.txt`、`review-gate2.txt`、`audit-materials.txt`、`status-gates.txt`。
- 该命令只写当前本地脚本的真实文本输出，不截图、不录屏、不生成假 `.png` / `.mp4`。
- 该命令不批准 Gate 2、不启动 WP-38、不开放真实素材 gate。
- 当前验证通过：`npm run review:gate2:scaffold`、`npm run review:gate2:kit`、`npm run review:gate2:logs`、`npm run lint`、`npm run typecheck`、`npm run test`（134 tests）、`npm run build`。

## 0Q. 2026-06-23 最新推进更新：WP-44 首版已完成

项目已新增 Gate 2 证据目录脚手架：

- 新增 `scripts/gate2-evidence-scaffold.ts`。
- 新增 `npm run review:gate2:scaffold`。
- 新增 `docs/gate2-evidence-scaffold-command.md`。
- 新增 `review/gate2/`、`command-logs/`、`recordings/`、`screenshots/1366/`、`screenshots/1920/` 的 README。
- 该命令只创建人工验收证据目录和 README，不截图、不录屏、不生成假 `.png` / `.mp4`。
- 该命令不批准 Gate 2、不启动 WP-38、不开放真实素材 gate。
- 当前验证通过：`npm run review:gate2:scaffold`、`npm run review:gate2:kit`、`npm run preflight:gate2`、`npm run audit:materials`、`npm run status:gates`、`npm run lint`、`npm run typecheck`、`npm run test`（130 tests）、`npm run build`。

## 0P. 2026-06-23 最新推进更新：WP-43 首版已完成

项目已新增 Gate 2 Review Kit 总入口：

- 新增 `scripts/gate2-review-kit.ts`。
- 新增 `npm run review:gate2:kit`。
- 新增 `docs/gate2-review-kit-command.md`。
- 该命令输出人工验收当天要跑的命令、建议保存的截图/录屏/命令输出文件名、当前 preflight 和中文验收清单。
- 该命令不截图、不录屏、不修改文件、不批准 Gate 2、不启动 WP-38、不开放真实素材 gate。
- 当前验证通过：`npm run review:gate2:kit`、`npm run preflight:gate2`、`npm run audit:materials`、`npm run status:gates`、`npm run lint`、`npm run typecheck`、`npm run test`（126 tests）、`npm run build`。

## 0O. 2026-06-23 最新推进更新：WP-42 首版已完成

项目已新增 Gate 2 人工验收预检命令：

- 新增 `scripts/gate2-review-preflight.ts`。
- 新增 `npm run preflight:gate2`。
- 新增 `docs/gate2-review-preflight-command.md`。
- 该命令汇总 Gate 2 decision、WP-38 guard 和 material placeholder audit。
- 当前预期状态是 `READY_FOR_HUMAN_REVIEW`，意思是可以去做 Gate 2 截图和无剪辑录屏。
- 这不代表 Gate 2 已通过，不代表 WP-38 可以启动，也不代表真实素材 gate 已开放。
- 当前验证通过：`npm run preflight:gate2`、`npm run audit:materials`、`npm run status:gates`、`npm run lint`、`npm run typecheck`、`npm run test`（122 tests）、`npm run build`。

## 0N. 2026-06-23 最新推进更新：WP-41 首版已完成

项目已新增素材占位审计命令：

- 新增 `scripts/material-placeholder-audit.ts`。
- 新增 `npm run audit:materials`。
- 新增 `docs/material-placeholder-audit-command.md`。
- 该命令只读当前代码和本地素材目录，确认产品、CTA、二维码、业务事实和素材动画 gate 仍保持 placeholder / blocked。
- 当前预期结果是 `PASS`，含义是“占位状态正确”，不是“真实素材已通过”。
- 当前验证通过：`npm run audit:materials`、`npm run status:gates`、`npm run lint`、`npm run typecheck`、`npm run test`（118 tests）、`npm run build`。

## 0M. 2026-06-23 最新推进更新：WP-40 首版已完成

项目已新增 WP-38 启动守门命令：

- 新增 `scripts/guard-wp38-start.ts`。
- 新增 `npm run guard:wp38`。
- 新增 `docs/wp38-start-guard.md`。
- 该命令只读 Gate 状态，不修改页面、不批准素材、不启动 WP-38。
- 当前 Gate 2 是 `PENDING_HUMAN_REVIEW`，所以该命令当前应阻断并以非零状态退出；这是预期行为。
- 命令只在 Gate 2 decision 明确为 `PASS` 时允许继续规划 WP-38。
- 即使未来允许 WP-38，真实产品素材、真实二维码和业务事实仍保持素材 gate。
- 当前验证通过：`npm run status:gates`、`npm run lint`、`npm run typecheck`、`npm run test`（114 tests）、`npm run build`。

## 0L. 2026-06-23 最新推进更新：WP-39 首版已完成

项目已新增 Gate 状态命令：

- 新增 `scripts/project-gate-status.ts`。
- 新增 `npm run status:gates`。
- 新增 `docs/project-gate-status-command.md`。
- 该命令只读当前文档，输出 Gate 2 decision、WP-38 implementation、material gates 和 allowed next action。
- 当前预期输出：Gate 2 为 `PENDING_HUMAN_REVIEW`，WP-38 为 blocked，素材 gate 为 closed。
- 命令不会修改页面、不会批准 Gate、不会启动 WP-38、不会替换真实素材。
- 当前验证通过：`npm run status:gates`、`npm run lint`、`npm run typecheck`、`npm run test`（110 tests）、`npm run build`。

## 0K. 2026-06-23 最新推进更新：WP-38 候选规格首版已完成

项目已准备 Gate 2 通过后的候选灰盒工作包规格，但没有启动实现：

- 新增 `docs/wp38-candidate-graybox-specs.md`。
- 文件明确：只有当 `docs/gate2-review-decision-record.md` 被人工填写为 `Decision: PASS` 后，才允许启动 WP-38。
- Gate 2 通过后也只能二选一：
  - `WP-38R-A Scene 01-08 纵向连续灰盒`
  - `WP-38R-B 横向产品段完整灰盒`
- 两个候选包都保持灰盒边界，不接真实产品素材、不接真实二维码、不补业务事实、不恢复旧 page-chain 主舞台、不扩展到全 21 Scene 视觉生产。
- 当前验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（106 tests）、`npm run build`。

## 0J. 2026-06-23 最新推进更新：WP-37R-B 首版已完成

项目已补齐 Gate 2 人工验收决策记录：

- 新增 `docs/gate2-review-decision-record.md`。
- 决策记录默认状态是 `PENDING_HUMAN_REVIEW`，不能在截图、录屏和人工判断完成前改成 `PASS`。
- 决策只允许三种：`PASS`、`SMALL_FIX`、`FAIL`。
- 如果 `PASS`，下一步只能二选一：`WP-38R-A Scene 01-08 纵向连续灰盒` 或 `WP-38R-B 横向产品段完整灰盒`。
- 如果 `SMALL_FIX`，只允许修 Gate 2 三段转场的方向、遮挡、节奏、快速输入和 Reduced Motion。
- 如果 `FAIL`，必须回到演员身份、camera pose、空间路线和灰盒结构，不得进入下一段视觉生产。
- 无论决策如何，真实产品素材、真实二维码和业务事实仍需单独素材 gate。
- 当前验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（102 tests）、`npm run build`。

## 0I. 2026-06-23 最新推进更新：WP-37R 首版已完成

项目已补齐 Gate 2 证据台账：

- 新增 `docs/gate2-evidence-ledger.md`。
- 台账把 `AGENTS.md` 的 Gate 2 要求逐项拆成证据项：`1366 x 768`、`1920 x 1080`、前进/后退、快速重复输入、Reduced Motion、当前顶层 DOM 层、持久演员身份、验证命令结果、已知风险和下一工作包建议。
- 台账明确：当前 Gate 2 代码灰盒和中文清单已准备，但人工录屏和截图尚未确认，因此仍不得进入最终视觉精修、真实产品素材、真实二维码或业务事实补全。
- 台账也明确：Gate 2 通过不等于素材 gate 通过，正式产品、CTA、二维码和业务事实仍需单独批准。
- 当前验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（99 tests）、`npm run build`。

## 0H. 2026-06-23 最新推进更新：WP-36R 首版已完成

项目已补齐 Gate 2 人工验收辅助命令：

- 新增 `scripts/gate2-review-manifest.ts`。
- 新增 `npm run review:gate2`，用于输出中文验收清单。
- 新增 `docs/gate2-review-automation.md`，说明该命令只辅助人工验收，不自动截图、不录屏、不替代人工判断。
- 清单内容直接读取 `spatialTransitionCues`，避免三段转场合同与代码脱节。
- 清单覆盖 `09.1`、`16.1`、`21.1` 三段 Gate 2 转场、`1366 x 768` / `1920 x 1080` 截图 URL、四段无剪辑录屏脚本、运行时检查和素材 gate。
- 当前仍不接真实产品素材、真实二维码、真实业务事实，也不恢复旧 page-chain 主舞台。
- 当前验证通过：`npm run review:gate2`、`npm run lint`、`npm run typecheck`、`npm run test`（96 tests）、`npm run build`。

## 0G. 2026-06-23 最新推进更新：WP-35R 首版已完成

项目已开始准备 Gate 2 人工验收材料：

- 新增 `docs/gate2-human-review-package.md`。
- 文件包含四段无剪辑录屏脚本：Scene 08 到 09、Scene 15 到 16、Scene 20 到 21、Reduced Motion。
- 文件包含 `1366 x 768` 与 `1920 x 1080` 截图清单。
- 文件包含通过标准、不通过标准和验收后决策。
- 文件明确 Gate 2 仍不得接真实产品素材、真实二维码、假业务事实或旧 page-chain 主舞台。
- 当前验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（93 tests）、`npm run build`。

当前仍不接真实产品素材、真实二维码、真实业务事实，也不恢复页面链作为主舞台。下一步建议执行 Gate 2 人工验收录制或继续推进录屏自动化辅助。

## 0F. 2026-06-23 最新推进更新：WP-34R 首版已完成

项目已开始让 Gate 2 三段灰盒转场具备可中断连续运动能力：

- 新增 `docs/gate2-interruptible-motion.md`。
- `ContinuityMotionRuntime` 已识别 `getSpatialTransitionCue(beatId)`。
- runtime 只写 `.spatial-transition-graybox` 的 `--gate2-*` 变量，不写 `WorldCamera` 的 `--camera-*` 变量。
- 每次 Beat 改变时会 kill 旧 graybox tween，再进入当前 Beat 的绝对目标状态。
- Reduced Motion / hold 会直接设置 Gate 2 灰盒终态。
- 当前验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（91 tests）、`npm run build`。
- 浏览器复验通过：`1366 x 768` 与 `1920 x 1080` 下，键盘前进/后退穿过三段转场，快速 `20.10 -> 21.1 -> 20.10 -> 21.1` 后 Gate 2 变量回到终态。
- Reduced Motion 通过真实 presenter control 开启后，`16.1` 直接保持 Gate 2 终态。

当前仍不接真实产品素材、真实二维码、真实业务事实，也不恢复页面链作为主舞台。下一步应准备 Gate 2 人工验收材料和无剪辑录屏脚本。

## 0E. 2026-06-23 最新推进更新：WP-33R 首版已完成

项目已开始执行 Gate 2 三段关键空间转场灰盒：

- 新增 `docs/gate2-transition-graybox.md`。
- `src/presentation/stage/spatial-poses.ts` 已新增 `SpatialTransitionCue` 与 `spatialTransitionCues`。
- `09.1` 明确为 `turn-horizontal-product`，表达 Scene 08 到 09 从纵向路线转入横向产品段。
- `16.1` 明确为 `portal-forward-safety`，表达 Scene 15 到 16 沿 Z 轴向前穿过接入环进入安全空间。
- `21.1` 明确为 `dolly-back-finale`，表达 Scene 20 到 21 沿 Z 轴后拉揭示完整闭环。
- `SpatialStage` 已改为读取 Beat 级 camera pose，并在这三个 Beat 内渲染 `SpatialTransitionGraybox`。
- 当前验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（89 tests）、`npm run build`。
- 浏览器复验通过：`1366 x 768` 与 `1920 x 1080` 下，三段转场均输出正确 `data-spatial-transition-kind`、专用 camera pose、axis/portal/reveal 灰盒元素；旧页面链挂载为 0。

当前仍不接真实产品素材、真实二维码、真实业务事实，也不恢复页面链作为主舞台。下一步应做 Gate 2 的连续运动验证和人工验收录屏准备。

## 0D. 2026-06-23 最新推进更新：WP-32R 首版已完成

根据 `Codex纠偏与连续空间重构报告_V1.md`，项目已进一步把纠偏要求落实到 `AGENTS.md` 和演员层：

- `AGENTS.md` 已补充：不能靠新增 page stack、curtain、flow field、scroll world 或辅助 continuity layer 解决 PPT 感。
- `AGENTS.md` 已补充：先定义演员，再安排场景；Scene 是构图/灯光/景深/cue 语境，Beat 是导演 cue，不是页面。
- `AGENTS.md` 已补充 Gate 2：Scene 08 到 09、Scene 15 到 16、Scene 20 到 21 三个关键灰盒转场，未通过前不得进入最终视觉精修或真实素材替换。
- `PersistentActorLayer` 已开始把 `SpatialPose` 输出为 CSS 变量、空间功能和遮挡属性。
- `.persistent-actor` 已开始消费 pose 变量，用 wrapper 级 `translate3d` 和 `scale` 表达同一演员的空间姿态。
- 新增 `docs/spatial-pose-application.md` 记录本轮边界和下一步。
- 当前验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（87 tests）、`npm run build`。
- 浏览器复验通过：`1366 x 768` 与 `1920 x 1080` 下，`20.10` 和三个 spatial Beat 均保持 `SpatialStage` / `WorldCamera` / `PersistentActorLayer` 合同，旧页面链层挂载为 0。

当前仍不接真实产品素材、真实二维码、真实业务事实，也不恢复页面链作为主舞台。

## 0A. 2026-06-23 最新推进更新：WP-29R 已完成

根据 `Codex纠偏与连续空间重构报告_V1.md`，项目已经完成第一轮合同重置：

- 已新增 `docs/spatial-motion-bible.md`，明确一个世界坐标系、一个主镜头、三次重大空间转场、Beat movement kind、CameraPose、SpatialPose、属性所有权和 reduced-motion 规则。
- 已新增 `docs/actor-identity-v3.md`，明确最终演员清单、IntegrationRing 角色、ProductStage 持续区间、ArtifactSystem 收敛计划和 WP-30R 页面链裁剪口径。
- 已更新 `AGENTS.md`，规定后续新空间运动实现前必须先遵守上述两个合同。
- 当时验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（80 tests）、`npm run build`。

下一步不应继续强化 WP-22/WP-23/WP-26/WP-27 的页面链视觉层，也不应回退到页面链主舞台。WP-31R 已完成首版 pose/runtime 收口，下一步应进入 WP-32R：浏览器复验 `data-spatial-pose-id`，并开始把 `SpatialPose` 应用到主要演员布局。

## 0C. 2026-06-23 最新推进更新：WP-31R 首版已完成

WP-31R 已完成首版类型与 runtime 收口：

- 新增 `src/presentation/stage/spatial-poses.ts`，集中定义 `RoutePhase`、`CameraPose`、`SpatialPose`、`BeatMovementKind`、三次 spatial Beat 和空间路线段。
- `SpatialStage` 已改为读取 `spatial-poses.ts`，不再在组件内部写 route/camera/movement 判断。
- `PersistentActorLayer` 已给持久演员输出 `data-spatial-pose-id`。
- `ContinuityMotionRuntime` 已不再操作旧页面链 selector，包括 `scroll-narrative-layer`、`scroll-continuum-shell`、`scroll-flow-field`、`scroll-curtain-field`、`story-spine`、`cinematic-route-layer`、`continuity-object-layer`。
- 当前验证通过：`npm run lint`、`npm run typecheck`、`npm run test`（85 tests）、`npm run build`。

下一步应进入 WP-32R：浏览器复验 pose 数据属性和三次 spatial Beat，再逐步把 `SpatialPose` 应用到演员布局。

## 0B. 2026-06-23 最新推进更新：WP-30R 首版已完成

WP-30R 已完成首版主舞台减法：

- `VisualStage` 已改为挂载 `SpatialStage`，不再挂载 `ScrollNarrativeLayer`。
- 新增 `src/presentation/stage/SpatialStage.tsx`，包含 `SpatialStage` 与 `WorldCamera` 灰盒。
- 新增 `docs/spatial-stage-graybox.md`，记录本轮架构边界；后续 WP-31R 已完成首版。
- 旧页面链源码仍保留为 reference，但 `scroll-continuum-shell`、`scroll-flow-field`、`scroll-curtain-field` 不再通过 `VisualStage` 进入观众主舞台。
- 新增 `tests/wp30r-spatial-stage.test.ts`，保护“挂 SpatialStage，不挂 ScrollNarrativeLayer”的纠偏口径。

WP-31R 已完成首版：`CameraPose`、`SpatialPose` 和 `BeatMovementKind` 已抽成正式数据表，`ContinuityMotionRuntime` 中旧页面链 selector 已清理。当前下一步是 WP-32R 浏览器复验与 pose 应用。

## 0. 2026-06-23 最新纠偏更新

用户提供了 `Codex纠偏与连续空间重构报告_V1.md`。该报告判断 WP-22 / WP-23 / WP-26 / WP-27 的页面式连续视觉不应继续强化，项目应回到“同一空间、同一相机、同一演员姿态变化”的路线。

已落地的首轮纠偏：

- `AGENTS.md` 已更新：Presenter Mode 重新确认为主模式，禁止 `scrollY`、scroll timeline 或 IntersectionObserver 映射 144 Beat。
- 鼠标滚轮 / 触控板保留，但只作为阈值式离散 cue：达到阈值后触发一次上一 Beat 或下一 Beat。
- `PresentationShell` 已移除 `window.scrollY -> rawIndex -> beatIndex -> jumpToBeat`。
- 已移除 144 个 `.native-scroll-beat` 空滚动 section 和对应 CSS。
- 新增 `docs/spatial-reset-audit.md`，记录当前纠偏边界、已完成代码动作、仍待重构的页面式连续层。
- 新增 `tests/wp28-spatial-correction.test.ts`，防止后续恢复 scrollY 映射 Beat。

当前新方向：

- WP-27 冻结为历史参考，不再作为最终视觉架构继续增强。
- WP-29R 已执行：`spatial-motion-bible.md` 和 `actor-identity-v3.md` 已新增，CameraPose、SpatialPose、BeatKind、属性所有权表、IntegrationRing role/pose 和 ArtifactSystem 已进入合同层。
- WP-30R 已执行首版：观众主舞台已解除 `ScrollNarrativeLayer` 挂载，并建立 `SpatialStage` / `WorldCamera` 灰盒。
- WP-31R 已执行首版：正式 pose 数据表已抽出，旧页面链 runtime selector 已清理。
- 下一步执行 WP-32R：浏览器复验 pose 数据属性，并开始让演员布局读取 `SpatialPose`。

## 1. 项目总览

项目名称：AI 演示网页 / 21 幕沉浸式演示网页

项目路径：`/Users/macbook/Documents/前端`

最终目标：把《21 幕视觉分镜规格 V1｜总版》逐步实现为一个可靠、可逆、离线可运行、由讲师控制的沉浸式演示网页。

内容结构：

- 21 个 Scene。
- 144 个 Beat。
- 每个 Beat 是演示 cue，不应被理解成普通 PPT 页面。
- Scene 21 包含 Q&A 子模式，不新增 Scene 22。
- 演示最终需要支持 `1920 x 1080` 和 `1366 x 768` 投屏。
- 演示需要支持 reduced motion、本地资源、离线运行、URL/localStorage 状态恢复。

技术方向：

- Next.js + TypeScript。
- SVG / DOM / CSS masks。
- GSAP 作为受控动画 runtime。
- 暂不使用 Three.js、WebGL、Framer Motion。
- 暂不接真实产品素材、真实二维码、真实业务事实。

## 2. 最初项目合同

最早 `AGENTS.md` 规定了几个不可变约束：

- Scene id 必须是 `scene-01` 到 `scene-21`。
- Beat id 必须稳定、数据驱动。
- 状态必须使用绝对目标状态，不能根据点击历史累加 transform。
- `IntegrationRing` 必须保持同一个几何身份。
- `ProductStage` 必须从 `08.7` 到 Scene 21 保持同一个产品舞台。
- Q&A 是 Scene 21 子模式。
- Presentation mode 原本规定为 keyboard / controls driven，不是 scroll driven。
- 不允许 smooth scrolling 接管 presentation mode。
- 不允许一个全局 timeline 控制整套演示。
- 所有动画作用域必须能在卸载、切 Beat、中断时清理。
- 不能伪造 MOQ、价格、交期、认证、质保、日期、名额等业务事实。
- Demo 数据必须是公开、虚构或匿名化的。

这份合同是后续所有 WP 的基础。

## 3. 历史推进概览

### WP-00：仓库审计

已完成。

确认原仓库起初没有正式前端工程、包管理器、路由、样式、测试和构建约定。

交付：

- `docs/repo-audit.md`

### WP-01：项目合同、基础工程与进度文档

已完成。

建立内容：

- `AGENTS.md`
- `docs/project-status.md`
- `docs/implementation-log.md`
- `docs/design-baseline.md`
- `docs/scene-spec-master.md`
- `docs/asset-manifest.md`
- `docs/content-status.md`
- npm / Next.js / TypeScript 基线
- lint / typecheck / test / build 脚本

### WP-02：Scene / Beat 数据合同

已完成。

21 个 Scene、144 个 Beat 已进入类型安全数据。

每个 Beat 具备：

- 稳定 ID。
- Scene 归属。
- 讲师 cue。
- 屏幕文案。
- 目标状态。
- reduced-motion 目标状态。

### WP-03：演示控制壳与状态恢复

已完成。

实现内容：

- 占位播放器。
- 键盘控制。
- 按钮控制。
- Scene 跳转。
- Beat 前后切换。
- reset。
- 备注。
- reduced motion。
- Q&A 子模式。
- URL hash / localStorage 恢复。

### WP-04：视觉 Token、固定舞台、接入环

已完成。

建立基础视觉系统：

- near-black。
- warm paper。
- signal red。
- metal gray。
- 固定舞台。
- 背景系统。
- 字体系统。
- `IntegrationRing`。

### WP-05A / WP-05B / WP-05C：高风险静态原型

已完成。

覆盖内容：

- 开场判断。
- AI 时间线。
- 四本账圆盘。
- 产品占位。
- 资料包。
- 参数转译。
- 安全边界。
- 行动路径。
- CTA 占位。

重要边界：

- 没有接真实产品图。
- 没有生成真实二维码。
- 没有补造业务事实。

### WP-06：浏览器视觉验收与修正

已完成。

对 `1366 x 768` 和 `1920 x 1080` 做过关键帧检查。

修复问题：

- 深链接。
- 标题重复。
- 越界。
- 拥挤。
- 终幕对比度。

### WP-07：动画合同与素材 gate

已完成。

建立内容：

- motion 合同。
- 素材门槛。
- reduced-motion 规则。

此时只定义动画，不执行正式 runtime。

### WP-08A：首批代码对象动画 runtime

已完成。

安装并使用 GSAP，只允许五个代码生成 Beat 播放受控动画：

- `01.1`
- `03.5`
- `05.1`
- `18.7`
- `20.10`

仍然阻断：

- `09.2` 产品正式 reveal。
- `16.3` 产品暖光切红光安全转折。
- `21.8` 真实 CTA / 二维码动画。

阻断原因：

- 缺正式产品素材。
- 缺真实 CTA。
- 缺二维码。
- 缺业务审核。

## 4. 参考站调研

用户要求研究：

- `https://larevoltosa.es/`
- `https://www.nanfu.global/`

调研结论不是复制视觉，而是吸收机制：

- 固定镜头。
- 长时间线。
- 同一个视觉对象持续存在。
- 场景像连续空间，而不是一页页 PPT。
- 产品/行动路径应有舞台连续性。
- 视觉应像“世界经过镜头”，不是“每页重新生成元素”。

这直接影响了 WP-09 之后的方向。

## 5. WP-09 到 WP-18：连续叙事探索阶段

这一阶段尝试从 PPT 感转向连续舞台感，但过程里也产生了叠层问题。

推进内容：

- WP-09：新增 `StorySpine`，把 21 Scene / 144 Beat 连成路线。
- WP-10：新增 `CinematicRouteLayer`，做重点路径路线图。
- WP-11：新增 `ScrollNarrativeLayer`，做斜向长卷轨道。
- WP-12：增强长卷层视觉权重。
- WP-13：新增滚动胶片条。
- WP-14：新增纵向页面堆栈。
- WP-15：把滚动叙事层提升为主视觉。
- WP-16：新增 `ContinuityObjectLayer`，强化产品和行动对象连续性。
- WP-17：新增导演聚焦层，让产品和行动路径压过背景。
- WP-18：新增 `scroll-cinema-corridor`，尝试做一屏式滚动剧场，并加入滚轮/触控板推进。

这一阶段的收益：

- 不再只是大字切页。
- 开始有参考站式长卷感。
- 产品和行动路径开始被视为连续对象。

这一阶段的问题：

- 视觉层不断叠加。
- 同一个语义对象可能在多个层里重复出现。
- 用户看到的是“组件叠在一起，看不清内容”。
- Beat 仍像 PPT 翻页，同一组件会反复进场。
- 和最初“presentation mode not scroll driven”的合同开始出现张力。

## 6. 用户关键反馈

用户明确指出：

- 当前视觉像很多组件叠在一起。
- 看不清内容。
- 仍然像左右键换 PPT。
- 希望有一整屏滚动感。
- 同一个视觉组件不应反复进场。
- 舞台上一个演员只会上场、表演、下场，不会连续几幕反复上场。
- 需要先定演员，再安排场景，确定进出场。
- 暂时不要继续修改旧逻辑，先重新整理逻辑。

这个反馈导致项目进入“舞台剧式重构”。

## 7. WP-19R：舞台台本数据合同

已完成。

新增或扩展：

- `src/presentation/stage/stage-actors.ts`
- `src/presentation/stage/stage-script.ts`
- 演员 lifecycle 测试。
- `docs/stage-theater-rearchitecture.md`
- `docs/stage-actor-ownership-matrix.md`

核心方法变为：

- 先定义 Actor。
- 再定义每个 Actor 的 enter / hold / exit / off。
- Scene 是灯光、构图、景深。
- Beat 是导演 cue，不是新页面。
- 同一个语义对象不能由多个层同时画主身体。

四种生命周期：

- `enter`：首次入场。
- `hold`：继续在场，只能表演、移动、变形、换灯光。
- `exit`：最后一次在场，退场或让位。
- `off`：不在场，不能残留。

核心规则：

- 连续区间内不能重复 enter。
- 不能没有入场就 exit。
- 不能没有退场又再次 enter。
- 同一个语义对象只能有一个主 DOM 所有权。

## 8. 核心演员表

当前定义的主要演员包括：

| Actor ID | 中文名 |
| --- | --- |
| `actor.integration-ring` | 接入环 / 能力环 |
| `actor.judgement-question` | 判断问题 |
| `actor.ledger-dial` | 四本账圆盘 |
| `actor.product-stage` | 产品主体 |
| `actor.source-packet` | 产品资料包 |
| `actor.fact-to-benefit` | 参数到利益转译链 |
| `actor.output-cards` | 输出卡片系统 |
| `actor.safety-boundary` | 安全边界 |
| `actor.human-review` | 人工审核节点 |
| `actor.action-confirm-gate` | 负责人确认门 |
| `actor.scenario-radar` | 场景诊断雷达 |
| `actor.action-path` | 行动路径 |
| `actor.cta-dock` | CTA / 二维码舱 |
| `actor.global-route` | 全局路线提示 |
| `actor.presenter-controls` | 讲师控制器 |

## 9. 五幕结构

### Act I：判断

范围：Scene 01 到 Scene 04。

主角：判断问题。

接入环和判断问题在 `01.1` 入场，后续保持，不反复大字重进。

### Act II：四本账

范围：Scene 05 到 Scene 08.6。

主角：四本账圆盘。

圆盘只在 `05.1` 入场，后续只是象限强调和结构变化。

### Act III：产品与输出

范围：Scene 08.7 到 Scene 15。

主角：产品主体。

产品从 `08.7` 入场后一直在场，`09.2` 不能再次 reveal。

### Act IV：安全边界

范围：Scene 16 到 Scene 18。

主角：安全边界。

产品不消失，只是被安全边界重新照亮。`18.7` 必须分离人工审核和负责人确认。

### Act V：行动路径与 CTA

范围：Scene 19 到 Scene 21。

主角依次是场景诊断雷达、行动路径、CTA。

行动路径从 `19.9` 入场，`20.10` 是收束，不是重新画整条路径。

CTA 最终在 `21.7 / 21.8` 稳定展示，不能循环干扰扫码或 Q&A。

## 10. WP-20R 到 WP-25：舞台重构落地

### WP-20R：持久演员层

已完成。

新增 `PersistentActorLayer`。

把以下对象的主身体迁入统一演员层：

- `IntegrationRing`
- `ProductStage`
- `ActionPath`

旧 frame 分支不再直接拥有这些主身体。

### WP-21R-A/B：舞台演员重排与叠层清理

已完成。

新增 `stage-play-v2` 模式。

`VisualStage` 现在带有：

- `data-stage-mode="stage-play-v2"`
- `data-stage-act`
- `data-lead-actor`

目标是让舞台知道当前五幕和当前主角。

### WP-21R-C：后段持久演员

已完成。

把以下对象抽成共享安全演员，并迁入 `PersistentActorLayer`：

- `HumanReviewNode`
- `ActionConfirmGate`
- `CtaDock`

### WP-21R-D：前半段持久演员

已完成。

把判断问题和四本账圆盘抽成共享开场演员，迁入 `PersistentActorLayer`。

### WP-22：全屏长卷主视觉增强

已完成。

`scroll-continuum-shell` 从隐藏背景变成观众可见主视觉层，21 个全屏 section 连续穿过镜头。

### WP-23：上下相邻页露边

已完成。

当前页居中，上下相邻 Scene 露出，增强“连续页面经过镜头”的感觉。

### WP-24：中段持久演员归并

已完成。

新增 `MiddleActors`。

把以下对象迁入 `PersistentActorLayer`：

- 资料包。
- 参数转译链。
- 输出卡片。
- 安全边界。
- 场景雷达。

### WP-25：主舞台并线与历史层裁剪

已完成。

`VisualStage` 收口为：

- `ScrollNarrativeLayer`：唯一连续滚动世界。
- `PersistentActorLayer`：唯一演员身体。
- `FrameCopy`：低优先级字幕提示。
- `ContinuityMotionRuntime` / `StageMotionRuntime`：受控动画 runtime。

历史层不再挂载到观众主舞台：

- `StorySpine`
- `CinematicRouteLayer`
- `ContinuityObjectLayer`
- `StructuralUI`

这些源码暂时保留为历史参考。

这是一个重要节点：项目从“多层叠加”回到了“一个世界 + 一组演员”。

## 11. WP-26：连续滚动视觉强化

已完成。

新增 `scroll-flow-field`。

作用：

- 用当前 Scene、上下文 Scene、斜切大面板、红色流线、纵向 spine 强化“整条世界线经过镜头”的观感。
- 最多显示 5 个大幅 Scene 切片。
- 根据 `--free-scroll-offset` / `--free-scroll-progress` 做视觉位移。
- 键盘/按钮和滚轮推进都通过 runtime 统一过渡和清理。

边界：

- 未接真实产品素材。
- 未接真实二维码。
- 未新增业务事实。
- 未接 Three.js / WebGL / Framer Motion。

## 12. WP-27：全屏滚动幕布层

当前状态：首版推进中，代码已新增，但文档和浏览器验收还没有完全收口。

已做内容：

- 新增 `scroll-curtain-field`。
- 上一幕、当前幕、下一幕使用 `100dvh` 全屏幕布呈现。
- 目标是减少“中间卡片”感觉，让画面更像整屏页面经过固定镜头。
- `scroll-continuum-shell` 被降级为辅助读数层。
- `scroll-flow-field` 提高层级。
- 幕布层被纳入 `ContinuityMotionRuntime` 的 GSAP 作用域和清理逻辑。
- 键盘、按钮、滚轮推进都使用同一套可中断过渡。

已知命令验证：

- `npm run lint`：通过。
- `npm run typecheck`：通过。
- `npm run test`：通过，当前约 76 tests。
- `npm run build`：通过。

仍需收口：

- WP-27 浏览器复验尚未正式写回文档。
- `docs/project-status.md` 中 WP-27 仍显示“首版推进中”。
- `docs/implementation-log.md` 中 WP-27 仍有部分 pending 描述，需要更新。
- 需要人工确认幕布层是否真的比之前更像连续滚动，而不是又叠了一层视觉。

## 13. 当前代码结构概况

主要入口：

- `src/presentation/core/PresentationShell.tsx`
- `src/presentation/stage/VisualStage.tsx`

`PresentationShell` 负责：

- 当前 Beat 状态。
- hash/localStorage 恢复。
- 键盘控制。
- HUD 折叠。
- fullscreen。
- Q&A 子模式。
- 滚动同步。

`VisualStage` 负责：

- 背景系统。
- 连续滚动世界。
- 持久演员层。
- 低优先级字幕。
- 动画 runtime。

当前 `VisualStage` 的核心结构：

- `BackgroundSystem`
- `ScrollNarrativeLayer`
- `TypographySystem`
- `FrameArtifacts`
- `PersistentActorLayer`
- `FrameCopy`
- `ContinuityMotionRuntime`
- `StageMotionRuntime`

当前观众主舞台已经不再挂载历史路线层和旧对象连续层。

## 14. 当前素材状态

正式素材仍然缺失，必须继续 gate。

产品素材需要：

- 正式花洒产品型号。
- 可公开展示权限。
- 正式产品图片。
- 透明底产品图。
- 暖光版本。
- 红光安全转折版本。
- 多角度或 2.5D 拆件素材。
- 明确尺寸、材质、认证、质保等可公开事实。

CTA 素材需要：

- 正式二维码。
- 短链或报名链接。
- 主办方。
- 讲师信息。
- 日期。
- 隐私和资格说明。
- 最终 CTA 文案。

业务输出素材需要：

- 经过审核的销售样板。
- 视频脚本样板。
- FAQ 或异议处理样板。
- 可展示的输出前后对比。
- 审核人确认。

当前产品仍是 `shower-h1-placeholder`，CTA 仍是 placeholder。

## 15. 当前最大问题

项目现在最大的问题不是代码能不能跑，而是“最终交互合同需要重新确认”。

最初合同写的是：

- 演示由 keyboard / controls 驱动。
- 不做 scroll driven presentation mode。
- 不加 smooth scrolling。

但当前实现已经加入了原生 scroll 到 Beat 的映射：

- 监听 `window.scroll`。
- 根据 `window.scrollY` 和页面总高度计算 `rawIndex`。
- 根据 `rawIndex` 得到 `beatIndex`。
- 调用 `jumpToBeat`。
- 同时用 CSS 变量驱动画面里的连续滚动感。

这不是 smooth-scroll 库，也不是 GSAP 全局 timeline，但它确实让 scroll position 参与了 Beat 状态选择。

所以当前路线和原始合同之间有一个需要人工确认的冲突：

- 如果坚持原合同：滚动只能作为“上一 Beat / 下一 Beat”的辅助输入，不能由 scrollY 映射 144 个 Beat。
- 如果接受新方向：需要修改 `AGENTS.md`，正式承认项目变为“可自由滚动的舞台网页”，并重新定义 presenter mode 与 scroll mode 的关系。

## 16. 当前已通过的测试范围

目前测试大致覆盖：

- Scene / Beat 数据完整性。
- Q&A 是 Scene 21 子模式。
- CTA 不生成真实二维码。
- motion registry 白名单。
- 素材 gate。
- GSAP runtime 只启用指定 Beat。
- reduced motion 分支。
- 演员 lifecycle。
- 同一 actor 不重复 enter。
- `PersistentActorLayer` 拥有关键主身体。
- 旧 frame 分支不再重复渲染产品、接入环、行动路径、安全节点、中段演员。
- 历史层不再挂载到观众主舞台。
- scroll-flow / scroll-curtain 相关静态结构。

## 17. 浏览器验收历史

之前已经多次用浏览器验收过：

- `1366 x 768`
- `1920 x 1080`
- `localhost:3000`

已确认过的内容包括：

- hash 深链接可用。
- `20.10` 能显示行动路径 lead。
- `09.2` 能显示产品 lead，且仍是 placeholder。
- `21.8` CTA 仍是 placeholder。
- 旧路线层、故事脊柱、连续对象层在 WP-25 后不再挂载到主舞台。
- 滚轮/触控板可以从 `20.10` 推进到 `21.1`。
- reduced motion 下 flow 层保留静态可见状态。
- HUD 默认折叠。

WP-27 之后的最新浏览器复验仍需补。

## 18. 当前需要 ChatGPT 重点理解的历史转折

第一阶段：搭工程和数据。

项目从空仓库变成 Next.js + TypeScript + 21 Scene / 144 Beat 的演示基线。

第二阶段：做静态原型。

实现了接入环、产品占位、资料包、卖点转译、安全边界、行动路径、CTA 占位。

第三阶段：接入有限动画。

只允许五个代码生成 Beat 使用 GSAP runtime，严格阻断素材相关动画。

第四阶段：参考站调研后尝试连续叙事。

加入 StorySpine、路线层、长卷层、胶片条、页面堆栈等，方向对了，但层数过多。

第五阶段：用户指出“还是 PPT、组件叠、同一演员反复进出”。

项目停下来重新定义舞台方法。

第六阶段：舞台剧式重构。

定义演员、生命周期、五幕结构，迁移到 `PersistentActorLayer`，裁剪历史层。

第七阶段：强化滚动视觉。

加入 flow field 和 curtain field，让画面更像整屏连续世界经过镜头。

当前正处于第七阶段末尾：视觉方向正在接近“连续滚动舞台”，但合同上需要决定是否正式接受 scroll-driven 方向。

## 19. 当前建议的下一步

不建议继续无脑加视觉层。

建议先做 WP-28 合同校准 / 舞台模式确认：

1. 明确最终是“讲师控制演示”还是“自由滚动舞台网页”。
2. 如果坚持讲师控制：把 scroll 逻辑改为离散上一 Beat / 下一 Beat，不用 scrollY 映射 144 Beat。
3. 如果接受自由滚动：修改 `AGENTS.md`，正式建立 scroll mode 合同。
4. 收口 WP-27 浏览器复验和文档状态。
5. 做一次视觉人工验收：是否还像 PPT，是否仍叠层，是否看得清主角。
6. 然后再继续调整演员位置、字幕降级、主角镜头和滚动节奏。

## 20. 一句话总结

项目已经从“PPT 式 144 页演示”重构成“一个连续滚动世界 + 一组持久舞台演员”的方向；核心工程、数据、动画合同、演员生命周期和大部分重复层清理都已完成，但当前滚动控制已经偏离最初“只由键盘/控制器驱动”的合同，下一步必须先确认最终交互模式，再继续推进视觉精修。
