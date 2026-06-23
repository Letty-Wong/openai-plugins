import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  buildGate2HumanEvidenceChecklist,
  buildGate2HumanEvidenceChecklistReport,
  writeGate2HumanEvidenceChecklist
} from "../scripts/gate2-human-evidence-checklist";

test("WP-47 exposes a Gate 2 human evidence checklist command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["review:gate2:checklist"], "tsx scripts/gate2-human-evidence-checklist.ts");
});

test("WP-47 checklist includes required screenshots and recordings", () => {
  const checklist = buildGate2HumanEvidenceChecklist();

  assert.match(checklist, /review\/gate2\/screenshots\/1366\/09\.1-horizontal-turn\.png/);
  assert.match(checklist, /review\/gate2\/screenshots\/1920\/21\.1-dolly-back\.png/);
  assert.match(checklist, /review\/gate2\/recordings\/gate2-a-08-09-horizontal-turn\.mp4/);
  assert.match(checklist, /review\/gate2\/recordings\/gate2-d-reduced-motion\.mp4/);
});

test("WP-47 checklist keeps the decision and material gates explicit", () => {
  const checklist = buildGate2HumanEvidenceChecklist();

  assert.match(checklist, /does not approve Gate 2/);
  assert.match(checklist, /Do not start WP-38 unless the decision record is explicitly `PASS`/);
  assert.match(checklist, /Keep product assets, QR\/CTA, and business facts as placeholders/);
});

test("WP-47 writes a Markdown checklist file only", () => {
  const root = mkdtempSync(join(tmpdir(), "gate2-checklist-"));
  const result = writeGate2HumanEvidenceChecklist(root);
  const target = join(root, result.file);

  assert.equal(result.file, "review/gate2/human-evidence-checklist.md");
  assert.equal(existsSync(target), true);
  assert.match(readFileSync(target, "utf8"), /# Gate 2 Human Evidence Checklist/);
});

test("WP-47 checklist command report does not claim evidence capture", () => {
  const report = buildGate2HumanEvidenceChecklistReport({
    file: "review/gate2/human-evidence-checklist.md",
    status: "written"
  });

  assert.match(report, /does not capture screenshots/);
  assert.match(report, /record videos/);
  assert.match(report, /approve Gate 2/);
  assert.match(report, /start WP-38/);
});
