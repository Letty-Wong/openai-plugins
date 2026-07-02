"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { beatById, beats } from "@/content/beats";
import { sceneById } from "@/content/scenes";
import {
  createInitialPresentationState,
  jumpToBeat,
  nextBeat,
  previousBeat,
  toggleReducedMotion
} from "@/presentation/core/PresentationController";
import { reduceKeyboardShortcut } from "@/presentation/core/keyboard";
import type { BeatId, SceneId } from "@/presentation/core/state-types";
import {
  productClaims,
  productDemoMaterials,
  productFacts
} from "@/content/product-prototype";
import { IntegrationRingGeometry } from "@/presentation/stage/IntegrationRing";
import { ProductStage } from "@/presentation/stage/ProductStage";
import { ActionPathGreybox } from "@/presentation/spatial-lab/ActionPathGreybox";
import { PoseTransitionRuntime } from "@/presentation/spatial-lab/PoseTransitionRuntime";
import type { SpatialLabMode } from "@/presentation/spatial-lab/PresentationStageV4";
import {
  labActorIds,
  labArtifactIds,
  labSafetyNodes,
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

const sampleBeatIds = [
  "01.1",
  "08.7",
  "09.1",
  "15.8",
  "16.1",
  "17.1",
  "18.7",
  "19.1",
  "20.10",
  "21.1"
] as const satisfies readonly BeatId[];

type PresentationStageClientV4Props = {
  readonly initialBeatId: BeatId;
  readonly initialMode: SpatialLabMode;
};

export function PresentationStageClientV4({
  initialBeatId,
  initialMode
}: PresentationStageClientV4Props) {
  const [state, setState] = useState(() => createInitialPresentationState(initialBeatId));
  const [mode, setMode] = useState<SpatialLabMode>(initialMode);
  const viewportRef = useRef<HTMLElement | null>(null);
  const modeRef = useRef(mode);
  const target = useMemo(
    () => resolveStageTarget(state.currentBeatId, { reducedMotion: state.reducedMotion }),
    [state.currentBeatId, state.reducedMotion]
  );
  const renderPreviousTargetRef = useRef<StageTarget | null>(target);
  const pendingRenderLockTarget = shouldLockVisibleTarget(
    renderPreviousTargetRef.current,
    target,
    state.reducedMotion
  )
    ? renderPreviousTargetRef.current
    : null;
  const [lockedVisibleTarget, setLockedVisibleTarget] = useState<StageTarget | null>(null);
  const visibleTarget = lockedVisibleTarget ?? pendingRenderLockTarget ?? target;
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

  useLayoutEffect(() => {
    if (pendingRenderLockTarget) {
      setLockedVisibleTarget(pendingRenderLockTarget);
    } else {
      setLockedVisibleTarget(null);
    }

    renderPreviousTargetRef.current = target;
  }, [pendingRenderLockTarget, target]);

  const handleTransitionSettled = useCallback((beatId: BeatId) => {
    if (beatId === target.beatId) {
      setLockedVisibleTarget(null);
    }
  }, [target.beatId]);

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
      data-customer-visual="preview"
      data-lab-mode={mode}
      data-spatial-lab-version="V4"
      data-transition-locked={String(Boolean(lockedVisibleTarget ?? pendingRenderLockTarget))}
      data-world-motion-state={visibleTarget.world.motionState}
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
        data-visible-world-tone={visibleTarget.world.tone}
        data-world-lighting-mode={visibleTarget.world.lightingMode}
        data-world-motion-state={visibleTarget.world.motionState}
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
            <WorldAtmosphere target={visibleTarget} />
            <PortalPreviewLayer initialTarget={initialTargetRef.current} target={visibleTarget} />
            <PersistentActors initialTarget={initialTargetRef.current} target={visibleTarget} />
            <ArtifactSystem initialTarget={initialTargetRef.current} target={visibleTarget} />
            <WorldTypography target={visibleTarget} runtimeTarget={target} />
          </WorldSpace>
        </WorldCamera>
        <SceneContextLayer target={visibleTarget} />
      </section>

      <ScreenCopyLayer target={visibleTarget} />
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
      <PoseTransitionRuntime
        onTransitionSettled={handleTransitionSettled}
        reducedMotion={state.reducedMotion}
        target={target}
      />
      <BeatMarker target={target} />
    </main>
  );
}

