<template>
  <div class="color-mode">
    <a-button type="dashed" @click="toggleColorMode('color-weak')"
      >色弱模式</a-button
    >
    <a-button type="default" @click="toggleColorMode('color-gray')"
      >灰度模式</a-button
    >
    <a-button type="ghost" @click="toggleColorMode('color-dark')"
      >暗黑模式</a-button
    >
    <a-button type="primary" @click="toggleColorMode('color-normal')"
      >正常模式</a-button
    >
  </div>
</template>

<script setup lang="ts">
const rootEl: HTMLElement = document.documentElement;

const toggleColorMode = (colorMode: string): void => {
  rootEl.className = colorMode;
};
</script>

<style lang="less">
.color-mode {
  position: fixed;
  right: 0;
  top: 0;
}
</style>
