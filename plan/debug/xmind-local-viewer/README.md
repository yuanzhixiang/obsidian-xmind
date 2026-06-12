# XMind 本地调试页

## 页面定位

本调试页用于排查源码版本地 XMind 只读渲染链路。页面加载 `src/xmind-viewer/index.ts` 打出的源码 viewer，不再加载旧 embed-viewer HTML、iframe app 或 `share-embed` bundle。

## 用户流程

- 开发者运行 `pnpm debug:xmind`。
- 调试服务器提供 `debug/xmind-local-viewer/index.html`。
- 页面从 `/debug-runtime/xmind-viewer.js` 获取源码 viewer 调试 bundle。
- 页面启动时读取 `/debug-config.json` 展示当前默认文件路径。
- 页面默认读取 `/file.xmind`，通过 `loadLocalXMindFile()` 预处理后创建 `XMindRenderAdapter`。
- 开发者可以点击 `打开文件` 在浏览器内选择其它 `.xmind` 文件；所选文件通过 `File.arrayBuffer()` 本地读取，不上传到调试服务器。
- 页面右侧日志显示 `sheets-load`、`sheet-switch`、`zoom-change`、`map-ready` 等事件。
- 调试页不传入 `onSave`，不记录保存产物，不写本地文件。
- 顶部调试工具栏只保留只读查看所需控件：`打开文件`、`重新加载`、`适配画布`、缩放输入、`应用`、sheet 下拉。不得重新添加编辑抽屉或 topic/sheet/object 编辑按钮。
- 调试页静态 HTML 默认使用英文文案，并通过 `data-i18n`、`data-i18n-placeholder`、`data-i18n-aria-label` 标记所有用户可见控件。`app.js` 复用源码 viewer 稳定入口导出的 i18n 函数，根据 `?lang=zh-CN` / `?lang=en` 调试参数、`localStorage.language`、HTML `lang` 或浏览器语言切换英文/简体中文。

## 交互和状态

- `打开文件` 会销毁旧 viewer，读取浏览器选择的 `.xmind` 文件并立即渲染。
- `重新加载` 会销毁旧 viewer，并重新读取当前激活文件；当前激活文件可能是启动参数指定的默认文件，也可能是页面内选择的本地文件。
- `适配画布` 调用 `viewer.fitMap()`。
- 缩放输入和 `应用` 调用 `viewer.zoom()`。
- Sheet 下拉调用 `viewer.switchSheet()`。
- 调试页创建 `XMindRenderAdapter` 时必须传入当前 locale，确保 viewer 内工具栏、大纲、搜索和 SVG aria 文案与调试页外壳语言一致。
- 错误会写入事件日志并把状态点标红。

## 约束

- 本调试页不访问远程 `xmind.app/embed-viewer`。
- 本调试页不使用 iframe、MessageChannel 或动态脚本注入。
- 本调试页不暴露复制、剪切、粘贴、新增、删除、重命名、样式、标签、备注、链接、marker、task、boundary、summary、callout 或 relationship 编辑控件。
- 调试样式应避免 Obsidian 官方 CSS lint 不支持的浏览器特性。
- `body`、`.shell`、`.toolbar`、`.workspace` 和 `.controls` 必须保留 `min-width: 0` / `overflow` 约束，防止工具栏按钮和输入框的 intrinsic width 造成页面级横向滚动。
- 调试按钮必须保留 `white-space: nowrap`，避免中文按钮文案在窄按钮内拆成竖排。
