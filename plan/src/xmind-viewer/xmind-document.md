# XMind 文档解析器

## 组件职责

`xmind-document.ts` 是源码版 viewer 的文件模型入口。它在 iframe 内读取 `.xmind` zip，解析 `content.json`，并转换成渲染器能直接消费的 sheet 和 topic 树。

## 输入输出

- 输入：`open-file` 命令传入的 `.xmind` ArrayBuffer。
- 输出：`XMindDocument`，包含 `sheets`、每个 sheet 的 `id`、`title`、`structureClass` 和 `rootTopic`。
- 依赖：`jszip@3.10.1`，用于读取 zip。
- 依赖：`theme-loader.ts`，用于复用中心主题文字色兼容规则。

## 解析口径

- 支持 XMind 常见的 `content.json` 顶层数组结构。
- 兼容 `{ sheets }` 和 `{ workbook: { sheets } }` 结构。
- topic 只解析当前源码渲染需要的 `id`、`title`、`structureClass`、`branch`、`position` 和 `children.attached/items`、`children.detached/items`。
- `structureClass` 用于布局层识别 clockwise/right 等根结构，避免把右向脑图误判为左右均分脑图。
- `position` 目前保留为模型字段，后续支持手动拖拽布局或自由主题时再进入布局计算。
- 富文本、标记、关系线、边界、概要、附件、公式和主题完整样式暂不解析。

## 迁移意义

该模块让源码版 viewer 不再依赖 `share-embed` 或 `73350` 内部文件解析逻辑。后续扩展 XMind 语义时，应在这里或专门的模型模块中逐项增加字段，不把未知结构直接搬回编译产物。
