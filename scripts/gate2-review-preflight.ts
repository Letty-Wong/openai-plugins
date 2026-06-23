import { pathToFileURL } from "node:url";

import { getMaterialPlaceholderAuditChecks } from "./material-placeholder-audit";
import { getWp38GuardResult, parseGate2Decision } from "./project-gate-status";

type PreflightCheck = {
  readonly detail: string;
  readonly ok: boolean;
  readonly title: string;
};

export function getGate2ReviewPreflightChecks(): readonly PreflightCheck[] {
  const decision = parseGate2Decision();
  const wp38Guard = getWp38GuardResult(decision);
  const materialChecks = getMaterialPlaceholderAuditChecks();

  return [
    {
      detail: `Gate 2 decision is ${decision}.`,
      ok: decision === "PENDING_HUMAN_REVIEW",
      title: "Gate 2 is awaiting human review"
    },
    {
      detail: wp38Guard.message,
      ok: wp38Guard.allowed === false,
      title: "WP-38 remains blocked before review"
    },
    {
      detail: `${materialChecks.length} material placeholder checks passed.`,
      ok: materialChecks.every((check) => check.ok),
      title: "Materials remain placeholders"
    },
    {
      detail: "Use docs/gate2-human-review-package.md for no-cut recording scripts.",
      ok: true,
      title: "Human review package is the next action"
    },
    {
      detail: "Record the final decision in docs/gate2-review-decision-record.md.",
      ok: true,
      title: "Decision record is ready"
    }
  ];
}

export function buildGate2ReviewPreflight(): string {
  const checks = getGate2ReviewPreflightChecks();
  const status = checks.every((check) => check.ok) ? "READY_FOR_HUMAN_REVIEW" : "NOT_READY";
  const rows = checks
    .map((check) => `| ${check.ok ? "PASS" : "FAIL"} | ${check.title} | ${check.detail} |`)
    .join("\n");

  return [
    "# Gate 2 Review Preflight",
    "",
    `Overall status: \`${status}\``,
    "",
    "| Status | Check | Detail |",
    "| --- | --- | --- |",
    rows,
    "",
    "## What This Means",
    "",
    "- READY_FOR_HUMAN_REVIEW means the project is prepared for Gate 2 screenshots and no-cut recordings.",
    "- It does not mean Gate 2 has passed.",
    "- It does not authorize WP-38 implementation.",
    "- It does not open real product, CTA, QR, or business material gates.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  const checks = getGate2ReviewPreflightChecks();
  console.log(buildGate2ReviewPreflight());
  process.exitCode = checks.every((check) => check.ok) ? 0 : 1;
}
