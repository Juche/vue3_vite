<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';

  import { AntComp, HelloWorld, SpInfo, TailWind, TotalView, AsyncComp } from '/@/components/Demo';

  import { Three01, Cesium01 } from '/@/components/Datav';
  import { ColorMode } from '/@/components/Setting';

  import AsyncError from '/@/components/Demo/AsyncError.vue';
  import AsyncLoading from '/@/components/Demo/AsyncLoading.vue';

  const AsyncCesium = defineAsyncComponent({
    loader: () => import('/@/components/Datav/Cesium01.vue'),
    delay: 100,
    timeout: 5000,
    errorComponent: AsyncError,
    loadingComponent: AsyncLoading,
  });

  let person1: Person = {
    name: 'Juche',
    gender: 'female',
    age: 0,
  };
  console.log(`🚀 ~ person1`, person1);
</script>

<template>
  <!-- <ColorMode /> -->
  <AsyncComp />
  <!-- <Three01 />
  <AsyncCesium />
  <Cesium01 /> -->
  <AntComp />
  <TailWind />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <!-- <TotalView />
  <SpInfo /> -->
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
