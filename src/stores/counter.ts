import { defineStore } from 'pinia';

// 基本用法
export const useCounterStore = defineStore('counter', {
  // id: 'counter',
  state: () => ({
    count: 10,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
