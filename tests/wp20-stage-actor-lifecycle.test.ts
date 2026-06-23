import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  actorAppearsInBeat,
  getActorLifecycle,
  stageActors
} from "../src/presentation/stage/stage-actors";
import type { StageActorId } from "../src/presentation/stage/stage-actors";

test("WP-20 defines stable actor identities for repeated visual components", () => {
  const actorIds = stageActors.map((actor) => actor.id);

  const requiredActorIds: readonly StageActorId[] = [
      "stage.scroll-world",
      "actor.integration-ring",
      "actor.product-stage",
      "actor.source-packet",
      "actor.fact-to-benefit",
      "actor.output-cards",
      "actor.human-review",
      "actor.action-confirm-gate",
      "actor.scenario-radar",
      "actor.action-path",
      "actor.cta-dock",
      "actor.global-route"
    ];

  assert.equal(requiredActorIds.every((actorId) => actorIds.includes(actorId)), true);

  assert.equal(actorAppearsInBeat("actor.product-stage", "08.7"), true);
  assert.equal(actorAppearsInBeat("actor.product-stage", "21.9"), true);
  assert.equal(actorAppearsInBeat("actor.product-stage", "08.6"), false);
  assert.equal(actorAppearsInBeat("actor.action-path", "19.8"), false);
  assert.equal(actorAppearsInBeat("actor.action-path", "19.9"), true);
  assert.equal(actorAppearsInBeat("actor.action-path", "21.6"), true);
  assert.equal(actorAppearsInBeat("actor.action-path", "21.7"), false);
});

test("WP-20 calculates enter, hold, exit, and off from neighboring beats", () => {
  assert.equal(getActorLifecycle("actor.integration-ring", "01.1").phase, "enter");
  assert.equal(getActorLifecycle("actor.integration-ring", "03.5").phase, "hold");
  assert.equal(getActorLifecycle("actor.integration-ring", "21.9").phase, "exit");

  assert.equal(getActorLifecycle("actor.judgement-question", "01.1").phase, "enter");
  assert.equal(getActorLifecycle("actor.judgement-question", "03.5").phase, "hold");
  assert.equal(getActorLifecycle("actor.judgement-question", "04.7").phase, "exit");

  assert.equal(getActorLifecycle("actor.ledger-dial", "04.7").phase, "off");
  assert.equal(getActorLifecycle("actor.ledger-dial", "05.1").phase, "enter");
  assert.equal(getActorLifecycle("actor.ledger-dial", "08.6").phase, "exit");

  assert.equal(getActorLifecycle("actor.product-stage", "08.7").phase, "enter");
  assert.equal(getActorLifecycle("actor.product-stage", "09.2").phase, "hold");
  assert.equal(getActorLifecycle("actor.product-stage", "21.9").phase, "exit");

  assert.equal(getActorLifecycle("actor.source-packet", "10.1").phase, "enter");
  assert.equal(getActorLifecycle("actor.source-packet", "15.8").phase, "hold");
  assert.equal(getActorLifecycle("actor.source-packet", "19.8").phase, "exit");

  assert.equal(getActorLifecycle("actor.fact-to-benefit", "10.1").phase, "enter");
  assert.equal(getActorLifecycle("actor.fact-to-benefit", "11.6").phase, "hold");
  assert.equal(getActorLifecycle("actor.fact-to-benefit", "15.8").phase, "exit");

  assert.equal(getActorLifecycle("actor.output-cards", "15.8").phase, "enter");
  assert.equal(getActorLifecycle("actor.output-cards", "18.7").phase, "hold");
  assert.equal(getActorLifecycle("actor.output-cards", "18.8").phase, "exit");

  assert.equal(getActorLifecycle("actor.safety-boundary", "16.1").phase, "enter");
  assert.equal(getActorLifecycle("actor.safety-boundary", "18.7").phase, "hold");
  assert.equal(getActorLifecycle("actor.safety-boundary", "21.9").phase, "exit");

  assert.equal(getActorLifecycle("actor.scenario-radar", "19.1").phase, "enter");
  assert.equal(getActorLifecycle("actor.scenario-radar", "19.7").phase, "hold");
  assert.equal(getActorLifecycle("actor.scenario-radar", "19.8").phase, "exit");

  assert.equal(getActorLifecycle("actor.action-path", "19.8").phase, "off");
  assert.equal(getActorLifecycle("actor.action-path", "19.9").phase, "enter");
  assert.equal(getActorLifecycle("actor.action-path", "20.10").phase, "hold");
  assert.equal(getActorLifecycle("actor.action-path", "21.6").phase, "exit");
  assert.equal(getActorLifecycle("actor.action-path", "21.7").phase, "off");

  assert.equal(getActorLifecycle("actor.cta-dock", "19.1").phase, "enter");
  assert.equal(getActorLifecycle("actor.cta-dock", "21.7").phase, "hold");
  assert.equal(getActorLifecycle("actor.cta-dock", "21.9").phase, "exit");

  assert.equal(getActorLifecycle("actor.human-review", "18.7").phase, "enter");
  assert.equal(getActorLifecycle("actor.human-review", "18.8").phase, "hold");
  assert.equal(getActorLifecycle("actor.human-review", "19.8").phase, "exit");

  assert.equal(getActorLifecycle("actor.action-confirm-gate", "18.7").phase, "enter");
  assert.equal(getActorLifecycle("actor.action-confirm-gate", "18.8").phase, "hold");
  assert.equal(getActorLifecycle("actor.action-confirm-gate", "19.8").phase, "exit");
});

