# 缩放控制器

## 组件职责

`zoom-controller.ts` 负责本地 XMind viewer 的缩放行为：读取当前缩放比例、发送适配画布命令和发送指定缩放比例命令。它把 zoom 业务语义从通用 iframe bridge 中拆出来。

## 输入输出

- 输入：`XMindIframeBridge` 和 `XMindViewerStateStore`。
- 输出：`getZoom()`、`fitMap()` 和 `setZoom()`。

## 行为规则

- 当前缩放比例来自 `viewer-state.ts` 对 `zoom-change` 的状态投影。
- `fitMap()` 发送 `fit-map` 命令。
- `setZoom(scale)` 发送 `zoom` 命令。
- 非数字缩放值视为调用方错误，抛出 `XMindViewerError`。

## 迁移意义

后续如果要实现 Obsidian 原生缩放控件、快捷键、缩放范围策略或替换 iframe 端协议，应优先扩展本模块，而不是直接调用 `bridge.emit()`。
