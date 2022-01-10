<template>
  <Suspense>
    <template #default>
      <TestSub />
    </template>
    <template #fallback> Loading ... </template>
  </Suspense>
</template>
<script lang="ts" setup>
import { defineComponent, defineAsyncComponent } from 'vue';

// const TestSub = defineAsyncComponent(() => import('./TestSub.vue'))

// 带选项的异步组件
const TestSub = defineAsyncComponent({
  loader: () => import('./TestSub.vue'),
  delay: 6000,
  timeout: 10000,
  // errorComponent: ErrorComponent,
  // loadingComponent: LoadingComponent
})

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
