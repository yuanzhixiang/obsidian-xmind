# Package 配置

## 功能定位

`package.json` 定义项目的 pnpm 包管理、开发命令、构建命令、发布命令和依赖清单。

## 命令口径

- `pnpm dev`：启动 Rollup watch 和 Obsidian 测试 vault。
- `pnpm build`：生成生产 `dist/`。
- `pnpm lint`：检查 `src/` TypeScript 源码。
- `pnpm format:vendor`：格式化本地下载的 XMind viewer 核心代码和调试入口。
- `pnpm check:local-viewer`：检查本地 viewer 快照中关键资源路径和中心主题修复是否存在。
- `pnpm debug:xmind`：启动本地 XMind 调试查看器。
- `pnpm package`：构建并生成发布 zip。
- `pnpm release`：当前等同于 `pnpm package`。

## 依赖约束

- 项目使用 pnpm，不再维护 yarn 配置或 yarn lock。
- 插件运行时不依赖 `xmind-embed-viewer` npm 包，iframe 渲染代码来自本地 `vendor/xmind-embed-viewer-remote` 快照。

## 发布约束

发布前至少运行 `pnpm lint`、`pnpm check:local-viewer`、`pnpm build` 和 `pnpm package`。zip 产物写入 `release/`，不提交到源码仓库。
