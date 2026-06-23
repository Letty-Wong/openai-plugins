# WP-32R 空间 Pose 应用首版

## 目标

WP-32R 开始把 WP-31R 的 `SpatialPose` 从诊断数据推进为演员布局目标。

本轮仍是纠偏灰盒，不是最终美术：

- 不接真实产品素材。
- 不接真实二维码。
- 不补业务事实。
- 不做 21 Scene 全量视觉精修。
- 不恢复页面链、幕布、flow、相邻页露边作为主舞台。

## 已落实到 Agent 合同

用户提供的 `Codex纠偏与连续空间重构报告_V1.md` 已进一步写入 `AGENTS.md`：

- 不能靠新增 page stack、curtain、flow field 或另一个 continuity layer 解决 PPT 感。
- 纠偏方向是演员身份、绝对姿态、相机、深度、遮挡和功能变化。
- 先定义演员，再安排场景。
- Scene 是构图、灯光、景深和 cue 语境；Beat 是导演 cue，不是页面。
- `ProductStage` 从 `08.7` 到 Scene 21 必须保持同一演员身份。
- Gate 2 是三个关键灰盒转场：Scene 08 到 09、Scene 15 到 16、Scene 20 到 21。
- Gate 2 通过前，不进入最终字体、纹理精修、真实产品素材或正式 CTA 替换。

## 本轮代码动作

### 1. 持久演员读取 `SpatialPose`

`PersistentActorLayer` 现在为每个可见持久演员输出：

- `data-spatial-pose-id`
- `data-spatial-function`
- `data-spatial-occlusion`
- `data-stage-actor-id`
- `--spatial-pose-x`
- `--spatial-pose-y`
- `--spatial-pose-z`
- `--spatial-pose-scale`
- `--spatial-pose-opacity`

这意味着演员不再只是“知道自己的 pose id”，而是已经把 pose 目标暴露给 CSS 布局层。

### 2. CSS 消费空间姿态

`.persistent-actor` 现在使用 pose 变量生成绝对 transform：

```css
transform:
  translate3d(var(--spatial-pose-x), var(--spatial-pose-y), var(--spatial-pose-z))
  scale(var(--spatial-pose-scale));
```

透明度拆为两层变量：

- `--spatial-pose-opacity`：来自空间姿态。
- `--actor-role-opacity`：来自当前演员角色。

这样可以避免空间 pose 和角色规则抢同一个 `opacity` 属性。

### 3. 遮挡语义进入 DOM

演员 wrapper 现在带有 `data-spatial-occlusion`：

- `background`
- `midground`
- `foreground`
- `control`

CSS 先用它做轻量 z-index 和背景饱和度处理。后续灰盒转场可以继续扩展为更明确的景深和遮挡关系。

## 本轮没有解决什么

- 三个关键转场还没有完成完整灰盒运动。
- `ArtifactSystem` 还未正式归并产品资料、卖点、输出卡片和行动材料。
- 旧 page-chain CSS 仍作为历史参考留在样式文件中。
- 仍需要浏览器和人工视觉验收确认画面是否比旧版少叠层、更像同一舞台。

## 验收结果

命令验证已通过：

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

其中 `npm run test` 为 87 tests 全部通过。

浏览器复验已通过：

- `1366 x 768`：`20.10` 可见演员包含接入环、产品、安全边界、行动路径和 CTA；每个演员都有 `data-spatial-pose-id`，并且 computed style 中已有 `--spatial-pose-x/y/z/scale` 与 `matrix3d(...)` transform。
- `1366 x 768`：`09.1`、`16.1`、`21.1` 均为 `data-beat-movement-kind="spatial"`，camera pose 分别是 `camera.horizontal-product`、`camera.z-forward-safety`、`camera.z-back-finale`。
- `1920 x 1080`：`20.10`、`09.1`、`16.1`、`21.1` 均保持同一空间舞台合同。
- `.scroll-narrative-layer`、`.scroll-continuum-shell`、`.scroll-flow-field`、`.scroll-curtain-field` 在观众主舞台挂载数均为 0。
- 产品仍为 placeholder，CTA 仍为 placeholder，没有越过素材 gate。

## 下一步

完成本轮命令验证和浏览器复验后，下一阶段应推进 Gate 2 的三个关键灰盒转场：

1. Scene 08 到 09：纵向轨道弯入横向产品段。
2. Scene 15 到 16：冻结后沿 Z 轴向前穿过 `IntegrationRing`。
3. Scene 20 到 21：沿 Z 轴向后拉远，揭示完整接入环。
