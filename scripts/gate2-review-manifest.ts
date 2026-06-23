import { pathToFileURL } from "node:url";

import { spatialTransitionCues } from "../src/presentation/stage/spatial-poses";

export type Viewport = {
  readonly height: number;
  readonly label: string;
  readonly width: number;
};

export type ReviewBeat = {
  readonly beatId: string;
  readonly purpose: string;
  readonly sceneId: string;
};

export type RecordingScript = {
  readonly checks: readonly string[];
  readonly id: string;
  readonly name: string;
  readonly operations: readonly string[];
  readonly startUrl: string;
};

const baseUrl = "http://localhost:3000";

export const viewports: readonly Viewport[] = [
  { height: 768, label: "1366 x 768", width: 1366 },
  { height: 1080, label: "1920 x 1080", width: 1920 }
];

export const screenshotBeats: readonly ReviewBeat[] = [
  { beatId: "08.7", purpose: "产品已在场，准备进入横向段。", sceneId: "scene-08" },
  { beatId: "09.1", purpose: "横向产品转弯灰盒。", sceneId: "scene-09" },
  { beatId: "15.8", purpose: "输出冻结，准备穿环。", sceneId: "scene-15" },
  { beatId: "16.1", purpose: "Z 轴向前穿越灰盒。", sceneId: "scene-16" },
  { beatId: "20.10", purpose: "行动路径近景。", sceneId: "scene-20" },
  { beatId: "21.1", purpose: "Z 轴后拉揭示灰盒。", sceneId: "scene-21" }
];

export const recordingScripts: readonly RecordingScript[] = [
  {
    checks: [
      "不是整页 fade。",
      "IntegrationRing 与 ProductStage 不是重新换身体。",
      "产品仍是 shower-h1-placeholder，占位素材没有伪装成真实产品图。"
    ],
    id: "A",
    name: "Scene 08 到 09 横向产品转弯",
    operations: ["停留 2 秒。", "按一次右方向键进入 09.1。", "停留 3 秒。", "按一次左方向键回到 08.7。", "再按一次右方向键回到 09.1。"],
    startUrl: `${baseUrl}#scene-08/08.7`
  },
  {
    checks: [
      "转场是向前穿过接入环进入安全空间。",
      "ProductStage 仍在场，不重新 reveal。",
      "没有使用红光或真实素材伪装安全转折。"
    ],
    id: "B",
    name: "Scene 15 到 16 Z 轴向前穿越",
    operations: ["停留 2 秒。", "按一次右方向键进入 16.1。", "停留 3 秒。", "按一次左方向键回到 15.8。", "再按一次右方向键回到 16.1。"],
    startUrl: `${baseUrl}#scene-15/15.8`
  },
  {
    checks: [
      "不是普通缩小页面，而是后拉揭示完整闭环。",
      "ActionPath 不重新入场成另一张终幕图。",
      "快速操作后没有残留旧 transform 或旧灰盒变量。"
    ],
    id: "C",
    name: "Scene 20 到 21 Z 轴后拉揭示",
    operations: ["停留 2 秒。", "按一次右方向键进入 21.1。", "停留 3 秒。", "快速执行右、左、右，最后停在 21.1。", "停留 3 秒。"],
    startUrl: `${baseUrl}#scene-20/20.10`
  },
  {
    checks: [
      "16.1 的空间关系仍成立。",
      "转场不做长距离运动。",
      "Gate 2 灰盒直接处于稳定终态。"
    ],
    id: "D",
    name: "Reduced Motion",
    operations: ["按 h 展开 presenter HUD。", "点击 Motion，打开 Reduced Motion。", "按一次右方向键进入 16.1。", "停留 3 秒。"],
    startUrl: `${baseUrl}#scene-15/15.8`
  }
];

export function beatUrl(beat: ReviewBeat): string {
  return `${baseUrl}#${beat.sceneId}/${beat.beatId}`;
}

function transitionRows(): string {
  return spatialTransitionCues
    .map((cue) =>
      `| \`${cue.beatId}\` | \`${cue.kind}\` | ${cue.label} | \`${cue.fromPhase}\` -> \`${cue.toPhase}\` | \`${cue.leadActorId}\` | \`${cue.cameraPose.poseId}\` |`
    )
    .join("\n");
}

function screenshotRows(): string {
  return viewports
    .flatMap((viewport) =>
      screenshotBeats.map((beat) => `| ${viewport.label} | \`${beat.beatId}\` | ${beat.purpose} | ${beatUrl(beat)} |`)
    )
    .join("\n");
}

function recordingSections(): string {
  return recordingScripts
    .map((script) => {
      const operations = script.operations.map((operation, index) => `${index + 1}. ${operation}`).join("\n");
      const checks = script.checks.map((check) => `- ${check}`).join("\n");

      return [
        `### 录屏 ${script.id}：${script.name}`,
        "",
        `起点：${script.startUrl}`,
        "",
        operations,
        "",
        "必须看见：",
        "",
        checks
      ].join("\n");
    })
    .join("\n\n");
}

export function buildGate2ReviewManifest(): string {
  return [
    "# Gate 2 中文验收清单",
    "",
    "本清单从当前代码中的 `spatialTransitionCues` 生成，用于辅助人工验收。它不拍屏、不替代无剪辑录屏，也不代表最终美术验收通过。",
    "",
    "## 三段转场合同",
    "",
    "| Beat | 转场类型 | 中文含义 | 相位 | 主演员 | Camera Pose |",
    "| --- | --- | --- | --- | --- | --- |",
    transitionRows(),
    "",
    "## 截图 URL 清单",
    "",
    "| 尺寸 | Beat | 目的 | URL |",
    "| --- | --- | --- | --- |",
    screenshotRows(),
    "",
    "## 无剪辑录屏脚本",
    "",
    recordingSections(),
    "",
    "## 运行时检查",
    "",
    "- 使用 `http://localhost:3000`，不要用 `127.0.0.1:3000`。",
    "- 主舞台应只有 `SpatialStage` / `WorldCamera` / `PersistentActorLayer` 这一套空间结构。",
    "- 旧 page-chain 层不得重新挂回观众主舞台。",
    "- 前进、后退、快速输入后，灰盒变量必须回到稳定终态。",
    "- Reduced Motion 打开后保留空间关系，但减少长距离运动。",
    "",
    "## 素材 Gate",
    "",
    "- 产品必须继续是 `shower-h1-placeholder` 或同等级占位。",
    "- CTA 和二维码必须继续是 placeholder。",
    "- 不得出现假 MOQ、价格、认证、交期、质保、名额或日期。",
    "- 本轮不接真实产品素材、不接真实二维码、不补业务事实。",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGate2ReviewManifest());
}
