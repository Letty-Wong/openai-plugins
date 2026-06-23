import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";

import {
  buildGate2EvidenceStatusReport,
  getGate2EvidenceStatus,
  getGate2EvidenceStatusRows
} from "../scripts/gate2-evidence-status";
import { evidenceFiles } from "../scripts/gate2-review-kit";

function writeEvidence(root: string, file: string, content = "evidence\n"): void {
  const target = join(root, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content, "utf8");
}

test("WP-46 exposes a Gate 2 evidence status command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["review:gate2:evidence"], "tsx scripts/gate2-evidence-status.ts");
});

test("WP-46 reports incomplete evidence when screenshots and recordings are missing", () => {
  const root = mkdtempSync(join(tmpdir(), "gate2-evidence-status-"));

  for (const item of evidenceFiles.filter((file) => file.category === "command-log")) {
    writeEvidence(root, item.file);
  }
  writeEvidence(root, "docs/gate2-review-decision-record.md", "Decision: PENDING_HUMAN_REVIEW\n");

  const rows = getGate2EvidenceStatusRows(root);

  assert.equal(getGate2EvidenceStatus(rows), "INCOMPLETE_HUMAN_EVIDENCE");
  assert.equal(rows.filter((row) => row.category === "command-log" && row.state === "present").length, 4);
  assert.equal(rows.some((row) => row.category === "screenshot" && row.state === "missing"), true);
  assert.equal(rows.some((row) => row.category === "recording" && row.state === "missing"), true);
});

test("WP-46 reports ready for decision when evidence exists but decision is pending", () => {
  const root = mkdtempSync(join(tmpdir(), "gate2-evidence-status-"));

  for (const item of evidenceFiles) {
    writeEvidence(root, item.file, item.category === "decision" ? "Decision: PENDING_HUMAN_REVIEW\n" : "evidence\n");
  }

  assert.equal(getGate2EvidenceStatus(getGate2EvidenceStatusRows(root)), "READY_FOR_DECISION");
});

test("WP-46 reports review decided only after a human decision value is recorded", () => {
  const root = mkdtempSync(join(tmpdir(), "gate2-evidence-status-"));

  for (const item of evidenceFiles) {
    writeEvidence(root, item.file, item.category === "decision" ? "Decision: PASS\n" : "evidence\n");
  }

  assert.equal(getGate2EvidenceStatus(getGate2EvidenceStatusRows(root)), "REVIEW_DECIDED");
});

test("WP-46 evidence status report does not approve gates by itself", () => {
  const report = buildGate2EvidenceStatusReport([
    {
      category: "decision",
      file: "docs/gate2-review-decision-record.md",
      purpose: "Fill PASS, SMALL_FIX, or FAIL only after human review.",
      state: "pending-decision"
    }
  ]);

  assert.match(report, /does not approve Gate 2/);
  assert.match(report, /start WP-38/);
  assert.match(report, /open material gates/);
});
