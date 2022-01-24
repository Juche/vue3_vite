<template>
  <!-- Head: HI THERE -->
  <div class="bloc bloc-head">
    <!-- <img :src="hiThere" alt="" /> -->
    <!-- <ImgSvg /> -->
    <!-- <object id="hi-there" type="image/svg+xml" data="../src/assets/svg/hi-there.svg" /> -->
    <!-- <object id="hi-there2" type="image/svg+xml" :data="hiThere" /> -->
    <div id="hi-there" @click="hiReset" />
    <RenderImg />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import Vivus from 'vivus';
  import hiThere from '/@/assets/svg/hi-there.svg';
  import { RenderImg } from './RImg';

  let hi;
  function hiReset() {
    hi.reset().play();
  }

  onMounted(() => {
    // new Vivus('my-div', { duration: 200, file: 'link/to/my.svg' }, myCallback);
    hi = new Vivus(
      'hi-there',
      {
        type: 'scenario-sync',
        duration: 20,
        start: 'autostart',
        dashGap: 20,
        forceRender: false,
        file: hiThere,
      },
      function () {
        if (window.console) {
          console.log('Animation finished. [log triggered from callback]');
        }
      },
    );
  });
</script>

<style lang="less" scoped>
  // svg {
  //   // width: 100%;
  //   // height: 150px;
  //   // stroke-width: 3;
  // }

  [id^='hi-there'] {
    color: #ff0;
  }

  #hi-there1 {
    color: #5aa8c5;
    padding: 30px;
  }

  #hi-there2 {
    color: #ff495f;
  }

  #hi-there3 {
    color: #f7a800;
  }

  #hi-there {
    color: #4fe084;
  }

  /deep/ svg g {
    fill: none;
    // stroke: #ff0;
    stroke: currentColor;
  }

  // button,
  // .button {
  //   margin: 0;
  //   padding: 3px 6px;
  //   border-radius: 6px;
  //   border: 1px solid currentColor;
  //   color: inherit;
  //   background-color: rgba(0, 0, 0, 0);
  //   font-size: 0.6rem;
  //   font-weight: 300;
  //   text-decoration: none;
  //   cursor: pointer;
  //   outline: 0;
  // }

  // button.active,
  // .button.active {
  //   background-color: currentColor;
  // }

  // button.active span,
  // .button.active span {
  //   color: #ffffff;
  // }
</style>
