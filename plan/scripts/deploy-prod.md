# 生产发布脚本

## 功能定位

`scripts/deploy-prod.mjs` 是 `pnpm deploy:prod` 的一键生产发布入口，用于完成本地校验、版本号递增、打包、提交、打 tag 和推送。

## 前置条件

- 工作区必须干净，避免把未确认代码混入 release commit。
- `package.json` 与 `manifest.json` 的版本号必须保持一致。
- 当前版本对应的本地 tag 不得已经存在。

## 处理流程

- 检查 git 工作区是否干净。
- 运行 `pnpm check:local-viewer`。
- 运行 `pnpm lint`。
- 调用 `scripts/bump-version.mjs` 递增 patch 版本。
- 读取新版本号。
- 运行 `pnpm package` 生成发布 zip。
- 只 stage `package.json` 和 `manifest.json`。
- 创建 `chore: release {version}` 提交。
- 创建 `{version}` tag。
- 推送当前分支到 `origin`。
- 推送 `{version}` tag 到 `origin`，触发 GitHub Release workflow。

## 错误和边界

- 检查、lint 或打包失败时不得创建 commit 或 tag。
- 版本递增后如果打包失败，会保留本地版本号变更，方便开发者检查原因后手动处理。
- 脚本只推送版本 commit 和 tag，不直接调用 GitHub Release API。
