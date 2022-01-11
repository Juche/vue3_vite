<template>
  <div>
    <div class="message">{{ message }}</div>
    <div class="count">Count: {{ state.count }}</div>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { reactive, computed } from 'vue';

export default {
  name: 'CompositionApi',

  props: {
    message: {
      type: String,
    },
  },

  setup(props) {
    const state = reactive({
      count: 0,
    });

    const increment = () => {
      state.count += 1;
    };

    return {
      state,
      increment,
    };
  },
};
</script>
