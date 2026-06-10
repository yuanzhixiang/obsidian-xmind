# XMind Embed Viewer 远程调试快照

本目录保存 `https://www.xmind.app/embed-viewer` 在 2026-06-10 17:14:30 CST 抓取的调试快照，用于排查 Obsidian 插件通过 `xmind-embed-viewer` 加载远程 iframe 时的问题。

## 目录说明

- `local/embed-viewer.html`：插件运行时使用的本地 iframe 入口，使用相对路径加载本目录镜像资源。
- `mirror/assets.xmind.net/`：HTML 直接引用的 XMind CDN 资源，按原始 host/path 镜像保存。
- `meta/direct-assets.txt`：HTML 中直接引用的 XMind CDN 资源 URL 清单。
- `meta/webpack-chunks.json`：从 `share-embed.2d8410315a.js` 解析出的 Webpack chunk 映射。
- `meta/embed-required-chunks.txt`：英文 embed 页面初始化会懒加载的关键 chunk 清单。

## 关键入口

- 主渲染 bundle：`mirror/assets.xmind.net/www/javascripts/share-embed.2d8410315a.js`
- MessageChannel 建连逻辑：在主 bundle 中搜索 `setup-channel`
- 本地文件加载逻辑：在主 bundle 中搜索 `open-file`
- 控制命令：在主 bundle 中搜索 `fit-map`、`zoom`、`switch-sheet`
- 本地动态资源路径：主 bundle 读取 `window.__XMIND_ASSET_BASE__`，由 `local/embed-viewer.html` 指向本地镜像目录。
- 中心主题兼容修复：主 bundle 中的 `xmindNormalizeLocalOpenFile` 会在本地 `open-file` 载入前修正新版 XMind 文件里不可见的中心主题继承色。

## 注意事项

这是一份从远程 iframe 抓取并本地化的资源快照。插件构建会把整个目录复制到 `dist/`，运行时通过本地 iframe 加载，不再创建 `https://www.xmind.app/embed-viewer` 远程 iframe。

原始远程 HTML 和未被本地入口使用的 XMind 站点基础脚本已经删除；它们包含第三方公开应用标识，且不参与插件运行时渲染。
