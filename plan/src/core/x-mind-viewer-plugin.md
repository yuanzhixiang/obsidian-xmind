# XMind 插件入口

## 功能定位

`x-mind-viewer-plugin.ts` 是 Obsidian 插件入口类，负责注册 `.xmind` 文件视图。

## 关键行为

- `onload()` 注册 `XMIND_VIEW_TYPE` 对应的 `XMindViewerView`。
- `onload()` 通过 `registerExtensions(['xmind'], XMIND_VIEW_TYPE)` 让 vault 内 `.xmind` 文件直接打开 viewer。
- 插件不再维护 iframe、Blob URL 或本地 viewer 资产回收逻辑。

## 组合关系

- 视图实现位于 `src/core/x-mind-viewer-view.ts`。
- viewer 运行逻辑由 `src/xmind-viewer/` 的直接源码模块承担。
- XMind 文件的 pane menu 行为由 `XMindViewerView.onPaneMenu()` 维护，插件入口只负责注册视图和扩展名。

## 限制

该入口不解析 `.xmind`，不处理 MessageChannel，也不加载远程 `xmind.app/embed-viewer`。
