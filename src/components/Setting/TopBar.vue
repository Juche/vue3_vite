<template>
  <div id="topBar">
    <MenuMini />
    <ColorMode />
  </div>
</template>
<script setup lang="ts">
  import ColorMode from './ColorMode.vue';
  import MenuMini from './MenuMini.vue';
</script>

<style lang="less">
  #topBar {
    display: flex;
    justify-content: space-between;
    position: relative;
    // z-index: 9999;
    padding: 5px 10px;
    width: 100%;
  }
</style>
