# XMind 对齐样本

## 功能定位

该文档记录 XMind parity fixture 的维护口径。仓库不再保留根目录 `fixtures/` 内容；需要保存的样本规则、脱敏要求和测试覆盖范围统一写入 `plan/`。

## 隐私约束

- 不要提交包含用户隐私内容的真实思维导图。
- 用户桌面上的真实 `.xmind` 文件只能作为本机验证样本，不进入仓库。
- 需要持久保存的样本必须先脱敏，并明确说明覆盖的解析、布局、样式或交互场景。

## 推荐样本类型

- 最小文件：1 个 root topic。
- 多 sheet 文件。
- `branch: "folded"` 折叠分支文件。
- 1000+ hidden descendant count 文件。
- 每一种 `structureClass`。
- marker、label、note、image、link、task、equation、attachment。
- relationship、boundary、summary、floating topic。
- custom theme、rich text、hand-drawn style。
- 100、500、1000、5000 topic 大图性能样本。