export { PresentationStageClientV4 as SpatialLabClientStage };

function shouldLockVisibleTarget(
  previousTarget: StageTarget | null,
  target: StageTarget,
  reducedMotion: boolean
) {
  if (reducedMotion || !previousTarget) return false;
  return previousTarget.beatId === "15.8" && target.beatId === "16.1";
}

function BeatMarker({ target }: { readonly target: StageTarget }) {
  const order = beatById.get(target.beatId)?.order ?? 0;

  return (
    <aside className="spatial-lab-beat-marker" data-owner="TemporaryBeatMarker">
      <span>Beat {target.beatId}</span>
      <strong>{order}/{beats.length}</strong>
    </aside>
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
      data-world-motion-state={target.world.motionState}
      data-route-phase={target.routePhase}
    />
  );
}

function PortalPreviewLayer({
  initialTarget,
  target
}: {
  readonly initialTarget: StageTarget;
  readonly target: StageTarget;
}) {
  return (
    <div
      aria-hidden="true"
      className="spatial-lab-portal-preview"
      data-owner="WorldSpace"
      data-portal-visible={String(target.portal.visible)}
      data-world-motion-state={target.world.motionState}
      style={initialPortalStyle(initialTarget)}
    >
      <span className="portal-boundary top" />
      <span className="portal-boundary right" />
      <span className="portal-boundary bottom" />
      <span className="portal-boundary left" />
      <span className="portal-horizon" />
      <div className="portal-safety-nodes">
        {labSafetyNodes.map((node) => (
          <span data-safety-node-id={node.id} key={node.id}>{node.label}</span>
        ))}
      </div>
    </div>
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
          <span aria-hidden="true" className="product-visual-backplate" />
          <span aria-hidden="true" className="product-visual-glow" />
          <ProductStage renderState="silhouette" variant="route-anchor" />
          <span aria-hidden="true" className="product-visual-baseline" />
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

  if (actor.actorId === "actor.safety-boundary") {
    return (
      <>
        <SafetyBoundaryGreybox target={target} />
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

  if (actor.actorId === "actor.source-packet") {
    return (
      <>
        <SourcePacketGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.fact-to-benefit") {
    return (
      <>
        <FactToBenefitGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.output-cards") {
    return (
      <>
        <OutputCardsGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.human-review") {
    return (
      <>
        <HumanReviewGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.action-confirm-gate") {
    return (
      <>
        <ActionConfirmGateGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.scenario-radar") {
    return (
      <>
        <ScenarioRadarGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  if (actor.actorId === "actor.cta-dock") {
    return (
      <>
        <CtaDockGreybox />
        <ActorDebugLabel actor={actor} />
      </>
    );
  }

  return <ActorDebugLabel actor={actor} />;
}

function SafetyBoundaryGreybox({ target }: { readonly target: StageTarget }) {
  return (
    <div className="spatial-lab-safety-boundary-geometry" data-actor-geometry="safety-boundary">
      <div className="safety-depth-ring ring-far" aria-hidden="true" />
      <div className="safety-depth-ring ring-mid" aria-hidden="true" />
      <div className="safety-control-field" aria-hidden="true" />
      <div className="safety-boundary-frame" />
      <div className="safety-boundary-axis horizontal" />
      <div className="safety-boundary-axis vertical" />
      <div className="safety-boundary-nodes">
        {target.safetyNodes.map((node) => (
          <span
            data-safety-node-id={node.id}
            data-visible={String(node.visible)}
            key={node.id}
          >
            {node.label}
          </span>
        ))}
      </div>
    </div>
  );
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

function SceneContextLayer({ target }: { readonly target: StageTarget }) {
  const sceneId = `scene-${String(target.sceneNumber).padStart(2, "0")}` as SceneId;
  const scene = sceneById.get(sceneId);

  return (
    <aside className="spatial-lab-scene-context" data-owner="ScreenCopyLayer">
      <span>{scene?.chapter ?? "演示路径"}</span>
      <strong>{String(target.sceneNumber).padStart(2, "0")}</strong>
      <div className="scene-progress-rail" aria-hidden="true">
        {Array.from({ length: 21 }, (_, index) => (
          <i
            data-active={String(index + 1 === target.sceneNumber)}
            data-complete={String(index + 1 < target.sceneNumber)}
            key={index}
          />
        ))}
      </div>
    </aside>
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
  const variant = getEarlyJudgementVisualState(beatId);

  return (
    <div
      className="spatial-lab-judgement-stack"
      data-actor-geometry="judgement-question"
      data-judgement-variant={variant}
    >
      <div className="spatial-lab-judgement-geometry" aria-hidden={variant === "trend"}>
        <div className="spatial-lab-judgement-orbit" />
        <div className="spatial-lab-judgement-core" />
        <div className="spatial-lab-judgement-branch branch-a" />
        <div className="spatial-lab-judgement-branch branch-b" />
      </div>
      <TrendTrackGreybox />
      <GapConsequenceGreybox />
    </div>
  );
}

function getEarlyJudgementVisualState(beatId: BeatId) {
  if (beatId.startsWith("03.")) return "trend";
  if (beatId.startsWith("04.")) return "gap";
  return "judgement";
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

function GapConsequenceGreybox() {
  return (
    <div className="spatial-lab-gap-geometry" data-actor-geometry="gap-consequence">
      <span className="gap-path path-a" />
      <span className="gap-path path-b" />
      <span className="gap-node node-a" />
      <span className="gap-node node-b" />
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

function SourcePacketGreybox() {
  return (
    <section className="spatial-lab-source-packet-geometry" data-actor-geometry="source-packet">
      <span className="actor-body-kicker">资料包</span>
      <strong>{productDemoMaterials.source.title}</strong>
      <div aria-hidden="true" className="source-packet-lines">
        {productFacts.slice(0, 4).map((fact) => (
          <span key={fact.id}>{fact.label}</span>
        ))}
      </div>
      <small>MOQ / 价格 / 质保 / 交期不自动填写</small>
    </section>
  );
}

function FactToBenefitGreybox() {
  return (
    <section className="spatial-lab-fact-benefit-geometry" data-actor-geometry="fact-to-benefit">
      <span className="actor-body-kicker">转译</span>
      <div className="fact-benefit-flow" aria-hidden="true">
        <span>{productFacts[0]?.label ?? "事实"}</span>
        <i />
        <span>{productClaims[0]?.benefit ?? "利益"}</span>
      </div>
      <small>{productDemoMaterials.benefit.hero}</small>
    </section>
  );
}

function OutputCardsGreybox() {
  const departments = productDemoMaterials["department-output"].departmentSlots ?? ["市场", "销售", "视频", "外贸", "客服"];

  return (
    <section className="spatial-lab-output-cards-geometry" data-actor-geometry="output-cards">
      <span className="actor-body-kicker">{productDemoMaterials["department-output"].kicker}</span>
      <strong>{productDemoMaterials["department-output"].title}</strong>
      <div className="output-card-slots">
        {departments.map((department) => (
          <span key={department}>{department}</span>
        ))}
      </div>
    </section>
  );
}

function HumanReviewGreybox() {
  const checks = productDemoMaterials.review.rows;

  return (
    <section className="spatial-lab-human-review-geometry" data-actor-geometry="human-review">
      <span className="actor-body-kicker">人工审核</span>
      <strong>承诺前先核对</strong>
      <div className="human-review-checks" aria-hidden="true">
        {checks.map((check) => (
          <span key={check}>{check}</span>
        ))}
      </div>
    </section>
  );
}

function ActionConfirmGateGreybox() {
  return (
    <section className="spatial-lab-action-confirm-geometry" data-actor-geometry="action-confirm-gate">
      <span className="actor-body-kicker">负责人确认</span>
      <strong>生成和执行分开</strong>
      <div className="action-confirm-switch" aria-hidden="true">
        <span />
        <i />
      </div>
    </section>
  );
}

function ScenarioRadarGreybox() {
  const labels = ["重复最多", "资料最散", "最缺模板", "30 天验证"];

  return (
    <section className="spatial-lab-scenario-radar-geometry" data-actor-geometry="scenario-radar">
      <span className="radar-ring ring-a" />
      <span className="radar-ring ring-b" />
      <span className="radar-axis horizontal" />
      <span className="radar-axis vertical" />
      <strong>第一个场景</strong>
      <div className="radar-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  );
}

function CtaDockGreybox() {
  const actionRows = productDemoMaterials.route.rows;

  return (
    <section className="spatial-lab-cta-dock-geometry" data-actor-geometry="cta-dock">
      <span className="actor-body-kicker">下一步</span>
      <strong>演示后行动</strong>
      <div className="cta-placeholder-grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="cta-action-lines" aria-hidden="true">
        {actionRows.map((row) => (
          <span key={row}>{row}</span>
        ))}
      </div>
      <small>二维码待配置</small>
    </section>
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
      <ArtifactShell artifact={artifact} />
    </div>
  );
}

function ArtifactShell({ artifact }: { readonly artifact: LabArtifactTarget }) {
  const material = getArtifactAudienceMaterial(artifact.mode);

  return (
    <div className="spatial-lab-artifact-shell">
      <span className="artifact-debug-id">{artifact.artifactId}</span>
      <span className="artifact-kicker">{material.kicker}</span>
      <strong>{material.title}</strong>
      <div className="artifact-fact-rows">
        {material.rows.slice(0, 3).map((row) => (
          <span key={row}>{row}</span>
        ))}
      </div>
      <div className="artifact-hero-block">{material.hero}</div>
      <div className="artifact-storyboard-cells">
        {(material.storyboard ?? []).map((cell) => (
          <span key={cell}>{cell}</span>
        ))}
      </div>
      <div className="artifact-mail-lines" aria-hidden="true">
        {(material.mailLines ?? []).map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="artifact-department-slots">
        {(material.departmentSlots ?? ["市场", "销售", "视频", "外贸", "客服"]).map((slot) => (
          <span key={slot}>{slot}</span>
        ))}
      </div>
    </div>
  );
}

function WorldTypography({
  runtimeTarget,
  target
}: {
  readonly runtimeTarget: StageTarget;
  readonly target: StageTarget;
}) {
  return (
    <div
      className="spatial-lab-world-typography"
      data-owner="WorldTypography"
      data-runtime-beat-id={runtimeTarget.beatId}
      data-typography-cue={getTypographyCue(runtimeTarget.beatId)}
      data-world-motion-state={target.world.motionState}
    >
      <span className="world-kicker">{getAudienceKicker(target)}</span>
      <span className="world-debug-role">{target.actors["actor.integration-ring"].geometry.role}</span>
      <strong>{target.copy.headline}</strong>
    </div>
  );
}

function getTypographyCue(beatId: BeatId) {
  if (beatId === "15.1") return "scene15-enter";
  if (beatId === "15.8") return "freeze-enter";
  return "steady";
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

function initialPortalStyle(target: StageTarget): CSSProperties {
  return {
    "--lab-old-world-opacity": target.portal.oldWorldOpacity,
    "--lab-portal-edge-progress": target.portal.edgeProgress,
    "--lab-portal-opacity": target.portal.opacity,
    "--lab-portal-radius": `${target.portal.radius}px`,
    "--lab-portal-safety-opacity": target.portal.safetyOpacity,
    "--lab-portal-scale": target.portal.scale,
    "--lab-portal-x": `${target.portal.x}px`,
    "--lab-portal-y": `${target.portal.y}px`,
    "--lab-portal-z": `${target.portal.z}px`
  } as CSSProperties;
}

function getAudienceKicker(target: StageTarget) {
  if (target.beatId === "15.8") return "输出冻结";
  if (target.beatId === "16.1") return "安全边界";
  if (target.routePhase === "product") return "产品旅程";
  if (target.routePhase === "ledger") return "能力接入";
  if (target.routePhase === "safety") return "安全空间";
  if (target.routePhase === "action") return "行动路径";
  if (target.routePhase === "finale") return "闭环";
  return "判断入口";
}

function getArtifactAudienceMaterial(mode: LabArtifactTarget["mode"]) {
  if (mode === "output") return productDemoMaterials["department-output"];
  return productDemoMaterials[mode] ?? productDemoMaterials.placeholder;
}
