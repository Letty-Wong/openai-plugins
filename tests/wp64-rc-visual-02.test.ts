import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("RC-VISUAL-02 keeps visual polish scoped to existing V4 stage styling", () => {
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
  const targetSource = readFileSync("src/presentation/spatial-lab/stage-target.ts", "utf8");

  assert.match(cssSource, /radial-gradient\(circle at 16% 18%, rgba\(214, 95, 81, 0\.16\)/);
  assert.match(cssSource, /\.product-visual-backplate/);
  assert.match(cssSource, /\.safety-control-field/);
  assert.match(cssSource, /\.spatial-lab-artifact\[data-artifact-mode="department-output"\]/);
  assert.match(cssSource, /\.spatial-lab-viewport\[data-current-beat-id="21\.1"\] \.spatial-lab-cta-dock-geometry/);

  assert.match(runtimeSource, /function playSpatialStatePlan/);
  assert.doesNotMatch(runtimeSource, /fromTo/);
  assert.match(targetSource, /transition-plan\.ft02\.forward-safety-portal/);
  assert.match(targetSource, /transition-plan\.ft04\.finale-pullback-loop/);
});

test("RC-VISUAL-02 keeps review mode engineering labels hidden", () => {
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(cssSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.artifact-debug-id/);
  assert.match(cssSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.world-debug-role/);
  assert.match(cssSource, /\.spatial-lab-root\[data-lab-mode="review"\] \.spatial-lab-transition-readout/);
});
