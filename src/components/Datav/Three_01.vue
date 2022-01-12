<template>
  <div>
    <canvas id="mainCanvas" width="400px" height="300px"></canvas>
  </div>
</template>

<script>
  import * as THREE from 'three';
  // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  export default {
    data() {
      return {};
    },
    mounted() {
      this.init();
    },
    methods: {
      //初始化
      // init() {
      //   // renderer
      //   var renderer = new THREE.WebGLRenderer({
      //     canvas: document.getElementById('mainCanvas'),
      //   });
      //   renderer.setClearColor(0x000000); // black

      //   // scene
      //   var scene = new THREE.Scene();

      //   // camera
      //   var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
      //   camera.position.set(0, 0, 5);
      //   scene.add(camera);

      //   // a cube in the scene
      //   var cube = new THREE.Mesh(
      //     new THREE.CubeGeometry(1, 2, 3),
      //     new THREE.MeshBasicMaterial({
      //       color: 0xff0000,
      //     }),
      //   );
      //   scene.add(cube);

      //   // render
      //   renderer.render(scene, camera);
      // },
      init() {
        // const renderer = new THREE.WebGLRenderer();
        var renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById('mainCanvas'),
        });
        renderer.setSize(600, 400);
        // document.body.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          1,
          500,
        );
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
      },
    },
  };
</script>

<style lang="less">
  #mainCanvas {
    width: 400px;
    height: 300px;
  }
</style>
