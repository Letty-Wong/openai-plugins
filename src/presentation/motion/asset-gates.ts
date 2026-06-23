import type { AssetGate } from "@/presentation/motion/motion-types";

export const motionAssetGates: readonly AssetGate[] = [
  {
    id: "code-generated-ok",
    status: "PASS",
    blocksRuntime: false,
    requiredBeforeRuntime: [],
    note: "DOM/SVG primitives can be motion-tested before external assets arrive."
  },
  {
    id: "product-silhouette-approved",
    status: "PLACEHOLDER_OK",
    blocksRuntime: false,
    requiredBeforeRuntime: ["Neutral silhouette approved for temporary review"],
    note: "Allowed for coarse continuity testing, not final product animation."
  },
  {
    id: "product-warm-red-registered",
    status: "BLOCKED",
    blocksRuntime: true,
    requiredBeforeRuntime: [
      "PRD-H1-WARM transparent render",
      "PRD-H1-RED transparent render",
      "Pixel-registered product canvas",
      "Approved product usage permission"
    ],
    note: "Required before Scene 15 -> 16 product light swap can animate."
  },
  {
    id: "business-output-approved",
    status: "BLOCKED",
    blocksRuntime: true,
    requiredBeforeRuntime: [
      "Approved sales copy sample",
      "Approved video storyboard sample",
      "Approved FAQ or objection-handling sample",
      "Reviewer sign-off for public-facing claims"
    ],
    note: "Required before output cards can be animated as audience-facing examples."
  },
  {
    id: "cta-configured",
    status: "BLOCKED",
    blocksRuntime: true,
    requiredBeforeRuntime: [
      "Primary QR asset",
      "Short link or registration id",
      "CTA wording",
      "Host, date, privacy, and eligibility copy"
    ],
    note: "Required before QRDock can become a real scanning surface."
  }
];

export function getMotionAssetGate(id: AssetGate["id"]): AssetGate {
  const gate = motionAssetGates.find((candidate) => candidate.id === id);

  if (!gate) {
    throw new Error(`Unknown motion asset gate: ${id}`);
  }

  return gate;
}
