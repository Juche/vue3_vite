<template>
  <div id="cesiumContainer"></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as Cesium from 'cesium';

  onMounted(() => {
    /**
     * 使用Cesium的实体（Entity）API绘制空间数据，如点、标记、标签、线、模型、形状和物体
     */
    const viewer = new Cesium.Viewer('cesiumContainer', {
      // 地球街道图层
      // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      //   url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
      // }),
      imageryProvider: Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
      }),
      // imageryProvider: new Cesium.IonImageryProvider({ assetId: 3812 }),
      geocoder: false, // 地理位置搜索
      homeButton: false, // 默认位置
      sceneModePicker: false, // 模式选择
      baseLayerPicker: false, // 地球的底图
      navigationHelpButton: false, // 帮助
      animation: false, // 动画仪表盘
      timeline: false, // 时间轴
      fullscreenButton: false, // 全屏
      // selectionIndicator: false, // 选择指示器
      infoBox: false, // 信息框
      // vrButton: false, // VR
      // automaticallyTrackDataSourceClocks: false, // 自动追踪数据源时钟
    });

    // 根据添加的顺序从下到上绘制图层
    // 使用add、remove和get等函数对图层集合进行操作。
    // 使用raise、raiseToTop、lower和lowerToBottom对层进行重新排序
    const layers = viewer.scene.imageryLayers;

    // 地球夜景图层
    const blackMarble = layers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3812 }));
    blackMarble.alpha = 0.5;
    blackMarble.brightness = 2.0;

    // 图片贴图图层
    const avatar = layers.addImageryProvider(
      new Cesium.SingleTileImageryProvider({
        // url: '/src/assets/logo.png',
        url: '/logo.png',
        rectangle: Cesium.Rectangle.fromDegrees(114.39, 30.49, 114.41, 30.51),
      }),
    );

    viewer.zoomTo(avatar);
    // viewer.flyTo(avatar);
  });
</script>

<style lang="less" scoped>
  #cesiumContainer {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
  }
</style>
