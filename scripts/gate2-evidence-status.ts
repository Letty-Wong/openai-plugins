import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { evidenceFiles } from "./gate2-review-kit";

export type EvidenceState = "missing" | "pending-decision" | "present" | "recorded-decision";
export type ReviewEvidenceStatus = "INCOMPLETE_HUMAN_EVIDENCE" | "READY_FOR_DECISION" | "REVIEW_DECIDED";

export type EvidenceStatusRow = {
  readonly category: string;
  readonly file: string;
  readonly purpose: string;
  readonly state: EvidenceState;
};

function hasNonEmptyFile(root: string, file: string): boolean {
  const target = join(root, file);

  if (!existsSync(target)) {
    return false;
  }

  return statSync(target).isFile() && statSync(target).size > 0;
}

function decisionState(root: string, file: string): EvidenceState {
  const target = join(root, file);

  if (!existsSync(target)) {
    return "missing";
  }

  const text = readFileSync(target, "utf8");
  const decision = text.match(/Decision:\s*([A-Z_]+)/)?.[1];

  if (decision === "PASS" || decision === "SMALL_FIX" || decision === "FAIL") {
    return "recorded-decision";
  }

  return "pending-decision";
}

export function getGate2EvidenceStatusRows(root = process.cwd()): readonly EvidenceStatusRow[] {
  return evidenceFiles.map((item) => {
    if (item.category === "decision") {
      return {
        ...item,
        state: decisionState(root, item.file)
      };
    }

    return {
      ...item,
      state: hasNonEmptyFile(root, item.file) ? "present" : "missing"
    };
  });
}

export function getGate2EvidenceStatus(rows = getGate2EvidenceStatusRows()): ReviewEvidenceStatus {
  const evidenceRows = rows.filter((row) => row.category !== "decision");
  const decisionRows = rows.filter((row) => row.category === "decision");
  const evidenceComplete = evidenceRows.every((row) => row.state === "present");
  const decisionRecorded = decisionRows.every((row) => row.state === "recorded-decision");

  if (!evidenceComplete) {
    return "INCOMPLETE_HUMAN_EVIDENCE";
  }

  if (decisionRecorded) {
    return "REVIEW_DECIDED";
  }

  return "READY_FOR_DECISION";
}

function categorySummary(rows: readonly EvidenceStatusRow[]): string {
  const categories = [...new Set(rows.map((row) => row.category))];

  return categories
    .map((category) => {
      const categoryRows = rows.filter((row) => row.category === category);
      const complete = categoryRows.filter((row) => row.state === "present" || row.state === "recorded-decision").length;
      return `| ${category} | ${complete}/${categoryRows.length} |`;
    })
    .join("\n");
}

export function buildGate2EvidenceStatusReport(rows = getGate2EvidenceStatusRows()): string {
  const status = getGate2EvidenceStatus(rows);
  const detailRows = rows
    .map((row) => `| ${row.state} | ${row.category} | \`${row.file}\` | ${row.purpose} |`)
    .join("\n");

  return [
    "# Gate 2 Evidence Status",
    "",
    `Overall status: \`${status}\``,
    "",
    "This command inspects evidence files only. It does not approve Gate 2, start WP-38, or open material gates.",
    "",
    "## Category Summary",
    "",
    "| Category | Complete |",
    "| --- | --- |",
    categorySummary(rows),
    "",
    "## Evidence Files",
    "",
    "| State | Category | File | Purpose |",
    "| --- | --- | --- | --- |",
    detailRows,
    "",
    "## Interpretation",
    "",
    "- `INCOMPLETE_HUMAN_EVIDENCE` means screenshots, recordings, command logs, or the decision record are not yet complete.",
    "- `READY_FOR_DECISION` means all command logs, screenshots, and recordings exist, but the human decision is still pending.",
    "- `REVIEW_DECIDED` means evidence files exist and the decision record has been filled with PASS, SMALL_FIX, or FAIL.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGate2EvidenceStatusReport());
}
