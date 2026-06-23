import {
  enterQA,
  exitQA,
  nextBeat,
  nextScene,
  previousBeat,
  previousScene,
  resetCurrentScene,
  selectQAItem,
  toggleNotes,
  toggleQA,
  toggleQAExpanded,
  toggleReducedMotion
} from "@/presentation/core/PresentationController";
import type { PresentationSessionState } from "@/presentation/core/PresentationController";
import { qaItemIdFromNumberKey } from "@/presentation/core/persistence";

export function reduceKeyboardShortcut(
  state: PresentationSessionState,
  event: Pick<KeyboardEvent, "key" | "shiftKey">
): PresentationSessionState {
  const qaItemId = qaItemIdFromNumberKey(event.key);

  if (qaItemId) {
    return selectQAItem(enterQA(state), qaItemId);
  }

  if (event.key === "ArrowRight") {
    return event.shiftKey ? nextScene(state) : nextBeat(state);
  }

  if (event.key === "ArrowDown" || event.key === "PageDown") {
    return event.shiftKey ? nextScene(state) : nextBeat(state);
  }

  if (event.key === "ArrowLeft") {
    return event.shiftKey ? previousScene(state) : previousBeat(state);
  }

  if (event.key === "ArrowUp" || event.key === "PageUp") {
    return event.shiftKey ? previousScene(state) : previousBeat(state);
  }

  if (event.key === " " || event.key === "Spacebar") {
    return state.qaMode.active ? toggleQAExpanded(state) : nextBeat(state);
  }

  if (event.key === "Enter") {
    return toggleQAExpanded(state);
  }

  if (event.key === "Escape") {
    return state.qaMode.active ? exitQA(state) : state;
  }

  if (event.key.toLowerCase() === "q") {
    return toggleQA(state);
  }

  if (event.key.toLowerCase() === "n") {
    return toggleNotes(state);
  }

  if (event.key.toLowerCase() === "m") {
    return toggleReducedMotion(state);
  }

  if (event.key.toLowerCase() === "r") {
    return resetCurrentScene(state);
  }

  return state;
}
