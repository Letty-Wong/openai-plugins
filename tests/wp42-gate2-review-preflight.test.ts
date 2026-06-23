import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { buildGate2ReviewPreflight, getGate2ReviewPreflightChecks } from "../scripts/gate2-review-preflight";

test("WP-42 exposes a Gate 2 review preflight command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["preflight:gate2"], "tsx scripts/gate2-review-preflight.ts");
});

test("WP-42 reports current project as ready for human review but not accepted", () => {
  const preflight = buildGate2ReviewPreflight();

  assert.match(preflight, /Overall status: `READY_FOR_HUMAN_REVIEW`/);
  assert.match(preflight, /Gate 2 is awaiting human review/);
  assert.match(preflight, /WP-38 remains blocked before review/);
  assert.match(preflight, /Materials remain placeholders/);
});

test("WP-42 preflight keeps implementation and material gates closed", () => {
  const preflight = buildGate2ReviewPreflight();

  assert.match(preflight, /It does not mean Gate 2 has passed/);
  assert.match(preflight, /It does not authorize WP-38 implementation/);
  assert.match(preflight, /It does not open real product, CTA, QR, or business material gates/);
});

test("WP-42 exposes check objects for review automation", () => {
  const checks = getGate2ReviewPreflightChecks();

  assert.equal(checks.every((check) => check.ok), true);
  assert.equal(checks.some((check) => check.title === "Human review package is the next action"), true);
  assert.equal(checks.some((check) => check.title === "Decision record is ready"), true);
});
