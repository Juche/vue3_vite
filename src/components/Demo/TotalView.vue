<template>
  <ul class="total-view">
    <li class="total-li" v-for="item in list" :key="item.id">
      <h4>{{ item.name }}</h4>
      <!-- <p>{{ item.num }}</p> -->
      <NumberScroll :number="item.num" duration="2s" :format="true" />
      <!-- :numLen="5" -->
    </li>
  </ul>

  <NumberScroll :number="count" duration="2s" :format="true" />

  <a-button type="primary" @click="updateList">updateList</a-button>
  <a-button type="primary" @click="updateCount">updateCount</a-button>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { NumberScroll } from '/@/components/Basic';

  let list = reactive([
    { id: 1, name: '累计守护家庭', num: 0 },
    { id: 2, name: '累计守护家人', num: 0 },
    { id: 3, name: '累计看护服务', num: 0 },
    { id: 4, name: '累计安装设备数', num: 0 },
  ]);
  let count = ref(-9999.99);

  function updateCount() {
    count.value = Number((count.value + Math.random() * 1000).toFixed(2));
  }
  function updateList() {
    list.map((item) => (item.num = Number((item.num + Math.random() * 10).toFixed(2))));
  }

  onMounted(() => {
    setInterval(() => {
      updateCount();
      updateList();
    }, 3000);
  });
</script>

<style lang="less" scoped>
  .total-view {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    white-space: nowrap;
  }

  .total-li {
    display: inline-block;
    width: 160px;
    font-family: SourceHanSansCN;
    font-size: 14px;
    // color: #00aeff;
    color: #fff;
    text-align: center;
    margin: 0 10px;
    padding: 10px 0;
    // background-image: url("~@/assets/images/v1/total_bg.png");
    // background-position: center;
    // background-size: cover;
    // background-repeat: no-repeat;
    // background-color: rgba(6, 53, 80, .7);
    background: rgba(2, 42, 54, 0.8);
    border: 1px solid rgba(39, 152, 149, 0.8);
  }
  // .total-li > h4 {
  //   margin-bottom: 10px;
  // }
  .total-li > p {
    margin-top: 10px;
    line-height: 1;
    font-family: DINAlternate-Bold;
    font-size: 36px;
    font-weight: bold;
    // color: #fff;
    color: #05ffed;
    text-shadow: 0 0 15px rgb(1, 133, 174);
  }
</style>
