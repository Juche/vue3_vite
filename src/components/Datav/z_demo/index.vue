<template>
  <view class="page-ctn">
    <ToyLandTab class="toy-land-box" :activeId="idx" @on-click="setClick"></ToyLandTab>
    <CustomNavBar barBg="rgba(0, 0, 0, 0)" :config="navConfig" @click-icon="isActive = false">
      <image v-if="idx === 1" class="logo-image" :src="imgUrl" mode="aspectFit" />
      <view v-if="idx === 2">小游戏</view>
    </CustomNavBar>
    <view class="ctt-ctn" :class="{ active: idx === 1, activeSecond: idx === 2 }">
      <view class="first-box-1">
        <view
          class="container-full type-area"
          :style="{ background: canvasBG, backgroundSize: 'cover', backgroundPosition: 'top' }"
        >
          <canvas
            class="webgl-canvas"
            type="webgl"
            id="webgl"
            @click.stop="clickModel"
            @touchstart="onTX"
            @touchmove="onTX"
            @touchend="onTX"
          />
          <view class="ani-ul" :class="{ active: isActive }">
            <image
              v-for="(item, index) in list"
              :key="item.id"
              :class="{ active: item.active }"
              :src="item.icon"
              mode="aspectFit"
              @click.stop="clickAni(item, index)"
            />
          </view>

          <FaceMask ref="faceMask"></FaceMask>
        </view>
      </view>
      <game class="second-box-2"></game>
    </view>
    <!-- <view class="bar-view" :class="{ 'hide-bar': isActive }"></view> -->
    <!-- <cover-view></cover-view> -->
    <CustomTab class="custom-tab" :class="{ 'hide-bar': isActive }" />
    <Loading ref="loading" :config="loadingConfig" />
  </view>
</template>

