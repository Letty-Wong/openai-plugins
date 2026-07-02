# Material Placeholder Audit 命令

## 目标

`npm run audit:materials` 用来确认当前项目仍保持真实素材与真实商业字段的受控状态。

它不下载素材、不创建图片、不生成二维码、不补真实商业字段，只读取当前代码和本地素材目录。

## 使用方式

```sh
npm run audit:materials
```

当前预期结果是 `PASS`，含义是：

- 产品仍是 `shower-h1-placeholder`。
- 讲稿里的虚拟花洒演示事实和卖点可以是 `APPROVED`，但只代表演示内容批准。
- MOQ、价格、质保、交期等真实商业字段仍保持待人工确认。
- CTA 仍是 `PLACEHOLDER`。
- 产品暖光/红光素材动画 gate 仍是 `BLOCKED`。
- 业务输出样板动画 gate 仍是 `BLOCKED`。
- CTA/QR 动画 gate 仍是 `BLOCKED`.
- 本地没有真实产品、CTA 或二维码媒体文件。

## 重要边界

`PASS` 只表示“演示内容和真实素材 gate 的状态正确”，不表示真实素材已通过。

如果后续上传真实素材，必须先更新素材清单、来源、授权、状态和人工验收记录，不能只把图片放进目录。
