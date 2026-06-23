import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-30R mounts a SpatialStage graybox instead of page-chain layers", () => {
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const spatialStageSource = readFileSync("src/presentation/stage/SpatialStage.tsx", "utf8");
  const poseSource = readFileSync("src/presentation/stage/spatial-poses.ts", "utf8");
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(visualStageSource, /import \{ SpatialStage \}/);
  assert.match(visualStageSource, /<SpatialStage resolved=\{resolved\} \/>/);
  assert.match(visualStageSource, /data-spatial-mode="world-camera-graybox"/);
  assert.doesNotMatch(visualStageSource, /import \{ ScrollNarrativeLayer \}/);
  assert.doesNotMatch(visualStageSource, /<ScrollNarrativeLayer resolved=\{resolved\} \/>/);

  assert.match(spatialStageSource, /data-spatial-stage="world-camera-graybox"/);
  assert.match(spatialStageSource, /function WorldCamera/);
  assert.match(spatialStageSource, /data-camera-pose-id=\{cameraPose\.poseId\}/);
  assert.match(spatialStageSource, /data-beat-movement-kind=\{movementKind\}/);
  assert.match(poseSource, /camera\.horizontal-product/);
  assert.match(poseSource, /camera\.z-forward-safety/);
  assert.match(poseSource, /camera\.z-back-finale/);
  assert.match(poseSource, /"09\.1"[\s\S]*"16\.1"[\s\S]*"21\.1"/);

  assert.match(presentationCss, /\.spatial-stage\s*\{/);
  assert.match(presentationCss, /\.world-camera\s*\{/);
  assert.match(presentationCss, /--camera-x/);
  assert.match(presentationCss, /--camera-z/);
  assert.match(presentationCss, /\.spatial-route-anchor\.active/);
});

test("WP-30R leaves legacy page-chain sources as reference only", () => {
  const layerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");

  assert.match(layerSource, /scroll-continuum-shell/);
  assert.match(layerSource, /scroll-flow-field/);
  assert.match(layerSource, /scroll-curtain-field/);
  assert.doesNotMatch(visualStageSource, /scroll-continuum-shell/);
  assert.doesNotMatch(visualStageSource, /scroll-flow-field/);
  assert.doesNotMatch(visualStageSource, /scroll-curtain-field/);
});
