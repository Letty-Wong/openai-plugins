import { pathToFileURL } from "node:url";

import { buildGate2ReviewManifest } from "./gate2-review-manifest";
import { buildGate2ReviewPreflight } from "./gate2-review-preflight";

export type EvidenceFile = {
  readonly category: string;
  readonly file: string;
  readonly purpose: string;
};

export const evidenceFiles: readonly EvidenceFile[] = [
  {
    category: "command-log",
    file: "review/gate2/command-logs/preflight-gate2.txt",
    purpose: "Save output from npm run preflight:gate2."
  },
  {
    category: "command-log",
    file: "review/gate2/command-logs/review-gate2.txt",
    purpose: "Save output from npm run review:gate2."
  },
  {
    category: "command-log",
    file: "review/gate2/command-logs/audit-materials.txt",
    purpose: "Save output from npm run audit:materials."
  },
  {
    category: "command-log",
    file: "review/gate2/command-logs/status-gates.txt",
    purpose: "Save output from npm run status:gates."
  },
  {
    category: "recording",
    file: "review/gate2/recordings/gate2-a-08-09-horizontal-turn.mp4",
    purpose: "No-cut recording A: 08.7 -> 09.1 -> 08.7 -> 09.1."
  },
  {
    category: "recording",
    file: "review/gate2/recordings/gate2-b-15-16-forward-portal.mp4",
    purpose: "No-cut recording B: 15.8 -> 16.1 -> 15.8 -> 16.1."
  },
  {
    category: "recording",
    file: "review/gate2/recordings/gate2-c-20-21-dolly-back.mp4",
    purpose: "No-cut recording C: 20.10 -> 21.1 plus quick right/left/right."
  },
  {
    category: "recording",
    file: "review/gate2/recordings/gate2-d-reduced-motion.mp4",
    purpose: "No-cut recording D: reduced motion into 16.1."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1366/08.7-product-entry.png",
    purpose: "1366 screenshot: product already on stage before horizontal product turn."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1366/09.1-horizontal-turn.png",
    purpose: "1366 screenshot: turn-horizontal-product graybox."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1366/15.8-output-freeze.png",
    purpose: "1366 screenshot: output freeze before portal."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1366/16.1-forward-portal.png",
    purpose: "1366 screenshot: portal-forward-safety graybox."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1366/20.10-action-closeup.png",
    purpose: "1366 screenshot: action path close-up."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1366/21.1-dolly-back.png",
    purpose: "1366 screenshot: dolly-back-finale graybox."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1920/09.1-horizontal-turn.png",
    purpose: "1920 screenshot: large-screen horizontal turn."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1920/16.1-forward-portal.png",
    purpose: "1920 screenshot: large-screen forward portal."
  },
  {
    category: "screenshot",
    file: "review/gate2/screenshots/1920/21.1-dolly-back.png",
    purpose: "1920 screenshot: large-screen dolly back."
  },
  {
    category: "decision",
    file: "docs/gate2-review-decision-record.md",
    purpose: "Fill PASS, SMALL_FIX, or FAIL only after human review."
  }
];

function evidenceRows(): string {
  return evidenceFiles.map((item) => `| ${item.category} | \`${item.file}\` | ${item.purpose} |`).join("\n");
}

export function buildGate2ReviewKit(): string {
  return [
    "# Gate 2 Review Kit",
    "",
    "This kit is a human-review entry point. It does not approve Gate 2, does not start WP-38, and does not open material gates.",
    "",
    "## Run These Commands",
    "",
    "```sh",
    "npm run review:gate2:scaffold",
    "npm run review:gate2:logs",
    "npm run review:gate2:evidence",
    "npm run preflight:gate2",
    "npm run review:gate2",
    "npm run audit:materials",
    "npm run status:gates",
    "```",
    "",
    "## Evidence File Index",
    "",
    "| Category | File | Purpose |",
    "| --- | --- | --- |",
    evidenceRows(),
    "",
    "## Current Preflight",
    "",
    buildGate2ReviewPreflight(),
    "",
    "## Review Manifest",
    "",
    buildGate2ReviewManifest()
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGate2ReviewKit());
}
