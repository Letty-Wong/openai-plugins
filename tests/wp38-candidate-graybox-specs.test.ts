import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-38 candidate specs require Gate 2 PASS before implementation", () => {
  const specs = readFileSync("docs/wp38-candidate-graybox-specs.md", "utf8");
  const decisionRecord = readFileSync("docs/gate2-review-decision-record.md", "utf8");

  assert.match(specs, /Decision: PASS/);
  assert.match(specs, /PENDING_HUMAN_REVIEW/);
  assert.match(specs, /不得执行本文件中的实现工作/);
  assert.match(decisionRecord, /docs\/wp38-candidate-graybox-specs\.md/);
});

test("WP-38 candidate specs define exactly the two allowed graybox paths", () => {
  const specs = readFileSync("docs/wp38-candidate-graybox-specs.md", "utf8");

  assert.match(specs, /WP-38R-A Scene 01-08 纵向连续灰盒/);
  assert.match(specs, /WP-38R-B 横向产品段完整灰盒/);
  assert.match(specs, /两个包不能并行启动/);
  assert.match(specs, /只能选择一个候选包/);
});

test("WP-38 candidate specs keep material and architecture gates closed", () => {
  const specs = readFileSync("docs/wp38-candidate-graybox-specs.md", "utf8");

  assert.match(specs, /不接真实产品素材/);
  assert.match(specs, /不接真实二维码/);
  assert.match(specs, /不补 MOQ、价格、认证、交期、质保、名额、日期/);
  assert.match(specs, /不恢复旧 page-chain 主舞台/);
  assert.match(specs, /不使用 `scrollY`、scroll timeline 或 IntersectionObserver 映射 Beat/);
  assert.match(specs, /继续使用 `SpatialStage` \/ `WorldCamera` \/ `PersistentActorLayer`/);
});

test("WP-38 candidate specs constrain scope for vertical and product grayboxes", () => {
  const specs = readFileSync("docs/wp38-candidate-graybox-specs.md", "utf8");

  assert.match(specs, /Beat 范围：`01.1 -> 08.7`/);
  assert.match(specs, /Beat 范围：`09.1 -> 15.8`/);
  assert.match(specs, /`actor.judgement-question`/);
  assert.match(specs, /`actor.ledger-dial`/);
  assert.match(specs, /`actor.product-stage`/);
  assert.match(specs, /`actor.source-packet`/);
  assert.match(specs, /`actor.fact-to-benefit`/);
  assert.match(specs, /`actor.output-cards`/);
});
