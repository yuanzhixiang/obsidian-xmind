# 源码版 Viewer App

## 组件职责

`native-viewer-app.ts` 是 iframe 内运行的源码版 XMind viewer。它实现与外层 Obsidian 视图一致的 MessageChannel 协议，接收 `.xmind` 文件，解析文档，渲染 SVG 脑图，并处理 sheet 切换、缩放和适配画布。

## 协议行为

- 接收 `setup-channel` 并返回 `channel-ready`。
- 接收 `open-file`，解析 ArrayBuffer 并渲染第一个 sheet。
- 接收 `fit-map`，按当前 canvas 尺寸适配脑图。
- 接收 `zoom`，按百分比设置缩放。
- 接收 `switch-sheet`，切换到指定 sheet。
- 发出 `sheets-load`、`sheet-switch`、`zoom-change` 和 `map-ready` 事件。

## UI 行为

- 主画布使用 SVG 渲染脑图。
- 左下角显示当前 sheet 名称。
- 右下角提供缩小、缩放值、放大和适配按钮。
- 渲染失败时在 iframe 内显示中文错误态，并通过 `map-ready: false` 通知外层。

## 边界

该模块是正式主路径，不得依赖 `src/xmind-viewer-assets/` 的旧 bundle。若需要三方能力，应通过 package 依赖和源码 import 接入；若需要补齐 XMind 行为，应优先扩展 `xmind-document.ts`、`renderer/layout.ts` 或 `renderer/svg-renderer.ts`。
