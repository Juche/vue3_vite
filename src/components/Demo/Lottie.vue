<template>
  <div class="box">
    <div id="lottie_box"></div>
    <button @click="startFun">播放</button>
    <button @click="suspendFun">暂停</button>
  </div>
</template>

<script>
  import lottie from 'lottie-web';

  export default {
    name: 'Lottie',
    data() {
      return {
        lottie: {},
      };
    },
    methods: {
      suspendFun: function () {
        this.lottie.pause();
      },
      startFun: function () {
        this.lottie.play();
      },
    },
    mounted() {
      this.lottie = lottie.loadAnimation({
        container: document.getElementById('lottie_box'),
        renderer: 'svg',
        loop: true,
        // path: '/src/assets/json/lottie/markus.json',
        path: '/src/assets/json/lottie/bell.json',
      });
    },
  };
</script>

<style>
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    height: 300px;
  }
  /* #bm {
    width: 100%;
    height: 100%;
    margin: 0px auto;
  } */
</style>
