import { beatById, beats } from "@/content/beats";
import { sceneById, scenes } from "@/content/scenes";
import type {
  BeatId,
  PresentationTargetState,
  ResolvedBeatState,
  SceneId,
  ScreenCopy
} from "@/presentation/core/state-types";

export const FIRST_BEAT_ID = "01.1" satisfies BeatId;
export const LAST_BEAT_ID = "21.9" satisfies BeatId;

export function getAudienceScreenCopy(screenCopy: ScreenCopy): ScreenCopy | null {
  return screenCopy.status === "DO_NOT_USE" ? null : screenCopy;
}

export function resolveBeatState(
  beatId: BeatId,
  options: { reducedMotion?: boolean } = {}
): ResolvedBeatState {
  const beat = beatById.get(beatId);

  if (!beat) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }

  const scene = sceneById.get(beat.sceneId);

  if (!scene) {
    throw new Error(`Missing scene for beat: ${beatId}`);
  }

  const reducedMotion = options.reducedMotion ?? false;

  return {
    scene,
    beat,
    targetState: buildTargetState(beatId, reducedMotion),
    audienceScreenCopy: getAudienceScreenCopy(beat.screenCopy)
  };
}

export function getNextBeatId(beatId: BeatId): BeatId | null {
  const beat = beatById.get(beatId);
  if (!beat) return null;

  return beats[beat.order]?.id ?? null;
}

export function getPreviousBeatId(beatId: BeatId): BeatId | null {
  const beat = beatById.get(beatId);
  if (!beat) return null;

  return beats[beat.order - 2]?.id ?? null;
}

export function getSceneFirstBeatId(sceneId: SceneId): BeatId {
  const scene = sceneById.get(sceneId);

  if (!scene) {
    throw new Error(`Unknown scene id: ${sceneId}`);
  }

  return scene.beatIds[0];
}

export function resolveInitialState() {
  return resolveBeatState(FIRST_BEAT_ID);
}

function buildTargetState(
  beatId: BeatId,
  reducedMotion: boolean
): PresentationTargetState {
  const beat = beatById.get(beatId);

  if (!beat) {
    throw new Error(`Unknown beat id: ${beatId}`);
  }

  const sceneNumber = scenes.find(
    (scene) => scene.id === beat.sceneId
  )?.sceneNumber;

  if (!sceneNumber) {
    throw new Error(`Missing scene number for beat: ${beatId}`);
  }

  return {
    id: reducedMotion ? beat.reducedMotionStateId : beat.targetStateId,
    sceneId: beat.sceneId,
    beatId,
    reducedMotion,
    objects: {
      integrationRing: "active",
      productStage: sceneNumber >= 9 ? "active" : sceneNumber >= 8 ? "dimmed" : "hidden",
      sourcePacket: sceneNumber >= 10 ? "active" : "hidden",
      contentShell: sceneNumber >= 11 && sceneNumber <= 15 ? "active" : "hidden",
      safetyBoundary: sceneNumber >= 16 ? "active" : "hidden",
      qrDock: sceneNumber >= 19 ? "dimmed" : "hidden"
    }
  };
}
