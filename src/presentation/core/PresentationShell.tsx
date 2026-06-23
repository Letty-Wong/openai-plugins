"use client";

import { qaItems } from "@/content/qa";
import { scenes } from "@/content/scenes";
import { speakerNotesByBeatId } from "@/content/speaker-notes";
import {
  createInitialPresentationState,
  enterQA,
  getResolvedSession,
  jumpToScene,
  nextBeat,
  previousBeat,
  resetCurrentScene,
  selectQAItem,
  toggleNotes,
  toggleReducedMotion
} from "@/presentation/core/PresentationController";
import type { PresentationSessionState } from "@/presentation/core/PresentationController";
import { reduceKeyboardShortcut } from "@/presentation/core/keyboard";
import {
  beatIdFromHash,
  hydrateSessionState,
  readPresentationStorage,
  stateToHash,
  writePresentationStorage
} from "@/presentation/core/persistence";
import type { SceneId } from "@/presentation/core/state-types";
import type { ContinuityDirection } from "@/presentation/motion/ContinuityMotionRuntime";
import { VisualStage } from "@/presentation/stage/VisualStage";
import { useEffect, useMemo, useRef, useState } from "react";
import { beats } from "@/content/beats";

export function PresentationShell() {
  const [state, setState] = useState<PresentationSessionState>(() =>
    createInitialPresentationState()
  );
  const [hydrated, setHydrated] = useState(false);
  const [fullscreenMessage, setFullscreenMessage] = useState("");
  const [hudCollapsed, setHudCollapsed] = useState(true);
  const resolved = useMemo(() => getResolvedSession(state), [state]);
  const previousBeatOrderRef = useRef(resolved.beat.order);
  const externalHashNavigationRef = useRef(false);
  const wheelCueRef = useRef<{
    deltaY: number;
    frame: number;
    lastCueAt: number;
  }>({ deltaY: 0, frame: 0, lastCueAt: 0 });
  const transitionDirection: ContinuityDirection =
    resolved.beat.order === previousBeatOrderRef.current
      ? "hold"
      : resolved.beat.order > previousBeatOrderRef.current
        ? "forward"
        : "backward";
  const activeQAItem = qaItems.find(
    (item) => item.id === state.qaMode.selectedItemId
  );
  const notes = speakerNotesByBeatId.get(state.currentBeatId);

  useEffect(() => {
    previousBeatOrderRef.current = resolved.beat.order;
  }, [resolved.beat.order]);

  useEffect(() => {
    externalHashNavigationRef.current = Boolean(beatIdFromHash(window.location.hash));
    setState(
      hydrateSessionState({
        hash: window.location.hash,
        storageValue: readPresentationStorage(getBrowserStorage())
      })
    );
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      externalHashNavigationRef.current = Boolean(beatIdFromHash(window.location.hash));
      setState(
        hydrateSessionState({
          hash: window.location.hash,
          storageValue: readPresentationStorage(getBrowserStorage())
        })
      );
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const hashBeatId = beatIdFromHash(window.location.hash);
    if (externalHashNavigationRef.current) {
      if (hashBeatId && hashBeatId !== state.currentBeatId) return;
      externalHashNavigationRef.current = false;
    }

    window.history.replaceState(null, "", stateToHash(state));
    writePresentationStorage(state, getBrowserStorage());
  }, [hydrated, state]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "h" || event.key === "H") {
        event.preventDefault();
        setHudCollapsed((current) => !current);
        return;
      }

      if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        void requestFullscreen(setFullscreenMessage);
        return;
      }

      const nextState = reduceKeyboardShortcut(state, event);
      if (nextState !== state) {
        event.preventDefault();
        setState(nextState);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state]);

  useEffect(() => {
    if (!hydrated) return;

    const handleWheel = (event: WheelEvent) => {
      if (state.qaMode.active) return;
      event.preventDefault();
      wheelCueRef.current.deltaY += event.deltaY;

      if (wheelCueRef.current.frame) return;

      wheelCueRef.current.frame = window.requestAnimationFrame(() => {
        wheelCueRef.current.frame = 0;

        const now = window.performance.now();
        const deltaY = wheelCueRef.current.deltaY;
        const threshold = 86;
        const cooldownMs = 340;

        if (Math.abs(deltaY) < threshold) {
          return;
        }

        if (now - wheelCueRef.current.lastCueAt < cooldownMs) {
          wheelCueRef.current.deltaY = 0;
          return;
        }

        wheelCueRef.current.deltaY = 0;
        wheelCueRef.current.lastCueAt = now;
        setState((current) => (deltaY > 0 ? nextBeat(current) : previousBeat(current)));
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelCueRef.current.frame) {
        window.cancelAnimationFrame(wheelCueRef.current.frame);
      }
    };
  }, [hydrated, state.qaMode.active]);

  useEffect(() => {
    if (!hydrated) return;

    const beatIndex = beats.findIndex((beat) => beat.id === state.currentBeatId);
    if (beatIndex < 0) return;
    const beatProgress = beatIndex / Math.max(1, beats.length - 1);

    const stage = document.querySelector(".visual-stage");
    if (stage instanceof HTMLElement) {
      stage.style.setProperty("--native-scroll-progress", beatProgress.toFixed(4));
      stage.style.setProperty("--native-scroll-raw-index", String(beatIndex));
      stage.style.setProperty("--free-scroll-progress", "0");
      stage.style.setProperty("--free-scroll-offset", "0px");
      stage.style.setProperty("--free-scroll-theater-y", "0vh");
      stage.style.setProperty("--free-scroll-runway-x", "0vw");
      stage.style.setProperty("--native-scroll-rail-x", `${beatProgress * -1180}vw`);
      stage.style.setProperty("--native-scroll-panorama-x", `${beatProgress * -1820}vw`);
      stage.style.setProperty("--native-scroll-depth-x", `${beatProgress * -260}vw`);
      stage.style.setProperty("--native-scroll-depth-reverse-x", `${beatProgress * 140}vw`);
      stage.style.setProperty("--native-scroll-product-rotate", `${-16 + beatProgress * 40}deg`);
      stage.style.setProperty("--native-scroll-product-y", "0vh");
      stage.style.setProperty("--native-scroll-runway-y", "0vh");
      stage.style.setProperty("--native-scroll-stage-tilt", "-7deg");
      stage.style.setProperty("--native-scroll-stage-skew", "0deg");
      stage.style.setProperty("--native-scroll-stage-scale", "1");
    }
  }, [hydrated, state.currentBeatId]);

  const update = (nextState: PresentationSessionState) => {
    setState(nextState);
  };

  return (
    <main
      className="presentation-shell"
      data-current-beat-id={state.currentBeatId}
      data-hud-collapsed={String(hudCollapsed)}
      data-hydrated={String(hydrated)}
      data-navigation-mode="presenter-cue-and-wheel"
    >
      <div className="sticky-stage">
        <VisualStage resolved={resolved} transitionDirection={transitionDirection} />
      </div>

      <button
        aria-controls="presenter-hud"
        aria-expanded={!hudCollapsed}
        aria-label={hudCollapsed ? "Show presenter controls" : "Hide presenter controls"}
        className="hud-toggle"
        onClick={() => setHudCollapsed((current) => !current)}
        type="button"
      >
        <span className="hud-toggle-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="sr-only">Toggle presenter controls</span>
      </button>

      {state.qaMode.active && activeQAItem ? (
        <section className="qa-panel" aria-label="Q&A mode">
          <div className="qa-ring">
            {qaItems.map((item) => (
              <button
                className={item.id === activeQAItem.id ? "active" : ""}
                key={item.id}
                onClick={() => update(selectQAItem(state, item.id))}
                type="button"
              >
                {item.id.replace("qa-", "Q")}
              </button>
            ))}
          </div>
          <div className="answer-shell">
            <p className="kicker">Q&A</p>
            <h2>{activeQAItem.question}</h2>
            {activeQAItem.screenAnswer.map((line) => (
              <p className="qa-answer" key={line}>
                {line}
              </p>
            ))}
            {state.qaMode.expanded ? (
              <ul>
                {activeQAItem.structureTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      <aside className="presenter-hud" id="presenter-hud" aria-label="Presenter controls">
        <div className="control-row">
          <button onClick={() => update(previousBeat(state))} type="button">
            Up
          </button>
          <button onClick={() => update(nextBeat(state))} type="button">
            Down
          </button>
          <button onClick={() => update(resetCurrentScene(state))} type="button">
            Reset
          </button>
          <button onClick={() => update(enterQA(state))} type="button">
            Q&A
          </button>
          <button onClick={() => update(toggleNotes(state))} type="button">
            Notes
          </button>
          <button onClick={() => update(toggleReducedMotion(state))} type="button">
            Motion
          </button>
          <button
            onClick={() => void requestFullscreen(setFullscreenMessage)}
            type="button"
          >
            Full
          </button>
        </div>

        <nav className="chapter-nav" aria-label="Chapter navigation">
          {scenes.map((scene) => (
            <button
              className={scene.id === resolved.scene.id ? "active" : ""}
              key={scene.id}
              onClick={() => update(jumpToScene(state, scene.id as SceneId))}
              type="button"
            >
              {String(scene.sceneNumber).padStart(2, "0")}
            </button>
          ))}
        </nav>

        {state.notesVisible ? (
          <section className="notes-panel" aria-label="Presenter notes">
            <strong>Speaker Note</strong>
            <p>{notes?.note}</p>
          </section>
        ) : null}

        {fullscreenMessage ? (
          <p className="hud-message">{fullscreenMessage}</p>
        ) : null}
      </aside>
    </main>
  );
}

function getBrowserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

async function requestFullscreen(
  setMessage: (message: string) => void
): Promise<void> {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      setMessage("");
      return;
    }

    await document.documentElement.requestFullscreen();
    setMessage("");
  } catch {
    setMessage("Fullscreen unavailable in this browser context.");
  }
}
