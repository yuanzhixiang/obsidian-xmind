# XMind Viewer 源码层

## 能力定位

`src/xmind-viewer/` 是本地 XMind viewer 的源码化入口，用于逐步替代历史下载快照里的编译后 glue code。该目录先承接资源装配、iframe HTML 生成、MessageChannel 适配和本地 `.xmind` 文件预处理；真正的 XMind 渲染引擎仍暂时由 `src/xmind-viewer-assets/` 中的兼容资产提供。

## 当前模块

- `index.ts`：对外提供内联 viewer Blob URL 的创建、缓存和回收。
- `resource-manifest.ts`：集中声明本地 viewer 必需的 CSS、JS chunk、图片和动画等资源。
- `asset-loader.ts`：把资源清单转换为 Blob/Data URL，并负责回收 URL。
- `viewer-globals.ts`：生成 iframe 内需要的 XMind 兼容全局变量、旧调度保护、分析空实现和 host shim。
- `embed-viewer.ts`：生成 iframe HTML 壳，组合样式、脚本 URL 和 `viewer-globals.ts` 输出的 bootstrap script。
- `iframe-bridge.ts`：创建 iframe，建立 Obsidian 视图到 iframe 的 MessageChannel，并提供请求/回复式命令发送能力。
- `viewer-events.ts`：集中维护 `setup-channel`、`channel-ready`、reply id 和 viewer 命令类型。
- `viewer-state.ts`：把 `map-ready`、`sheets-load`、`sheet-switch`、`zoom-change` 等 runtime 事件投影成源码层状态。
- `sheet-controller.ts`：维护 sheet 列表、当前 sheet 和 sheet 切换行为。
- `theme-loader.ts`：维护 `content.json` 中 XMind theme 的源码级兼容规则。
- `workbook-model.ts`：从 `content.json` 提取轻量 workbook/sheet 元数据。
- `file-loader.ts`：读取 `.xmind` zip，组合 workbook 元数据提取与 theme 兼容修复，并重新生成传给 iframe 的内存副本。
- `zoom-controller.ts`：维护当前缩放值、适配画布和设置缩放比例行为。
- `render-adapter.ts`：作为 viewer 外层门面，组合 iframe bridge、state、sheet controller 和 zoom controller。
- `errors.ts`：维护 viewer 错误类型和用户可见错误文案转换。
- `runtime.cjs`：声明 iframe 三方 runtime 的 package 脚本清单。

## 兼容层边界

- `share-embed.2d8410315a.js`、`73350.03dd088904.parts/`、语言 chunk、`snowbrush.js` 仍是编译后兼容资产，不能当作正常源码继续堆业务逻辑。
- `file-loader.ts` 和 `theme-loader.ts` 已经把中心主题颜色规范化迁到源码层；正式 Obsidian 视图和调试父页面都会在发送 `open-file` 前完成预处理，`share-embed` 内不得重新加入同类修复。
- 三方通用依赖必须优先通过 `package.json` 引入，不再从历史 viewer JS 文件中复制维护。

## 迁移口径

- 每次只迁移一层可独立验证的逻辑，迁移后必须保持 iframe 协议和用户行为不变。
- 低风险优先级：HTML/bootstrap、iframe bridge、render adapter、文件预处理、资源加载器、文件解析、渲染状态适配、最后才是图形渲染器。
- 对无法确认语义的编译后模块，保留兼容资产并在 plan 中记录后续替换点，不凭猜测重写。
- `src/core/` 中不再保留 viewer 兼容 re-export；Obsidian 视图和插件卸载逻辑必须直接导入 `src/xmind-viewer/`。

## 验证要求

涉及本目录的改动至少运行 `pnpm check:local-viewer`、`pnpm lint`、`pnpm build`。涉及 iframe 行为或 `.xmind` 预处理时，还要运行 `pnpm debug:xmind`，确认 `map-ready` 正常、中心主题可见、缩放、适配画布和 sheet 切换可用，浏览器 console 无错误。
