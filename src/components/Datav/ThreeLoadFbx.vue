<template>
  <canvas
    class="webgl-canvas"
    type="webgl"
    id="webgl"
    @click.stop="clickModel"
    @touchstart="onTX"
    @touchmove="onTX"
    @touchend="onTX"
  ></canvas>
</template>

<script>
  /**
   * TODO:
   *   模型剧中
   *   手势交互
   *   法线贴图
   */
  // import zThree from '@/plugin/threejs/index.js';
  import zThree from './zThree.js';
  let threeModel = null;
  export default {
    data() {},
    mounted() {
      // draw();
      this.$nextTick(function () {
        this.init();
      });
    },
    methods: {
      init() {
        const canvas = document.getElementById('webgl');
        threeModel = new zThree(canvas, {
          modelPos: [0, 0, 0],
          cameraPos: [0, 0, 2.2],
          // modelPos: [0, -0.5, 0],
          // cameraPos: [0, 0, 3],
          // modelSrc: this.modelSrc,
          // modelSrc: "/src/assets/threejs/models/fbx/Naruto.fbx",
          // modelSrc: "/src/assets/threejs/models/fbx/Samba Dancing.fbx",
          modelSrc: '/src/assets/threejs/models/fbx/bulu.fbx',
          // modelSrc: '/src/assets/threejs/models/fbx/ds.fbx',
          // modelSrc: "/src/assets/threejs/models/fbx/shaoqing.fbx",
          // modelSrc: '/src/assets/threejs/models/fbx/spaceman.fbx',

          // modelSrc: '/src/assets/threejs/models/fbx/bulu04121009.fbx',
          // modelSrc: '/src/assets/threejs/models/fbx/bulu04121026.fbx',
          // modelSrc: '/src/assets/threejs/models/fbx/bulu04121057.fbx',

          // modelSrc: '/src/assets/threejs/models/fbx/bulu/bulu-7.fbx',
          // modelSrc: '/src/assets/threejs/models/fbx/bulu/bulu-7-1.fbx',
          // modelSrc: '/src/assets/threejs/models/fbx/bulu/bulu-7-2.fbx',
          // modelSrc: '/src/assets/threejs/models/fbx/bulu/bulu-7-3.fbx',
          // modelSrc: '/src/assets/threejs/models/fbx/bulu/bulu-7-4.fbx',

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
      },
      onTX(e) {
        // 模型手势交互 Raycaster
        console.log(`🚀 ~ onTX ~ e`, e);
        // if (threeModel) {
        //   threeModel.dispatchTouchEvent(e);
        // }
      },
      clickModel(e) {
        const pickObj = threeModel.onclick(e);
        if (pickObj) {
          console.log(`🚀 ~ clickModel ~ pickObj.object`, pickObj.object);
          console.log(
            `🚀 ~ clickModel ~ pickObj.object.object.name`,
            pickObj?.object?.object?.name,
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

        // this.raycaster = new THREE.Raycaster();
        // this.mouse = new THREE.Vector2();
        // console.log(`🚀 ~ clickModel ~ e`, e);
        // this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        // this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        // this.raycaster.setFromCamera(this.mouse, this.camera);

        // // 这里我们只检测模型的选中情况
        // let intersects = this.raycaster.intersectObjects(scene.children, true);
        // console.log(`🚀 ~ clickModel ~ intersects`, intersects);

        // if (intersects.length > 0) {
        //   let selectedObjects = intersects[0].object;
        //   console.log(`🚀 ~ clickModel ~ selectedObjects`, selectedObjects);
        //   //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
        //   // for (var i = 0; i < intersects.length; i++) {
        //   //   intersects[i].object.material.color.set(0xff0000);
        //   // }
        // }
      },
      startAni(aniIdx) {
        if (threeModel) {
          // threeModel.sceneAddFBX({ aniIdx: aniIdx });
          threeModel.startAni(aniIdx);
        }
      },
    },
  };

  // onMounted(() => {
  //   draw();
  //   // animate();
  // });
</script>

<style lang="less" scoped>
  #container {
    background-color: #bfe3dd;
  }
</style>
