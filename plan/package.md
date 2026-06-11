# Package 配置

## 功能定位

`package.json` 定义项目的 pnpm 包管理、开发命令、构建命令、发布命令、作者信息、描述文案和依赖清单。

## 元数据口径

- `author` 使用 `yuanzhixiang`，与 `manifest.json` 的插件展示作者保持一致。
- `name` 使用 `xmind-maps`，与官方提交使用的 `manifest.json` 插件 id 对齐。
- `description` 使用英文短句 `View local XMind files.`，与 `manifest.json` 保持一致。
- 版本号必须与 `manifest.json` 保持一致，由 `pnpm deploy:prod` 自动递增 patch 版本。

## 命令口径

- `pnpm dev`：启动 Rollup watch 和 Obsidian 测试 vault。
- `pnpm build`：生成生产 `dist/`。
- `pnpm lint`：检查 `src/` TypeScript 源码。
- `pnpm format:viewer`：格式化源码 viewer、调试入口和检查脚本。
- `pnpm check:local-viewer`：检查正式 viewer 是否只走源码 app、关键协议是否存在、旧 assets 是否没有重新接入主路径。
- `pnpm debug:xmind`：启动本地 XMind 调试查看器。
- `pnpm package`：构建并生成发布 zip。
- `pnpm release`：当前等同于 `pnpm package`。
- `pnpm deploy:prod`：生产发布命令，要求工作区干净，然后依次运行本地 viewer 回归检查、源码 lint、patch 版本号递增、发布 zip 打包、提交版本变更、创建同名 tag，并推送分支与 tag。

## 依赖约束

- 项目使用 pnpm，不维护 npm/yarn lock。
- 插件运行时不依赖官方 `xmind-embed-viewer` npm 包。
- 正式 viewer 主路径来自 `src/xmind-viewer/native-viewer-app.ts?appbundle`，不再加载旧 `share-embed`、`73350`、`snowbrush.js` 或 package runtime。
- 当前运行依赖只保留 `jszip@3.10.1`，用于源码层读取 `.xmind` zip、提取 `content.json`、执行中心主题兼容修复，并生成传给 iframe 的内存副本。
- `src/xmind-viewer-assets/` 已删除，不再作为依赖来源、构建输入或调试入口。
- 新增三方能力时必须先判断是否属于正式源码 viewer 的真实运行依赖；只有被 `src/` 源码 import 的依赖才能进入 `dependencies`。
- Obsidian 安装产物必须只依赖 `main.js`、`manifest.json`、`styles.css` 三个标准文件。

## 发布约束

发布前至少运行 `pnpm deploy:prod`。该命令会覆盖本地 viewer 回归检查、源码 lint、patch 版本号递增、生产构建、zip 打包、版本提交和 tag 推送。zip 产物写入 `release/`，不提交到源码仓库。GitHub Release 由远端 tag push 触发的 workflow 创建。

## README 维护口径

- `README.md` 是英文主 README。
- `README.zh-CN.md` 是中文 README。
- 两份 README 使用 `XMind Maps` 作为项目展示名称。
- 两份 README 的功能说明使用简洁单句：在 Obsidian vault 中直接打开 `.xmind` 文件，以只读模式查看脑图，支持缩放、适配画布和查看控件。
- 两份 README 不维护安装、限制、使用、开发和发布章节。
