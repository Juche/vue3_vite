import { ref } from 'vue';
import { defineStore } from 'pinia';

// 使用 function 定义 store(类似组件里的 setup 结构)
export const useMessageStore = defineStore('message', () => {
  const message = ref('Hello Pinia!');
  function helloAnyThing(sth = 'World') {
    message.value = `Hello ${sth}!`;
  }
  return { message, helloAnyThing };
});
