<template>
  <div id="world">
    <canvas id="canvasDom4"></canvas>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { onMounted } from 'vue';

  var SEPARATION = 100,
    AMOUNTX = 100,
    AMOUNTY = 70;

  var container;
  var camera, scene, renderer;

  var particles,
    particle,
    count = 0;

  var mouseX = 85,
    mouseY = -342;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  function init() {
    // container = document.createElement('div');
    // container = document.getElementById('world');
    // document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();

    particles = [];

    var PI2 = Math.PI * 2;
    // THREE.ParticleBasicMaterial
    // THREE.ParticleSystemMaterial
    // var material = new THREE.ParticleCanvasMaterial({
    var material = new THREE.ParticleSystemMaterial({
      color: 0xe1e1e1,
      program: function (context) {
        context.beginPath();
        context.arc(0, 0, 0.6, 0, PI2, true);
        context.fill();
      },
    });

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++] = new THREE.Particle(material);
        particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        scene.add(particle);
      }
    }

    // renderer = new THREE.CanvasRenderer();
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvasDom4'),
    });
    // renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    //

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  //

  function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }

  function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();

      mouseX = event.touches[0].pageX - windowHalfX;
      mouseY = event.touches[0].pageY - windowHalfY;
    }
  }

  //

  function animate() {
    requestAnimationFrame(animate);

    render();
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++];
        particle.position.y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
        particle.scale.x = particle.scale.y =
          (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
      }
    }

    renderer.render(scene, camera);

    count += 0.1;
  }

  onMounted(() => {
    init();
    animate();
  });
</script>

<style lang="less" scoped>
  #world {
    // background-color: #193c6d;
    background-image: linear-gradient(135deg, #003073, #029797);
  }

  canvas {
    filter: opacity(0.5);
  }
</style>
