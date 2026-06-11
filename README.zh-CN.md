# XMind Maps

XMind Maps 是一个 Obsidian 插件，用于在 vault 内直接打开本地 `.xmind` 文件。插件会为 `.xmind` 扩展名注册只读文件视图，并使用本地源码版 SVG viewer 渲染脑图。

[English](./README.md)

## 功能

在 Obsidian vault 中直接打开 `.xmind` 文件，以只读模式查看脑图，支持缩放、适配画布和查看控件。

## 安装

插件通过 Obsidian 官方社区插件审核后，可以直接在 Community Plugins 中安装。

手动测试时，下载 release 里的标准三件套，并放入：

```text
<vault>/.obsidian/plugins/xmind-maps/
```

需要的文件是 `main.js`、`manifest.json` 和 `styles.css`。放入后在 Obsidian 设置中启用插件。

## 使用

在 Obsidian vault 中打开任意 `.xmind` 文件即可。插件会在本地读取文件，并在只读文件视图中渲染脑图。

## 不支持

- 编辑或保存 XMind 文件。
- 在 Markdown 笔记中以内嵌方式渲染 `.xmind` 文件。
- 完整复刻最新版 XMind 桌面端或 Web 端的所有布局与主题细节。

## 开发

- 安装依赖：`pnpm install`
- 启动开发构建和测试 vault：`pnpm dev`
- 运行本地 viewer 检查：`pnpm check:local-viewer`
- 运行 lint：`pnpm lint`
- 构建生产文件：`pnpm build`
- 构建手动安装 zip：`pnpm package`
- 打开本地 XMind 调试查看器：`pnpm debug:xmind`

## 许可证

Apache-2.0。Copyright 2026 yuanzhixiang。
