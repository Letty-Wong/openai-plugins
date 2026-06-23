# AI 演示网页项目状态

## 最终目标

把《21 幕视觉分镜规格 V1｜总版》逐步实现为一个可靠、可逆、离线可运行、由讲师控制的沉浸式演示网页。

首版技术方向：

- Next.js + TypeScript
- SVG / DOM / CSS masks
- 2.5D 产品图
- GSAP 只用于已获准的受控动画工作包

最终演示必须支持：

- 21 个 Scene、144 个 Beat。
- 讲师手动前进、后退、跳转、重置。
- Scene 21 内的 Q&A 子模式。
- URL/localStorage 状态恢复。
- Reduced Motion。
- 本地资产与离线演示。
- 1920x1080 与 1366x768 投屏验证。

## 当前推进进度

| 工作包 | 状态 | 说明 |
| --- | --- | --- |
| WP-00 仓库审计 | 已完成 | 已新增 `docs/repo-audit.md`，确认此前无现有前端工程。 |
| WP-01 项目合同、文档与基础验证 | 已完成 | 已建立 `AGENTS.md`、稳定 docs 路径、npm、Next.js/TypeScript 基线和验证命令。 |
| WP-02 内容、ID 与绝对状态 Schema | 已完成 | 已实现 21 Scene / 144 Beat 数据、Q&A、CTA 占位、类型与 resolver。 |
| WP-03 演示控制壳与状态恢复 | 已完成 | 已实现占位播放器、键盘/按钮控制、URL hash/localStorage 恢复、Q&A 子模式、备注和 reduced motion 开关。 |
| WP-04 视觉 Token、固定舞台和接入环 | 已完成 | 已建立统一视觉 Token、固定舞台、五分段接入环和四张静态关键帧。 |
| WP-05A 接入环、文字遮挡与经营圆盘原型 | 已完成 | 已覆盖 `01.1 → 02.4`、`03.5 → 04.7 → 05.1` 的确定状态原型。 |
| WP-05B 产品连续性与参数转译原型 | 已完成 | 已覆盖 `08.7 → 09.2`、`10.4 → 11.6` 的产品占位、事实来源与卖点转译静态状态。 |
| WP-05C 安全边界、行动路径与 CTA 占位原型 | 已完成 | 已覆盖 `15.8 → 16.3`、`18.7 → 18.8`、`19.7 → 21.8` 的边界、诊断、路线和 CTA 占位连续性。 |
| WP-06 浏览器视觉验收与修正 | 已完成 | 已在 `1366 x 768` 与 `1920 x 1080` 检查关键帧，修复深链接、重复标题、越界、拥挤和终幕对比度问题。 |
| WP-07 动画时间线合同与素材门槛 | 已完成 | 已建立 motion 合同、素材 gate 和 reduced-motion 降级规则；未安装 GSAP，未执行真实动画。 |
| WP-08A 首批代码对象动画 Runtime | 已完成 | 已接入 GSAP runtime，只允许 `01.1`、`03.5`、`05.1`、`18.7`、`20.10` 五个代码生成 Beat 播放受控动画。 |
| 参考站调研 | 已完成 | 已新增 `docs/reference-sites-analysis.md`，拆解 La Revoltosa 与 NANFU 的连续视觉叙事机制，并转译为 WP-09 方向。 |
| WP-09 连续叙事原型 | 首版已完成 | 已从“单点动画”升级为全局连续舞台：新增 StorySpine、世界进度、Beat 前后方向和跨 Beat 分层过渡。 |
| WP-10 重点路径连续编排层 | 首版已完成 | 已新增 CinematicRouteLayer，把判断、产品样板、安全边界、行动收束四条路径做成可见路线、路径锚点和片段卡；仍保持讲师控制，不改成滚动网页。 |
| WP-11 长卷镜头连续层 | 首版已完成 | 已新增 ScrollNarrativeLayer，把 21 幕做成斜向长卷场景轨道、固定镜头窗口、上下文字带和进度裂缝；Beat 切换时像滚动推进，但仍不使用浏览器滚动控制。 |
| WP-12 长卷镜头可见性增强 | 首版已完成 | 已把长卷层从背景纹理升级成更明显的主视觉镜头：固定红色取景框、Scene/进度读数、深度刻度和更强活动 Scene 面板。 |
| WP-13 主舞台滚动胶片条 | 首版已完成 | 已新增 Scroll Film Strip，把当前 Scene 与前后 Scene 同屏显示成胶片条，并随 Beat 方向推进，让连续滚动感更直观可见。 |
| WP-14 全屏纵向页面堆栈 | 首版已完成 | 已新增 Viewport Scroll Stack，让上一幕、当前幕、下一幕像纵向滚动页面一样同屏露出，当前幕占主画面。 |
| WP-15 滚动主舞台强化 | 首版已完成 | 已把 Scroll Narrative Layer 提升为更靠前的主视觉层，新增聚焦光场和 21 幕纵向 rail，压低巨型文案与路线 HUD，让页面堆栈更接近参考站的连续滚动观感。 |
| WP-16 产品/行动对象连续性强化 | 首版已完成 | 已新增 ContinuityObjectLayer，让 `08.7 -> 11.6` 保持同一个产品对象被资料和卖点轨道解释，让 `19.7 -> 21.8` 保持同一条行动路径逐步收束。 |
| WP-17 导演聚焦与对象主角化 | 首版已完成 | 已基于 La Revoltosa / NANFU 复核结果新增导演聚焦层，让产品与行动路径 Beat 中的主对象压过背景滚动层，降低“大字 PPT”观感。 |
| WP-18 一屏式滚动剧场纠偏 | 首版已完成 | 已把过多叠层退到背景，新增主导性的 `scroll-cinema-corridor`，让当前 Scene 像一整屏滚动页面，上下相邻 Scene 露出，并支持滚轮/触控板推进 Beat。 |
| WP-19R 舞台台本数据合同 | 已完成 | 已按“先定演员，再排场景”的方向补全演员表、舞台台本和 lifecycle 测试；本轮不改旧视觉渲染。 |
| WP-20R 持久演员层 | 已完成 | 已新增 `PersistentActorLayer`，把 `IntegrationRing`、`ProductStage` 和 `ActionPath` 主身体从旧 frameKind 分支搬到统一演员层；`localhost:3000` 浏览器复验已通过。 |
| WP-21R-A/B 舞台演员重排与叠层清理 | 首版已完成 | 已新增 `docs/stage-play-actor-recut.md`，并落地 `stage-play-v2` 舞台模式：单一滚动主镜头做背景，`PersistentActorLayer` 做前景演员，旧路线/故事脊柱/连续注释层退为隐藏背景，减少多组件叠屏。 |
| WP-21R-C 后段持久演员 | 首版已完成 | 已把 `HumanReviewNode`、`ActionConfirmGate`、`CtaDock` 抽成共享安全演员并迁入 `PersistentActorLayer`；旧 frame 分支不再重复渲染审核、确认和 CTA。 |
| WP-21R-D 前半段持久演员 | 首版已完成 | 已把判断问题和四本账圆盘抽成共享开场演员并迁入 `PersistentActorLayer`；旧 question / ledger 分支不再重复渲染第二套身体。 |
| WP-22 全屏长卷主视觉增强 | 首版已完成 | 已把 `scroll-continuum-shell` 从隐藏背景提升为 stage-play 主视觉：21 个全屏 section 连续穿过镜头，cinema 走廊降为景深；并修复深链接后滚动状态不释放的问题。 |
| WP-23 上下相邻页露边 | 首版已完成 | 已把长卷 panel 从 grid 流改为镜头内绝对定位：当前 Scene 居中，上一幕和下一幕在上下边缘露出，滚动时直接形成连续页面经过镜头的观感。 |
| WP-24 中段持久演员归并 | 首版已完成 | 已新增 `MiddleActors`，把资料包、参数转译链、输出卡片、安全边界和场景雷达迁入 `PersistentActorLayer`；旧 frame 分支不再重复画这些中段主体。 |
| WP-25 主舞台并线与历史层裁剪 | 首版已完成 | `VisualStage` 已裁成单一连续滚动世界 + 持久演员层 + 低优先级文案/动画 runtime；`StorySpine`、`CinematicRouteLayer`、`ContinuityObjectLayer` 等历史层不再挂载到观众主舞台。 |
| WP-26 连续滚动视觉强化 | 首版已完成 | 已新增 `scroll-flow-field` 和最多 5 个大幅 Scene 切片，让画面中能直接看到“整条世界线经过镜头”的滑动关系；仍不接真实素材、不新增业务事实。 |
| WP-27 全屏滚动幕布层 | 已冻结为历史参考 | 已新增 `scroll-curtain-field`，但根据最新纠偏报告不再继续强化页面式幕布、flow、continuum 和相邻 Scene 露边方向。 |
| WP-28R 空间连续性纠偏 | 首轮已落地 | 已把新空间合同写入 `AGENTS.md`，禁止 `scrollY -> Beat` 映射；滚轮改为阈值式离散上一/下一 Beat；新增 `docs/spatial-reset-audit.md`。 |
| WP-29R 空间合同重置 | 首版已完成 | 已新增 `docs/spatial-motion-bible.md` 与 `docs/actor-identity-v3.md`，把 ChatGPT 纠偏报告中的空间路线、演员身份、入退场、CameraPose、SpatialPose、BeatKind 和属性所有权写成推进合同。 |
| WP-30R 空间舞台灰盒 | 首版已完成 | 已新增 `SpatialStage` / `WorldCamera` 灰盒，并从 `VisualStage` 解除 `ScrollNarrativeLayer` 页面链挂载；旧页面链层保留为源码参考，不再作为观众主舞台结构。 |
| WP-31R 空间 Pose 与 Runtime 收口 | 首版已完成 | 已新增 `spatial-poses.ts`，把 RoutePhase、CameraPose、SpatialPose、BeatMovementKind 抽成类型化数据；持久演员补 `data-spatial-pose-id`；`ContinuityMotionRuntime` 不再操作旧页面链 selector。 |
| WP-32R 空间 Pose 应用首版 | 首版已完成 | 已根据 `Codex纠偏与连续空间重构报告_V1.md` 进一步更新 `AGENTS.md`；持久演员开始把 `SpatialPose` 输出为 CSS 变量、空间功能和遮挡属性；命令验证与 1366/1920 浏览器复验已通过。 |
| WP-33R Gate 2 三段关键转场灰盒 | 首版已完成 | 已新增 `spatialTransitionCues`、Beat 级 camera pose 和 `SpatialTransitionGraybox`，把 `09.1`、`16.1`、`21.1` 明确为横向转弯、Z 轴穿越和后拉揭示；命令验证与 1366/1920 浏览器复验已通过。 |
| WP-34R Gate 2 可中断连续运动 | 首版已完成 | 已让 `ContinuityMotionRuntime` 识别 Gate 2 转场，并只写 `.spatial-transition-graybox` 专用 `--gate2-*` 变量；`WorldCamera` 仍是 camera pose 唯一 owner；命令验证、键盘前进/后退/快速输入和 reduced-motion 浏览器复验已通过。 |
| WP-35R Gate 2 人工验收材料包 | 首版已完成 | 已新增 `docs/gate2-human-review-package.md`，包含无剪辑录屏脚本、截图清单、通过/不通过标准、验收后决策和素材 gate 边界；命令验证已通过。 |
| WP-36R Gate 2 验收辅助命令 | 首版已完成 | 已新增 `npm run review:gate2` 与中文验收清单生成器，帮助复制截图 URL、核对三段转场合同和素材 gate；本轮不自动截图、不录屏、不替代人工验收；命令验证已通过。 |
| WP-37R Gate 2 证据台账 | 首版已完成 | 已新增 `docs/gate2-evidence-ledger.md`，把 `AGENTS.md` 的 Gate 2 要求逐项映射到证据、人工动作和验收后工作包选择；本轮不跨过 Gate 2；命令验证已通过。 |
| WP-37R-B Gate 2 决策记录模板 | 首版已完成 | 已新增 `docs/gate2-review-decision-record.md`，默认状态为 `PENDING_HUMAN_REVIEW`，用于人工填写 `PASS` / `SMALL_FIX` / `FAIL`；本轮不把 Gate 2 视为已通过；命令验证已通过。 |
| WP-38 候选灰盒规格 | 首版已完成 | 已新增 `docs/wp38-candidate-graybox-specs.md`，只定义 Gate 2 通过后的两个候选包：`WP-38R-A` 纵向连续灰盒或 `WP-38R-B` 横向产品段灰盒；当前不启动实现；命令验证已通过。 |
| WP-39 Gate 状态命令 | 首版已完成 | 已新增 `npm run status:gates`，用于只读输出 Gate 2、WP-38 和素材 gate 当前状态；当前显示 Gate 2 pending、WP-38 blocked、素材 gate closed；命令验证已通过。 |
| WP-40 WP-38 启动守门命令 | 首版已完成 | 已新增 `npm run guard:wp38`，当前会因 Gate 2 未 `PASS` 而阻断 WP-38；这是预期状态，不代表工程失败；命令验证已通过。 |
| WP-41 素材占位审计命令 | 首版已完成 | 已新增 `npm run audit:materials`，用于只读检查产品、CTA、二维码、业务事实和素材动画 gate 是否仍保持 placeholder / blocked；当前审计结果为 PASS；命令验证已通过。 |
| WP-42 Gate 2 人工验收预检命令 | 首版已完成 | 已新增 `npm run preflight:gate2`，用于汇总 Gate 2 pending、WP-38 blocked、素材 placeholder/block 状态；当前结果为 `READY_FOR_HUMAN_REVIEW`；命令验证已通过。 |
| WP-43 Gate 2 Review Kit 总入口 | 首版已完成 | 已新增 `npm run review:gate2:kit`，用于输出预检、命令序列、证据文件名和中文验收清单；不批准 Gate 2、不启动 WP-38；命令验证已通过。 |
| WP-44 Gate 2 证据目录脚手架 | 首版已完成 | 已新增 `npm run review:gate2:scaffold` 与 `review/gate2/` 证据目录 README，用于承接人工命令日志、截图和无剪辑录屏；不生成假素材、不批准 Gate 2、不启动 WP-38；命令验证已通过。 |
| WP-45 Gate 2 命令日志采集 | 首版已完成 | 已新增 `npm run review:gate2:logs`，把 preflight、中文验收清单、素材审计和 gate 状态写入 `review/gate2/command-logs/*.txt`；不截图、不录屏、不批准 Gate 2、不启动 WP-38；命令验证已通过。 |
| WP-46 Gate 2 证据完整性检查 | 首版已完成 | 已新增 `npm run review:gate2:evidence`，当前报告 `INCOMPLETE_HUMAN_EVIDENCE`：命令日志 4/4，录屏 0/4，截图 0/9，决策 0/1；不批准 Gate 2、不启动 WP-38。 |
| WP-47 Gate 2 人工证据清单 | 首版已完成 | 已新增 `npm run review:gate2:checklist`，生成 `review/gate2/human-evidence-checklist.md`，把 9 张截图、4 段无剪辑录屏、命令日志和决策记录整理成可打勾清单；不捕获证据、不批准 Gate 2。 |

