# XMind Workbook 模型

## 组件职责

`workbook-model.ts` 负责把 `.xmind` 的 `content.json` 转换成源码层可理解的轻量 workbook 元数据。目前只提取 sheet 列表，为后续替换 bundle 内部 sheet 状态和文件解析逻辑打基础。

## 数据输入

- 支持 XMind 常见的 `content.json` 顶层数组结构。
- 支持兼容层可能传入的 `{ workbook: { sheets } }` 或 `{ sheets }` 结构。
- 只接受带字符串 `id` 的 sheet；没有 `id` 的条目会被忽略。
- `title` 缺失时回退为 sheet id，避免源码层状态出现空标题。

## 输出

- `XMindWorkbookMetadata.sheets`：只读 sheet 元数据列表。
- `XMindWorkbookSheet.id`：sheet 唯一标识。
- `XMindWorkbookSheet.title`：用于 UI 或调试显示的 sheet 标题。

## 组合关系

`file-loader.ts` 调用本模块提取元数据；Obsidian 当前仍以 iframe runtime 的 `sheets-load` 事件作为实际渲染状态来源。本模块后续可以逐步承接更多文件解析能力，但不能凭猜测重写未知的 XMind topic/layout 语义。

## 限制

本模块不是完整 XMind parser，不解析 topic 树、样式、关系线、附件或 layout。无法确认语义的字段继续留给兼容渲染 bundle 处理。
