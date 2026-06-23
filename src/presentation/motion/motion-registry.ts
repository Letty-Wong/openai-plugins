import type { MotionContract } from "@/presentation/motion/motion-types";

export const motionContracts: readonly MotionContract[] = [
  {
    beatId: "01.1",
    frameKind: "entry",
    transitionPreset: "ring-portal",
    readiness: "READY_FOR_RUNTIME",
    gateId: "code-generated-ok",
    durationMs: 900,
    primary: {
      target: "IntegrationRing",
      intent: "Form the entry portal from a single signal point.",
      transformOnly: true
    },
    secondary: {
      target: "entry-node",
      intent: "Confirm the first red state point.",
      transformOnly: true
    },
    ambient: {
      target: "texture-atmosphere",
      intent: "Low-intensity background drift only after the main movement settles.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "short-fade",
      maxDurationMs: 200,
      preservesLogic: true
    }
  },
  {
    beatId: "03.5",
    frameKind: "timeline-ai",
    transitionPreset: "directional-cut",
    readiness: "READY_FOR_RUNTIME",
    gateId: "code-generated-ok",
    durationMs: 1200,
    primary: {
      target: "timeline-track",
      intent: "Reveal the AI node as the latest efficiency wave.",
      transformOnly: true
    },
    secondary: {
      target: "IntegrationRing",
      intent: "Tilt the ring into a time-track role without changing identity.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "static-swap",
      maxDurationMs: 150,
      preservesLogic: true
    }
  },
  {
    beatId: "05.1",
    frameKind: "ledger",
    transitionPreset: "shared-container",
    readiness: "READY_FOR_RUNTIME",
    gateId: "code-generated-ok",
    durationMs: 1000,
    primary: {
      target: "ledger-dial",
      intent: "Let the business dial take over from the path handoff.",
      transformOnly: true
    },
    secondary: {
      target: "dial-quadrant",
      intent: "Settle four value directions into stable quadrants.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "short-fade",
      maxDurationMs: 200,
      preservesLogic: true
    }
  },
  {
    beatId: "08.7",
    frameKind: "product-slot",
    transitionPreset: "persistent-object",
    readiness: "CONTRACT_ONLY",
    gateId: "product-silhouette-approved",
    durationMs: 850,
    primary: {
      target: "ProductStage",
      intent: "Introduce one registered product slot before real assets arrive.",
      transformOnly: true
    },
    secondary: {
      target: "prep-cards",
      intent: "Dock product, source, scene, and review boundary cards around it.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "static-swap",
      maxDurationMs: 150,
      preservesLogic: true
    }
  },
  {
    beatId: "09.2",
    frameKind: "product",
    transitionPreset: "text-product-occlusion",
    readiness: "BLOCKED_BY_ASSET",
    gateId: "product-warm-red-registered",
    durationMs: 1100,
    primary: {
      target: "ProductStage",
      intent: "Replace silhouette with the warm registered product without position jump.",
      transformOnly: true
    },
    secondary: {
      target: "product-back-word",
      intent: "Hold the product in front of large typography.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "static-swap",
      maxDurationMs: 150,
      preservesLogic: true
    }
  },
  {
    beatId: "15.8",
    frameKind: "output-freeze",
    transitionPreset: "static-reconcile",
    readiness: "CONTRACT_ONLY",
    gateId: "business-output-approved",
    durationMs: 160,
    primary: {
      target: "output-card-stack",
      intent: "Freeze generated output before the safety turn.",
      transformOnly: true
    },
    secondary: {
      target: "boundary-veil",
      intent: "Catch all output cards inside a semitransparent boundary.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "hold",
      maxDurationMs: 0,
      preservesLogic: true
    }
  },
  {
    beatId: "16.3",
    frameKind: "safety",
    transitionPreset: "ring-portal",
    readiness: "BLOCKED_BY_ASSET",
    gateId: "product-warm-red-registered",
    durationMs: 850,
    primary: {
      target: "IntegrationRing",
      intent: "Tighten the shared ring into the safety boundary.",
      transformOnly: true
    },
    secondary: {
      target: "ProductStage",
      intent: "Switch to the red-light registered product without coordinate shift.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "static-swap",
      maxDurationMs: 150,
      preservesLogic: true
    }
  },
  {
    beatId: "18.7",
    frameKind: "approval-gate",
    transitionPreset: "directional-cut",
    readiness: "READY_FOR_RUNTIME",
    gateId: "code-generated-ok",
    durationMs: 700,
    primary: {
      target: "ActionConfirmGate",
      intent: "Show that execution remains disconnected until a responsible person confirms.",
      transformOnly: true
    },
    secondary: {
      target: "HumanReviewNode",
      intent: "Keep content approval visibly separate from execution authorization.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "static-swap",
      maxDurationMs: 150,
      preservesLogic: true
    }
  },
  {
    beatId: "19.7",
    frameKind: "scenario-radar",
    transitionPreset: "ring-portal",
    readiness: "CONTRACT_ONLY",
    gateId: "cta-configured",
    durationMs: 1200,
    primary: {
      target: "ScenarioRadar",
      intent: "Hold a stable self-check state with readable diagnosis directions.",
      transformOnly: true
    },
    secondary: {
      target: "QRDock",
      intent: "Reveal only a placeholder self-check dock until CTA assets are approved.",
      transformOnly: true
    },
    ambient: {
      target: "radar-grid",
      intent: "Optional low-contrast scan after QRDock is stable.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "hold",
      maxDurationMs: 0,
      preservesLogic: true
    }
  },
  {
    beatId: "20.10",
    frameKind: "action-path",
    transitionPreset: "directional-cut",
    readiness: "READY_FOR_RUNTIME",
    gateId: "code-generated-ok",
    durationMs: 1300,
    primary: {
      target: "ActionPath",
      intent: "Show today, 30 minutes, 3 days, and 3 months on one stable path.",
      transformOnly: true
    },
    secondary: {
      target: "selected-scenario",
      intent: "Carry the same selected scenario card through the path.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "static-swap",
      maxDurationMs: 200,
      preservesLogic: true
    }
  },
  {
    beatId: "21.8",
    frameKind: "finale",
    transitionPreset: "text-product-occlusion",
    readiness: "BLOCKED_BY_ASSET",
    gateId: "cta-configured",
    durationMs: 1500,
    primary: {
      target: "CapabilityLoop",
      intent: "Close the loop around the first real sample and hold for photos.",
      transformOnly: true
    },
    secondary: {
      target: "QRDock",
      intent: "Keep the primary CTA still and readable.",
      transformOnly: true
    },
    ambient: {
      target: "capability-nodes",
      intent: "Optional single low-speed structure-light pass only after scan surfaces are stable.",
      transformOnly: true
    },
    reducedMotion: {
      mode: "hold",
      maxDurationMs: 0,
      preservesLogic: true
    }
  }
];

export function getMotionContract(beatId: MotionContract["beatId"]) {
  return motionContracts.find((contract) => contract.beatId === beatId) ?? null;
}
