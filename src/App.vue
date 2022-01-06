<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue';
import Test1 from './components/Test1.vue';
import TestSub from './components/TestSub.vue';
import TestAsync from './components/TestAsync.vue';

// import { defineComponent } from 'vue';
// export default defineComponent({
//   name: 'App',
//   components: { HelloWorld },
//   setup() {},
// });
const rootEl: HTMLElement = document.documentElement;

const toggleColorMode = (colorMode: string): void => {
  rootEl.className = colorMode;
};
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <Test1 />
  <TestAsync />
  <!-- <TestSub /> -->
  <p class="text-3xl font-bold">Hello Tailwind!</p>
  <div class="ant-btns">
    <a-button type="primary">Primary</a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="primary" danger>Danger</a-button>
    <a-config-provider :auto-insert-space-in-button="false">
      <a-button type="primary">按钮</a-button>
    </a-config-provider>
    <a-button type="primary">按钮</a-button>
    <a-button type="link">Link</a-button>
  </div>
  <div class="color-mode">
    <a-button type="dashed" @click="toggleColorMode('color-weak')"
      >色弱模式</a-button
    >
    <a-button type="default" @click="toggleColorMode('color-gray')"
      >灰度模式</a-button
    >
    <a-button type="primary" @click="toggleColorMode('color-normal')"
      >正常模式</a-button
    >
  </div>
</template>

<style lang="less">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.color-mode {
  position: fixed;
  right: 0;
  top: 0;
}
</style>
