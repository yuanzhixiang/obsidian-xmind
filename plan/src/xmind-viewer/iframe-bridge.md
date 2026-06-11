# Iframe 通信桥

## 组件职责

`iframe-bridge.ts` 负责创建本地 XMind viewer iframe、建立 `MessageChannel`、维护请求/回复超时、转发 viewer 事件和销毁 MessagePort。它是 Obsidian 外层视图与 iframe 内 viewer 协议之间的源码级通信边界。

## 输入输出

- 输入：挂载容器、viewer URL、iframe 样式、握手超时、命令回复超时和握手重试间隔。
- 输出：可复用的 `emit(command, payload)` 命令发送能力、`onViewerEvent` 事件回调，以及 `destroy()` 资源释放能力。

## 协议行为

- iframe `load` 后发送 `setup-channel`，并通过 transferable 传入 `MessagePort`。
- 收到 `channel-ready` 后保存 port，后续命令才允许发送。
- 每条命令带 `xmind-local-viewer#<index>` reply id。
- 命令 30 秒无回复时抛出 `XMindViewerError`。
- iframe 发回的 `event` 消息由 `viewer-events.ts` 解析，并通过 `onViewerEvent` 交给上层状态模型。
- 握手期间每 250ms 重试一次，直到成功、销毁或 30 秒超时。

## 边界约束

- 本模块不解析 `.xmind`，不理解 sheet、zoom 或 XMind 渲染语义。
- 本模块不生成 iframe HTML，不创建 Blob 资源。
- iframe 端协议仍暂时由 `share-embed` 兼容资产提供；后续重建 iframe 端源码时，应优先对齐本模块暴露的协议常量。
