import { pathToFileURL } from "node:url";

import { getGateBStatus } from "./gate-b-status";

export function buildSr07GuardMessage(): string {
  const status = getGateBStatus();

  return [
    "# SR-07 Start Guard",
    "",
    `- Allowed: \`${String(status.sr07Allowed)}\``,
    `- Gate B decision: \`${status.decision}\``,
    `- Review doc ready: \`${String(status.reviewDocReady)}\``,
    `- Missing command logs: \`${status.missingCommandLogs.length}\``,
    `- Missing screenshots: \`${status.missingScreenshots.length}\``,
    `- Missing recordings: \`${status.missingRecordings.length}\``,
    "",
    "## Required Before SR-07",
    "",
    "- Fill `docs/gate-b-review-decision-record.md` with human review evidence.",
    "- Set `Decision: PASS` only after screenshots, no-cut recordings, forward/backward checks, fast-input checks, and reduced-motion checks pass.",
    "- Keep all work in `/spatial-lab` until the later SR-11 replacement phase.",
    "- Keep product assets, QR/CTA, and business facts behind material gates.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  const status = getGateBStatus();
  console.log(buildSr07GuardMessage());
  process.exitCode = status.sr07Allowed ? 0 : 1;
}
