<template>
  <div id="info">Description</div>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { onMounted } from 'vue';

  const width = 200;
  const height = 100;

  function init() {}

  // init();
  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped>
  #info {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    z-index: 100;
    display: block;
  }
</style>
