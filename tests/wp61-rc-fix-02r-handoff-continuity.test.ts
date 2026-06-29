import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { beats } from "../src/content/beats";
import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";
import type { StageActorId } from "../src/presentation/stage/stage-actors";

function nextBeatId(beatId: string) {
  const index = beats.findIndex((beat) => beat.id === beatId);
  return beats[index + 1]?.id;
}

function screenPose(target: ReturnType<typeof resolveStageTarget>, actorId: StageActorId) {
  const actor = target.actors[actorId];
  return {
    x: target.camera.x + actor.x,
    y: target.camera.y + actor.y
  };
}

function screenDelta(
  a: ReturnType<typeof resolveStageTarget>,
  b: ReturnType<typeof resolveStageTarget>,
  actorId: StageActorId
) {
  const first = screenPose(a, actorId);
  const second = screenPose(b, actorId);
  return Math.hypot(first.x - second.x, first.y - second.y);
}

test("RC-FIX-02R locks the real handoff pairs", () => {
  assert.equal(nextBeatId("03.7"), "04.1");
  assert.equal(nextBeatId("07.8"), "08.1");
  assert.equal(nextBeatId("16.1"), "16.2");
  assert.equal(nextBeatId("17.9"), "18.1");
});

test("RC-FIX-02R keeps Scene 03 final from flashing back to judgement in Scene 04", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(labSource, /function getEarlyJudgementVisualState/);
  assert.match(labSource, /beatId\.startsWith\("04\."\)\) return "gap"/);
  assert.match(labSource, /<TrendTrackGreybox \/>/);
  assert.match(labSource, /<GapConsequenceGreybox \/>/);
  assert.doesNotMatch(labSource, /beatId === "04\.7"[\s\S]*\? "gap"/);
  assert.match(cssSource, /\.spatial-lab-judgement-stack:not\(\[data-judgement-variant="gap"\]\) \.spatial-lab-gap-geometry/);
});

test("RC-FIX-02R gives 07.8 to 08.1 a local capability accumulation plan", () => {
  const compression = resolveStageTarget("07.8");
  const capability = resolveStageTarget("08.1");

  assert.equal(capability.transitionPlan?.id, "transition-plan.rcfix02r.ledger-to-capability");
  assert.equal(capability.transitionPlan?.fromBeatId, "07.8");
  assert.equal(capability.transitionPlan?.toBeatId, "08.1");
  assert.ok(screenDelta(compression, capability, "actor.integration-ring") <= 24);
  assert.equal(capability.actors["actor.product-stage"].cameraPresence, "offscreen");
});

test("RC-FIX-02R proves 08.7 to 09.1 endpoint equality with screen-composed pose", () => {
  const capabilityCore = resolveStageTarget("08.7");
  const productStation = resolveStageTarget("09.1");
  const plan = productStation.transitionPlan;

  assert.ok(plan && "states" in plan);

  const stateA = { ...capabilityCore, ...plan.states[0] };
  const stateC = { ...productStation, ...plan.states[plan.states.length - 1] };

  assert.ok(screenDelta(capabilityCore, stateA, "actor.integration-ring") <= 8);
  assert.ok(screenDelta(capabilityCore, stateA, "actor.product-stage") <= 12);
  assert.ok(screenDelta(productStation, stateC, "actor.integration-ring") <= 8);
  assert.ok(screenDelta(productStation, stateC, "actor.product-stage") <= 12);
});

test("RC-FIX-02R keeps 16.1 to 16.2 on the same safety shell", () => {
  const entry = resolveStageTarget("16.1");
  const next = resolveStageTarget("16.2");

  assert.equal(next.actors["actor.safety-boundary"].cameraPresence, "featured");
  assert.equal(entry.safetyNodes.filter((node) => node.visible).length, 4);
  assert.equal(next.safetyNodes.filter((node) => node.visible).length, 4);
  assert.equal(screenDelta(entry, next, "actor.integration-ring"), 0);
  assert.equal(screenDelta(entry, next, "actor.product-stage"), 0);
  assert.equal(screenDelta(entry, next, "actor.safety-boundary"), 0);
});

test("RC-FIX-02R gives 17.9 to 18.1 a review handoff without first-mounting actors", () => {
  const dataTool = resolveStageTarget("17.9");
  const review = resolveStageTarget("18.1");
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");

  assert.equal(review.transitionPlan?.id, "transition-plan.rcfix02r.review-handoff");
  assert.equal(review.transitionPlan?.fromBeatId, "17.9");
  assert.equal(dataTool.actors["actor.human-review"].cameraPresence, "offscreen");
  assert.equal(dataTool.actors["actor.action-confirm-gate"].cameraPresence, "offscreen");
  assert.equal(review.actors["actor.human-review"].cameraPresence, "featured");
  assert.equal(review.actors["actor.action-confirm-gate"].cameraPresence, "support");
  assert.equal(dataTool.safetyNodes.filter((node) => node.visible).length, 4);
  assert.equal(review.safetyNodes.filter((node) => node.visible).length, 4);
  assert.match(runtimeSource, /previousTarget\.beatId === "17\.9" && target\.beatId === "18\.1"/);
});
