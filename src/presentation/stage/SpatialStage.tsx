import type { ResolvedBeatState } from "@/presentation/core/state-types";
import {
  getBeatMovementKind,
  getCameraPoseForBeat,
  getRoutePhaseForScene,
  getSpatialTransitionCue,
  spatialRouteSegments
} from "@/presentation/stage/spatial-poses";
import type { CameraPose, SpatialTransitionCue } from "@/presentation/stage/spatial-poses";
import { getStageCue } from "@/presentation/stage/stage-script";
import type { CSSProperties, ReactNode } from "react";

type SpatialStageProps = {
  readonly resolved: ResolvedBeatState;
};

export function SpatialStage({ resolved }: SpatialStageProps) {
  const routePhase = getRoutePhaseForScene(resolved.scene.sceneNumber);
  const transitionCue = getSpatialTransitionCue(resolved.beat.id);
  const cameraPose = getCameraPoseForBeat(resolved.beat.id, resolved.scene.sceneNumber);
  const movementKind = getBeatMovementKind(resolved.beat.id, resolved.scene.sceneNumber);
  const stageCue = getStageCue(resolved.beat.id);

  return (
    <div
      aria-hidden="true"
      className={`spatial-stage spatial-route-${routePhase}`}
      data-beat-movement-kind={movementKind}
      data-camera-pose-id={cameraPose.poseId}
      data-focus-actor-id={stageCue.leadActorId}
      data-route-phase={routePhase}
      data-spatial-stage="world-camera-graybox"
      data-spatial-transition-id={transitionCue?.id ?? "none"}
      data-spatial-transition-kind={transitionCue?.kind ?? "none"}
    >
      <WorldCamera cameraPose={cameraPose}>
        <div className="spatial-route-field">
          <svg className="spatial-route-path" viewBox="0 0 1200 720">
            <path
              className="spatial-route-shadow"
              d="M410 120 C390 220 430 285 470 350 C535 455 675 330 770 355 C900 390 740 545 642 618 C584 660 580 580 650 510"
              pathLength="1"
            />
            <path
              className="spatial-route-active"
              d="M410 120 C390 220 430 285 470 350 C535 455 675 330 770 355 C900 390 740 545 642 618 C584 660 580 580 650 510"
              pathLength="1"
            />
          </svg>
          {spatialRouteSegments.map((segment) => (
            <div
              className={segment.id === routePhase ? "spatial-route-anchor active" : "spatial-route-anchor"}
              data-route-anchor={segment.id}
              key={segment.id}
              style={
                {
                  "--anchor-x": `${segment.x}%`,
                  "--anchor-y": `${segment.y}%`,
                  "--anchor-z": `${segment.z}px`
                } as CSSProperties
              }
            >
              <span>{segment.range}</span>
              <strong>{segment.label}</strong>
            </div>
          ))}
        </div>

        {transitionCue ? <SpatialTransitionGraybox cue={transitionCue} /> : null}

        <div className="spatial-camera-reticle">
          <span>{cameraPose.poseId}</span>
          <strong>{resolved.beat.label}</strong>
        </div>
      </WorldCamera>
    </div>
  );
}

function SpatialTransitionGraybox({ cue }: { readonly cue: SpatialTransitionCue }) {
  return (
    <div
      className="spatial-transition-graybox"
      data-transition-from={cue.fromPhase}
      data-transition-kind={cue.kind}
      data-transition-lead-actor={cue.leadActorId}
      data-transition-to={cue.toPhase}
    >
      <div className="spatial-transition-axis" />
      <div className="spatial-transition-portal" />
      <div className="spatial-transition-reveal" />
      <div className="spatial-transition-label">
        <span>{cue.beatId}</span>
        <strong>{cue.label}</strong>
      </div>
    </div>
  );
}

function WorldCamera({
  cameraPose,
  children
}: {
  readonly cameraPose: CameraPose;
  readonly children: ReactNode;
}) {
  return (
    <div
      className="world-camera"
      data-camera-depth-band={cameraPose.depthBand}
      style={
        {
          "--camera-x": `${cameraPose.x}px`,
          "--camera-y": `${cameraPose.y}px`,
          "--camera-z": `${cameraPose.z}px`,
          "--camera-scale": cameraPose.scale,
          "--camera-rotate-x": `${cameraPose.rotationX}deg`,
          "--camera-rotate-y": `${cameraPose.rotationY}deg`,
          "--camera-rotate-z": `${cameraPose.rotationZ}deg`
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
