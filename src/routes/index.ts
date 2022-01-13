import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '/@/views/home/index.vue';
import Comp from '/@/views/comp/index.vue';
import Datav from '/@/views/datav/index.vue';
import Demo from '/@/views/demo/index.vue';
import UI from '/@/views/ui/index.vue';

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/comp', component: Comp, name: 'Comp' },
  { path: '/datav', component: Datav, name: 'Datav' },
  { path: '/demo', component: Demo, name: 'Demo' },
  { path: '/ui', component: UI, name: 'UI' },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export { routes, router };
