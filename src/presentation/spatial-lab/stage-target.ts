import { beatById, beats } from "@/content/beats";
import { sceneById } from "@/content/scenes";
import type { BeatId, ContentStatus, ScreenCopy } from "@/presentation/core/state-types";
import {
  getBeatMovementKind,
  getCameraPoseForBeat,
  getRoutePhaseForScene,
  getSpatialPoseForActor,
  getSpatialTransitionCue
} from "@/presentation/stage/spatial-poses";
import type {
  BeatMovementKind,
  CameraPose,
  RoutePhase,
  SpatialOcclusion
} from "@/presentation/stage/spatial-poses";
import { getStageCue } from "@/presentation/stage/stage-script";
import type { StageActorRole } from "@/presentation/stage/stage-script";
import type { ActorLifecyclePhase, StageActorId } from "@/presentation/stage/stage-actors";

export type LabArtifactId =
  | "artifact.F01"
  | "artifact.F02"
  | "artifact.F03"
  | "artifact.F04"
  | "artifact.F05"
  | "artifact.F06";

export type LabArtifactMode =
  | "source"
  | "benefit"
  | "output"
  | "review"
  | "route"
  | "placeholder";

export type LabTransitionGate = "SR-04" | "SR-05" | "SR-06";

export type LabCameraTarget = CameraPose & {
  readonly focusActorId?: StageActorId;
  readonly perspective: number;
};

