import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";

test("RC-FIX-02 gives 08.7 to 09.1 an internal product-turn state plan", () => {
  const turn = resolveStageTarget("09.1");
  const plan = turn.transitionPlan;

  assert.equal(plan?.id, "transition-plan.ft01.product-turn");
  assert.equal(plan?.fromBeatId, "08.7");
  assert.equal(plan?.toBeatId, "09.1");
  assert.ok(plan && "states" in plan);
  assert.deepEqual(plan.states.map((state) => state.id), [
    "state.ft01.A.capability-core",
    "state.ft01.B.product-window-opening",
    "state.ft01.C.product-source-station"
  ]);
  assert.equal(plan.states[0].actors["actor.product-stage"].actorId, "actor.product-stage");
  assert.equal(plan.states[1].actors["actor.product-stage"].visible, true);
  assert.equal(plan.states[2].actors["actor.product-stage"].visible, true);
});

test("RC-FIX-02 compiles spatial states into one continuous runtime timeline", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /function compileSpatialStatePlan/);
  assert.match(runtimeSource, /timeline\.addLabel\(state\.id, cursor\)/);
  assert.match(runtimeSource, /addPoseTargetToTimeline\(root, timeline, state, duration, state\.id\)/);
  assert.doesNotMatch(runtimeSource, /playNextState|interpolateSpatialState/);
  assert.doesNotMatch(runtimeSource, /eventCallback\("onComplete"/);
});

test("RC-FIX-02 gives scenes 05, 06, and 07 distinct local ledger motion", () => {
  const overview = resolveStageTarget("05.2");
  const openSource = resolveStageTarget("06.1");
  const compression = resolveStageTarget("07.1");

  assert.equal(overview.actors["actor.integration-ring"].geometry.role, "ledger-overview");
  assert.equal(openSource.actors["actor.integration-ring"].geometry.role, "open-source-expansion");
  assert.equal(compression.actors["actor.integration-ring"].geometry.role, "repetition-compression");
  assert.notEqual(overview.actors["actor.ledger-dial"].x, openSource.actors["actor.ledger-dial"].x);
  assert.notEqual(openSource.actors["actor.ledger-dial"].scale, compression.actors["actor.ledger-dial"].scale);
  assert.equal(openSource.actors["actor.source-packet"].cameraPresence, "support");
  assert.equal(compression.actors["actor.output-cards"].cameraPresence, "support");
});

test("RC-FIX-02 differentiates safety entry from data/tool checking", () => {
  const entry = resolveStageTarget("16.1");
  const checking = resolveStageTarget("17.1");
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.equal(entry.actors["actor.safety-boundary"].cameraPresence, "featured");
  assert.equal(checking.actors["actor.safety-boundary"].cameraPresence, "featured");
  assert.equal(checking.actors["actor.source-packet"].cameraPresence, "support");
  assert.notEqual(entry.actors["actor.integration-ring"].x, checking.actors["actor.integration-ring"].x);
  assert.match(cssSource, /data-current-beat-id\^="17\."\][\s\S]*data-safety-node-id="data"/);
  assert.match(cssSource, /data-current-beat-id\^="17\."\][\s\S]*data-safety-node-id="tool"/);
});

test("RC-FIX-02 keeps boundary nodes alive into the diagnostic handoff", () => {
  const reviewEnd = resolveStageTarget("18.9");
  const radarStart = resolveStageTarget("19.1");

  assert.equal(reviewEnd.safetyNodes.filter((node) => node.visible).length, 4);
  assert.equal(radarStart.safetyNodes.filter((node) => node.visible).length, 4);
  assert.equal(radarStart.actors["actor.safety-boundary"].cameraPresence, "support");
});

test("RC-FIX-02 keeps 20 to 21 scale led by camera, not ActionPath self-scale", () => {
  const action = resolveStageTarget("20.10");
  const finale = resolveStageTarget("21.1");

  assert.ok(action.actors["actor.action-path"].scale <= 1.05);
  assert.ok(Math.abs(finale.actors["actor.action-path"].scale - action.actors["actor.action-path"].scale) <= 0.08);
  assert.notEqual(action.camera.z, finale.camera.z);
  assert.notEqual(action.camera.scale, finale.camera.scale);
});

test("RC-FIX-02 keeps early judgement geometry in one persistent shell", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.match(labSource, /data-judgement-variant=\{variant\}/);
  assert.match(labSource, /<TrendTrackGreybox \/>/);
  assert.doesNotMatch(labSource, /return <TrendTrackGreybox \/>/);
  assert.match(cssSource, /\.spatial-lab-judgement-stack\[data-judgement-variant="trend"\]/);
});
