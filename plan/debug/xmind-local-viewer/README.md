# 本地 XMind 调试页

## 功能定位

本调试页用于排查源码版本地 XMind iframe 渲染链路。页面加载 `src/xmind-viewer/native-viewer-app.ts` 打出的源码 viewer，不再把 `src/xmind-viewer-assets/local/embed-viewer.html` 或旧 `share-embed` 作为调试主路径。

## 用户流程

- 开发者运行 `pnpm debug:xmind`。
- 浏览器打开调试页后，父页面创建本地 iframe。
- iframe 加载 `/debug-runtime/xmind-native-viewer.html`。
- iframe HTML 加载 `/debug-runtime/xmind-native-viewer.js`，该脚本由 `src/xmind-viewer/native-viewer-app.ts` 打包生成。
- 父页面从服务器读取指定 `.xmind` 文件二进制。
- 父页面调用 `/debug-runtime/xmind-file-loader.js` 中的源码 `loadLocalXMindFile()` 打包产物，完成 workbook 元数据读取和中心主题兼容预处理。
- 父页面通过 `MessageChannel` 发送 `open-file` 命令给 iframe。
- 源码 iframe app 解析 `content.json`、渲染 SVG 脑图，并回传 `map-ready`、`sheets-load`、`sheet-switch`、`zoom-change` 等事件。

## 调度保护

- 父页面在加载 `/debug-runtime/xmind-file-loader.js` 前禁用 `MutationObserver` / `WebKitMutationObserver`，避免 JSZip 等旧调度实现调用 `observe()` 时产生 console error。
- iframe 内的 `/debug-runtime/xmind-native-viewer.html` 也会在加载源码 app 前执行同类保护。
- 正式 Obsidian 主路径还会在 `file-loader.ts` 的 zip 读取期间临时执行同类保护。

## UI/UX 约束

- 页面第一屏直接显示渲染区域，不做营销式说明。
- 顶部工具栏仅保留调试必要信息、重新加载、适配画布、缩放和 sheet 切换。
- 右侧日志面板展示加载状态、事件和错误，便于定位问题。
- iframe 区域保持稳定尺寸，避免状态文本或日志变化导致画布抖动。

## 边界和限制

- 本调试页不访问远程 `xmind.app/embed-viewer`。
- `.xmind` 文件从本机绝对路径读取，不复制进仓库。
- `src/xmind-viewer-assets/` 暂时保留为旧 bundle 参考资产，但不是本调试页的主运行链路。
