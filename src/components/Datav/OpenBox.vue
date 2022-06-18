<template>
  <canvas id="canvasBox"></canvas>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { onMounted } from 'vue';

  function init() {
    const width = 500;
    const height = 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvasBox'),
    });
    renderer.setSize(width, height);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/src/assets/images/box/top.png');

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      // color: 0xff0000,
    });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }

  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped></style>
