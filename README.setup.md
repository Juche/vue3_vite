# README.setup

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

### Ant Design

```js
// Vite 按需
// https://next.antdv.com/docs/vue/introduce-cn#按需加载
// vite.config.js
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    /* ... */
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
};
```

## Vue 3

- `<script setup lang="ts">`

```js
// This starter template is using Vue 3 <script setup> SFCs
// https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// https://v3.cn.vuejs.org/api/sfc-script-setup.html
1. 里面的代码会被编译成组件 setup() 函数的内容
2. 必须以 vNameOfDirective 的形式来命名本地自定义指令
const vMyDirective = {
  beforeMount: (el) => {
    // 在元素上做些操作
  }
}
// 导入的指令同样能够工作，并且能够通过重命名来使其符合命名规范
import { myDirective as vMyDirective } from './MyDirective.js'
3. 必须使用 defineProps 和 defineEmits API 来声明 props 和 emits
const props = defineProps({
  foo: String
})
const emit = defineEmits(['change', 'delete'])
4. 为了在 <script setup> 组件中明确要暴露出去的属性，使用 defineExpose 编译器宏
```

- `defineAsyncComponent`

```js
// https://blog.csdn.net/qq_42204414/article/details/114838871
// https://v3.cn.vuejs.org/guide/migration/async-components.html
```

- `globalProperties`

```js
// Vue 3 提供了一个 globalProperties 对象，用来添加可以被任意组件实例访问的全局 property。
// 例如一个插件想要注入一个共享全局对象或函数。
import axios from 'axios';
const app = Vue.createApp({});
app.config.globalProperties.$http = axios;
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

```jsx
// [CSS3 filter(滤镜)实现网页灰色或者黑色模式的代码](https://www.jb51.net/css/754348.html)
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

// 如果需要在JavaScript代码中对系统的深浅主题进行判断，可以使用原生的window.matchMedia()方法，例如：
// 是否支持深色模式: 返回true或false
window.matchMedia("(prefers-color-scheme: dark)").matches;
```

<!-- ### esbuild -->

### `iconify`

### faker/mockjs/json-server

代理模拟数据

### Tools

day/big/qs/file-saver/js-xlsx/

- 动画(svg 绘制轮廓动画) `vivus`

### color

### 项目热更新 & 打包问题

### lerna
