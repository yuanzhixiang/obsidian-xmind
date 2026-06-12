# XMind Maps

XMind Maps 是一个 Obsidian 只读查看插件，可以在 Obsidian 里直接打开本地 `.xmind` 文件，也可以把它嵌入到 Markdown 笔记中。

[English](./README.md)

## 功能特性

- 在 Obsidian vault 里用专门的 XMind 视图打开 `.xmind` 文件。
- 使用 `![[思维导图.xmind]]` 这样的 Obsidian 原生语法嵌入 `.xmind` 文件。
- 在阅读视图和 Live Preview 中预览嵌入的思维导图。
- 在 Live Preview 中，当光标位于嵌入语法行时显示原始 `![[思维导图.xmind]]` 文本，方便修改链接。
- 在同一个 XMind 文件的多个 sheet 之间切换。
- 搜索当前 sheet，并在搜索结果之间跳转。
- 使用整页大纲视图按层级阅读思维导图。
- 缩放、适配画布，并在大图里上下左右移动。
- 支持触摸板手势、鼠标滚轮、`Command` + 滚轮缩放，以及按住鼠标右键拖动画布。
- 按 XMind 文件中保存的折叠状态展开或收起分支。
- 查看常见 XMind 内容，包括关系线、边界、概要、标记、标签、备注、链接、任务、图片、外框主题、自由主题和主题形状。
- 从 Obsidian 面板菜单复制当前文件路径。
- 支持英文和简体中文界面文案，并尽量跟随 Obsidian 当前语言。

## 截图

嵌入到 Markdown 笔记中：

![在 Obsidian 笔记中嵌入 XMind 思维导图](docs/images/xmind-maps-embed.png)

作为专门的 XMind 文件视图打开：

![在 Obsidian XMind 视图中打开思维导图](docs/images/xmind-maps-file-view.png)

## 安装

插件上架 Obsidian Community Plugins 后，可以直接在 Obsidian 的社区插件中安装。

如果你要手动安装，请下载 release 里的文件，并放到：

```text
<vault>/.obsidian/plugins/xmind-maps/
```

需要放入这三个文件：

- `main.js`
- `manifest.json`
- `styles.css`

然后打开 Obsidian 设置，进入社区插件页面，启用 XMind Maps。

## 使用

XMind Maps 支持两种使用方式：把 `.xmind` 文件作为 Obsidian 文件直接打开，或把它嵌入到 Markdown 笔记里。

### 打开 XMind 文件

把 `.xmind` 文件放到你的 Obsidian vault 里，然后从 Obsidian 文件列表或普通 Obsidian 链接打开它：

```markdown
[[思维导图.xmind]]
```

Obsidian 会用 XMind Maps 的视图打开文件，而不是把它当作 Markdown 文本编辑。

### 嵌入到笔记中

如果要在 Markdown 笔记中嵌入思维导图，使用 Obsidian 原生嵌入语法：

```markdown
![[思维导图.xmind]]
```

嵌入 viewer 同时支持阅读视图和 Live Preview。在 Live Preview 中，XMind Maps 会尽量保持 Obsidian 原生嵌入体验：光标不在嵌入语法行时显示思维导图；光标移动到这一行时显示原始 `![[思维导图.xmind]]` 文本，方便你编辑链接。

嵌入的思维导图使用和直接打开文件相同的只读查看器。XMind Maps 不会编辑、保存或写回原始 `.xmind` 文件。

## 查看器控件

- `-` 和 `+`：缩小或放大。
- 缩放百分比：显示当前缩放比例。
- `适配画布`：把整张思维导图适配到当前面板。
- `搜索`：打开当前 sheet 的搜索面板。
- `大纲`：切换到整页层级大纲视图。
- Sheet 标签：当 XMind 文件包含多个 sheet 时，用来切换 sheet。
- 双指滑动或鼠标滚轮：在画布中上下左右移动。
- 触摸板双指捏合：放大或缩小思维导图。
- `Command` + 鼠标滚轮：放大或缩小思维导图。
- 按住鼠标右键拖拽：移动画布。

## 展开和收起分支

在 XMind 里已经收起的分支，会在 XMind Maps 中继续保持收起；原本展开的分支也会保持展开。

- 点击主题旁边的数字圆圈，可以展开这个主题下隐藏的子分支。
- 鼠标悬停在已展开主题或它的连接线上，会显示收起控件。
- 点击收起控件，可以把这个分支重新折叠起来。
- 如果隐藏数量超过 `999`，控件会显示 `...`。
- 手动展开和收起只影响当前 Obsidian 查看会话。

## 搜索

使用 `搜索` 可以查找当前 sheet 中的内容。搜索范围包括主题标题、标签、备注和链接。

- 按 `Enter` 跳到下一个结果。
- 按 `Shift` + `Enter` 跳到上一个结果。
- 如果搜索结果在已折叠分支里，XMind Maps 会在当前查看会话中临时展开必要的上级分支，让结果真实可见。

## 大纲

使用 `大纲` 可以从画布切换到整页层级视图。

- 大纲的默认展开和收起状态与思维导图一致。
- 点击展开箭头可以在当前查看会话中展开或收起主题。
- 已折叠主题会显示隐藏子节点数量。
- 点击大纲中的主题可以选中并定位到画布里的对应主题。

## XMind 内容展示

XMind Maps 专注于查看。它会读取本地 `.xmind` 文件包，并尽量显示其中常见的 XMind 结构：

- 多 sheet
- 折叠分支
- 主题颜色、文字样式、形状和画布背景
- 关系线和关系线标题
- 边界和概要
- 外框主题和自由主题
- 标记、优先级、进度、任务、标签、备注和链接
- 主题图片，以及附件、公式或音频的基础提示图标

一些高级主题细节可能仍然和 XMind 桌面端不同。原始 `.xmind` 文件不会被修改。

## 面板菜单

在 Obsidian 面板右上角的三点菜单中，可以复制当前 `.xmind` 文件的路径。

根据你的 Obsidian 版本，`Copy path` 可能包含：

- `as Obsidian URL`
- `from vault folder`
- `from system root`

## 注意事项

- XMind Maps 是只读查看器，不编辑、不保存，也不导出 XMind 文件。
- 打开或嵌入思维导图不会修改原始 `.xmind` 文件。
- 缩放、平移、搜索、大纲模式、手动展开或收起分支等状态只保存在当前查看会话中。
- 视觉细节不保证和每个版本的 XMind 桌面端或网页版完全一致。
- 如果文件打不开，请确认它是有效的 `.xmind` 文件，并从 Obsidian 文件列表中重新打开。

## 许可证

Apache-2.0。Copyright 2026 yuanzhixiang。
