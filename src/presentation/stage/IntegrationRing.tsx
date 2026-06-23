import type { StaticFrameKind } from "@/presentation/stage/static-frames";

const segmentPaths = [
  "M 100 25 A 75 75 0 0 1 175 100",
  "M 174 112 A 75 75 0 0 1 123 173",
  "M 108 176 A 75 75 0 0 1 31 127",
  "M 25 112 A 75 75 0 0 1 62 37",
  "M 74 30 A 75 75 0 0 1 90 26"
];

type IntegrationRingProps = {
  readonly frameKind: StaticFrameKind;
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

  return (
    <svg
      aria-hidden="true"
      className="integration-ring"
      data-ring-role={role}
      viewBox="0 0 200 200"
    >
      <circle className="ring-core" cx="100" cy="100" r="58" />
      {segmentPaths.map((path, index) => (
        <path
          className={`ring-segment ${index === 0 ? "signal" : tone}`}
          d={path}
          data-segment-id={`integration-ring-segment-${index + 1}`}
          key={path}
        />
      ))}
    </svg>
  );
}
