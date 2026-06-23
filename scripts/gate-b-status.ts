import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export type GateBDecision = "FAIL" | "PASS" | "PENDING_HUMAN_REVIEW" | "SMALL_FIX" | "UNKNOWN";

const decisionRecordPath = "docs/gate-b-review-decision-record.md";
const reviewDocPath = "docs/gate-b-transition-graybox-review.md";
const requiredCommandLogPaths = [
  "review/spatial-lab/command-logs/status-gate-b.txt",
  "review/spatial-lab/command-logs/guard-sr07.txt"
] as const;
const requiredScreenshotPaths = [
  "review/spatial-lab/screenshots/gate-b/sr04-09-1-1366x768.jpg",
  "review/spatial-lab/screenshots/gate-b/sr04-09-1-1920x1080.jpg",
  "review/spatial-lab/screenshots/gate-b/sr05-16-1-1366x768.jpg",
  "review/spatial-lab/screenshots/gate-b/sr05-16-1-1920x1080.jpg",
  "review/spatial-lab/screenshots/gate-b/sr06-21-1-1366x768.jpg",
  "review/spatial-lab/screenshots/gate-b/sr06-21-1-1920x1080.jpg"
] as const;
const requiredRecordingPaths = [
  "review/spatial-lab/recordings/gate-b/sr04-08-7-to-09-1-forward.mp4",
  "review/spatial-lab/recordings/gate-b/sr04-09-1-to-08-7-backward.mp4",
  "review/spatial-lab/recordings/gate-b/sr05-15-8-to-16-1-forward.mp4",
  "review/spatial-lab/recordings/gate-b/sr05-16-1-to-15-8-backward.mp4",
  "review/spatial-lab/recordings/gate-b/sr06-20-10-to-21-1-forward.mp4",
  "review/spatial-lab/recordings/gate-b/sr06-21-1-to-20-10-backward.mp4"
] as const;

function readText(path: string): string {
  return readFileSync(path, "utf8");
}

export function parseGateBDecision(decisionRecord = readText(decisionRecordPath)): GateBDecision {
  const match = decisionRecord.match(/Decision:\s*([A-Z_]+)/);
  const value = match?.[1];

  if (value === "PASS" || value === "SMALL_FIX" || value === "FAIL" || value === "PENDING_HUMAN_REVIEW") {
    return value;
  }

  return "UNKNOWN";
}

export type GateBStatus = {
  readonly decision: GateBDecision;
  readonly missingCommandLogs: readonly string[];
  readonly missingRecordings: readonly string[];
  readonly missingScreenshots: readonly string[];
  readonly reviewDocReady: boolean;
  readonly sr07Allowed: boolean;
};

export function getGateBStatus(): GateBStatus {
  const decision = parseGateBDecision();
  const missingCommandLogs = requiredCommandLogPaths.filter((path) => !existsSync(path));
  const missingRecordings = requiredRecordingPaths.filter((path) => !existsSync(path));
  const missingScreenshots = requiredScreenshotPaths.filter((path) => !existsSync(path));
  const reviewDoc = existsSync(reviewDocPath) ? readText(reviewDocPath) : "";
  const reviewDocReady =
    /SR-04/.test(reviewDoc) &&
    /SR-05/.test(reviewDoc) &&
    /SR-06/.test(reviewDoc) &&
    /不接入真实产品素材/.test(reviewDoc) &&
    /不接入二维码/.test(reviewDoc);

  return {
    decision,
    missingCommandLogs,
    missingRecordings,
    missingScreenshots,
    reviewDocReady,
    sr07Allowed:
      decision === "PASS" &&
      missingCommandLogs.length === 0 &&
      missingRecordings.length === 0 &&
      missingScreenshots.length === 0 &&
      reviewDocReady
  };
}

function allowedAction(status: GateBStatus): string {
  if (status.sr07Allowed) {
    return "SR-07 may start. Keep material gates closed and continue in /spatial-lab.";
  }

  if (status.decision === "SMALL_FIX") {
    return "Only Gate B small fixes are allowed: direction, occlusion, depth layering, interruption, or reduced-motion endpoints.";
  }

  if (status.decision === "FAIL") {
    return "Rework V4 spatial hierarchy, StageTarget, PoseTransitionRuntime, and Gate B greybox targets before SR-07.";
  }

  return "Complete human review, no-cut recordings, and docs/gate-b-review-decision-record.md before SR-07.";
}

export function buildGateBStatusReport(): string {
  const status = getGateBStatus();

  return [
    "# Gate B Status",
    "",
    `- Gate B decision: \`${status.decision}\``,
    `- Review doc ready: \`${String(status.reviewDocReady)}\``,
    `- Required command logs missing: \`${status.missingCommandLogs.length}\``,
    `- Required screenshots missing: \`${status.missingScreenshots.length}\``,
    `- Required recordings missing: \`${status.missingRecordings.length}\``,
    `- SR-07 allowed: \`${String(status.sr07Allowed)}\``,
    `- Allowed next action: ${allowedAction(status)}`,
    "",
    "## Missing Command Logs",
    "",
    ...(status.missingCommandLogs.length > 0 ? status.missingCommandLogs.map((path) => `- ${path}`) : ["- None"]),
    "",
    "## Missing Screenshots",
    "",
    ...(status.missingScreenshots.length > 0 ? status.missingScreenshots.map((path) => `- ${path}`) : ["- None"]),
    "",
    "## Missing Recordings",
    "",
    ...(status.missingRecordings.length > 0 ? status.missingRecordings.map((path) => `- ${path}`) : ["- None"]),
    "",
    "## Guardrails",
    "",
    "- Do not start SR-07 until `Decision: PASS` is recorded by a human reviewer.",
    "- Do not use real product assets, real QR codes, or unapproved business facts.",
    "- Do not replace the old main presentation until SR-11.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGateBStatusReport());
}
