# XMind Maps

XMind Maps 是一个 Obsidian 插件，可以在 Obsidian 里直接打开本地 `.xmind` 文件，并以只读方式查看思维导图。

[English](./README.md)

## 你可以用它做什么

- 在 Obsidian vault 里直接打开 `.xmind` 文件。
- 不离开 Obsidian 就能查看 XMind 思维导图。
- 在同一个 XMind 文件的多个 sheet 之间切换。
- 缩放、适配画布，并在大图里上下左右移动。
- 使用触摸板或鼠标滚轮浏览画布。
- 展开和收起被隐藏的子分支。
- 从 Obsidian 面板菜单复制当前文件路径。

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

把 `.xmind` 文件放到你的 Obsidian vault 里，然后从 Obsidian 文件列表中打开它。Obsidian 会用 XMind Maps 的视图打开文件，而不是把它当作 Markdown 文本编辑。

这个视图是只读的。你可以查看思维导图、展开分支、缩放、移动画布、切换 sheet、复制文件路径，但插件不会编辑或保存 `.xmind` 文件。

## 查看器控件

- `-` 和 `+`：缩小或放大。
- 缩放百分比：显示当前缩放比例。
- `适配`：把整张思维导图适配到当前面板。
- Sheet 下拉框：当 XMind 文件包含多个 sheet 时，用来切换 sheet。
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

## 面板菜单

在 Obsidian 面板右上角的三点菜单中，可以复制当前 `.xmind` 文件的路径。

根据你的 Obsidian 版本，`Copy path` 可能包含：

- `as Obsidian URL`
- `from vault folder`
- `from system root`

## 注意事项

- XMind Maps 不编辑、不保存、不导出 XMind 文件。
- XMind Maps 不会把 `.xmind` 文件嵌入渲染到 Markdown 笔记里。
- 视觉细节不保证和每个版本的 XMind 桌面端或网页版完全一致。
- 如果文件打不开，请确认它是有效的 `.xmind` 文件，并从 Obsidian 文件列表中重新打开。

## 许可证

Apache-2.0。Copyright 2026 yuanzhixiang。
