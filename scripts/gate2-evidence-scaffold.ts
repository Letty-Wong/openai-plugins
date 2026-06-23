import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

import { evidenceFiles } from "./gate2-review-kit";

type ScaffoldFile = {
  readonly content: string;
  readonly file: string;
};

type ScaffoldResult = {
  readonly file: string;
  readonly status: "created" | "exists";
};

const evidenceRows = evidenceFiles
  .map((item) => `| ${item.category} | \`${item.file}\` | ${item.purpose} |`)
  .join("\n");

const scaffoldFiles: readonly ScaffoldFile[] = [
  {
    file: "review/gate2/README.md",
    content: [
      "# Gate 2 Evidence Workspace",
      "",
      "This folder is only for human review evidence. It does not approve Gate 2, does not start WP-38, and does not open material gates.",
      "",
      "## Evidence Index",
      "",
      "| Category | File | Purpose |",
      "| --- | --- | --- |",
      evidenceRows,
      "",
      "## Rules",
      "",
      "- Keep screenshots and recordings as real review evidence only.",
      "- Do not create fake `.png` or `.mp4` files.",
      "- Do not add real product assets, QR codes, or business facts here.",
      "- Record the final decision in `docs/gate2-review-decision-record.md` after human review.",
      ""
    ].join("\n")
  },
  {
    file: "review/gate2/command-logs/README.md",
    content: [
      "# Gate 2 Command Logs",
      "",
      "Save copied terminal output here during human review.",
      "",
      "Expected files:",
      "",
      "- `preflight-gate2.txt` from `npm run preflight:gate2`.",
      "- `review-gate2.txt` from `npm run review:gate2`.",
      "- `audit-materials.txt` from `npm run audit:materials`.",
      "- `status-gates.txt` from `npm run status:gates`.",
      "",
      "These logs are evidence only. They do not approve Gate 2 by themselves.",
      ""
    ].join("\n")
  },
  {
    file: "review/gate2/recordings/README.md",
    content: [
      "# Gate 2 No-Cut Recordings",
      "",
      "Place human-captured recordings here after following `docs/gate2-human-review-package.md`.",
      "",
      "Expected files:",
      "",
      "- `gate2-a-08-09-horizontal-turn.mp4`",
      "- `gate2-b-15-16-forward-portal.mp4`",
      "- `gate2-c-20-21-dolly-back.mp4`",
      "- `gate2-d-reduced-motion.mp4`",
      "",
      "Do not add placeholder video files.",
      ""
    ].join("\n")
  },
  {
    file: "review/gate2/screenshots/1366/README.md",
    content: [
      "# Gate 2 Screenshots 1366x768",
      "",
      "Place human-captured `1366 x 768` screenshots here.",
      "",
      "Expected files:",
      "",
      "- `08.7-product-entry.png`",
      "- `09.1-horizontal-turn.png`",
      "- `15.8-output-freeze.png`",
      "- `16.1-forward-portal.png`",
      "- `20.10-action-closeup.png`",
      "- `21.1-dolly-back.png`",
      "",
      "Do not add placeholder image files.",
      ""
    ].join("\n")
  },
  {
    file: "review/gate2/screenshots/1920/README.md",
    content: [
      "# Gate 2 Screenshots 1920x1080",
      "",
      "Place human-captured `1920 x 1080` screenshots here.",
      "",
      "Expected files:",
      "",
      "- `09.1-horizontal-turn.png`",
      "- `16.1-forward-portal.png`",
      "- `21.1-dolly-back.png`",
      "",
      "Do not add placeholder image files.",
      ""
    ].join("\n")
  }
];

export function scaffoldGate2Evidence(root = process.cwd()): readonly ScaffoldResult[] {
  return scaffoldFiles.map((item) => {
    const target = join(root, item.file);
    mkdirSync(dirname(target), { recursive: true });

    if (existsSync(target)) {
      return { file: item.file, status: "exists" };
    }

    writeFileSync(target, item.content, "utf8");
    return { file: item.file, status: "created" };
  });
}

export function buildGate2EvidenceScaffoldReport(results: readonly ScaffoldResult[]): string {
  const rows = results.map((item) => `| ${item.status} | \`${item.file}\` |`).join("\n");

  return [
    "# Gate 2 Evidence Scaffold",
    "",
    "This command creates reviewer-facing folders and README files only.",
    "",
    "It does not capture screenshots, record videos, approve Gate 2, start WP-38, or open material gates.",
    "",
    "| Status | File |",
    "| --- | --- |",
    rows,
    "",
    "## Next Human Actions",
    "",
    "1. Run `npm run review:gate2:kit`.",
    "2. Run `npm run review:gate2:logs` to save command logs into `review/gate2/command-logs/`.",
    "3. Run `npm run review:gate2:evidence` to inspect evidence completeness.",
    "4. Capture the required screenshots into `review/gate2/screenshots/`.",
    "5. Capture the no-cut recordings into `review/gate2/recordings/`.",
    "6. Fill `docs/gate2-review-decision-record.md` after review.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGate2EvidenceScaffoldReport(scaffoldGate2Evidence()));
}
