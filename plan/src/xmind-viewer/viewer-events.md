# Viewer 协议常量

## 组件职责

`viewer-events.ts` 集中定义本地 viewer MessageChannel 协议常量、命令类型和回复事件解析函数，避免协议字符串散落在 iframe bridge、debug 页面和后续 controller 中。

## 当前协议

- 初始化命令：`setup-channel`
- 初始化回复：`channel-ready`
- runtime 事件消息：`event`
- 命令回复前缀：`xmind-local-viewer`
- 支持命令：`open-file`、`fit-map`、`zoom`、`switch-sheet`
- 支持事件：`map-ready`、`sheets-load`、`sheet-switch`、`zoom-change`

## 维护规则

- 新增 viewer 命令时，先更新 `ViewerCommand` 类型，再由上层 controller 暴露有语义的方法。
- 新增 viewer 事件时，先更新 `ViewerEventName` 和 `parseViewerEvent()`，再更新 `viewer-state.ts` 的状态投影。
- 不在业务代码中硬编码 reply id 前缀或 `channel-ready` 字符串。
- 后续 iframe 端协议源码化时，应复用同一套命名和语义，确保 debug viewer、Obsidian view 和自动化检查一致。
