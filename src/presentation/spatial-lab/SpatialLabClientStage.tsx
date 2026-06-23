"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { beatById } from "@/content/beats";
import {
  createInitialPresentationState,
  jumpToBeat,
  nextBeat,
  previousBeat,
  toggleReducedMotion
} from "@/presentation/core/PresentationController";
import type { BeatId } from "@/presentation/core/state-types";
import { PoseTransitionRuntime, toInitialPoseStyle } from "@/presentation/spatial-lab/PoseTransitionRuntime";
import {
  labActorIds,
  labArtifactIds,
  resolveStageTarget
} from "@/presentation/spatial-lab/stage-target";
import type {
  LabActorTarget,
  LabArtifactTarget,
  StageTarget
} from "@/presentation/spatial-lab/stage-target";
import {
  domTreeText,
  ownershipRows
} from "@/presentation/spatial-lab/spatial-lab-contract";

const sampleBeatIds = ["01.1", "08.7", "09.1", "15.8", "16.1", "20.10", "21.1"] as const satisfies readonly BeatId[];

type SpatialLabClientStageProps = {
  readonly initialBeatId: BeatId;
};

export function SpatialLabClientStage({
  initialBeatId
}: SpatialLabClientStageProps) {
  const [state, setState] = useState(() => createInitialPresentationState(initialBeatId));
  const target = useMemo(
    () => resolveStageTarget(state.currentBeatId, { reducedMotion: state.reducedMotion }),
    [state.currentBeatId, state.reducedMotion]
  );

  return (
    <main
      className="spatial-lab-root"
      data-current-beat-id={target.beatId}
      data-spatial-lab-version="V4"
    >
      <header className="spatial-lab-header">
        <p>Spatial Lab V4 / Gate A + Gate B greybox</p>
        <h1>WorldCamera owns one continuous greybox world</h1>
        <span>No production visuals. No new effects. Three key transitions are StageTarget-driven.</span>
      </header>

      <section
        className="spatial-lab-viewport"
        data-beat-movement-kind={target.movementKind}
        data-current-beat-id={target.beatId}
        data-owner="ScreenViewport"
        data-route-phase={target.routePhase}
        data-spatial-transition-gate={target.transition?.gate ?? "none"}
        data-spatial-transition-id={target.transition?.id ?? "none"}
      >
        <WorldCamera target={target}>
          <WorldSpace>
            <WorldAtmosphere target={target} />
            <PersistentActors target={target} />
            <ArtifactSystem target={target} />
            <WorldTypography target={target} />
          </WorldSpace>
        </WorldCamera>
      </section>

      <ScreenCopyLayer target={target} />
      <TransitionReadout target={target} />
      <LabControls
        currentBeatId={state.currentBeatId}
        onJump={(beatId) => setState((current) => jumpToBeat(current, beatId))}
        onNext={() => setState(nextBeat)}
        onPrevious={() => setState(previousBeat)}
        onToggleReducedMotion={() => setState(toggleReducedMotion)}
        reducedMotion={state.reducedMotion}
      />
      <ContractPanel />
      <PoseTransitionRuntime reducedMotion={state.reducedMotion} target={target} />
    </main>
  );
}

function WorldCamera({
  children,
  target
}: {
  readonly children: React.ReactNode;
  readonly target: StageTarget;
}) {
  return (
    <div
      className="spatial-lab-world-camera"
      data-camera-depth-band={target.camera.depthBand}
      data-camera-focus-actor-id={target.camera.focusActorId ?? "none"}
      data-camera-pose-id={target.camera.poseId}
      data-owner="WorldCamera"
      data-ring-gap={target.ring.gap}
      data-ring-role={target.ring.role}
      style={toInitialPoseStyle(target)}
    >
      {children}
    </div>
  );
}

function WorldSpace({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="spatial-lab-world-space" data-owner="WorldSpace">
      {children}
    </div>
  );
}

function WorldAtmosphere({ target }: { readonly target: StageTarget }) {
  return (
    <div
      aria-hidden="true"
      className="spatial-lab-world-atmosphere"
      data-owner="WorldSpace"
      data-route-phase={target.routePhase}
    />
  );
}

function PersistentActors({ target }: { readonly target: StageTarget }) {
  return (
    <div className="spatial-lab-persistent-actors" data-owner="PersistentActors">
      {labActorIds.map((actorId) => (
        <PersistentActor actor={target.actors[actorId]} key={actorId} />
      ))}
    </div>
  );
}

function PersistentActor({ actor }: { readonly actor: LabActorTarget }) {
  return (
    <div
      className="spatial-lab-actor"
      data-actor-role={actor.role}
      data-lifecycle-phase={actor.lifecycle}
      data-owner="PersistentActors"
      data-spatial-function={actor.functionRole}
      data-spatial-occlusion={actor.occlusion}
      data-stage-actor-id={actor.actorId}
      data-target-pose-id={actor.poseId}
      data-visible={String(actor.visible)}
      style={actorStyle(actor)}
    >
      <span>{actor.actorId}</span>
      <strong>{actor.role}</strong>
      <small>{actor.poseId}</small>
    </div>
  );
}

