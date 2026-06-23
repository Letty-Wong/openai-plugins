import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  getBeatMovementKind,
  getCameraPoseForScene,
  getRoutePhaseForScene,
  getSpatialPoseForActor,
  spatialRouteSegments,
  spatialTransitionBeatIds
} from "../src/presentation/stage/spatial-poses";

test("WP-31R promotes spatial poses into a typed data contract", () => {
  const poseSource = readFileSync("src/presentation/stage/spatial-poses.ts", "utf8");
  const spatialStageSource = readFileSync("src/presentation/stage/SpatialStage.tsx", "utf8");

  assert.equal(spatialRouteSegments.length, 6);
  assert.deepEqual(spatialTransitionBeatIds, ["09.1", "16.1", "21.1"]);
  assert.equal(getRoutePhaseForScene(9), "product");
  assert.equal(getRoutePhaseForScene(16), "safety");
  assert.equal(getRoutePhaseForScene(21), "finale");
  assert.equal(getBeatMovementKind("09.1", 9), "spatial");
  assert.equal(getBeatMovementKind("16.1", 16), "spatial");
  assert.equal(getBeatMovementKind("21.1", 21), "spatial");
  assert.equal(getCameraPoseForScene(9).poseId, "camera.horizontal-product");
  assert.equal(getCameraPoseForScene(16).poseId, "camera.z-forward-safety");
  assert.equal(getCameraPoseForScene(21).poseId, "camera.z-back-finale");
  assert.equal(getSpatialPoseForActor("actor.product-stage", 20).poseId, "pose.product-stage.action");
  assert.equal(getSpatialPoseForActor("actor.cta-dock", 21).poseId, "pose.cta-dock.finale");

  assert.match(poseSource, /export type CameraPose/);
  assert.match(poseSource, /export type SpatialPose/);
  assert.match(poseSource, /export type BeatMovementKind/);
  assert.doesNotMatch(spatialStageSource, /function getCameraPose/);
  assert.doesNotMatch(spatialStageSource, /function getRoutePhase/);
});

test("WP-31R gives persistent actors spatial pose ids", () => {
  const persistentLayerSource = readFileSync("src/presentation/stage/PersistentActorLayer.tsx", "utf8");

  assert.match(persistentLayerSource, /getSpatialPoseForActor/);
  assert.match(persistentLayerSource, /actorSpatialProps/);
  assert.match(persistentLayerSource, /getSpatialPoseForActor\(actorId, resolved\.scene\.sceneNumber\)/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(integrationRingCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(productCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(actionPathCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(ctaCue\.actorId\)\}/);
});

test("WP-31R runtime no longer owns legacy page-chain selectors", () => {
  const runtimeSource = readFileSync("src/presentation/motion/ContinuityMotionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /\.spatial-stage/);
  assert.match(runtimeSource, /\.persistent-actor-layer/);
  assert.match(runtimeSource, /\.integration-geometry/);
  assert.doesNotMatch(runtimeSource, /scroll-narrative-layer/);
  assert.doesNotMatch(runtimeSource, /scroll-continuum/);
  assert.doesNotMatch(runtimeSource, /scroll-flow/);
  assert.doesNotMatch(runtimeSource, /scroll-curtain/);
  assert.doesNotMatch(runtimeSource, /scroll-cinema/);
  assert.doesNotMatch(runtimeSource, /story-spine/);
  assert.doesNotMatch(runtimeSource, /cinematic-route-layer/);
  assert.doesNotMatch(runtimeSource, /continuity-object-layer/);
  assert.doesNotMatch(runtimeSource, /route-map-line-active/);
});
