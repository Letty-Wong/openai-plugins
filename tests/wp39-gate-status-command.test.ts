import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { buildProjectGateStatus, parseGate2Decision } from "../scripts/project-gate-status";

test("WP-39 exposes a gate status command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["status:gates"], "tsx scripts/project-gate-status.ts");
});

test("WP-39 parses Gate 2 decision as pending from the current decision record", () => {
  assert.equal(parseGate2Decision(), "PENDING_HUMAN_REVIEW");
});

test("WP-39 gate status blocks WP-38 while Gate 2 is pending", () => {
  const status = buildProjectGateStatus();

  assert.match(status, /Gate 2 decision: `PENDING_HUMAN_REVIEW`/);
  assert.match(status, /WP-38 implementation: BLOCKED/);
  assert.match(status, /Gate 2 human review has not passed/);
  assert.match(status, /Allowed next action: Capture Gate 2 screenshots and no-cut recordings/);
});

test("WP-39 gate status keeps material gates closed", () => {
  const status = buildProjectGateStatus();

  assert.match(status, /Material gates: CLOSED/);
  assert.match(status, /product assets, QR\/CTA, and business facts remain blocked/);
  assert.match(status, /Keep placeholders until the matching material gate is explicitly approved/);
});
