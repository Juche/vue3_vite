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
  import { defineComponent, defineAsyncComponent, ref } from 'vue';

  // const TestSub = defineAsyncComponent(() => import('./TestSub.vue'))

  // import ErrorComponent form './ErrorComponent.vue';
  // import LoadingComponent form './LoadingComponent.vue';

  // 带选项的异步组件
  const TestSub = defineAsyncComponent({
    loader: () => import('./TestSub.vue'),
    delay: 60000,
    timeout: 70000,
    // errorComponent: ErrorComponent,
    // loadingComponent: LoadingComponent
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

  // export default defineComponent({
  //   name: 'TestAsync',
  //   components: {
  //     TestSub: defineAsyncComponent(
  //       () =>
  //         // 异步引入组件
  //         import('./TestSub.vue')
  //     ),
  //   },
  // });
</script>
