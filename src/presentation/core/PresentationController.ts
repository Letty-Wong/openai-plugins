import { beatsBySceneId } from "@/content/beats";
import { qaItems } from "@/content/qa";
import { scenes } from "@/content/scenes";
import {
  FIRST_BEAT_ID,
  getNextBeatId,
  getPreviousBeatId,
  resolveBeatState
} from "@/presentation/core/state-resolver";
import type { BeatId, QAItem, SceneId } from "@/presentation/core/state-types";

export type QAItemId = QAItem["id"];

export type QAModeState = {
  readonly active: boolean;
  readonly selectedItemId: QAItemId;
  readonly expanded: boolean;
  readonly returnBeatId: BeatId;
};

export type PresentationSessionState = {
  readonly currentBeatId: BeatId;
  readonly notesVisible: boolean;
  readonly reducedMotion: boolean;
  readonly qaMode: QAModeState;
};

export const DEFAULT_QA_ITEM_ID: QAItemId = "qa-1";

export function createInitialPresentationState(
  beatId: BeatId = FIRST_BEAT_ID
): PresentationSessionState {
  return {
    currentBeatId: beatId,
    notesVisible: false,
    reducedMotion: false,
    qaMode: {
      active: false,
      selectedItemId: DEFAULT_QA_ITEM_ID,
      expanded: false,
      returnBeatId: beatId
    }
  };
}

export function getResolvedSession(state: PresentationSessionState) {
  return resolveBeatState(state.currentBeatId, {
    reducedMotion: state.reducedMotion
  });
}

export function jumpToBeat(
  state: PresentationSessionState,
  beatId: BeatId
): PresentationSessionState {
  resolveBeatState(beatId);

  return {
    ...state,
    currentBeatId: beatId,
    qaMode: {
      ...state.qaMode,
      active: false,
      expanded: false,
      returnBeatId: beatId
    }
  };
}

export function nextBeat(state: PresentationSessionState): PresentationSessionState {
  if (state.qaMode.active) {
    return nextQAItem(state);
  }

  const nextId = getNextBeatId(state.currentBeatId);
  return nextId ? jumpToBeat(state, nextId) : state;
}

export function previousBeat(
  state: PresentationSessionState
): PresentationSessionState {
  if (state.qaMode.active) {
    return previousQAItem(state);
  }

  const previousId = getPreviousBeatId(state.currentBeatId);
  return previousId ? jumpToBeat(state, previousId) : state;
}

export function nextScene(state: PresentationSessionState): PresentationSessionState {
  const resolved = getResolvedSession(state);
  const nextSceneSpec = scenes[resolved.scene.sceneNumber];
  const firstBeatId = nextSceneSpec?.beatIds[0];

  return firstBeatId ? jumpToBeat(state, firstBeatId) : state;
}

export function previousScene(
  state: PresentationSessionState
): PresentationSessionState {
  const resolved = getResolvedSession(state);
  const previousSceneSpec = scenes[resolved.scene.sceneNumber - 2];
  const firstBeatId = previousSceneSpec?.beatIds[0];

  return firstBeatId ? jumpToBeat(state, firstBeatId) : state;
}

export function resetCurrentScene(
  state: PresentationSessionState
): PresentationSessionState {
  const resolved = getResolvedSession(state);
  return jumpToBeat(state, resolved.scene.beatIds[0]);
}

export function jumpToScene(
  state: PresentationSessionState,
  sceneId: SceneId
): PresentationSessionState {
  const sceneBeats = beatsBySceneId.get(sceneId);
  const firstBeatId = sceneBeats?.[0]?.id;

  if (!firstBeatId) {
    throw new Error(`Unknown scene id: ${sceneId}`);
  }

  return jumpToBeat(state, firstBeatId);
}

export function toggleNotes(
  state: PresentationSessionState
): PresentationSessionState {
  return {
    ...state,
    notesVisible: !state.notesVisible
  };
}

export function toggleReducedMotion(
  state: PresentationSessionState
): PresentationSessionState {
  return {
    ...state,
    reducedMotion: !state.reducedMotion
  };
}

export function enterQA(state: PresentationSessionState): PresentationSessionState {
  const safeReturnBeatId =
    getResolvedSession(state).scene.id === "scene-21" ? state.currentBeatId : "21.8";

  return {
    ...state,
    currentBeatId: safeReturnBeatId,
    qaMode: {
      active: true,
      selectedItemId: state.qaMode.selectedItemId,
      expanded: false,
      returnBeatId: safeReturnBeatId
    }
  };
}

export function exitQA(state: PresentationSessionState): PresentationSessionState {
  return {
    ...state,
    currentBeatId: state.qaMode.returnBeatId,
    qaMode: {
      ...state.qaMode,
      active: false,
      expanded: false
    }
  };
}

export function toggleQA(state: PresentationSessionState): PresentationSessionState {
  return state.qaMode.active ? exitQA(state) : enterQA(state);
}

export function selectQAItem(
  state: PresentationSessionState,
  selectedItemId: QAItemId
): PresentationSessionState {
  assertQAItem(selectedItemId);

  return {
    ...state,
    qaMode: {
      ...state.qaMode,
      active: true,
      selectedItemId,
      expanded: false,
      returnBeatId: state.qaMode.returnBeatId
    }
  };
}

export function nextQAItem(
  state: PresentationSessionState
): PresentationSessionState {
  const index = qaItems.findIndex((item) => item.id === state.qaMode.selectedItemId);
  const nextItem = qaItems[(index + 1) % qaItems.length];
  return selectQAItem(state, nextItem.id);
}

export function previousQAItem(
  state: PresentationSessionState
): PresentationSessionState {
  const index = qaItems.findIndex((item) => item.id === state.qaMode.selectedItemId);
  const previousItem = qaItems[(index - 1 + qaItems.length) % qaItems.length];
  return selectQAItem(state, previousItem.id);
}

export function toggleQAExpanded(
  state: PresentationSessionState
): PresentationSessionState {
  if (!state.qaMode.active) return state;

  return {
    ...state,
    qaMode: {
      ...state.qaMode,
      expanded: !state.qaMode.expanded
    }
  };
}

function assertQAItem(selectedItemId: QAItemId) {
  if (!qaItems.some((item) => item.id === selectedItemId)) {
    throw new Error(`Unknown Q&A item id: ${selectedItemId}`);
  }
}
