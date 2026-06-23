import { pathToFileURL } from "node:url";

import { buildGateBStatusReport } from "./gate-b-status";

type GateBReviewItem = {
  readonly backwardUrl: string;
  readonly forwardUrl: string;
  readonly gate: "SR-04" | "SR-05" | "SR-06";
  readonly questions: readonly string[];
  readonly recordingBackward: string;
  readonly recordingForward: string;
  readonly transition: string;
};

const gateBReviewItems: readonly GateBReviewItem[] = [
  {
    backwardUrl: "http://127.0.0.1:3000/spatial-lab?beat=08.7",
    forwardUrl: "http://127.0.0.1:3000/spatial-lab?beat=09.1",
    gate: "SR-04",
    questions: [
      "ProductStage keeps one actor identity and does not reveal twice.",
      "IntegrationRing reads as the turning anchor.",
      "The move feels like a turn into the product journey, not a product page cut."
    ],
    recordingBackward: "review/spatial-lab/recordings/gate-b/sr04-09-1-to-08-7-backward.mp4",
    recordingForward: "review/spatial-lab/recordings/gate-b/sr04-08-7-to-09-1-forward.mp4",
    transition: "08.7 -> 09.1 horizontal product turn"
  },
  {
    backwardUrl: "http://127.0.0.1:3000/spatial-lab?beat=15.8",
    forwardUrl: "http://127.0.0.1:3000/spatial-lab?beat=16.1",
    gate: "SR-05",
    questions: [
      "The portal has near, mid, and far layers.",
      "The old product world remains behind the ring while safety appears ahead.",
      "The camera move is not a simple scale-up trick."
    ],
    recordingBackward: "review/spatial-lab/recordings/gate-b/sr05-16-1-to-15-8-backward.mp4",
    recordingForward: "review/spatial-lab/recordings/gate-b/sr05-15-8-to-16-1-forward.mp4",
    transition: "15.8 -> 16.1 forward safety portal"
  },
  {
    backwardUrl: "http://127.0.0.1:3000/spatial-lab?beat=20.10",
    forwardUrl: "http://127.0.0.1:3000/spatial-lab?beat=21.1",
    gate: "SR-06",
    questions: [
      "ActionPath keeps one actor identity into the final loop.",
      "The dolly back reveals the larger loop instead of cutting to a finale page.",
      "CTA remains a placeholder and no real QR is introduced."
    ],
    recordingBackward: "review/spatial-lab/recordings/gate-b/sr06-21-1-to-20-10-backward.mp4",
    recordingForward: "review/spatial-lab/recordings/gate-b/sr06-20-10-to-21-1-forward.mp4",
    transition: "20.10 -> 21.1 backward final loop reveal"
  }
];

export function buildGateBReviewKit(): string {
  const sections = gateBReviewItems.flatMap((item) => [
    `## ${item.gate}｜${item.transition}`,
    "",
    `- Forward URL: ${item.forwardUrl}`,
    `- Backward URL: ${item.backwardUrl}`,
    `- Forward recording: \`${item.recordingForward}\``,
    `- Backward recording: \`${item.recordingBackward}\``,
    "",
    "Check:",
    "",
    ...item.questions.map((question) => `- ${question}`),
    ""
  ]);

  return [
    "# Gate B Review Kit",
    "",
    "Use this kit to run the human Gate B review. It does not approve Gate B by itself.",
    "",
    "Start local preview if needed:",
    "",
    "```bash",
    "npm run dev -- --hostname 127.0.0.1 --port 3000",
    "```",
    "",
    "Record each transition with no cuts at 1366x768 and/or 1920x1080. After review, fill:",
    "",
    "- `docs/gate-b-review-decision-record.md`",
    "- `review/spatial-lab/gate-b-human-evidence-checklist.md`",
    "",
    ...sections,
    "## Current Machine Status",
    "",
    buildGateBStatusReport()
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  console.log(buildGateBReviewKit());
}

