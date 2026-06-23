"use client";

import type { BeatId } from "@/presentation/core/state-types";
import type { StaticFrameKind } from "@/presentation/stage/static-frames";
import { getSpatialTransitionCue, type SpatialTransitionKind } from "@/presentation/stage/spatial-poses";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

gsap.config({ nullTargetWarn: false });

export type ContinuityDirection = "forward" | "backward" | "hold";

type ContinuityMotionRuntimeProps = {
  readonly beatId: BeatId;
  readonly beatOrder: number;
  readonly direction: ContinuityDirection;
  readonly frameKind: StaticFrameKind;
  readonly reducedMotion: boolean;
  readonly sceneNumber: number;
  readonly totalBeats: number;
};

type StageActor =
  | "opening"
  | "judgement"
  | "timeline"
  | "ledger"
  | "product"
  | "safety"
  | "action"
  | "default";

const layerSelectors = [
  ".background-system",
  ".spatial-stage",
  ".texture-atmosphere",
  ".typography-back",
  ".artifact-layer",
  ".persistent-actor-layer",
  ".product-stage",
  ".integration-geometry",
  ".visual-copy",
  ".shared-shells"
] as const;

export function ContinuityMotionRuntime({
  beatId,
  beatOrder,
  direction,
  frameKind,
  reducedMotion,
  sceneNumber,
  totalBeats
}: ContinuityMotionRuntimeProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const currentActor = getStageActor(frameKind, sceneNumber);
  const previousActorRef = useRef<StageActor>(currentActor);
  const transitionCue = getSpatialTransitionCue(beatId);

  useEffect(() => {
    const root = markerRef.current?.closest(".visual-stage");
    if (!(root instanceof HTMLElement)) return;

    const previousActor = previousActorRef.current;
    const actorChanged = previousActor !== currentActor;
    const progress = totalBeats > 1 ? (beatOrder - 1) / (totalBeats - 1) : 0;
    root.style.setProperty("--beat-progress", String(progress));
    root.style.setProperty("--beat-progress-percent", `${Math.round(progress * 100)}%`);
    root.style.setProperty("--scene-progress", String((sceneNumber - 1) / 20));

    const context = gsap.context(() => {
      gsap.killTweensOf(selectAll(root, layerSelectors));
      gsap.killTweensOf(selectAll(root, ".spatial-transition-graybox"));

      if (reducedMotion || direction === "hold") {
        gsap.set(selectAll(root, layerSelectors), { opacity: 1 });
        gsap.set(selectAll(root, ".visual-copy"), { opacity: 0.08 });
        setGate2TransitionState(root);
        return;
      }

      runContinuityTransition(root, direction, {
        actorChanged,
        transitionKind: transitionCue?.kind
      });
    }, root);

    previousActorRef.current = currentActor;
    return () => context.revert();
  }, [beatId, beatOrder, currentActor, direction, reducedMotion, sceneNumber, totalBeats, transitionCue?.kind]);

  return (
    <div
      aria-hidden="true"
      className="continuity-motion-runtime"
      data-continuity-actor={currentActor}
      data-continuity-actor-changed={String(previousActorRef.current !== currentActor)}
      data-continuity-beat-id={beatId}
      data-continuity-direction={direction}
      data-continuity-frame-kind={frameKind}
      data-continuity-progress={beatOrder}
      data-continuity-reduced={String(reducedMotion)}
      data-spatial-transition-active={String(Boolean(transitionCue))}
      data-spatial-transition-kind={transitionCue?.kind ?? "none"}
      ref={markerRef}
    />
  );
}

function getStageActor(frameKind: StaticFrameKind, sceneNumber: number): StageActor {
  if (sceneNumber >= 9 && sceneNumber <= 18) return "product";
  if (sceneNumber >= 19) return "action";

  if (frameKind === "entry" || frameKind === "hero" || frameKind === "question") {
    return "opening";
  }

  if (frameKind === "concept" || frameKind === "path-dial") {
    return "judgement";
  }

  if (frameKind === "timeline-ai") return "timeline";
  if (frameKind === "ledger") return "ledger";

  if (
    frameKind === "product-slot" ||
    frameKind === "product" ||
    frameKind === "technical-facts" ||
    frameKind === "benefit-translation"
  ) {
    return "product";
  }

  if (
    frameKind === "output-freeze" ||
    frameKind === "safety" ||
    frameKind === "approval-gate" ||
    frameKind === "boundary-loop"
  ) {
    return "safety";
  }

  if (
    frameKind === "scenario-radar" ||
    frameKind === "action-path" ||
    frameKind === "cta-dock" ||
    frameKind === "finale"
  ) {
    return "action";
  }

  return "default";
}

