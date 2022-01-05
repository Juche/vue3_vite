# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


## 代码管理

### 项目 Git 设置:

```sh
git config user.name "Juching"
git config user.email "azhucheng1@qq.com"
```

### 创建 git 仓库:

```sh
mkdir vue3_vite
cd vue3_vite
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/juching/vue3_vite.git
git push -u origin "master"
```

### 已有仓库?

```sh
cd existing_git_repo
git remote add origin https://gitee.com/juching/vue3_vite.git
git push -u origin "master"
```

### Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

---

## 添加项目依赖

### tailwind css

```sh
# https://www.tailwindcss.cn/docs/installation
# https://www.tailwindcss.cn/docs/guides/vue-3-vite
# https://blog.csdn.net/wuovo233/article/details/117425047
# 1. 安装依赖
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
# 2. 初始化 tailwind 和 postcss 配置文件
npx tailwindcss init -p
# 3. 在 src/styles/ 目录下新建 index.css, 在文件中写入：
@tailwind base;
@tailwind components;
@tailwind utilities;
# 4. 在 main.js 中引入 index.css 文件：
import './styles/index.css'

# tailwind.config.js，更改配置,写入如下代码:
purge: [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}', //包含了src文件夹下所有的vue,js等等文件
],

# 运行项目(可能会报如下错误)
Error: PostCSS plugin tailwindcss requires PostCSS 8.

# https://www.tailwindcss.cn/docs/installation#post-css-7
yarn remove tailwindcss postcss autoprefixer
yarn add -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

## 注意

### 环境变量配置文件

环境变量配置位于项目根目录下的 `.env`、`.env.development`、`.env.production`

```sh
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

# 只有以 VITE_ 开头的变量会被嵌入到客户端侧的包中，你可以项目代码中这样访问它们：
# console.log(import.meta.env.VITE_PROT);
# 以 VITE_GLOB_* 开头的的变量，在打包的时候，会被加入_app.config.js配置文件当中.
# 生产环境 build 构建项目之后，会自动生成 _app.config.js 文件并插入 index.html
```

### 网页主题模式实现

```less
html,
body {
  &.color-weak {
    filter: invert(80%);
  }

  &.gray-mode {
    filter: grayscale(100%);
    filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
  }
}
```

### 测试服务器

在 `/test/server` 内有简单的 Node.js 测试后台接口服务，用 Koa2 实现

```sh
cd ./test/server
# 安装依赖
yarn
# 运行服务
yarn start
# 服务运行成功之后，就可以访问测试上传接口及 websocket 接口服务
```
