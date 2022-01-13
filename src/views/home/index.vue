<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script setup lang="ts">
  import { HelloWorld } from '/@/components/Demo';
  import { onBeforeRouteLeave } from 'vue-router';

  // 组件内的守卫
  // beforeRouteEnter
  // beforeRouteUpdate
  // beforeRouteLeave
  onBeforeRouteLeave((to, from) => {
    console.log(`🚀 ~ onBeforeRouteLeave ~ from`, from);
    console.log(`🚀 ~ onBeforeRouteLeave ~ to`, to);
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
    // 取消导航并停留在同一页面上
    if (!answer) return false;
  });
</script>
