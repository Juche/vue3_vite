<template>
  <canvas id="canvasBox"></canvas>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { onMounted } from 'vue';

  function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvasBox'),
    });
    renderer.setSize(width, height);

    const textureLoader = new THREE.TextureLoader();
    // const texture = textureLoader.load('/src/assets/images/box/top.png');
    const front = textureLoader.load('/src/assets/images/box/front.png');
    const back = textureLoader.load('/src/assets/images/box/back.png');
    const top = textureLoader.load('/src/assets/images/box/top.png');
    const bot = textureLoader.load('/src/assets/images/box/bot.png');
    const left = textureLoader.load('/src/assets/images/box/left.png');
    const right = textureLoader.load('/src/assets/images/box/right.png');

    const material1 = new THREE.MeshBasicMaterial({ map: front });
    const material2 = new THREE.MeshBasicMaterial({ map: back });
    const material3 = new THREE.MeshBasicMaterial({ map: top });
    const material4 = new THREE.MeshBasicMaterial({ map: bot });
    const material5 = new THREE.MeshBasicMaterial({ map: left });
    const material6 = new THREE.MeshBasicMaterial({ map: right });

    const materials = [material1, material2, material3, material4, material5, material6];

    const geometry = new THREE.BoxGeometry(6, 8, 6);
    // const material = new THREE.MeshBasicMaterial({
    //   map: texture,
    //   // color: 0xff0000,
    // });
    const cube = new THREE.Mesh(geometry, materials);

    scene.add(cube);

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); //环境光的颜色以及强弱
    // 点光
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 20, -2);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 25;

    scene.add(ambientLight);
    scene.add(pointLight);

    camera.position.set(10, 10, 10);
    // camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
    controls.addEventListener('change', animate);
    // window.addEventListener('resize', onWindowResize);

    function animate() {
      // requestAnimationFrame(animate);

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }

  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped></style>
