import { defineStore } from 'pinia';

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

// export default appStore;
