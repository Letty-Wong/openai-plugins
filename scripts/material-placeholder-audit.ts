import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { pathToFileURL } from "node:url";

import { ctaConfig } from "../src/content/cta";
import { productClaims, productFacts, productPrototype } from "../src/content/product-prototype";
import { motionAssetGates } from "../src/presentation/motion/asset-gates";

type AuditCheck = {
  readonly detail: string;
  readonly ok: boolean;
  readonly title: string;
};

const mediaExtensions = new Set([".avif", ".jpg", ".jpeg", ".mp4", ".png", ".svg", ".webm", ".webp"]);
const localAssetRoots = ["public/assets/product/shower", "public/assets/cta", "public/assets/qr"];

function listMediaFiles(root: string): readonly string[] {
  if (!existsSync(root)) return [];

  const results: string[] = [];
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;

    for (const entry of readdirSync(current)) {
      const path = join(current, entry);
      const stat = statSync(path);

      if (stat.isDirectory()) {
        stack.push(path);
      } else if (mediaExtensions.has(extname(path).toLowerCase())) {
        results.push(path);
      }
    }
  }

  return results.sort();
}

function motionGateStatus(id: string): string | undefined {
  return motionAssetGates.find((gate) => gate.id === id)?.status;
}

export function getMaterialPlaceholderAuditChecks(): readonly AuditCheck[] {
  const localMediaFiles = localAssetRoots.flatMap((root) => listMediaFiles(root));

  return [
    {
      detail: `Current product id is ${productPrototype.id}.`,
      ok: productPrototype.id === "shower-h1-placeholder" && productPrototype.modelStatus === "PLACEHOLDER",
      title: "Product shell stays placeholder"
    },
    {
      detail: `${productFacts.length} product facts checked.`,
      ok: productFacts.every((fact) => fact.status === "PLACEHOLDER"),
      title: "Product facts stay placeholder"
    },
    {
      detail: `${productClaims.length} product claims checked.`,
      ok: productClaims.every((claim) => claim.status === "PLACEHOLDER"),
      title: "Product claims stay placeholder"
    },
    {
      detail: `CTA status is ${ctaConfig.status}.`,
      ok: ctaConfig.status === "PLACEHOLDER",
      title: "CTA stays placeholder"
    },
    {
      detail: `product-warm-red-registered is ${motionGateStatus("product-warm-red-registered")}.`,
      ok: motionGateStatus("product-warm-red-registered") === "BLOCKED",
      title: "Product render animation gate stays blocked"
    },
    {
      detail: `business-output-approved is ${motionGateStatus("business-output-approved")}.`,
      ok: motionGateStatus("business-output-approved") === "BLOCKED",
      title: "Business output animation gate stays blocked"
    },
    {
      detail: `cta-configured is ${motionGateStatus("cta-configured")}.`,
      ok: motionGateStatus("cta-configured") === "BLOCKED",
      title: "CTA/QR animation gate stays blocked"
    },
    {
      detail: localMediaFiles.length === 0 ? "No local product/CTA/QR media files found." : localMediaFiles.join(", "),
      ok: localMediaFiles.length === 0,
      title: "No real local product or QR media is present"
    }
  ];
}

export function buildMaterialPlaceholderAudit(): string {
  const checks = getMaterialPlaceholderAuditChecks();
  const status = checks.every((check) => check.ok) ? "PASS" : "FAIL";
  const rows = checks
    .map((check) => `| ${check.ok ? "PASS" : "FAIL"} | ${check.title} | ${check.detail} |`)
    .join("\n");

  return [
    "# Material Placeholder Audit",
    "",
    `Overall status: \`${status}\``,
    "",
    "| Status | Check | Detail |",
    "| --- | --- | --- |",
    rows,
    "",
    "## Interpretation",
    "",
    "- PASS means the current project still uses placeholders for missing product, CTA, QR, and business assets.",
    "- PASS does not mean the final material gate is approved.",
    "- Any FAIL should block real visual polish and WP-38 implementation until reviewed.",
    ""
  ].join("\n");
}

const isDirectRun = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false;

if (isDirectRun) {
  const checks = getMaterialPlaceholderAuditChecks();
  console.log(buildMaterialPlaceholderAudit());
  process.exitCode = checks.every((check) => check.ok) ? 0 : 1;
}
