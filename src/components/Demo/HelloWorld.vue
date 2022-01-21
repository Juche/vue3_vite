<script setup lang="ts">
  import { ref, unref } from 'vue';
  import { useCounterStore } from '/@/stores/counter';
  import { useMessageStore } from '/@/stores/message';

  defineProps<{ msg: string }>();

  const counter = useCounterStore();
  const message = useMessageStore();
  function countPlus() {
    // 直接修改 store 里的值
    // counter.count++;
    // 通过 $patch 方法修改 store 里的值
    // counter.$patch({ count: counter.count + 2 });
    // 调用 store 里定义的 actions increment 方法修改 store 里的值
    counter.increment();
    console.log(`🚀 ~ counter.count`, counter.count);
  }
  let sth = ref('');
  function hello() {
    let _sth = unref(sth);
    message.helloAnyThing(_sth);
    console.log(`🚀 ~ hello ~ sth`, _sth);
  }
</script>

<template>
  <img alt="Vue logo" src="/src/assets/logo.png" />

  <h1>{{ msg }}</h1>
  <h1>{{ message.message }}</h1>
  <input v-model="sth" /><button @click="hello">欢迎一下</button>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="countPlus">count is: {{ counter.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
