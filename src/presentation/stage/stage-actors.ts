import { beatById, beats } from "@/content/beats";
import type { BeatId } from "@/presentation/core/state-types";

export type StageActorId =
  | "stage.scroll-world"
  | "actor.integration-ring"
  | "actor.judgement-question"
  | "actor.ledger-dial"
  | "actor.product-stage"
  | "actor.source-packet"
  | "actor.fact-to-benefit"
  | "actor.output-cards"
  | "actor.safety-boundary"
  | "actor.human-review"
  | "actor.action-confirm-gate"
  | "actor.scenario-radar"
  | "actor.action-path"
  | "actor.cta-dock"
  | "actor.global-route"
  | "actor.presenter-controls";

export type ActorLifecyclePhase = "enter" | "hold" | "exit" | "off";

export type StageActorDefinition = {
  readonly id: StageActorId;
  readonly label: string;
  readonly firstBeatId: BeatId;
  readonly lastBeatId: BeatId;
  readonly ownedSelectors: readonly string[];
  readonly duplicateSources?: readonly string[];
};

export type ActorLifecycle = {
  readonly actorId: StageActorId;
  readonly currentVisible: boolean;
  readonly nextVisible: boolean;
  readonly phase: ActorLifecyclePhase;
  readonly previousVisible: boolean;
};

export const stageActors: readonly StageActorDefinition[] = [
  {
    id: "stage.scroll-world",
    label: "Global scroll world",
    firstBeatId: "01.1",
    lastBeatId: "21.9",
    ownedSelectors: [".scroll-world-runway", ".scroll-world-runway-track", ".scroll-world-runway-scene"]
  },
  {
    id: "actor.integration-ring",
    label: "IntegrationRing",
    firstBeatId: "01.1",
    lastBeatId: "21.9",
    ownedSelectors: [".integration-ring", ".integration-geometry", ".ring-wrap"]
  },
  {
    id: "actor.judgement-question",
    label: "Judgement question",
    firstBeatId: "01.1",
    lastBeatId: "04.7",
    ownedSelectors: [".visual-copy", ".judgement-question", ".decision-branch"]
  },
  {
    id: "actor.ledger-dial",
    label: "Ledger dial",
    firstBeatId: "05.1",
    lastBeatId: "08.6",
    ownedSelectors: [".ledger-dial", ".business-dial", ".ledger-quadrant"]
  },
  {
    id: "actor.product-stage",
    label: "ProductStage",
    firstBeatId: "08.7",
    lastBeatId: "21.9",
    ownedSelectors: [".product-stage-shell"],
    duplicateSources: [".continuity-object-product", ".actor-product"]
  },
  {
    id: "actor.source-packet",
    label: "SourcePacket",
    firstBeatId: "10.1",
    lastBeatId: "19.8",
    ownedSelectors: [".source-packet", ".source-packet-mini", ".object-source-track"]
  },
  {
    id: "actor.fact-to-benefit",
    label: "Fact to Benefit",
    firstBeatId: "10.1",
    lastBeatId: "15.8",
    ownedSelectors: [".fact-card", ".benefit-master", ".fact-lines", ".object-fact-track", ".object-benefit-track"]
  },
  {
    id: "actor.output-cards",
    label: "OutputCardStack",
    firstBeatId: "15.8",
    lastBeatId: "18.8",
    ownedSelectors: [".output-card-stack", ".output-card", ".output-cards"]
  },
  {
    id: "actor.safety-boundary",
    label: "Safety boundary",
    firstBeatId: "16.1",
    lastBeatId: "21.9",
    ownedSelectors: [".safety-boundary", ".boundary-loop", ".approval-gate"]
  },
  {
    id: "actor.human-review",
    label: "HumanReviewNode",
    firstBeatId: "18.7",
    lastBeatId: "19.8",
    ownedSelectors: [".human-review-node"]
  },
  {
    id: "actor.action-confirm-gate",
    label: "ActionConfirmGate",
    firstBeatId: "18.7",
    lastBeatId: "19.8",
    ownedSelectors: [".action-confirm-gate"]
  },
  {
    id: "actor.scenario-radar",
    label: "ScenarioRadar",
    firstBeatId: "19.1",
    lastBeatId: "19.8",
    ownedSelectors: [".scenario-radar-stage", ".radar-grid", ".scenario-token"]
  },
  {
    id: "actor.action-path",
    label: "ActionPath",
    firstBeatId: "19.9",
    lastBeatId: "21.6",
    ownedSelectors: [".action-path-stage", ".action-path-line", ".selected-scenario", ".milestone-node"],
    duplicateSources: [".continuity-object-action", ".actor-action"]
  },
  {
    id: "actor.cta-dock",
    label: "CTA dock",
    firstBeatId: "19.1",
    lastBeatId: "21.9",
    ownedSelectors: [".qr-dock", ".action-object-cta"]
  },
  {
    id: "actor.global-route",
    label: "Global route",
    firstBeatId: "01.1",
    lastBeatId: "21.9",
    ownedSelectors: [".cinematic-route-layer", ".story-spine", ".structural-ui", ".scroll-theater-route"]
  },
  {
    id: "actor.presenter-controls",
    label: "Presenter controls",
    firstBeatId: "01.1",
    lastBeatId: "21.9",
    ownedSelectors: [".presenter-hud", ".hud-toggle", ".qa-panel"]
  }
];

const actorById = new Map(stageActors.map((actor) => [actor.id, actor]));
const beatIndexById = new Map(beats.map((beat, index) => [beat.id, index]));

export function getStageActorDefinition(actorId: StageActorId) {
  const actor = actorById.get(actorId);
  if (!actor) {
    throw new Error(`Unknown stage actor: ${actorId}`);
  }

  return actor;
}

export function getActorLifecycle(actorId: StageActorId, beatId: BeatId): ActorLifecycle {
  return getActorLifecycleAtIndex(actorId, getBeatIndex(beatId));
}

export function getActorLifecycleAtIndex(actorId: StageActorId, beatIndex: number): ActorLifecycle {
  const previousBeat = beats[beatIndex - 1];
  const currentBeat = beats[beatIndex];
  const nextBeat = beats[beatIndex + 1];

  if (!currentBeat) {
    throw new Error(`Unknown beat index: ${beatIndex}`);
  }

  const previousVisible = previousBeat ? actorAppearsInBeat(actorId, previousBeat.id) : false;
  const currentVisible = actorAppearsInBeat(actorId, currentBeat.id);
  const nextVisible = nextBeat ? actorAppearsInBeat(actorId, nextBeat.id) : false;

  return {
    actorId,
    currentVisible,
    nextVisible,
    phase: resolveLifecyclePhase(previousVisible, currentVisible, nextVisible),
    previousVisible
  };
}

export function actorAppearsInBeat(actorId: StageActorId, beatId: BeatId) {
  const actor = getStageActorDefinition(actorId);
  const order = getBeatOrder(beatId);
  return order >= getBeatOrder(actor.firstBeatId) && order <= getBeatOrder(actor.lastBeatId);
}

function resolveLifecyclePhase(
  previousVisible: boolean,
  currentVisible: boolean,
  nextVisible: boolean
): ActorLifecyclePhase {
  if (!currentVisible) return "off";
  if (!previousVisible) return "enter";
  if (!nextVisible) return "exit";
  return "hold";
}

function getBeatOrder(beatId: BeatId) {
  const beat = beatById.get(beatId);
  if (!beat) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }

  return beat.order;
}

function getBeatIndex(beatId: BeatId) {
  const index = beatIndexById.get(beatId);
  if (index === undefined) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }

  return index;
}
