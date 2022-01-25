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
        // path: '/src/assets/json/lottie/bell.json',
        path: '/src/assets/json/lottie/email-sent.json',
        // path: '/src/assets/json/titanic/pause.json',
        // path: '/src/assets/json/titanic/checkbox.json',
        // path: '/src/assets/json/titanic/menu-close.json',
        // path: '/src/assets/json/titanic/heart.json',
        // path: '/src/assets/json/titanic/shield.json',
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

  /* #lottie_box {
    width: 100px;
    height: 100px;
    display: inline-block;
  } */

  /* #lottie_box path {
    fill: #0f0;
    stroke: #f00;
  } */
</style>
