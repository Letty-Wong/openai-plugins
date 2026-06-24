"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { beatById } from "@/content/beats";
import {
  createInitialPresentationState,
  jumpToBeat,
  nextBeat,
  previousBeat,
  toggleReducedMotion
} from "@/presentation/core/PresentationController";
import { reduceKeyboardShortcut } from "@/presentation/core/keyboard";
import type { BeatId } from "@/presentation/core/state-types";
import { IntegrationRingGeometry } from "@/presentation/stage/IntegrationRing";
import { ProductStage } from "@/presentation/stage/ProductStage";
import { ActionPathGreybox } from "@/presentation/spatial-lab/ActionPathGreybox";
import { PoseTransitionRuntime } from "@/presentation/spatial-lab/PoseTransitionRuntime";
import type { SpatialLabMode } from "@/presentation/spatial-lab/SpatialLabStage";
import {
  labActorIds,
  labArtifactIds,
  resolveStageTarget
} from "@/presentation/spatial-lab/stage-target";
import type {
  IntegrationRingActorTarget,
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
  const viewportRef = useRef<HTMLElement | null>(null);
  const modeRef = useRef(mode);
  const target = useMemo(
    () => resolveStageTarget(state.currentBeatId, { reducedMotion: state.reducedMotion }),
    [state.currentBeatId, state.reducedMotion]
  );
  const initialTargetRef = useRef(target);
  const wheelCueRef = useRef({
    deltaY: 0,
    frame: 0,
    idleTimer: 0,
    lastCueAt: 0
  });

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableEventTarget(event.target)) return;

      setState((current) => {
        const nextState = reduceKeyboardShortcut(current, event);
        if (nextState !== current) {
          event.preventDefault();
        }
        return nextState;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!(viewport instanceof HTMLElement)) return;

    const handleWheel = (event: WheelEvent) => {
      if (modeRef.current !== "review") return;

      event.preventDefault();
      wheelCueRef.current.deltaY += event.deltaY;
      window.clearTimeout(wheelCueRef.current.idleTimer);
      wheelCueRef.current.idleTimer = window.setTimeout(() => {
        wheelCueRef.current.deltaY = 0;
      }, 150);

      if (wheelCueRef.current.frame) return;

      wheelCueRef.current.frame = window.requestAnimationFrame(() => {
        wheelCueRef.current.frame = 0;

        const now = window.performance.now();
        const deltaY = wheelCueRef.current.deltaY;
        const threshold = 86;
        const cooldownMs = 340;

        if (Math.abs(deltaY) < threshold) return;

        if (now - wheelCueRef.current.lastCueAt < cooldownMs) {
          wheelCueRef.current.deltaY = 0;
          return;
        }

        wheelCueRef.current.deltaY = 0;
        wheelCueRef.current.lastCueAt = now;
        setState((current) => (deltaY > 0 ? nextBeat(current) : previousBeat(current)));
      });
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
      if (wheelCueRef.current.frame) {
        window.cancelAnimationFrame(wheelCueRef.current.frame);
      }
      window.clearTimeout(wheelCueRef.current.idleTimer);
    };
  }, []);

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
        data-world-lighting-mode={target.world.lightingMode}
        data-world-tone={target.world.tone}
        data-owner="ScreenViewport"
        data-route-phase={target.routePhase}
        data-spatial-transition-gate={target.transition?.gate ?? "none"}
        data-spatial-transition-id={target.transition?.id ?? "none"}
        ref={viewportRef}
        style={initialViewportStyle(initialTargetRef.current)}
      >
        <WorldCamera initialTarget={initialTargetRef.current} target={target}>
          <WorldSpace>
            <WorldAtmosphere target={target} />
            <PersistentActors initialTarget={initialTargetRef.current} target={target} />
            <ArtifactSystem initialTarget={initialTargetRef.current} target={target} />
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
  initialTarget,
  target
}: {
  readonly children: React.ReactNode;
  readonly initialTarget: StageTarget;
  readonly target: StageTarget;
}) {
  return (
    <div
      className="spatial-lab-world-camera"
      data-camera-depth-band={target.camera.depthBand}
      data-camera-focus-actor-id={target.camera.focusActorId ?? "none"}
      data-camera-pose-id={target.camera.poseId}
      data-owner="WorldCamera"
      data-ring-gap={target.actors["actor.integration-ring"].geometry.gap}
      data-ring-role={target.actors["actor.integration-ring"].geometry.role}
      style={initialCameraStyle(initialTarget)}
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

function PersistentActors({
  initialTarget,
  target
}: {
  readonly initialTarget: StageTarget;
  readonly target: StageTarget;
}) {
  return (
    <div className="spatial-lab-persistent-actors" data-owner="PersistentActors">
      {labActorIds.map((actorId) => (
        <PersistentActor
          actor={target.actors[actorId]}
          initialActor={initialTarget.actors[actorId]}
          key={actorId}
          target={target}
        />
      ))}
    </div>
  );
}

function PersistentActor({
  actor,
  initialActor,
  target
}: {
  readonly actor: LabActorTarget;
  readonly initialActor: LabActorTarget;
  readonly target: StageTarget;
}) {
  return (
    <div
      className="spatial-lab-actor"
      data-actor-role={actor.role}
      data-camera-presence={actor.cameraPresence}
      data-lifecycle-phase={actor.lifecycle}
      data-owner="PersistentActors"
      data-spatial-function={actor.functionRole}
      data-spatial-occlusion={actor.occlusion}
      data-stage-actor-id={actor.actorId}
      data-target-pose-id={actor.poseId}
      data-visible={String(actor.visible)}
      style={initialActorStyle(initialActor)}
    >
      <ActorGeometry actor={actor} target={target} />
    </div>
  );
}

function ActorGeometry({
  actor,
  target
}: {
  readonly actor: LabActorTarget;
  readonly target: StageTarget;
}) {
  if (actor.actorId === "actor.integration-ring") {
    return (
      <>
        <IntegrationRingActor actor={actor as IntegrationRingActorTarget} target={target} />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.product-stage") {
    return (
      <>
        <div className="spatial-lab-product-geometry" data-actor-geometry="product-stage">
          <ProductStage renderState="silhouette" variant="route-anchor" />
        </div>
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.action-path") {
    return (
      <>
        <ActionPathGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.judgement-question") {
    return (
      <>
        <JudgementQuestionGreybox beatId={target.beatId} />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.ledger-dial") {
    return (
      <>
        <LedgerDialGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  return <ActorDebugLabel actor={actor} />;
}

function IntegrationRingActor({
  actor,
  target
}: {
  readonly actor: IntegrationRingActorTarget;
  readonly target: StageTarget;
}) {
  return (
    <IntegrationRingGeometry
      className="integration-ring spatial-lab-ring-geometry"
      geometryId="integration-ring"
      role={actor.geometry.role}
      state={actor.geometry}
      tone={target.world.tone === "dark" ? "paper" : "ink"}
    />
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

function JudgementQuestionGreybox({ beatId }: { readonly beatId: BeatId }) {
  const variant = beatId.startsWith("03.")
    ? "trend"
    : beatId === "04.7"
      ? "gap"
      : "judgement";

  if (variant === "trend") {
    return <TrendTrackGreybox />;
  }

  return (
    <div className="spatial-lab-judgement-geometry" data-actor-geometry={`judgement-${variant}`}>
      <div className="spatial-lab-judgement-orbit" />
      <div className="spatial-lab-judgement-core" />
      <div className="spatial-lab-judgement-branch branch-a" />
      <div className="spatial-lab-judgement-branch branch-b" />
    </div>
  );
}

function TrendTrackGreybox() {
  return (
    <div className="spatial-lab-trend-geometry" data-actor-geometry="trend-track">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function LedgerDialGreybox() {
  return (
    <div className="spatial-lab-ledger-geometry" data-actor-geometry="ledger-dial">
      <span className="ledger-axis horizontal" />
      <span className="ledger-axis vertical" />
      <span className="ledger-quadrant q1" />
      <span className="ledger-quadrant q2" />
      <span className="ledger-quadrant q3" />
      <span className="ledger-quadrant q4" />
    </div>
  );
}

function ArtifactSystem({
  initialTarget,
  target
}: {
  readonly initialTarget: StageTarget;
  readonly target: StageTarget;
}) {
  return (
    <div className="spatial-lab-artifact-system" data-owner="ArtifactSystem">
      {labArtifactIds.map((artifactId) => (
        <ArtifactBlock
          artifact={target.artifacts[artifactId]}
          initialArtifact={initialTarget.artifacts[artifactId]}
          key={artifactId}
        />
      ))}
    </div>
  );
}

function ArtifactBlock({
  artifact,
  initialArtifact
}: {
  readonly artifact: LabArtifactTarget;
  readonly initialArtifact: LabArtifactTarget;
}) {
  return (
    <div
      className="spatial-lab-artifact"
      data-artifact-id={artifact.artifactId}
      data-artifact-mode={artifact.mode}
      data-camera-presence={artifact.cameraPresence}
      data-lifecycle-phase={artifact.lifecycle}
      data-owner="ArtifactSystem"
      data-visible={String(artifact.visible)}
      style={initialArtifactStyle(initialArtifact)}
    >
      <span>{artifact.artifactId}</span>
      <strong>{artifact.mode}</strong>
    </div>
  );
}

function WorldTypography({ target }: { readonly target: StageTarget }) {
  return (
    <div className="spatial-lab-world-typography" data-owner="WorldTypography">
      <span>{target.actors["actor.integration-ring"].geometry.role}</span>
      <strong>{target.copy.headline}</strong>
    </div>
  );
}

function ScreenCopyLayer({ target }: { readonly target: StageTarget }) {
  return (
    <aside className="spatial-lab-screen-copy" data-owner="ScreenCopyLayer">
      <p>{target.copy.eyebrow}</p>
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

function initialViewportStyle(target: StageTarget): CSSProperties {
  return {
    "--lab-camera-perspective": `${target.camera.perspective}px`
  } as CSSProperties;
}

function isEditableEventTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return ["BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
}

function initialCameraStyle(target: StageTarget): CSSProperties {
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

function initialActorStyle(actor: LabActorTarget): CSSProperties {
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

function initialArtifactStyle(artifact: LabArtifactTarget): CSSProperties {
  return {
    "--lab-artifact-opacity": artifact.opacity,
    "--lab-artifact-scale": artifact.scale,
    "--lab-artifact-x": `${artifact.x}px`,
    "--lab-artifact-y": `${artifact.y}px`,
    "--lab-artifact-z": `${artifact.z}px`
  } as CSSProperties;
}
