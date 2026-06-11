# ESLint 配置

## 功能定位

`eslint.config.js` 定义本仓库源码 lint 规则，用于 `pnpm lint` 检查 `src/` 下的 TypeScript 源码。

## 维护口径

- 配置文件继续使用 ESLint flat config。
- TypeScript parser 来自 `@typescript-eslint/parser`，用于解析 `.ts` 和 `.tsx` 文件。
- parser 赋值处保留带原因说明的 inline lint directive，避免官方社区插件扫描把配置文件自身的无类型导入识别为 `no-unsafe-assignment` 噪音，同时满足 directive 必须说明用途的要求。
- JS 配置块也注册 `@typescript-eslint` 插件，让手动 lint 配置文件时能识别该 directive 指向的规则名。

## 限制

该配置只服务本仓库开发检查，不参与 Obsidian 插件运行时。运行时行为约束由 `src/` 源码、`styles.css` 和 release workflow 负责。
