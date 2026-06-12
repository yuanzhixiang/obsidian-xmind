# XMind 文档解析器

## 组件职责

`xmind-document.ts` 是源码版 viewer 的文件模型入口。它读取 `.xmind` zip 中的 `content.json`，并转换成渲染器能直接消费的 sheet 和 topic 树。

## 输入输出

- 输入：Obsidian 视图传入的 `.xmind` ArrayBuffer。
- 输出：`XMindDocument`，包含 `sheets`、每个 sheet 的 `id`、`title`、`structureClass`、`rootTopic`、relationships、theme、extensions、zones 和原始 raw record。
- 依赖：`xmind-zip.ts`，用于读取 zip 内文本文件。
- 依赖：`theme-loader.ts`，用于复用中心主题文字色兼容规则。

## 解析口径

- 支持 XMind 常见的 `content.json` 顶层数组结构。
- 兼容 `{ sheets }` 和 `{ workbook: { sheets } }` 结构。
- 当 `.xmind` 包内没有 `content.json` 但存在历史 `content.xml` 时，解析器会使用 DOMParser 做最小兼容转换，并复用同一套 sheet/topic 模型。当前 XML fallback 覆盖 sheet、topic、title、children、`branch`、marker、label、notes、image 和 relationship 的常见结构。
- topic 继续保留布局层当前消费的 `children` 字段，但该字段只代表 `children.attached` 主分支树。`children.detached` 不再混入主分支，避免自由主题被当成普通子节点排版。
- topic 同时解析并保留更完整的 Xmind 对象语义：`class`、`attributedTitle`、`customWidth`、`href`、`style`、`markerRefs`、`markerIds`、`labels`、`labelTexts`、`notes`、`noteText`、`image`、`numbering`、`numberingText`、`taskInfo`、`attachments`、`attachmentCount`、`equation`、`equationText`、`audio`、`audioText`、`extensions`、`boundaries`、`summaries`、`childrenByType` 和 raw record。
- `markerRefs` 和 `labels` 保留原始数组用于只读渲染和后续格式兼容；`markerIds` 和 `labelTexts` 是只读 viewer 的规范化展示字段，兼容字符串和常见对象格式。
- `notes` 保留原始字段；`noteText` 是只读 viewer 的可展示摘要字段，兼容字符串、`plain`、`text`、`content`、`html` 和常见数组嵌套结构。
- `numbering` 保留原始字段；`numberingText` 是只读 viewer 的可展示编号字段，兼容字符串、数字和常见对象格式，供布局层和 SVG 渲染器显示编号胶囊。
- `taskInfo` 是只读 viewer 的任务信息规范化字段，会从 `taskInfo`、`task` 或 topic 顶层 progress/priority/assignee/date 字段中提取进度、优先级、负责人和日期，并保留 raw 用于只读渲染和后续格式兼容。
- `attachments`、`equation` 和 `audio` 保留原始对象；`attachmentCount`、`equationText`、`audioText` 是只读 viewer 的可展示摘要字段，供 SVG 渲染器显示附件、公式和音频备注图标。
- `image` 保留原始字段并额外提供 `source`、`dataUrl`、`width`、`height`。解析器会从 `.xmind` zip 的 `resources/` entry 中读取图片并生成只读 viewer 使用的 data URL；不修改源文件。
- `childrenByType` 按 Xmind 原始 children bucket 保存，例如 `attached`、`detached`、`callout`。布局层会把 `detached` 转成 floating topic，把 `callout` 挂到父 topic 的 callout 列表；只读渲染必须继续保留原始 bucket 语义。
- sheet 解析 `relationships`、`theme`、`extensions`、`zones`、`topicOverlapping`、`topicPositioning` 和 `floatingTopicFlexible`，为关系线、主题样式、高级布局和像素级对齐做准备。
- style 字段支持字符串 style id 与对象 style 两种形态；对象 style 保留 `id`、`properties` 和 raw record。
- `structureClass` 用于布局层识别 clockwise/right 等根结构，避免把右向脑图误判为左右均分脑图。
- `branch` 用于布局层识别 XMind 保存的展开/收起状态；当前明确支持 `branch: "folded"` 作为 topic 初始收起标记。
- `position` 用于 floating topic 和 callout topic 的基础定位。detached topic 的位置按 sheet 坐标处理；callout topic 的位置按父 topic 相对偏移处理。缺失 position 时由布局层使用兜底位置。
- summary/boundary 这类 topic scoped object 会保留 `id`、`title`、`style` 和 raw record；summary 额外规范化 `topicId` 与 `range`。XMind 常把 Summary 标签文本放在 `children.summary` bucket 的 summary topic 中，并在 `summaries[]` 里用 `topicId` 引用该 topic，渲染层需要通过该引用显示标签。
- 富文本、标记、任务、关系线、边界、概要、附件、公式和主题完整样式已经进入模型承载层；渲染层仍需按查看功能矩阵逐项补齐。

## 迁移意义

该模块让源码版 viewer 不再依赖 `share-embed` 或 `73350` 内部文件解析逻辑。后续扩展 XMind 语义时，应在这里或专门的模型模块中逐项增加字段，不把未知结构直接搬回编译产物。
