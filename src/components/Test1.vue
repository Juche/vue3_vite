<template>
  <p>{{ val }}</p>
  <p>{{ obj.value }}</p>
  <a-button type="primary" @click="start">start</a-button>
  <a-button type="primary" danger @click="stop">stop</a-button>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect, onUpdated, onMounted, onBeforeUnmount, } from 'vue';
let val = ref(10);
let obj = reactive({ value: 10 });
watchEffect(() => {
  console.log(`🚀 ~ val`, val.value);
  console.log(`🚀 ~ obj`, obj.value);
});

let timer: number | null = null;
const stop = () => {
  if (timer) clearInterval(timer);
};

const start = () => {
  stop();
  timer = setInterval(() => {
    val.value++;
    obj.value--;
  }, 1000);
};

onMounted(() => {
  // alert();
  stop();
});

</script>

<style lang="less" scoped></style>
