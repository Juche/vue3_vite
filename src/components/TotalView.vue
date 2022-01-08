<template>
  <ul class="total-view">
    <li class="total-li" v-for="item in list" :key="item.id">
      <h4>{{ item.name }}</h4>
      <!-- <p>{{ item.num }}</p> -->
      <NumberScroll
        :number="item.num"
        duration="2s"
        :format="true"
      ></NumberScroll>
      <!-- :numLen="5" -->
    </li>
  </ul>
  <!-- :numLen="10" -->
  <NumberScroll :number="count" duration="2s" :format="true"></NumberScroll>
  <a-button type="primary" @click="updateList">updateList</a-button>
  <a-button type="primary" @click="updateCount">updateCount</a-button>
</template>

<script lang="ts">
import NumberScroll from './NumberScroll.vue';

export default {
  name: 'total-view',
  components: {
    NumberScroll,
  },
  data() {
    return {
      list: [
        { id: 1, name: '累计守护家庭', num: 0 },
        { id: 2, name: '累计守护家人', num: 0 },
        { id: 3, name: '累计看护服务', num: 0 },
        { id: 4, name: '累计安装设备数', num: 0 },
        // { id: 5, name: "接入服务商", num: this.overview.projectNums || 0 },
      ],
      count: -9999.99,
      // count: 0,
    };
  },
  methods: {
    updateCount() {
      this.count = Number((this.count + Math.random() * 1000).toFixed(2));
    },
    updateList() {
      this.list.map(
        (item) =>
          (item.num = Number((item.num + Math.random() * 10).toFixed(2)))
      );
    },
  },
  mounted() {
    setInterval(() => {
      // setInterval
      // this.updateCount();
      this.updateList();
    }, 3000);
  },
};
</script>

<style lang="less" scoped>
.total-view {
  position: absolute;
  top: 0;
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
