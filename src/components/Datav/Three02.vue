<template>
  <canvas id="canvasDom2"></canvas>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { onMounted } from 'vue';

  function init() {
    const width = 300;
    const height = 300;
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机
    // 使用的是PerspectiveCamera（透视摄像机）
    // 第一个参数是视野角度（FOV）
    // 第二个参数是窗口的宽高比（aspect ratio）
    // 第三个参数是近裁剪面的距离（near clipping plane）
    // 第四个参数是远裁剪面的距离（far clipping plane）
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvasDom2'),
    });

    renderer.setSize(width, height);
    // document.body.appendChild(renderer.domElement);

    // 创建一个立方体
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.position.z = 5;

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
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