<script>
  import zThree from '@/plugin/threejs/index.js';
  import game from './game/game.vue';
  let threeModel = null;

  export default {
    components: {
      game,
    },
    data() {
      return {
        modelSrc: '',
        isActive: false,
        idx: 1,
        list: [
          { id: 1, icon: require('@/static/images/icon05.png'), index: 2, active: false },
          { id: 2, icon: require('@/static/images/icon06.png'), index: 3, active: false },
          { id: 3, icon: require('@/static/images/icon07.png'), index: 4, active: false },
          { id: 4, icon: require('@/static/images/icon08.png'), index: 5, active: false },
        ],
        loadingConfig: {
          note: '模型加载中...',
        },
      };
    },
    methods: {
      init() {
        // this.$refs.loading.open();
        const query = uni.createSelectorQuery().in(this).select('#webgl');
        query.node().exec((res) => {
          threeModel = new zThree(res[0].node, {
            modelPos: [0, -0.3, 0],
            cameraPos: [0, 0, 2.2],
            // modelPos: [0, -0.5, 0],
            // cameraPos: [0, 0, 3],
            modelSrc: this.modelSrc,

            // modelPos: [0, 0, 0],
            // cameraPos: [0, 0, 25],
            // modelSrc: `${this.assets}/models/gou_bai.fbx`,
            // modelSrc: `${this.assets}/models/gou_ds.fbx`,
            // modelSrc: `${this.assets}/models/bulu/bulu-7-3.fbx`, // 这两个模型翅膀一直完整
            // modelSrc: `${this.assets}/models/spaceman.fbx`, // 太空人模型
            // modelSrc: `${this.assets}/models/bulu.fbx`, // 这个无法线,效果较好

            // modelSrc: `${this.assets}/models/03fx/FX366.fbx`, // 方块
            // modelSrc: `${this.assets}/models/03fx/323WFS.fbx`,
            // modelSrc: `${this.assets}/models/03fx/323.fbx`, // 当前效果最好的模型
            // modelSrc: `${this.assets}/models/03fx/323YB3.FBX`,
          });
          console.log(`🚀 ~ query.node ~ threeModel`, threeModel);
          // this.$refs.loading.close();
        });

        // threeModel.loadFinish = () => {
        //   // console.log(`🚀 ~ init ~ threeModel.loadFinish`, threeModel.loadFinish);
        //   this.$refs.loading.close();
        // };
      },
      onTX(e) {
        if (threeModel) {
          threeModel.dispatchTouchEvent(e);
        }
      },
      clickAni(info, aniIdx) {
        if (!this.isActive) {
          this.isActive = true;
        }
        let list = JSON.parse(JSON.stringify(this.list));
        this.list = list.map((item) => {
          item.active = info.id === item.id;
          return item;
        });

        const faceMask = this.$refs.faceMask;
        if (faceMask) {
          faceMask.open(info.index, 1);
        }

        this.startAni(aniIdx + 1);
      },
      startAni(aniIdx) {
        if (threeModel) {
          // threeModel.sceneAddFBX({ aniIdx: aniIdx });
          threeModel.startAni(aniIdx);
        }
      },
      clickModel(e) {
        const pickObj = threeModel.onclick(e);
        if (pickObj) {
          console.log(`🚀 ~ clickModel ~ pickObj.object`, pickObj.object);
          console.log(
            `🚀 ~ clickModel ~ pickObj.object.object.name`,
            pickObj?.object?.object?.name
          );
          // uni.$z.toast(pickObj.object.name)
          const name = pickObj?.object?.name;
          console.log(`🚀 ~ clickModel ~ name`, name);
          // let aniIdx = 0;
          // this.startAni(aniIdx);
          if (name.indexOf('Index_') === 0) {
            const indexs = name.replace('Index_', '');
            const arr = indexs.split('_');
            const i = Math.random() * (arr.length - 1);
            const index = arr[i.toFixed(0)];

            let aniIdx = typeof (index - 1) === 'number' ? index - 1 : 1;
            console.log(`🚀 ~ clickModel ~ aniIdx`, index);
            this.startAni(+aniIdx);
          }
        }
      },
      changePage(item) {
        this.activeId = item.id;
      },
      setClick(val) {
        this.idx = val ? 1 : 2;
      },
    },
    computed: {
      navConfig() {
        let obj = {
          type: 'forward',
          path: '/pages/toyLand/setting',
          icon: this.iconUrl,
          iconSize: [22, 22],
        };
        if (this.isActive) {
          obj.type = 'emit';
          obj.icon = require(`@/static/images/icon_close.png`);
          obj.iconSize = [22, 22];
        }
        return obj;
      },
      canvasBG() {
        if (typeof this.color === 'string') {
          return `url(${this.color})`;
        }
        const { r, g, b, a } = this.color;
        return `rgba(${r},${g},${b},${a})`;
        // return `url(${this.assets}/images/sceneBg/ocean.png)`;
      },
      color() {
        return uni.$vuex.get('canvasBg');
      },
      iconUrl() {
        let { r, g, b, a } = uni.$vuex.get('canvasBg');
        return require(`@/static/images/icon12.png`);
        // return 0.213 * r + 0.715 * g + 0.072 * b > 255 / 2
        //   ? require(`@/static/images/icon13.png`)
        //   : require(`@/static/images/icon12.png`);
      },
      imgUrl() {
        let { r, g, b, a } = uni.$vuex.get('canvasBg');
        return 0.213 * r + 0.715 * g + 0.072 * b > 255 / 2
          ? require(`@/static/images/logo_black.png`)
          : require(`@/static/images/logo.png`);
      },
    },
    watch: {
      // threeModel: {
      //   deep: true,
      //   handler(val) {
      //     // console.log(`🚀 ~ handler ~ val`, val);
      //     if (val.loadFinish) {
      //       this.$refs.loading.close();
      //     }
      //   },
      // },
      // 'threeModel.loadFinish': {
      //   handler(val) {
      //     if (val) {
      //       this.$refs.loading.close();
      //     }
      //   },
      // },
    },
    onShow() {
      this.startAni(0);
    },
    onLoad(option) {
      // console.log(`🚀 ~ onLoad ~ option?.modelSrc`, option?.modelSrc);
      if (option?.modelSrc) {
        this.modelSrc = option.modelSrc;
      } else {
        // 测好的模型
        this.modelSrc = `${this.assets}/models/spaceman.fbx`;
        // this.modelSrc = `${this.assets}/models/bulu.fbx`;
        // this.modelSrc = `${this.assets}/models/ds.fbx`;
        // this.modelSrc = `${this.assets}/models/shaoqing.fbx`;

        // this.modelSrc = `${this.assets}/models/ds_gou_dx_6he1.fbx`;  // 优化的 DS

        // 萌獭江湖模型 start
        // this.modelSrc = `${this.assets}/models/mengtajianghu/WUfaxian.fbx`;
        // this.modelSrc = `${this.assets}/models/mengtajianghu/YOUfaxian.fbx`;
        // this.modelSrc = `${this.assets}/models/mengtajianghu/DALISIshaoqing-1.fbx`;
        // 萌獭江湖模型 end

        // this.modelSrc = `${this.assets}/models/bulu04071630.fbx`;
        // this.modelSrc = `${this.assets}/models/spaceman.fbx`;
        // this.modelSrc = `${this.assets}/models/6heyi13.fbx`;  // 面罩没问题的太空人
        // this.modelSrc = `${this.assets}/models/bulu_a_2_0.fbx`; // 翅膀正常显示的 bulu & box
        // this.modelSrc = `${this.assets}/models/bulu_a_2.fbx`; // 翅膀正常显示的 bulu & 虚拟对象
        // this.modelSrc = `${this.assets}/models/bulu_a_1.fbx`; // 法线贴图
        // this.modelSrc = `${this.assets}/models/bulu_a_3.fbx`; // sun测试模型
        // this.modelSrc = `${this.assets}/models/box04061802.fbx`;  // 方块测试法线贴图
        // this.modelSrc = `${this.assets}/models/BULU-12.fbx`; // 虚拟对象
        // this.modelSrc = `${this.assets}/models/gou_6he1-2.fbx`;
        // this.modelSrc = `${this.assets}/models/ds_gou_dx_6he1_9.fbx`;
        // this.modelSrc = `${this.assets}/models/gou_6he1_3.fbx`;
        // this.modelSrc = `${this.assets}/models/spaceman04061053.fbx`;
        // this.modelSrc = `${this.assets}/models/spaceman04061645.FBX`;
        // this.modelSrc = `${this.assets}/models/259.fbx`;
        // this.modelSrc = `${this.assets}/models/dummy.fbx`;
        // this.modelSrc = `${this.assets}/models/spaceman04061757.fbx`;
        // this.modelSrc = `${this.assets}/models/123456.fbx`;
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.init();
      });
    },
    onUnload() {
      if (threeModel) {
        threeModel.dispose();
        threeModel = null;
      }
    },
  };
