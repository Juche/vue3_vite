<template>
  <div id="colorMode">
    <Icon :icon="ColorMode[modeIdx].icon" @click="switchColorMode" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Icon } from '@iconify/vue';

  const ColorMode = [
    {
      name: '浅色模式',
      id: 'color-normal',
      icon: 'fxemoji:sunrays',
    },
    {
      name: '深色模式',
      id: 'color-dark',
      icon: 'noto:new-moon',
    },
    {
      name: '灰度模式',
      id: 'color-gray',
      icon: 'noto:first-quarter-moon',
    },
    {
      name: '色弱模式',
      id: 'color-weak',
      // icon: 'noto:last-quarter-moon',
      icon: 'noto:first-quarter-moon',
    },
  ];

  let modeIdx = ref(0);
  const rootEl: HTMLElement = document.documentElement;

  const switchColorMode = (): void => {
    modeIdx.value = (modeIdx.value + 1) % ColorMode.length;
    rootEl.className = ColorMode[modeIdx.value].id;
  };
</script>

<style lang="less">
  #colorMode {
    // position: fixed;
    // top: 5px;
    // right: 10px;
    font-size: 24px;
    // z-index: 9999;
  }
</style>
