# Gate 2 Review Kit 命令

## 目标

`npm run review:gate2:kit` 是 Gate 2 人工验收当天的总入口。

它会把以下内容合在一份输出里：

- 需要运行的命令。
- 截图、录屏和命令输出的建议文件名。
- 当前 Gate 2 预检状态。
- 中文验收清单。

## 使用方式

```sh
npm run review:gate2:kit
```

## 当前边界

这个命令不截图、不录屏、不修改文件、不批准 Gate 2、不启动 WP-38、不开放真实素材 gate。

当前正确状态仍是：

- Gate 2: `PENDING_HUMAN_REVIEW`
- WP-38: blocked
- Material gates: closed
- Product / CTA / QR / business facts: placeholder or blocked

## 建议保存位置

人工验收产生的材料建议按命令输出里的路径保存到：

```text
review/gate2/
```

该目录目前不是必须存在；本命令只负责给出证据索引。
