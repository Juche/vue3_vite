<template>
  <div class="sp-ctn" :class="[isFold ? 'sp-fold' : 'sp-unfold']">
    <div class="sp-ctt">
      <!-- <div class="ripple-ctn" style="width: 64px; height: 64px">
        <div class="ripple">
          <img class="ripple-image" src="../assets/images/v1/s1.png" />
        </div>
      </div> -->

      <div
        class="service-overview"
        :class="{
          loading: loading1,
          empty: !(serviceInfo && serviceInfo.length) && !loading1,
        }"
      >
        <div class="service-info" v-for="(item, idx) in serviceInfo" :key="idx">
          <div class="ripple-ctn" style="width: 64px; height: 64px">
            <div class="ripple">
              <img
                class="ripple-image"
                :src="`/src/assets/images/v1/s${idx + 1}.png`"
              />
            </div>
          </div>
          <div class="ctt">
            <!-- <div class="val">{{ item.val }}</div> -->
            <NumberScroll
              class="val"
              :number="item.val"
              duration="2s"
              :format="true"
              :numStyle="numStyle"
              align="right"
            ></NumberScroll>
            <div class="key">{{ item.key }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-toggle" @click="togglePanels">
      <i :class="['icon-toggle', isFold ? 'icon-fold' : 'icon-unfold']"></i>
    </div>
  </div>
</template>

<script lang="ts">
// import { NumberScroll } from '../../components/Basic';
import { NumberScroll } from '/@/components/Basic';

export default {
  name: 'sp-info',
  components: {
    NumberScroll,
  },
  data() {
    return {
      isFold: false,
      loading1: true,
      numStyle: {
        width: '16px',
        height: '26px',
        fontFamily: 'ShiShangZhongHeiJianTi',
        fontWeight: 'normal',
        fontSize: '26px',
        color: '#fff',
      },
      serviceInfo: [
        {
          key: '守护家庭总数',
          val: 0,
          icon: 's1',
        },
        {
          key: '守护人总数',
          val: 0,
          icon: 's2',
        },
        {
          key: '服务次数总数',
          val: 0,
          icon: 's3',
        },
        {
          key: '管家总量',
          val: 98.76,
          icon: 's4',
        },
      ],
    };
  },
  methods: {
    togglePanels() {
      this.isFold = !this.isFold;
    },
    close() {
      this.isFold = true;
    },
  },
  mounted() {
    setTimeout(() => {
      this.serviceInfo = [
        {
          key: '守护家庭总数',
          val: 666,
          icon: 's1',
        },
        {
          key: '守护人总数',
          val: 88,
          icon: 's2',
        },
        {
          key: '服务次数总数',
          val: 33.33,
          icon: 's3',
        },
        {
          key: '管家总量',
          val: -923.45,
          icon: 's4',
        },
      ];
    }, 3000);
  },
};
</script>

<style lang="less" scoped>
.sp-ctn {
  display: flex;
  position: absolute;
  top: 0;
  left: 15px;
  bottom: 20px;
  width: 490px;
  border-left: 0;
  z-index: 19;
  transition: all 0.5s cubic-bezier(0.75, 1.2, 0.75, 1.2) 0.2s;
}

.sp-ctt {
  display: flex;
  flex-direction: column;
  width: 460px;
  background: rgba(2, 42, 54, 0.8);
  border: 1px solid rgba(39, 152, 149, 0.8);
}

.panel-top {
  height: 240px;
  border-bottom: none;
  border-radius: 2px 2px 0 0;
}
.panel-bot {
  border-top: none;
  border-radius: 0 0 2px 2px;
}

.service-overview {
  // height: 100%;
  // flex: 1 1 110px;
  // position: absolute;
  // bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  font-weight: bold;

  .service-info {
    margin: 10px 0;
    // padding-left: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    // justify-content: space-evenly;
    width: 50%;
    // line-height: 24px;

    .ctt {
      // margin: 10px 0;
      // line-height: 32px;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      width: 86px;
      text-align: right;
      // &.s1 {
      //   background: url('../assets/images/v1/s1.png') left/contain no-repeat;
      // }
      // &.s2 {
      //   background: url('../assets/images/v1/s2.png') left/contain no-repeat;
      // }
      // &.s3 {
      //   background: url('../assets/images/v1/s3.png') left/contain no-repeat;
      // }
      // &.s4 {
      //   background: url('../assets/images/v1/s4.png') left/contain no-repeat;
      // }
      .key {
        margin-top: 5px;
        font-size: 12px;
        font-weight: normal;
        color: #eee;
        // line-height: 20px;
      }
      .val {
        // margin-top: 5px;
        // font-family: ShiShangZhongHeiJianTi;
        // font-weight: normal;
        // font-size: 26px;
        // color: #fff;
      }
    }
  }
}

.panel-table {
  // transition: all 0.5s cubic-bezier(0.75, 1.2, 0.75, 1.2) 0.2s;
  position: absolute;
}
.sp-fold {
  left: -463px;
  // width: 0;
  // border: none;
}

.panel-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -1px;
  width: 30px;
  height: 60px;
  background: rgba(2, 42, 54, 0.8);
  border: 1px solid rgba(39, 152, 149, 0.8);
  // border-left: none;
  // perspective: 100;

  &:hover {
    background: rgba(39, 183, 255, 0.25);
  }

  .icon-toggle {
    width: 8px;
    height: 8px;
    border-color: #d2d2d2;
    // transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate(45deg);
    // transition: border 1s;
  }
  .icon-fold {
    border-top: 1px solid;
    border-right: 1px solid;
  }
  .icon-unfold {
    border-bottom: 1px solid;
    border-left: 1px solid;
  }
}

/deep/.panels-body {
  padding: 10px;
}
/deep/.table-list {
  .item-ctn {
    line-height: 40px;
    &.header {
      line-height: 32px;
      background: #093b49;
      border-bottom: 1px solid rgba(39, 152, 149, 0.1);
      color: #bbe0df;
    }
    &::after {
      background: linear-gradient(
        left,
        transparent 10%,
        #0f4f56 50%,
        transparent 90%
      );
    }
  }
}
</style>
