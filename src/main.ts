import './styles/tailwind.css';
import './styles/index.less';
import 'ant-design-vue/dist/antd.css';

import { createApp } from 'vue';
import App from './App.vue';

import { router } from './routes';
import { createPinia } from 'pinia';

import VueCesium from 'vue-cesium';
import 'vue-cesium/dist/index.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueCesium, {
  // cesiumPath 是指引用的Cesium.js路径，如
  // cesiumPath: './Cesium/Cesium.js',
  cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js',
  // cesiumPath: 'https://www.supermapol.com/earth/Build/Cesium/Cesium.js',
  // 使用Cesium ion的数据源需要到https://cesium.com/ion/申请一个账户，获取Access Token。不指定的话可能导致 CesiumIon 的在线影像、地形加载失败
  // accessToken: 'Your Cesium Ion defaultAccessToken'
});

// window.app = app;

app.mount('#app');
