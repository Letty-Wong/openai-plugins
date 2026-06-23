import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export type GateDecision = "FAIL" | "PASS" | "PENDING_HUMAN_REVIEW" | "SMALL_FIX" | "UNKNOWN";

const decisionRecordPath = "docs/gate2-review-decision-record.md";
const materialListPath = "docs/missing-materials.md";
const wp38SpecsPath = "docs/wp38-candidate-graybox-specs.md";

function readText(path: string): string {
  return readFileSync(path, "utf8");
}

export function parseGate2Decision(decisionRecord = readText(decisionRecordPath)): GateDecision {
  const match = decisionRecord.match(/Decision:\s*([A-Z_]+)/);
  const value = match?.[1];

  if (value === "PASS" || value === "SMALL_FIX" || value === "FAIL" || value === "PENDING_HUMAN_REVIEW") {
    return value;
  }

  return "UNKNOWN";
}

function wp38Status(decision: GateDecision): string {
  if (decision === "PASS") {
    return "AVAILABLE_BUT_NOT_SELECTED: choose exactly one of WP-38R-A or WP-38R-B.";
  }

  if (decision === "SMALL_FIX") {
    return "BLOCKED: only Gate 2 small fixes are allowed.";
  }

  if (decision === "FAIL") {
    return "BLOCKED: return to actor identity, camera pose, spatial route, and graybox structure.";
  }

  return "BLOCKED: Gate 2 human review has not passed.";
}

function materialGateStatus(materialList = readText(materialListPath), wp38Specs = readText(wp38SpecsPath)): string {
  const missingProduct = /唯一花洒产品与型号[\s\S]*?待业务方提供/.test(materialList);
  const qrBlocked = /一个主二维码、短链或报名编号/.test(materialList);
  const wp38BlocksAssets = /不接真实产品素材/.test(wp38Specs) && /不接真实二维码/.test(wp38Specs);

  if (missingProduct && qrBlocked && wp38BlocksAssets) {
    return "CLOSED: product assets, QR/CTA, and business facts remain blocked.";
  }

  return "REVIEW_REQUIRED: material gate evidence is incomplete or has changed.";
}

function allowedAction(decision: GateDecision): string {
  if (decision === "PASS") {
    return "Select one candidate spec only: WP-38R-A vertical graybox or WP-38R-B horizontal product graybox. Keep material gates closed.";
  }

  if (decision === "SMALL_FIX") {
    return "Tune only Gate 2 transition direction, occlusion, rhythm, interrupt state, or reduced-motion endpoint.";
  }

  if (decision === "FAIL") {
    return "Do not start WP-38. Rework actor identity, camera pose, spatial route, and graybox structure.";
  }

  return "Capture Gate 2 screenshots and no-cut recordings, then fill docs/gate2-review-decision-record.md.";
}

export type Wp38GuardResult = {
  readonly allowed: boolean;
  readonly decision: GateDecision;
  readonly message: string;
};

export function getWp38GuardResult(decision = parseGate2Decision()): Wp38GuardResult {
  if (decision === "PASS") {
    return {
      allowed: true,
      decision,
      message: "WP-38 may be planned, but exactly one candidate must be selected and material gates stay closed."
    };
  }

  if (decision === "SMALL_FIX") {
    return {
      allowed: false,
      decision,
      message: "WP-38 is blocked. Only Gate 2 small fixes are allowed."
    };
  }

  if (decision === "FAIL") {
    return {
      allowed: false,
      decision,
      message: "WP-38 is blocked. Rework actors, camera pose, spatial route, and graybox structure."
    };
  }

  return {
    allowed: false,
    decision,
    message: "WP-38 is blocked. Gate 2 human review has not passed."
  };
}

export function buildProjectGateStatus(): string {
  const decision = parseGate2Decision();

  return [
    "# Project Gate Status",
    "",
    `- Gate 2 decision: \`${decision}\``,
    `- WP-38 implementation: ${wp38Status(decision)}`,
    `- Material gates: ${materialGateStatus()}`,
    `- Allowed next action: ${allowedAction(decision)}`,
    "",
    "## Guardrails",
    "",
    "- Do not treat WP-38 candidate specs as implementation approval.",
    "- Do not use real product assets, real QR codes, or unapproved business facts.",
    "- Keep placeholders until the matching material gate is explicitly approved.",
    "- Keep presenter mode discrete; do not map scroll position to Beat state.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildProjectGateStatus());
}
