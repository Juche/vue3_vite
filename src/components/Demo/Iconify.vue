<template>
  <div class="icon-set" :style="iconStyle">
    <h5>Iconify 使用示例</h5>
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
    <h5>色彩模式</h5>
    <Icon icon="noto:sun" />
    <Icon icon="noto:first-quarter-moon" />
    <Icon icon="noto:new-moon" />
    <Icon icon="noto:sun-behind-small-cloud" />
    <br />
    <Icon icon="noto:full-moon" />
    <Icon icon="noto:waxing-crescent-moon" />
    <Icon icon="noto:last-quarter-moon" />
    <Icon icon="noto:waning-crescent-moon" />
    <Icon icon="openmoji:sun" />
    <Icon icon="openmoji:sun-behind-small-cloud" />
    <Icon icon="openmoji:full-moon" />
    <Icon icon="openmoji:last-quarter-moon" />
    <Icon icon="openmoji:new-moon" />
    <Icon icon="emojione-v1:sun" />
    <Icon icon="emojione-v1:sun-behind-cloud" />
    <Icon icon="emojione:sun-behind-small-cloud" />
    <Icon icon="emojione:sun-behind-large-cloud" />
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
