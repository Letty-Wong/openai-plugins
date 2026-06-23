"use client";

import { getMotionAssetGate } from "@/presentation/motion/asset-gates";
import { getMotionContract } from "@/presentation/motion/motion-registry";
import type { MotionContract } from "@/presentation/motion/motion-types";
import type { BeatId } from "@/presentation/core/state-types";
import { getActorLifecycle } from "@/presentation/stage/stage-actors";
import type { StaticFrameKind } from "@/presentation/stage/static-frames";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

gsap.config({ nullTargetWarn: false });

type StageMotionRuntimeProps = {
  readonly beatId: BeatId;
  readonly frameKind: StaticFrameKind;
  readonly reducedMotion: boolean;
};

const runtimeBeatIds = new Set<BeatId>(["01.1", "03.5", "05.1", "18.7", "20.10"]);

export function StageMotionRuntime({
  beatId,
  frameKind,
  reducedMotion
}: StageMotionRuntimeProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const contract = getMotionContract(beatId);
  const canRun =
    contract?.frameKind === frameKind &&
    contract.readiness === "READY_FOR_RUNTIME" &&
    runtimeBeatIds.has(beatId) &&
    !getMotionAssetGate(contract.gateId).blocksRuntime;

  useEffect(() => {
    const root = markerRef.current?.closest(".visual-stage");
    if (!(root instanceof HTMLElement) || !contract || !canRun) return;

    const context = gsap.context(() => {
      resetRuntimeTargets(root);

      if (reducedMotion) {
        applyReducedMotion(root, contract);
        return;
      }

      runMotionContract(root, contract);
    }, root);

    return () => context.revert();
  }, [beatId, canRun, contract, reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="stage-motion-runtime"
      data-motion-beat-id={beatId}
      data-motion-enabled={String(canRun)}
      data-motion-frame-kind={frameKind}
      data-motion-reduced={String(reducedMotion)}
      ref={markerRef}
    />
  );
}

function runMotionContract(root: Element, contract: MotionContract) {
  const from = (
    timeline: gsap.core.Timeline,
    targets: Element | readonly Element[],
    vars: gsap.TweenVars,
    position?: number | string
  ) => {
    const safeTargets = gsap.utils.toArray<Element>(targets);
    if (safeTargets.length === 0) return timeline;
    return timeline.from(safeTargets, vars, position);
  };
  const to = (
    timeline: gsap.core.Timeline,
    targets: Element | readonly Element[],
    vars: gsap.TweenVars,
    position?: number | string
  ) => {
    const safeTargets = gsap.utils.toArray<Element>(targets);
    if (safeTargets.length === 0) return timeline;
    return timeline.to(safeTargets, vars, position);
  };
  const fromTo = (
    timeline: gsap.core.Timeline,
    targets: Element | readonly Element[],
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
    position?: number | string
  ) => {
    const safeTargets = gsap.utils.toArray<Element>(targets);
    if (safeTargets.length === 0) return timeline;
    return timeline.fromTo(safeTargets, fromVars, toVars, position);
  };
  const ambientTo = (targets: Element | readonly Element[], vars: gsap.TweenVars) => {
    const safeTargets = gsap.utils.toArray<Element>(targets);
    if (safeTargets.length > 0) gsap.to(safeTargets, vars);
  };
  if (contract.beatId === "01.1") {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    from(timeline, select(root, ".integration-ring"), {
      duration: contract.durationMs / 1000,
      opacity: 0,
      rotate: -5,
      scale: 0.86,
      transformOrigin: "50% 50%"
    });
    from(timeline, select(root, ".entry-node"), {
      duration: 0.34,
      opacity: 0,
      scale: 0.56,
      transformOrigin: "50% 50%"
    }, "-=0.42");
    ambientTo(select(root, ".texture-atmosphere"), {
      duration: 4.8,
      ease: "sine.inOut",
      repeat: -1,
      y: -4,
      yoyo: true
    });
    return;
  }

  if (contract.beatId === "03.5") {
    const ringLifecycle = getActorLifecycle("actor.integration-ring", contract.beatId);
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    from(timeline, select(root, ".timeline-track"), {
      duration: 0.46,
      opacity: 0,
      y: 18
    });
    from(timeline, selectAll(root, ".timeline-node"), {
      duration: 0.42,
      opacity: 0,
      scale: 0.82,
      stagger: 0.08,
      transformOrigin: "50% 50%"
    }, "-=0.18");
    if (ringLifecycle.phase === "enter") {
      from(timeline, select(root, ".integration-ring"), {
        duration: 0.64,
        opacity: 0,
        scale: 0.94,
        transformOrigin: "50% 50%"
      }, "-=0.48");
    } else {
      to(timeline, select(root, ".integration-ring"), {
        duration: 0.64,
        rotate: 0,
        scale: 1,
        transformOrigin: "50% 50%"
      }, "-=0.48");
    }
    return;
  }

  if (contract.beatId === "05.1") {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    from(timeline, select(root, ".ledger-dial"), {
      duration: contract.durationMs / 1000,
      opacity: 0,
      rotate: -4,
      scale: 0.94,
      transformOrigin: "50% 50%"
    });
    from(timeline, selectAll(root, ".dial-quadrant"), {
      duration: 0.32,
      opacity: 0,
      scale: 0.98,
      stagger: 0.06,
      transformOrigin: "50% 50%"
    }, "-=0.42");
    return;
  }

  if (contract.beatId === "18.7") {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    from(timeline, select(root, ".human-review-node"), {
      duration: 0.42,
      opacity: 0,
      x: -24
    });
    from(timeline, select(root, ".action-confirm-gate"), {
      duration: 0.42,
      opacity: 0,
      x: 24
    }, "-=0.18");
    from(timeline, select(root, ".execution-track"), {
      duration: 0.46,
      opacity: 0,
      y: 10
    }, "-=0.28");
    return;
  }

  if (contract.beatId === "20.10") {
    const actionPathLifecycle = getActorLifecycle("actor.action-path", contract.beatId);
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (actionPathLifecycle.phase === "enter") {
      prepareStrokePaths(root);
      fromTo(timeline, selectAll(root, ".action-path-line path"), {
        strokeDashoffset: (_index, target: SVGPathElement) => target.getTotalLength()
      }, {
        duration: 0.86,
        strokeDashoffset: 0,
        stagger: 0.12
      });
      from(timeline, select(root, ".selected-scenario"), {
        duration: 0.38,
        opacity: 0,
        y: 14
      }, "-=0.46");
      from(timeline, selectAll(root, ".milestone-node"), {
        duration: 0.32,
        opacity: 0,
        y: 16,
        stagger: 0.06
      }, "-=0.24");
      return;
    }

    to(timeline, selectAll(root, ".action-path-line path"), {
      duration: 0.72,
      opacity: 1,
      scale: 1,
      transformOrigin: "50% 50%",
      stagger: 0.08
    });
    fromTo(timeline, select(root, ".selected-scenario"), {
      y: 8,
      scale: 0.985
    }, {
      duration: 0.34,
      y: 0,
      scale: 1
    }, "-=0.46");
    fromTo(timeline, selectAll(root, ".milestone-node"), {
      y: 10,
      scale: 0.985
    }, {
      duration: 0.34,
      y: 0,
      scale: 1,
      stagger: 0.05
    }, "-=0.24");
  }
}

function applyReducedMotion(root: Element, contract: MotionContract) {
  resetRuntimeTargets(root);

  if (contract.reducedMotion.mode === "hold") return;

  const duration = contract.reducedMotion.maxDurationMs / 1000;
  const targets = selectAll(root, reducedMotionSelectors(contract.beatId));
  if (targets.length === 0 || duration === 0) return;

  gsap.fromTo(targets, { opacity: 0.001 }, { duration, opacity: 1, ease: "none" });
}

function resetRuntimeTargets(root: Element) {
  gsap.set(selectAll(root, [
    ".integration-ring",
    ".entry-node",
    ".texture-atmosphere",
    ".timeline-track",
    ".timeline-node",
    ".ledger-dial",
    ".dial-quadrant",
    ".human-review-node",
    ".action-confirm-gate",
    ".execution-track",
    ".action-path-line path",
    ".selected-scenario",
    ".milestone-node"
  ]), {
    clearProps: "all"
  });
}

function prepareStrokePaths(root: Element) {
  for (const path of selectAll(root, ".action-path-line path")) {
    if (path instanceof SVGPathElement) {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
    }
  }
}

function reducedMotionSelectors(beatId: BeatId) {
  if (beatId === "01.1") return [".integration-ring", ".entry-node"];
  if (beatId === "03.5") {
    const ringLifecycle = getActorLifecycle("actor.integration-ring", beatId);
    return ringLifecycle.phase === "enter"
      ? [".timeline-track", ".timeline-node", ".integration-ring"]
      : [".timeline-track", ".timeline-node"];
  }
  if (beatId === "05.1") return [".ledger-dial", ".dial-quadrant"];
  if (beatId === "18.7") return [".human-review-node", ".action-confirm-gate", ".execution-track"];
  if (beatId === "20.10") {
    const actionPathLifecycle = getActorLifecycle("actor.action-path", beatId);
    return actionPathLifecycle.phase === "enter"
      ? [".action-path-line", ".selected-scenario", ".milestone-node"]
      : [];
  }

  return [];
}

function select(root: Element, selector: string) {
  const target = root.querySelector(selector);
  return target ? [target] : [];
}

function selectAll(root: Element, selectors: string | readonly string[]) {
  const selector =
    typeof selectors === "string"
      ? selectors.trim()
      : selectors.map((item) => item.trim()).filter(Boolean).join(",");

  if (!selector) return [];

  return gsap.utils.toArray<Element>(root.querySelectorAll(selector));
}
