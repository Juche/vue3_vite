<template>
  <Three01 />
  <Cesium01 />
  <AsyncCesium />
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';

  import { Three01, Cesium01 } from '/@/components/Datav';
  import AsyncError from '/@/components/Demo/AsyncError.vue';
  import AsyncLoading from '/@/components/Demo/AsyncLoading.vue';

  const AsyncCesium = defineAsyncComponent({
    loader: () => import('/@/components/Datav/Cesium01.vue'),
    delay: 100,
    timeout: 5000,
    errorComponent: AsyncError,
    loadingComponent: AsyncLoading,
  });
</script>
