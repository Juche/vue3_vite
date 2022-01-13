<template>
  <canvas id="canvasDom2"></canvas>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { onMounted } from 'vue';

  function init() {
    // const renderer = new THREE.WebGLRenderer();
    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvasDom2'),
    });
    renderer.setSize(200, 100);
    renderer.setClearColor(0x000000);
    // document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);
  }

  // init();
  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped>
  #canvasDom2 {
    width: 400px;
    height: 300px;
  }
</style>
