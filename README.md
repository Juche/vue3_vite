<!--
 * @Author: your name
 * @Date: 2021-12-31 16:52:30
 * @LastEditTime: 2021-12-31 17:04:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \v3_vite\README.md
-->
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
