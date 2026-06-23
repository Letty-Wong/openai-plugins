import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  buildGate2EvidenceScaffoldReport,
  scaffoldGate2Evidence
} from "../scripts/gate2-evidence-scaffold";

test("WP-44 exposes a Gate 2 evidence scaffold command", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };

  assert.equal(packageJson.scripts?.["review:gate2:scaffold"], "tsx scripts/gate2-evidence-scaffold.ts");
});

test("WP-44 creates only README evidence workspace files", () => {
  const root = mkdtempSync(join(tmpdir(), "gate2-evidence-"));
  const results = scaffoldGate2Evidence(root);
  const files = results.map((item) => item.file).sort();

  assert.deepEqual(files, [
    "review/gate2/README.md",
    "review/gate2/command-logs/README.md",
    "review/gate2/recordings/README.md",
    "review/gate2/screenshots/1366/README.md",
    "review/gate2/screenshots/1920/README.md"
  ]);
  assert.equal(results.every((item) => item.status === "created"), true);
  assert.match(readFileSync(join(root, "review/gate2/README.md"), "utf8"), /does not approve Gate 2/);
});

test("WP-44 scaffold is repeatable and does not overwrite existing files", () => {
  const root = mkdtempSync(join(tmpdir(), "gate2-evidence-"));

  scaffoldGate2Evidence(root);
  const secondRun = scaffoldGate2Evidence(root);

  assert.equal(secondRun.every((item) => item.status === "exists"), true);
});

test("WP-44 scaffold report keeps Gate 2 and material gates unapproved", () => {
  const report = buildGate2EvidenceScaffoldReport([
    {
      file: "review/gate2/README.md",
      status: "created"
    }
  ]);

  assert.match(report, /does not capture screenshots/);
  assert.match(report, /approve Gate 2/);
  assert.match(report, /start WP-38/);
  assert.match(report, /open material gates/);
});
