"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import type { StageTarget } from "@/presentation/spatial-lab/stage-target";

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

  useLayoutEffect(() => {
    const root = markerRef.current?.closest(".spatial-lab-root");
    if (!(root instanceof HTMLElement)) return;

    const camera = root.querySelector<HTMLElement>(".spatial-lab-world-camera");
    const poseNodes = [
      camera,
      ...Array.from(root.querySelectorAll<HTMLElement>(".spatial-lab-actor")),
      ...Array.from(root.querySelectorAll<HTMLElement>(".spatial-lab-artifact"))
    ].filter((node): node is HTMLElement => node instanceof HTMLElement);

    const duration = getDuration(target.movementKind, reducedMotion || target.reducedMotion);
    const context = gsap.context(() => {
      gsap.killTweensOf(poseNodes);

      if (camera) {
        tweenOrSet(camera, cameraVars(target), duration);
      }

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
    }, root);

    return () => context.revert();
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

function cameraVars(target: StageTarget): Record<string, string | number> {
  return {
    "--lab-camera-perspective": `${target.camera.perspective}px`,
    "--lab-camera-rotate-x": `${target.camera.rotationX}deg`,
    "--lab-camera-rotate-y": `${target.camera.rotationY}deg`,
    "--lab-camera-rotate-z": `${target.camera.rotationZ}deg`,
    "--lab-camera-scale": target.camera.scale,
    "--lab-camera-x": `${target.camera.x}px`,
    "--lab-camera-y": `${target.camera.y}px`,
    "--lab-camera-z": `${target.camera.z}px`
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
