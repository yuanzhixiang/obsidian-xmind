# 渲染适配器

## 组件职责

`render-adapter.ts` 是本地 XMind viewer 的外层源码门面。它组合 iframe bridge、viewer state、sheet controller 和 zoom controller，负责把 Obsidian 文件视图的“打开并查看 XMind 文件”需求转换为稳定的 viewer API。

## 输入输出

- 输入：挂载容器、预处理后的 `.xmind` ArrayBuffer、viewer HTML URL、iframe 样式、错误回调和状态变化回调。
- 输出：`destroy()`、`getState()`、`subscribeState()`、`getSheets()`、`getActiveSheetId()`、`getZoom()`、`fitMap()`、`zoom()`、`switchSheet()`。

## 组合关系

- `iframe-bridge.ts` 负责 iframe 创建、MessageChannel 握手和命令发送。
- `viewer-state.ts` 负责 runtime 事件到源码状态的投影。
- `sheet-controller.ts` 负责 sheet 相关读取和切换行为。
- `zoom-controller.ts` 负责适配画布和缩放行为。
- `file-loader.ts` 在进入本模块前完成 `.xmind` 内存副本预处理。

## 维护规则

- 本模块可以协调 controller，但不直接解析 `.xmind` zip，不维护 theme 兼容规则，不读取 iframe DOM。
- 新增用户可见 viewer 行为时，应优先建立专门 controller，再由本模块组合暴露。
- 不恢复旧 `message-channel.ts` 门面；MessageChannel 细节只属于 `iframe-bridge.ts`。
