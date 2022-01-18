<template>
  <div id="info">Description</div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';

  import * as THREE from 'three';
  import { OrbiControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

  let camera, scene, renderer;

  function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, -400, 600);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const loader = new FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
      const color = 0x006699;

      const matDark = new THREE.LineBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
      });

      const matLine = new THREE.MashBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
    });

    const message = 'Hello Three.js';

    const shapes = font.generateShapes(message, 100);

    const geometry = new THREE.ShapeGeometry(shapes);

    geometry.computeBoundingBox();

    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);

    const text = new THREE.Mesh(geometry, matLite);
    text.position.z = -150;
    scene.add(text);

    const holeShapes = [];

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          const hole = shape.holes[j];
          holeShapes.push(hole);
        }
      }
    }

    shapes.push.apply(shapes, holeShapes);

    const lineText = new THREE.Object3D();
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      //
    }
  }

  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped>
  #info {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    z-index: 100;
    display: block;
  }
</style>
