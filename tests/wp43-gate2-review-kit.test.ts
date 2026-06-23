import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { buildGate2ReviewKit } from "../scripts/gate2-review-kit";

test("WP-43 exposes a Gate 2 review kit command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["review:gate2:kit"], "tsx scripts/gate2-review-kit.ts");
});

test("WP-43 review kit includes the required command sequence", () => {
  const kit = buildGate2ReviewKit();

  assert.match(kit, /npm run preflight:gate2/);
  assert.match(kit, /npm run review:gate2/);
  assert.match(kit, /npm run audit:materials/);
  assert.match(kit, /npm run status:gates/);
});

test("WP-43 review kit includes recording and screenshot evidence filenames", () => {
  const kit = buildGate2ReviewKit();

  assert.match(kit, /gate2-a-08-09-horizontal-turn\.mp4/);
  assert.match(kit, /gate2-b-15-16-forward-portal\.mp4/);
  assert.match(kit, /gate2-c-20-21-dolly-back\.mp4/);
  assert.match(kit, /gate2-d-reduced-motion\.mp4/);
  assert.match(kit, /1366\/09\.1-horizontal-turn\.png/);
  assert.match(kit, /1920\/21\.1-dolly-back\.png/);
});

test("WP-43 review kit keeps Gate 2 and material gates unapproved", () => {
  const kit = buildGate2ReviewKit();

  assert.match(kit, /does not approve Gate 2/);
  assert.match(kit, /does not start WP-38/);
  assert.match(kit, /does not open material gates/);
  assert.match(kit, /Overall status: `READY_FOR_HUMAN_REVIEW`/);
  assert.match(kit, /Gate 2 中文验收清单/);
});
