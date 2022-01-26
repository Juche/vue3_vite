<template>
  <h1>demo</h1>
  <h3>{{ message.message }}</h3>
  <Lottie :option="lottieOption" />
  <Vivus />
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { Lottie, Vivus } from '/@/components/Demo';
  import { useMessageStore } from '/@/stores';
  const message = useMessageStore();
  let lottieOption = reactive({
    // container: document.getElementById('lottie_box'),
    renderer: 'svg',
    loop: true,
    // path: '/src/assets/json/lottie/markus.json',
    // path: '/src/assets/json/lottie/bell.json',
    path: '/src/assets/json/lottie/email-sent.json',
    // path: '/src/assets/json/titanic/pause.json',
    // path: '/src/assets/json/titanic/checkbox.json',
    // path: '/src/assets/json/titanic/menu-close.json',
    // path: '/src/assets/json/titanic/heart.json',
    // path: '/src/assets/json/titanic/shield.json',
  });

  setTimeout(() => {
    // lottieOption.path = '/src/assets/json/titanic/shield.json';
    lottieOption.path = '';
  }, 2000);

  setTimeout(() => {
    lottieOption.path = '/src/assets/json/titanic/heart.json';
  }, 4000);

  let person1: Person = {
    name: 'Juche',
    gender: 'female',
    age: 0,
  };
  console.log(`🚀 ~ person1`, person1);
</script>
