import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getSpatialPoseForActor } from "../src/presentation/stage/spatial-poses";

test("WP-32R applies SpatialPose targets to persistent actor DOM", () => {
  const persistentLayerSource = readFileSync("src/presentation/stage/PersistentActorLayer.tsx", "utf8");

  assert.equal(getSpatialPoseForActor("actor.integration-ring", 9).poseId, "pose.integration-ring.product");
  assert.equal(getSpatialPoseForActor("actor.product-stage", 16).poseId, "pose.product-stage.safety");
  assert.match(persistentLayerSource, /data-spatial-function/);
  assert.match(persistentLayerSource, /data-spatial-occlusion/);
  assert.match(persistentLayerSource, /data-spatial-pose-id/);
  assert.match(persistentLayerSource, /--spatial-pose-x/);
  assert.match(persistentLayerSource, /--spatial-pose-y/);
  assert.match(persistentLayerSource, /--spatial-pose-z/);
  assert.match(persistentLayerSource, /--spatial-pose-scale/);
  assert.match(persistentLayerSource, /--spatial-pose-opacity/);
});

test("WP-32R lets CSS consume SpatialPose without reviving page-chain runtime ownership", () => {
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(presentationCss, /\.persistent-actor\s*\{[\s\S]*translate3d\(var\(--spatial-pose-x\)/);
  assert.match(presentationCss, /\.persistent-actor\s*\{[\s\S]*scale\(var\(--spatial-pose-scale\)\)/);
  assert.match(presentationCss, /data-spatial-occlusion="foreground"/);
  assert.match(presentationCss, /data-spatial-occlusion="background"/);
  assert.match(presentationCss, /data-reduced-motion="true"[\s\S]*\.persistent-actor\s*\{[\s\S]*transition-duration:\s*0ms/);
  assert.match(presentationCss, /--actor-role-opacity/);
  assert.doesNotMatch(runtimeSource, /scroll-continuum/);
  assert.doesNotMatch(runtimeSource, /scroll-flow/);
  assert.doesNotMatch(runtimeSource, /scroll-curtain/);
});
