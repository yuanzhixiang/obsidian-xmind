# XMind 插件入口

## 功能定位

`x-mind-viewer-plugin.ts` 是 Obsidian 插件入口类，负责注册 `.xmind` 文件视图，并接管 Markdown 中 `![[*.xmind]]` 的原生 embed 语法。

## 关键行为

- `onload()` 注册 `XMIND_VIEW_TYPE` 对应的 `XMindViewerView`。
- `onload()` 通过 `registerExtensions(['xmind'], XMIND_VIEW_TYPE)` 让 vault 内 `.xmind` 文件直接打开 viewer。
- `onload()` 通过 `registerMarkdownPostProcessor()` 支持 Obsidian 阅读视图里的原生 embed 语法 `![[文件名.xmind]]`。post processor 优先处理 Obsidian 已生成的 internal/file embed DOM，也要识别仍保留为原始文本的独立 `![[*.xmind]]` 段落；不改写普通 `[[文件名.xmind]]` 链接。
- `onload()` 通过 `registerEditorExtension()` 注册 CodeMirror Live Preview widget，支持编辑态/实时预览中的 `![[文件名.xmind]]`。Live Preview 不依赖 `.internal-embed` / `.file-embed` DOM，因为该场景由 CodeMirror 装饰层渲染，不能只靠 Markdown post processor。
- Live Preview widget 只在 `editorLivePreviewField === true` 时接管独占一行的 `![[*.xmind]]` 文本；即使光标位于该行，也应优先显示 XMind viewer，避免用户看到默认附件卡片。
- embed 解析必须兼容 Obsidian 默认附件卡片结构：除了读取 embed 容器自身的 `src`、`data-src`、`data-path`、`href` 等属性，也要读取子级 `a.internal-link` / `a[href]` / `data-href` 等链接元素和文件名文本，避免 `.xmind` 附件只显示默认文件卡片。
- embed 解析优先使用 `metadataCache.getFirstLinkpathDest(linkText, ctx.sourcePath)`，因此支持同目录相对链接、vault 内路径和 Obsidian 的链接解析规则；如果上下文路径不可用或 Obsidian 没有解析到文件，允许按 vault 内唯一 `.xmind` 文件名兜底匹配。
- embed 渲染由 `XMindMarkdownEmbedRenderer` 继承 `MarkdownRenderChild` 管理生命周期，阅读视图重渲染、切换文件或删除 embed DOM 时必须销毁对应 `XMindRenderAdapter`。
- Live Preview embed 由 `XMindLivePreviewEmbedWidget` 管理生命周期；CodeMirror 销毁 widget 时必须销毁对应 `XMindRenderAdapter`。
- embed 使用 `app.vault.readBinary(file)` 读取 `.xmind` 二进制，并复用 `loadLocalXMindFile()` 与 `XMindRenderAdapter`，不加载远程 iframe，也不把 `.xmind` 当 Markdown 文本打开。
- embed 是只读 viewer，不提供编辑或保存入口，不创建 `.bak` 备份，也不调用 vault 写入 API。
- 插件不再维护 iframe、Blob URL 或本地 viewer 资产回收逻辑。

## 组合关系

- 视图实现位于 `src/core/x-mind-viewer-view.ts`。
- viewer 运行逻辑由 `src/xmind-viewer/` 的直接源码模块承担。
- XMind 文件的 pane menu 行为由 `XMindViewerView.onPaneMenu()` 维护，插件入口只负责注册视图和扩展名。
- Markdown embed 只在插件入口层解析 Obsidian embed DOM，然后把真实渲染交给 `src/xmind-viewer/` 稳定入口导出的 API。

## 限制

该入口不直接解析 `.xmind` 文档结构，只负责读取 vault 二进制并传给源码 viewer；不处理 MessageChannel，也不加载远程 `xmind.app/embed-viewer`。插件入口不得调用 `createBinary()`、`modifyBinary()` 或其它 vault 写入 API 修改 `.xmind` 文件。

## 历史排障

### Live Preview 中 `![[*.xmind]]` 没有被替换

2026-06-12 排查过一次 Markdown 笔记里的 `![[202606101441 搞到钱再说.xmind]]` 仍显示为 Obsidian 默认附件卡片的问题。根因是截图处于 Obsidian Live Preview/编辑态，原实现只注册 `registerMarkdownPostProcessor()`，只能稳定处理阅读视图里的 `.internal-embed` / `.file-embed` DOM，不能接管 CodeMirror Live Preview 装饰层。

当前口径是同时保留两条路径：阅读视图使用 `MarkdownRenderChild` 和 post processor；Live Preview 使用 `registerEditorExtension()`、`editorLivePreviewField`、`editorInfoField` 和 `Decoration.replace()`，只在独占一行的 `![[*.xmind]]` 语法上替换为 `XMindLivePreviewEmbedWidget`。Live Preview 不再因为光标或选区位于 embed 语法内部而跳过替换；需要编辑链接时可以切换源代码模式或删除 widget 后重新输入。

### `reading 'config'` toast 来源判断

同日也排查过 `Cannot read properties of undefined (reading 'config')` toast。`xmind-maps` 当前产物不包含 `getConfig()` 调用；当时 vault 中仍有 `code-styler`、`query-control`、`templater-obsidian` 等其它插件调用 `app.vault.getConfig()`，它们可能在第三方插件 reload 或编辑器渲染时触发同款 toast。后续如果再次出现该 toast，应先在目标 vault 的全部第三方插件产物中搜索 `getConfig(`，不要默认归因到 XMind viewer。
