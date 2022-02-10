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

  let mixer: {
    clipAction: (arg0: any) => { (): any; new (): any; play: { (): void; new (): any } };
    update: (arg0: any) => void;
  };
  let clock: { getDelta: () => any };
  let controls: {
    target: { set: (arg0: number, arg1: number, arg2: number) => void };
    update: () => void;
    enablePan: boolean;
    enableDamping: boolean;
  };
  let stats: { dom: any; update: () => void };
  let renderer: {
    setPixelRatio: (arg0: number) => void;
    setSize: (arg0: number, arg1: number) => void;
    outputEncoding: any;
    domElement: any;
    render: (arg0: any, arg1: any) => void;
  };
  let scene: { background: any; environment: any; add: (arg0: any) => void };
  let camera: {
    position: { set: (arg0: number, arg1: number, arg2: number) => void };
    aspect: number;
    updateProjectionMatrix: () => void;
  };

  function init() {
    clock = new THREE.Clock();
    const container: HTMLElement | null = document.getElementById('container');

    stats = new Stats();
    container?.appendChild(stats.dom);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container?.appendChild(renderer.domElement);

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
      '/src/assets/threejs/models/LittlestTokyo.glb',
      function (gltf: { scene: any; animations: any[] }) {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        animate();
      },
      undefined,
      function (e: any) {
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
