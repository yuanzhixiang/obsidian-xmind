# 版本号递增脚本

## 功能定位

`scripts/bump-version.mjs` 用于生产发布流程中自动递增 patch 版本号，并保持 `package.json` 与 `manifest.json` 一致。

## 输入和输出

- 输入：仓库根目录的 `package.json`、`manifest.json`。
- 输出：两个文件中的 `version` 字段同步更新为下一个 patch 版本。

## 处理流程

- 读取 `package.json` 和 `manifest.json`。
- 校验两个文件当前版本号完全一致。
- 校验版本号格式为 `major.minor.patch`。
- 将 patch 位加 1。
- 使用 4 空格 JSON 格式写回两个文件。

## 错误和边界

- 两个版本号不一致时必须失败，避免发出 manifest 与 package 不一致的版本。
- 非三段式语义版本号必须失败。
- 该脚本只负责本地文件版本号，不创建 git tag，不上传 GitHub Release。
