import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");
const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
const stageTargetSource = readFileSync("src/presentation/spatial-lab/stage-target.ts", "utf8");

test("RC-VISUAL-02 premium pass uses shared V4 visual tokens", () => {
  assert.match(cssSource, /--v4-bg-void: #080706/);
  assert.match(cssSource, /--v4-bg-warm: #e7dac4/);
  assert.match(cssSource, /--v4-signal: #d94f42/);
  assert.match(cssSource, /--v4-radius-large: 28px/);
});

test("RC-VISUAL-02 premium pass styles the seven approved component classes", () => {
  [
    ".spatial-lab-world-atmosphere",
    ".spatial-lab-ring-geometry",
    ".spatial-lab-product-geometry",
    ".spatial-lab-artifact",
    ".spatial-lab-safety-boundary-geometry",
    ".spatial-lab-action-path-geometry",
    ".spatial-lab-cta-dock-geometry"
  ].forEach((selector) => {
    assert.match(cssSource, new RegExp(selector.replace(".", "\\.")));
  });
});

test("RC-VISUAL-02 premium pass keeps review mode engineering labels hidden", () => {
  assert.match(cssSource, /data-lab-mode="review"[\s\S]*\.artifact-debug-id/);
  assert.match(cssSource, /data-lab-mode="review"[\s\S]*\.world-debug-role/);
  assert.doesNotMatch(cssSource, /artifact\.F01|camera\.xxx|stage-target|PLACEHOLDER/);
});

test("RC-VISUAL-02 premium pass does not rewrite motion or StageTarget models", () => {
  assert.match(runtimeSource, /playSpatialStatePlan/);
  assert.match(stageTargetSource, /state\.ft02\.A\.frozen-compression-field/);
  assert.doesNotMatch(runtimeSource, /framer-motion|new Portal|TunnelRuntime/);
});
