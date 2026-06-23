import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

import { buildGateBStatusReport } from "./gate-b-status";
import { buildSr07GuardMessage } from "./guard-sr07-start";

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

export function getGateBCommandLogs(): readonly CommandLog[] {
  return [
    {
      command: "npm run status:gate-b",
      content: buildGateBStatusReport(),
      file: "review/spatial-lab/command-logs/status-gate-b.txt"
    },
    {
      command: "npm run guard:sr07",
      content: buildSr07GuardMessage(),
      file: "review/spatial-lab/command-logs/guard-sr07.txt"
    }
  ];
}

export function captureGateBCommandLogs(root = process.cwd()): readonly CaptureResult[] {
  return getGateBCommandLogs().map((log) => {
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

export function buildGateBCommandLogCaptureReport(results: readonly CaptureResult[]): string {
  const rows = results.map((item) => `| ${item.status} | \`${item.command}\` | \`${item.file}\` |`).join("\n");

  return [
    "# Gate B Command Log Capture",
    "",
    "This command writes current local Gate B command output into review evidence text files.",
    "",
    "It does not capture screenshots, record videos, approve Gate B, start SR-07, or open material gates.",
    "",
    "| Status | Command | File |",
    "| --- | --- | --- |",
    rows,
    "",
    "## Still Required",
    "",
    "- Human no-cut recordings in `review/spatial-lab/recordings/gate-b/`.",
    "- Human decision entry in `docs/gate-b-review-decision-record.md`.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGateBCommandLogCaptureReport(captureGateBCommandLogs()));
}

