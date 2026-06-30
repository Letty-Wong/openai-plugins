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
  | "poster"
  | "storyboard"
  | "email-faq"
  | "department-output"
  | "output"
  | "review"
  | "route"
  | "placeholder";

export type LabTransitionGate = "SR-04" | "SR-05" | "SR-06";

export type LabWorldTone = "dark" | "paper";
export type LabWorldMotionState = "active" | "frozen" | "portal" | "settled";
export type CameraPresence = "featured" | "support" | "ambient" | "latent" | "offscreen";

export type LabWorldTarget = {
  readonly lightingMode: "judgement" | "ledger" | "product" | "safety" | "action" | "finale";
  readonly motionState: LabWorldMotionState;
  readonly tone: LabWorldTone;
};

export type WorldField = LabWorldTarget & {
  readonly compression: number;
  readonly density: number;
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

export type LabPortalTarget = {
  readonly edgeProgress: number;
  readonly oldWorldOpacity: number;
  readonly opacity: number;
  readonly radius: number;
  readonly safetyOpacity: number;
  readonly scale: number;
  readonly visible: boolean;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};

export type LabSafetyNodeTarget = {
  readonly id: "data" | "tool" | "content" | "permission";
  readonly label: "资料" | "工具" | "内容" | "权限";
  readonly visible: boolean;
};

export type PrimaryAnchor = {
  readonly id: string;
  readonly type: "camera" | "actor" | "artifact" | "world";
};

export type SpatialWaypointTarget = {
  readonly actors: LabActorTargets;
  readonly artifacts: Readonly<Record<LabArtifactId, LabArtifactTarget>>;
  readonly camera: LabCameraTarget;
  readonly portal: LabPortalTarget;
  readonly world: LabWorldTarget;
};

export type SpatialState = Omit<SpatialWaypointTarget, "world"> & {
  readonly id: string;
  readonly label: string;
  readonly primaryAnchor: PrimaryAnchor;
  readonly ring: RingGeometryTarget;
  readonly world: WorldField;
};

export type SpatialWaypoint = {
  readonly duration: number;
  readonly id: string;
  readonly label: string;
  readonly target: SpatialWaypointTarget;
};

export type SpatialTransitionPlan = {
  readonly fromBeatId: BeatId;
  readonly id: string;
  readonly model: "spatial-state";
  readonly states: readonly SpatialState[];
  readonly toBeatId: BeatId;
};

export type LegacySpatialWaypointPlan = {
  readonly fromBeatId: BeatId;
  readonly id: string;
  readonly model: "legacy-waypoint";
  readonly toBeatId: BeatId;
  readonly waypoints: readonly SpatialWaypoint[];
};

export type LabTransitionPlan = SpatialTransitionPlan | LegacySpatialWaypointPlan;

export type StageTarget = {
  readonly actors: LabActorTargets;
  readonly artifacts: Readonly<Record<LabArtifactId, LabArtifactTarget>>;
  readonly beatId: BeatId;
  readonly camera: LabCameraTarget;
  readonly copy: LabCopyTarget;
  readonly id: string;
  readonly movementKind: BeatMovementKind;
  readonly portal: LabPortalTarget;
  readonly product: LabProductTarget;
  readonly reducedMotion: boolean;
  readonly routePhase: RoutePhase;
  readonly safetyNodes: readonly LabSafetyNodeTarget[];
  readonly sceneNumber: number;
  readonly transition?: LabTransitionTarget;
  readonly transitionPlan?: LabTransitionPlan;
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

export const labSafetyNodes = [
  { id: "data", label: "资料" },
  { id: "tool", label: "工具" },
  { id: "content", label: "内容" },
  { id: "permission", label: "权限" }
] as const satisfies readonly Omit<LabSafetyNodeTarget, "visible">[];

const spatialBeatIds = [
  "01.1",
  "02.1",
  "03.1",
  "04.7",
  "05.1",
  "08.7",
  "09.1",
  "10.1",
  "11.1",
  "12.1",
  "13.1",
  "14.1",
  "15.1",
  "15.8",
  "16.1",
  "17.1",
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
const beatOrderIndex = new Map(beats.map((beat, index) => [beat.id, index]));

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
      "FT-01 horizontal product journey endpoint is active",
      "ProductStage stays near the visual center",
      "Ring and ProductStage keep stable actor ids"
    ],
    gate: "SR-04",
    id: "transition.08-09.horizontal-product-turn",
    kind: "turn-horizontal-product",
    label: "纵向转入横向产品段"
  },
  "16.1": {
    acceptanceFocus: [
      "FT-02 forward safety portal spatial states are active",
      "Ring and ProductStage keep stable actor ids",
      "Reduced motion establishes the safety endpoint without a large Z-axis tunnel"
    ],
    gate: "SR-05",
    id: "transition.15-16.forward-safety-portal",
    kind: "portal-forward-safety",
    label: "穿过接入环进入安全空间"
  },
  "21.1": {
    acceptanceFocus: [
      "FT-04 dolly-back loop waypoints are active",
      "CTA remains a placeholder without a real QR code",
      "IntegrationRing, ProductStage, ActionPath, and CtaDock share one final stage"
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

type ProofArtifactPatch = Partial<Record<LabArtifactId, Partial<Pick<
  LabArtifactTarget,
  "cameraPresence" | "mode" | "scale" | "x" | "y" | "z"
>>>>;

type ProofTarget = {
  readonly actorPatches: ProofActorPatch;
  readonly artifactPatches?: ProofArtifactPatch;
  readonly camera: LabCameraTarget;
  readonly portal?: LabPortalTarget;
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
    world: { lightingMode: "judgement", motionState: "active", tone: "dark" }
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
    world: { lightingMode: "judgement", motionState: "active", tone: "dark" }
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
    world: { lightingMode: "judgement", motionState: "active", tone: "dark" }
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
    world: { lightingMode: "judgement", motionState: "active", tone: "dark" }
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
    world: { lightingMode: "ledger", motionState: "active", tone: "dark" }
  },
  "08.7": {
    actorPatches: {
      "actor.integration-ring": { cameraPresence: "support", scale: 1.06, x: -126, y: -20, z: -12 },
      "actor.product-stage": { cameraPresence: "featured", scale: 0.94, x: 58, y: 24, z: 110 }
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
      y: -34,
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
    world: { lightingMode: "ledger", motionState: "active", tone: "paper" }
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
  const proofTarget = getExplicitStageTarget(beatId, scene.sceneNumber);
  const base = createBaseTarget(beatId, routePhase, scene.sceneNumber, options.reducedMotion ?? false, proofTarget);
  const scenePatched = applyScenePatch(base, scene.sceneNumber, scene.screenCopy);
  const beatPatched = applyBeatPatch(scenePatched, beatId, beat.screenCopy);
  const metadataPatched = applyTransitionMetadataPatch(beatPatched);
  const reducedPatched = options.reducedMotion ? applyReducedMotionPatch(metadataPatched) : metadataPatched;
  const validated = validateStageTarget(reducedPatched);
  const planned = attachSpatialTransitionPlan(validated, options.reducedMotion ?? false);

  return {
    ...planned,
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
    artifacts: createArtifactTargets(beatId, routePhase, proofTarget),
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
    portal: proofTarget?.portal ?? createPortalTarget(),
    product: {
      anchoredFromBeatId: "08.7",
      label: "ProductStage grey block",
      placeholderOnly: true,
      visible: productVisible
    },
    reducedMotion,
    routePhase,
    safetyNodes: createSafetyNodeTargets(beatId),
    sceneNumber,
    world: proofTarget?.world ?? createWorldTarget(routePhase)
  };
}

function createSafetyNodeTargets(beatId: BeatId): readonly LabSafetyNodeTarget[] {
  const visible = isAtOrAfter(beatId, "16.1") && !isAtOrAfter(beatId, "19.9");
  return labSafetyNodes.map((node) => ({ ...node, visible }));
}

function createPortalTarget(overrides: Partial<LabPortalTarget> = {}): LabPortalTarget {
  return {
    edgeProgress: 0,
    oldWorldOpacity: 0,
    opacity: 0,
    radius: 120,
    safetyOpacity: 0,
    scale: 1,
    visible: false,
    x: -138,
    y: -6,
    z: 80,
    ...overrides
  };
}

function applyScenePatch(target: StageTarget, sceneNumber: number, screenCopy: ScreenCopy): StageTarget {
  return {
    ...target,
    copy: {
      caption: screenCopy.finalLine ?? "",
      eyebrow: `第 ${String(sceneNumber).padStart(2, "0")} 幕 / ${getRoutePhaseAudienceLabel(target.routePhase)}`,
      headline: screenCopy.title,
      status: screenCopy.status,
      support: screenCopy.support ?? ""
    }
  };
}

function getRoutePhaseAudienceLabel(routePhase: RoutePhase) {
  if (routePhase === "judgement") return "判断入口";
  if (routePhase === "ledger") return "能力接入";
  if (routePhase === "product") return "产品旅程";
  if (routePhase === "safety") return "安全空间";
  if (routePhase === "action") return "行动路径";
  return "闭环";
}

function applyBeatPatch(target: StageTarget, beatId: BeatId, screenCopy: ScreenCopy): StageTarget {
  if (beatId === "15.8") {
    return {
      ...target,
      copy: {
        ...target.copy,
        caption: "生成速度不是企业能力的全部",
        headline: "快，还不够。",
        support: ""
      }
    };
  }

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
    const proofVisible = proofPatch?.cameraPresence !== undefined && isCameraVisible(proofPatch.cameraPresence);
    const lifecycleVisible = forcedProductVisible || proofVisible || cue.lifecycle.currentVisible;
    const lifecycle = (forcedProductVisible || proofVisible) && cue.lifecycle.phase === "off" ? "hold" : cue.lifecycle.phase;
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
  routePhase: RoutePhase,
  proofTarget: ProofTarget | undefined
): Readonly<Record<LabArtifactId, LabArtifactTarget>> {
  const mode = getArtifactMode(routePhase);
  const phaseOffset = artifactPhaseOffsetByRoute[routePhase];

  return Object.fromEntries(
    labArtifactIds.map((artifactId, index) => {
      const base = artifactBasePoses[index];
      const proofPatch = proofTarget?.artifactPatches?.[artifactId];
      const lifecycleVisible = isAtOrAfter(beatId, "10.1") || proofPatch !== undefined;
      const lifecycle = getArtifactLifecycle(beatId, lifecycleVisible);
      const cameraPresence = proofPatch?.cameraPresence
        ?? (lifecycleVisible && index < 3 ? "support" : lifecycleVisible ? "latent" : "offscreen");
      const visible = isCameraVisible(cameraPresence);
      return [
        artifactId,
        {
          artifactId,
          cameraPresence,
          lifecycle,
          mode: proofPatch?.mode ?? mode,
          opacity: visible ? 0.74 - index * 0.06 : 0,
          scale: proofPatch?.scale ?? (visible ? phaseOffset.scale : 0.72),
          visible,
          x: proofPatch?.x ?? (visible ? base.x + phaseOffset.x : base.x + phaseOffset.x + 460),
          y: proofPatch?.y ?? (visible ? base.y + phaseOffset.y : base.y + phaseOffset.y + 240),
          z: proofPatch?.z ?? (visible ? base.z + phaseOffset.z : -420)
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
    motionState: "active",
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

function getExplicitStageTarget(beatId: BeatId, sceneNumber: number): ProofTarget | undefined {
  return getFixA4ProofTarget(beatId)
    ?? getEarlyJudgementContinuityTarget(sceneNumber)
    ?? getLedgerContinuityTarget(beatId, sceneNumber)
    ?? getCapabilityAccumulationTarget(beatId, sceneNumber)
    ?? getFt01ProductJourneyTarget(beatId, sceneNumber)
    ?? getFt02SafetyPortalTarget(beatId)
    ?? getFt03SafetyActionTarget(beatId, sceneNumber)
    ?? getFt04FinaleTarget(beatId);
}

function isBeatBetween(beatId: BeatId, startBeatId: BeatId, endBeatId: BeatId) {
  const beatIndex = beatOrderIndex.get(beatId);
  const startIndex = beatOrderIndex.get(startBeatId);
  const endIndex = beatOrderIndex.get(endBeatId);

  return beatIndex !== undefined
    && startIndex !== undefined
    && endIndex !== undefined
    && beatIndex >= startIndex
    && beatIndex <= endIndex;
}

type Ft01StationConfig = {
  readonly artifactMode: LabArtifactMode;
  readonly artifactX: number;
  readonly cameraX: number;
  readonly cameraY: number;
  readonly cameraZ: number;
  readonly focusZ: number;
  readonly gap: number;
  readonly glow: number;
  readonly poseId: string;
  readonly productX: number;
  readonly productY: number;
  readonly ringRole: string;
  readonly segmentProgress: RingSegmentProgress;
};

const ft01ProductJourneyStations: Readonly<Record<number, Ft01StationConfig>> = {
  9: {
    artifactMode: "source",
    artifactX: 268,
    cameraX: -34,
    cameraY: -34,
    cameraZ: 42,
    focusZ: 132,
    gap: 8,
    glow: 0.5,
    poseId: "product-source-station",
    productX: 58,
    productY: 24,
    ringRole: "product-source-gate",
    segmentProgress: [0.98, 0.92, 0.86, 0.8, 0.7]
  },
  10: {
    artifactMode: "source",
    artifactX: 178,
    cameraX: -34,
    cameraY: -32,
    cameraZ: 54,
    focusZ: 136,
    gap: 7,
    glow: 0.52,
    poseId: "product-parameter-source",
    productX: 58,
    productY: 24,
    ringRole: "parameter-ingest-gate",
    segmentProgress: [1, 0.94, 0.9, 0.84, 0.76]
  },
  11: {
    artifactMode: "benefit",
    artifactX: 86,
    cameraX: -34,
    cameraY: -30,
    cameraZ: 66,
    focusZ: 140,
    gap: 6,
    glow: 0.54,
    poseId: "product-benefit-translation",
    productX: 58,
    productY: 24,
    ringRole: "benefit-translation-gate",
    segmentProgress: [1, 0.96, 0.92, 0.88, 0.8]
  },
  12: {
    artifactMode: "poster",
    artifactX: -4,
    cameraX: -34,
    cameraY: -28,
    cameraZ: 78,
    focusZ: 144,
    gap: 5,
    glow: 0.56,
    poseId: "product-poster-workbench",
    productX: 58,
    productY: 24,
    ringRole: "poster-output-gate",
    segmentProgress: [1, 0.98, 0.94, 0.9, 0.84]
  },
  13: {
    artifactMode: "storyboard",
    artifactX: -96,
    cameraX: -34,
    cameraY: -26,
    cameraZ: 90,
    focusZ: 148,
    gap: 4,
    glow: 0.58,
    poseId: "product-storyboard-workbench",
    productX: 58,
    productY: 24,
    ringRole: "storyboard-output-gate",
    segmentProgress: [1, 1, 0.96, 0.92, 0.88]
  },
  14: {
    artifactMode: "email-faq",
    artifactX: -188,
    cameraX: -34,
    cameraY: -24,
    cameraZ: 102,
    focusZ: 150,
    gap: 3,
    glow: 0.6,
    poseId: "product-service-workbench",
    productX: 58,
    productY: 24,
    ringRole: "email-faq-output-gate",
    segmentProgress: [1, 1, 0.98, 0.96, 0.9]
  },
  15: {
    artifactMode: "department-output",
    artifactX: -86,
    cameraX: -34,
    cameraY: -22,
    cameraZ: 118,
    focusZ: 154,
    gap: 2,
    glow: 0.64,
    poseId: "product-department-output-freeze",
    productX: 58,
    productY: 24,
    ringRole: "department-output-freeze",
    segmentProgress: [1, 1, 1, 0.98, 0.94]
  }
};

function getFt01ProductJourneyTarget(beatId: BeatId, sceneNumber: number): ProofTarget | undefined {
  if (!isBetween(beatId, "09.1", "15.8")) return undefined;

  const station = ft01ProductJourneyStations[sceneNumber];
  if (!station) return undefined;

  const isFreezeBeat = beatId === "15.8";
  const poseSuffix = isFreezeBeat ? "freeze" : station.poseId;

  return {
    actorPatches: {
      "actor.integration-ring": {
        cameraPresence: "support",
        rotateY: isFreezeBeat ? -4 : -10,
        scale: isFreezeBeat ? 0.9 : 1.08,
        x: isFreezeBeat ? -146 : -112,
        y: isFreezeBeat ? 58 : -6,
        z: isFreezeBeat ? -12 : 18
      },
      "actor.product-stage": {
        cameraPresence: "featured",
        rotateY: -10,
        scale: isFreezeBeat ? 0.92 : 0.94,
        x: isFreezeBeat ? 72 : station.productX,
        y: isFreezeBeat ? 100 : station.productY,
        z: isFreezeBeat ? 168 : station.focusZ
      }
    },
    artifactPatches: createFt01ArtifactPatches(station, isFreezeBeat),
    camera: {
      depthBand: "near",
      focusActorId: "actor.product-stage",
      perspective: 1200,
      poseId: `camera.ft01.${poseSuffix}`,
      rotationX: isFreezeBeat ? 1 : 2,
      rotationY: isFreezeBeat ? -5 : -9,
      rotationZ: 0,
      scale: isFreezeBeat ? 1.02 : 1.05,
      x: station.cameraX,
      y: isFreezeBeat ? -12 : station.cameraY,
      z: isFreezeBeat ? 72 : station.cameraZ
    },
    portal: createPortalTarget({ oldWorldOpacity: 1 }),
    ringGeometry: {
      gap: isFreezeBeat ? 0 : station.gap,
      glow: isFreezeBeat ? 0.42 : station.glow,
      portalRadius: isFreezeBeat ? 146 : 150,
      role: station.ringRole,
      segmentProgress: isFreezeBeat ? [1, 1, 1, 1, 1] : station.segmentProgress,
      thickness: isFreezeBeat ? 8 : 9
    },
    world: { lightingMode: "product", motionState: isFreezeBeat ? "frozen" : "active", tone: "paper" }
  };
}

function createFt01ArtifactPatches(
  station: Ft01StationConfig,
  isFreezeBeat: boolean
): ProofArtifactPatch {
  const y = isFreezeBeat ? 228 : 126;
  const z = isFreezeBeat ? 62 : 104;
  const freezeX = -222;
  return {
    "artifact.F01": {
      cameraPresence: "support",
      mode: station.artifactMode,
      scale: isFreezeBeat ? 0.82 : 0.88,
      x: isFreezeBeat ? freezeX : station.artifactX,
      y,
      z
    },
    "artifact.F02": {
      cameraPresence: "support",
      mode: station.artifactMode,
      scale: isFreezeBeat ? 0.82 : 0.84,
      x: isFreezeBeat ? freezeX + 222 : station.artifactX + 76,
      y: isFreezeBeat ? y : y - 42,
      z: z + 18
    },
    "artifact.F03": {
      cameraPresence: "support",
      mode: station.artifactMode,
      scale: isFreezeBeat ? 0.82 : 0.8,
      x: isFreezeBeat ? freezeX + 444 : station.artifactX + 152,
      y,
      z: z + 36
    },
    "artifact.F04": {
      cameraPresence: "latent",
      mode: station.artifactMode
    },
    "artifact.F05": {
      cameraPresence: "latent",
      mode: station.artifactMode
    },
    "artifact.F06": {
      cameraPresence: "latent",
      mode: station.artifactMode
    }
  };
}

function getFt02SafetyPortalTarget(beatId: BeatId): ProofTarget | undefined {
  if (!isBeatBetween(beatId, "16.1", "16.6")) return undefined;

  return {
    actorPatches: {
      "actor.integration-ring": {
        cameraPresence: "support",
        rotateX: -2,
        rotateY: 0,
        scale: 0.94,
        x: -18,
        y: -2,
        z: 164
      },
      "actor.product-stage": {
        cameraPresence: "support",
        rotateY: -12,
        scale: 0.86,
        x: -218,
        y: 62,
        z: -64
      },
      "actor.safety-boundary": {
        cameraPresence: "featured",
        scale: 1,
        x: 112,
        y: -4,
        z: 190
      }
    },
    artifactPatches: createLatentArtifactPatches("review"),
    camera: {
      depthBand: "near",
      focusActorId: "actor.integration-ring",
      perspective: 1280,
      poseId: "camera.ft02.establish-safety-world",
      rotationX: 0,
      rotationY: -1,
      rotationZ: 0,
      scale: 1,
      x: -24,
      y: -10,
      z: 178
    },
    portal: createPortalTarget({
      edgeProgress: 1,
      oldWorldOpacity: 0,
      opacity: 0.34,
      radius: 220,
      safetyOpacity: 1,
      scale: 0.92,
      visible: true,
      x: 96,
      y: -4,
      z: 160
    }),
    ringGeometry: {
      gap: 18,
      glow: 0.54,
      portalRadius: 184,
      role: "safety-boundary",
      segmentProgress: [1, 0.88, 0.68, 0.56, 0.42],
      thickness: 8
    },
    world: { lightingMode: "safety", motionState: "settled", tone: "dark" }
  };
}

function createLatentArtifactPatches(mode: LabArtifactMode): ProofArtifactPatch {
  return Object.fromEntries(
    labArtifactIds.map((artifactId) => [
      artifactId,
      {
        cameraPresence: "latent",
        mode
      }
    ])
  ) as ProofArtifactPatch;
}

function createVisibleArtifactPatches(
  mode: LabArtifactMode,
  positions: readonly { readonly x: number; readonly y: number; readonly z: number; readonly scale?: number }[]
): ProofArtifactPatch {
  return Object.fromEntries(
    labArtifactIds.map((artifactId, index) => {
      const position = positions[index];
      if (!position) {
        return [
          artifactId,
          {
            cameraPresence: "latent",
            mode
          }
        ];
      }

      return [
        artifactId,
        {
          cameraPresence: "support",
          mode,
          scale: position.scale ?? 0.82,
          x: position.x,
          y: position.y,
          z: position.z
        }
      ];
    })
  ) as ProofArtifactPatch;
}

function getFt03SafetyActionTarget(beatId: BeatId, sceneNumber: number): ProofTarget | undefined {
  if (beatId === "16.1" || sceneNumber < 16 || sceneNumber > 20) return undefined;

  if (sceneNumber === 16 || sceneNumber === 17) {
    return createSafetyBoundaryTarget(beatId, sceneNumber);
  }

  if (sceneNumber === 18) {
    return createReviewConfirmTarget(beatId);
  }

  if (sceneNumber === 19 && !isAtOrAfter(beatId, "19.9")) {
    return createScenarioRadarTarget(beatId);
  }

  return createActionRouteTarget(beatId);
}

function createSafetyBoundaryTarget(beatId: BeatId, sceneNumber: number): ProofTarget {
  const isDataToolScene = sceneNumber === 17;
  const isSafetyEntryScene = sceneNumber === 16;

  if (isSafetyEntryScene) {
    return {
      actorPatches: {
        "actor.integration-ring": {
          cameraPresence: "support",
          rotateX: -2,
          rotateY: 0,
          scale: 0.94,
          x: -18,
          y: -2,
          z: 164
        },
        "actor.product-stage": {
          cameraPresence: "support",
          rotateY: -12,
          scale: 0.86,
          x: -218,
          y: 62,
          z: -64
        },
        "actor.safety-boundary": {
          cameraPresence: "featured",
          scale: 1,
          x: 112,
          y: -4,
          z: 190
        },
        "actor.source-packet": {
          cameraPresence: "latent",
          scale: 0.82,
          x: -248,
          y: -88,
          z: 108
        }
      },
      artifactPatches: createLatentArtifactPatches("review"),
      camera: {
        depthBand: "near",
        focusActorId: "actor.integration-ring",
        perspective: 1280,
        poseId: "camera.ft03.safety-entry-hold",
        rotationX: 0,
        rotationY: -1,
        rotationZ: 0,
        scale: 1,
        x: -24,
        y: -10,
        z: 178
      },
      portal: createPortalTarget({
        edgeProgress: 1,
        oldWorldOpacity: 0,
        opacity: 0.34,
        radius: 220,
        safetyOpacity: 1,
        scale: 0.92,
        visible: true,
        x: 96,
        y: -4,
        z: 160
      }),
      ringGeometry: {
        gap: 18,
        glow: 0.54,
        portalRadius: 184,
        role: "safety-boundary",
        segmentProgress: [1, 0.88, 0.68, 0.56, 0.42],
        thickness: 8
      },
      world: { lightingMode: "safety", motionState: "settled", tone: "dark" }
    };
  }

  return {
    actorPatches: {
      "actor.integration-ring": {
        cameraPresence: "ambient",
        rotateX: -3,
        scale: 0.9,
        x: -214,
        y: -68,
        z: 54
      },
      "actor.product-stage": {
        cameraPresence: "support",
        rotateY: -12,
        scale: 0.74,
        x: -254,
        y: 86,
        z: -90
      },
      "actor.safety-boundary": {
        cameraPresence: "featured",
        scale: isDataToolScene ? 1.03 : 1,
        x: 52,
        y: -8,
        z: 190
      },
      "actor.source-packet": {
        cameraPresence: "support",
        scale: isDataToolScene ? 0.9 : 0.84,
        x: -248,
        y: -88,
        z: 108
      }
    },
    artifactPatches: createVisibleArtifactPatches("review", [
      { scale: 0.78, x: -306, y: 126, z: 80 },
      { scale: 0.76, x: -118, y: 154, z: 96 }
    ]),
    camera: {
      depthBand: "near",
      focusActorId: "actor.safety-boundary",
      perspective: 1280,
      poseId: `camera.ft03.${isDataToolScene ? "data-tool-boundary" : "safety-entry"}`,
      rotationX: 0,
      rotationY: -2,
      rotationZ: 0,
      scale: 1.02,
      x: -38,
      y: -18,
      z: 154
    },
    portal: createPortalTarget({
      edgeProgress: 1,
      oldWorldOpacity: 0,
      opacity: 0.16,
      radius: 230,
      safetyOpacity: 1,
      scale: 0.92,
      visible: true,
      x: 56,
      y: -8,
      z: 160
    }),
    ringGeometry: {
      gap: 20,
      glow: 0.52,
      portalRadius: 188,
      role: isDataToolScene ? "data-tool-safety-boundary" : "safety-control-boundary",
      segmentProgress: isDataToolScene ? [1, 0.96, 0.78, 0.58, 0.46] : [1, 0.9, 0.7, 0.56, 0.44],
      thickness: 8
    },
    world: { lightingMode: "safety", motionState: "settled", tone: "dark" }
  };
}

function createReviewConfirmTarget(beatId: BeatId): ProofTarget {
  const isConfirmBeat = isAtOrAfter(beatId, "18.7");

  return {
    actorPatches: {
      "actor.product-stage": {
        cameraPresence: "support",
        rotateY: -12,
        scale: 0.66,
        x: -286,
        y: 92,
        z: -120
      },
      "actor.safety-boundary": {
        cameraPresence: "ambient",
        scale: 0.88,
        x: -8,
        y: -18,
        z: 80
      },
      "actor.human-review": {
        cameraPresence: isConfirmBeat ? "support" : "featured",
        scale: isConfirmBeat ? 0.92 : 1,
        x: -92,
        y: -22,
        z: 212
      },
      "actor.action-confirm-gate": {
        cameraPresence: isConfirmBeat ? "featured" : "support",
        scale: isConfirmBeat ? 1 : 0.78,
        x: isConfirmBeat ? 150 : 190,
        y: isConfirmBeat ? 28 : 70,
        z: isConfirmBeat ? 220 : 118
      }
    },
    artifactPatches: createVisibleArtifactPatches("review", [
      { scale: 0.78, x: -260, y: 150, z: 90 },
      { scale: 0.76, x: -72, y: 178, z: 112 }
    ]),
    camera: {
      depthBand: "near",
      focusActorId: isConfirmBeat ? "actor.action-confirm-gate" : "actor.human-review",
      perspective: 1260,
      poseId: `camera.ft03.${isConfirmBeat ? "confirm-gate" : "human-review"}`,
      rotationX: 1,
      rotationY: -2,
      rotationZ: 0,
      scale: 1.02,
      x: -28,
      y: -28,
      z: 142
    },
    portal: createPortalTarget({
      edgeProgress: 1,
      oldWorldOpacity: 0,
      opacity: 0.1,
      radius: 220,
      safetyOpacity: 0.82,
      scale: 0.86,
      visible: true,
      x: -4,
      y: -10,
      z: 94
    }),
    ringGeometry: {
      gap: 16,
      glow: 0.48,
      portalRadius: 180,
      role: isConfirmBeat ? "execution-confirm-boundary" : "human-review-boundary",
      segmentProgress: isConfirmBeat ? [1, 1, 0.9, 0.74, 0.58] : [1, 0.96, 0.84, 0.68, 0.52],
      thickness: 8
    },
    world: { lightingMode: "safety", motionState: "settled", tone: "dark" }
  };
}

function createScenarioRadarTarget(beatId: BeatId): ProofTarget {
  const isSelfTestBeat = isAtOrAfter(beatId, "19.6");

  return {
    actorPatches: {
      "actor.integration-ring": {
        cameraPresence: isSelfTestBeat ? "latent" : "ambient",
        rotateX: 4,
        scale: 1.05,
        x: -210,
        y: -74,
        z: -20
      },
      "actor.product-stage": {
        cameraPresence: isSelfTestBeat ? "ambient" : "support",
        rotateY: -12,
        scale: 0.62,
        x: -286,
        y: 94,
        z: -134
      },
      "actor.safety-boundary": {
        cameraPresence: "support",
        scale: 0.78,
        x: 194,
        y: -24,
        z: 30
      },
      "actor.scenario-radar": {
        cameraPresence: "featured",
        scale: isSelfTestBeat ? 1.06 : 1,
        x: -18,
        y: 0,
        z: 230
      },
      "actor.cta-dock": {
        cameraPresence: isSelfTestBeat ? "support" : "latent",
        scale: 0.82,
        x: 248,
        y: 122,
        z: 140
      }
    },
    artifactPatches: createVisibleArtifactPatches("route", [
      { scale: 0.78, x: -252, y: 146, z: 80 },
      { scale: 0.76, x: -64, y: 176, z: 104 }
    ]),
    camera: {
      depthBand: "mid",
      focusActorId: "actor.scenario-radar",
      perspective: 1240,
      poseId: `camera.ft03.${isSelfTestBeat ? "scenario-self-test" : "scenario-radar"}`,
      rotationX: 3,
      rotationY: 2,
      rotationZ: 0,
      scale: 1,
      x: -62,
      y: -64,
      z: 88
    },
    portal: createPortalTarget({ oldWorldOpacity: 0 }),
    ringGeometry: {
      gap: isSelfTestBeat ? 12 : 18,
      glow: 0.5,
      portalRadius: 186,
      role: isSelfTestBeat ? "scenario-self-test-radar" : "scenario-diagnostic-radar",
      segmentProgress: isSelfTestBeat ? [1, 1, 0.96, 0.84, 0.72] : [1, 0.94, 0.82, 0.68, 0.58],
      thickness: 8
    },
    world: { lightingMode: "action", motionState: "active", tone: "paper" }
  };
}

function createActionRouteTarget(beatId: BeatId): ProofTarget {
  const isFinalActionBeat = beatId === "20.10";

  return {
    actorPatches: {
      "actor.integration-ring": {
        cameraPresence: "support",
        rotateX: 6,
        scale: isFinalActionBeat ? 1.12 : 1.02,
        x: isFinalActionBeat ? -144 : -204,
        y: isFinalActionBeat ? -54 : -82,
        z: isFinalActionBeat ? -36 : -20
      },
      "actor.product-stage": {
        cameraPresence: "support",
        rotateY: -10,
        scale: 0.64,
        x: -282,
        y: 92,
        z: -128
      },
      "actor.safety-boundary": {
        cameraPresence: isFinalActionBeat ? "ambient" : "latent",
        scale: 0.72,
        x: 214,
        y: -34,
        z: -10
      },
      "actor.scenario-radar": {
        cameraPresence: isFinalActionBeat ? "latent" : "ambient",
        scale: 0.78,
        x: -268,
        y: 136,
        z: -80
      },
      "actor.action-path": {
        cameraPresence: "featured",
        scale: isFinalActionBeat ? 1.03 : 1,
        x: isFinalActionBeat ? 82 : 8,
        y: isFinalActionBeat ? 68 : 120,
        z: isFinalActionBeat ? 210 : 160
      }
    },
    artifactPatches: createVisibleArtifactPatches("route", [
      { scale: 0.76, x: -248, y: 150, z: 72 },
      { scale: 0.74, x: -78, y: 182, z: 96 }
    ]),
    camera: {
      depthBand: "mid",
      focusActorId: "actor.action-path",
      perspective: 1250,
      poseId: `camera.ft03.${isFinalActionBeat ? "action-route-complete" : "action-route"}`,
      rotationX: 4,
      rotationY: 3,
      rotationZ: 0,
      scale: isFinalActionBeat ? 0.98 : 1.02,
      x: isFinalActionBeat ? -78 : -96,
      y: isFinalActionBeat ? -92 : -118,
      z: isFinalActionBeat ? 80 : 96
    },
    portal: createPortalTarget({ oldWorldOpacity: 0 }),
    ringGeometry: {
      gap: isFinalActionBeat ? 4 : 10,
      glow: 0.52,
      portalRadius: isFinalActionBeat ? 214 : 180,
      role: isFinalActionBeat ? "action-route-ready-for-loop" : "action-route",
      segmentProgress: isFinalActionBeat ? [1, 1, 1, 0.96, 0.88] : [1, 0.96, 0.88, 0.78, 0.66],
      thickness: 8
    },
    world: { lightingMode: "action", motionState: "active", tone: "paper" }
  };
}

function getFt04FinaleTarget(beatId: BeatId): ProofTarget | undefined {
  if (beatId !== "21.1") return undefined;

  return {
    actorPatches: {
      "actor.integration-ring": {
        cameraPresence: "support",
        rotateX: 8,
        scale: 1.42,
        x: -126,
        y: -44,
        z: -170
      },
      "actor.product-stage": {
        cameraPresence: "ambient",
        rotateY: -8,
        scale: 0.58,
        x: -300,
        y: 82,
        z: -230
      },
      "actor.safety-boundary": {
        cameraPresence: "latent",
        scale: 0.7,
        x: 186,
        y: -42,
        z: -120
      },
      "actor.action-path": {
        cameraPresence: "support",
        rotateX: 8,
        scale: 1.02,
        x: -18,
        y: 96,
        z: 48
      },
      "actor.cta-dock": {
        cameraPresence: "featured",
        scale: 1.12,
        x: 252,
        y: -32,
        z: 172
      }
    },
    artifactPatches: createVisibleArtifactPatches("route", [
      { scale: 0.72, x: -270, y: 144, z: -40 },
      { scale: 0.7, x: -114, y: 176, z: -18 }
    ]),
    camera: {
      depthBand: "far",
      focusActorId: "actor.integration-ring",
      perspective: 1380,
      poseId: "camera.ft04.final-loop-cta",
      rotationX: 8,
      rotationY: 0,
      rotationZ: 0,
      scale: 0.76,
      x: 0,
      y: -152,
      z: -260
    },
    portal: createPortalTarget({ oldWorldOpacity: 0 }),
    ringGeometry: {
      gap: 0,
      glow: 0.58,
      portalRadius: 260,
      role: "final-loop-cta-placeholder",
      segmentProgress: [1, 1, 1, 1, 1],
      thickness: 9
    },
    world: { lightingMode: "finale", motionState: "settled", tone: "paper" }
  };
}

function attachSpatialTransitionPlan(target: StageTarget, reducedMotion: boolean): StageTarget {
  if (target.beatId === "08.1") {
    const repetitionCompression = resolveStageTarget("07.8", { reducedMotion });
    const plan = createRcFix02rLedgerToCapabilityPlan(repetitionCompression, target);

    return {
      ...target,
      transitionPlan: plan
    };
  }

  if (target.beatId === "09.1") {
    const capabilityCore = resolveStageTarget("08.7", { reducedMotion });
    const plan = createFt01ProductTurnPlan(capabilityCore, target);

    return {
      ...target,
      transitionPlan: plan
    };
  }

  if (target.beatId === "16.1") {
    const frozenOutput = resolveStageTarget("15.8", { reducedMotion });
    const plan = createFt02ForwardPortalPlan(frozenOutput, target);

    return {
      ...target,
      transitionPlan: plan
    };
  }

  if (target.beatId === "18.1") {
    const dataToolBoundary = resolveStageTarget("17.9", { reducedMotion });
    const plan = createRcFix02rReviewHandoffPlan(dataToolBoundary, target);

    return {
      ...target,
      transitionPlan: plan
    };
  }

  if (target.beatId === "21.1") {
    const actionRoute = resolveStageTarget("20.10", { reducedMotion });
    const plan = createFt04FinalePullbackPlan(actionRoute, target);

    return {
      ...target,
      transitionPlan: plan
    };
  }

  return target;
}

function createRcFix02rLedgerToCapabilityPlan(from: StageTarget, to: StageTarget): SpatialTransitionPlan {
  const stateA = spatialState(
    "state.rcfix02r.A.repetition-compression",
    "repetition compression",
    snapshot(from),
    { id: "actor.ledger-dial", type: "actor" },
    { compression: 0.72, density: 0.7 }
  );
  const stateB = spatialState(
    "state.rcfix02r.B.capability-accumulation",
    "capability accumulation",
    patchSnapshot(from, {
      actors: {
        "actor.integration-ring": { cameraPresence: "support", scale: 1.06, x: -116, y: -48, z: 4 },
        "actor.ledger-dial": { cameraPresence: "featured", rotateZ: 6, scale: 0.82, x: -30, y: 18, z: 98 },
        "actor.output-cards": { cameraPresence: "support", scale: 0.72, x: 154, y: 106, z: 72 },
        "actor.source-packet": { cameraPresence: "ambient", scale: 0.62, x: 224, y: -82, z: 48 },
        "actor.product-stage": { cameraPresence: "offscreen", scale: 0.84, x: 92, y: -72, z: -24 }
      },
      artifacts: {
        "artifact.F01": { cameraPresence: "support", mode: "source", scale: 0.58, x: 112, y: 126, z: 42 },
        "artifact.F02": { cameraPresence: "support", mode: "source", scale: 0.54, x: 208, y: 128, z: 48 },
        "artifact.F03": { cameraPresence: "latent", mode: "source", scale: 0.5, x: 250, y: 130, z: 40 }
      },
      camera: {
        depthBand: "mid",
        focusActorId: "actor.ledger-dial",
        perspective: 1160,
        poseId: "camera.rcfix02r.capability-accumulation",
        rotationX: 5,
        rotationY: -3,
        rotationZ: -1,
        scale: 1.02,
        x: -42,
        y: -142,
        z: 24
      },
      portal: createPortalTarget({ oldWorldOpacity: 0 }),
      world: { lightingMode: "ledger", motionState: "active", tone: "dark" }
    }),
    { id: "actor.integration-ring", type: "actor" },
    { compression: 0.62, density: 0.76 }
  );
  const stateC = spatialState(
    "state.rcfix02r.C.capability-core",
    "capability core",
    snapshot(to),
    { id: "actor.integration-ring", type: "actor" },
    { compression: 0.56, density: 0.72 }
  );

  return {
    fromBeatId: "07.8",
    id: "transition-plan.rcfix02r.ledger-to-capability",
    model: "spatial-state",
    states: [stateA, stateB, stateC],
    toBeatId: "08.1"
  };
}

function createFt01ProductTurnPlan(from: StageTarget, to: StageTarget): SpatialTransitionPlan {
  const stateA = spatialState(
    "state.ft01.A.capability-core",
    "capability core",
    snapshot(from),
    { id: "actor.integration-ring", type: "actor" },
    { compression: 0.58, density: 0.62 }
  );
  const stateB = spatialState(
    "state.ft01.B.product-window-opening",
    "product window opening",
    patchSnapshot(from, {
      actors: {
        "actor.integration-ring": { scale: 1.08, x: -118, y: -16, z: 24 },
        "actor.product-stage": { cameraPresence: "featured", opacity: 0.78, scale: 0.92, x: 58, y: 24, z: 124 }
      },
      artifacts: {
        "artifact.F01": { cameraPresence: "support", mode: "source", opacity: 0.34, scale: 0.72, x: 340, y: 120, z: 48 },
        "artifact.F02": { cameraPresence: "latent", mode: "source", scale: 0.7, x: 410, y: 82, z: 20 }
      },
      camera: {
        depthBand: "mid",
        focusActorId: "actor.product-stage",
        perspective: 1180,
        poseId: "camera.ft01.product-window-opening",
        rotationX: 3,
        rotationY: -6,
        rotationZ: -1,
        scale: 1.04,
        x: -34,
        y: -34,
        z: 34
      },
      portal: createPortalTarget({ oldWorldOpacity: 0.86 }),
      world: { lightingMode: "product", motionState: "active", tone: "paper" }
    }),
    { id: "actor.product-stage", type: "actor" },
    { compression: 0.48, density: 0.72 }
  );
  const stateC = spatialState(
    "state.ft01.C.product-source-station",
    "product source station",
    snapshot(to),
    { id: "actor.product-stage", type: "actor" },
    { compression: 0.42, density: 0.76 }
  );

  return {
    fromBeatId: "08.7",
    id: "transition-plan.ft01.product-turn",
    model: "spatial-state",
    states: [stateA, stateB, stateC],
    toBeatId: "09.1"
  };
}

function createRcFix02rReviewHandoffPlan(from: StageTarget, to: StageTarget): SpatialTransitionPlan {
  const stateA = spatialState(
    "state.rcfix02r.A.data-tool-boundary",
    "data tool boundary",
    snapshot(from),
    { id: "actor.safety-boundary", type: "actor" },
    { compression: 0.44, density: 0.72 }
  );
  const stateB = spatialState(
    "state.rcfix02r.B.review-queue-emergence",
    "review queue emergence",
    patchSnapshot(from, {
      actors: {
        "actor.safety-boundary": { cameraPresence: "support", scale: 0.92, x: 24, y: -14, z: 112 },
        "actor.source-packet": { cameraPresence: "ambient", scale: 0.72, x: -238, y: -92, z: 90 },
        "actor.human-review": { cameraPresence: "support", scale: 0.84, x: -104, y: -28, z: 176 },
        "actor.action-confirm-gate": { cameraPresence: "support", scale: 0.72, x: 188, y: 72, z: 106 }
      },
      artifacts: {
        "artifact.F01": { cameraPresence: "support", mode: "review", scale: 0.76, x: -252, y: 144, z: 88 },
        "artifact.F02": { cameraPresence: "support", mode: "review", scale: 0.72, x: -74, y: 176, z: 106 }
      },
      camera: {
        depthBand: "near",
        focusActorId: "actor.human-review",
        perspective: 1260,
        poseId: "camera.rcfix02r.review-queue-emergence",
        rotationX: 1,
        rotationY: -2,
        rotationZ: 0,
        scale: 1.02,
        x: -30,
        y: -26,
        z: 146
      },
      portal: createPortalTarget({
        edgeProgress: 1,
        oldWorldOpacity: 0,
        opacity: 0.12,
        radius: 220,
        safetyOpacity: 0.84,
        scale: 0.86,
        visible: true,
        x: 8,
        y: -10,
        z: 104
      }),
      world: { lightingMode: "safety", motionState: "settled", tone: "dark" }
    }),
    { id: "actor.human-review", type: "actor" },
    { compression: 0.38, density: 0.68 }
  );
  const stateC = spatialState(
    "state.rcfix02r.C.human-review",
    "human review",
    snapshot(to),
    { id: "actor.human-review", type: "actor" },
    { compression: 0.34, density: 0.62 }
  );

  return {
    fromBeatId: "17.9",
    id: "transition-plan.rcfix02r.review-handoff",
    model: "spatial-state",
    states: [stateA, stateB, stateC],
    toBeatId: "18.1"
  };
}

function createFt02ForwardPortalPlan(from: StageTarget, to: StageTarget): SpatialTransitionPlan {
  const stateA = spatialState(
    "state.ft02.A.frozen-compression-field",
    "frozen compression field",
    snapshot(from),
    { id: "world.frozen-output", type: "world" },
    { compression: 0.86, density: 0.78 }
  );
  const stateB = spatialState(
    "state.ft02.B.portal-emergence-field",
    "portal emergence field",
    patchSnapshot(from, {
      actors: {
        "actor.integration-ring": { scale: 0.96, x: -164, y: 2, z: 80 },
        "actor.product-stage": { scale: 0.88, x: 58, y: 36, z: 142 }
      },
      portal: {
        edgeProgress: 0.18,
        oldWorldOpacity: 1,
        opacity: 0.72,
        radius: 168,
        safetyOpacity: 0.58,
        scale: 0.96,
        visible: true,
        x: -164,
        y: 2,
        z: 118
      },
      world: { lightingMode: "product", motionState: "portal", tone: "paper" }
    }),
    { id: "actor.integration-ring", type: "actor" },
    { compression: 0.72, density: 0.88 }
  );
  const stateC = spatialState(
    "state.ft02.C.boundary-approach-field",
    "boundary approach field",
    patchSnapshot(from, {
      actors: {
        "actor.integration-ring": { scale: 1.58, x: -58, y: -2, z: 300 },
        "actor.product-stage": { scale: 0.82, x: 20, y: 42, z: 70 },
        "actor.safety-boundary": { cameraPresence: "support", scale: 0.86, x: 138, y: -10, z: 210 }
      },
      artifacts: {
        "artifact.F01": { cameraPresence: "support", scale: 1.18, x: -520, y: 76, z: 420 },
        "artifact.F02": { cameraPresence: "support", scale: 1.14, x: 520, y: 4, z: 420 },
        "artifact.F03": { cameraPresence: "latent", scale: 0.72, x: 40, y: 168, z: -180 }
      },
      camera: {
        depthBand: "near",
        focusActorId: "actor.integration-ring",
        perspective: 1240,
        poseId: "camera.ft02.approach-ring",
        rotationX: 1,
        rotationY: -5,
        rotationZ: 0,
        scale: 1.18,
        x: -20,
        y: -18,
        z: 230
      },
      portal: {
        edgeProgress: 0.44,
        oldWorldOpacity: 0.72,
        opacity: 0.86,
        radius: 260,
        safetyOpacity: 0.76,
        scale: 1.24,
        visible: true,
        x: -58,
        y: -2,
        z: 300
      },
      world: { lightingMode: "product", motionState: "portal", tone: "paper" }
    }),
    { id: "camera.ft02.approach-ring", type: "camera" },
    { compression: 0.48, density: 0.96 }
  );
  const stateD = spatialState(
    "state.ft02.D.boundary-crossing-field",
    "boundary crossing field",
    patchSnapshot(from, {
      actors: {
        "actor.integration-ring": { scale: 3.42, x: -2, y: 0, z: 620 },
        "actor.product-stage": { scale: 0.66, x: -124, y: 52, z: -120 },
        "actor.safety-boundary": { cameraPresence: "support", scale: 1.04, x: 126, y: -8, z: 260 }
      },
      artifacts: {
        "artifact.F01": { cameraPresence: "support", scale: 1.46, x: -720, y: 70, z: 680 },
        "artifact.F02": { cameraPresence: "support", scale: 1.42, x: 740, y: -34, z: 650 },
        "artifact.F03": { cameraPresence: "latent", scale: 0.72, x: 120, y: 168, z: -240 }
      },
      camera: {
        depthBand: "near",
        focusActorId: "actor.integration-ring",
        perspective: 1300,
        poseId: "camera.ft02.cross-ring-edge",
        rotationX: 0,
        rotationY: -3,
        rotationZ: 0,
        scale: 1.42,
        x: -10,
        y: -16,
        z: 420
      },
      portal: {
        edgeProgress: 0.82,
        oldWorldOpacity: 0.2,
        opacity: 0.96,
        radius: 620,
        safetyOpacity: 0.9,
        scale: 1.62,
        visible: true,
        x: -8,
        y: 0,
        z: 620
      },
      world: { lightingMode: "safety", motionState: "portal", tone: "dark" }
    }),
    { id: "camera.ft02.cross-ring-edge", type: "camera" },
    { compression: 0.24, density: 0.92 }
  );
  const stateE = spatialState(
    "state.ft02.E.safety-field-stable",
    "safety field stable",
    snapshot(to),
    { id: "world.safety-volume", type: "world" },
    { compression: 0.34, density: 0.64 }
  );

  return {
    fromBeatId: "15.8",
    id: "transition-plan.ft02.forward-safety-portal",
    model: "spatial-state",
    states: [stateA, stateB, stateC, stateD, stateE],
    toBeatId: "16.1"
  };
}

function createFt04FinalePullbackPlan(from: StageTarget, to: StageTarget): LegacySpatialWaypointPlan {
  const w0 = waypoint("W0", "action-route-complete", 0.18, snapshot(from));
  const w1 = waypoint("W1", "loop-begins-to-close", 0.28, patchSnapshot(from, {
    actors: {
      "actor.integration-ring": { cameraPresence: "support", scale: 1.2, x: -124, y: -48, z: -80 },
      "actor.product-stage": { cameraPresence: "ambient", scale: 0.6, x: -302, y: 86, z: -180 },
      "actor.action-path": { cameraPresence: "featured", scale: 1.02, x: 18, y: 106, z: 164 },
      "actor.cta-dock": { cameraPresence: "support", scale: 0.78, x: 286, y: -8, z: 116 }
    },
    camera: {
      depthBand: "mid",
      focusActorId: "actor.action-path",
      perspective: 1300,
      poseId: "camera.ft04.loop-begins",
      rotationX: 5,
      rotationY: 2,
      rotationZ: 0,
      scale: 0.92,
      x: -54,
      y: -116,
      z: -18
    },
    world: { lightingMode: "finale", motionState: "active", tone: "paper" }
  }));
  const w2 = waypoint("W2", "pull-back-to-reveal-loop", 0.34, patchSnapshot(from, {
    actors: {
      "actor.integration-ring": { cameraPresence: "support", scale: 1.5, x: -126, y: -46, z: -190 },
      "actor.product-stage": { cameraPresence: "ambient", scale: 0.56, x: -304, y: 82, z: -260 },
      "actor.safety-boundary": { cameraPresence: "ambient", scale: 0.68, x: 160, y: -46, z: -210 },
      "actor.action-path": { cameraPresence: "support", scale: 0.98, x: -2, y: 108, z: 28 },
      "actor.cta-dock": { cameraPresence: "featured", scale: 0.94, x: 226, y: -22, z: 150 }
    },
    artifacts: {
      "artifact.F01": { cameraPresence: "support", scale: 0.72, x: -270, y: 144, z: -48 },
      "artifact.F02": { cameraPresence: "support", scale: 0.7, x: -114, y: 176, z: -24 },
      "artifact.F03": { cameraPresence: "latent", scale: 0.7, x: 34, y: 166, z: -80 }
    },
    camera: {
      depthBand: "far",
      focusActorId: "actor.integration-ring",
      perspective: 1360,
      poseId: "camera.ft04.pull-back-loop",
      rotationX: 8,
      rotationY: 0,
      rotationZ: 0,
      scale: 0.78,
      x: -8,
      y: -146,
      z: -230
    },
    world: { lightingMode: "finale", motionState: "active", tone: "paper" }
  }));
  const w3 = waypoint("W3", "establish-final-loop-cta", 0.34, snapshot(to));

  return {
    fromBeatId: "20.10",
    id: "transition-plan.ft04.finale-pullback-loop",
    model: "legacy-waypoint",
    toBeatId: "21.1",
    waypoints: [w0, w1, w2, w3]
  };
}

function spatialState(
  id: string,
  label: string,
  target: SpatialWaypointTarget,
  primaryAnchor: PrimaryAnchor,
  field: Pick<WorldField, "compression" | "density">
): SpatialState {
  return {
    ...target,
    id,
    label,
    primaryAnchor,
    ring: target.actors["actor.integration-ring"].geometry,
    world: {
      ...target.world,
      compression: field.compression,
      density: field.density
    }
  };
}

function waypoint(
  id: string,
  label: string,
  duration: number,
  target: SpatialWaypointTarget
): SpatialWaypoint {
  return { duration, id, label, target };
}

function snapshot(target: StageTarget): SpatialWaypointTarget {
  return {
    actors: target.actors,
    artifacts: target.artifacts,
    camera: target.camera,
    portal: target.portal,
    world: target.world
  };
}

function patchSnapshot(
  base: StageTarget,
  patch: {
    readonly actors?: Partial<Record<StageActorId, Partial<LabActorTarget>>>;
    readonly artifacts?: Partial<Record<LabArtifactId, Partial<LabArtifactTarget>>>;
    readonly camera?: Partial<LabCameraTarget>;
    readonly portal?: Partial<LabPortalTarget>;
    readonly world?: LabWorldTarget;
  }
): SpatialWaypointTarget {
  return {
    actors: patchActors(base.actors, patch.actors),
    artifacts: patchArtifacts(base.artifacts, patch.artifacts),
    camera: { ...base.camera, ...patch.camera },
    portal: { ...base.portal, ...patch.portal },
    world: patch.world ?? base.world
  };
}

function patchActors(
  actors: LabActorTargets,
  patches: Partial<Record<StageActorId, Partial<LabActorTarget>>> | undefined
): LabActorTargets {
  if (!patches) return actors;

  return Object.fromEntries(
    labActorIds.map((actorId) => {
      const actor = actors[actorId];
      const patch = patches[actorId];
      if (!patch) return [actorId, actor];

      const patched = { ...actor, ...patch };
      const visible = isCameraVisible(patched.cameraPresence);
      return [
        actorId,
        {
          ...patched,
          lifecycle: visible && patched.lifecycle === "off" ? "hold" : patched.lifecycle,
          opacity: visible ? patch.opacity ?? getActorOpacity(patched.cameraPresence, patched.role) : 0,
          visible
        }
      ];
    })
  ) as LabActorTargets;
}

function patchArtifacts(
  artifacts: Readonly<Record<LabArtifactId, LabArtifactTarget>>,
  patches: Partial<Record<LabArtifactId, Partial<LabArtifactTarget>>> | undefined
): Readonly<Record<LabArtifactId, LabArtifactTarget>> {
  if (!patches) return artifacts;

  return Object.fromEntries(
    labArtifactIds.map((artifactId) => {
      const artifact = artifacts[artifactId];
      const patch = patches[artifactId];
      const patched = patch ? { ...artifact, ...patch } : artifact;
      const visible = isCameraVisible(patched.cameraPresence);
      return [
        artifactId,
        {
          ...patched,
          opacity: visible ? patched.opacity || artifact.opacity || 0.72 : 0,
          visible
        }
      ];
    })
  ) as Readonly<Record<LabArtifactId, LabArtifactTarget>>;
}

function getFixA4ProofTarget(beatId: BeatId): ProofTarget | undefined {
  if (!fixA4ProofBeatIdSet.has(beatId)) return undefined;
  return fixA4ProofTargets[beatId as (typeof fixA4ProofBeatIds)[number]];
}

function getEarlyJudgementContinuityTarget(sceneNumber: number): ProofTarget | undefined {
  if (sceneNumber === 2) return fixA4ProofTargets["02.1"];
  if (sceneNumber === 3) return fixA4ProofTargets["03.1"];
  return undefined;
}

function getLedgerContinuityTarget(beatId: BeatId, sceneNumber: number): ProofTarget | undefined {
  if (sceneNumber < 5 || sceneNumber > 7) return undefined;

  const isOpenSource = sceneNumber === 6;
  const isCompression = sceneNumber === 7;

  return {
    actorPatches: {
      "actor.integration-ring": {
        cameraPresence: "support",
        rotateX: isCompression ? 8 : 5,
        rotateY: isOpenSource ? -6 : -3,
        scale: isOpenSource ? 1.2 : isCompression ? 1.04 : 1.13,
        x: isOpenSource ? -168 : isCompression ? -112 : -138,
        y: isOpenSource ? -74 : isCompression ? -58 : -88,
        z: isOpenSource ? 24 : isCompression ? 12 : -14
      },
      "actor.ledger-dial": {
        cameraPresence: "featured",
        rotateZ: isOpenSource ? -5 : isCompression ? 4 : 0,
        scale: isOpenSource ? 1.06 : isCompression ? 0.92 : 1.02,
        x: isOpenSource ? 42 : isCompression ? -28 : 62,
        y: isOpenSource ? 10 : isCompression ? 18 : 28,
        z: isOpenSource ? 118 : isCompression ? 104 : 96
      },
      "actor.source-packet": {
        cameraPresence: isOpenSource ? "support" : isCompression ? "ambient" : "latent",
        scale: isOpenSource ? 0.74 : 0.62,
        x: isOpenSource ? 248 : 214,
        y: isOpenSource ? -70 : 122,
        z: isOpenSource ? 106 : 24
      },
      "actor.output-cards": {
        cameraPresence: isCompression ? "support" : "latent",
        scale: 0.76,
        x: 212,
        y: 114,
        z: 92
      }
    },
    artifactPatches: isOpenSource
      ? createVisibleArtifactPatches("source", [
        { scale: 0.68, x: 238, y: 34, z: 70 },
        { scale: 0.64, x: 316, y: -42, z: 78 },
        { scale: 0.62, x: 342, y: 96, z: 64 }
      ])
      : isCompression
        ? createVisibleArtifactPatches("source", [
          { scale: 0.66, x: 146, y: 128, z: 52 },
          { scale: 0.62, x: 248, y: 128, z: 58 }
        ])
        : createLatentArtifactPatches("source"),
    camera: {
      depthBand: "mid",
      focusActorId: isCompression ? "actor.output-cards" : "actor.ledger-dial",
      perspective: 1160,
      poseId: `camera.rcfix02.${isOpenSource ? "open-source-ledger" : isCompression ? "compression-ledger" : "ledger-overview"}`,
      rotationX: isCompression ? 6 : 5,
      rotationY: isOpenSource ? -5 : -3,
      rotationZ: isCompression ? 1 : -1,
      scale: isOpenSource ? 1.03 : isCompression ? 1.02 : 1.01,
      x: isOpenSource ? -32 : isCompression ? -46 : -20,
      y: isOpenSource ? -146 : isCompression ? -132 : -162,
      z: isOpenSource ? 18 : isCompression ? 30 : -4
    },
    portal: createPortalTarget({ oldWorldOpacity: 0 }),
    ringGeometry: {
      gap: isOpenSource ? 8 : isCompression ? 22 : 14,
      glow: isOpenSource ? 0.5 : isCompression ? 0.36 : 0.42,
      portalRadius: isOpenSource ? 150 : isCompression ? 118 : 132,
      role: isOpenSource ? "open-source-expansion" : isCompression ? "repetition-compression" : "ledger-overview",
      segmentProgress: isOpenSource ? [1, 0.92, 0.78, 0.7, 0.62] : isCompression ? [0.88, 0.82, 0.76, 0.62, 0.52] : [0.9, 0.82, 0.74, 0.66, 0.56],
      thickness: isOpenSource ? 10 : isCompression ? 9 : 11
    },
    world: { lightingMode: "ledger", motionState: "active", tone: "dark" }
  };
}

function getCapabilityAccumulationTarget(beatId: BeatId, sceneNumber: number): ProofTarget | undefined {
  if (sceneNumber !== 8 || beatId === "08.7") return undefined;

  const isLateCapabilityBeat = isAtOrAfter(beatId, "08.5");

  return {
    actorPatches: {
      "actor.integration-ring": {
        cameraPresence: "support",
        rotateX: 8,
        rotateY: -3,
        scale: isLateCapabilityBeat ? 1.08 : 1.04,
        x: -116,
        y: -48,
        z: isLateCapabilityBeat ? 8 : 0
      },
      "actor.ledger-dial": {
        cameraPresence: "featured",
        rotateZ: isLateCapabilityBeat ? 8 : 5,
        scale: isLateCapabilityBeat ? 0.78 : 0.86,
        x: -30,
        y: 18,
        z: 98
      },
      "actor.output-cards": {
        cameraPresence: "support",
        scale: isLateCapabilityBeat ? 0.7 : 0.74,
        x: 154,
        y: 106,
        z: 72
      },
      "actor.source-packet": {
        cameraPresence: "ambient",
        scale: 0.62,
        x: 224,
        y: -82,
        z: 48
      },
      "actor.product-stage": {
        cameraPresence: "offscreen",
        scale: 0.84,
        x: 92,
        y: -72,
        z: -24
      }
    },
    artifactPatches: createVisibleArtifactPatches("source", [
      { scale: 0.58, x: 112, y: 126, z: 42 },
      { scale: 0.54, x: 208, y: 128, z: 48 }
    ]),
    camera: {
      depthBand: "mid",
      focusActorId: "actor.ledger-dial",
      perspective: 1160,
      poseId: `camera.rcfix02r.${isLateCapabilityBeat ? "capability-core-prep" : "capability-accumulation"}`,
      rotationX: 5,
      rotationY: -3,
      rotationZ: -1,
      scale: 1.02,
      x: -42,
      y: -142,
      z: 24
    },
    portal: createPortalTarget({ oldWorldOpacity: 0 }),
    ringGeometry: {
      gap: isLateCapabilityBeat ? 12 : 16,
      glow: isLateCapabilityBeat ? 0.44 : 0.38,
      portalRadius: isLateCapabilityBeat ? 136 : 124,
      role: isLateCapabilityBeat ? "capability-core-prep" : "capability-accumulation",
      segmentProgress: isLateCapabilityBeat ? [0.94, 0.86, 0.78, 0.7, 0.62] : [0.88, 0.8, 0.72, 0.64, 0.56],
      thickness: isLateCapabilityBeat ? 10 : 9
    },
    world: { lightingMode: "ledger", motionState: "active", tone: "dark" }
  };
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

function isBetween(beatId: BeatId, firstBeatId: BeatId, lastBeatId: BeatId) {
  const order = getBeatOrder(beatId);
  return order >= getBeatOrder(firstBeatId) && order <= getBeatOrder(lastBeatId);
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