test("WP-20 motion runtime does not re-enter actors that are already on stage", () => {
  const runtimeSource = readFileSync("src/presentation/motion/StageMotionRuntime.tsx", "utf8");
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const persistentActorSource = readFileSync("src/presentation/stage/PersistentActorLayer.tsx", "utf8");
  const objectLayerSource = readFileSync("src/presentation/stage/ContinuityObjectLayer.tsx", "utf8");
  const scrollLayerSource = readFileSync("src/presentation/stage/ScrollNarrativeLayer.tsx", "utf8");
  const productStageSource = readFileSync("src/presentation/stage/ProductStage.tsx", "utf8");

  assert.match(runtimeSource, /getActorLifecycle\("actor\.integration-ring", contract\.beatId\)/);
  assert.match(runtimeSource, /const from = \([\s\S]*safeTargets\.length === 0[\s\S]*timeline\.from\(safeTargets/);
  assert.match(runtimeSource, /ringLifecycle\.phase === "enter"[\s\S]*from\(timeline, select\(root, "\.integration-ring"\)/);
  assert.match(runtimeSource, /ringLifecycle\.phase === "enter"[\s\S]*: \["\.timeline-track", "\.timeline-node"\]/);
  assert.match(runtimeSource, /getActorLifecycle\("actor\.action-path", contract\.beatId\)/);
  assert.match(runtimeSource, /actionPathLifecycle\.phase === "enter"[\s\S]*prepareStrokePaths\(root\)/);
  assert.match(runtimeSource, /actionPathLifecycle\.phase === "enter"[\s\S]*: \[\]/);
  assert.match(runtimeSource, /if \(!selector\) return \[\]/);
  assert.match(visualStageSource, /<PersistentActorLayer frameKind=\{frameKind\} resolved=\{resolved\} \/>/);
  assert.match(persistentActorSource, /getActorCue\("actor\.judgement-question", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /getActorCue\("actor\.ledger-dial", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /getActorCue\("actor\.source-packet", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /getActorCue\("actor\.fact-to-benefit", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /getActorCue\("actor\.output-cards", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /getActorCue\("actor\.safety-boundary", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /getActorCue\("actor\.scenario-radar", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /<JudgementQuestion frameKind=\{frameKind\} \/>/);
  assert.match(persistentActorSource, /<LedgerDial \/>/);
  assert.match(persistentActorSource, /<SourcePacketActor compact=/);
  assert.match(persistentActorSource, /<FactBenefitActor compact=/);
  assert.match(persistentActorSource, /<OutputCardsActor mode=/);
  assert.match(persistentActorSource, /<SafetyBoundaryActor mode=/);
  assert.match(persistentActorSource, /<ScenarioRadarActor compact=/);
  assert.match(persistentActorSource, /<ProductStage renderState=\{productState\.renderState\} variant=\{productState\.variant\} \/>/);
  assert.match(persistentActorSource, /className="action-path-line"/);
  assert.match(persistentActorSource, /getActorCue\("actor\.human-review", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /getActorCue\("actor\.action-confirm-gate", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /getActorCue\("actor\.cta-dock", resolved\.beat\.id\)/);
  assert.match(persistentActorSource, /<CtaDock[\s\S]*expanded=\{ctaCue\.role === "lead"/);
  assert.doesNotMatch(visualStageSource, /className="question-core"/);
  assert.doesNotMatch(visualStageSource, /function LedgerDial/);
  assert.doesNotMatch(visualStageSource, /function TechnicalFacts/);
  assert.doesNotMatch(visualStageSource, /function BenefitTranslation/);
  assert.doesNotMatch(visualStageSource, /function OutputFreeze/);
  assert.doesNotMatch(visualStageSource, /function ApprovalGate/);
  assert.doesNotMatch(visualStageSource, /function BoundaryLoop/);
  assert.doesNotMatch(visualStageSource, /function ScenarioRadar/);
  assert.doesNotMatch(visualStageSource, /function ActionPath\(\)[\s\S]*<CtaDock compact \/>/);
  assert.doesNotMatch(visualStageSource, /frameKind === "cta-dock"[\s\S]*<CtaDock expanded \/>/);
  assert.match(productStageSource, /"route-anchor"/);
  assert.doesNotMatch(objectLayerSource, /className="object-product-form"/);
  assert.doesNotMatch(objectLayerSource, /className="action-object-path"/);
  assert.doesNotMatch(scrollLayerSource, /product-ghost-body/);
  assert.doesNotMatch(scrollLayerSource, /action-route-ghost/);
  assert.doesNotMatch(scrollLayerSource, /action-mile/);
});
