import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { buildMaterialPlaceholderAudit, getMaterialPlaceholderAuditChecks } from "../scripts/material-placeholder-audit";

test("WP-41 exposes a material placeholder audit command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["audit:materials"], "tsx scripts/material-placeholder-audit.ts");
});

test("WP-41 confirms current product and CTA data remain placeholders", () => {
  const audit = buildMaterialPlaceholderAudit();

  assert.match(audit, /Overall status: `PASS`/);
  assert.match(audit, /Product shell stays placeholder/);
  assert.match(audit, /Current product id is shower-h1-placeholder/);
  assert.match(audit, /Product facts stay placeholder/);
  assert.match(audit, /Product claims stay placeholder/);
  assert.match(audit, /CTA stays placeholder/);
});

test("WP-41 confirms material-dependent animation gates remain blocked", () => {
  const audit = buildMaterialPlaceholderAudit();

  assert.match(audit, /Product render animation gate stays blocked/);
  assert.match(audit, /business-output-approved is BLOCKED/);
  assert.match(audit, /CTA\/QR animation gate stays blocked/);
  assert.match(audit, /No real local product or QR media is present/);
});

test("WP-41 exposes check objects for future material gate automation", () => {
  const checks = getMaterialPlaceholderAuditChecks();

  assert.equal(checks.every((check) => check.ok), true);
  assert.equal(checks.some((check) => check.title === "Product shell stays placeholder"), true);
  assert.equal(checks.some((check) => check.title === "CTA/QR animation gate stays blocked"), true);
});
