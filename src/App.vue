<template>
  <TopBar />
  <RouterView />
</template>

<script setup lang="ts">
  // Vue 3 <script setup> SFCs :https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import { TopBar } from '/@/components/Setting';
</script>

<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-top: 60px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
  }
</style>
