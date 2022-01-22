<template>
  <h1>demo</h1>
  <h3>{{ message.message }}</h3>
  <Vivus />
</template>

<script setup lang="ts">
  import { Vivus } from '/@/components/Demo';
  import { useMessageStore } from '/@/stores';
  const message = useMessageStore();

  let person1: Person = {
    name: 'Juche',
    gender: 'female',
    age: 0,
  };
  console.log(`🚀 ~ person1`, person1);
</script>
