<template>
  <canvas id="canvasBox"></canvas>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { onMounted } from 'vue';

  let renderer, scene, camera, cube, controls;

  function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    renderer = new THREE.WebGLRenderer({
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
    cube = new THREE.Mesh(geometry, materials);

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

    // camera.position.set(10, 10, 20);
    camera.position.set(20, 10, 10);
    // camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);

    // controls.enableDamping = true;
    //设置控制器的中心点
    // controls.target.set( 0, 100, 0 );
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    // //是否自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 10;
    //设置相机距离原点的最近距离
    controls.minDistance = 10;
    //设置相机距离原点的最远距离
    controls.maxDistance = 30;
    // //是否开启右键拖拽
    // controls.enablePan = true;

    // controls.update();
    // controls.addEventListener('change', animate);

    // window.addEventListener('resize', onWindowResize);
    animate();
    // setTimeout(() => {
    //   animate();
    // }, 500);
  }
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped></style>