function runContinuityTransition(
  root: HTMLElement,
  direction: Exclude<ContinuityDirection, "hold">,
  options: { readonly actorChanged: boolean; readonly transitionKind?: SpatialTransitionKind }
) {
  const polarity = direction === "forward" ? 1 : -1;
  const actorTravel = options.actorChanged ? 1 : 0.32;
  const actorOpacity = options.actorChanged ? 0.2 : 0.92;
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  const fromTo = (
    targets: Element | readonly Element[],
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
    position?: number | string
  ) => {
    const safeTargets = gsap.utils.toArray<Element>(targets);
    if (safeTargets.length === 0) return timeline;
    return timeline.fromTo(safeTargets, fromVars, toVars, position);
  };

  if (options.actorChanged) {
    fromTo(
      select(root, ".continuity-world-sweep"),
      {
        opacity: 0.82,
        xPercent: 72 * polarity,
        scaleX: 0.7,
        transformOrigin: polarity > 0 ? "100% 50%" : "0% 50%"
      },
      {
        duration: 0.72,
        opacity: 0,
        xPercent: -18 * polarity,
        scaleX: 1.18
      },
      0
    );
  }

  fromTo(
    select(root, ".spatial-stage"),
    { opacity: options.actorChanged ? 0.44 : 0.78 },
    { duration: options.actorChanged ? 0.72 : 0.36, opacity: 1 },
    0
  );

  fromTo(
    select(root, ".background-system"),
    { xPercent: 6 * polarity * actorTravel, scale: options.actorChanged ? 1.04 : 1.01 },
    { duration: options.actorChanged ? 0.82 : 0.48, xPercent: 0, scale: 1 },
    0
  );

  fromTo(
    select(root, ".typography-back"),
    { xPercent: -9 * polarity, opacity: 0.58 },
    { duration: 0.9, xPercent: 0, opacity: 1 },
    0.02
  );

  fromTo(
    selectAll(root, [".artifact-layer", ".persistent-actor-layer", ".product-stage", ".shared-shells"]),
    {
      x: 64 * polarity * actorTravel,
      opacity: actorOpacity,
      scale: options.actorChanged ? 0.985 : 1
    },
    { duration: options.actorChanged ? 0.78 : 0.38, x: 0, opacity: 1, scale: 1, stagger: 0.05 },
    0.08
  );

  fromTo(
    select(root, ".integration-geometry"),
    {
      rotate: 4 * polarity * actorTravel,
      x: 36 * polarity * actorTravel,
      opacity: options.actorChanged ? 0.6 : 0.9,
      scale: options.actorChanged ? 0.965 : 1
    },
    { duration: options.actorChanged ? 0.92 : 0.42, rotate: 0, x: 0, opacity: 1, scale: 1 },
    0.06
  );

  fromTo(
    select(root, ".visual-copy"),
    { y: options.actorChanged ? 18 * polarity : 5 * polarity, opacity: options.actorChanged ? 0.03 : 0.08 },
    { duration: options.actorChanged ? 0.58 : 0.28, y: 0, opacity: 0.08 },
    0.18
  );

  if (options.transitionKind) {
    runGate2TransitionCue(root, direction, options.transitionKind, timeline);
  }
}

function runGate2TransitionCue(
  root: HTMLElement,
  direction: Exclude<ContinuityDirection, "hold">,
  transitionKind: SpatialTransitionKind,
  timeline: gsap.core.Timeline
) {
  const polarity = direction === "forward" ? 1 : -1;
  const graybox = selectAll(root, ".spatial-transition-graybox");
  const fromVars = getGate2TransitionStart(transitionKind, polarity);

  if (graybox.length === 0) return;

  timeline.fromTo(
    graybox,
    fromVars,
    {
      "--gate2-axis-progress": 1,
      "--gate2-motion-opacity": 1,
      "--gate2-motion-x": "0px",
      "--gate2-motion-y": "0px",
      "--gate2-portal-progress": 1,
      "--gate2-reveal-progress": 1,
      duration: 0.82,
      ease: "power3.out"
    },
    0
  );
}

function getGate2TransitionStart(transitionKind: SpatialTransitionKind, polarity: number): gsap.TweenVars {
  if (transitionKind === "turn-horizontal-product") {
    return {
      "--gate2-axis-progress": 0.38,
      "--gate2-motion-opacity": 0.5,
      "--gate2-motion-x": `${-88 * polarity}px`,
      "--gate2-motion-y": "-18px",
      "--gate2-portal-progress": 0.76,
      "--gate2-reveal-progress": 0.84
    };
  }

  if (transitionKind === "portal-forward-safety") {
    return {
      "--gate2-axis-progress": 0.52,
      "--gate2-motion-opacity": 0.58,
      "--gate2-motion-x": "0px",
      "--gate2-motion-y": `${42 * polarity}px`,
      "--gate2-portal-progress": 0.62,
      "--gate2-reveal-progress": 1.16
    };
  }

  return {
    "--gate2-axis-progress": 0.62,
    "--gate2-motion-opacity": 0.54,
    "--gate2-motion-x": `${64 * polarity}px`,
    "--gate2-motion-y": `${-24 * polarity}px`,
    "--gate2-portal-progress": 1.22,
    "--gate2-reveal-progress": 0.7
  };
}

function setGate2TransitionState(root: HTMLElement) {
  gsap.set(selectAll(root, ".spatial-transition-graybox"), {
    "--gate2-axis-progress": 1,
    "--gate2-motion-opacity": 1,
    "--gate2-motion-x": "0px",
    "--gate2-motion-y": "0px",
    "--gate2-portal-progress": 1,
    "--gate2-reveal-progress": 1
  });
}

function select(root: Element, selector: string) {
  const target = root.querySelector(selector);
  return target ? [target] : [];
}

function selectAll(root: Element, selectors: string | readonly string[]) {
  const selector = typeof selectors === "string" ? selectors : selectors.join(",");
  return gsap.utils.toArray<Element>(root.querySelectorAll(selector));
}
