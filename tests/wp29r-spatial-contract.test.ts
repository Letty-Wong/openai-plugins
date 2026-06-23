import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-29R documents the spatial motion bible before new spatial runtime work", () => {
  const bible = readFileSync("docs/spatial-motion-bible.md", "utf8");
  const agents = readFileSync("AGENTS.md", "utf8");

  assert.match(agents, /docs\/spatial-motion-bible\.md/);
  assert.match(agents, /docs\/actor-identity-v3\.md/);
  assert.match(bible, /一个世界坐标系/);
  assert.match(bible, /一个主镜头/);
  assert.match(bible, /滚轮和触控板只能触发离散上一 Beat \/ 下一 Beat/);
  assert.match(bible, /Scene 08-09[\s\S]*第一次重大空间转场/);
  assert.match(bible, /Scene 15-16[\s\S]*第二次重大空间转场/);
  assert.match(bible, /Scene 20-21[\s\S]*第三次重大空间转场/);
  assert.match(bible, /`stable`/);
  assert.match(bible, /`actor`/);
  assert.match(bible, /`spatial`/);
  assert.match(bible, /CameraPose/);
  assert.match(bible, /SpatialPose/);
  assert.match(bible, /属性所有权/);
  assert.match(bible, /Reduced motion/);
});

test("WP-29R documents actor identity before subtracting legacy page-chain layers", () => {
  const actors = readFileSync("docs/actor-identity-v3.md", "utf8");

  for (const actorId of [
    "actor.integration-ring",
    "actor.product-stage",
    "actor.source-packet",
    "actor.fact-to-benefit",
    "actor.output-cards",
    "actor.safety-boundary",
    "actor.human-review",
    "actor.action-confirm-gate",
    "actor.scenario-radar",
    "actor.action-path",
    "actor.cta-dock",
    "actor.presenter-controls"
  ]) {
    assert.match(actors, new RegExp(actorId.replace(".", "\\.")));
  }

  assert.match(actors, /IntegrationRing 角色表/);
  assert.match(actors, /`ProductStage` 从 `08\.7` 入场后一直在场/);
  assert.match(actors, /ArtifactSystem 收敛计划/);
  assert.match(actors, /同一个演员连续 Beat 内只有一个 DOM 主体/);
  assert.match(actors, /缺素材处仍是明确 placeholder/);
  assert.match(actors, /scroll-continuum-shell[\s\S]*从观众主舞台解除挂载/);
  assert.match(actors, /scroll-flow-field[\s\S]*不继续强化/);
  assert.match(actors, /scroll-curtain-field[\s\S]*不继续强化/);
});
