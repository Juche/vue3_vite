<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

  // import HelloWorld from '@/components/Demo/HelloWorld';
  // import Test1 from '@/components/Demo/Test1';
  // import TestSub from '@/components/Demo/TestSub';
  // import TestAsync from '@/components/Demo/TestAsync';
  // import TotalView from '@/components/Demo/TotalView';
  // import SpInfo from '@/components/Demo/SpInfo';

  import {
    AntComp,
    HelloWorld,
    SpInfo,
    TailWind,
    Test1,
    TestAsync,
    TestSub,
    TotalView,
  } from '/@/components/Demo';

  import { ColorMode } from '/@/components/Setting';
</script>

<template>
  <ColorMode />
  <!-- <Test1 />
  <TestSub />
  <TestAsync /> -->
  <AntComp />
  <!-- <TotalView />
  <SpInfo /> -->
  <TailWind />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
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
    // text-align: center;
    color: #2c3e50;
  }
</style>
