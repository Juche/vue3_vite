<template>
  <!-- Head: HI THERE -->
  <div class="bloc bloc-head">
    <!--
    <img :src="hiThere" alt="" />
    <ImgSvg />
    <object id="hi-there" type="image/svg+xml" data="../src/assets/svg/hi-there.svg" />
    <object id="hi-there2" type="image/svg+xml" :data="hiThere" />
    <div id="hi-there" @click="hiReset" />
    <RenderImg :imgSrc="synth" @imgPlay="imgPlay" />
    <RenderImg2 :imgSrc="obturateur" />
    <RenderSvg svgId="hi-there" :svgSrc="synth" @svgPlay="hiReset" />
    -->

    <RenderImg :imgSrc="synth" />
    <RenderSvg class="red" svgId="close" :svgSrc="close" />
    <RenderSvg class="green" svgId="hiThere" :svgSrc="hiThere" />
    <RenderSvg class="blue" svgId="obturateur" :svgSrc="obturateur" />
    <RenderSvg class="yellow" svgId="polaroid" :svgSrc="polaroid" />
    <RenderSvg class="" svgId="synth" :svgSrc="synth" />
    <!-- <RenderSvg class="yellow" svgId="appleLogo" :svgSrc="appleLogo" /> -->
  </div>
</template>

<script lang="tsx" setup>
  import { RenderImg, RenderSvg } from './RSvgImg';

  import close from '/@/assets/svg/close.svg';
  import hiThere from '/@/assets/svg/hi-there.svg';
  import obturateur from '/@/assets/svg/obturateur.svg';
  import polaroid from '/@/assets/svg/polaroid.svg';
  import synth from '/@/assets/svg/synth.svg';
  // import appleLogo from '/@/assets/svg/icons8/icons8-apple-logo-50.svg';
</script>

<style lang="less" scoped>
  // svg {
  //   // width: 100%;
  //   // height: 150px;
  //   // stroke-width: 3;
  // }

  // [id^='hiThere'] {
  //   color: #ff0;
  // }

  .red {
    color: #ff495f;
  }

  .green {
    color: #4fe084;
  }

  .blue {
    color: #5aa8c5;
    padding: 30px;
  }

  .yellow {
    color: #ff0;
  }

  .orange {
    color: #f7a800;
  }

  ::v-deep svg g {
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
