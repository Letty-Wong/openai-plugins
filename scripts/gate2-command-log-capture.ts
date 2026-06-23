import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

import { buildGate2ReviewPreflight } from "./gate2-review-preflight";
import { buildGate2ReviewManifest } from "./gate2-review-manifest";
import { buildMaterialPlaceholderAudit } from "./material-placeholder-audit";
import { buildProjectGateStatus } from "./project-gate-status";

type CommandLog = {
  readonly command: string;
  readonly content: string;
  readonly file: string;
};

type CaptureResult = {
  readonly command: string;
  readonly file: string;
  readonly status: "written";
};

export function getGate2CommandLogs(): readonly CommandLog[] {
  return [
    {
      command: "npm run preflight:gate2",
      content: buildGate2ReviewPreflight(),
      file: "review/gate2/command-logs/preflight-gate2.txt"
    },
    {
      command: "npm run review:gate2",
      content: buildGate2ReviewManifest(),
      file: "review/gate2/command-logs/review-gate2.txt"
    },
    {
      command: "npm run audit:materials",
      content: buildMaterialPlaceholderAudit(),
      file: "review/gate2/command-logs/audit-materials.txt"
    },
    {
      command: "npm run status:gates",
      content: buildProjectGateStatus(),
      file: "review/gate2/command-logs/status-gates.txt"
    }
  ];
}

export function captureGate2CommandLogs(root = process.cwd()): readonly CaptureResult[] {
  return getGate2CommandLogs().map((log) => {
    const target = join(root, log.file);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, `${log.content.trimEnd()}\n`, "utf8");

    return {
      command: log.command,
      file: log.file,
      status: "written"
    };
  });
}

export function buildGate2CommandLogCaptureReport(results: readonly CaptureResult[]): string {
  const rows = results.map((item) => `| ${item.status} | \`${item.command}\` | \`${item.file}\` |`).join("\n");

  return [
    "# Gate 2 Command Log Capture",
    "",
    "This command writes current local command output into review evidence text files.",
    "",
    "It does not capture screenshots, record videos, approve Gate 2, start WP-38, or open material gates.",
    "",
    "| Status | Command | File |",
    "| --- | --- | --- |",
    rows,
    "",
    "## Still Required",
    "",
    "- Human screenshots in `review/gate2/screenshots/`.",
    "- Human no-cut recordings in `review/gate2/recordings/`.",
    "- Human decision entry in `docs/gate2-review-decision-record.md`.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGate2CommandLogCaptureReport(captureGate2CommandLogs()));
}
