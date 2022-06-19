<template>
  <div id="threeCtn" ref="threeCtn"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { $T } from '/@/plugins/threejs';

  const threeCtn = ref(null);

  onMounted(() => {
    const T = new $T(threeCtn.value!);
    // T.init();
  });
</script>

<style lang="less" scoped>
  #threeCtn {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
