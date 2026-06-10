# Obsidian 插件 Manifest

## 功能定位

`manifest.json` 是 Obsidian 插件元数据文件，用于声明插件 id、名称、版本、最低 Obsidian 版本、作者、作者链接、描述和桌面端限制。

## 元数据口径

- `id` 保持 `xmind-viewer`。
- `name` 保持 `XMind Viewer`。
- `version` 必须与 `package.json` 保持一致。
- `author` 使用 `yuanzhixiang`。
- `authorUrl` 使用 `https://github.com/yuanzhixiang`。
- `description` 使用英文短句，描述插件真实能力：在 Obsidian 内查看本地 XMind 文件。

## 维护规则

- 发布前由 `pnpm deploy:prod` 自动递增版本号并提交。
- 修改插件展示名称、作者或描述时，必须同步检查 `package.json` 和 README。
