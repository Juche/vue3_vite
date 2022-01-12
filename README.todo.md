# README.todo

## List

### 测试

```sh
# https://v3.cn.vuejs.org/guide/testing.html
# https://next.vue-test-utils.vuejs.org/guide/
pnpm add -D @vue/test-utils jest ts-jest @types/jest
```

### 前端代码风格自动化--Husky/Commitlint/Lint-staged/Prettier

- 代码风格 `lint`

```sh
# "eslint": "^8.5.0",
# "eslint-config-prettier": "^8.3.0",
# "eslint-define-config": "^1.2.1",
# "eslint-plugin-jest": "^25.3.2",
# "eslint-plugin-prettier": "^4.0.0",
# "eslint-plugin-vue": "^8.2.0",
# "@typescript-eslint/eslint-plugin": "^5.8.1",
# "@typescript-eslint/parser": "^5.8.1",

pnpm add -D eslint eslint-config-prettier eslint-define-config eslint-plugin-jest eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser

pnpm add -D prettier

# "stylelint": "^14.2.0",
# "stylelint-config-html": "^1.0.0",
# "stylelint-config-prettier": "^9.0.3",
# "stylelint-config-recommended": "^6.0.0",
# "stylelint-config-standard": "^24.0.0",
# "stylelint-order": "^5.0.0",

pnpm add -D stylelint stylelint-config-html stylelint-config-prettier stylelint-config-recommended stylelint-config-standard stylelint-order

"postcss": "^8.4.5",
"postcss-html": "^1.3.0",
"postcss-less": "^5.0.0",

pnpm add -D postcss postcss-html postcss-less
```

- 代码提交规范

```sh
# "husky": "^7.0.4",
# "lint-staged": "12.1.4",

pnpm add -D husky lint-staged

# "commitizen": "^4.2.4",
# "@commitlint/cli": "^16.0.1",
# "@commitlint/config-conventional": "^16.0.0",

pnpm add -D commitizen @commitlint/cli @commitlint/config-conventional
```

### 打包

### 扫文档(jsx/异步组件/测试...)

### 多项目资源公用 `lerna`

### 数据可视化

- amap
- echarts
- three https://threejs.org/docs/index.html#manual/zh
- cesium https://zouyaoji.gitee.io/vue-cesium/#/zh-CN/component

```sh
# https://zhuanlan.zhihu.com/p/34217817
# https://www.cnblogs.com/fuckgiser/p/5706842.html
# https://github.com/wangfeilong321/ExamplesforCesium
# https://github.com/CesiumGS/cesium/releases/download/1.89/Cesium-1.89.zip
```

----

## 一些思考

- 主题配色

```js
const purred = {
  50: '#ff000011',
  100: '#ff000022',
  200: '#ff000033',
  300: '#ff000044',
  400: '#ff000055',
  500: '#ff000077',
  600: '#ff000099',
  700: '#ff0000bb',
  800: '#ff0000dd',
  900: '#ff0000ff',
};

// 可以直接使用 颜色值 & 透明度的组合方式来生成主题色
```

- 动画

块翻转扫描翻页加载动画占位元素/动画

----

[链接]CSS 开发快速提升技巧 https://mp.weixin.qq.com/s/r-S8iu8zRd8ari7d5spLgg

[链接]我曾为 TS 类型编程感到痛不欲生，直到我遇到了这份体操指南 https://mp.weixin.qq.com/s/9bNcLzARxEAhictRUDE4nQ

[链接]2021 年 JavaScript 明星项目公布，最受欢迎的竟是它？ https://mp.weixin.qq.com/s/SpPcKEHnaGtQEkgv08V6Sg

[链接]如何优雅简洁地实现时钟翻牌器 https://cloud.tencent.com/developer/article/1551685?from=15425
