# XMind 文件视图

## 页面定位

该视图是 Obsidian 打开 `.xmind` 文件时使用的文件视图，负责读取 vault 内文件二进制，并把渲染工作交给本地 XMind viewer iframe。

## 用户流程

- 用户在 Obsidian 中打开 `.xmind` 文件。
- 视图通过 `app.vault.readBinary(file)` 读取文件内容。
- 视图生成插件目录中 `xmind-embed-viewer-remote/local/embed-viewer.html` 的资源 URL。
- 视图创建 `LocalXMindEmbedViewer`，将文件二进制通过 MessageChannel 发送给 iframe。
- 用户切换或关闭文件时，旧 iframe 和 MessagePort 必须销毁。

## 信息架构与主要交互

- 视图本身不提供额外工具栏，保持 Obsidian 文件视图的纯渲染体验。
- iframe 内部提供 XMind viewer 自带的缩放、全屏等只读控件。
- 视图标题显示当前文件 basename，便于 Obsidian 标签页识别。

## 加载、空态和错误态

- 未加载文件时显示 `No file open`。
- 加载文件时由 iframe 内部处理 XMind viewer 的加载态。
- 本地 iframe 加载失败或 MessageChannel 超时属于渲染失败，当前不在视图层展示额外错误面板。

## 权限态与安全约束

- 只读取当前 vault 中用户显式打开的 `.xmind` 文件。
- iframe URL 必须来自插件目录内的本地资源，不得回退到 `https://www.xmind.app/embed-viewer`。
- 文件二进制只在本地 Obsidian WebView 与本地 iframe 之间传递。

## 响应式行为

- iframe 宽高固定为视图容器的 `100%`。
- 视图不改变 Obsidian 工作区布局，由 XMind viewer 自己处理画布适配。
