import type { BeatId, TransitionPreset } from "@/presentation/core/state-types";
import type { StaticFrameKind } from "@/presentation/stage/static-frames";

export type MotionReadiness = "CONTRACT_ONLY" | "READY_FOR_RUNTIME" | "BLOCKED_BY_ASSET";

export type MotionGateId =
  | "code-generated-ok"
  | "product-silhouette-approved"
  | "product-warm-red-registered"
  | "business-output-approved"
  | "cta-configured";

export type MotionChannel = {
  readonly target: string;
  readonly intent: string;
  readonly transformOnly: boolean;
};

export type ReducedMotionContract = {
  readonly mode: "static-swap" | "short-fade" | "hold";
  readonly maxDurationMs: 0 | 150 | 200 | 250;
  readonly preservesLogic: true;
};

export type MotionContract = {
  readonly beatId: BeatId;
  readonly frameKind: StaticFrameKind;
  readonly transitionPreset: TransitionPreset;
  readonly readiness: MotionReadiness;
  readonly gateId: MotionGateId;
  readonly durationMs: number;
  readonly primary: MotionChannel;
  readonly secondary?: MotionChannel;
  readonly ambient?: MotionChannel;
  readonly reducedMotion: ReducedMotionContract;
};

export type AssetGate = {
  readonly id: MotionGateId;
  readonly status: "PASS" | "PLACEHOLDER_OK" | "BLOCKED";
  readonly blocksRuntime: boolean;
  readonly requiredBeforeRuntime: readonly string[];
  readonly note: string;
};

export const motionRuntimePolicy = {
  status: "WP09_CONTINUITY_ENABLED",
  runtimeInstalled: true,
  approvedRuntime: "GSAP",
  canRunTimeline: true,
  scrollDriven: false
} as const;
