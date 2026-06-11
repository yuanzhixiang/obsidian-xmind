# Rollup 构建配置

## 功能定位

Rollup 负责把 Obsidian 插件源码打包成 CommonJS 插件入口，并把 `src/xmind-viewer/native-viewer-app.ts` 源码 iframe app 内联进 `main.js`。项目不再保留历史 `src/xmind-viewer-assets/` 编译产物目录。

## 构建口径

- 开发构建输出到 `test-vault/.obsidian/plugins/xmind-maps`。
- 生产构建输出到 `dist/`。
- `obsidian` 和 `electron` 保持 external，不打入插件 bundle。
- TypeScript、Node resolve、CommonJS、JSON 插件用于处理源码依赖。
- `inline-assets` 插件只处理 `?raw`、`?dataurl` 和 `?appbundle` 导入。
- `?appbundle` 用于把 `src/xmind-viewer/native-viewer-app.ts` 及其 TypeScript 源码依赖打成 iframe 可直接执行的 IIFE。正式 viewer 主路径必须走该源码 app bundle。
- 旧 `?bundle` package runtime 和 `?xmindchunk` Rollup 查询已经移除，不再恢复旧 webpack chunk 拼接入口。
- 构建开始前必须清理输出目录，避免已删除的旧远程快照文件残留进 `dist/` 或开发插件目录。

## 本地资源交付

- 开发和生产构建只复制 `styles.css`、`manifest.json`，开发构建额外复制 `.hotreload`。
- `src/xmind-viewer-assets/` 已删除，构建输入只能来自源码 viewer 和明确的 package 依赖。
- 如果新增源码 viewer 依赖，优先通过 TypeScript import 和 package 依赖进入 `native-viewer-app.ts`，不要把新代码放回历史资产目录。

## 发布约束

- 生产构建会压缩插件主 bundle。
- 发布资产必须保持 Obsidian 标准三件套可安装：`main.js`、`manifest.json`、`styles.css`。
- `bundle-analysis.html` 仅作为分析产物，不进入发布 zip。
