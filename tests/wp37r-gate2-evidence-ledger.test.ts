import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("WP-37R maps AGENTS Gate 2 requirements to evidence items", () => {
  const ledger = readFileSync("docs/gate2-evidence-ledger.md", "utf8");

  assert.match(ledger, /1366 x 768/);
  assert.match(ledger, /1920 x 1080/);
  assert.match(ledger, /前进和后退操作/);
  assert.match(ledger, /快速重复输入/);
  assert.match(ledger, /Reduced Motion/);
  assert.match(ledger, /当前顶层 DOM 层/);
  assert.match(ledger, /持久演员身份状态/);
  assert.match(ledger, /验证命令结果/);
  assert.match(ledger, /已知风险/);
  assert.match(ledger, /下一工作包建议/);
});

test("WP-37R keeps Gate 2 from being treated as accepted before human evidence", () => {
  const ledger = readFileSync("docs/gate2-evidence-ledger.md", "utf8");

  assert.match(ledger, /人工录屏和截图尚未由人工确认/);
  assert.match(ledger, /未通过 Gate 2/);
  assert.match(ledger, /不得进入最终视觉精修、真实产品素材、真实二维码或业务事实补全/);
  assert.match(ledger, /不通过 \| 回到演员身份、camera pose、空间路线和灰盒结构调整/);
});

test("WP-37R keeps material gates separate from Gate 2 graybox acceptance", () => {
  const ledger = readFileSync("docs/gate2-evidence-ledger.md", "utf8");

  assert.match(ledger, /Gate 2 通过也不等于素材 gate 通过/);
  assert.match(ledger, /正式花洒产品素材/);
  assert.match(ledger, /正式 CTA、短链和二维码/);
  assert.match(ledger, /经确认的产品事实/);
});
