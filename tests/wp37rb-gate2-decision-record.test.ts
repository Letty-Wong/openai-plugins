import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-37R-B provides a pending Gate 2 decision record template", () => {
  const record = readFileSync("docs/gate2-review-decision-record.md", "utf8");

  assert.match(record, /Decision: PENDING_HUMAN_REVIEW/);
  assert.match(record, /不得改成 `PASS`/);
  assert.match(record, /Gate 2 人工验收尚未确认/);
});

test("WP-37R-B requires evidence before a Gate 2 decision", () => {
  const record = readFileSync("docs/gate2-review-decision-record.md", "utf8");

  assert.match(record, /1366 x 768/);
  assert.match(record, /1920 x 1080/);
  assert.match(record, /录屏 A/);
  assert.match(record, /录屏 B/);
  assert.match(record, /录屏 C/);
  assert.match(record, /录屏 D/);
  assert.match(record, /当前顶层 DOM 层抽查/);
  assert.match(record, /持久演员身份抽查/);
  assert.match(record, /npm run lint/);
  assert.match(record, /npm run build/);
});

test("WP-37R-B keeps next work packages and material gates constrained", () => {
  const record = readFileSync("docs/gate2-review-decision-record.md", "utf8");
  const ledger = readFileSync("docs/gate2-evidence-ledger.md", "utf8");

  assert.match(record, /WP-38R-A Scene 01-08 纵向连续灰盒/);
  assert.match(record, /WP-38R-B 横向产品段完整灰盒/);
  assert.match(record, /不允许同时开/);
  assert.match(record, /素材 Gate 仍然关闭/);
  assert.match(record, /正式产品素材/);
  assert.match(record, /正式 CTA、短链和二维码/);
  assert.match(ledger, /docs\/gate2-review-decision-record\.md/);
});
