# XMind 文件视图

## 页面定位

该视图是 Obsidian 打开 `.xmind` 文件时使用的文件视图，负责读取 vault 内文件二进制，并把渲染工作交给 `src/xmind-viewer/` 的直接源码 viewer。

## 用户流程

- 用户在 Obsidian 中打开 `.xmind` 文件。
- 视图通过 `app.vault.readBinary(file)` 读取文件内容。
- 视图调用 `loadLocalXMindFile()` 对内存副本执行本地兼容预处理，并保留源码层 workbook 元数据提取入口。
- 视图创建 `XMindRenderAdapter`，把 `contentEl` 和文件二进制交给源码 viewer 直接渲染。
- 以上 viewer API 均从 `src/xmind-viewer/index.ts` 稳定入口导入，视图不直接依赖 viewer 内部子模块。
- 用户切换或关闭文件时，旧 `XMindRenderAdapter` 必须销毁。

## 信息架构与主要交互

- 视图本身不提供额外 Obsidian 工具栏，保持文件视图的纯渲染体验。
- viewer 内部提供缩放、适配画布和 sheet 标签等只读控件。
- 视图标题显示当前文件 basename，便于 Obsidian 标签页识别。
- 视图的 pane menu 使用 Obsidian 默认菜单渲染方式，不强制改成插件自绘 DOM 菜单。
- 视图的 pane menu 隐藏 Obsidian 默认的 `Split right` 和 `Split down` 项，避免 XMind 只读 viewer 暴露不需要的分栏入口。
- 视图的 pane menu 补齐文件操作：
    - `Copy path`：优先使用 Obsidian 运行时支持的 submenu，包含 `as Obsidian URL`、`from vault folder`、`from system root`；如果运行时不支持 submenu，则顶层 `Copy path` 复制 vault 相对路径。
- XMind pane menu 打开时，`Command+W`/`Ctrl+W` 只关闭菜单并阻止默认标签页关闭行为。
- `onPaneMenu()` 的 `source` 参数按 Obsidian 运行时传入字符串处理；不在本地声明 `literal | string` 冗余 union，避免官方源码扫描产生覆盖告警。

## 加载、空态和错误态

- 未加载文件时显示 `No file open`。
- 加载文件时由 `XMindRenderAdapter` 处理读取和渲染状态。
- 解析或渲染失败时，视图展示中文错误态，避免出现无反馈白屏。
- `.xmind` 预处理失败时返回原始二进制，不单独阻断渲染。

## 权限态与安全约束

- 只读取当前 vault 中用户显式打开的 `.xmind` 文件。
- 不访问 `https://www.xmind.app/embed-viewer` 或其它远程 viewer。
- Obsidian 正式安装只依赖 `main.js`、`manifest.json`、`styles.css` 三个发布资产。
- 文件二进制只在本地 Obsidian WebView 内处理。
- 预处理只修改传入 viewer 的内存副本，不写回 vault 文件。
- 不得把 `.xmind` 原文件交给 Obsidian markdown view 打开；Markdown 源码保存会把二进制 zip 当文本写回，破坏 XMind 文件。
- `Copy path` 只写入系统剪贴板，不上传路径；`from system root` 仅在 adapter 暴露 `getFullPath()` 时可用。

## 响应式行为

- `contentEl` 使用 `xmind-viewer-content` 类，由 `styles.css` 定义宽高、flex 和 overflow。
- 视图不直接写 `contentEl.style`，避免触发官方静态扫描规则。
- 视图不改变 Obsidian 工作区布局，由源码 viewer 自己处理画布适配。
