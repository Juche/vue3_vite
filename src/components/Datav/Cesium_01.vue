<template>
  <el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer>
    <!-- 修改定位 和 位置偏移 -->
    <vc-drawings
      ref="drawingsRef"
      position="bottom-left"
      :mainFabOpts="mainFabOpts"
      :offset="[20, 80]"
      :editable="editable"
      :clampToGround="clampToGround"
      @drawEvt="drawEvt"
      @activeEvt="activeEvt"
      @editorEvt="editorEvt"
      @mouseEvt="mouseEvt"
      @ready="drawingsReadyDefault"
      :pointDrawingOpts="pointDrawingOpts"
      :polygonDrawingOpts="polygonDrawingOpts"
      :regularDrawingOpts="regularDrawingOpts"
    ></vc-drawings>
    <!-- 结合 slot 改变默认 UI，自定义绘制方法 -->
    <vc-drawings
      ref="drawingsCustomRef"
      position="bottom-left"
      :mainFabOpts="mainFabOpts"
      :offset="[0, 20]"
      :editable="editable"
      :clampToGround="clampToGround"
      @ready="drawingsReady"
      :polylineDrawingOpts="polylineDrawingOpts"
      :pinDrawingOpts="pinDrawingOpts"
      :rectangleDrawingOpts="rectangleDrawingOpts"
    >
      <template #body>
        <div class="custom-drawings">
          <el-row>
            <el-button
              v-for="(drawingActionInstance, index) in drawingActionInstances"
              :key="index"
              :type="drawingActionInstance.isActive ? 'success' : 'primary'"
              round
              @click="toggle(drawingActionInstance)"
              >{{drawingActionInstance.tip.replace('绘制', '')}}</el-button
            >
            <el-button type="danger" round @click="clear">清除</el-button>
          </el-row>
        </div>
      </template>
    </vc-drawings>
    <vc-primitive-tileset
      url="https://zouyaoji.top/vue-cesium/SampleData/Cesium3DTiles/Tilesets/dayanta/tileset.json"
      @readyPromise="onTilesetReady"
    ></vc-primitive-tileset>
    <vc-layer-imagery>
      <vc-provider-imagery-tianditu mapStyle="img_c" :maximumLevel="17" token="436ce7e50d27eede2f2929307e6b33c0"></vc-provider-imagery-tianditu>
    </vc-layer-imagery>
    <vc-provider-terrain-cesium v-if="addTerrain"></vc-provider-terrain-cesium>
  </vc-viewer>
  <el-row class="demo-toolbar">
    <el-button type="danger" round @click="unload">销毁</el-button>
    <el-button type="danger" round @click="load">加载</el-button>
    <el-button type="danger" round @click="reload">重载</el-button>
    <el-checkbox v-model="editable">可编辑</el-checkbox>
    <el-checkbox v-model="addTerrain">地形</el-checkbox>
    <el-checkbox v-model="clampToGround">贴地</el-checkbox>
  </el-row>
</el-row>
</template>

<script>
  let viewer = undefined
  export default {
    data() {
      return {
        addTerrain: false,
        drawingActionInstances: [],
        editable: false,
        clampToGround: false,
        mainFabOpts: {
          direction: 'right'
        },
        polylineDrawingOpts: {
          loop: true
        },
        rectangleDrawingOpts: {
          regular: false
        },
        pinDrawingOpts: {
          billboardOpts: {
            image: 'https://zouyaoji.top/vue-cesium/images/grepin.png'
          },
          labelOpts: {
            text: '图标点',
            pixelOffset: [0, -60]
          }
        },
        pointDrawingOpts: {
          preRenderDatas: [
            [108.96018, 34.21948, 50],
            [108.9602, 34.21895, 100]
          ]
        },
        polygonDrawingOpts: {
          preRenderDatas: [
            [
              [108.95808, 34.21955, 30],
              [108.95948, 34.22039, 20],
              [108.9595, 34.21914, 25]
            ],
            [
              [108.955, 34.21857],
              [108.95573, 34.21856],
              [108.95573, 34.21761],
              [108.95499, 34.21761]
            ]
          ]
        },
        regularDrawingOpts: {
          preRenderDatas: [
            [
              [108.95474, 34.22204],
              [108.95564, 34.22166]
            ]
          ]
        }
      }
    },
    methods: {
      drawingsReadyDefault({ Cesium, viewer, cesiumObject }) {
        console.log('绘制选项参数：', cesiumObject)
      },
      clear() {
        this.$refs.drawingsCustomRef.clearAll()
      },
      drawingsReady({ Cesium, viewer, cesiumObject }) {
        this.drawingActionInstances = cesiumObject
      },
      toggle(drawingActionInstance) {
        this.$refs.drawingsCustomRef.toggleAction(drawingActionInstance.name)
      },
      onTilesetReady(tileset, viewer) {
        const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
        const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height)
        const offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 5)
        const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
        viewer.zoomTo(tileset)
        viewer.scene.globe.depthTestAgainstTerrain = true
        this.restoreCursorMove = 'auto'
        this.drawing = false
      },
      drawEvt(e, viewer) {
        const restoreCursor = getComputedStyle(viewer.canvas).cursor
        if (e.finished) {
          if (e.type === 'move') {
            viewer.canvas.setAttribute('style', `cursor: ${this.restoreCursorMove}`)
          }
          this.drawing = false
        } else {
          this.drawing = true
          if (e.type === 'move') {
            viewer.canvas.setAttribute('style', 'cursor: move')
          }
          if (e.type === 'new') {
            viewer.canvas.setAttribute('style', 'cursor: crosshair')
          }
        }
      },
      activeEvt(e, viewer) {
        console.log(e)
        viewer.canvas.setAttribute('style', `cursor: ${e.isActive ? 'crosshair' : 'auto'}`)
        if (!e.isActive) {
          this.drawing = false
          this.restoreCursorMove = 'auto'
        }
      },
      editorEvt(e, viewer) {
        if (e.type === 'move') {
          viewer.canvas.setAttribute('style', 'cursor: move')
          this.drawing = true
        } else {
          viewer.canvas.setAttribute('style', 'cursor: auto')
        }
      },
      mouseEvt(e, viewer) {
        const restoreCursor = getComputedStyle(viewer.canvas).cursor
        if (!this.drawing) {
          console.log(e)
          if (e.type === 'onmouseover') {
            this.restoreCursorMove = restoreCursor
            viewer.canvas.setAttribute('style', 'cursor: pointer')
          } else {
            viewer.canvas.setAttribute('style', `cursor: ${this.restoreCursorMove || 'auto'}`)
          }
        }
      },
      unload() {
        this.$refs.drawingsRef.unload()
      },
      load() {
        this.$refs.drawingsRef.load()
      },
      reload() {
        this.$refs.drawingsRef.reload()
      }
    }
  }
</script>
