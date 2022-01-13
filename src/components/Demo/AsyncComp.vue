<template>
  <!-- <Suspense>
    <template #default>
      <AsyncLoader />
    </template>
    <template #fallback> Loading ... </template>
  </Suspense> -->
  <div class="toggle-show">
    <a-button @click="toggleShow">切换组件显示</a-button>
    <AsyncLoader v-if="show" />
  </div>
</template>
<script lang="ts" setup>
  import { defineAsyncComponent, ref } from 'vue';

  // const AsyncLoader = defineAsyncComponent(() => import('./AsyncLoader.vue'))

  import AsyncError from './AsyncError.vue';
  import AsyncLoading from './AsyncLoading.vue';

  // 带选项的异步组件
  const AsyncLoader = defineAsyncComponent({
    loader: () => import('./AsyncLoader.vue'),
    delay: 100,
    timeout: 3000,
    errorComponent: AsyncError,
    loadingComponent: AsyncLoading,
  });

  let show = ref(false);

  function toggleShow() {
    // show = !show;
    show.value = !show.value; // 这里需要注意给show赋值的方式
    console.log(`🚀 ~ toggleShow ~ show`, show);
  }

  defineExpose({
    show,
  });
</script>
