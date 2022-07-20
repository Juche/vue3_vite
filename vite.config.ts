import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import cesium from 'vite-plugin-cesium';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 需要全局变量 （你定义的定义的方法 和 变量等）
          hack: `true; @import (reference) "${resolve(__dirname, 'src/styles/ant-theme.less')}";`,
          // hack: `true; @import (reference) "${resolve(__dirname, 'src/styles/index.less')}";`,
          // 颜色变量有无 @ 都可以
          // 'primary-color': '#1DA57A',
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
          // '@primary-color': '#1DA57A',
          // '@link-color': '#1DA57A',
          // '@border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
    port: 8082,
    open: '/',
  },
  plugins: [
    vue(),
    vueJsx(),
    cesium(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })],
    }),
  ],
});
