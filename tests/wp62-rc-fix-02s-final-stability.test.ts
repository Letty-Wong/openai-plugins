import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { beats } from "../src/content/beats";
import { resolveStageTarget } from "../src/presentation/spatial-lab/stage-target";

function nextBeatId(beatId: string) {
  const index = beats.findIndex((beat) => beat.id === beatId);
  return beats[index + 1]?.id;
}

function targetSnapshot(target: ReturnType<typeof resolveStageTarget>) {
  return {
    actors: target.actors,
    artifacts: target.artifacts,
    camera: target.camera,
    portal: target.portal,
    world: {
      lightingMode: target.world.lightingMode,
      motionState: target.world.motionState,
      tone: target.world.tone
    }
  };
}

test("RC-FIX-02S settles every tween or transition to the final absolute StageTarget", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /function settleAfterPoseTween/);
  assert.match(runtimeSource, /const interruptedActivePlayback = isPlaybackActiveRef\.current/);
  assert.match(runtimeSource, /applyPoseTarget\(root, finalTarget, 0\)/);
  assert.match(runtimeSource, /applyPoseTarget\(root, target, 0\)/);
  assert.match(runtimeSource, /onTransitionSettled\?\.\(target\.beatId\)/);
  assert.doesNotMatch(runtimeSource, /eventCallback\("onComplete"/);
});

test("RC-FIX-02S avoids snap flashes when a stable Beat interrupts active playback", () => {
  const runtimeSource = readFileSync("src/presentation/spatial-lab/PoseTransitionRuntime.tsx", "utf8");

  assert.match(runtimeSource, /movementKind === "stable"\) return interruptedActivePlayback \? 0\.24 : 0/);
  assert.match(runtimeSource, /isPlaybackActiveRef\.current = \(playback \? 0\.22 : duration\) > 0/);
  assert.match(runtimeSource, /isPlaybackActiveRef\.current = false/);
  assert.equal(nextBeatId("02.1"), "02.2");
  assert.equal(nextBeatId("03.2"), "03.3");
  assert.equal(nextBeatId("16.1"), "16.2");
});

test("RC-FIX-02S locks visible stage data during 15.8 to 16.1 transition playback", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");

  assert.match(labSource, /function shouldLockVisibleTarget/);
  assert.match(labSource, /previousTarget\.beatId === "15\.8" && target\.beatId === "16\.1"/);
  assert.match(labSource, /const visibleTarget = lockedVisibleTarget \?\? pendingRenderLockTarget \?\? target/);
  assert.match(labSource, /<WorldTypography target=\{visibleTarget\} runtimeTarget=\{target\}/);
  assert.match(labSource, /<PoseTransitionRuntime[\s\S]*onTransitionSettled=\{handleTransitionSettled\}/);
});

test("RC-FIX-02S uses the real 14 to 15 pair and a typography handoff cue", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const cssSource = readFileSync("src/styles/spatial-lab.css", "utf8");

  assert.equal(nextBeatId("14.7"), "15.1");
  assert.match(labSource, /function getTypographyCue/);
  assert.match(labSource, /beatId === "15\.1"\) return "scene15-enter"/);
  assert.match(labSource, /beatId === "15\.8"\) return "freeze-enter"/);
  assert.match(cssSource, /data-typography-cue="scene15-enter"/);
  assert.match(cssSource, /@keyframes rc-fix-02s-typography-enter/);
  assert.match(cssSource, /90vh/);
  assert.match(cssSource, /clip-path: inset\(0 0 100% 0\)/);
});

test("RC-FIX-02S preserves FT-02 endpoint equality for the locked transition", () => {
  const freeze = resolveStageTarget("15.8");
  const safety = resolveStageTarget("16.1");
  const plan = safety.transitionPlan;

  assert.ok(plan && "states" in plan);
  assert.deepEqual(
    targetSnapshot({ ...freeze, ...plan.states[0] }),
    targetSnapshot(freeze)
  );
  assert.deepEqual(
    targetSnapshot({ ...safety, ...plan.states[plan.states.length - 1] }),
    targetSnapshot(safety)
  );
});

test("RC-FIX-02S keeps 02.1 to 03.1 to next on the persistent early shell", () => {
  const labSource = readFileSync("src/presentation/spatial-lab/SpatialLabClientStage.tsx", "utf8");
  const early = resolveStageTarget("03.1");
  const next = resolveStageTarget("03.2");

  assert.equal(nextBeatId("03.1"), "03.2");
  assert.equal(early.actors["actor.judgement-question"].actorId, next.actors["actor.judgement-question"].actorId);
  assert.equal(early.actors["actor.judgement-question"].visible, true);
  assert.equal(next.actors["actor.judgement-question"].visible, true);
  assert.match(labSource, /data-actor-geometry="judgement-question"/);
  assert.match(labSource, /<TrendTrackGreybox \/>/);
  assert.match(labSource, /<GapConsequenceGreybox \/>/);
});
