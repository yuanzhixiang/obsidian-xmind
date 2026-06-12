# XMind 文件审计脚本

## 功能定位

`scripts/inspect-xmind-package.mjs` 用于审计本地 `.xmind` zip 包结构，输出文件条目、sheet、topic、折叠分支、结构类型、对象数量、style 字段和资源数量等统计信息。

该脚本服务于 Xmind 查看体验像素级一致目标的 Phase 0 / Phase 1：先用真实文件确认 Xmind 文件格式中出现了哪些字段，再补齐 parser、layout 和 renderer 能力。

## 使用方法

```bash
pnpm inspect:xmind /path/to/file.xmind
pnpm inspect:xmind --json /path/to/file.xmind
pnpm inspect:xmind --include-titles /path/to/file.xmind
```

默认输出不包含 topic 标题，避免把用户真实思维导图内容写进日志。只有显式传入 `--include-titles` 时才输出少量标题样本。

## 输出口径

- package：是否存在 `content.json`、`content.xml`、resources、thumbnail。
- jsonEntries：`content.json`、`metadata.json`、`manifest.json` 的存在状态、大小和顶层 keys。
- sheets：sheet 数量、sheet keys、root topic 的 `structureClass`。
- topics：topic 总数、`branch: "folded"` 数量、最大深度、topic keys、children bucket、structure class。
- objects：relationship、boundary、summary 数量。
- styles：包含 style 字样的字段和可识别 style id。

## 隐私和安全

- 不修改 `.xmind` 文件。
- 不上传文件。
- 默认不输出正文标题。
- 用户桌面真实文件只能用于本机验证，不得直接提交到 `fixtures/xmind-parity/`。

## 与 Goal 的关系

后续每补一个 Xmind 查看功能，都应该先用该脚本确认 fixture 或用户样本中是否存在对应字段，再补 parser/model 类型、渲染逻辑和回归验证。
