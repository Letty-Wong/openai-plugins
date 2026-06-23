import { beatById } from "@/content/beats";
import {
  createInitialPresentationState,
  DEFAULT_QA_ITEM_ID
} from "@/presentation/core/PresentationController";
import type {
  PresentationSessionState,
  QAItemId
} from "@/presentation/core/PresentationController";
import type { BeatId } from "@/presentation/core/state-types";

export const PRESENTATION_STORAGE_KEY = "ai-presentation-session-v1";

type PresentationStorage = Pick<Storage, "getItem" | "setItem">;

type StoredSessionState = Partial<{
  currentBeatId: BeatId;
  notesVisible: boolean;
  reducedMotion: boolean;
  qaMode: Partial<PresentationSessionState["qaMode"]>;
}>;

export function stateToHash(state: PresentationSessionState): string {
  const sceneId = beatById.get(state.currentBeatId)?.sceneId;

  if (!sceneId) {
    return "";
  }

  return `#${sceneId}/${state.currentBeatId}`;
}

export function beatIdFromHash(hash: string): BeatId | null {
  const match = hash.match(/^#scene-\d{2}\/(\d{2}\.\d{1,2})$/);
  const beatId = match?.[1] as BeatId | undefined;

  return beatId && beatById.has(beatId) ? beatId : null;
}

export function serializeSessionState(state: PresentationSessionState): string {
  return JSON.stringify(state);
}

export function readPresentationStorage(storage?: PresentationStorage | null): string | null {
  if (!storage) return null;

  try {
    return storage.getItem(PRESENTATION_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writePresentationStorage(
  state: PresentationSessionState,
  storage?: PresentationStorage | null
) {
  if (!storage) return;

  try {
    storage.setItem(PRESENTATION_STORAGE_KEY, serializeSessionState(state));
  } catch {
    // Storage can be blocked in embedded or privacy-restricted presentation contexts.
  }
}

export function hydrateSessionState(
  options: {
    readonly hash?: string;
    readonly storageValue?: string | null;
  } = {}
): PresentationSessionState {
  const stored = parseStoredState(options.storageValue);
  const hashBeatId = options.hash ? beatIdFromHash(options.hash) : null;
  const currentBeatId = hashBeatId ?? validBeatId(stored.currentBeatId) ?? "01.1";
  const initial = createInitialPresentationState(currentBeatId);

  return {
    ...initial,
    notesVisible: stored.notesVisible ?? initial.notesVisible,
    reducedMotion: stored.reducedMotion ?? initial.reducedMotion,
    qaMode: {
      active: stored.qaMode?.active ?? initial.qaMode.active,
      selectedItemId:
        stored.qaMode?.selectedItemId ?? initial.qaMode.selectedItemId,
      expanded: stored.qaMode?.expanded ?? initial.qaMode.expanded,
      returnBeatId:
        validBeatId(stored.qaMode?.returnBeatId) ??
        initial.qaMode.returnBeatId
    }
  };
}

function parseStoredState(storageValue?: string | null): StoredSessionState {
  if (!storageValue) return {};

  try {
    return JSON.parse(storageValue) as StoredSessionState;
  } catch {
    return {};
  }
}

function validBeatId(beatId?: BeatId): BeatId | null {
  return beatId && beatById.has(beatId) ? beatId : null;
}

export function qaItemIdFromNumberKey(key: string): QAItemId | null {
  if (!/^[1-6]$/.test(key)) return null;

  return `qa-${key}` as QAItemId;
}

export function initialQAItemId(): QAItemId {
  return DEFAULT_QA_ITEM_ID;
}
