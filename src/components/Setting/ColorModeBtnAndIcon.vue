<template>
  <div class="color-mode">
    <a-button
      v-for="mode in ColorMode"
      @click="toggleColorMode(mode.id)"
      :key="mode.id"
      :type="activeMode === mode.id ? 'primary' : 'dashed'"
      >{{ mode.name }}</a-button
    >
    <div class="color-icon">
      <Icon :icon="ColorMode[modeIdx].icon" @click="switchColorMode" />
    </div>
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
  let activeMode = ref('color-normal');
  let modeIdx = ref(0);
  const rootEl: HTMLElement = document.documentElement;

  const toggleColorMode = (mode: string): void => {
    activeMode.value = mode;
    rootEl.className = mode;
    ColorMode.forEach((item, idx) => {
      if (item.id === mode) {
        modeIdx.value = idx;
        return true;
      }
      return false;
    });
  };
  const switchColorMode = (): void => {
    modeIdx.value = (modeIdx.value + 1) % ColorMode.length;
    rootEl.className = ColorMode[modeIdx.value].id;
    activeMode.value = ColorMode[modeIdx.value].id;
  };
</script>

<style lang="less">
  .color-mode {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9999;
  }

  .color-icon {
    font-size: 30px;
  }
</style>
