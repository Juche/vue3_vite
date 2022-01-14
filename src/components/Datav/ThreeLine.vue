<template>
  <canvas id="canvasDom1"></canvas>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { onMounted } from 'vue';

  const width = 200;
  const height = 100;

  function init() {
    // const renderer = new THREE.WebGLRenderer();
    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvasDom1'),
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xff0000);
    // document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(-20, -10, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(20, -10, 0));
    points.push(new THREE.Vector3(-20, -10, 0));

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
  #canvasDom1 {
    width: 400px;
    height: 300px;
  }
</style>