## 已完成交付

- 项目合同进入 `AGENTS.md`。
- 设计总版、素材清单和内容状态进入稳定 `docs/` 路径。
- 最小 Next.js/TypeScript 工程可以 lint、typecheck、test、build。
- README 和本状态文档清楚说明：项目尚未实现正式演示。
- 21 个 Scene 和 144 个 Beat 已进入类型安全数据。
- 每个 Beat 已具备稳定 ID、所属 Scene、讲师 cue、屏幕文案、目标状态 ID 和 reduced-motion 目标状态 ID。
- Resolver 已能从任意 Beat ID 得到确定目标状态，并在观众输出前过滤 `DO_NOT_USE` 文案。
- Q&A 六问保持为 Scene 21 子模式数据，CTA 保持 placeholder，不生成随机二维码。
- 占位演示播放器已可前进、后退、跨 Scene 跳转、重置、显示备注、切换 reduced motion、进入/退出 Q&A。
- URL hash 与 localStorage 已用于刷新恢复当前 Beat、备注、reduced motion 和 Q&A 状态。
- 已新增 `docs/missing-materials.md`，列出正式视觉与最终发布前需要补充的素材。
- 已建立 `VisualStage`、`BackgroundSystem`、`TypographySystem`、`IntegrationRing`、`StructuralUI`。
- `01.2`、`09.2`、`16.3`、`21.8` 已有统一品牌气质的静态构图。
- `01.1`、`01.2`、`01.3`、`02.1—02.4`、`03.5`、`04.7`、`05.1` 已形成 WP-05A 高风险原型状态。
- 同一个 `IntegrationRing` 组件承担入口环、时间轨道、经营圆盘角色，不新建第二套全局圆环。
- 文字墙、AI 时间轨道、双路径与经营圆盘均为代码生成，不依赖外部图片或 WebGL。
- 已建立注册产品占位 `shower-h1-placeholder`，同一产品 ID 贯穿 `08.7`、`09.2`、`10.4`、`11.6`。
- 产品舞台已具备稳定锚点：`productCenter`、`valveCore`、`railMid`、`nozzleDetail`。
- `SourcePacket`、事实卡和 `BenefitMaster` 已有静态转译关系；所有产品事实和卖点仍保持 `PLACEHOLDER`，没有伪装成已审核内容。
- 已建立 `HumanReviewNode` 与 `ActionConfirmGate` 两个独立静态节点，内容审核不会自动变成执行授权。
- 已建立 `ScenarioRadar`、`ActionPath`、`Milestone` 与最终 `QRDock` 占位结构。
- CTA 仍为 `PLACEHOLDER`，没有生成随机二维码、短链或报名编号。
- 已新增 `docs/visual-qa.md`，记录 WP-06 浏览器视觉验收范围、结果、修复和剩余风险。
- 已修复运行时 hash 深链接切换，验收时可直接打开指定 Beat。
- 已新增 `docs/animation-plan.md`，明确首批动画合同、素材阻断门槛和下一步 runtime 范围。
- 已新增 `docs/reference-sites-analysis.md`，明确参考站不是用来复制视觉，而是提炼“固定舞台、持续对象、长时间线、产品/路径连续”的叙事机制。
- 已新增 `src/presentation/motion/` 合同数据，登记动画目标、素材 gate 和 runtime 白名单。
- 已接入 `StageMotionRuntime`，只在 `.visual-stage` 内执行 GSAP，并在切 Beat、刷新或卸载时清理动画上下文。
- `01.1`、`03.5`、`05.1`、`18.7`、`20.10` 已具备首批代码对象 runtime 动画。
- 已新增 `StorySpine`，把 21 Scene / 144 Beat 显示为同一条连续路线。
- 已新增 `ContinuityMotionRuntime`，用 Beat 前进/后退方向驱动全局分层过渡，让舞台更接近参考站的长卷式连续视觉体验，但不把 presenter mode 改成浏览器滚动驱动。
- 已新增 `CinematicRouteLayer`，把四条重点路径显示成中景路线图、当前路线锚点和四个叙事片段，让页面不再只依赖大标题切换。
- `ContinuityMotionRuntime` 已扩展到路线层：路径线、路线锚点和片段卡会随 Beat 进入，但仍只使用 transform、opacity 和 SVG stroke offset。
- 已新增 `ScrollNarrativeLayer`，把 21 幕变成一条大幅斜向长卷轨道，当前 Scene 会经过固定镜头窗口，画面更接近参考站的“长页面推进”观感。
- `ContinuityMotionRuntime` 已改为用 CSS 变量叠加长卷位移，避免覆盖绝对轨道位置；切 Beat 时轨道推进、镜头窗口进入、活动 Scene 面板抬出。
- WP-12 已提升长卷层的视觉权重：`scroll-narrative-layer` 提升到主视觉层级，新增红色取景框、`SCENE / 进度` 读数、8 条深度刻度，并放大当前 Scene 面板。
- WP-13 已新增 `scroll-film-strip`：当前 Scene 与前后 Scene 会作为同一条胶片出现，当前卡片放大，切 Beat 时胶片条按方向推进。
- WP-14 已新增 `scroll-viewport-stack`：上一幕从上方露出，当前幕占据主画面，下一幕从下方露出，视觉上更接近连续滚动网页。
- WP-15 已把滚动叙事层提升到 `z-index=9`，新增 `scroll-stage-focus-field` 与 `scroll-stack-rail`，并把巨型 `visual-copy` 降为辅助提示层，让纵向页面堆栈成为第一眼主视觉，而不是背景装饰。
- WP-16 已新增 `ContinuityObjectLayer`：产品路径使用同一个产品骨架、资料轨和卖点轨，行动路径使用同一条路径曲线、场景卡、里程碑和 CTA 占位状态。
- WP-17 已新增 `director-focus-plane` 与 `director-focus-frame`：产品路径和行动路径会出现聚焦遮罩与取景框，背景滚动栈、胶片条、路线 HUD 在这些 Beat 中主动退后。
- WP-17 已扩展 `ContinuityMotionRuntime`：导演聚焦层、聚焦框和行动路径线会随 Beat 方向短促进入；reduced motion 下直接保持稳定状态，不新增循环动画。
- WP-18 已新增 `scroll-cinema-corridor`：当前 Scene 变成接近整屏高度的主滚动卡，上下相邻 Scene 作为连续页面露出，旧的 story window、viewport stack、route map、film strip 降为背景，不再互相抢内容。
- WP-18 已新增滚轮/触控板推进：纵向滚动被节流映射为上一 Beat / 下一 Beat，仍保留讲师控制、hash 恢复和左右键兼容，但主操作心智从左右翻页改为上下推进。
- 已新增 `docs/stage-theater-rearchitecture.md`，明确当前问题是舞台方法错误，不是继续叠动画；后续先按演员、生命周期、进退场重构。
- 已新增 `docs/stage-actor-ownership-matrix.md`，用中文列出必须归并的一模一样组件、五幕演员安排、逐段进出场和继续实现前需要人工确认的问题。
- WP-19R 已扩展 `stage-actors.ts`：补齐判断问题、四本账圆盘、安全边界和讲师控件等演员身份，并记录产品与行动路径的重复来源。
- WP-19R 已新增 `stage-script.ts`：把 144 个 Beat 映射到五幕、主角、support/background/control/offstage 角色和 actor lifecycle。
- WP-19R 已新增回归测试，确保接入环、产品、行动路径、CTA 等连续对象不会在连续区间内重复入场。
- WP-20R 已新增 `PersistentActorLayer`：`ProductStage` 只在持久演员层里渲染，不再散落在 `product`、`technical-facts`、`safety`、`scenario-radar`、`action-path`、`cta-dock`、`finale` 等分支里。
- WP-20R 已把 `ActionPath` 的路线 SVG、已选场景和里程碑迁入持久演员层，旧 `ActionPath` 分支只保留范围提示和 compact CTA。
- WP-20R 已把 `IntegrationRing` 迁入持久演员层，继续保留 `.integration-geometry` / `.ring-wrap` / `.integration-ring` 选择器，降低对现有样式和动画的破坏。
- WP-20R 已给 `PresentationShell` 增加只读诊断属性 `data-current-beat-id` / `data-hydrated`，并修复原生 scroll 初始同步覆盖 hash 跳转的风险。
- WP-20R 已把 presentation storage 读写改成容错函数；即使浏览器禁用 localStorage，也不会阻断客户端 hydration 和 hash 跳转。
- WP-21R-A/B 已给 `VisualStage` 增加 `data-stage-mode="stage-play-v2"`、`data-stage-act` 和 `data-lead-actor`，让画面知道当前五幕和当前主角。
- WP-21R-A/B 已把滚动剧场层改成单一主镜头：`scroll-cinema-corridor` 保持可见，胶片条、路线图、故事脊柱、连续注释层等重复系统在舞台模式下隐藏，避免同屏多套路径抢戏。
- WP-21R-A/B 已把 `PersistentActorLayer` 提到前景：`20.10` 行动路径为 lead、产品为 support、接入环为 background；`09.2` 产品为 lead；`21.8` CTA 为 lead、产品继续 support。
- WP-21R-A/B 已降低大字 PPT 感：主标题文案退为辅助提示，背景场景大字继续保留连续滚动感但不再作为主信息层。
- WP-21R-C 已新增 `SafetyActors`，把 `HumanReviewNode`、`ActionConfirmGate`、`CtaDock` 从 `VisualStage` 私有分支抽出，作为可复用舞台演员。
- WP-21R-C 已把审核节点、负责人确认门和 CTA dock 迁入 `PersistentActorLayer`，带有 `data-stage-actor-id`、`data-actor-role` 和 `data-lifecycle-phase`。
- WP-21R-C 已把负责人确认门生命周期延长到 `19.8`，使其在场景诊断阶段继续作为行动前置条件保持，而不是 `18.8` 后突然消失。
- WP-21R-C 已清理旧 frame 分支里的重复身体：`ApprovalGate`、`BoundaryLoop`、`ScenarioRadar`、`ActionPath` 不再额外渲染审核节点、负责人确认门或 CTA dock。
- WP-21R-D 已新增 `OpeningActors`，把判断问题、分岔选择和四本账圆盘从 `VisualStage` 私有分支抽成可复用舞台演员。
- WP-21R-D 已把 `actor.judgement-question` 与 `actor.ledger-dial` 迁入 `PersistentActorLayer`，使用 `stage-script` 的 `enter` / `hold` / `exit` 生命周期。
- WP-21R-D 已清理旧 frame 分支里的重复身体：`question-core` 不再渲染，`path-dial` 不再提前渲染 compact 圆盘，`ledger` 分支不再单独渲染第二个 `LedgerDial`。
- WP-22 已把 `scroll-continuum-shell` 恢复为观众可见主视觉层，长卷 section 使用约一屏高度，当前 Scene 占满舞台，前后 Scene 作为连续上下文露出。
- WP-22 已把 `scroll-cinema-corridor` 降为景深辅助层，避免主画面继续像一张半透明卡片。
- WP-22 已修复深链接打开后 `stateSource="jump"` 不释放导致原生滚动无法继续推进 Beat 的问题。
- WP-23 已给每个长卷 panel 增加 `data-continuum-offset` 和 `data-continuum-near`，只让当前页与相邻页可见，远处页面不再误露出。
- WP-23 已把 stage-play 下的长卷布局改为绝对定位：当前页约占主屏，上下相邻页各露出一段，人工观看时能直接感知连续滚动页面。
- WP-24 已新增 `MiddleActors`：`SourcePacketActor`、`FactBenefitActor`、`OutputCardsActor`、`SafetyBoundaryActor`、`ScenarioRadarActor` 复用既有占位数据和选择器，不新增真实素材或业务事实。
- WP-24 已把资料包、参数转译链、输出卡片、安全边界和场景雷达迁入 `PersistentActorLayer`，并带上 `data-stage-actor-id`、`data-actor-role`、`data-lifecycle-phase`。
- WP-24 已清理旧 frame 分支里的中段重复身体：`TechnicalFacts`、`BenefitTranslation`、`OutputFreeze`、`ApprovalGate`、`BoundaryLoop`、`ScenarioRadar`、`SourcePacketMini`、`OutputCardStack` 不再由 `VisualStage` 私有渲染。
- WP-24 已为 stage-play 模式补充中段演员位置和主次样式，产品、资料、输出、安全和雷达可以作为同一舞台组合持续存在。
- WP-25 已把 `VisualStage` 的观众主舞台收口为：`ScrollNarrativeLayer` 负责唯一连续滚动世界，`PersistentActorLayer` 负责唯一演员身体，`FrameCopy` 只做低优先级字幕提示。
- WP-25 已让 `StorySpine`、`CinematicRouteLayer`、`ContinuityObjectLayer` 退出主舞台挂载；这些源码暂时保留为历史参考，但不再成为观众可见叠层。
- WP-25 已更新回归测试口径：旧路线/对象层不再是“必须挂载”，而是“不能重新叠回主舞台”；连续运动 runtime 已把 `persistent-actor-layer` 纳入清理和过渡范围。
- WP-26 已在 `ScrollNarrativeLayer` 中新增 `scroll-flow-field`：用当前 Scene、上下文 Scene、斜切大面板、红色流线和纵向 spine 强化连续滚动感；中段最多 5 个切片，开头/结尾边界按实际 Scene 数减少。
- WP-26 已让 `scroll-flow-field` 读取 `--free-scroll-offset` / `--free-scroll-progress`，滚轮推进时切片会在镜头中明显滑过；键盘/按钮切 Beat 时也由 `ContinuityMotionRuntime` 统一过渡和清理。
- WP-26 仍只使用 DOM/SVG/CSS/GSAP；没有接入真实产品素材、二维码、Three.js、WebGL、Framer Motion 或未授权业务事实。
- WP-27 已新增 `scroll-curtain-field`：上一幕、当前幕、下一幕用 `100dvh` 全屏幕布呈现，滚动时像页面整屏经过固定镜头。
- WP-27 已把 `scroll-continuum-shell` 从强主视觉降为辅助读数层，避免观众只看到一张居中的大卡片。
- WP-27 已将幕布层纳入 `ContinuityMotionRuntime` 的 GSAP 作用域和清理逻辑，键盘/按钮切 Beat 与滚轮推进都使用同一套可中断过渡。
- WP-28R 已根据 `Codex纠偏与连续空间重构报告_V1.md` 更新 `AGENTS.md`：Presenter Mode 重新确认为主模式，禁止 `scrollY`、scroll timeline 或 IntersectionObserver 映射 144 Beat。
- WP-28R 已把滚轮/触控板纠偏为离散 cue 输入：达到阈值后只触发一次 `nextBeat` / `previousBeat`，不再根据页面滚动位置选择 Beat。
- WP-28R 已移除 144 个 `.native-scroll-beat` 空滚动 section 和对应 CSS，停止把 Beat 表达为可滚动页面节点。
- WP-28R 已新增 `docs/spatial-reset-audit.md`，记录页面式连续层进入 legacy/reference 状态，后续应转向 `SpatialStage`、`WorldCamera`、`CameraPose`、`SpatialPose` 和 `ArtifactSystem`。
- WP-29R 已新增 `docs/spatial-motion-bible.md`：明确一个世界坐标系、一个主镜头、三次重大空间转场、`stable` / `actor` / `spatial` Beat movement kind、CameraPose、SpatialPose、属性所有权和 reduced motion 降级规则。
- WP-29R 已新增 `docs/actor-identity-v3.md`：明确最终演员清单、IntegrationRing 角色表、ProductStage 持续规则、ArtifactSystem 收敛计划和 WP-30R 页面链裁剪口径。
- WP-29R 已更新 `AGENTS.md`：要求后续新空间运动实现前，先以 `docs/spatial-motion-bible.md` 与 `docs/actor-identity-v3.md` 为合同。
- WP-30R 已新增 `src/presentation/stage/SpatialStage.tsx`，用 `SpatialStage` / `WorldCamera` 灰盒表达一个世界坐标系、一条宏观路线和绝对 camera pose。
- WP-30R 已把 `VisualStage` 中的 `ScrollNarrativeLayer` 挂载替换为 `SpatialStage`；`ScrollNarrativeLayer`、`scroll-continuum-shell`、`scroll-flow-field`、`scroll-curtain-field` 只保留为 legacy/reference 源码。
- WP-30R 已新增 `docs/spatial-stage-graybox.md` 和 `tests/wp30r-spatial-stage.test.ts`，把“页面链源码保留但不挂主舞台”的口径写入验证。
- WP-31R 已新增 `src/presentation/stage/spatial-poses.ts`，作为 RoutePhase、CameraPose、SpatialPose、BeatMovementKind 和三次 spatial Beat 的单一代码来源。
- WP-31R 已让 `SpatialStage` 改为读取 pose 数据，而不是在组件内写空间判断。
- WP-31R 已让 `PersistentActorLayer` 给持久演员输出 `data-spatial-pose-id`，为后续“同一演员换 pose”浏览器验收做准备。
- WP-31R 已清理 `ContinuityMotionRuntime`：runtime 不再操作 `scroll-narrative-layer`、`scroll-continuum-shell`、`scroll-flow-field`、`scroll-curtain-field`、`story-spine`、`cinematic-route-layer` 或 `continuity-object-layer`。

