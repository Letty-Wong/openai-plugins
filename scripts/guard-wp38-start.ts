import { pathToFileURL } from "node:url";

import { getWp38GuardResult } from "./project-gate-status";

export function buildWp38GuardMessage(): string {
  const result = getWp38GuardResult();

  return [
    "# WP-38 Start Guard",
    "",
    `- Allowed: \`${String(result.allowed)}\``,
    `- Gate 2 decision: \`${result.decision}\``,
    `- Result: ${result.message}`,
    "",
    "## Required Before WP-38",
    "",
    "- Fill `docs/gate2-review-decision-record.md` with human review evidence.",
    "- Set `Decision: PASS` only after screenshots, no-cut recordings, and human judgment pass.",
    "- Keep product assets, QR/CTA, and business facts behind material gates.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  const result = getWp38GuardResult();
  console.log(buildWp38GuardMessage());
  process.exitCode = result.allowed ? 0 : 1;
}
