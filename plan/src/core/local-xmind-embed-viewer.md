# 本地 XMind Embed Viewer Adapter

## 组件职责

该 adapter 在 Obsidian 视图中创建本地 iframe，并复用 XMind embed viewer 的 MessageChannel 协议完成 `.xmind` 文件打开、缩放、适配画布和 sheet 切换。

## 使用场景

- `XMindViewerView` 打开 vault 内 `.xmind` 文件时创建实例。
- 文件切换或视图卸载时调用 `destroy()` 清理 iframe 和 MessagePort。

## 输入与状态

- `el`：承载 iframe 的 DOM 容器。
- `file`：通过 Obsidian vault 读取到的 `.xmind` ArrayBuffer。
- `viewerUrl`：插件目录内本地 `embed-viewer.html` 的资源 URL。
- `styles`：iframe 的 CSS 覆盖，默认保持宽高 100%、无边框。

## 交互状态

- 初始化后等待 iframe `load` 事件，并发送 `setup-channel`。
- 收到 `channel-ready` 后发送 `open-file`。
- `emit()` 为每个命令生成 reply id，30 秒未响应视为超时。
- `destroy()` 后不再发送命令，并关闭 MessagePort。

## 边界状态

- iframe 不可用、channel 超时或命令超时时，Promise 会 reject；当前视图层不额外展示 UI。
- `open-file` 失败会被吞掉，避免 Obsidian 出现未处理 Promise。
- adapter 不解析 `.xmind`，文件兼容修复位于本地下载的 `share-embed` bundle 内。

## 组合关系

- adapter 只负责 Obsidian 外壳与 iframe 通讯。
- XMind 文件解析、渲染、资源加载和中心主题兼容修复由 `vendor/xmind-embed-viewer-remote` 中的本地 iframe 代码完成。
