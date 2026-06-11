# 静态资源类型声明

## 功能定位

`src/typing/assets.d.ts` 为 Rollup 自定义资源查询提供 TypeScript 模块声明。

## 查询类型

- `?raw`：把文本资源作为字符串导入。
- `?dataurl`：把二进制或小图片资源作为 Data URL 字符串导入。

## 约束

- 新增 Rollup 资源查询时必须同步更新本文件。
- 类型声明只描述构建输入形态，不改变运行时资源加载协议。
- 旧 `?bundle`、`?appbundle` 和 `?xmindchunk` 查询已经移除，不得重新用于正式 viewer 主路径。
