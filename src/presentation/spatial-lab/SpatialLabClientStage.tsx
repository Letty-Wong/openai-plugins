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
import { PoseTransitionRuntime } from "@/presentation/spatial-lab/PoseTransitionRuntime";
import type { SpatialLabMode } from "@/presentation/spatial-lab/SpatialLabStage";
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
  readonly initialMode: SpatialLabMode;
};

export function SpatialLabClientStage({
  initialBeatId,
  initialMode
}: SpatialLabClientStageProps) {
  const [state, setState] = useState(() => createInitialPresentationState(initialBeatId));
  const [mode, setMode] = useState<SpatialLabMode>(initialMode);
  const target = useMemo(
    () => resolveStageTarget(state.currentBeatId, { reducedMotion: state.reducedMotion }),
    [state.currentBeatId, state.reducedMotion]
  );

  return (
    <main
      className="spatial-lab-root"
      data-current-beat-id={target.beatId}
      data-lab-mode={mode}
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
        style={viewportStyle(target)}
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
        onSetMode={setMode}
        onToggleReducedMotion={() => setState(toggleReducedMotion)}
        mode={mode}
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
      style={cameraStyle(target)}
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
      <ActorGeometry actor={actor} />
    </div>
  );
}

function ActorGeometry({ actor }: { readonly actor: LabActorTarget }) {
  if (actor.actorId === "actor.integration-ring") {
    return (
      <>
        <IntegrationRingActor />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.product-stage") {
    return (
      <>
        <ProductStageActor />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.action-path") {
    return (
      <>
        <ActionPathActor />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  return <ActorDebugLabel actor={actor} />;
}

function IntegrationRingActor() {
  return (
    <svg
      aria-hidden="true"
      className="spatial-lab-ring-geometry"
      data-actor-geometry="integration-ring"
      viewBox="0 0 240 240"
    >
      <circle className="spatial-lab-ring-core" cx="120" cy="120" r="58" />
      <circle className="spatial-lab-ring-track" cx="120" cy="120" r="92" pathLength="1" />
      <path className="spatial-lab-ring-segment signal" d="M120 28 A92 92 0 0 1 212 120" />
      <path className="spatial-lab-ring-segment paper" d="M205 151 A92 92 0 0 1 138 210" />
      <path className="spatial-lab-ring-segment paper" d="M101 207 A92 92 0 0 1 34 140" />
      <path className="spatial-lab-ring-segment metal" d="M29 105 A92 92 0 0 1 92 33" />
      <path className="spatial-lab-ring-portal-edge" d="M88 120 A32 32 0 0 1 152 120" />
    </svg>
  );
}

function ProductStageActor() {
  return (
    <div
      aria-hidden="true"
      className="spatial-lab-product-geometry"
      data-actor-geometry="product-stage"
    >
      <div className="spatial-lab-product-shadow" />
      <div className="spatial-lab-product-rail" />
      <div className="spatial-lab-product-valve" />
      <div className="spatial-lab-product-head" />
      <div className="spatial-lab-product-hand" />
    </div>
  );
}

function ActionPathActor() {
  return (
    <svg
      aria-hidden="true"
      className="spatial-lab-action-path-geometry"
      data-actor-geometry="action-path"
      viewBox="0 0 320 150"
    >
      <path className="spatial-lab-action-path-line" d="M24 112 C82 42 144 116 204 62 S282 38 296 24" />
      <circle className="spatial-lab-action-path-node" cx="24" cy="112" r="8" />
      <circle className="spatial-lab-action-path-node signal" cx="204" cy="62" r="10" />
      <circle className="spatial-lab-action-path-node" cx="296" cy="24" r="8" />
    </svg>
  );
}

function ActorDebugLabel({ actor }: { readonly actor: LabActorTarget }) {
  return (
    <span className="spatial-lab-actor-debug">
      <span>{actor.actorId}</span>
      <strong>{actor.role}</strong>
      <small>{actor.poseId}</small>
    </span>
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
  mode,
  onJump,
  onNext,
  onPrevious,
  onSetMode,
  onToggleReducedMotion,
  reducedMotion
}: {
  readonly currentBeatId: BeatId;
  readonly mode: SpatialLabMode;
  readonly onJump: (beatId: BeatId) => void;
  readonly onNext: () => void;
  readonly onPrevious: () => void;
  readonly onSetMode: (mode: SpatialLabMode) => void;
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
      <button type="button" onClick={() => onSetMode(mode === "debug" ? "review" : "debug")}>
        Mode: {mode}
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

function viewportStyle(target: StageTarget): CSSProperties {
  return {
    "--lab-camera-perspective": `${target.camera.perspective}px`
  } as CSSProperties;
}

function cameraStyle(target: StageTarget): CSSProperties {
  return {
    "--lab-camera-rotate-x": `${target.camera.rotationX}deg`,
    "--lab-camera-rotate-y": `${target.camera.rotationY}deg`,
    "--lab-camera-rotate-z": `${target.camera.rotationZ}deg`,
    "--lab-camera-scale": target.camera.scale,
    "--lab-camera-x": `${target.camera.x}px`,
    "--lab-camera-y": `${target.camera.y}px`,
    "--lab-camera-z": `${target.camera.z}px`
  } as CSSProperties;
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
