<template>
  <div id="cesiumContainer"></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as Cesium from 'cesium';

  onMounted(() => {
    const viewer = new Cesium.Viewer('cesiumContainer', {
      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
      }),
      baseLayerPicker: false,
    });

    const layers = viewer.scene.imageryLayers;
    const blackMarble = layers.addImageryProvider(
      new Cesium.TileMapServiceImageryProvider({
        url: '//cesiumjs.org/tilesets/imagery/blackmarble',
        maximumLevel: 8,
        credit: 'Black Marble imagery courtesy NASA Earth Observatory',
      }),
    );

    const wuhan = viewer.entities.add({
      name: 'Wuhan',
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

    const entity = viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([114, 30.5, 115, 30.5]),
        width: 10,
        material: Cesium.Color.RED,
      },
    });

    const polyline = entity.polyline; // For upcoming examples

    polyline.material = new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.2,
      color: Cesium.Color.BLUE,
    });

    viewer.zoomTo(wuhan);
    // viewer.zoomTo(viewer.entities);
  });
</script>

<style lang="less" scoped>
  #cesiumContainer {
    width: 100%;
  }
</style>
