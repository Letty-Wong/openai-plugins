import { beatById, beats } from "@/content/beats";
import { sceneById } from "@/content/scenes";
import type { BeatId, ContentStatus, ScreenCopy } from "@/presentation/core/state-types";
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

export type LabWorldTone = "dark" | "paper";
export type CameraPresence = "featured" | "support" | "ambient" | "latent" | "offscreen";

export type LabWorldTarget = {
  readonly lightingMode: "judgement" | "ledger" | "product" | "safety" | "action" | "finale";
  readonly tone: LabWorldTone;
};

export type LabCameraTarget = CameraPose & {
  readonly focusActorId?: StageActorId;
  readonly perspective: number;
};

export type RingSegmentProgress = readonly [number, number, number, number, number];

export type RingGeometryTarget = {
  readonly gap: number;
  readonly glow: number;
  readonly portalRadius: number;
  readonly role: string;
  readonly segmentProgress: RingSegmentProgress;
  readonly thickness: number;
};

export type LabActorTarget = {
  readonly actorId: StageActorId;
  readonly cameraPresence: CameraPresence;
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

export type IntegrationRingActorTarget = LabActorTarget & {
  readonly geometry: RingGeometryTarget;
};

export type LabActorTargets = Readonly<Record<StageActorId, LabActorTarget>> & {
  readonly "actor.integration-ring": IntegrationRingActorTarget;
};

export type LabArtifactTarget = {
  readonly artifactId: LabArtifactId;
  readonly cameraPresence: CameraPresence;
  readonly lifecycle: ActorLifecyclePhase;
  readonly mode: LabArtifactMode;
  readonly opacity: number;
  readonly scale: number;
  readonly visible: boolean;
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
  readonly actors: LabActorTargets;
  readonly artifacts: Readonly<Record<LabArtifactId, LabArtifactTarget>>;
  readonly beatId: BeatId;
  readonly camera: LabCameraTarget;
  readonly copy: LabCopyTarget;
  readonly id: string;
  readonly movementKind: BeatMovementKind;
  readonly product: LabProductTarget;
  readonly reducedMotion: boolean;
  readonly routePhase: RoutePhase;
  readonly sceneNumber: number;
  readonly transition?: LabTransitionTarget;
  readonly world: LabWorldTarget;
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

const spatialBeatIds = [
  "01.1",
  "02.1",
  "03.1",
  "04.7",
  "05.1",
  "08.7",
  "09.1",
  "10.1",
  "12.1",
  "15.8",
  "16.1",
  "18.9",
  "19.1",
  "19.9",
  "20.1",
  "20.10",
  "21.1"
] as const satisfies readonly BeatId[];

const actorBeatIds = [
  "01.2",
  "01.3",
  "02.1",
  "02.4",
  "03.5",
  "03.7",
  "04.2",
  "05.2",
  "06.1",
  "06.6",
  "07.1",
  "07.4",
  "07.8",
  "08.3",
  "08.5",
  "09.3",
  "09.5",
  "10.3",
  "10.6",
  "11.1",
  "11.6",
  "12.4",
  "12.6",
  "13.2",
  "13.8",
  "14.3",
  "14.7",
  "15.4",
  "16.3",
  "17.4",
  "17.9",
  "18.4",
  "18.7",
  "19.6",
  "20.4",
  "21.4",
  "21.7"
] as const satisfies readonly BeatId[];

const spatialBeatIdSet = new Set<BeatId>(spatialBeatIds);
const actorBeatIdSet = new Set<BeatId>(actorBeatIds);

const movementKindByBeatId: Readonly<Record<BeatId, BeatMovementKind>> = Object.fromEntries(
  beats.map((beat) => [
    beat.id,
    spatialBeatIdSet.has(beat.id)
      ? "spatial"
      : actorBeatIdSet.has(beat.id)
        ? "actor"
        : "stable"
  ])
) as Readonly<Record<BeatId, BeatMovementKind>>;

const transitionMetadataByBeatId: Readonly<Partial<Record<BeatId, LabTransitionTarget>>> = {
  "09.1": {
    acceptanceFocus: [
      "Metadata only until Gate A passes",
      "No transition waypoint is implemented in FIX-A3",
      "Ring and ProductStage keep stable actor ids"
    ],
    gate: "SR-04",
    id: "transition.08-09.horizontal-product-turn",
    kind: "turn-horizontal-product",
    label: "纵向转入横向产品段"
  },
  "16.1": {
    acceptanceFocus: [
      "Metadata only until Gate A passes",
      "No forward portal waypoint is implemented in FIX-A3",
      "Safety boundary is an absolute endpoint target"
    ],
    gate: "SR-05",
    id: "transition.15-16.forward-safety-portal",
    kind: "portal-forward-safety",
    label: "穿过接入环进入安全空间"
  },
  "21.1": {
    acceptanceFocus: [
      "Metadata only until Gate A passes",
      "No dolly-back waypoint is implemented in FIX-A3",
      "Final loop is a deterministic endpoint"
    ],
    gate: "SR-06",
    id: "transition.20-21.backward-loop-reveal",
    kind: "dolly-back-finale",
    label: "后拉揭示完整接入环"
  }
};

type ProofActorPatch = Partial<Record<StageActorId, Partial<PoseSeed> & {
  readonly cameraPresence?: CameraPresence;
}>>;

type ProofTarget = {
  readonly actorPatches: ProofActorPatch;
  readonly camera: LabCameraTarget;
  readonly ringGeometry: RingGeometryTarget;
  readonly world: LabWorldTarget;
};

const fixA4ProofBeatIds = ["01.1", "02.1", "03.1", "04.7", "05.1", "08.7"] as const satisfies readonly BeatId[];
const fixA4ProofBeatIdSet = new Set<BeatId>(fixA4ProofBeatIds);

const fixA4ProofTargets: Readonly<Record<(typeof fixA4ProofBeatIds)[number], ProofTarget>> = {
  "01.1": {
    actorPatches: {
      "actor.integration-ring": { cameraPresence: "support", scale: 1.02, x: -176, y: -92, z: -60 },
      "actor.judgement-question": { cameraPresence: "featured", scale: 1, x: 82, y: -34, z: 80 }
    },
    camera: {
      depthBand: "mid",
      focusActorId: "actor.judgement-question",
      perspective: 1120,
      poseId: "camera.fix-a4.judgement-entry",
      rotationX: 3,
      rotationY: -2,
      rotationZ: 0,
      scale: 1,
      x: 0,
      y: -52,
      z: 0
    },
    ringGeometry: {
      gap: 34,
      glow: 0.24,
      portalRadius: 106,
      role: "judgement-entry",
      segmentProgress: [0.52, 0.44, 0.36, 0.3, 0.22],
      thickness: 8
    },
    world: { lightingMode: "judgement", tone: "dark" }
  },
  "02.1": {
    actorPatches: {
      "actor.integration-ring": { cameraPresence: "support", scale: 1.07, x: -148, y: -78, z: -26 },
      "actor.judgement-question": { cameraPresence: "featured", scale: 0.96, x: 70, y: -6, z: 90 }
    },
    camera: {
      depthBand: "mid",
      focusActorId: "actor.judgement-question",
      perspective: 1140,
      poseId: "camera.fix-a4.judgement-through",
      rotationX: 4,
      rotationY: -3,
      rotationZ: 0,
      scale: 1.01,
      x: -8,
      y: -78,
      z: 10
    },
    ringGeometry: {
      gap: 28,
      glow: 0.3,
      portalRadius: 112,
      role: "judgement-through",
      segmentProgress: [0.62, 0.54, 0.46, 0.4, 0.32],
      thickness: 8
    },
    world: { lightingMode: "judgement", tone: "dark" }
  },
  "03.1": {
    actorPatches: {
      "actor.integration-ring": { cameraPresence: "ambient", scale: 1.1, x: -190, y: -118, z: -120 },
      "actor.judgement-question": { cameraPresence: "featured", scale: 1.02, x: 12, y: -10, z: 120 }
    },
    camera: {
      depthBand: "mid",
      focusActorId: "actor.judgement-question",
      perspective: 1160,
      poseId: "camera.fix-a4.trend-depth",
      rotationX: 5,
      rotationY: -4,
      rotationZ: -1,
      scale: 1.03,
      x: -20,
      y: -108,
      z: 34
    },
    ringGeometry: {
      gap: 22,
      glow: 0.34,
      portalRadius: 118,
      role: "trend-depth",
      segmentProgress: [0.74, 0.62, 0.54, 0.46, 0.38],
      thickness: 8
    },
    world: { lightingMode: "judgement", tone: "dark" }
  },
  "04.7": {
    actorPatches: {
      "actor.integration-ring": { cameraPresence: "support", scale: 1.08, x: -132, y: -96, z: -20 },
      "actor.judgement-question": { cameraPresence: "featured", scale: 0.94, x: 92, y: 36, z: 70 }
    },
    camera: {
      depthBand: "mid",
      focusActorId: "actor.judgement-question",
      perspective: 1180,
      poseId: "camera.fix-a4.gap-consequence",
      rotationX: 5,
      rotationY: -2,
      rotationZ: 0,
      scale: 1.02,
      x: -18,
      y: -132,
      z: 22
    },
    ringGeometry: {
      gap: 18,
      glow: 0.38,
      portalRadius: 126,
      role: "gap-consequence",
      segmentProgress: [0.82, 0.72, 0.64, 0.58, 0.48],
      thickness: 9
    },
    world: { lightingMode: "judgement", tone: "dark" }
  },
  "05.1": {
    actorPatches: {
      "actor.integration-ring": { cameraPresence: "support", scale: 1.13, x: -138, y: -88, z: -14 },
      "actor.ledger-dial": { cameraPresence: "featured", scale: 1.02, x: 62, y: 28, z: 96 }
    },
    camera: {
      depthBand: "mid",
      focusActorId: "actor.ledger-dial",
      perspective: 1160,
      poseId: "camera.fix-a4.ledger-arrival",
      rotationX: 5,
      rotationY: -3,
      rotationZ: -1,
      scale: 1.01,
      x: -20,
      y: -162,
      z: -4
    },
    ringGeometry: {
      gap: 14,
      glow: 0.42,
      portalRadius: 132,
      role: "ledger-arrival",
      segmentProgress: [0.9, 0.82, 0.74, 0.66, 0.56],
      thickness: 11
    },
    world: { lightingMode: "ledger", tone: "dark" }
  },
  "08.7": {
    actorPatches: {
      "actor.integration-ring": { cameraPresence: "support", scale: 1.06, x: -126, y: -76, z: -12 },
      "actor.product-stage": { cameraPresence: "featured", scale: 0.94, x: 96, y: -22, z: 110 }
    },
    camera: {
      depthBand: "mid",
      focusActorId: "actor.product-stage",
      perspective: 1180,
      poseId: "camera.fix-a4.capability-core",
      rotationX: 4,
      rotationY: -4,
      rotationZ: -1,
      scale: 1.02,
      x: -34,
      y: -186,
      z: 26
    },
    ringGeometry: {
      gap: 10,
      glow: 0.46,
      portalRadius: 142,
      role: "capability-core",
      segmentProgress: [0.96, 0.9, 0.84, 0.78, 0.68],
      thickness: 10
    },
    world: { lightingMode: "ledger", tone: "paper" }
  }
};

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

  const routePhase = getLabRoutePhase(scene.sceneNumber);
  const proofTarget = getFixA4ProofTarget(beatId);
  const base = createBaseTarget(beatId, routePhase, scene.sceneNumber, options.reducedMotion ?? false, proofTarget);
  const scenePatched = applyScenePatch(base, scene.sceneNumber, scene.screenCopy);
  const beatPatched = applyBeatPatch(scenePatched, beatId, beat.screenCopy);
  const metadataPatched = applyTransitionMetadataPatch(beatPatched);
  const reducedPatched = options.reducedMotion ? applyReducedMotionPatch(metadataPatched) : metadataPatched;
  const validated = validateStageTarget(reducedPatched);

  return {
    ...validated,
    id: `stage-target:${beatId}:${options.reducedMotion ? "reduced" : "motion"}`
  };
}

function createBaseTarget(
  beatId: BeatId,
  routePhase: RoutePhase,
  sceneNumber: number,
  reducedMotion: boolean,
  proofTarget: ProofTarget | undefined
): StageTarget {
  const movementKind = movementKindByBeatId[beatId];
  const productVisible = isAtOrAfter(beatId, "08.7");

  return {
    actors: createActorTargets(beatId, routePhase, proofTarget),
    artifacts: createArtifactTargets(beatId, routePhase),
    beatId,
    camera: proofTarget?.camera ?? {
      ...cameraTargetByPhase[routePhase],
      focusActorId: getStageCue(beatId).leadActorId
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
      visible: productVisible
    },
    reducedMotion,
    routePhase,
    sceneNumber,
    world: proofTarget?.world ?? createWorldTarget(routePhase)
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

function applyBeatPatch(target: StageTarget, _beatId: BeatId, screenCopy: ScreenCopy): StageTarget {
  return {
    ...target,
    copy: {
      ...target.copy,
      caption: screenCopy.finalLine ?? target.copy.caption,
      support: screenCopy.support ?? target.copy.support
    }
  };
}

function applyTransitionMetadataPatch(target: StageTarget): StageTarget {
  const transition = transitionMetadataByBeatId[target.beatId];
  if (!transition) return target;

  return {
    ...target,
    transition
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
  routePhase: RoutePhase,
  proofTarget: ProofTarget | undefined
): LabActorTargets {
  const cueByActor = new Map(getStageCue(beatId).actorCues.map((cue) => [cue.actorId, cue]));

  const entries = labActorIds.map((actorId) => {
    const cue = cueByActor.get(actorId);
    if (!cue) {
      throw new Error(`Missing stage cue for ${actorId} at ${beatId}`);
    }

    const proofPatch = proofTarget?.actorPatches[actorId];
    const pose = {
      ...actorPoseByPhase[actorId][routePhase],
      ...stripCameraPresence(proofPatch)
    };
    const forcedProductVisible = actorId === "actor.product-stage" && isAtOrAfter(beatId, "08.7");
    const lifecycleVisible = forcedProductVisible || cue.lifecycle.currentVisible;
    const lifecycle = forcedProductVisible && cue.lifecycle.phase === "off" ? "hold" : cue.lifecycle.phase;
    const cameraPresence = lifecycleVisible
      ? proofPatch?.cameraPresence ?? getDefaultCameraPresence(actorId, cue.role)
      : "offscreen";
    const visible = isCameraVisible(cameraPresence);
    const base: LabActorTarget = {
      actorId,
      cameraPresence,
      functionRole: actorFunctionRoleById[actorId],
      lifecycle,
      occlusion: actorOcclusionById[actorId],
      opacity: getActorOpacity(cameraPresence, cue.role),
      poseId: `pose.${actorId.replace("actor.", "")}.${routePhase}`,
      role: cue.role,
      rotateX: pose.rotateX ?? 0,
      rotateY: pose.rotateY ?? 0,
      rotateZ: pose.rotateZ ?? 0,
      scale: pose.scale,
      visible,
      x: pose.x,
      y: pose.y,
      z: pose.z
    };

    if (actorId === "actor.integration-ring") {
      return [
        actorId,
        {
          ...base,
          geometry: proofTarget?.ringGeometry ?? ringGeometryByPhase[routePhase]
        } satisfies IntegrationRingActorTarget
      ];
    }

    return [actorId, base];
  });

  return Object.fromEntries(entries) as LabActorTargets;
}

function createArtifactTargets(
  beatId: BeatId,
  routePhase: RoutePhase
): Readonly<Record<LabArtifactId, LabArtifactTarget>> {
  const mode = getArtifactMode(routePhase);
  const visible = isAtOrAfter(beatId, "10.1");
  const lifecycle = getArtifactLifecycle(beatId, visible);
  const phaseOffset = artifactPhaseOffsetByRoute[routePhase];

  return Object.fromEntries(
    labArtifactIds.map((artifactId, index) => {
      const base = artifactBasePoses[index];
      const cameraPresence = visible && index < 3 ? "support" : visible ? "latent" : "offscreen";
      return [
        artifactId,
        {
          artifactId,
          cameraPresence,
          lifecycle,
          mode,
          opacity: isCameraVisible(cameraPresence) ? 0.74 - index * 0.06 : 0,
          scale: isCameraVisible(cameraPresence) ? phaseOffset.scale : 0.72,
          visible: isCameraVisible(cameraPresence),
          x: isCameraVisible(cameraPresence) ? base.x + phaseOffset.x : base.x + phaseOffset.x + 460,
          y: isCameraVisible(cameraPresence) ? base.y + phaseOffset.y : base.y + phaseOffset.y + 240,
          z: isCameraVisible(cameraPresence) ? base.z + phaseOffset.z : -420
        }
      ];
    })
  ) as Readonly<Record<LabArtifactId, LabArtifactTarget>>;
}

function getArtifactLifecycle(beatId: BeatId, visible: boolean): ActorLifecyclePhase {
  if (!visible) return "off";
  if (beatId === "10.1") return "enter";
  if (beatId === "21.9") return "exit";
  return "hold";
}

function getArtifactMode(routePhase: RoutePhase): LabArtifactMode {
  if (routePhase === "product") return "benefit";
  if (routePhase === "safety") return "review";
  if (routePhase === "action" || routePhase === "finale") return "route";
  if (routePhase === "ledger") return "source";
  return "placeholder";
}

function createWorldTarget(routePhase: RoutePhase): LabWorldTarget {
  return {
    lightingMode: routePhase,
    tone: routePhase === "product" || routePhase === "finale" ? "paper" : "dark"
  };
}

export function validateStageTarget(target: StageTarget): StageTarget {
  Object.values(target.actors).forEach((actor) => {
    assertLifecycleInvariant(target.beatId, actor.actorId, actor);
  });

  Object.values(target.artifacts).forEach((artifact) => {
    assertLifecycleInvariant(target.beatId, artifact.artifactId, artifact);
  });

  const ring = target.actors["actor.integration-ring"];
  if (ring.geometry.segmentProgress.length !== 5) {
    throw new Error(`Invalid Ring segmentProgress tuple at ${target.beatId}`);
  }

  const product = target.actors["actor.product-stage"];
  if (target.product.visible !== product.visible) {
    throw new Error(`Product visibility mismatch at ${target.beatId}`);
  }

  assertCameraPresenceBudget(target);

  return target;
}

function assertLifecycleInvariant(
  beatId: BeatId,
  id: StageActorId | LabArtifactId,
  item: Pick<LabActorTarget | LabArtifactTarget, "lifecycle" | "opacity" | "visible">
) {
  if (item.lifecycle === "off" && (item.visible || item.opacity !== 0)) {
    throw new Error(`${beatId} ${id} violates off lifecycle invariant`);
  }

  if (!item.visible && item.opacity !== 0) {
    throw new Error(`${beatId} ${id} violates hidden opacity invariant`);
  }

  if (item.visible && item.lifecycle === "off") {
    throw new Error(`${beatId} ${id} violates visible lifecycle invariant`);
  }
}

function assertCameraPresenceBudget(target: StageTarget) {
  const actorPresences = Object.values(target.actors).map((actor) => actor.cameraPresence);
  const featured = actorPresences.filter((presence) => presence === "featured").length;
  const support = actorPresences.filter((presence) => presence === "support").length;
  const ambient = actorPresences.filter((presence) => presence === "ambient").length;
  const visibleArtifacts = Object.values(target.artifacts).filter((artifact) => artifact.visible).length;

  if (featured !== 1) {
    throw new Error(`${target.beatId} must have exactly one featured actor, got ${featured}`);
  }

  if (support > 2) {
    throw new Error(`${target.beatId} has too many support actors: ${support}`);
  }

  if (ambient > 1) {
    throw new Error(`${target.beatId} has too many ambient actors: ${ambient}`);
  }

  if (visibleArtifacts > 3) {
    throw new Error(`${target.beatId} has too many visible artifacts: ${visibleArtifacts}`);
  }
}

export function assertMovementDelta(previousTarget: StageTarget, nextTarget: StageTarget) {
  if (nextTarget.movementKind === "stable") {
    assertStablePoseEquality(previousTarget, nextTarget);
    return;
  }

  if (nextTarget.movementKind === "spatial" && !hasCameraOrWorldDelta(previousTarget, nextTarget)) {
    throw new Error(`${nextTarget.beatId} is spatial but camera/world pose did not change`);
  }

  if (nextTarget.movementKind === "actor" && !hasActorArtifactOrRingDelta(previousTarget, nextTarget)) {
    throw new Error(`${nextTarget.beatId} is actor but actor/artifact/ring pose did not change`);
  }
}

function hasCameraOrWorldDelta(previousTarget: StageTarget, nextTarget: StageTarget) {
  return JSON.stringify(cameraPoseForEquality(previousTarget.camera)) !== JSON.stringify(cameraPoseForEquality(nextTarget.camera))
    || JSON.stringify(previousTarget.world) !== JSON.stringify(nextTarget.world);
}

function hasActorArtifactOrRingDelta(previousTarget: StageTarget, nextTarget: StageTarget) {
  const actorDelta = labActorIds.some((actorId) => {
    const previous = previousTarget.actors[actorId];
    const next = nextTarget.actors[actorId];
    return JSON.stringify(actorPoseForEquality(previous)) !== JSON.stringify(actorPoseForEquality(next))
      || previous.cameraPresence !== next.cameraPresence
      || (actorId === "actor.integration-ring"
        && JSON.stringify((previous as IntegrationRingActorTarget).geometry) !== JSON.stringify((next as IntegrationRingActorTarget).geometry));
  });

  const artifactDelta = labArtifactIds.some((artifactId) => {
    const previous = previousTarget.artifacts[artifactId];
    const next = nextTarget.artifacts[artifactId];
    return JSON.stringify(artifactPoseForEquality(previous)) !== JSON.stringify(artifactPoseForEquality(next))
      || previous.cameraPresence !== next.cameraPresence;
  });

  return actorDelta || artifactDelta;
}

export function assertStablePoseEquality(previousTarget: StageTarget, nextTarget: StageTarget) {
  if (previousTarget.movementKind !== "stable" || nextTarget.movementKind !== "stable") return;

  assertEqualPose(`camera ${previousTarget.beatId}->${nextTarget.beatId}`, cameraPoseForEquality(previousTarget.camera), cameraPoseForEquality(nextTarget.camera));

  labActorIds.forEach((actorId) => {
    assertEqualPose(
      `${actorId} ${previousTarget.beatId}->${nextTarget.beatId}`,
      actorPoseForEquality(previousTarget.actors[actorId]),
      actorPoseForEquality(nextTarget.actors[actorId])
    );
  });

  labArtifactIds.forEach((artifactId) => {
    assertEqualPose(
      `${artifactId} ${previousTarget.beatId}->${nextTarget.beatId}`,
      artifactPoseForEquality(previousTarget.artifacts[artifactId]),
      artifactPoseForEquality(nextTarget.artifacts[artifactId])
    );
  });
}

function assertEqualPose(label: string, previous: unknown, next: unknown) {
  if (JSON.stringify(previous) !== JSON.stringify(next)) {
    throw new Error(`Stable pose changed for ${label}`);
  }
}

function cameraPoseForEquality(camera: LabCameraTarget) {
  return {
    perspective: camera.perspective,
    rotationX: camera.rotationX,
    rotationY: camera.rotationY,
    rotationZ: camera.rotationZ,
    scale: camera.scale,
    x: camera.x,
    y: camera.y,
    z: camera.z
  };
}

function actorPoseForEquality(actor: LabActorTarget) {
  return {
    opacity: actor.opacity,
    rotateX: actor.rotateX,
    rotateY: actor.rotateY,
    rotateZ: actor.rotateZ,
    scale: actor.scale,
    x: actor.x,
    y: actor.y,
    z: actor.z
  };
}

function artifactPoseForEquality(artifact: LabArtifactTarget) {
  return {
    opacity: artifact.opacity,
    scale: artifact.scale,
    x: artifact.x,
    y: artifact.y,
    z: artifact.z
  };
}

function getFixA4ProofTarget(beatId: BeatId): ProofTarget | undefined {
  if (!fixA4ProofBeatIdSet.has(beatId)) return undefined;
  return fixA4ProofTargets[beatId as (typeof fixA4ProofBeatIds)[number]];
}

function stripCameraPresence(
  patch: (Partial<PoseSeed> & { readonly cameraPresence?: CameraPresence }) | undefined
): Partial<PoseSeed> {
  if (!patch) return {};
  const pose: {
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    scale?: number;
    x?: number;
    y?: number;
    z?: number;
  } = {};
  if (patch.rotateX !== undefined) pose.rotateX = patch.rotateX;
  if (patch.rotateY !== undefined) pose.rotateY = patch.rotateY;
  if (patch.rotateZ !== undefined) pose.rotateZ = patch.rotateZ;
  if (patch.scale !== undefined) pose.scale = patch.scale;
  if (patch.x !== undefined) pose.x = patch.x;
  if (patch.y !== undefined) pose.y = patch.y;
  if (patch.z !== undefined) pose.z = patch.z;
  return pose;
}

function getDefaultCameraPresence(actorId: StageActorId, role: StageActorRole): CameraPresence {
  if (role === "lead") return "featured";

  if (
    role === "support"
    && (
      actorId === "actor.integration-ring"
      || actorId === "actor.product-stage"
      || actorId === "actor.safety-boundary"
      || actorId === "actor.action-path"
    )
  ) {
    return "support";
  }

  return "latent";
}

function isCameraVisible(cameraPresence: CameraPresence) {
  return cameraPresence === "featured" || cameraPresence === "support" || cameraPresence === "ambient";
}

function getActorOpacity(cameraPresence: CameraPresence, role: StageActorRole) {
  if (cameraPresence === "featured") return 0.98;
  if (cameraPresence === "support") return role === "lead" ? 0.9 : 0.72;
  if (cameraPresence === "ambient") return 0.22;
  return 0;
}

function getLabRoutePhase(sceneNumber: number): RoutePhase {
  if (sceneNumber <= 4) return "judgement";
  if (sceneNumber <= 8) return "ledger";
  if (sceneNumber <= 15) return "product";
  if (sceneNumber <= 18) return "safety";
  if (sceneNumber <= 20) return "action";
  return "finale";
}

function isAtOrAfter(beatId: BeatId, firstBeatId: BeatId) {
  return getBeatOrder(beatId) >= getBeatOrder(firstBeatId);
}

function getBeatOrder(beatId: BeatId) {
  const beat = beatById.get(beatId);
  if (!beat) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }
  return beat.order;
}

const cameraTargetByPhase: Record<RoutePhase, LabCameraTarget> = {
  action: {
    depthBand: "mid",
    perspective: 1200,
    poseId: "camera.lab.action-vertical",
    rotationX: 3,
    rotationY: 4,
    rotationZ: 0,
    scale: 1.02,
    x: -120,
    y: -250,
    z: 60
  },
  finale: {
    depthBand: "far",
    perspective: 1380,
    poseId: "camera.lab.finale-loop",
    rotationX: 8,
    rotationY: 0,
    rotationZ: 0,
    scale: 0.78,
    x: 0,
    y: -180,
    z: -220
  },
  judgement: {
    depthBand: "mid",
    perspective: 1100,
    poseId: "camera.lab.judgement-vertical",
    rotationX: 4,
    rotationY: -2,
    rotationZ: 0,
    scale: 1,
    x: 0,
    y: -90,
    z: 0
  },
  ledger: {
    depthBand: "mid",
    perspective: 1120,
    poseId: "camera.lab.ledger-vertical",
    rotationX: 5,
    rotationY: -3,
    rotationZ: -1,
    scale: 0.98,
    x: -16,
    y: -135,
    z: -24
  },
  product: {
    depthBand: "near",
    perspective: 1180,
    poseId: "camera.lab.product-horizontal",
    rotationX: 2,
    rotationY: -8,
    rotationZ: 0,
    scale: 1.05,
    x: -130,
    y: -112,
    z: 72
  },
  safety: {
    depthBand: "near",
    perspective: 1280,
    poseId: "camera.lab.safety-forward",
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    scale: 1.12,
    x: -160,
    y: -162,
    z: 150
  }
};

const ringGeometryByPhase: Record<RoutePhase, RingGeometryTarget> = {
  action: {
    gap: 14,
    glow: 0.5,
    portalRadius: 150,
    role: "action-route",
    segmentProgress: [1, 0.94, 0.82, 0.76, 0.62],
    thickness: 8
  },
  finale: {
    gap: 0,
    glow: 0.58,
    portalRadius: 260,
    role: "final-loop",
    segmentProgress: [1, 1, 1, 1, 1],
    thickness: 9
  },
  judgement: {
    gap: 28,
    glow: 0.26,
    portalRadius: 108,
    role: "judgement",
    segmentProgress: [0.72, 0.64, 0.54, 0.48, 0.42],
    thickness: 8
  },
  ledger: {
    gap: 20,
    glow: 0.36,
    portalRadius: 122,
    role: "ledger",
    segmentProgress: [0.78, 0.72, 0.66, 0.58, 0.52],
    thickness: 12
  },
  product: {
    gap: 26,
    glow: 0.48,
    portalRadius: 150,
    role: "product-gate",
    segmentProgress: [0.86, 0.78, 0.64, 0.48, 0.38],
    thickness: 8
  },
  safety: {
    gap: 36,
    glow: 0.72,
    portalRadius: 190,
    role: "safety-boundary",
    segmentProgress: [0.96, 0.78, 0.52, 0.4, 0.32],
    thickness: 10
  }
};

type PoseSeed = {
  readonly rotateX?: number;
  readonly rotateY?: number;
  readonly rotateZ?: number;
  readonly scale: number;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

const actorPoseByPhase: Record<(typeof labActorIds)[number], Record<RoutePhase, PoseSeed>> = {
  "actor.action-confirm-gate": phasePose({ scale: 0.88, x: 180, y: 34, z: 34 }),
  "actor.action-path": {
    action: { rotateX: 6, scale: 1, x: 10, y: 118, z: 20 },
    finale: { rotateX: 8, scale: 0.94, x: -20, y: 96, z: 40 },
    judgement: { scale: 0.82, x: 310, y: 150, z: -160 },
    ledger: { scale: 0.82, x: 310, y: 150, z: -160 },
    product: { scale: 0.86, x: 300, y: 150, z: -130 },
    safety: { scale: 0.9, x: 250, y: 130, z: -40 }
  },
  "actor.cta-dock": phasePose({ scale: 0.86, x: 242, y: 108, z: 46 }),
  "actor.fact-to-benefit": phasePose({ scale: 0.88, x: -116, y: 72, z: 4 }),
  "actor.human-review": phasePose({ scale: 0.88, x: 60, y: 36, z: 32 }),
  "actor.integration-ring": {
    action: { scale: 1.08, x: -90, y: -42, z: 10 },
    finale: { rotateX: 8, scale: 1.32, x: -90, y: -32, z: -120 },
    judgement: { scale: 1.08, x: -146, y: -86, z: -34 },
    ledger: { scale: 1.16, x: -146, y: -86, z: -34 },
    product: { rotateY: -10, scale: 1.08, x: -118, y: -58, z: 8 },
    safety: { rotateX: -4, scale: 1.22, x: -158, y: -74, z: 210 }
  },
  "actor.judgement-question": phasePose({ scale: 0.92, x: -42, y: 30, z: 24 }),
  "actor.ledger-dial": phasePose({ scale: 0.92, x: -60, y: 58, z: 24 }),
  "actor.output-cards": phasePose({ scale: 0.84, x: 104, y: 86, z: 2 }),
  "actor.product-stage": {
    action: { scale: 0.72, x: -270, y: -88, z: -140 },
    finale: { scale: 0.72, x: -270, y: -88, z: -140 },
    judgement: { scale: 0.8, x: 220, y: -90, z: -160 },
    ledger: { scale: 0.9, x: 116, y: -78, z: 0 },
    product: { rotateY: -10, scale: 0.98, x: 58, y: -32, z: 120 },
    safety: { scale: 0.82, x: -18, y: -132, z: -80 }
  },
  "actor.safety-boundary": phasePose({ scale: 1, x: -12, y: -12, z: 22 }),
  "actor.scenario-radar": phasePose({ scale: 0.9, x: -180, y: 108, z: 28 }),
  "actor.source-packet": phasePose({ scale: 0.84, x: -242, y: 78, z: 0 })
};

function phasePose(seed: PoseSeed): Record<RoutePhase, PoseSeed> {
  return {
    action: seed,
    finale: seed,
    judgement: seed,
    ledger: seed,
    product: seed,
    safety: seed
  };
}

const actorFunctionRoleById: Record<(typeof labActorIds)[number], string> = {
  "actor.action-confirm-gate": "execution authorization",
  "actor.action-path": "action route",
  "actor.cta-dock": "cta placeholder",
  "actor.fact-to-benefit": "artifact translation",
  "actor.human-review": "content review",
  "actor.integration-ring": "global continuity ring",
  "actor.judgement-question": "judgement prompt",
  "actor.ledger-dial": "business ledger",
  "actor.output-cards": "output stack",
  "actor.product-stage": "persistent product",
  "actor.safety-boundary": "safety boundary",
  "actor.scenario-radar": "scenario radar",
  "actor.source-packet": "source packet"
};

const actorOcclusionById: Record<(typeof labActorIds)[number], SpatialOcclusion> = {
  "actor.action-confirm-gate": "foreground",
  "actor.action-path": "foreground",
  "actor.cta-dock": "foreground",
  "actor.fact-to-benefit": "midground",
  "actor.human-review": "foreground",
  "actor.integration-ring": "midground",
  "actor.judgement-question": "foreground",
  "actor.ledger-dial": "foreground",
  "actor.output-cards": "midground",
  "actor.product-stage": "midground",
  "actor.safety-boundary": "midground",
  "actor.scenario-radar": "foreground",
  "actor.source-packet": "midground"
};

const artifactBasePoses = [
  { x: -170, y: 160, z: 40 },
  { x: -102, y: 118, z: 56 },
  { x: -34, y: 160, z: 72 },
  { x: 34, y: 118, z: 88 },
  { x: 102, y: 160, z: 104 },
  { x: 170, y: 118, z: 120 }
] as const;

const artifactPhaseOffsetByRoute: Record<RoutePhase, { readonly scale: number; readonly x: number; readonly y: number; readonly z: number }> = {
  action: { scale: 0.78, x: -30, y: 18, z: -30 },
  finale: { scale: 0.72, x: 0, y: 0, z: -120 },
  judgement: { scale: 0.9, x: 0, y: 0, z: 0 },
  ledger: { scale: 0.9, x: 0, y: 0, z: -20 },
  product: { scale: 0.9, x: 0, y: 0, z: 0 },
  safety: { scale: 0.84, x: 42, y: -24, z: 80 }
};
