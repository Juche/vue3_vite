<template>
  <div class="icon-set" :style="iconStyle">
    <Icon icon="mdi:rocket-launch" :inline="true" />
    <Icon icon="mdi:rocket-launch" :inline="true" />
    <Icon icon="mdi:rocket-launch" :inline="true" />
    <Icon icon="mdi:rocket-launch" :inline="true" />
    <Icon icon="mdi:rocket-launch" :inline="true" />
    <!-- Material Design Icons -->
    <Icon icon="mdi:opacity" />
    <Icon icon="mdi:rocket-launch-outline" />
    <Icon icon="mdi-light:chart-histogram" />
    <!-- Google Material Icons -->
    <Icon icon="ic:baseline-rocket-launch" />
    <!-- IconPark -->
    <Icon icon="icon-park:rocket-one" />
    <Icon icon="icon-park-outline:rocket-one" />
    <!-- Font Awesome 5 -->
    <Icon icon="fa-solid:rocket" />
    <Icon icon="fa-regular:hand-rock" />
    <!-- Fluent UI System Icons -->
    <Icon icon="fluent:rocket-20-regular" />
    <!-- VSCode Icons -->
    <Icon icon="vscode-icons:file-type-vue" />
    <!-- Noto Emoji -->
    <Icon icon="noto:crossed-swords" />
    <!-- Noto Emoji (v1) -->
    <Icon icon="noto-v1:flag-for-flag-china" />
    <!-- Twitter Emoji -->
    <Icon icon="twemoji:rocket" />
    <!-- OpenMoji -->
    <Icon icon="openmoji:rocket" />
    <!-- Emoji One (Colored) -->
    <Icon icon="emojione:angry-face-with-horns" />
    <!-- Emoji One (Monotone) -->
    <Icon icon="emojione-monotone:angry-face-with-horns" />
    <!-- Firefox OS Emoji -->
    <Icon icon="fxemoji:fire" />
    <Icon icon="fxemoji:foxheart" />
    <Icon icon="fxemoji:alien" />
    <!-- SVG Logos -->
    <Icon icon="logos:bower" />
    <Icon icon="ion:ios-cart" />
    <Icon icon="mdi:flask" />
    <Icon icon="noto:anchor" />
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue';

  const iconStyle = {
    fontSize: '50px',
    // color: '#f00',
  };
</script>

<style lang="less" scoped>
  h5 {
    font-size: 16px;
    font-weight: bold;
    color: #555;
  }
</style>
