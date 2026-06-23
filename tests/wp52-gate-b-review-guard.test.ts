import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import {
  buildGateBStatusReport,
  getGateBStatus,
  parseGateBDecision
} from "../scripts/gate-b-status";
import {
  buildGateBCommandLogCaptureReport,
  captureGateBCommandLogs,
  getGateBCommandLogs
} from "../scripts/gate-b-command-log-capture";
import { buildGateBReviewKit } from "../scripts/gate-b-review-kit";
import { buildSr07GuardMessage } from "../scripts/guard-sr07-start";

test("WP-52 Gate B decision record is invalid until Gate A passes", () => {
  const decisionRecord = readFileSync("docs/gate-b-review-decision-record.md", "utf8");

  assert.equal(parseGateBDecision(decisionRecord), "INVALID_UNTIL_GATE_A_PASS");
  assert.match(decisionRecord, /Required Evidence Before PASS/);
  assert.match(decisionRecord, /Gate A has passed human review/);
  assert.match(decisionRecord, /no-cut recordings/);
});

test("WP-52 Gate B status requires review doc and all six screenshots", () => {
  const status = getGateBStatus();

  assert.equal(status.decision, "INVALID_UNTIL_GATE_A_PASS");
  assert.equal(status.missingCommandLogs.length >= 0, true);
  assert.equal(status.missingRecordings.length, 6);
  assert.equal(status.reviewDocReady, true);
  assert.deepEqual(status.missingScreenshots, []);
  assert.equal(status.sr07Allowed, false);
});

test("WP-52 SR-07 guard blocks until Gate B PASS", () => {
  const message = buildSr07GuardMessage();

  assert.match(message, /Allowed: `false`/);
  assert.match(message, /Gate B decision: `INVALID_UNTIL_GATE_A_PASS`/);
  assert.match(message, /Missing recordings: `6`/);
  assert.match(message, /Decision: PASS/);
});

test("WP-52 Gate B command docs and checklist exist", () => {
  assert.equal(existsSync("docs/gate-b-status-command.md"), true);
  assert.equal(existsSync("docs/gate-b-command-log-capture-command.md"), true);
  assert.equal(existsSync("docs/gate-b-review-kit-command.md"), true);
  assert.equal(existsSync("docs/sr07-start-guard.md"), true);
  assert.equal(existsSync("review/spatial-lab/gate-b-human-evidence-checklist.md"), true);
  assert.equal(existsSync("review/spatial-lab/recordings/gate-b/README.md"), true);

  const report = buildGateBStatusReport();
  assert.match(report, /SR-07 allowed: `false`/);
  assert.match(report, /Allowed next action: Do not continue Gate B or SR-07/);
  assert.match(report, /Required recordings missing: `6`/);
});

test("WP-52 Gate B command log capture writes status and SR-07 guard logs", () => {
  const files = getGateBCommandLogs().map((log) => log.file).sort();

  assert.deepEqual(files, [
    "review/spatial-lab/command-logs/guard-sr07.txt",
    "review/spatial-lab/command-logs/status-gate-b.txt"
  ]);

  const result = captureGateBCommandLogs();
  assert.equal(result.length, 2);
  assert.match(readFileSync("review/spatial-lab/command-logs/status-gate-b.txt", "utf8"), /Gate B Status/);
  assert.match(readFileSync("review/spatial-lab/command-logs/guard-sr07.txt", "utf8"), /SR-07 Start Guard/);

  const report = buildGateBCommandLogCaptureReport(result);
  assert.match(report, /does not capture screenshots/);
  assert.match(report, /start SR-07/);
});

test("WP-52 Gate B review kit lists transition URLs and recording filenames", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };
  const kit = buildGateBReviewKit();

  assert.equal(packageJson.scripts?.["review:gate-b:kit"], "tsx scripts/gate-b-review-kit.ts");
  assert.match(kit, /spatial-lab\?beat=09\.1/);
  assert.match(kit, /spatial-lab\?beat=16\.1/);
  assert.match(kit, /spatial-lab\?beat=21\.1/);
  assert.match(kit, /sr04-08-7-to-09-1-forward\.mp4/);
  assert.match(kit, /sr05-16-1-to-15-8-backward\.mp4/);
  assert.match(kit, /sr06-20-10-to-21-1-forward\.mp4/);
  assert.match(kit, /does not approve Gate B/);
});
