import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const requiredFiles = [
  "AGENTS.md",
  "docs/repo-audit.md",
  "docs/design-baseline.md",
  "docs/scene-spec-master.md",
  "docs/asset-manifest.md",
  "docs/content-status.md",
  "docs/implementation-log.md",
  "docs/project-status.md",
  "package.json",
  "package-lock.json",
  "app/page.tsx"
];

test("WP-01 baseline files exist", () => {
  for (const file of requiredFiles) {
    assert.equal(existsSync(file), true, `${file} should exist`);
  }
});

test("project status reports current work package", () => {
  const status = readFileSync("docs/project-status.md", "utf8");
  assert.match(status, /WP-01/);
  assert.match(status, /最终目标/);
});
