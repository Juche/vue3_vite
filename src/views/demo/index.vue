<template>
  <h1>demo</h1>
  <h3>{{ message.message }}</h3>
</template>

<script setup lang="ts">
  import { useMessageStore } from '/@/stores/message';
  const message = useMessageStore();

  let person1: Person = {
    name: 'Juche',
    gender: 'female',
    age: 0,
  };
  console.log(`🚀 ~ person1`, person1);
</script>
