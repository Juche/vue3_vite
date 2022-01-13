<template>
  <!-- <Suspense>
    <template #default>
      <TestSub />
    </template>
    <template #fallback> Loading ... </template>
  </Suspense> -->
  <div class="toggle-show">
    <a-button @click="toggleShow">切换组件显示</a-button>
    <TestSub v-if="show" />
  </div>
</template>
<script lang="ts" setup>
  import { defineAsyncComponent, ref } from 'vue';

  // const TestSub = defineAsyncComponent(() => import('./TestSub.vue'))

  import ErrorComponent from './ErrorComponent.vue';
  import LoadingComponent from './LoadingComponent.vue';

  // 带选项的异步组件
  const TestSub = defineAsyncComponent({
    loader: () => import('./TestSub.vue'),
    delay: 100,
    timeout: 3000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent,
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
