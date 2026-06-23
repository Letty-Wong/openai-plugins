import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { buildGate2ReviewManifest } from "../scripts/gate2-review-manifest";

test("WP-36R exposes a Gate 2 review manifest command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["review:gate2"], "tsx scripts/gate2-review-manifest.ts");
});

test("WP-36R generates the Gate 2 transition review checklist from spatial cues", () => {
  const manifest = buildGate2ReviewManifest();

  assert.match(manifest, /Gate 2 中文验收清单/);
  assert.match(manifest, /spatialTransitionCues/);
  assert.match(manifest, /`09.1` \| `turn-horizontal-product`/);
  assert.match(manifest, /`16.1` \| `portal-forward-safety`/);
  assert.match(manifest, /`21.1` \| `dolly-back-finale`/);
  assert.match(manifest, /camera\.turn-horizontal-product/);
  assert.match(manifest, /camera\.portal-forward-safety/);
  assert.match(manifest, /camera\.dolly-back-finale/);
});

test("WP-36R keeps manual review, viewport, and material gates explicit", () => {
  const manifest = buildGate2ReviewManifest();

  assert.match(manifest, /1366 x 768/);
  assert.match(manifest, /1920 x 1080/);
  assert.match(manifest, /http:\/\/localhost:3000#scene-08\/08.7/);
  assert.match(manifest, /http:\/\/localhost:3000#scene-20\/20.10/);
  assert.match(manifest, /无剪辑录屏脚本/);
  assert.match(manifest, /旧 page-chain 层不得重新挂回观众主舞台/);
  assert.match(manifest, /产品必须继续是 `shower-h1-placeholder`/);
  assert.match(manifest, /CTA 和二维码必须继续是 placeholder/);
  assert.match(manifest, /不得出现假 MOQ、价格、认证、交期、质保、名额或日期/);
});
