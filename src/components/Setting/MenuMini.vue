<template>
  <div class="menu-mini">
    <!-- <a-button type="dashed" @click="toggleColorMode('color-weak')">色弱模式</a-button>
    <a-button type="default" @click="toggleColorMode('color-gray')">灰度模式</a-button>
    <a-button type="ghost" @click="toggleColorMode('color-dark')">暗黑模式</a-button>
    <a-button type="primary" @click="toggleColorMode('color-normal')">正常模式</a-button> -->

    <router-link to="/">Home</router-link>
    <router-link to="/comp">Comp</router-link>
    <router-link to="/datav">Datav</router-link>
    <router-link to="/demo">Demo</router-link>
    <router-link to="/ui">UI</router-link>
  </div>
</template>

<script setup lang="ts">
  // import { useRouter, useRoute } from 'vue-router';
  // import { routes } from '/@/routes';
</script>

<style lang="less">
  .menu-mini {
    position: fixed;
    right: 0;
    top: 50px;
  }
</style>
