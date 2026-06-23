import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

import {
  beatUrl,
  recordingScripts,
  screenshotBeats,
  viewports
} from "./gate2-review-manifest";
import {
  type EvidenceStatusRow,
  getGate2EvidenceStatus,
  getGate2EvidenceStatusRows
} from "./gate2-evidence-status";

type ChecklistResult = {
  readonly file: string;
  readonly status: "written";
};

const checklistPath = "review/gate2/human-evidence-checklist.md";

function checkMark(row: EvidenceStatusRow): string {
  return row.state === "present" || row.state === "recorded-decision" ? "x" : " ";
}

function rowByFile(rows: readonly EvidenceStatusRow[], file: string): EvidenceStatusRow | undefined {
  return rows.find((row) => row.file === file);
}

function screenshotFile(viewport: { readonly width: number }, beatId: string): string | undefined {
  if (viewport.width === 1366) {
    const names: Record<string, string> = {
      "08.7": "08.7-product-entry.png",
      "09.1": "09.1-horizontal-turn.png",
      "15.8": "15.8-output-freeze.png",
      "16.1": "16.1-forward-portal.png",
      "20.10": "20.10-action-closeup.png",
      "21.1": "21.1-dolly-back.png"
    };
    return names[beatId] ? `review/gate2/screenshots/1366/${names[beatId]}` : undefined;
  }

  const names: Record<string, string> = {
    "09.1": "09.1-horizontal-turn.png",
    "16.1": "16.1-forward-portal.png",
    "21.1": "21.1-dolly-back.png"
  };
  return names[beatId] ? `review/gate2/screenshots/1920/${names[beatId]}` : undefined;
}

function screenshotRows(rows: readonly EvidenceStatusRow[]): string {
  return viewports
    .flatMap((viewport) =>
      screenshotBeats.flatMap((beat) => {
        const file = screenshotFile(viewport, beat.beatId);
        if (!file) return [];

        const evidence = rowByFile(rows, file);
        const checked = evidence ? checkMark(evidence) : " ";

        return `- [${checked}] ${viewport.label} / ${beat.beatId} / ${beat.purpose} / ${beatUrl(beat)} -> \`${file}\``;
      })
    )
    .join("\n");
}

function recordingFile(id: string): string {
  const files: Record<string, string> = {
    A: "review/gate2/recordings/gate2-a-08-09-horizontal-turn.mp4",
    B: "review/gate2/recordings/gate2-b-15-16-forward-portal.mp4",
    C: "review/gate2/recordings/gate2-c-20-21-dolly-back.mp4",
    D: "review/gate2/recordings/gate2-d-reduced-motion.mp4"
  };

  return files[id] ?? `review/gate2/recordings/gate2-${id.toLowerCase()}.mp4`;
}

function recordingSections(rows: readonly EvidenceStatusRow[]): string {
  return recordingScripts
    .map((script) => {
      const file = recordingFile(script.id);
      const evidence = rowByFile(rows, file);
      const operations = script.operations.map((operation, index) => `${index + 1}. ${operation}`).join("\n");
      const checks = script.checks.map((check) => `- ${check}`).join("\n");

      return [
        `### [${evidence ? checkMark(evidence) : " "}] 录屏 ${script.id}: ${script.name}`,
        "",
        `保存到：\`${file}\``,
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

function commandLogRows(rows: readonly EvidenceStatusRow[]): string {
  return rows
    .filter((row) => row.category === "command-log")
    .map((row) => `- [${checkMark(row)}] ${row.purpose} -> \`${row.file}\``)
    .join("\n");
}

function decisionRows(rows: readonly EvidenceStatusRow[]): string {
  return rows
    .filter((row) => row.category === "decision")
    .map((row) => `- [${checkMark(row)}] ${row.purpose} -> \`${row.file}\``)
    .join("\n");
}

export function buildGate2HumanEvidenceChecklist(rows = getGate2EvidenceStatusRows()): string {
  return [
    "# Gate 2 Human Evidence Checklist",
    "",
    `Current evidence status: \`${getGate2EvidenceStatus(rows)}\``,
    "",
    "This file is a human capture checklist. It does not approve Gate 2, start WP-38, or open material gates.",
    "",
    "## Command Logs",
    "",
    commandLogRows(rows),
    "",
    "## Screenshots",
    "",
    screenshotRows(rows),
    "",
    "## No-Cut Recordings",
    "",
    recordingSections(rows),
    "",
    "## Decision Record",
    "",
    decisionRows(rows),
    "",
    "## Final Check",
    "",
    "- [ ] Run `npm run review:gate2:evidence` after adding screenshots and recordings.",
    "- [ ] Only fill `docs/gate2-review-decision-record.md` after human review.",
    "- [ ] Do not start WP-38 unless the decision record is explicitly `PASS`.",
    "- [ ] Keep product assets, QR/CTA, and business facts as placeholders until their own gates open.",
    ""
  ].join("\n");
}

export function writeGate2HumanEvidenceChecklist(root = process.cwd()): ChecklistResult {
  const target = join(root, checklistPath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buildGate2HumanEvidenceChecklist(), "utf8");

  return {
    file: checklistPath,
    status: "written"
  };
}

export function buildGate2HumanEvidenceChecklistReport(result: ChecklistResult): string {
  return [
    "# Gate 2 Human Evidence Checklist",
    "",
    `- ${result.status}: \`${result.file}\``,
    "",
    "This command writes a reviewer-facing Markdown checklist only.",
    "",
    "It does not capture screenshots, record videos, approve Gate 2, start WP-38, or open material gates.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGate2HumanEvidenceChecklistReport(writeGate2HumanEvidenceChecklist()));
}
