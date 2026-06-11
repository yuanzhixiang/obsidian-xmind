# Viewer 稳定入口

## 组件职责

`index.ts` 是本地 viewer 源码层对外入口。`src/core/` 只能通过这里导入 viewer 能力，不能绕过本入口直接依赖内部实现文件。

## 导出口径

- `XMindRenderAdapter`：直接源码渲染门面。
- `loadLocalXMindFile()` / `normalizeLocalXMindFile()`：本地 `.xmind` 文件预处理。
- `XMindViewerStateStore` 和状态类型：viewer 事件状态投影。
- `extractXMindWorkbookMetadata()` 和 workbook 类型：轻量元数据提取。
- `normalizeInvisibleCentralTopicTextColor()`：中心主题兼容修复。
- `getViewerErrorMessage()` 和 `XMindViewerError`：错误处理。

## 约束

- 本入口不再导出 Blob URL、资源回收、iframe bridge、sheet controller 或 zoom controller。
- 不恢复 `getInlineXMindViewerUrl()` 或 `revokeInlineXMindViewerAssets()`。
- 新增导出必须对应真实源码模块职责，不能把旧 bundle 或动态脚本兼容层重新暴露给 `src/core/`。
