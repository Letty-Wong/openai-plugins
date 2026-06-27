import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { domTreeText, ownershipRows } from "../src/presentation/spatial-lab/SpatialLabStage";
import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";

test("WP-48 exposes /spatial-lab as the V4 debug alias route", () => {
  const pageSource = readFileSync("app/spatial-lab/page.tsx", "utf8");
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(pageSource, /PresentationStageV4/);
  assert.match(pageSource, /searchParams/);
  assert.match(pageSource, /beatById\.has/);
  assert.match(labSource, /data-spatial-lab-version="V4"/);
  assert.match(labSource, /data-owner="WorldCamera"/);
  assert.match(labSource, /data-owner="WorldSpace"/);
  assert.match(labSource, /data-owner="PersistentActors"/);
});

test("WP-48 keeps the real hierarchy WorldCamera -> WorldSpace -> PersistentActors", () => {
  assert.match(
    domTreeText,
    /spatial-lab-world-camera[\s\S]*spatial-lab-world-space[\s\S]*spatial-lab-persistent-actors/
  );
  assert.match(domTreeText, /spatial-lab-artifact-system/);
  assert.match(domTreeText, /spatial-lab-screen-copy/);
  assert.match(domTreeText, /spatial-lab-actor\[data-stage-actor-id\]\[data-target-pose-id\]/);
});

test("WP-48 assigns attribute ownership to exactly one structural layer", () => {
  assert.deepEqual(
    ownershipRows.map((row) => row.layer),
    [
      "ScreenViewport",
      "WorldCamera",
      "WorldSpace",
      "PersistentActors",
      "ArtifactSystem",
      "ScreenCopyLayer",
      "PoseTransitionRuntime"
    ]
  );
  assert.match(ownershipRows.find((row) => row.layer === "WorldCamera")?.owns ?? "", /camera DOM/);
  assert.match(ownershipRows.find((row) => row.layer === "PoseTransitionRuntime")?.owns ?? "", /CSS variables/);
});

test("WP-48 spatial lab does not mount the old visual stage or motion runtimes", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");

  assert.doesNotMatch(labSource, /VisualStage/);
  assert.doesNotMatch(labSource, /SpatialStage/);
  assert.doesNotMatch(labSource, /ContinuityMotionRuntime/);
  assert.doesNotMatch(labSource, /StageMotionRuntime/);
  assert.doesNotMatch(runtimeSource, /ContinuityMotionRuntime/);
  assert.doesNotMatch(runtimeSource, /StageMotionRuntime/);
});

test("WP-49 resolves a complete StageTarget from any checked beat without click history", () => {
  const target = resolveStageTarget("16.1");

  assert.equal(target.beatId, "16.1");
  assert.equal(target.movementKind, "spatial");
  assert.equal(target.camera.poseId, "camera.ft02.establish-safety-world");
  assert.equal(target.actors["actor.integration-ring"].actorId, "actor.integration-ring");
  assert.equal(target.actors["actor.product-stage"].actorId, "actor.product-stage");
  assert.equal(target.artifacts["artifact.F01"].artifactId, "artifact.F01");
  assert.equal(target.transition?.id, "transition.15-16.forward-safety-portal");
  assert.equal(target.transitionPlan?.id, "transition-plan.ft02.forward-safety-portal");
});

test("WP-49 reduced motion patch keeps identity and removes camera rotation", () => {
  const normal = resolveStageTarget("21.1");
  const reduced = resolveStageTarget("21.1", { reducedMotion: true });

  assert.equal(reduced.id, "stage-target:21.1:reduced");
  assert.equal(reduced.beatId, normal.beatId);
  assert.equal(reduced.actors["actor.action-path"].actorId, normal.actors["actor.action-path"].actorId);
  assert.equal(reduced.camera.rotationX, 0);
  assert.equal(reduced.camera.rotationY, 0);
  assert.equal(reduced.camera.rotationZ, 0);
});

test("WP-50 spatial lab has one pose runtime and no generic fromTo entrance model", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");

  assert.match(labSource, /PoseTransitionRuntime/);
  assert.doesNotMatch(runtimeSource, /fromTo/);
  assert.match(runtimeSource, /overwrite: "auto"/);
  assert.match(runtimeSource, /movementKind === "stable"/);
});

test("WP-51 SR-04 keeps the ring anchor and product actor identity through 08 to 09", () => {
  const beforeTurn = resolveStageTarget("08.7");
  const turn = resolveStageTarget("09.1");
  const turnRing = turn.actors["actor.integration-ring"];

  assert.equal(turn.transition?.gate, "SR-04");
  assert.equal(turn.transition.acceptanceFocus[0], "FT-01 horizontal product journey endpoint is active");
  assert.equal(beforeTurn.actors["actor.product-stage"].actorId, turn.actors["actor.product-stage"].actorId);
  assert.equal(turn.actors["actor.product-stage"].visible, true);
  assert.equal(turn.actors["actor.integration-ring"].visible, true);
  assert.equal(turn.actors["actor.integration-ring"].cameraPresence, "support");
  assert.equal(turnRing.geometry.role, "product-source-gate");
  assert.equal(turnRing.geometry.segmentProgress.length, 5);
});

test("WP-51 SR-05 uses the FT-02 waypoint plan without changing actor identity", () => {
  const freeze = resolveStageTarget("15.8");
  const portal = resolveStageTarget("16.1");
  const visibleArtifacts = Object.values(portal.artifacts).filter((artifact) => artifact.visible);

  assert.equal(portal.transition?.gate, "SR-05");
  assert.equal(portal.transition.acceptanceFocus[0], "FT-02 forward safety portal waypoints are active");
  assert.equal(freeze.actors["actor.product-stage"].actorId, portal.actors["actor.product-stage"].actorId);
  assert.ok(portal.actors["actor.product-stage"].opacity > 0.5);
  assert.equal(portal.actors["actor.integration-ring"].geometry.role, "safety-boundary");
  assert.ok(visibleArtifacts.length <= 3);
  assert.ok(portal.camera.scale < 2);
  assert.equal(portal.transitionPlan?.waypoints.length, 5);
});

test("WP-51 SR-06 keeps ActionPath identity through the FT-04 final loop endpoint", () => {
  const route = resolveStageTarget("20.10");
  const finale = resolveStageTarget("21.1");

  assert.equal(finale.transition?.gate, "SR-06");
  assert.equal(finale.transition.acceptanceFocus[0], "FT-04 dolly-back loop waypoints are active");
  assert.equal(route.actors["actor.action-path"].actorId, finale.actors["actor.action-path"].actorId);
  assert.equal(finale.actors["actor.action-path"].visible, true);
  assert.equal(finale.transitionPlan?.id, "transition-plan.ft04.finale-pullback-loop");
  assert.equal(finale.actors["actor.integration-ring"].geometry.gap, 0);
  assert.equal(finale.actors["actor.integration-ring"].geometry.role, "final-loop-cta-placeholder");
  assert.equal(finale.product.placeholderOnly, true);
  assert.notEqual(finale.actors["actor.cta-dock"].actorId, finale.actors["actor.action-path"].actorId);
  assert.equal(finale.actors["actor.cta-dock"].cameraPresence, "featured");
});
