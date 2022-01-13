<template>
  <div class="menu-mini">
    <a-button
      v-for="item in routes"
      :type="item.name === route.name ? 'primary' : 'dashed'"
      :key="item.name"
    >
      <router-link :to="item.path">
        {{ item.name }}
      </router-link>
    </a-button>
  </div>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { routes } from '/@/routes';

  const router = useRouter();
  const route = useRoute();

  window.routes = routes;
  window.router = router;
  window.route = route;

  console.log(`🚀 ~ routes`, routes);
  console.log(`🚀 ~ router`, router);
  console.log(`🚀 ~ route`, route);
</script>

<style lang="less">
  .menu-mini {
    position: fixed;
    right: 0;
    top: 50px;
  }
</style>
