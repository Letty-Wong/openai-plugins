# Gate A｜V4 舞台层级审查包

## 当前结论

Gate A 的目标是证明 `/spatial-lab` 已经从旧的 PPT 式主舞台中分离出来，并建立真实的连续空间层级：

```text
ScreenViewport
└─ WorldCamera
   └─ WorldSpace
      ├─ PersistentActors
      ├─ ArtifactSystem
      └─ WorldTypography
```

当前 V4 分支已完成 Gate A 审查包、SR-02 最小 `StageTarget` resolver 和 SR-03 单一灰盒 `PoseTransitionRuntime` 的首版落地。此入口仍是结构灰盒，不代表最终视觉。

## DOM 树

```text
main.spatial-lab-root[data-spatial-lab-version=V4]
├─ section.spatial-lab-viewport[data-owner=ScreenViewport]
│  └─ div.spatial-lab-world-camera[data-owner=WorldCamera]
│     └─ div.spatial-lab-world-space[data-owner=WorldSpace]
│        ├─ div.spatial-lab-world-atmosphere[data-owner=WorldSpace]
│        ├─ div.spatial-lab-persistent-actors[data-owner=PersistentActors]
│        │  └─ div.spatial-lab-actor[data-stage-actor-id][data-target-pose-id]
│        ├─ div.spatial-lab-artifact-system[data-owner=ArtifactSystem]
│        │  └─ div.spatial-lab-artifact[data-artifact-id]
│        └─ div.spatial-lab-world-typography[data-owner=WorldTypography]
├─ aside.spatial-lab-screen-copy[data-owner=ScreenCopyLayer]
├─ nav.spatial-lab-lab-controls[data-owner=PresenterControls]
└─ div.spatial-lab-pose-runtime[data-owner=PoseTransitionRuntime]
```

## 属性所有权表

| Layer | Owns | Must Not Own |
| --- | --- | --- |
| ScreenViewport | viewport bounds, current beat id, route phase, transition id | camera transforms, actor pose, artifact pose |
| WorldCamera | camera DOM layer and camera transform CSS variables | actor lifecycle, actor role, artifact identity |
| WorldSpace | single coordinate plane, atmosphere marker, world-space containment | camera pose, actor lifecycle, presenter state |
| PersistentActors | stable actor DOM ids, lifecycle phase, role, target pose attributes | camera transform, viewport state, artifact ids |
| ArtifactSystem | stable artifact ids, artifact mode, artifact target pose attributes | actor ids, camera transform, screen copy |
| ScreenCopyLayer | readable semantic support copy outside camera motion | world actor pose, camera transform, artifact layout |
| PoseTransitionRuntime | animated writes to camera, actor, and artifact pose CSS variables | DOM creation, content text, actor identity |

## 与 V2 报告对照

| V2 要求 | 当前状态 |
| --- | --- |
| 新建平行 `/spatial-lab`，不继续旧 `VisualStage` 精修 | 已完成 |
| `Product / Ring / Artifact` 必须是 `WorldCamera` 后代 | 已完成，三者都在 `WorldSpace` 内 |
| `ScreenCopyLayer` 不随 camera 移动 | 已完成，位于 viewport 外 |
| 不挂载 `FrameCopy / FrameArtifacts / TypographySystem` | 已完成 |
| 不挂载 `ContinuityMotionRuntime / StageMotionRuntime` | 已完成 |
| 不创建上一页 / 当前页 / 下一页页面栈 | 已完成 |
| 新样式独立，不继续向 `presentation.css` 加补丁 | 已完成，使用 `src/styles/spatial-lab.css` |
| 建立 Beat 级目标状态 | 已完成首版，`resolveStageTarget()` 输出完整 `StageTarget` |
| 单一 Pose runtime | 已完成首版，只接入 `/spatial-lab` 灰盒 |

## SR-02 当前实现

`src/presentation/spatial-lab/stage-target.ts` 新增：

- `StageTarget`
- `LabCameraTarget`
- `LabActorTarget`
- `LabArtifactTarget`
- `LabCopyTarget`
- `resolveStageTarget()`

解析路径：

```text
Base target
→ Scene patch
→ Beat patch
→ Reduced-motion patch
→ 完整 StageTarget
```

它可以从任意 `BeatId` 直接解析目标状态，不依赖历史点击次数。

## SR-03 当前实现

`src/presentation/spatial-lab/PoseTransitionRuntime.tsx` 新增单一灰盒 runtime：

- 只在 `.spatial-lab-root` 内查找 DOM；
- 只写 camera、actor、artifact 的 CSS pose 变量；
- 不创建 DOM；
- 不写正式视觉；
- 不控制旧主演示；
- reduced motion 时直接 `set` 到终态；
- stable beat 不播放移动动画。

## 截图证据

- `review/spatial-lab/screenshots/spatial-lab-1366x768.jpg`
- `review/spatial-lab/screenshots/spatial-lab-1920x1080.jpg`

## 已知边界

- 当前仍是灰盒，不代表最终 NANFU / La Revoltosa 风格。
- `StageTarget` 的 pose patch 仍是首版结构模型，后续 SR-04 到 SR-06 需要为三次关键转场补充更精确的空间目标。
- 当前没有接入真实产品素材、二维码或正式业务输出样板。
- 旧主演示仍保留，V4 还没有替换主入口。
