import type { CSSProperties } from "react";
import type { StaticFrameKind } from "@/presentation/stage/static-frames";

const segmentPaths = [
  "M 100 25 A 75 75 0 0 1 175 100",
  "M 174 112 A 75 75 0 0 1 123 173",
  "M 108 176 A 75 75 0 0 1 31 127",
  "M 25 112 A 75 75 0 0 1 62 37",
  "M 74 30 A 75 75 0 0 1 90 26"
];

export const integrationRingSegmentIds = [
  "integration-ring-segment-1",
  "integration-ring-segment-2",
  "integration-ring-segment-3",
  "integration-ring-segment-4",
  "integration-ring-segment-5"
] as const;

export type IntegrationRingTone = "paper" | "ink";

export type IntegrationRingGeometryState = {
  readonly gap?: number;
  readonly glow?: number;
  readonly portalRadius?: number;
  readonly segmentProgress?: readonly number[];
  readonly thickness?: number;
};

type IntegrationRingProps = {
  readonly frameKind: StaticFrameKind;
};

type IntegrationRingGeometryProps = {
  readonly className?: string;
  readonly geometryId?: string;
  readonly role: string;
  readonly state?: IntegrationRingGeometryState;
  readonly tone: IntegrationRingTone;
};

export function IntegrationRing({ frameKind }: IntegrationRingProps) {
  const tone = frameKind === "product" || frameKind === "finale" ? "ink" : "paper";
  const role =
    frameKind === "safety" || frameKind === "approval-gate" || frameKind === "boundary-loop" || frameKind === "output-freeze"
      ? "safety-boundary"
      : frameKind === "finale"
        ? "capability-loop"
        : frameKind === "scenario-radar"
          ? "scenario-radar"
          : frameKind === "action-path" || frameKind === "cta-dock"
            ? "action-path"
        : frameKind === "ledger" || frameKind === "path-dial"
          ? "ledger"
          : frameKind === "timeline-ai"
            ? "timeline"
            : "portal";

  return <IntegrationRingGeometry role={role} tone={tone} />;
}

export function IntegrationRingGeometry({
  className = "integration-ring",
  geometryId,
  role,
  state,
  tone
}: IntegrationRingGeometryProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      data-actor-geometry={geometryId}
      data-ring-gap={state?.gap}
      data-ring-glow={state?.glow}
      data-ring-portal-radius={state?.portalRadius}
      data-ring-role={role}
      data-ring-segment-progress={state?.segmentProgress?.join(",")}
      data-ring-thickness={state?.thickness}
      style={ringStateStyle(state)}
      viewBox="0 0 200 200"
    >
      <circle className="ring-core" cx="100" cy="100" r="58" />
      {segmentPaths.map((path, index) => (
        <path
          className={`ring-segment ${index === 0 ? "signal" : tone}`}
          d={path}
          data-segment-id={integrationRingSegmentIds[index]}
          key={path}
          pathLength={1}
        />
      ))}
    </svg>
  );
}

function ringStateStyle(state: IntegrationRingGeometryState | undefined): CSSProperties | undefined {
  if (!state) return undefined;

  return {
    "--ring-gap": state.gap,
    "--ring-glow": state.glow,
    "--ring-portal-radius": state.portalRadius,
    "--ring-segment-progress-1": state.segmentProgress?.[0],
    "--ring-segment-progress-2": state.segmentProgress?.[1],
    "--ring-segment-progress-3": state.segmentProgress?.[2],
    "--ring-segment-progress-4": state.segmentProgress?.[3],
    "--ring-segment-progress-5": state.segmentProgress?.[4],
    "--ring-thickness": state.thickness
  } as CSSProperties;
}
