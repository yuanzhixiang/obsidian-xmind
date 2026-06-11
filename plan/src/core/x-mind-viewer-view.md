# XMind 文件视图

## 页面定位

该视图是 Obsidian 打开 `.xmind` 文件时使用的文件视图，负责读取 vault 内文件二进制，并把渲染工作交给打包在 `main.js` 内的本地 XMind viewer iframe。

## 用户流程

- 用户在 Obsidian 中打开 `.xmind` 文件。
- 视图通过 `app.vault.readBinary(file)` 读取文件内容。
- 视图调用 `loadLocalXMindFile()` 对内存副本执行本地兼容预处理，并保留源码层 workbook 元数据提取入口。
- 视图通过 `getInlineXMindViewerUrl()` 获取内联 viewer 的 Blob URL。
- 视图创建 `XMindRenderAdapter`，将文件二进制通过源码 viewer 门面发送给 iframe。
- 以上 viewer API 均从 `src/xmind-viewer/index.ts` 稳定入口导入，视图不直接依赖 viewer 内部子模块。
- 用户切换或关闭文件时，旧 iframe 和 MessagePort 必须销毁。

## 信息架构与主要交互

- 视图本身不提供额外工具栏，保持 Obsidian 文件视图的纯渲染体验。
- iframe 内部提供 XMind viewer 自带的缩放、全屏等只读控件。
- 视图标题显示当前文件 basename，便于 Obsidian 标签页识别。

## 加载、空态和错误态

- 未加载文件时显示 `No file open`。
- 加载文件时由 iframe 内部处理 XMind viewer 的加载态。
- 本地 iframe 加载失败、MessageChannel 超时或 `open-file` 失败时，视图展示中文错误态，避免出现无反馈白屏。
- `.xmind` 预处理失败时返回原始二进制，不单独阻断渲染。

## 权限态与安全约束

- 只读取当前 vault 中用户显式打开的 `.xmind` 文件。
- iframe URL 必须来自本地生成的 Blob URL，不得回退到 `https://www.xmind.app/embed-viewer`。
- Obsidian 正式安装只保证 `main.js`、`manifest.json`、`styles.css` 三个发布资产可用，视图不得依赖插件目录中的额外资源目录。
- 文件二进制只在本地 Obsidian WebView 与本地 iframe 之间传递。
- 预处理只修改传入 iframe 的内存副本，不写回 vault 文件。

## 响应式行为

- iframe 宽高固定为视图容器的 `100%`。
- 视图加载前必须把 `contentEl` 设置为可伸缩的 `flex` 容器，防止 iframe 在 Obsidian 文件视图中高度塌陷。
- 视图不改变 Obsidian 工作区布局，由 XMind viewer 自己处理画布适配。
