# 本地 XMind 远程渲染调试页

## 功能定位

本调试页用于排查插件内置的本地 XMind iframe 渲染链路。页面复用正式插件使用的 `vendor/xmind-embed-viewer-remote/local/embed-viewer.html` 和镜像资源打开指定 `.xmind` 文件，确保调试环境与插件运行时一致。

## 用户流程

- 开发者运行本地调试服务器。
- 浏览器打开调试页后，父页面创建本地 iframe。
- iframe 加载正式本地入口 `vendor/xmind-embed-viewer-remote/local/embed-viewer.html`。
- 父页面从服务器读取指定 `.xmind` 文件二进制。
- 父页面通过 `MessageChannel` 发送 `open-file` 命令给 iframe。
- iframe 渲染脑图，并回传 `map-ready`、`sheets-load`、`sheet-switch`、`zoom-change` 等事件。

## UI/UX 约束

- 页面第一屏直接显示渲染区域，不做营销式说明。
- 顶部工具栏仅保留调试必要信息、重新加载、适配画布、缩放和 sheet 切换。
- 右侧日志面板展示加载状态、事件和错误，便于定位问题。
- iframe 区域保持稳定尺寸，避免状态文本或日志变化导致画布抖动。

## 边界和限制

- 本调试页依赖已下载的 XMind 线上 bundle 快照，和正式插件共用同一份本地化资源。
- `.xmind` 文件从本机绝对路径读取，不复制进仓库。
- 如果远程 bundle 运行时请求未下载的动态 chunk 或资源，页面会在日志和浏览器控制台暴露错误。
