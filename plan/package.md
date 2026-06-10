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
- `pnpm format:viewer-assets`：格式化本地 XMind viewer 的全部 `javascripts/*.js`、Snowbrush、iframe 入口和调试入口。
- `pnpm check:local-viewer`：检查本地 viewer 快照中关键资源路径和中心主题修复是否存在。
- `pnpm debug:xmind`：启动本地 XMind 调试查看器。
- `pnpm package`：构建并生成发布 zip。
- `pnpm release`：当前等同于 `pnpm package`。
- `pnpm deploy:prod`：生产发布命令，要求工作区干净，然后依次运行本地 viewer 回归检查、源码 lint、patch 版本号递增、发布 zip 打包、提交版本变更、创建同名 tag，并推送分支与 tag。

## 依赖约束

- 项目使用 pnpm，不再维护 yarn 配置或 yarn lock。
- 插件运行时不依赖 `xmind-embed-viewer` npm 包，iframe 渲染代码来自 `src/xmind-viewer-assets/` 中的本地源码资产，并在构建时内联进 `main.js`。
- 本地 viewer 的通用三方 JS 通过 `dependencies` 安装并打包：`jquery@3.2.1`、`js-cookie@2.2.0`、`popper.js@1.12.9`、`bootstrap@4.0.0-beta.2`、`vue@2.7.14`。
- `share-embed`、动态 chunk、`snowbrush.js`、图片、动画和 XMind 样式仍来自本地快照，因为这些属于 XMind 渲染资产或本地修复代码，不能替换为官方 `xmind-embed-viewer` wrapper。
- Obsidian 安装产物必须只依赖 `main.js`、`manifest.json`、`styles.css` 三个标准文件。

## 发布约束

发布前至少运行 `pnpm deploy:prod`。该命令会覆盖本地 viewer 回归检查、源码 lint、patch 版本号递增、生产构建、zip 打包、版本提交和 tag 推送。zip 产物写入 `release/`，不提交到源码仓库。GitHub Release 由远端 tag push 触发的 workflow 创建。

## README 维护口径

- `README.md` 是英文主 README。
- `README.zh-CN.md` 是中文 README。
- 两份 README 使用 `XMind Maps` 作为项目展示名称。
- 两份 README 的功能说明使用简洁单句：在 Obsidian vault 中直接打开 `.xmind` 文件，以只读模式查看脑图，支持缩放、适配画布和查看控件。
- 两份 README 不维护安装、限制、使用、开发和发布章节。
