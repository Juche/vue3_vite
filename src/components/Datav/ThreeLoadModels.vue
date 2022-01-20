<template>
  <div id="container"></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';

  import * as THREE from 'three';
  import Stats from 'three/examples/jsm/libs/stats.module.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

  import { RoomEnvironment } from '/@/assets/threejs/jsm/RoomEnvironment.js';

  let mixer;
  let clock;
  let controls;
  let stats;
  let renderer;
  let scene;
  let camera;

  function init() {
    clock = new THREE.Clock();
    const container = document.getElementById('container');

    stats = new Stats();
    container.appendChild(stats.dom);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(5, 2, 8);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/src/assets/threejs/js/libs/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      '/src/assets/threejs/gltf/LittlestTokyo.glb',
      function (gltf) {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        animate();
      },
      undefined,
      function (e) {
        console.error(e);
      },
    );
  }

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    mixer.update(delta);

    controls.update();

    stats.update();

    renderer.render(scene, camera);
  }

  window.onresize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  onMounted(() => {
    init();
    // animate();
  });
</script>

<style lang="less" scoped>
  #container {
    background-color: #bfe3dd;
  }
</style>
