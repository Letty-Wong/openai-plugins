import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";

test("WP-58 FT-02 defines five absolute portal waypoints", () => {
  const portal = resolveStageTarget("16.1");
  const plan = portal.transitionPlan;

  assert.equal(plan?.id, "transition-plan.ft02.forward-safety-portal");
  assert.deepEqual(plan?.waypoints.map((waypoint) => waypoint.id), ["W0", "W1", "W2", "W3", "W4"]);
  assert.deepEqual(plan?.waypoints.map((waypoint) => waypoint.label), [
    "frozen-output",
    "portal-preview",
    "approach-ring",
    "cross-ring-edge",
    "establish-safety-world"
  ]);
  plan?.waypoints.forEach((waypoint) => {
    assert.equal(typeof waypoint.target.camera.x, "number", waypoint.id);
    assert.equal(waypoint.target.actors["actor.integration-ring"].actorId, "actor.integration-ring", waypoint.id);
    assert.equal(waypoint.target.actors["actor.product-stage"].actorId, "actor.product-stage", waypoint.id);
  });
});

test("WP-58 FT-02 creates a real portal preview and parallax depth", () => {
  const plan = resolveStageTarget("16.1").transitionPlan;
  assert.ok(plan);

  const [frozen, preview, approach, cross, establish] = plan.waypoints;

  assert.equal(frozen.target.world.motionState, "frozen");
  assert.equal(preview.target.portal.visible, true);
  assert.ok(preview.target.portal.opacity > 0.5);
  assert.ok(approach.target.camera.z > preview.target.camera.z);
  assert.ok(cross.target.camera.z > approach.target.camera.z);
  assert.ok(cross.target.portal.radius > approach.target.portal.radius);
  assert.ok(cross.target.portal.oldWorldOpacity < approach.target.portal.oldWorldOpacity);
  assert.ok(Math.abs(cross.target.artifacts["artifact.F01"].x) > Math.abs(approach.target.artifacts["artifact.F01"].x));
  assert.ok(Math.abs(cross.target.artifacts["artifact.F02"].x) > Math.abs(approach.target.artifacts["artifact.F02"].x));
  assert.equal(establish.target.world.motionState, "settled");
  assert.equal(establish.target.actors["actor.integration-ring"].geometry.role, "safety-boundary");
});

test("WP-58 FT-02 keeps direct 16.1 entry as an absolute endpoint", () => {
  const portal = resolveStageTarget("16.1");

  assert.equal(portal.portal.visible, false);
  assert.equal(portal.world.motionState, "settled");
  assert.equal(portal.actors["actor.integration-ring"].cameraPresence, "featured");
  assert.equal(portal.actors["actor.product-stage"].cameraPresence, "support");
});

test("WP-58 FT-02 reduced motion keeps identity and avoids large rotation", () => {
  const reduced = resolveStageTarget("16.1", { reducedMotion: true });

  assert.equal(reduced.reducedMotion, true);
  assert.equal(reduced.camera.rotationX, 0);
  assert.equal(reduced.camera.rotationY, 0);
  assert.equal(reduced.camera.rotationZ, 0);
  assert.ok((reduced.transitionPlan?.waypoints.length ?? 0) === 5);
  assert.equal(reduced.actors["actor.integration-ring"].actorId, "actor.integration-ring");
  assert.equal(reduced.actors["actor.product-stage"].actorId, "actor.product-stage");
});

test("WP-58 FT-02 extends the existing PoseTransitionRuntime instead of adding another owner", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(runtimeSource, /function playTransitionPlan/);
  assert.match(runtimeSource, /getTransitionPlayback/);
  assert.match(runtimeSource, /previousTarget\.beatId === "15\.8" && target\.beatId === "16\.1"/);
  assert.match(runtimeSource, /previousTarget\.beatId === "16\.1" && target\.beatId === "15\.8"/);
  assert.match(labSource, /function PortalPreviewLayer/);
  assert.doesNotMatch(labSource, /Second.*Runtime|Portal.*Runtime|Tunnel.*Runtime/);
});
