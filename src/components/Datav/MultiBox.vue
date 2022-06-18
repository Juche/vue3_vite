<template>
  <div id="threeDom" ref="threeDom"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { $T } from '/@/plugins/threejs';

  const threeDom = ref(null);

  onMounted(() => {
    const T = new $T(threeDom.value!);
    // T.init();
  });
</script>

<style lang="less" scoped></style>