</script>

<style lang="scss">
  .page-ctn {
    height: 100vh;
    overflow: hidden;
  }

  .ctt-ctn {
    height: 200vh;
    transform: translateY(0vh);
    transition: all 1s;
  }
  .active {
    transform: translateY(0vh);
  }

  .activeSecond {
    transform: translateY(-100vh);
  }
  // .container-full {
  //   // padding-left: 0;
  //   // padding-right: 0;
  //   // padding-top: 0;
  //   background-size: cover;
  //   background-position: top;
  // }
  .webgl-canvas {
    // position: absolute;
    // left: 0;
    // top: 0;
    // width: 750rpx;
    width: 100vw;
    height: 100vh;
    flex: 1;
  }
  .logo-image {
    // position: absolute;
    // left: 50%;
    // top: px(70);
    // transform: translateX(-50%) translateZ(1000px);
    // transform: translateX(-50%);
    width: px(93);
    height: $px16;
    // z-index: 9999999;
  }
  .ani-ul {
    position: absolute;
    bottom: 100vh;
    z-index: 99;
    padding: $px16 $px30;
    border-radius: $px60;
    background-color: rgba(255, 255, 255, 0.4);
    transition: all 0.5s ease-in-out;
    // margin-bottom: $px76;
    margin-bottom: px(115);
    image {
      width: $px30;
      height: $px30;
      margin-right: $px30;
      &:last-child {
        margin-right: 0;
      }
    }
    &.active {
      transform: translateY(50%);
      background: none;
      image {
        padding: $px20;
        border-radius: $px20;
        margin-right: $px14;
        background-color: rgba(255, 255, 255, 0.4);
        transition: all 0.3s ease-in-out;
        &.active {
          background-color: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }
      }
    }
  }
  .custom-tab {
    position: relative;
    z-index: 99;
    transition: all 0.5s ease-in-out;
  }
  .hide-bar {
    opacity: 0;
    visibility: hidden;
  }
</style>
