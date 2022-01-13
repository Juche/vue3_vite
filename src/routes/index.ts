import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '/@/views/home/index.vue';
import Comp from '/@/views/comp/index.vue';
import Three from '/@/views/datav/three.vue';
import Cesium from '/@/views/datav/cesium.vue';
import Demo from '/@/views/demo/index.vue';
import UI from '/@/views/ui/index.vue';

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/comp', component: Comp, name: 'Comp' },
  { path: '/three', component: Three, name: 'Three' },
  { path: '/cesium', component: Cesium, name: 'Cesium' },
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

/**
 * [完整的导航解析流程]
 * 导航被触发。
 * 在失活的 `组件里` 调用 beforeRouteLeave 守卫。
 * 调用 `全局` 的 beforeEach 守卫。
 * 在重用的 `组件里` 调用 beforeRouteUpdate 守卫(2.2+)。
 * 在路由配置里调用 beforeEnter。
 * 解析异步路由组件。
 * 在被激活的 `组件里` 调用 beforeRouteEnter。
 * 调用 `全局` 的 beforeResolve 守卫(2.5+)。
 * 导航被确认。
 * 调用 `全局` 的 afterEach 钩子。
 * 触发 DOM 更新。
 * 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
 */

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log(`🚀 ~ beforeEach ~ from`, from);
  // console.log(`🚀 ~ beforeEach ~ to`, to);
  next();
});
// 全局后置钩子
router.afterEach(() => {
  // console.log(`🚀 ~ afterEach ~ from`, from);
  // console.log(`🚀 ~ afterEach ~ to`, to);
});

export { routes, router };