export type LabActorTarget = {
  readonly actorId: StageActorId;
  readonly functionRole: string;
  readonly lifecycle: ActorLifecyclePhase;
  readonly occlusion: SpatialOcclusion;
  readonly opacity: number;
  readonly poseId: string;
  readonly role: StageActorRole;
  readonly rotateX: number;
  readonly rotateY: number;
  readonly rotateZ: number;
  readonly scale: number;
  readonly visible: boolean;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export type LabArtifactTarget = {
  readonly artifactId: LabArtifactId;
  readonly lifecycle: ActorLifecyclePhase;
  readonly mode: LabArtifactMode;
  readonly opacity: number;
  readonly scale: number;
  readonly visible: boolean;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export type LabRingTarget = {
  readonly gap: number;
  readonly glow: number;
  readonly portalRadius: number;
  readonly rotateX: number;
  readonly rotateY: number;
  readonly role: string;
  readonly scale: number;
  readonly segmentProgress: readonly number[];
  readonly thickness: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export type LabProductTarget = {
  readonly anchoredFromBeatId: BeatId;
  readonly label: string;
  readonly placeholderOnly: true;
  readonly visible: boolean;
};

export type LabCopyTarget = {
  readonly eyebrow: string;
  readonly headline: string;
  readonly support: string;
  readonly caption: string;
  readonly status: ContentStatus;
};

export type LabTransitionTarget = {
  readonly acceptanceFocus: readonly string[];
  readonly gate: LabTransitionGate;
  readonly id: string;
  readonly kind: string;
  readonly label: string;
};

export type StageTarget = {
  readonly actors: Readonly<Record<StageActorId, LabActorTarget>>;
  readonly artifacts: Readonly<Record<LabArtifactId, LabArtifactTarget>>;
  readonly beatId: BeatId;
  readonly camera: LabCameraTarget;
  readonly copy: LabCopyTarget;
  readonly id: string;
  readonly movementKind: BeatMovementKind;
  readonly product: LabProductTarget;
  readonly reducedMotion: boolean;
  readonly ring: LabRingTarget;
  readonly routePhase: RoutePhase;
  readonly sceneNumber: number;
  readonly transition?: LabTransitionTarget;
};

export const labActorIds = [
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
  "actor.cta-dock"
] as const satisfies readonly StageActorId[];

export const labArtifactIds = [
  "artifact.F01",
  "artifact.F02",
  "artifact.F03",
  "artifact.F04",
  "artifact.F05",
  "artifact.F06"
] as const satisfies readonly LabArtifactId[];

export function resolveStageTarget(
  beatId: BeatId,
  options: { readonly reducedMotion?: boolean } = {}
): StageTarget {
  const beat = beatById.get(beatId);
  if (!beat) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }

  const scene = sceneById.get(beat.sceneId);
  if (!scene) {
    throw new Error(`Unknown scene id: ${beat.sceneId}`);
  }

  const routePhase = getRoutePhaseForScene(scene.sceneNumber);
  const transitionCue = getSpatialTransitionCue(beatId);
  const base = createBaseTarget(beatId, routePhase, scene.sceneNumber, options.reducedMotion ?? false);
  const scenePatched = applyScenePatch(base, scene.sceneNumber, scene.screenCopy);
  const beatPatched = applyBeatPatch(scenePatched, beatId, beat.screenCopy);
  const transitionPatched = applyTransitionPatch(beatPatched);
  const reducedPatched = options.reducedMotion ? applyReducedMotionPatch(transitionPatched) : transitionPatched;

  return {
    ...reducedPatched,
    id: `stage-target:${beatId}:${options.reducedMotion ? "reduced" : "motion"}`,
    transition: transitionCue ? createTransitionTarget(transitionCue.id, transitionCue.kind, transitionCue.label) : undefined
  };
}

function createBaseTarget(
  beatId: BeatId,
  routePhase: RoutePhase,
  sceneNumber: number,
  reducedMotion: boolean
): StageTarget {
  const cameraPose = getCameraPoseForBeat(beatId, sceneNumber);
  const movementKind = getBeatMovementKind(beatId, sceneNumber);

  return {
    actors: createActorTargets(beatId, sceneNumber),
    artifacts: createArtifactTargets(beatId, sceneNumber, routePhase),
    beatId,
    camera: {
      ...cameraPose,
      focusActorId: getStageCue(beatId).leadActorId,
      perspective: 1100
    },
    copy: {
      caption: "Screen copy stays outside the camera.",
      eyebrow: `Scene ${String(sceneNumber).padStart(2, "0")}`,
      headline: "Spatial Lab V4",
      status: "PLACEHOLDER",
      support: "StageTarget is resolved without click history."
    },
    id: `stage-target:${beatId}`,
    movementKind,
    product: {
      anchoredFromBeatId: "08.7",
      label: "ProductStage grey block",
      placeholderOnly: true,
      visible: sceneNumber >= 9
    },
    reducedMotion,
    ring: createRingTarget(routePhase),
    routePhase,
    sceneNumber
  };
}

function applyScenePatch(target: StageTarget, sceneNumber: number, screenCopy: ScreenCopy): StageTarget {
  return {
    ...target,
    copy: {
      caption: screenCopy.finalLine ?? "",
      eyebrow: `Scene ${String(sceneNumber).padStart(2, "0")} / ${target.routePhase}`,
      headline: screenCopy.title,
      status: screenCopy.status,
      support: screenCopy.support ?? ""
    }
  };
}

function applyBeatPatch(target: StageTarget, beatId: BeatId, screenCopy: ScreenCopy): StageTarget {
  const orderInScene = getBeatOrderInScene(beatId);
  const beatDrift = target.movementKind === "stable" ? 0 : orderInScene * 8;

  return {
    ...target,
    actors: patchActorsForBeat(target.actors, target.sceneNumber, beatDrift),
    artifacts: patchArtifactsForBeat(target.artifacts, target.routePhase, orderInScene),
    copy: {
      ...target.copy,
      caption: screenCopy.finalLine ?? target.copy.caption,
      support: screenCopy.support ?? target.copy.support
    }
  };
}

function applyReducedMotionPatch(target: StageTarget): StageTarget {
  return {
    ...target,
    camera: {
      ...target.camera,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scale: Math.min(target.camera.scale, 1)
    },
    reducedMotion: true
  };
}

function createActorTargets(
  beatId: BeatId,
  sceneNumber: number
): Readonly<Record<StageActorId, LabActorTarget>> {
  const cueByActor = new Map(getStageCue(beatId).actorCues.map((cue) => [cue.actorId, cue]));

  return Object.fromEntries(
    labActorIds.map((actorId) => {
      const cue = cueByActor.get(actorId);
      if (!cue) {
        throw new Error(`Missing stage cue for ${actorId} at ${beatId}`);
      }

      const pose = getSpatialPoseForActor(actorId, sceneNumber);
      const labOffset = labActorOffsets[actorId];

      return [
        actorId,
        {
          actorId,
          functionRole: pose.functionRole,
          lifecycle: cue.lifecycle.phase,
          occlusion: pose.occlusion,
          opacity: cue.lifecycle.currentVisible ? pose.opacity : 0,
          poseId: pose.poseId,
          role: cue.role,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: pose.scale * labOffset.scale,
          visible: cue.lifecycle.currentVisible,
          x: pose.x + labOffset.x,
          y: pose.y + labOffset.y,
          z: pose.z + labOffset.z
        }
      ];
    })
  ) as Readonly<Record<StageActorId, LabActorTarget>>;
}

function createArtifactTargets(
  beatId: BeatId,
  sceneNumber: number,
  routePhase: RoutePhase
): Readonly<Record<LabArtifactId, LabArtifactTarget>> {
  const mode = getArtifactMode(routePhase);
  const visible = sceneNumber >= 10 && sceneNumber <= 20;

  return Object.fromEntries(
    labArtifactIds.map((artifactId, index) => [
      artifactId,
      {
        artifactId,
        lifecycle: visible ? "hold" : "off",
        mode,
        opacity: visible ? 0.82 - index * 0.055 : 0,
        scale: 0.9,
        visible,
        x: -170 + index * 68,
        y: 160 - (index % 2) * 42,
        z: 40 + index * 16
      }
    ])
  ) as Readonly<Record<LabArtifactId, LabArtifactTarget>>;
}

function createRingTarget(routePhase: RoutePhase): LabRingTarget {
  const roleByPhase: Record<RoutePhase, string> = {
    action: "action-route",
    finale: "final-loop",
    judgement: "judgement",
    ledger: "ledger",
    product: "product-gate",
    safety: "safety-boundary"
  };

  return {
    gap: routePhase === "finale" ? 0 : 18,
    glow: routePhase === "safety" ? 0.72 : 0.38,
    portalRadius: routePhase === "safety" ? 160 : 120,
    rotateX: routePhase === "finale" ? 8 : 0,
    rotateY: routePhase === "product" ? -10 : 0,
    role: roleByPhase[routePhase],
    scale: routePhase === "finale" ? 1.18 : 1,
    segmentProgress: routePhase === "finale" ? [1, 1, 1, 1] : [0.72, 0.66, 0.58, 0.5],
    thickness: routePhase === "ledger" ? 12 : 8
    ,
    x: 0,
    y: 0,
    z: routePhase === "finale" ? -80 : 0
  };
}

function applyTransitionPatch(target: StageTarget): StageTarget {
  if (target.beatId === "09.1") return applyHorizontalProductTurn(target);
  if (target.beatId === "16.1") return applyForwardSafetyPortal(target);
  if (target.beatId === "21.1") return applyBackwardLoopReveal(target);
  return target;
}

function applyHorizontalProductTurn(target: StageTarget): StageTarget {
  return {
    ...target,
    actors: patchSelectedActors(target.actors, {
      "actor.integration-ring": {
        opacity: 0.92,
        rotateY: -12,
        scale: 1.08,
        x: -118,
        y: -58,
        z: 8
      },
      "actor.product-stage": {
        opacity: 0.96,
        rotateY: -10,
        scale: 0.98,
        x: 58,
        y: -32,
        z: 120
      },
      "actor.ledger-dial": {
        opacity: 0.5,
        rotateZ: -4,
        x: -260,
        y: -20,
        z: -20
      }
    }),
    camera: {
      ...target.camera,
      focusActorId: "actor.product-stage",
      perspective: 1180
    },
    copy: {
      ...target.copy,
      caption: "SR-04: Ring stays as the turning anchor; ProductStage keeps one actor identity."
    },
    product: {
      ...target.product,
      visible: true
    },
    ring: {
      ...target.ring,
      gap: 26,
      glow: 0.48,
      role: "product-gate-turn",
      rotateY: -16,
      scale: 1.04,
      segmentProgress: [0.86, 0.78, 0.64, 0.48],
      x: -88,
      y: -32,
      z: 24
    }
  };
}

function applyForwardSafetyPortal(target: StageTarget): StageTarget {
  return {
    ...target,
    actors: patchSelectedActors(target.actors, {
      "actor.integration-ring": {
        opacity: 0.94,
        rotateX: -4,
        scale: 1.22,
        x: -158,
        y: -74,
        z: 210
      },
      "actor.product-stage": {
        opacity: 0.72,
        scale: 0.82,
        x: -18,
        y: -132,
        z: -80
      },
      "actor.safety-boundary": {
        opacity: 0.98,
        scale: 1.04,
        x: 0,
        y: 10,
        z: 170
      },
      "actor.output-cards": {
        opacity: 0.62,
        x: 190,
        y: 94,
        z: 360
      }
    }),
    artifacts: patchArtifactsForPortal(target.artifacts),
    camera: {
      ...target.camera,
      focusActorId: "actor.safety-boundary",
      perspective: 1280
    },
    copy: {
      ...target.copy,
      caption: "SR-05: Forward Z portal; old product world remains behind while safety world appears ahead."
    },
    ring: {
      ...target.ring,
      gap: 36,
      glow: 0.82,
      portalRadius: 220,
      role: "portal-to-safety-boundary",
      scale: 1.22,
      segmentProgress: [0.96, 0.78, 0.42, 0.3],
      thickness: 10,
      x: -150,
      y: -68,
      z: 220
    }
  };
}

function applyBackwardLoopReveal(target: StageTarget): StageTarget {
  return {
    ...target,
    actors: patchSelectedActors(target.actors, {
      "actor.integration-ring": {
        opacity: 0.96,
        rotateX: 8,
        scale: 1.32,
        x: -90,
        y: -32,
        z: -120
      },
      "actor.action-path": {
        opacity: 0.96,
        rotateX: 6,
        scale: 0.94,
        x: -20,
        y: 96,
        z: 40
      },
      "actor.cta-dock": {
        opacity: 0.72,
        scale: 0.88,
        x: 270,
        y: 118,
        z: 150
      },
      "actor.product-stage": {
        opacity: 0.56,
        scale: 0.72,
        x: -270,
        y: -88,
        z: -140
      }
    }),
    artifacts: patchArtifactsForFinale(target.artifacts),
    camera: {
      ...target.camera,
      focusActorId: "actor.action-path",
      perspective: 1380
    },
    copy: {
      ...target.copy,
      caption: "SR-06: Dolly back reveals ActionPath as part of the full integration loop. CTA remains placeholder."
    },
    ring: {
      ...target.ring,
      gap: 0,
      glow: 0.58,
      portalRadius: 260,
      role: "final-loop-reveal",
      rotateX: 8,
      scale: 1.34,
      segmentProgress: [1, 1, 1, 1],
      thickness: 9,
      x: -90,
      y: -30,
      z: -140
    }
  };
}

function patchSelectedActors(
  actors: Readonly<Record<StageActorId, LabActorTarget>>,
  patches: Partial<Record<StageActorId, Partial<LabActorTarget>>>
): Readonly<Record<StageActorId, LabActorTarget>> {
  return Object.fromEntries(
    Object.entries(actors).map(([actorId, actor]) => [
      actorId,
      patches[actorId as StageActorId] ? { ...actor, ...patches[actorId as StageActorId] } : actor
    ])
  ) as Readonly<Record<StageActorId, LabActorTarget>>;
}

function patchArtifactsForPortal(
  artifacts: Readonly<Record<LabArtifactId, LabArtifactTarget>>
): Readonly<Record<LabArtifactId, LabArtifactTarget>> {
  return Object.fromEntries(
    Object.entries(artifacts).map(([artifactId, artifact], index) => [
      artifactId,
      {
        ...artifact,
        mode: "review",
        opacity: 0.78 - index * 0.06,
        scale: 0.94 + index * 0.02,
        visible: true,
        x: artifact.x + index * 18,
        y: artifact.y + index * 12,
        z: 80 + index * 86
      }
    ])
  ) as Readonly<Record<LabArtifactId, LabArtifactTarget>>;
}

function patchArtifactsForFinale(
  artifacts: Readonly<Record<LabArtifactId, LabArtifactTarget>>
): Readonly<Record<LabArtifactId, LabArtifactTarget>> {
  return Object.fromEntries(
    Object.entries(artifacts).map(([artifactId, artifact], index) => [
      artifactId,
      {
        ...artifact,
        mode: "route",
        opacity: 0.54 - index * 0.035,
        scale: 0.72,
        visible: true,
        x: -250 + index * 96,
        y: index % 2 === 0 ? 190 : -170,
        z: -180 + index * 24
      }
    ])
  ) as Readonly<Record<LabArtifactId, LabArtifactTarget>>;
}

function createTransitionTarget(id: string, kind: string, label: string): LabTransitionTarget {
  if (id === "transition.08-09.horizontal-product-turn") {
    return {
      acceptanceFocus: [
        "Ring remains the turning anchor",
        "ProductStage keeps one stable actor id",
        "The camera turns into the horizontal product journey without a full-screen fade"
      ],
      gate: "SR-04",
      id,
      kind,
      label
    };
  }

  if (id === "transition.15-16.forward-safety-portal") {
    return {
      acceptanceFocus: [
        "Forward Z portal has near, mid, and far layers",
        "Old product world remains behind the ring",
        "Safety boundary appears ahead through the same ring"
      ],
      gate: "SR-05",
      id,
      kind,
      label
    };
  }

  return {
    acceptanceFocus: [
      "Dolly back reveals a larger loop",
      "ActionPath identity persists",
      "CTA remains placeholder"
    ],
    gate: "SR-06",
    id,
    kind,
    label
  };
}

function patchActorsForBeat(
  actors: Readonly<Record<StageActorId, LabActorTarget>>,
  sceneNumber: number,
  beatDrift: number
): Readonly<Record<StageActorId, LabActorTarget>> {
  return Object.fromEntries(
    Object.entries(actors).map(([actorId, actor]) => {
      if (!actor.visible) return [actorId, actor];

      if (actor.actorId === "actor.product-stage" && sceneNumber >= 9 && sceneNumber <= 15) {
        return [actorId, { ...actor, x: actor.x - beatDrift, y: actor.y, z: actor.z + beatDrift * 0.4 }];
      }

      if (actor.actorId === "actor.action-path" && sceneNumber >= 20) {
        return [actorId, { ...actor, y: actor.y + beatDrift, z: actor.z + beatDrift }];
      }

      return [actorId, actor];
    })
  ) as Readonly<Record<StageActorId, LabActorTarget>>;
}

function patchArtifactsForBeat(
  artifacts: Readonly<Record<LabArtifactId, LabArtifactTarget>>,
  routePhase: RoutePhase,
  orderInScene: number
): Readonly<Record<LabArtifactId, LabArtifactTarget>> {
  return Object.fromEntries(
    Object.entries(artifacts).map(([artifactId, artifact], index) => [
      artifactId,
      {
        ...artifact,
        mode: getArtifactMode(routePhase),
        x: artifact.x + orderInScene * 10,
        y: artifact.y + (routePhase === "product" ? index * 3 : 0)
      }
    ])
  ) as Readonly<Record<LabArtifactId, LabArtifactTarget>>;
}

function getArtifactMode(routePhase: RoutePhase): LabArtifactMode {
  if (routePhase === "product") return "benefit";
  if (routePhase === "safety") return "review";
  if (routePhase === "action" || routePhase === "finale") return "route";
  if (routePhase === "ledger") return "source";
  return "placeholder";
}

function getBeatOrderInScene(beatId: BeatId) {
  const beat = beatById.get(beatId);
  if (!beat) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }

  const sceneBeats = beats.filter((candidate) => candidate.sceneId === beat.sceneId);
  return sceneBeats.findIndex((candidate) => candidate.id === beatId);
}

const labActorOffsets: Record<
  (typeof labActorIds)[number],
  { readonly scale: number; readonly x: number; readonly y: number; readonly z: number }
> = {
  "actor.action-confirm-gate": { scale: 0.88, x: 180, y: 34, z: 34 },
  "actor.action-path": { scale: 1, x: 10, y: 118, z: 20 },
  "actor.cta-dock": { scale: 0.86, x: 242, y: 108, z: 46 },
  "actor.fact-to-benefit": { scale: 0.88, x: -116, y: 72, z: 4 },
  "actor.human-review": { scale: 0.88, x: 60, y: 36, z: 32 },
  "actor.integration-ring": { scale: 1.16, x: -146, y: -86, z: -34 },
  "actor.judgement-question": { scale: 0.92, x: -42, y: 30, z: 24 },
  "actor.ledger-dial": { scale: 0.92, x: -60, y: 58, z: 24 },
  "actor.output-cards": { scale: 0.84, x: 104, y: 86, z: 2 },
  "actor.product-stage": { scale: 0.94, x: 80, y: -80, z: 36 },
  "actor.safety-boundary": { scale: 1, x: -12, y: -12, z: 22 },
  "actor.scenario-radar": { scale: 0.9, x: -180, y: 108, z: 28 },
  "actor.source-packet": { scale: 0.84, x: -242, y: 78, z: 0 }
};
