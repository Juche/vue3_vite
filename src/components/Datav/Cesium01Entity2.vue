<template>
  <div id="cesiumContainer"></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as Cesium from 'cesium';

  // import { Lottie, Vivus } from '/@/components/Demo';
  // <Lottie :option="lottieOption"></Lottie>
  // <Vivus></Vivus>

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
      // infoBox: false, // 信息框
      // vrButton: false, // VR
      // automaticallyTrackDataSourceClocks: false, // 自动追踪数据源时钟
    });

    // 线
    const entities = viewer.entities;

    const line = entities.add({
      name: 'Wuhan polyline',
      id: 'Wuhan polyline',
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([114, 30.5, 115, 30.5]),
        width: 10,
        material: Cesium.Color.RED,
      },
    });

    // const ETT = viewer.entities.getById('Wuhan polyline');
    const ETT = viewer.entities.getOrCreateEntity('Wuhan polyline');
    console.log(`🚀 ~ onMounted ~ ETT`, ETT);

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
      // Entity.description的属性用于通过 InfoBox 呈现更多的信息
      // InfoBox中展示的所有HTML是沙盒式的。
      // 为了在描述中运行JavaScript或浏览器插件，访问沙盒中的iframe通过viewer.infoBox.frame属性
      description: `
        <img
          style="float:left; margin: 0 1em 1em 0; width: 150px; height: 150px;"
          src="/src/assets/svg/icons8-microsoft-edge-50.svg"/>
        <p>
          Wyoming is a state in the mountain region of the Western
          United States.
        </p>
        <p>
          Wyoming is the 10th most extensive, but the least populous
          and the second least densely populated of the 50 United
          States. The western two thirds of the state is covered mostly
          with the mountain ranges and rangelands in the foothills of
          the eastern Rocky Mountains, while the eastern third of the
          state is high elevation prairie known as the High Plains.
          Cheyenne is the capital and the most populous city in Wyoming,
          with a population estimate of 63,624 in 2017.
        </p>
        <p>
          Source:
          <a style="color: WHITE"
            target="_blank"
            href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>
        </p>`,
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
