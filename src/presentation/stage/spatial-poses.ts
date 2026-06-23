import type { BeatId } from "@/presentation/core/state-types";
import type { StageActorId } from "@/presentation/stage/stage-actors";

export type RoutePhase = "judgement" | "ledger" | "product" | "safety" | "action" | "finale";
export type BeatMovementKind = "stable" | "actor" | "spatial";
export type CameraDepthBand = "near" | "mid" | "far";
export type SpatialOcclusion = "foreground" | "midground" | "background" | "control";
export type SpatialTransitionKind = "turn-horizontal-product" | "portal-forward-safety" | "dolly-back-finale";

export type SpatialRouteSegment = {
  readonly id: RoutePhase;
  readonly label: string;
  readonly range: string;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export type CameraPose = {
  readonly depthBand: CameraDepthBand;
  readonly poseId: string;
  readonly rotationX: number;
  readonly rotationY: number;
  readonly rotationZ: number;
  readonly scale: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export type SpatialTransitionCue = {
  readonly beatId: BeatId;
  readonly cameraPose: CameraPose;
  readonly fromPhase: RoutePhase;
  readonly id: string;
  readonly kind: SpatialTransitionKind;
  readonly label: string;
  readonly leadActorId: StageActorId;
  readonly toPhase: RoutePhase;
};

export type SpatialPose = {
  readonly actorId: StageActorId;
  readonly functionRole: string;
  readonly occlusion: SpatialOcclusion;
  readonly opacity: number;
  readonly poseId: string;
  readonly routePhase: RoutePhase;
  readonly scale: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export const spatialRouteSegments: readonly SpatialRouteSegment[] = [
  { id: "judgement", label: "判断入口", range: "01-04", x: 35, y: 19, z: -120 },
  { id: "ledger", label: "四本账", range: "05-08", x: 39, y: 38, z: -70 },
  { id: "product", label: "产品旅程", range: "08-15", x: 58, y: 43, z: 40 },
  { id: "safety", label: "安全边界", range: "16-18", x: 55, y: 62, z: 120 },
  { id: "action", label: "行动路径", range: "19-20", x: 47, y: 77, z: 40 },
  { id: "finale", label: "完整闭环", range: "21", x: 50, y: 50, z: -180 }
];

export const spatialTransitionBeatIds: readonly BeatId[] = ["09.1", "16.1", "21.1"];

export const spatialTransitionCues: readonly SpatialTransitionCue[] = [
  {
    beatId: "09.1",
    cameraPose: {
      depthBand: "near",
      poseId: "camera.turn-horizontal-product",
      rotationX: 2,
      rotationY: -14,
      rotationZ: -6,
      scale: 1.06,
      x: -44,
      y: -116,
      z: 92
    },
    fromPhase: "ledger",
    id: "transition.08-09.horizontal-product-turn",
    kind: "turn-horizontal-product",
    label: "纵向转入横向产品段",
    leadActorId: "actor.product-stage",
    toPhase: "product"
  },
  {
    beatId: "16.1",
    cameraPose: {
      depthBand: "near",
      poseId: "camera.portal-forward-safety",
      rotationX: -4,
      rotationY: 0,
      rotationZ: 0,
      scale: 1.18,
      x: -170,
      y: -142,
      z: 230
    },
    fromPhase: "product",
    id: "transition.15-16.forward-safety-portal",
    kind: "portal-forward-safety",
    label: "穿过接入环进入安全空间",
    leadActorId: "actor.safety-boundary",
    toPhase: "safety"
  },
  {
    beatId: "21.1",
    cameraPose: {
      depthBand: "far",
      poseId: "camera.dolly-back-finale",
      rotationX: 10,
      rotationY: 0,
      rotationZ: 0,
      scale: 0.72,
      x: 0,
      y: -176,
      z: -280
    },
    fromPhase: "action",
    id: "transition.20-21.backward-loop-reveal",
    kind: "dolly-back-finale",
    label: "后拉揭示完整接入环",
    leadActorId: "actor.action-path",
    toPhase: "finale"
  }
];

export function getRoutePhaseForScene(sceneNumber: number): RoutePhase {
  if (sceneNumber <= 4) return "judgement";
  if (sceneNumber <= 8) return "ledger";
  if (sceneNumber <= 15) return "product";
  if (sceneNumber <= 18) return "safety";
  if (sceneNumber <= 20) return "action";
  return "finale";
}

export function getBeatMovementKind(beatId: BeatId, sceneNumber: number): BeatMovementKind {
  if (spatialTransitionBeatIds.includes(beatId)) return "spatial";
  if (sceneNumber === 8 || sceneNumber === 15 || sceneNumber === 20) return "actor";
  if (beatId.endsWith(".1") || beatId.endsWith(".7")) return "actor";
  return "stable";
}

export function getSpatialTransitionCue(beatId: BeatId): SpatialTransitionCue | undefined {
  return spatialTransitionCues.find((cue) => cue.beatId === beatId);
}

export function getCameraPoseForBeat(beatId: BeatId, sceneNumber: number): CameraPose {
  return getSpatialTransitionCue(beatId)?.cameraPose ?? getCameraPoseForScene(sceneNumber);
}

export function getCameraPoseForScene(sceneNumber: number): CameraPose {
  if (sceneNumber <= 4) {
    return {
      depthBand: "mid",
      poseId: "camera.vertical-judgement",
      rotationX: 4,
      rotationY: -2,
      rotationZ: 0,
      scale: 1,
      x: 0,
      y: sceneNumber * -26,
      z: 0
    };
  }

  if (sceneNumber <= 8) {
    return {
      depthBand: "mid",
      poseId: "camera.vertical-ledger",
      rotationX: 5,
      rotationY: -3,
      rotationZ: -1,
      scale: 0.98,
      x: -16,
      y: (sceneNumber - 4) * -30,
      z: -24
    };
  }

  if (sceneNumber <= 15) {
    return {
      depthBand: "near",
      poseId: "camera.horizontal-product",
      rotationX: 2,
      rotationY: -8,
      rotationZ: 0,
      scale: 1.05,
      x: (sceneNumber - 9) * -34,
      y: -112,
      z: 72
    };
  }

  if (sceneNumber <= 18) {
    return {
      depthBand: "near",
      poseId: "camera.z-forward-safety",
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: 1.12,
      x: -160,
      y: -142 - (sceneNumber - 16) * 22,
      z: 150
    };
  }

  if (sceneNumber <= 20) {
    return {
      depthBand: "mid",
      poseId: "camera.vertical-action",
      rotationX: 3,
      rotationY: 4,
      rotationZ: 0,
      scale: 1.02,
      x: -120,
      y: -210 - (sceneNumber - 19) * 42,
      z: 60
    };
  }

  return {
    depthBand: "far",
    poseId: "camera.z-back-finale",
    rotationX: 8,
    rotationY: 0,
    rotationZ: 0,
    scale: 0.78,
    x: 0,
    y: -180,
    z: -220
  };
}

export function getSpatialPoseForActor(actorId: StageActorId, sceneNumber: number): SpatialPose {
  const routePhase = getRoutePhaseForScene(sceneNumber);
  const routeDefaults = routePhaseDefaults[routePhase];
  const actorDefaults = actorPoseDefaults[actorId] ?? actorPoseDefaults["actor.integration-ring"];

  return {
    actorId,
    functionRole: actorDefaults.functionRole,
    occlusion: actorDefaults.occlusion,
    opacity: actorDefaults.opacity,
    poseId: `${actorDefaults.poseStem}.${routePhase}`,
    routePhase,
    scale: actorDefaults.scale * routeDefaults.scale,
    x: actorDefaults.x + routeDefaults.x,
    y: actorDefaults.y + routeDefaults.y,
    z: actorDefaults.z + routeDefaults.z
  };
}

const routePhaseDefaults: Record<RoutePhase, Pick<SpatialPose, "scale" | "x" | "y" | "z">> = {
  action: { scale: 1, x: -6, y: 8, z: 30 },
  finale: { scale: 0.9, x: 0, y: -4, z: -120 },
  judgement: { scale: 1, x: 0, y: -10, z: 0 },
  ledger: { scale: 0.98, x: -3, y: 0, z: -20 },
  product: { scale: 1.04, x: 12, y: 0, z: 50 },
  safety: { scale: 1.02, x: 2, y: 5, z: 100 }
};

const actorPoseDefaults: Record<
  StageActorId,
  Pick<SpatialPose, "functionRole" | "occlusion" | "opacity" | "scale" | "x" | "y" | "z"> & {
    readonly poseStem: string;
  }
> = {
  "actor.action-confirm-gate": {
    functionRole: "execution authorization",
    occlusion: "foreground",
    opacity: 0.88,
    poseStem: "pose.action-confirm-gate",
    scale: 0.92,
    x: 18,
    y: 12,
    z: 170
  },
  "actor.action-path": {
    functionRole: "action route",
    occlusion: "foreground",
    opacity: 0.96,
    poseStem: "pose.action-path",
    scale: 1,
    x: 4,
    y: 18,
    z: 150
  },
  "actor.cta-dock": {
    functionRole: "cta placeholder",
    occlusion: "foreground",
    opacity: 0.92,
    poseStem: "pose.cta-dock",
    scale: 0.94,
    x: 26,
    y: 22,
    z: 220
  },
  "actor.fact-to-benefit": {
    functionRole: "artifact translation",
    occlusion: "midground",
    opacity: 0.78,
    poseStem: "pose.fact-to-benefit",
    scale: 0.88,
    x: -25,
    y: 2,
    z: 80
  },
  "actor.global-route": {
    functionRole: "legacy route reference",
    occlusion: "background",
    opacity: 0.18,
    poseStem: "pose.global-route",
    scale: 1,
    x: 0,
    y: 0,
    z: -180
  },
  "actor.human-review": {
    functionRole: "content review",
    occlusion: "foreground",
    opacity: 0.88,
    poseStem: "pose.human-review",
    scale: 0.92,
    x: -18,
    y: 12,
    z: 170
  },
  "actor.integration-ring": {
    functionRole: "global continuity ring",
    occlusion: "midground",
    opacity: 0.74,
    poseStem: "pose.integration-ring",
    scale: 1,
    x: 0,
    y: 0,
    z: 0
  },
  "actor.judgement-question": {
    functionRole: "judgement prompt",
    occlusion: "foreground",
    opacity: 0.96,
    poseStem: "pose.judgement-question",
    scale: 1,
    x: -10,
    y: 5,
    z: 120
  },
  "actor.ledger-dial": {
    functionRole: "ledger dial",
    occlusion: "foreground",
    opacity: 0.96,
    poseStem: "pose.ledger-dial",
    scale: 1,
    x: -8,
    y: 6,
    z: 110
  },
  "actor.output-cards": {
    functionRole: "artifact output",
    occlusion: "midground",
    opacity: 0.82,
    poseStem: "pose.output-cards",
    scale: 0.9,
    x: 22,
    y: -2,
    z: 95
  },
  "actor.presenter-controls": {
    functionRole: "presenter controls",
    occlusion: "control",
    opacity: 0.7,
    poseStem: "pose.presenter-controls",
    scale: 1,
    x: 0,
    y: 0,
    z: 300
  },
  "actor.product-stage": {
    functionRole: "product placeholder",
    occlusion: "foreground",
    opacity: 0.94,
    poseStem: "pose.product-stage",
    scale: 1,
    x: 15,
    y: 2,
    z: 130
  },
  "actor.safety-boundary": {
    functionRole: "safety boundary",
    occlusion: "midground",
    opacity: 0.86,
    poseStem: "pose.safety-boundary",
    scale: 1,
    x: 0,
    y: 6,
    z: 105
  },
  "actor.scenario-radar": {
    functionRole: "scenario radar",
    occlusion: "foreground",
    opacity: 0.9,
    poseStem: "pose.scenario-radar",
    scale: 0.94,
    x: -10,
    y: 12,
    z: 130
  },
  "actor.source-packet": {
    functionRole: "artifact source",
    occlusion: "midground",
    opacity: 0.78,
    poseStem: "pose.source-packet",
    scale: 0.88,
    x: -30,
    y: -4,
    z: 80
  },
  "stage.scroll-world": {
    functionRole: "legacy page-chain reference",
    occlusion: "background",
    opacity: 0,
    poseStem: "pose.legacy-scroll-world",
    scale: 1,
    x: 0,
    y: 0,
    z: -260
  }
};
