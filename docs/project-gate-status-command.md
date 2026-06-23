# Project Gate Status 命令

## 目标

`npm run status:gates` 用来快速确认当前项目卡口状态。

它只读取文档，不修改生产代码、不打开浏览器、不截图、不录屏，也不会把任何 Gate 自动改成通过。

## 使用方式

```sh
npm run status:gates
```

当前应输出：

- Gate 2 decision: `PENDING_HUMAN_REVIEW`
- WP-38 implementation: blocked
- Material gates: closed
- Allowed next action: 先完成 Gate 2 截图、无剪辑录屏和人工决策记录

## 状态来源

| 状态 | 来源 |
| --- | --- |
| Gate 2 decision | `docs/gate2-review-decision-record.md` |
| WP-38 是否可启动 | `docs/wp38-candidate-graybox-specs.md` |
| 素材 gate | `docs/missing-materials.md` 与 `docs/wp38-candidate-graybox-specs.md` |

## 当前边界

- Gate 2 没有人工 `PASS` 前，不得启动 WP-38。
- WP-38 候选规格不是实现授权。
- 真实产品素材、真实二维码和业务事实仍保持阻断。
- 未上传素材继续使用 placeholder。
- 不恢复旧 page-chain 主舞台。
