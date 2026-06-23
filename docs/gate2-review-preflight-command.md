# Gate 2 Review Preflight 命令

## 目标

`npm run preflight:gate2` 用来确认当前项目是否已经准备好进入 Gate 2 人工截图和无剪辑录屏。

它不是 Gate 2 通过结论，也不会启动 WP-38。

## 使用方式

```sh
npm run preflight:gate2
```

当前预期结果：

```text
Overall status: READY_FOR_HUMAN_REVIEW
```

含义是：

- Gate 2 仍等待人工验收。
- WP-38 仍被阻断。
- 产品、CTA、二维码和业务事实仍保持 placeholder / blocked。
- 下一步应按 `docs/gate2-human-review-package.md` 截图和录屏。
- 最终结论应填写到 `docs/gate2-review-decision-record.md`。

## 不代表什么

`READY_FOR_HUMAN_REVIEW` 不代表：

- Gate 2 已经通过。
- WP-38 可以启动。
- 真实素材可以接入。
- 业务事实可以补全。
- 最终视觉精修可以开始。
