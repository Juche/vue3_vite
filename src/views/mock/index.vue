<template>
  <h1>模拟数据事件</h1>
  <div class="users">
    <div class="user" v-for="(user, index) in users" :key="index">
      <img class="avatar" :src="user.avatar" />
      <div class="name">{{ user.name }} - {{ user.gender }} - {{ user.age }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { users } from '/@/api/faker';
  import { testList1, testList2 } from '/@/api/mock';

  // console.log(`🚀 ~ users`, users);
  console.log(`🚀 ~ testList1`, testList1);
  console.log(`🚀 ~ testList2`, testList2());

  // Mock 只支持ajax,不支持fetch;
  // import '/@/api/mock';
  // async function fetchData() {
  //   const res = (await fetch('/getList')).json();
  //   return res;
  // }

  onMounted(() => {
    // const list = fetchData();
    // console.log(`🚀 ~ onMounted ~ list`, list);
  });
</script>

<style lang="less" scoped>
  .users {
    display: flex;
    flex-wrap: wrap;
  }
  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    margin: 20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #eee;
  }
</style>
