import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  buildGate2CommandLogCaptureReport,
  captureGate2CommandLogs,
  getGate2CommandLogs
} from "../scripts/gate2-command-log-capture";

test("WP-45 exposes a Gate 2 command log capture command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["review:gate2:logs"], "tsx scripts/gate2-command-log-capture.ts");
});

test("WP-45 defines the four Gate 2 command logs", () => {
  const files = getGate2CommandLogs().map((log) => log.file).sort();

  assert.deepEqual(files, [
    "review/gate2/command-logs/audit-materials.txt",
    "review/gate2/command-logs/preflight-gate2.txt",
    "review/gate2/command-logs/review-gate2.txt",
    "review/gate2/command-logs/status-gates.txt"
  ]);
});

test("WP-45 writes current command outputs into command log text files", () => {
  const root = mkdtempSync(join(tmpdir(), "gate2-command-logs-"));
  const results = captureGate2CommandLogs(root);

  assert.equal(results.length, 4);
  assert.equal(results.every((item) => item.status === "written"), true);
  assert.match(readFileSync(join(root, "review/gate2/command-logs/preflight-gate2.txt"), "utf8"), /READY_FOR_HUMAN_REVIEW/);
  assert.match(readFileSync(join(root, "review/gate2/command-logs/review-gate2.txt"), "utf8"), /Gate 2 中文验收清单/);
  assert.match(readFileSync(join(root, "review/gate2/command-logs/audit-materials.txt"), "utf8"), /Material Placeholder Audit/);
  assert.match(readFileSync(join(root, "review/gate2/command-logs/status-gates.txt"), "utf8"), /PENDING_HUMAN_REVIEW/);
});

test("WP-45 command log report keeps Gate 2 and material gates unapproved", () => {
  const report = buildGate2CommandLogCaptureReport([
    {
      command: "npm run preflight:gate2",
      file: "review/gate2/command-logs/preflight-gate2.txt",
      status: "written"
    }
  ]);

  assert.match(report, /does not capture screenshots/);
  assert.match(report, /approve Gate 2/);
  assert.match(report, /start WP-38/);
  assert.match(report, /open material gates/);
});