function ArtifactSystem({ target }: { readonly target: StageTarget }) {
  return (
    <div className="spatial-lab-artifact-system" data-owner="ArtifactSystem">
      {labArtifactIds.map((artifactId) => (
        <ArtifactBlock artifact={target.artifacts[artifactId]} key={artifactId} />
      ))}
    </div>
  );
}

function ArtifactBlock({ artifact }: { readonly artifact: LabArtifactTarget }) {
  return (
    <div
      className="spatial-lab-artifact"
      data-artifact-id={artifact.artifactId}
      data-artifact-mode={artifact.mode}
      data-lifecycle-phase={artifact.lifecycle}
      data-owner="ArtifactSystem"
      data-visible={String(artifact.visible)}
      style={artifactStyle(artifact)}
    >
      <span>{artifact.artifactId}</span>
      <strong>{artifact.mode}</strong>
    </div>
  );
}

function WorldTypography({ target }: { readonly target: StageTarget }) {
  return (
    <div className="spatial-lab-world-typography" data-owner="WorldTypography">
      <span>{target.ring.role}</span>
      <strong>{target.copy.headline}</strong>
    </div>
  );
}

function ScreenCopyLayer({ target }: { readonly target: StageTarget }) {
  return (
    <aside className="spatial-lab-screen-copy" data-owner="ScreenCopyLayer">
      <p>{target.copy.eyebrow}</p>
      <h2>{target.copy.headline}</h2>
      <span>{target.copy.support}</span>
      <small>{target.copy.caption}</small>
    </aside>
  );
}

function TransitionReadout({ target }: { readonly target: StageTarget }) {
  if (!target.transition) {
    return (
      <aside className="spatial-lab-transition-readout" data-owner="TransitionReadout">
        <p>No key transition on this Beat</p>
      </aside>
    );
  }

  return (
    <aside
      className="spatial-lab-transition-readout"
      data-owner="TransitionReadout"
      data-transition-gate={target.transition.gate}
    >
      <p>{target.transition.gate}</p>
      <h2>{target.transition.label}</h2>
      <ul>
        {target.transition.acceptanceFocus.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

function LabControls({
  currentBeatId,
  onJump,
  onNext,
  onPrevious,
  onToggleReducedMotion,
  reducedMotion
}: {
  readonly currentBeatId: BeatId;
  readonly onJump: (beatId: BeatId) => void;
  readonly onNext: () => void;
  readonly onPrevious: () => void;
  readonly onToggleReducedMotion: () => void;
  readonly reducedMotion: boolean;
}) {
  return (
    <nav className="spatial-lab-lab-controls" data-owner="PresenterControls" aria-label="Spatial lab controls">
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="button" onClick={onNext}>Next</button>
      <button type="button" onClick={onToggleReducedMotion}>
        Reduced motion: {reducedMotion ? "on" : "off"}
      </button>
      {sampleBeatIds.map((beatId) => (
        <button
          aria-pressed={currentBeatId === beatId}
          disabled={!beatById.has(beatId)}
          key={beatId}
          onClick={() => onJump(beatId)}
          type="button"
        >
          {beatId}
        </button>
      ))}
    </nav>
  );
}

function ContractPanel() {
  return (
    <aside className="spatial-lab-contract" aria-label="Spatial lab ownership contract">
      <h2>DOM Contract</h2>
      <pre>{domTreeText}</pre>
      <h2>Attribute Owners</h2>
      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>Owns</th>
            <th>Must Not Own</th>
          </tr>
        </thead>
        <tbody>
          {ownershipRows.map((row) => (
            <tr key={row.layer}>
              <td>{row.layer}</td>
              <td>{row.owns}</td>
              <td>{row.mustNotOwn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}

function actorStyle(actor: LabActorTarget): CSSProperties {
  return {
    "--lab-actor-opacity": actor.opacity,
    "--lab-actor-rotate-x": `${actor.rotateX}deg`,
    "--lab-actor-rotate-y": `${actor.rotateY}deg`,
    "--lab-actor-rotate-z": `${actor.rotateZ}deg`,
    "--lab-actor-scale": actor.scale,
    "--lab-actor-x": `${actor.x}px`,
    "--lab-actor-y": `${actor.y}px`,
    "--lab-actor-z": `${actor.z}px`
  } as CSSProperties;
}

function artifactStyle(artifact: LabArtifactTarget): CSSProperties {
  return {
    "--lab-artifact-opacity": artifact.opacity,
    "--lab-artifact-scale": artifact.scale,
    "--lab-artifact-x": `${artifact.x}px`,
    "--lab-artifact-y": `${artifact.y}px`,
    "--lab-artifact-z": `${artifact.z}px`
  } as CSSProperties;
}
