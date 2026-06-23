import { beatById, beats } from "@/content/beats";
import { sceneById } from "@/content/scenes";
import type { BeatId } from "@/presentation/core/state-types";
import {
  actorAppearsInBeat,
  getActorLifecycle,
  stageActors
} from "@/presentation/stage/stage-actors";
import type {
  ActorLifecycle,
  StageActorId
} from "@/presentation/stage/stage-actors";

export type StageActId =
  | "act-judgement"
  | "act-ledger"
  | "act-product-output"
  | "act-safety"
  | "act-action-cta";

export type StageActorRole =
  | "lead"
  | "support"
  | "background"
  | "control"
  | "offstage";

export type StageActorCue = {
  readonly actorId: StageActorId;
  readonly lifecycle: ActorLifecycle;
  readonly role: StageActorRole;
};

export type StageCue = {
  readonly actId: StageActId;
  readonly actorCues: readonly StageActorCue[];
  readonly beatId: BeatId;
  readonly leadActorId: StageActorId;
  readonly sceneNumber: number;
};

export function getStageCue(beatId: BeatId): StageCue {
  const beat = beatById.get(beatId);
  if (!beat) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }

  const scene = sceneById.get(beat.sceneId);
  if (!scene) {
    throw new Error(`Unknown scene id: ${beat.sceneId}`);
  }

  const actId = getStageActId(beatId);
  const leadActorId = getLeadActorId(beatId);
  const actorCues = stageActors.map((actor) => ({
    actorId: actor.id,
    lifecycle: getActorLifecycle(actor.id, beatId),
    role: getActorRole(actor.id, leadActorId, beatId)
  }));

  return {
    actId,
    actorCues,
    beatId,
    leadActorId,
    sceneNumber: scene.sceneNumber
  };
}

export function getActorCue(actorId: StageActorId, beatId: BeatId): StageActorCue {
  const cue = getStageCue(beatId).actorCues.find((actorCue) => actorCue.actorId === actorId);

  if (!cue) {
    throw new Error(`Missing actor cue for ${actorId} at ${beatId}`);
  }

  return cue;
}

export function getStageActId(beatId: BeatId): StageActId {
  if (isBetween(beatId, "01.1", "04.7")) return "act-judgement";
  if (isBetween(beatId, "05.1", "08.6")) return "act-ledger";
  if (isBetween(beatId, "08.7", "15.8")) return "act-product-output";
  if (isBetween(beatId, "16.1", "18.9")) return "act-safety";
  return "act-action-cta";
}

export function getLeadActorId(beatId: BeatId): StageActorId {
  if (isBetween(beatId, "01.1", "04.7")) return "actor.judgement-question";
  if (isBetween(beatId, "05.1", "08.6")) return "actor.ledger-dial";
  if (isBetween(beatId, "08.7", "15.8")) return "actor.product-stage";
  if (isBetween(beatId, "16.1", "18.9")) return "actor.safety-boundary";
  if (isBetween(beatId, "19.1", "19.8")) return "actor.scenario-radar";
  if (isBetween(beatId, "19.9", "21.6")) return "actor.action-path";
  return "actor.cta-dock";
}

function getActorRole(
  actorId: StageActorId,
  leadActorId: StageActorId,
  beatId: BeatId
): StageActorRole {
  if (actorId === "actor.presenter-controls") return "control";
  if (!actorAppearsInBeat(actorId, beatId)) return "offstage";
  if (actorId === leadActorId) return "lead";
  if (supportingActorsByLead[leadActorId]?.includes(actorId)) return "support";
  return "background";
}

function isBetween(beatId: BeatId, firstBeatId: BeatId, lastBeatId: BeatId) {
  const order = getBeatOrder(beatId);
  return order >= getBeatOrder(firstBeatId) && order <= getBeatOrder(lastBeatId);
}

function getBeatOrder(beatId: BeatId) {
  const beat = beats.find((candidate) => candidate.id === beatId);
  if (!beat) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }

  return beat.order;
}

const supportingActorsByLead: Readonly<
  Partial<Record<StageActorId, readonly StageActorId[]>>
> = {
  "actor.judgement-question": ["actor.integration-ring", "actor.global-route"],
  "actor.ledger-dial": ["actor.integration-ring", "actor.global-route"],
  "actor.product-stage": [
    "actor.integration-ring",
    "actor.source-packet",
    "actor.fact-to-benefit",
    "actor.output-cards"
  ],
  "actor.safety-boundary": [
    "actor.product-stage",
    "actor.output-cards",
    "actor.human-review",
    "actor.action-confirm-gate"
  ],
  "actor.scenario-radar": [
    "actor.product-stage",
    "actor.safety-boundary",
    "actor.human-review",
    "actor.action-confirm-gate",
    "actor.cta-dock"
  ],
  "actor.action-path": [
    "actor.product-stage",
    "actor.safety-boundary",
    "actor.cta-dock"
  ],
  "actor.cta-dock": [
    "actor.product-stage",
    "actor.safety-boundary",
    "actor.global-route"
  ]
};
