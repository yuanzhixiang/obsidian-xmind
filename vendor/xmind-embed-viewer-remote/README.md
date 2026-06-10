# XMind Embed Viewer 远程调试快照

本目录保存 `https://www.xmind.app/embed-viewer` 在 2026-06-10 17:14:30 CST 抓取的调试快照，用于排查 Obsidian 插件通过 `xmind-embed-viewer` 加载远程 iframe 时的问题。

## 目录说明

- `html/embed-viewer.html`：远程 iframe 页面的原始 HTML。
- `mirror/assets.xmind.net/`：HTML 直接引用的 XMind CDN 资源，按原始 host/path 镜像保存。
- `meta/direct-assets.txt`：HTML 中直接引用的 XMind CDN 资源 URL 清单。
- `meta/webpack-chunks.json`：从 `share-embed.2d8410315a.js` 解析出的 Webpack chunk 映射。
- `meta/embed-required-chunks.txt`：英文 embed 页面初始化会懒加载的关键 chunk 清单。

## 关键入口

- 主渲染 bundle：`mirror/assets.xmind.net/www/javascripts/share-embed.2d8410315a.js`
- MessageChannel 建连逻辑：在主 bundle 中搜索 `setup-channel`
- 本地文件加载逻辑：在主 bundle 中搜索 `open-file`
- 控制命令：在主 bundle 中搜索 `fit-map`、`zoom`、`switch-sheet`

## 注意事项

这是一份调试用远程资源快照，不是项目源码实现，也未接入当前插件构建流程。当前插件仍通过 `xmind-embed-viewer` 加载官方远程 iframe。
