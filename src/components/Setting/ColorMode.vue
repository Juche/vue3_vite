<template>
  <div class="color-mode">
    <!-- <a-button type="dashed" @click="toggleColorMode('color-weak')">色弱模式</a-button>
    <a-button type="default" @click="toggleColorMode('color-gray')">灰度模式</a-button>
    <a-button type="ghost" @click="toggleColorMode('color-dark')">暗黑模式</a-button>
    <a-button type="primary" @click="toggleColorMode('color-normal')">正常模式</a-button> -->
    <a-button
      v-for="mode in ColorMode"
      @click="toggleColorMode(mode.id)"
      :key="mode.id"
      :type="activeMode === mode.id ? 'primary' : 'dashed'"
      >{{ mode.name }}</a-button
    >
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const ColorMode = [
    {
      name: '正常模式',
      id: 'color-normal',
    },
    {
      name: '暗黑模式',
      id: 'color-dark',
    },
    {
      name: '灰度模式',
      id: 'color-gray',
    },
    {
      name: '色弱模式',
      id: 'color-weak',
    },
  ];
  let activeMode = ref('color-normal');
  const rootEl: HTMLElement = document.documentElement;

  const toggleColorMode = (colorMode: string): void => {
    activeMode.value = colorMode;
    rootEl.className = colorMode;
  };
</script>

<style lang="less">
  .color-mode {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9999;
  }
</style>
