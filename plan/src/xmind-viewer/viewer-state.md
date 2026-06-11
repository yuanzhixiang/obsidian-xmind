# Viewer 状态模型

## 组件职责

`viewer-state.ts` 把 iframe runtime 发回的 viewer 事件投影成源码层状态。它让外层 Obsidian 视图和后续 controller 可以读取 `map-ready`、sheet 列表、当前 sheet 和缩放比例，而不是只能依赖 debug 页面事件日志或编译后 bundle 内部状态。

## 输入输出

- 输入：`viewer-events.ts` 解析出的 `ViewerEvent`。
- 输出：`XMindViewerState` 快照和订阅通知。

## 当前状态字段

- `isReady`：来自 `map-ready`。
- `sheets`：来自 `sheets-load`，只保留 `id` 和 `title`。
- `activeSheetId`：来自 `sheet-switch`。
- `zoom`：来自 `zoom-change`。

## 组合关系

- `iframe-bridge.ts` 从 MessagePort 中解析 viewer event，并通过 `onViewerEvent` 交给上层。
- `render-adapter.ts` 持有 `XMindViewerStateStore`，暴露 `getState()` 和 `subscribeState()`。
- `sheet-controller.ts` 与 `zoom-controller.ts` 消费本模块状态，不读取 iframe DOM 或 bundle 私有变量。

## 非目标

本模块不改变 iframe runtime 的事件协议，也不负责发送 viewer 命令。命令发送仍由 `iframe-bridge.ts` 和上层 controller 负责。
