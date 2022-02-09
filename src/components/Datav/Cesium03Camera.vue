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
        positions: Cesium.Cartesian3.fromDegreesArray([114.35, 30.5, 114.45, 30.5]),
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

    const camera = viewer.camera;
    let heading = Cesium.Math.toRadians(30.0);
    let pitch = Cesium.Math.toRadians(-60.0);

    // zoomTo/flyTo 的目标是 entity 实体
    // viewer.zoomTo(gon, new Cesium.HeadingPitchRange(heading, pitch, 10000));
    viewer
      .flyTo(entities, {
        duration: 5,
        offset: new Cesium.HeadingPitchRange(heading, pitch, 20000),
      })
      .then((result) => {
        // 在flyTo完成后执行
        console.log(`🚀 ~ .then ~ result`, result);
        viewer.selectedEntity = gon;

        setTimeout(() => {
          // gon.position = Cesium.Cartesian3.fromDegrees(114.39, 30.49, 2200);
          // viewer.trackedEntity = gon;

          // setView 设置相机的位置和方向
          camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(114.38, 30.46, 10000),
            orientation: {
              heading: Cesium.Math.toRadians(30.0),
              pitch: Cesium.Math.toRadians(-60.0),
              roll: 0.0,
            },
          });
        }, 2000);
      });

    const scene = viewer.scene;
    const canvas = scene.canvas;
    const ellipsoid = scene.globe.ellipsoid;

    canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
    canvas.onclick = function () {
      canvas.focus();
    };

    // 使用默认的事件处理器，可以使用viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)移除默认的点击事件

    // ScreenSpaceCameraController将用户输入（如鼠标和触摸）从窗口坐标转换为Camera运动
    // 包含用于启用和禁用不同类型输入、修改惯性量以及最小和最大缩放距离的属性。
    // disable the default event handlers
    // scene.screenSpaceCameraController.enableRotate = false;
    // scene.screenSpaceCameraController.enableTranslate = false;
    // scene.screenSpaceCameraController.enableZoom = false;
    // scene.screenSpaceCameraController.enableTilt = false;
    // scene.screenSpaceCameraController.enableLook = false;
    scene.screenSpaceCameraController.minimumZoomDistance = 1000;
    scene.screenSpaceCameraController.maximumZoomDistance = 50000;
    console.log(
      `🚀 ~ onMounted ~ scene.screenSpaceCameraController`,
      scene.screenSpaceCameraController,
    );

    // 创建变量记录当前鼠标位置，然后标记并跟随Camera移动轨迹
    let startMousePosition = null,
      mousePosition = null,
      flags = {
        looking: false,
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false,
      };

    // 添加一个事件控制用户设置标记, 当鼠标左键点击时, 记录当前鼠标位置
    const handler = new Cesium.ScreenSpaceEventHandler(canvas);

    handler.setInputAction((movement) => {
      flags.looking = true;
      mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    handler.setInputAction((movement) => {
      mousePosition = movement.endPosition;
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction((position) => {
      flags.looking = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    // 创建键盘事件控制用户切换 Camera 移动标记
    // w: 前/ s: 后/ a: 左/ d: 右/ q: 上/ e: 下
    function getFlagForKeyCode(keyCode: number) {
      switch (keyCode) {
        case 87: // w
          return 'moveForward';
        case 83: // s
          return 'moveBackward';
        case 65: // a
          return 'moveLeft';
        case 68: // d
          return 'moveRight';
        case 81: // q
          return 'moveUp';
        case 69: // e
          return 'moveDown';
        default:
          return undefined;
      }
    }

    document.addEventListener(
      'keydown',
      (e) => {
        const flag = getFlagForKeyCode(e.keyCode);
        if (flag) {
          flags[flag] = true;
        }
      },
      false,
    );

    document.addEventListener(
      'keyup',
      (e) => {
        const flag = getFlagForKeyCode(e.keyCode);
        // console.log(`🚀 ~ onMounted ~ e.keyCode`, e.keyCode);
        // console.log(`🚀 ~ onMounted ~ flag`, flag);
        if (flag) {
          flags[flag] = false;
        }
      },
      false,
    );

    viewer.clock.onTick.addEventListener((clock) => {
      const camera = viewer.camera;

      // 将鼠标点击位置作为坐标点 Coordinate (0.0, 0.0), 地球的变换有别与默认形式
      // if (flags.looking) {
      //   let width = canvas.clientWidth;
      //   let height = canvas.clientHeight;
      //   let x = (mousePosition.x - startMousePosition.x) / width;
      //   let y = -(mousePosition.y - startMousePosition.y) / height;
      //   let lookFactor = 0.05;
      //   camera.lookRight(x * lookFactor);
      //   camera.lookUp(y * lookFactor);
      // }

      // Change movement speed base on the distance of camera to surface of ellipsoid.
      let cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
      let moveRate = cameraHeight / 100.0;

      if (flags.moveForward) {
        camera.moveForward(moveRate);
      }
      if (flags.moveBackward) {
        camera.moveBackward(moveRate);
      }
      if (flags.moveUp) {
        camera.moveUp(moveRate);
      }
      if (flags.moveDown) {
        camera.moveDown(moveRate);
      }
      if (flags.moveLeft) {
        camera.moveLeft(moveRate);
      }
      if (flags.moveRight) {
        camera.moveRight(moveRate);
      }
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
