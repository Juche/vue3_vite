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

    // Camera
    // Camera控制场景的视图
    // 有很多方法可以操作Camera
    // 如旋转(rotate)、缩放(zoom)、平移(pan)和飞到目的地(flyTo)
    // CesiumJS有鼠标和触摸事件用来处理与Camera的交互，还有API来以编程方式操作摄像机

    // Camera controls
    // Use the viewer.zoomTo command to view a particular entity. There is also a viewer.flyTo method that performs an animated camera flight to the entity. Both of these methods can be passed to an Entity, EntityCollection, a DataSource, or an array of entities.
    // Either method calculates a view of all provided entities. By default, the camera is oriented north and is looking down from a 45 degree angle. Customize this by passing in a HeadingPitchRange

    let heading = Cesium.Math.toRadians(30.0);
    let pitch = Cesium.Math.toRadians(-60.0);

    // zoomTo/flyTo 的目标是 entity 实体
    // viewer.zoomTo(gon, new Cesium.HeadingPitchRange(heading, pitch, 10000));
    viewer
      .flyTo(gon, {
        duration: 5,
        offset: new Cesium.HeadingPitchRange(heading, pitch, 10000),
      })
      .then((result) => {
        // 在flyTo完成后执行
        console.log(`🚀 ~ .then ~ result`, result);
        viewer.selectedEntity = gon;
      });
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
