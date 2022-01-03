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
