# Rollup 构建配置

## 功能定位

Rollup 负责把 Obsidian 插件源码打包成 CommonJS 插件入口。正式 viewer 现在直接由 `src/xmind-viewer/` 源码进入主 bundle，不再把 iframe app 打成字符串，也不再生成 Blob HTML。

## 构建口径

- 开发构建输出到 `test-vault/.obsidian/plugins/xmind-maps`。
- 生产构建输出到 `dist/`。
- `obsidian`、`electron`、`@codemirror/*` 和 `@lezer/*` 保持 external，不打入插件 bundle。
- Live Preview 的 `![[*.xmind]]` 扩展必须使用 Obsidian 运行时自带的 CodeMirror 实例；如果把 `@codemirror/state` 或 `@codemirror/view` 打进 `main.js`，Obsidian 会因为多实例 `instanceof` 检查失败而无法打开普通 Markdown 文件。
- TypeScript、Node resolve、CommonJS、JSON 插件用于处理源码依赖。
- `inline-assets` 插件只保留 `?raw` 和 `?dataurl` 查询能力。
- 旧 `?bundle`、`?appbundle` 和 `?xmindchunk` Rollup 查询已经移除，不得恢复。
- 构建开始前必须清理输出目录，避免已删除的旧远程快照文件残留进 `dist/` 或开发插件目录。

## 本地资源交付

- 开发和生产构建只复制 `styles.css`、`manifest.json`，开发构建额外复制 `.hotreload`。
- `src/xmind-viewer-assets/` 已删除，构建输入只能来自源码 viewer 和明确的 package 依赖。
- 如果新增源码 viewer 依赖，优先通过 TypeScript import 和 package 依赖进入源码模块，不要把新代码放回历史资产目录。

## 发布约束

- 生产构建会压缩插件主 bundle。
- 发布资产必须保持 Obsidian 标准三件套可安装：`main.js`、`manifest.json`、`styles.css`。
- `bundle-analysis.html` 仅作为分析产物，不进入 GitHub Release。

## 历史排障

### CodeMirror 多实例导致 Obsidian 无法打开文件

2026-06-12 排查过一次安装插件后 Obsidian 打开任意文件失败的问题，报错为 `Unrecognized extension value in extension set ([object Object])`，并提示可能加载了多个 `@codemirror/state` 实例。

根因是 Live Preview `![[*.xmind]]` editor extension 使用 `@codemirror/state` 和 `@codemirror/view` 创建扩展对象，但当时 Rollup 没有把 `@codemirror/*` 标记为 external，导致 `dist/main.js` 打进了一份独立 CodeMirror runtime。Obsidian 编辑器使用自身内置 CodeMirror 解析扩展集合时，遇到另一份 runtime 创建的扩展对象，`instanceof` 检查失败，最终普通 Markdown 文件也无法打开。

修复口径是：`rollup.config.mjs` 的 external 必须覆盖 `obsidian`、`electron`、`@codemirror/*` 和 `@lezer/*`；`@codemirror/state` 和 `@codemirror/view` 只能作为开发依赖存在。验证产物时，`dist/main.js` 不应包含 `Unrecognized extension value` 或 `A document must have at least one line` 等 CodeMirror 内部源码文本，只应保留 `require("@codemirror/state")` 和 `require("@codemirror/view")`。
