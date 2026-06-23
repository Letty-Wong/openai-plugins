import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-20R moves primary actor bodies into a persistent actor layer", () => {
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");
  const persistentLayerSource = readFileSync("src/presentation/stage/PersistentActorLayer.tsx", "utf8");

  assert.match(visualStageSource, /import \{ PersistentActorLayer \}/);
  assert.match(visualStageSource, /<PersistentActorLayer frameKind=\{frameKind\} resolved=\{resolved\} \/>/);
  assert.doesNotMatch(visualStageSource, /import \{ ProductStage \}/);
  assert.doesNotMatch(visualStageSource, /import \{ IntegrationRing \}/);
  assert.doesNotMatch(visualStageSource, /<ProductStage/);

  assert.match(persistentLayerSource, /getActorCue\("actor\.integration-ring", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.judgement-question", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.ledger-dial", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.product-stage", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.source-packet", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.fact-to-benefit", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.output-cards", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.safety-boundary", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.scenario-radar", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.action-path", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.human-review", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.action-confirm-gate", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /getActorCue\("actor\.cta-dock", resolved\.beat\.id\)/);
  assert.match(persistentLayerSource, /"data-stage-actor-id": actorId/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(integrationRingCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(judgementCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(ledgerCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(productCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(sourcePacketCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(factBenefitCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(outputCardsCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(safetyBoundaryCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(scenarioRadarCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(actionPathCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(humanReviewCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(actionConfirmCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /\{\.\.\.actorSpatialProps\(ctaCue\.actorId\)\}/);
  assert.match(persistentLayerSource, /<IntegrationRing frameKind=\{frameKind\} \/>/);
  assert.match(persistentLayerSource, /<JudgementQuestion frameKind=\{frameKind\} \/>/);
  assert.match(persistentLayerSource, /<LedgerDial \/>/);
  assert.match(persistentLayerSource, /<ProductStage renderState=\{productState\.renderState\} variant=\{productState\.variant\} \/>/);
  assert.match(persistentLayerSource, /<SourcePacketActor compact=/);
  assert.match(persistentLayerSource, /<FactBenefitActor compact=/);
  assert.match(persistentLayerSource, /<OutputCardsActor mode=\{getOutputCardsMode\(frameKind\)\} \/>/);
  assert.match(persistentLayerSource, /<SafetyBoundaryActor mode=\{getSafetyBoundaryMode\(frameKind, safetyBoundaryCue\.role\)\} \/>/);
  assert.match(persistentLayerSource, /<ScenarioRadarActor compact=/);
  assert.match(readFileSync("src/presentation/stage/MiddleActors.tsx", "utf8"), /data-radar-core-id="scenario-radar-core"/);
  assert.doesNotMatch(
    readFileSync("src/presentation/stage/MiddleActors.tsx", "utf8"),
    /function ScenarioRadarActor[\s\S]*<SourcePacketMini \/>/
  );
  assert.match(persistentLayerSource, /className="action-path-line"/);
  assert.match(persistentLayerSource, /<HumanReviewNode compact=/);
  assert.match(persistentLayerSource, /<ActionConfirmGate compact=/);
  assert.match(persistentLayerSource, /<CtaDock/);
});

test("WP-20R keeps old frame branches as support layers instead of actor bodies", () => {
  const visualStageSource = readFileSync("src/presentation/stage/VisualStage.tsx", "utf8");

  assert.doesNotMatch(visualStageSource, /className="question-core"/);
  assert.doesNotMatch(visualStageSource, /function LedgerDial/);
  assert.doesNotMatch(visualStageSource, /function TechnicalFacts/);
  assert.doesNotMatch(visualStageSource, /function BenefitTranslation/);
  assert.doesNotMatch(visualStageSource, /function OutputFreeze/);
  assert.doesNotMatch(visualStageSource, /function ApprovalGate/);
  assert.doesNotMatch(visualStageSource, /function BoundaryLoop/);
  assert.doesNotMatch(visualStageSource, /function ScenarioRadar/);
  assert.doesNotMatch(visualStageSource, /function SourcePacketMini/);
  assert.doesNotMatch(visualStageSource, /function OutputCardStack/);
  assert.doesNotMatch(visualStageSource, /className="source-packet"/);
  assert.doesNotMatch(visualStageSource, /className="output-card-stack/);
  assert.doesNotMatch(visualStageSource, /className="scenario-radar-stage/);
  assert.match(visualStageSource, /function ActionPath\(\)[\s\S]*action-path-stage action-path-support/);
  assert.doesNotMatch(visualStageSource, /function ActionPath\(\)[\s\S]*className="action-path-line"/);
  assert.doesNotMatch(visualStageSource, /<HumanReviewNode/);
  assert.doesNotMatch(visualStageSource, /<ActionConfirmGate/);
  assert.doesNotMatch(visualStageSource, /<CtaDock/);
  assert.doesNotMatch(visualStageSource, /function TechnicalFacts\(\)[\s\S]*<ProductStage/);
  assert.doesNotMatch(visualStageSource, /function ScenarioRadar\(\)[\s\S]*<ProductStage/);
});

test("WP-20R styles the persistent actor layer as a real stage layer", () => {
  const presentationCss = readFileSync("src/styles/presentation.css", "utf8");

  assert.match(presentationCss, /\.persistent-actor-layer\s*\{[\s\S]*z-index:\s*8;[\s\S]*pointer-events:\s*none;/);
  assert.match(presentationCss, /\.persistent-product-actor\[data-actor-role="lead"\] \.product-stage-shell/);
  assert.match(presentationCss, /\.persistent-judgement-actor\[data-actor-role="lead"\]/);
  assert.match(presentationCss, /\.persistent-ledger-actor\[data-actor-role="lead"\]/);
  assert.match(presentationCss, /\.persistent-source-packet-actor\[data-actor-role="support"\]/);
  assert.match(presentationCss, /\.persistent-fact-benefit-actor\[data-actor-role="support"\]/);
  assert.match(presentationCss, /\.persistent-output-cards-actor\[data-lifecycle-phase="exit"\] \.output-card-stack/);
  assert.match(presentationCss, /\.persistent-safety-boundary-actor\[data-actor-role="lead"\]/);
  assert.match(presentationCss, /\.persistent-scenario-radar-actor\[data-actor-role="lead"\]/);
  assert.match(presentationCss, /\.persistent-product-actor\[data-actor-role="support"\] \.product-stage-shell/);
  assert.match(presentationCss, /\.persistent-action-path-actor\[data-lifecycle-phase="hold"\] \.action-path-line/);
  assert.match(presentationCss, /\.persistent-human-review-actor\[data-actor-role="support"\]/);
  assert.match(presentationCss, /\.persistent-action-confirm-actor\[data-actor-role="support"\]/);
  assert.match(presentationCss, /\.persistent-cta-actor\[data-actor-role="lead"\]/);
});