## 当前仍不做

- 不实现真实素材 reveal、真实二维码动画或未授权业务输出动画。
- 不接入 Three.js 或 WebGL。
- 不接入 Framer Motion 或滚动驱动动画。
- 不推进真实交互表单。
- 不接入真实二维码或报名表单。
- 不替换正式产品素材；当前产品仍是中性代码占位。
- 不播放 `09.2`、`16.3`、`21.8` 的素材型正式动画，因为它们仍被产品素材或 CTA gate 阻断。
- 不补全 MOQ、价格、质保、认证、名额、日期等业务事实。
- 不继续强化 WP-22 / WP-23 / WP-26 / WP-27 的页面式连续层作为最终架构。
- 不使用 `scrollY`、scroll timeline 或滚动位置恢复来决定当前 Beat。

## 待业务方确认

- 正式花洒产品型号和可公开展示权限。
- 产品事实、规格、材质、认证、质保、MOQ、价格边界、交期。
- 正式产品图片、拆件、遮罩、阴影和多灯光版本。
- 正式 CTA、短链、二维码、主办方、讲师、日期和隐私信息。
- 详细清单见 `docs/missing-materials.md`。

## 最新验收结果

已通过：

- `npm run lint` 通过。
- `npm run typecheck` 通过。
- `npm run test` 通过，102 tests，覆盖 WP-01 到 WP-37R-B 相关回归。
- 浏览器复验通过：`20.10` hydration 后显示 `SpatialStage` / `WorldCamera` 各 1 个，旧页面链层 `.scroll-narrative-layer`、`.scroll-continuum-shell`、`.scroll-flow-field`、`.scroll-curtain-field` 均为 0，产品和 CTA 继续保持 placeholder。
- 浏览器复验通过：`09.1`、`16.1`、`21.1` 均标记为 `data-beat-movement-kind="spatial"`，camera pose 分别为 `camera.horizontal-product`、`camera.z-forward-safety`、`camera.z-back-finale`。
- 浏览器复验通过：WP-31R 后 `20.10` 的可见持久演员均带 `data-spatial-pose-id`，包括接入环、产品、安全边界、行动路径和 CTA dock；旧页面链层仍为 0，产品和 CTA 继续保持 placeholder。
- 浏览器复验通过：WP-32R 后 `1366 x 768` 的 `20.10` 可见演员均带 `data-spatial-pose-id`，并且计算样式中已有 `--spatial-pose-x/y/z/scale` 与 wrapper `matrix3d(...)` transform；旧页面链层仍为 0，产品和 CTA 继续保持 placeholder。
- 浏览器复验通过：WP-32R 后 `1366 x 768` 的 `09.1`、`16.1`、`21.1` 均为 `data-beat-movement-kind="spatial"`，camera pose 分别为 `camera.horizontal-product`、`camera.z-forward-safety`、`camera.z-back-finale`，旧页面链挂载总数为 0。
- 浏览器复验通过：WP-32R 后 `1920 x 1080` 的 `20.10`、`09.1`、`16.1`、`21.1` 均保持同一套 `SpatialStage` / `WorldCamera` / `PersistentActorLayer` 合同；旧页面链层为 0，产品和 CTA 未越过素材 gate。
- 浏览器复验通过：WP-33R 后 `1366 x 768` 与 `1920 x 1080` 的 `09.1` 输出 `turn-horizontal-product` 与 `camera.turn-horizontal-product`，`16.1` 输出 `portal-forward-safety` 与 `camera.portal-forward-safety`，`21.1` 输出 `dolly-back-finale` 与 `camera.dolly-back-finale`。
- 浏览器复验通过：WP-33R 三段转场均在 `SpatialStage` 内渲染 1 个 axis、1 个 portal、1 个 reveal 灰盒标记；旧页面链挂载总数仍为 0，产品/CTA 没有越过素材 gate。
- 浏览器复验通过：WP-34R 后 `1366 x 768` 与 `1920 x 1080` 均通过键盘前进/后退穿过 `09.1`、`16.1`、`21.1`；runtime marker 正确输出三段转场 kind。
- 浏览器复验通过：WP-34R 快速 `20.10 -> 21.1 -> 20.10 -> 21.1` 后，Gate 2 变量回到稳定终态：`--gate2-motion-x/y=0px`，`--gate2-motion-opacity=1`，`--gate2-axis/portal/reveal-progress=1`。
- 浏览器复验通过：WP-34R reduced motion 通过真实 presenter control 开启后，`16.1` 的 `data-reduced-motion="true"`、`data-continuity-reduced="true"`，Gate 2 变量直接为终态；旧页面链挂载仍为 0。
- 文档验收通过：WP-35R 已新增 Gate 2 人工验收材料包，包含四段无剪辑录屏脚本、1366/1920 截图清单、通过/不通过标准、验收后决策，以及产品/CTA/业务事实素材 gate 边界。
- 脚本验收通过：WP-36R 已新增 `npm run review:gate2`，可输出 Gate 2 中文验收清单，内容覆盖三段转场合同、截图 URL、录屏脚本、运行时检查和素材 gate。
- 文档验收通过：WP-37R 已新增 Gate 2 证据台账，用于记录 `1366 x 768` / `1920 x 1080` 证据、前进/后退、快速输入、Reduced Motion、DOM 层、演员身份、命令结果、风险和下一工作包。
- 文档验收通过：WP-37R-B 已新增 Gate 2 决策记录模板，默认 `PENDING_HUMAN_REVIEW`，并限制 Gate 2 通过后的下一工作包只能二选一。
- 文档验收通过：WP-38 候选灰盒规格已新增，明确只有 Gate 2 `PASS` 后才能二选一启动 `WP-38R-A` 或 `WP-38R-B`。
- 脚本验收通过：WP-39 已新增 `npm run status:gates`，当前输出 Gate 2 `PENDING_HUMAN_REVIEW`、WP-38 `BLOCKED`、素材 gate `CLOSED`。
- 脚本验收通过：WP-40 已新增 `npm run guard:wp38`；测试确认它当前会阻断 WP-38，且只有 Gate 2 `PASS` 时允许继续。
- 脚本验收通过：WP-41 已新增 `npm run audit:materials`，当前确认产品、CTA、二维码、业务事实和素材动画 gate 仍保持 placeholder / blocked。
- 脚本验收通过：WP-42 已新增 `npm run preflight:gate2`，当前结果为 `READY_FOR_HUMAN_REVIEW`，但不代表 Gate 2 已通过或 WP-38 可启动。
- 脚本验收通过：WP-43 已新增 `npm run review:gate2:kit`，可输出人工验收当天所需的命令序列、证据文件名、当前 preflight 和中文验收清单。
- 脚本验收通过：WP-44 已新增 `npm run review:gate2:scaffold`，并落地 `review/gate2/` 证据目录 README；当前没有生成任何假截图、假录屏或真实素材。
- 脚本验收通过：WP-45 已新增 `npm run review:gate2:logs`，并生成 `preflight-gate2.txt`、`review-gate2.txt`、`audit-materials.txt`、`status-gates.txt` 四个文本日志；截图和录屏仍需人工补充。
- 脚本验收通过：WP-46 已新增 `npm run review:gate2:evidence`，当前状态为 `INCOMPLETE_HUMAN_EVIDENCE`，明确剩余缺口是 4 段录屏、9 张截图和人工决策记录。
- 脚本验收通过：WP-47 已新增 `npm run review:gate2:checklist`，生成 `review/gate2/human-evidence-checklist.md`，可直接用于人工采集 Gate 2 截图、录屏和决策。
- `npm run lint` 通过。
- `npm run typecheck` 通过。
- `npm run test` 通过，144 tests。
- `npm run build` 通过。
- 单元验收通过：`01.1` 的主角是判断问题，`05.1` 是四本账圆盘，`08.7 -> 15.8` 是产品主体，`16.1 -> 18.9` 是安全边界，`19.1 -> 19.8` 是场景诊断雷达，`19.9 -> 21.6` 是行动路径，`21.7` 后是 CTA dock。
- 单元验收通过：所有登记演员都只有一次 `enter` 和一次 `exit`，中间连续 Beat 只允许 `hold`。
- 单元验收通过：`VisualStage` 不再直接导入或渲染 `ProductStage` / `IntegrationRing`；接入环、产品主体和行动路径主体由 `PersistentActorLayer` 统一渲染。
- 单元验收通过：`actor.source-packet`、`actor.fact-to-benefit`、`actor.output-cards`、`actor.safety-boundary`、`actor.scenario-radar` 已由 `PersistentActorLayer` 统一渲染；旧 `VisualStage` 分支不再保留第二套 SourcePacket、OutputCardStack、安全边界或 ScenarioRadar 主身体。
- 浏览器复验通过：使用 `http://localhost:3000/?verify=wp20r-action#scene-20/20.10`，页面 `data-hydrated="true"`、`data-current-beat-id="20.10"`、`data-frame-kind="action-path"`，持久演员层包含 `actor.integration-ring`、`actor.product-stage`、`actor.action-path`，且 CTA 仍为 `PLACEHOLDER`。
- 浏览器复验通过：使用 `http://localhost:3000/?verify=stage-play-v2#scene-20/20.10`，页面 `data-stage-mode="stage-play-v2"`、`data-lead-actor="actor.action-path"`；滚动主镜头可见，旧路线层/故事脊柱/连续注释层隐藏，持久演员层位于前景。
- 浏览器复验通过：`09.2` 为产品 lead，`21.8` 为 CTA lead、产品 support；滚轮/触控板从 `20.10` 推进到 `21.1`，说明当前不再只依赖左右键换页。
- 浏览器复验通过：在 `1366 x 768` 与 `1920 x 1080` 下，舞台模式均保留连续滚动主镜头和前景演员层，没有恢复多套路线同屏叠加。
- 浏览器复验通过：`18.7` 中 `actor.human-review` 与 `actor.action-confirm-gate` 入场；`19.7` 中两者继续 hold，`actor.cta-dock` 以 compact support 形态保持；`21.8` 中 CTA 为 lead 且状态仍为 `PLACEHOLDER`。
- 浏览器复验通过：`18.7`、`19.7`、`21.8` 的旧 frame 分支重复计数均为 0，没有第二套审核、确认或 CTA 身体。
- 浏览器复验通过：`01.1` 和 `03.5` 只有一个 `actor.judgement-question`，生命周期分别为 `enter` / `hold`；旧 `.question-core` 计数为 0。
- 浏览器复验通过：`05.1` 和 `08.6` 只有一个 `actor.ledger-dial`，生命周期分别为 `enter` / `exit`；旧 `.visual-stage > .ledger-dial` 和 `.path-dial-ghost` 计数均为 0。
- 浏览器复验通过：WP-25 后 `20.10` 的 `StorySpine`、`CinematicRouteLayer`、`ContinuityObjectLayer`、`StructuralUI` 主舞台挂载计数为 `0`；`ScrollNarrativeLayer` 和 `PersistentActorLayer` 继续可见。
- 浏览器复验通过：`10.4`、`15.8`、`18.7`、`19.7` 均只有 3 个长卷 panel 可见，当前页约 `592px`，上下相邻页各约 `69px`；历史重复层和旧 frame 主身体计数均为 `0`。
- 浏览器复验通过：`20.10` 滚轮推进后进入 `21.1`，旧历史层挂载计数仍为 `0`，连续滚动输入没有恢复多层叠屏。
- 浏览器复验通过：`1920 x 1080` 下 `09.2` 当前页约 `888px`，上下相邻页各约 `98px`；产品仍为 `shower-h1-placeholder`，没有接入或伪装真实产品素材。
- 浏览器复验通过：WP-26 后 `1366 x 768` 下 `20.10` 有 1 个 `scroll-flow-field` 和 4 个边界切片，active 切片约 `1814 x 614`，滚轮推进到 `21.1` 后 active 切片 transform 明显变化。
- 浏览器复验通过：WP-26 后 `1920 x 1080` 下 `09.2` 有 1 个 `scroll-flow-field` 和 5 个切片，active 切片约 `2550 x 863`，产品仍为 `shower-h1-placeholder`。
- 浏览器复验通过：WP-26 reduced motion 切换后 `data-reduced-motion="true"`、`data-continuity-reduced="true"`，flow 层保留静态可见状态，旧历史层挂载计数仍为 `0`。
- 浏览器复验通过：`1366 x 768` 下 `20.10` 的 `scroll-continuum-shell` 可见、opacity `0.96`、active section 可见面积约 `75%`，旧路线层与旧 viewport stack 仍隐藏，讲师 HUD 保持折叠。
- 浏览器复验通过：从 `20.10` 深链接进入后滚轮推进到 `21.3`，说明原生滚动不再被初始 jump 状态卡住。
- 浏览器复验通过：`1920 x 1080` 下 `09.2` 的 active section 可见面积约 `75%`，产品仍是 `shower-h1-placeholder` 占位，没有替换或伪装真实素材。
- 浏览器复验通过：`1366 x 768` 下 `20.10` 当前页可见高度约 `631px`，上一幕 `19` 和下一幕 `21` 各露出约 `73px`，远处页面可见计数为 `0`。
- 浏览器复验通过：`20.10` 滚动后进入 `21.3`，上一幕 `20` 仍在顶部露出约 `97px`，终幕无下一幕是预期边界状态。
- 浏览器复验通过：`1920 x 1080` 下 `09.2` 当前页可见高度约 `888px`，上一幕 `08` 和下一幕 `10` 各露出约 `98px`，产品仍为 `shower-h1-placeholder`。
- 复验备注：`127.0.0.1:3000` 会触发 Next dev 的开发资源跨源限制，人工验收请使用 `localhost:3000`。
- 浏览器验收通过：在 `1366 x 768` 与 `1920 x 1080` 下，`01.1`、`03.5`、`05.1`、`18.7`、`20.10` 的 runtime 标记为启用。
- 浏览器验收通过：`09.2`、`16.3`、`21.8` 的 runtime 标记为禁用，继续等待素材 gate。
- 浏览器验收通过：`20.10` reduced-motion 切换后保持当前 Beat，并进入降级状态；Scene 21 Q&A 不启用 `21.8` CTA 动画。
- 浏览器验收通过：StorySpine 在 `1366 x 768` 与 `1920 x 1080` 可见，包含 21 个 Scene 节点；`01.1 -> 01.2` 正常动画模式下显示 `forward` 方向；`21.9 -> 21.8` 显示 `backward` 方向。
- 浏览器验收通过：`09.2` 仍保留产品占位，`21.8` 仍保留 CTA placeholder，不因连续叙事层伪装成正式素材。
- 浏览器验收通过：WP-10 路线层在 `1366 x 768` 与 `1920 x 1080` 可见，`01.1` 显示 `opening`，`09.2` 显示 `product`，`18.7` 显示 `safety`，`20.10` 和 `21.8` 显示 `finale`。
- 浏览器验收通过：`21.7` 的 CTA dock 仍为 `data-cta-status="PLACEHOLDER"`，`21.8` 的正式 CTA runtime 仍禁用。
- 浏览器验收通过：在 `20.10` 开启 reduced motion 后，路线层仍保留当前路线、锚点和 4 个片段卡，runtime 标记进入 reduced 状态；检查后已切回正常 motion。
- 浏览器验收通过：WP-11 长卷层在 `1366 x 768` 与 `1920 x 1080` 可见，每个检查点都有 21 个 Scene 面板、2 条滚动文字带和固定镜头窗口。
- 浏览器验收通过：`01.1`、`09.2`、`18.7`、`20.10`、`21.8` 的当前 Scene 面板都进入可见区域，没有再被推到画面外。
- 浏览器验收通过：WP-12 在 `1366 x 768` 与 `1920 x 1080` 下显示更强取景框、`SCENE / 进度` 读数、8 条深度刻度，长卷层 `z-index=7` 且当前 Scene 面板可见。
- 浏览器验收通过：WP-13 胶片条在 `1366 x 768` 与 `1920 x 1080` 下可见；`20.10` 显示当前 Scene 卡，`09.2` 显示 5 张胶片卡，`21.7` 在结尾边界显示 3 张胶片卡。
- 浏览器验收通过：reduced motion 下胶片条和当前卡片仍可见；产品与 CTA 素材 gate 仍保持禁用状态。
- 浏览器验收通过：WP-14 纵向页面堆栈在 `1366 x 768` 与 `1920 x 1080` 下可见；`20.10` 同屏显示上一幕、当前幕和下一幕，当前幕占主画面。
- 浏览器验收通过：WP-14 reduced motion 下堆栈和当前卡片仍可见；`09.2` 产品仍为占位，`21.7` CTA 仍为 `PLACEHOLDER`。
- 浏览器验收通过：WP-15 在 `1366 x 768` 下确认 `20.10` 的滚动层为 `z-index=9`、文案层为 `z-index=8`、active viewport card 覆盖约 57% 舞台，并显示 21 个纵向 rail 节点。
- 浏览器验收通过：WP-15 在 `1920 x 1080` 下确认 `20.10` active viewport card 覆盖约 59% 舞台；reduced motion 下堆栈、聚焦光场和 rail 仍可见。
- 浏览器验收通过：WP-15 后 `09.2` 产品仍为 `shower-h1-placeholder`，`21.7` 与 `21.8` CTA 仍为 `PLACEHOLDER`，三处素材 gate 的 `data-motion-enabled` 均保持 `false`。
- 浏览器验收通过：WP-16 在 `1366 x 768` 下确认 `08.7`、`09.2`、`10.4`、`11.6` 都显示 `data-continuity-object="product"`，step 从 `0` 到 `3`，并持续绑定占位产品、事实和卖点轨道。
- 浏览器验收通过：WP-16 在 `1366 x 768` 下确认 `19.7`、`20.10`、`21.7`、`21.8` 都显示 `data-continuity-object="action"`，step 从 `0` 到 `3`，里程碑逐步激活，CTA 仍为 `PLACEHOLDER`。
- 浏览器验收通过：WP-16 在 `1920 x 1080` 下确认产品 continuity object 仍可见；reduced motion 下 `20.10` 仍显示 action continuity object，CTA 仍为 `PLACEHOLDER`。
- 浏览器验收通过：WP-17 在 `1366 x 768` 下确认 `11.6` 显示产品导演聚焦层，`20.10` 显示行动导演聚焦层，背景滚动卡片 opacity 降到 `0.58`，聚焦框可见。
- 浏览器验收通过：WP-17 在 `1920 x 1080` 下确认产品对象、行动路径与聚焦框保持可见；reduced motion 下 `20.10` 保留行动对象和 CTA `PLACEHOLDER`。
- 浏览器验收通过：WP-18 在 `1366 x 768` 下确认 `21.1` 当前滚动剧场卡约 `958 x 662`，旧 story window opacity 为 `0.12`、旧 viewport stack opacity 为 `0.18`，滚轮推进后 hash 从 `20.10` 到 `21.1`。
- 浏览器验收通过：WP-18 在 `1920 x 1080` 下确认 `11.6` 当前滚动剧场卡约 `1264 x 920`，旧 story window opacity 为 `0.12`、旧 viewport stack opacity 为 `0.18`，产品占位对象仍为 `shower-h1-placeholder`。
- `docs/project-status.md` 能让非工程读者看清最终目标、当前进度和下一步。

下一步建议执行 Gate 2 人工验收录制或继续推进录屏自动化辅助；仍不进入最终美术、真实素材、真实二维码或业务事实补全，直到 Gate 2 人工验收通过。
