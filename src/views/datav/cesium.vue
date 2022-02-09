<template>
  <!-- <Cesium01Entity /> -->
  <!-- <Cesium02Layer /> -->
  <Cesium03Camera />
  <!-- <VueCesium01 /> -->
  <!-- <AsyncCesium /> -->
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';

  import { Cesium01Entity, Cesium02Layer, Cesium03Camera, VueCesium01 } from '/@/components/Datav';
  import AsyncError from '/@/components/Demo/AsyncError.vue';
  import AsyncLoading from '/@/components/Demo/AsyncLoading.vue';

  const AsyncCesium = defineAsyncComponent({
    loader: () => import('../../components/Datav/VueCesium01.vue'),
    delay: 100,
    timeout: 5000,
    errorComponent: AsyncError,
    loadingComponent: AsyncLoading,
  });
</script>
