# Viewer 事件类型

## 组件职责

`viewer-events.ts` 集中定义本地 viewer 的事件名称和事件负载结构，避免状态事件字符串散落在渲染适配器、状态模型和调试页中。

## 当前事件

- `map-ready`：脑图是否完成渲染。
- `sheets-load`：sheet 列表已加载。
- `sheet-switch`：当前 sheet 已切换。
- `zoom-change`：当前缩放百分比变化。

## 维护规则

- 新增 viewer 事件时，先更新 `ViewerEventName`，再更新 `viewer-state.ts` 的状态投影。
- 不再维护 iframe `setup-channel`、`channel-ready`、reply id 或 MessageChannel 命令类型。
- 调试页和正式 viewer 必须复用同一套事件命名。
