<template>
  <h1>Threejs Demo</h1>
  <canvas id="canvasDom" ref="canvasDom"></canvas>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { $T } from '/@/plugins/threejs';

  const canvasDom = ref(null);

  onMounted(() => {
    const T = new $T(canvasDom.value!);
    // T.init();
  });
</script>

<style lang="less" scoped></style>
