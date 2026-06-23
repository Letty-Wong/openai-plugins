import assert from "node:assert/strict";
import test from "node:test";
import { beats } from "../src/content/beats";
import {
  getActorCue,
  getLeadActorId,
  getStageActId,
  getStageCue
} from "../src/presentation/stage/stage-script";
import {
  actorAppearsInBeat,
  getActorLifecycle,
  stageActors
} from "../src/presentation/stage/stage-actors";
import type { StageActorId } from "../src/presentation/stage/stage-actors";

test("WP-19R defines the full stage cast before changing visual rendering", () => {
  const actorIds = stageActors.map((actor) => actor.id);
  const expectedActorIds: readonly StageActorId[] = [
    "stage.scroll-world",
    "actor.integration-ring",
    "actor.judgement-question",
    "actor.ledger-dial",
    "actor.product-stage",
    "actor.source-packet",
    "actor.fact-to-benefit",
    "actor.output-cards",
    "actor.safety-boundary",
    "actor.human-review",
    "actor.action-confirm-gate",
    "actor.scenario-radar",
    "actor.action-path",
    "actor.cta-dock",
    "actor.global-route",
    "actor.presenter-controls"
  ];

  assert.deepEqual(actorIds, expectedActorIds);
});

test("WP-19R maps beats to acts and lead actors like a stage script", () => {
  assert.equal(getStageActId("01.1"), "act-judgement");
  assert.equal(getLeadActorId("01.1"), "actor.judgement-question");

  assert.equal(getStageActId("05.1"), "act-ledger");
  assert.equal(getLeadActorId("05.1"), "actor.ledger-dial");

  assert.equal(getStageActId("08.7"), "act-product-output");
  assert.equal(getLeadActorId("09.2"), "actor.product-stage");

  assert.equal(getStageActId("16.3"), "act-safety");
  assert.equal(getLeadActorId("18.7"), "actor.safety-boundary");

  assert.equal(getStageActId("19.1"), "act-action-cta");
  assert.equal(getLeadActorId("19.1"), "actor.scenario-radar");
  assert.equal(getLeadActorId("19.9"), "actor.action-path");
  assert.equal(getLeadActorId("20.10"), "actor.action-path");
  assert.equal(getLeadActorId("21.7"), "actor.cta-dock");
});

test("WP-19R keeps actor lifecycle continuous across the full script", () => {
  for (const actor of stageActors) {
    const lifecycles = beats.map((beat) => getActorLifecycle(actor.id, beat.id));
    const enterCount = lifecycles.filter((lifecycle) => lifecycle.phase === "enter").length;
    const exitCount = lifecycles.filter((lifecycle) => lifecycle.phase === "exit").length;
    const visibleBeatIds = beats
      .filter((beat) => actorAppearsInBeat(actor.id, beat.id))
      .map((beat) => beat.id);

    assert.equal(enterCount, 1, `${actor.id} should enter exactly once`);
    assert.equal(exitCount, 1, `${actor.id} should exit exactly once`);
    assert.equal(visibleBeatIds[0], actor.firstBeatId, `${actor.id} first visible beat`);
    assert.equal(visibleBeatIds.at(-1), actor.lastBeatId, `${actor.id} last visible beat`);
  }
});

test("WP-19R marks repeated visual objects as hold, not repeated entrances", () => {
  assert.equal(getActorCue("actor.integration-ring", "03.5").lifecycle.phase, "hold");
  assert.equal(getActorCue("actor.integration-ring", "16.3").lifecycle.phase, "hold");
  assert.equal(getActorCue("actor.integration-ring", "21.8").lifecycle.phase, "hold");

  assert.equal(getActorCue("actor.product-stage", "08.7").lifecycle.phase, "enter");
  assert.equal(getActorCue("actor.product-stage", "09.2").lifecycle.phase, "hold");
  assert.equal(getActorCue("actor.product-stage", "16.3").lifecycle.phase, "hold");
  assert.equal(getActorCue("actor.product-stage", "21.8").lifecycle.phase, "hold");

  assert.equal(getActorCue("actor.action-path", "19.9").lifecycle.phase, "enter");
  assert.equal(getActorCue("actor.action-path", "20.10").lifecycle.phase, "hold");
  assert.equal(getActorCue("actor.action-path", "21.6").lifecycle.phase, "exit");
});

test("WP-19R separates lead, support, background, controls, and offstage actors", () => {
  const productCue = getStageCue("11.6");
  const safetyCue = getStageCue("18.7");
  const finaleCue = getStageCue("21.8");

  assert.equal(productCue.leadActorId, "actor.product-stage");
  assert.equal(getActorCue("actor.fact-to-benefit", "11.6").role, "support");
  assert.equal(getActorCue("actor.scenario-radar", "11.6").role, "offstage");

  assert.equal(safetyCue.leadActorId, "actor.safety-boundary");
  assert.equal(getActorCue("actor.human-review", "18.7").role, "support");
  assert.equal(getActorCue("actor.action-confirm-gate", "18.7").role, "support");

  assert.equal(finaleCue.leadActorId, "actor.cta-dock");
  assert.equal(getActorCue("actor.presenter-controls", "21.8").role, "control");
  assert.equal(getActorCue("actor.product-stage", "21.8").role, "support");
});
