import assert from "node:assert/strict";
import test from "node:test";
import {
  createInitialPresentationState,
  enterQA,
  exitQA,
  jumpToBeat,
  nextBeat,
  previousBeat,
  resetCurrentScene,
  selectQAItem,
  toggleReducedMotion
} from "../src/presentation/core/PresentationController";
import { reduceKeyboardShortcut } from "../src/presentation/core/keyboard";
import {
  beatIdFromHash,
  hydrateSessionState,
  readPresentationStorage,
  serializeSessionState,
  stateToHash,
  writePresentationStorage
} from "../src/presentation/core/persistence";

test("WP-03 navigates across scene boundaries", () => {
  const start = createInitialPresentationState("01.1");
  const sceneEnd = jumpToBeat(start, "01.3");
  const next = nextBeat(sceneEnd);

  assert.equal(next.currentBeatId, "02.1");
  assert.equal(previousBeat(next).currentBeatId, "01.3");
});

test("WP-03 supports direct jump, scene reset, and hash restoration", () => {
  const state = jumpToBeat(createInitialPresentationState(), "15.7");

  assert.equal(state.currentBeatId, "15.7");
  assert.equal(stateToHash(state), "#scene-15/15.7");
  assert.equal(beatIdFromHash("#scene-15/15.7"), "15.7");
  assert.equal(
    hydrateSessionState({ hash: "#scene-15/15.7" }).currentBeatId,
    "15.7"
  );
  assert.equal(
    hydrateSessionState({
      hash: "#scene-21/21.7",
      storageValue: serializeSessionState(jumpToBeat(state, "15.8"))
    }).currentBeatId,
    "21.7"
  );
  assert.equal(resetCurrentScene(state).currentBeatId, "15.1");
});

test("WP-03 restores reduced motion and notes from storage", () => {
  const state = {
    ...toggleReducedMotion(createInitialPresentationState("03.5")),
    notesVisible: true
  };
  const restored = hydrateSessionState({
    storageValue: serializeSessionState(state)
  });

  assert.equal(restored.currentBeatId, "03.5");
  assert.equal(restored.reducedMotion, true);
  assert.equal(restored.notesVisible, true);
});

test("WP-03 tolerates unavailable local storage during hydration", () => {
  const blockedStorage = {
    getItem() {
      throw new Error("storage unavailable");
    },
    setItem() {
      throw new Error("storage unavailable");
    }
  };
  const state = createInitialPresentationState("09.2");

  assert.equal(readPresentationStorage(blockedStorage), null);
  assert.doesNotThrow(() => writePresentationStorage(state, blockedStorage));
  assert.equal(
    hydrateSessionState({
      hash: "#scene-09/09.2",
      storageValue: readPresentationStorage(blockedStorage)
    }).currentBeatId,
    "09.2"
  );
});

test("WP-03 Q&A is a scene-21 submode with exact return state", () => {
  const terminal = jumpToBeat(createInitialPresentationState(), "21.8");
  const qa = selectQAItem(enterQA(terminal), "qa-6");

  assert.equal(qa.currentBeatId, "21.8");
  assert.equal(qa.qaMode.active, true);
  assert.equal(qa.qaMode.selectedItemId, "qa-6");
  assert.equal(exitQA(qa).currentBeatId, "21.8");
});

test("WP-03 keyboard shortcuts cover core presenter controls", () => {
  const start = createInitialPresentationState("01.1");

  assert.equal(
    reduceKeyboardShortcut(start, { key: "ArrowRight", shiftKey: false })
      .currentBeatId,
    "01.2"
  );
  assert.equal(
    reduceKeyboardShortcut(start, { key: "ArrowRight", shiftKey: true })
      .currentBeatId,
    "02.1"
  );

  const qa = reduceKeyboardShortcut(start, { key: "3", shiftKey: false });
  assert.equal(qa.qaMode.active, true);
  assert.equal(qa.qaMode.selectedItemId, "qa-3");
});
