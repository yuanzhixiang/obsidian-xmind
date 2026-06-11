# Viewer 内联入口

## 组件职责

`index.ts` 是本地 viewer 源码层对外入口，提供内联 viewer URL 管理、文件预处理、viewer 控制器和错误处理等稳定 API。

## 关键行为

- 首次调用时创建 viewer 资源 URL，并用 `embed-viewer.ts` 生成 HTML Blob URL。
- 后续调用复用同一个 HTML Blob URL，避免重复把大体积 viewer 资产放入内存。
- 插件卸载或需要释放资源时，先回收 HTML Blob URL，再回收 CSS、JS chunk、Snowbrush 等资源 URL。
- 对外导出 `XMindRenderAdapter`、`loadLocalXMindFile()`、`normalizeLocalXMindFile()` 兼容接口、workbook 元数据类型、主题兼容函数、`getViewerErrorMessage()` 和 `XMindViewerError`，`src/core` 不再直接读取 `src/xmind-viewer/` 内部子模块。

## 组合关系

Obsidian 视图和插件卸载逻辑应直接从本模块导入，不再通过 `src/core/xmind-viewer-assets.ts` 兼容壳转发，也不绕过本入口导入 `render-adapter.ts`、`iframe-bridge.ts`、`file-loader.ts` 或 `workbook-model.ts`。
