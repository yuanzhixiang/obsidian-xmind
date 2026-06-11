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
- 执行 `pnpm check:local-viewer`。
- 执行 `pnpm lint`。
- 执行 `pnpm package`，生成 `dist/` 标准资产和本地手动安装 zip。
- 使用 `actions/attest-build-provenance` 为 `dist/main.js`、`dist/manifest.json`、`dist/styles.css` 生成 artifact attestations。
- 使用 `gh release create` 创建 GitHub Release。

## Release 资产口径

- GitHub Release 只上传 `dist/main.js`、`dist/manifest.json`、`dist/styles.css`。
- 不上传 `release/*.zip`，因为 Obsidian 官方安装器不会下载 zip，官方扫描会将其标记为 extra unsupported file。
- `pnpm package` 本地生成的 zip 只用于手动安装测试，不作为官方社区插件 release asset。

## 权限要求

- `contents: write` 用于创建 GitHub Release。
- `attestations: write` 和 `id-token: write` 用于生成 release asset provenance。
