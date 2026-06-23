import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { buildWp38GuardMessage } from "../scripts/guard-wp38-start";
import { getWp38GuardResult } from "../scripts/project-gate-status";

test("WP-40 exposes a WP-38 start guard command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["guard:wp38"], "tsx scripts/guard-wp38-start.ts");
});

test("WP-40 blocks WP-38 while Gate 2 is pending human review", () => {
  const guard = getWp38GuardResult();

  assert.equal(guard.allowed, false);
  assert.equal(guard.decision, "PENDING_HUMAN_REVIEW");
  assert.match(guard.message, /Gate 2 human review has not passed/);
});

test("WP-40 guard message documents the required evidence before WP-38", () => {
  const message = buildWp38GuardMessage();

  assert.match(message, /WP-38 Start Guard/);
  assert.match(message, /Allowed: `false`/);
  assert.match(message, /Gate 2 decision: `PENDING_HUMAN_REVIEW`/);
  assert.match(message, /docs\/gate2-review-decision-record\.md/);
  assert.match(message, /screenshots, no-cut recordings, and human judgment/);
});

test("WP-40 guard allows only an explicit PASS decision", () => {
  assert.equal(getWp38GuardResult("PASS").allowed, true);
  assert.equal(getWp38GuardResult("SMALL_FIX").allowed, false);
  assert.equal(getWp38GuardResult("FAIL").allowed, false);
  assert.equal(getWp38GuardResult("UNKNOWN").allowed, false);
});
