# GitHub Release 工作流

## 功能定位

该工作流在推送形如 `x.y.z` 的 tag 时自动构建 Obsidian 插件并创建 GitHub Release。

## 触发规则

- 只响应 tag push。
- tag 格式为 `*.*.*`。
- tag 必须与 `manifest.json` 和 `package.json` 中的 `version` 完全一致。
- Obsidian 官方社区插件要求 tag 与 manifest 版本一致，因此不要使用 `v0.1.0` 这类带 `v` 前缀的 tag。

## 核心流程

- 使用 pnpm 10.22.0 安装依赖。
- 使用 Node.js 22 构建。
- 执行 `pnpm install --frozen-lockfile`，确保 CI 依赖与 `pnpm-lock.yaml` 一致。
- 执行 `pnpm check:local-viewer`，确认本地 XMind viewer 的关键补丁仍存在。
- 执行 `pnpm lint`。
- 执行 `pnpm package`，生成 `dist/` 标准资产和 `release/xmind-viewer-{version}.zip`。
- 使用 `gh release create` 创建 GitHub Release。

## Release 资产口径

- `dist/main.js`：Obsidian 官方安装器需要的插件入口。
- `dist/manifest.json`：Obsidian 官方安装器需要的插件 manifest。
- `dist/styles.css`：Obsidian 官方安装器可选下载的样式文件。
- `release/xmind-viewer-{version}.zip`：包含本地 XMind viewer 目录的手动安装包。

## 已知限制

Obsidian 官方社区插件安装器只下载 `main.js`、`manifest.json` 和 `styles.css`，不会自动下载额外目录。当前本地 XMind viewer 依赖 `xmind-embed-viewer-remote/` 目录，因此官方社区插件分发仍需进一步把 viewer 资产打进 `main.js` 或改成官方安装器可获取的资源形态。zip 资产适合手动安装。
