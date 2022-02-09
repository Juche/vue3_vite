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

    // 线
    const entities = viewer.entities;

    const line = entities.add({
      name: 'Wuhan polyline',
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([114, 30.5, 115, 30.5]),
        width: 10,
        material: Cesium.Color.RED,
      },
    });

    const polyline = line.polyline as Cesium.PolylineGraphics; // For upcoming examples
    polyline.material = new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.2,
      color: Cesium.Color.BLUE,
    });

    // 多边形
    const gon = entities.add({
      name: 'Wuhan polygon',
      polygon: {
        // hierarchy: Cesium.Cartesian3.fromDegreesArray([105, 35, 105, 25, 115, 25, 115, 35]),
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          114.39, 30.49, 114.41, 30.49, 114.41, 30.51, 114.39, 30.51,
        ]),
        height: 2000,
        extrudedHeight: 2400,
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.GREEN,
      },
    });

    viewer.zoomTo(gon);
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
