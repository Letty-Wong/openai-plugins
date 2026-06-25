"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import type {
  SpatialTransitionPlan,
  SpatialWaypointTarget,
  StageTarget
} from "@/presentation/spatial-lab/stage-target";

gsap.config({ nullTargetWarn: false });

type PoseTransitionRuntimeProps = {
  readonly reducedMotion: boolean;
  readonly target: StageTarget;
};

export function PoseTransitionRuntime({
  reducedMotion,
  target
}: PoseTransitionRuntimeProps) {
  const markerRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<{
    readonly root: HTMLElement;
  } | null>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const previousTargetRef = useRef<StageTarget | null>(null);

  useLayoutEffect(() => {
    const root = markerRef.current?.closest(".spatial-lab-root");
    if (!(root instanceof HTMLElement)) return;

    runtimeRef.current = { root };

    return () => {
      const poseNodes = getPoseNodes(root);
      activeTimelineRef.current?.kill();
      gsap.killTweensOf(poseNodes);
      activeTimelineRef.current = null;
      runtimeRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const root = runtimeRef.current?.root;
    if (!(root instanceof HTMLElement)) return;

    const poseNodes = getPoseNodes(root);
    const previousTarget = previousTargetRef.current;
    const playback = getTransitionPlayback(previousTarget, target);

    const duration = getDuration(target.movementKind, reducedMotion || target.reducedMotion);
    activeTimelineRef.current?.kill();
    gsap.killTweensOf(poseNodes);

    if (playback && !(reducedMotion || target.reducedMotion)) {
      activeTimelineRef.current = playTransitionPlan(root, playback.plan, playback.direction);
    } else {
      applyPoseTarget(root, target, playback ? 0.22 : duration);
    }

    previousTargetRef.current = target;
  }, [reducedMotion, target]);

  return (
    <div
      aria-hidden="true"
      className="spatial-lab-pose-runtime"
      data-owner="PoseTransitionRuntime"
      data-pose-runtime-beat-id={target.beatId}
      data-pose-runtime-movement-kind={target.movementKind}
      data-pose-runtime-reduced={String(reducedMotion || target.reducedMotion)}
      ref={markerRef}
    />
  );
}

function getPoseNodes(root: HTMLElement) {
  const viewport = root.querySelector<HTMLElement>(".spatial-lab-viewport");
  const camera = root.querySelector<HTMLElement>(".spatial-lab-world-camera");
  const ring = root.querySelector<HTMLElement>(".spatial-lab-ring-geometry");

  return [
    viewport,
    camera,
    ring,
    ...Array.from(root.querySelectorAll<HTMLElement>(".spatial-lab-actor")),
    ...Array.from(root.querySelectorAll<HTMLElement>(".spatial-lab-artifact"))
  ].filter((node): node is HTMLElement => node instanceof HTMLElement);
}

type RuntimePoseTarget = Pick<StageTarget, "actors" | "artifacts" | "camera" | "portal"> | SpatialWaypointTarget;

function applyPoseTarget(root: HTMLElement, target: RuntimePoseTarget, duration: number) {
  const viewport = root.querySelector<HTMLElement>(".spatial-lab-viewport");
  const camera = root.querySelector<HTMLElement>(".spatial-lab-world-camera");
  const ring = root.querySelector<HTMLElement>(".spatial-lab-ring-geometry");

  if (viewport) tweenOrSet(viewport, viewportVars(target), duration);
  if (camera) tweenOrSet(camera, cameraVars(target), duration);
  if (ring) tweenOrSet(ring, ringVars(target.actors["actor.integration-ring"]), duration);

  Object.values(target.actors).forEach((actor) => {
    const node = root.querySelector<HTMLElement>(
      `.spatial-lab-actor[data-stage-actor-id="${actor.actorId}"]`
    );
    if (node) tweenOrSet(node, actorVars(actor), duration);
  });

  Object.values(target.artifacts).forEach((artifact) => {
    const node = root.querySelector<HTMLElement>(
      `.spatial-lab-artifact[data-artifact-id="${artifact.artifactId}"]`
    );
    if (node) tweenOrSet(node, artifactVars(artifact), duration);
  });
}

function playTransitionPlan(
  root: HTMLElement,
  plan: SpatialTransitionPlan,
  direction: "forward" | "backward"
) {
  const timeline = gsap.timeline({ defaults: { ease: "power3.inOut", overwrite: "auto" } });
  const waypoints = direction === "forward"
    ? plan.waypoints
    : [...plan.waypoints].reverse();

  waypoints.slice(1).forEach((waypoint) => {
    addPoseTargetToTimeline(root, timeline, waypoint.target, waypoint.duration);
  });

  return timeline;
}

function addPoseTargetToTimeline(
  root: HTMLElement,
  timeline: gsap.core.Timeline,
  target: SpatialWaypointTarget,
  duration: number
) {
  const viewport = root.querySelector<HTMLElement>(".spatial-lab-viewport");
  const camera = root.querySelector<HTMLElement>(".spatial-lab-world-camera");
  const ring = root.querySelector<HTMLElement>(".spatial-lab-ring-geometry");
  const position = ">";

  if (viewport) timeline.to(viewport, { ...viewportVars(target), duration }, position);
  if (camera) timeline.to(camera, { ...cameraVars(target), duration }, "<");
  if (ring) timeline.to(ring, { ...ringVars(target.actors["actor.integration-ring"]), duration }, "<");

  Object.values(target.actors).forEach((actor) => {
    const node = root.querySelector<HTMLElement>(
      `.spatial-lab-actor[data-stage-actor-id="${actor.actorId}"]`
    );
    if (node) timeline.to(node, { ...actorVars(actor), duration }, "<");
  });

  Object.values(target.artifacts).forEach((artifact) => {
    const node = root.querySelector<HTMLElement>(
      `.spatial-lab-artifact[data-artifact-id="${artifact.artifactId}"]`
    );
    if (node) timeline.to(node, { ...artifactVars(artifact), duration }, "<");
  });
}

function getTransitionPlayback(
  previousTarget: StageTarget | null,
  target: StageTarget
): { readonly direction: "forward" | "backward"; readonly plan: SpatialTransitionPlan } | undefined {
  if (!previousTarget) return undefined;

  if (previousTarget.beatId === "15.8" && target.beatId === "16.1" && target.transitionPlan) {
    return { direction: "forward", plan: target.transitionPlan };
  }

  if (previousTarget.beatId === "16.1" && target.beatId === "15.8" && previousTarget.transitionPlan) {
    return { direction: "backward", plan: previousTarget.transitionPlan };
  }

  return undefined;
}

function tweenOrSet(
  node: HTMLElement,
  vars: Record<string, string | number>,
  duration: number
) {
  if (duration === 0) {
    gsap.set(node, vars);
    return;
  }

  gsap.to(node, {
    ...vars,
    duration,
    ease: "power3.out",
    overwrite: "auto"
  });
}

function getDuration(movementKind: StageTarget["movementKind"], reducedMotion: boolean) {
  if (reducedMotion) return 0;
  if (movementKind === "stable") return 0;
  if (movementKind === "spatial") return 0.82;
  if (movementKind === "actor") return 0.46;
  return 0;
}

function viewportVars(target: RuntimePoseTarget): Record<string, string | number> {
  return {
    "--lab-camera-perspective": `${target.camera.perspective}px`,
    "--lab-old-world-opacity": target.portal.oldWorldOpacity,
    "--lab-portal-edge-progress": target.portal.edgeProgress,
    "--lab-portal-opacity": target.portal.opacity,
    "--lab-portal-radius": `${target.portal.radius}px`,
    "--lab-portal-safety-opacity": target.portal.safetyOpacity,
    "--lab-portal-scale": target.portal.scale,
    "--lab-portal-x": `${target.portal.x}px`,
    "--lab-portal-y": `${target.portal.y}px`,
    "--lab-portal-z": `${target.portal.z}px`
  };
}

function cameraVars(target: RuntimePoseTarget): Record<string, string | number> {
  return {
    "--lab-camera-rotate-x": `${target.camera.rotationX}deg`,
    "--lab-camera-rotate-y": `${target.camera.rotationY}deg`,
    "--lab-camera-rotate-z": `${target.camera.rotationZ}deg`,
    "--lab-camera-scale": target.camera.scale,
    "--lab-camera-x": `${target.camera.x}px`,
    "--lab-camera-y": `${target.camera.y}px`,
    "--lab-camera-z": `${target.camera.z}px`
  };
}

function ringVars(actor: StageTarget["actors"]["actor.integration-ring"]): Record<string, string | number> {
  return {
    "--ring-gap": actor.geometry.gap,
    "--ring-glow": actor.geometry.glow,
    "--ring-portal-radius": actor.geometry.portalRadius,
    "--ring-segment-progress-1": actor.geometry.segmentProgress[0],
    "--ring-segment-progress-2": actor.geometry.segmentProgress[1],
    "--ring-segment-progress-3": actor.geometry.segmentProgress[2],
    "--ring-segment-progress-4": actor.geometry.segmentProgress[3],
    "--ring-segment-progress-5": actor.geometry.segmentProgress[4],
    "--ring-thickness": actor.geometry.thickness
  };
}

function actorVars(actor: StageTarget["actors"][keyof StageTarget["actors"]]): Record<string, string | number> {
  return {
    "--lab-actor-opacity": actor.opacity,
    "--lab-actor-rotate-x": `${actor.rotateX}deg`,
    "--lab-actor-rotate-y": `${actor.rotateY}deg`,
    "--lab-actor-rotate-z": `${actor.rotateZ}deg`,
    "--lab-actor-scale": actor.scale,
    "--lab-actor-x": `${actor.x}px`,
    "--lab-actor-y": `${actor.y}px`,
    "--lab-actor-z": `${actor.z}px`
  };
}

function artifactVars(
  artifact: StageTarget["artifacts"][keyof StageTarget["artifacts"]]
): Record<string, string | number> {
  return {
    "--lab-artifact-opacity": artifact.opacity,
    "--lab-artifact-scale": artifact.scale,
    "--lab-artifact-x": `${artifact.x}px`,
    "--lab-artifact-y": `${artifact.y}px`,
    "--lab-artifact-z": `${artifact.z}px`
  };
}

export function toInitialPoseStyle(target: StageTarget): CSSProperties {
  return cameraVars(target) as CSSProperties;
}
