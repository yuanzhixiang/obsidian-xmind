# Viewer 状态模型

## 组件职责

`viewer-state.ts` 把 viewer 事件投影成源码层状态。它让 Obsidian 视图、调试页和后续控制逻辑可以读取 `map-ready`、sheet 列表、当前 sheet 和缩放比例。

## 输入输出

- 输入：`viewer-events.ts` 定义的 `ViewerEvent`。
- 输出：`XMindViewerState` 快照和订阅通知。

## 当前状态字段

- `isReady`：来自 `map-ready`。
- `sheets`：来自 `sheets-load`，只保留 `id` 和 `title`。
- `activeSheetId`：来自 `sheet-switch`。
- `zoom`：来自 `zoom-change`。

## 组合关系

- `render-adapter.ts` 持有 `XMindViewerStateStore`，负责发出事件并暴露 `getState()` 与 `subscribeState()`。
- 调试页通过 `onStateChange` 订阅事件日志。

## 非目标

本模块不解析 `.xmind`，不绘制 SVG，也不发送 viewer 命令。
