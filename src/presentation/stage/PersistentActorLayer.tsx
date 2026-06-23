import type { CSSProperties } from "react";
import { actionMilestones, selectedScenario } from "@/content/safety-prototype";
import type { ResolvedBeatState } from "@/presentation/core/state-types";
import { IntegrationRing } from "@/presentation/stage/IntegrationRing";
import {
  FactBenefitActor,
  OutputCardsActor,
  SafetyBoundaryActor,
  ScenarioRadarActor,
  SourcePacketActor
} from "@/presentation/stage/MiddleActors";
import { JudgementQuestion, LedgerDial } from "@/presentation/stage/OpeningActors";
import { ActionConfirmGate, CtaDock, HumanReviewNode } from "@/presentation/stage/SafetyActors";
import { getSpatialPoseForActor, type SpatialPose } from "@/presentation/stage/spatial-poses";
import type { StageActorId } from "@/presentation/stage/stage-actors";
import { getActorCue } from "@/presentation/stage/stage-script";
import type { StaticFrameKind } from "@/presentation/stage/static-frames";
import { ProductStage } from "@/presentation/stage/ProductStage";

type PersistentActorLayerProps = {
  readonly frameKind: StaticFrameKind;
  readonly resolved: ResolvedBeatState;
};

type ProductState = {
  readonly renderState: "silhouette" | "warm" | "neutral";
  readonly variant: "product" | "technical" | "safety" | "route-anchor" | "finale";
};

export function PersistentActorLayer({ frameKind, resolved }: PersistentActorLayerProps) {
  const integrationRingCue = getActorCue("actor.integration-ring", resolved.beat.id);
  const judgementCue = getActorCue("actor.judgement-question", resolved.beat.id);
  const ledgerCue = getActorCue("actor.ledger-dial", resolved.beat.id);
  const productCue = getActorCue("actor.product-stage", resolved.beat.id);
  const sourcePacketCue = getActorCue("actor.source-packet", resolved.beat.id);
  const factBenefitCue = getActorCue("actor.fact-to-benefit", resolved.beat.id);
  const outputCardsCue = getActorCue("actor.output-cards", resolved.beat.id);
  const safetyBoundaryCue = getActorCue("actor.safety-boundary", resolved.beat.id);
  const scenarioRadarCue = getActorCue("actor.scenario-radar", resolved.beat.id);
  const actionPathCue = getActorCue("actor.action-path", resolved.beat.id);
  const humanReviewCue = getActorCue("actor.human-review", resolved.beat.id);
  const actionConfirmCue = getActorCue("actor.action-confirm-gate", resolved.beat.id);
  const ctaCue = getActorCue("actor.cta-dock", resolved.beat.id);
  const productState = getProductState(frameKind, resolved.scene.sceneNumber);
  const actorSpatialProps = (actorId: StageActorId) => {
    const pose = getSpatialPoseForActor(actorId, resolved.scene.sceneNumber);

    return {
      "data-spatial-function": pose.functionRole,
      "data-spatial-occlusion": pose.occlusion,
      "data-spatial-pose-id": pose.poseId,
      "data-stage-actor-id": actorId,
      style: spatialPoseStyle(pose)
    };
  };

  return (
    <div className="persistent-actor-layer" aria-hidden="true">
      {integrationRingCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-integration-ring-actor"
          data-actor-role={integrationRingCue.role}
          data-lifecycle-phase={integrationRingCue.lifecycle.phase}
          {...actorSpatialProps(integrationRingCue.actorId)}
        >
          <div className="integration-geometry">
            <div className={`ring-wrap ${frameKind === "default" ? "hero" : frameKind}`}>
              <IntegrationRing frameKind={frameKind} />
            </div>
          </div>
        </div>
      ) : null}

      {productCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-product-actor"
          data-actor-role={productCue.role}
          data-lifecycle-phase={productCue.lifecycle.phase}
          {...actorSpatialProps(productCue.actorId)}
        >
          <ProductStage renderState={productState.renderState} variant={productState.variant} />
        </div>
      ) : null}

      {judgementCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-judgement-actor"
          data-actor-role={judgementCue.role}
          data-lifecycle-phase={judgementCue.lifecycle.phase}
          {...actorSpatialProps(judgementCue.actorId)}
        >
          <JudgementQuestion frameKind={frameKind} />
        </div>
      ) : null}

      {ledgerCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-ledger-actor"
          data-actor-role={ledgerCue.role}
          data-lifecycle-phase={ledgerCue.lifecycle.phase}
          {...actorSpatialProps(ledgerCue.actorId)}
        >
          <LedgerDial />
        </div>
      ) : null}

      {sourcePacketCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-source-packet-actor"
          data-actor-role={sourcePacketCue.role}
          data-lifecycle-phase={sourcePacketCue.lifecycle.phase}
          {...actorSpatialProps(sourcePacketCue.actorId)}
        >
          <SourcePacketActor compact={resolved.scene.sceneNumber >= 15 || sourcePacketCue.role !== "support"} />
        </div>
      ) : null}

      {factBenefitCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-fact-benefit-actor"
          data-actor-role={factBenefitCue.role}
          data-lifecycle-phase={factBenefitCue.lifecycle.phase}
          {...actorSpatialProps(factBenefitCue.actorId)}
        >
          <FactBenefitActor compact={resolved.scene.sceneNumber >= 15 || factBenefitCue.role !== "support"} />
        </div>
      ) : null}

      {outputCardsCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-output-cards-actor"
          data-actor-role={outputCardsCue.role}
          data-lifecycle-phase={outputCardsCue.lifecycle.phase}
          {...actorSpatialProps(outputCardsCue.actorId)}
        >
          <OutputCardsActor mode={getOutputCardsMode(frameKind)} />
        </div>
      ) : null}

      {safetyBoundaryCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-safety-boundary-actor"
          data-actor-role={safetyBoundaryCue.role}
          data-lifecycle-phase={safetyBoundaryCue.lifecycle.phase}
          {...actorSpatialProps(safetyBoundaryCue.actorId)}
        >
          <SafetyBoundaryActor mode={getSafetyBoundaryMode(frameKind, safetyBoundaryCue.role)} />
        </div>
      ) : null}

      {scenarioRadarCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-scenario-radar-actor"
          data-actor-role={scenarioRadarCue.role}
          data-lifecycle-phase={scenarioRadarCue.lifecycle.phase}
          {...actorSpatialProps(scenarioRadarCue.actorId)}
        >
          <ScenarioRadarActor compact={scenarioRadarCue.role !== "lead"} />
        </div>
      ) : null}

      {actionPathCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-action-path-actor"
          data-actor-role={actionPathCue.role}
          data-lifecycle-phase={actionPathCue.lifecycle.phase}
          {...actorSpatialProps(actionPathCue.actorId)}
        >
          <svg className="action-path-line" viewBox="0 0 1100 520">
            <path d="M80 300 C240 150 405 145 535 245 S820 382 1020 172" />
            <path className="capability-arc-preview" d="M870 138 C980 92 1080 172 1040 292" />
          </svg>
          <div className="selected-scenario" data-scenario-id={selectedScenario.id}>
            <span>{selectedScenario.status}</span>
            <strong>{selectedScenario.label}</strong>
          </div>
          <div className="milestone-row">
            {actionMilestones.map((milestone) => (
              <div className={`milestone-node ${milestone.id}`} data-milestone-id={milestone.id} key={milestone.id}>
                <strong>{milestone.label}</strong>
                <span>{milestone.result}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {humanReviewCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-human-review-actor"
          data-actor-role={humanReviewCue.role}
          data-lifecycle-phase={humanReviewCue.lifecycle.phase}
          {...actorSpatialProps(humanReviewCue.actorId)}
        >
          <HumanReviewNode compact={resolved.scene.sceneNumber >= 19 || humanReviewCue.role !== "support"} />
        </div>
      ) : null}

      {actionConfirmCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-action-confirm-actor"
          data-actor-role={actionConfirmCue.role}
          data-lifecycle-phase={actionConfirmCue.lifecycle.phase}
          {...actorSpatialProps(actionConfirmCue.actorId)}
        >
          <ActionConfirmGate compact={resolved.scene.sceneNumber >= 19 || actionConfirmCue.role !== "support"} />
        </div>
      ) : null}

      {ctaCue.lifecycle.currentVisible ? (
        <div
          className="persistent-actor persistent-cta-actor"
          data-actor-role={ctaCue.role}
          data-lifecycle-phase={ctaCue.lifecycle.phase}
          {...actorSpatialProps(ctaCue.actorId)}
        >
          <CtaDock
            compact={ctaCue.role !== "lead"}
            expanded={ctaCue.role === "lead" || frameKind === "cta-dock" || frameKind === "finale"}
          />
        </div>
      ) : null}
    </div>
  );
}

