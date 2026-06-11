# XMind 插件入口

## 功能定位

`x-mind-viewer-plugin.ts` 是 Obsidian 插件入口类，负责注册 `.xmind` 文件视图，并在插件卸载时释放内联 viewer 资源。

## 关键行为

- `onload()` 注册 `XMIND_VIEW_TYPE` 对应的 `XMindViewerView`。
- `onload()` 通过 `registerExtensions(['xmind'], XMIND_VIEW_TYPE)` 让 vault 内 `.xmind` 文件直接打开 viewer。
- `onunload()` 调用 `revokeInlineXMindViewerAssets()` 回收 viewer HTML、CSS、JS chunk 等 Blob URL。

## 组合关系

- 视图实现位于 `src/core/x-mind-viewer-view.ts`。
- viewer 资源生命周期直接导入 `src/xmind-viewer/`，不得再通过 `src/core/xmind-viewer-assets.ts` 兼容壳。

## 限制

该入口不解析 `.xmind`，不处理 MessageChannel，也不加载远程 `xmind.app/embed-viewer`。所有 viewer 运行逻辑由 `src/xmind-viewer/` 的源码模块承担。