function spatialPoseStyle(pose: SpatialPose) {
  return {
    "--spatial-pose-opacity": pose.opacity,
    "--spatial-pose-scale": pose.scale,
    "--spatial-pose-x": `${pose.x}px`,
    "--spatial-pose-y": `${pose.y}px`,
    "--spatial-pose-z": `${pose.z}px`
  } as CSSProperties;
}

function getProductState(frameKind: StaticFrameKind, sceneNumber: number): ProductState {
  if (frameKind === "product-slot") {
    return { renderState: "silhouette", variant: "product" };
  }

  if (frameKind === "technical-facts" || frameKind === "benefit-translation") {
    return { renderState: "neutral", variant: "technical" };
  }

  if (
    frameKind === "output-freeze" ||
    frameKind === "safety" ||
    frameKind === "approval-gate" ||
    frameKind === "boundary-loop" ||
    frameKind === "scenario-radar"
  ) {
    return { renderState: "neutral", variant: "safety" };
  }

  if (frameKind === "action-path" || frameKind === "cta-dock") {
    return { renderState: "neutral", variant: "route-anchor" };
  }

  if (frameKind === "finale") {
    return { renderState: "warm", variant: "finale" };
  }

  if (sceneNumber >= 12 && sceneNumber <= 15) {
    return { renderState: "neutral", variant: "technical" };
  }

  return { renderState: "warm", variant: "product" };
}

function getOutputCardsMode(frameKind: StaticFrameKind) {
  if (frameKind === "approval-gate") return "review";
  if (frameKind === "boundary-loop") return "approved";
  return "frozen";
}

function getSafetyBoundaryMode(frameKind: StaticFrameKind, role: string) {
  if (frameKind === "output-freeze") return "freeze";
  if (frameKind === "approval-gate") return "gate";
  if (frameKind === "boundary-loop") return "loop";
  if (role === "background") return "background";
  return "plain";
}
