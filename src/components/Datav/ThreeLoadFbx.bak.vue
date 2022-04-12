<template>
  <canvas
    class="webgl-canvas"
    type="webgl"
    id="webgl"
    @click.stop="clickModel"
    @touchstart="onTX"
    @touchmove="onTX"
    @touchend="onTX"
  />
</template>

<script>
  import * as THREE from 'three';
  import Stats from 'three/examples/jsm/libs/stats.module.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

  import dat from '/@/assets/threejs/dat.gui/dat.gui.module.js';
  import Detector from '/@/assets/threejs/jsm/Detector.js';

  let renderer, camera, scene, gui, light, stats, controls, meshHelper, mixer, action, datGui;

  let clock = new THREE.Clock();
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  function initRender() {
    const canvas = document.getElementById('webgl');

    // renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;
    //告诉渲染器需要阴影效果
    document.body.appendChild(renderer.domElement);
  }

  function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10);
    // camera.position.set(100, 200, 300);
    camera.position.set(0, 0, 2);
  }

  function initScene() {
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xa0a0a0);
    // scene.fog = new THREE.Fog(0xa0a0a0, 20, 100);
  }

  //初始化dat.GUI简化试验流程
  function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
      helper: true, //模型辅助线
    };
    datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）

    datGui.add(gui, 'helper').onChange(function (e) {
      meshHelper.visible = e;
    });
  }

  function initLight() {
    // #444a4f
    // #bdae4e

    scene.add(new THREE.AmbientLight(0x444a4f, 1));
    // scene.add(new THREE.AmbientLight(0xffffff, 1));

    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 20, 10);

    // light.shadow.camera.top = 18;
    // light.shadow.camera.bottom = -10;
    // light.shadow.camera.left = -12;
    // light.shadow.camera.right = 12;

    // //告诉平行光需要开启阴影投射
    // light.castShadow = true;
    // scene.add(light);

    let spotLight1 = new THREE.SpotLight(0xffffff, 1.8);
    spotLight1.name = 'Spot Light1';
    spotLight1.angle = Math.PI / 5;
    spotLight1.penumbra = 0.3;
    spotLight1.position.set(0, 80, -80);
    spotLight1.shadow.camera.near = 0.1;
    spotLight1.shadow.camera.far = 350;
    spotLight1.shadow.mapSize.width = 1000;
    spotLight1.shadow.mapSize.height = 1000;
    spotLight1.castShadow = true;
    spotLight1.shadowCameraVisible = true; // 在老版本的threejs库中才支持，新版本已废除
    // spotLight1.target = fbxModel;
    scene.add(spotLight1);
    // scene.add(new THREE.CameraHelper(spotLight1.shadow.camera));

    let spotLight2 = new THREE.SpotLight(0xffffff, 2);
    spotLight2.name = 'Spot Light1';
    spotLight2.angle = Math.PI / 5;
    spotLight2.penumbra = 0.3;
    spotLight2.position.set(0, 80, 80);
    spotLight2.shadow.camera.near = 0.1;
    spotLight2.shadow.camera.far = 350;
    spotLight2.shadow.mapSize.width = 1000;
    spotLight2.shadow.mapSize.height = 1000;
    spotLight2.castShadow = true;
    spotLight2.shadowCameraVisible = true; // 在老版本的threejs库中才支持，新版本已废除
    // spotLight2.target = fbxModel;
    scene.add(spotLight2);
    // scene.add(new THREE.CameraHelper(spotLight2.shadow.camera));

    let spotLight3 = new THREE.SpotLight(0xbdae4e, 2);
    spotLight3.name = 'Spot Light1';
    spotLight3.angle = Math.PI / 5;
    spotLight3.penumbra = 0.3;
    spotLight3.position.set(0, 50, 0);
    spotLight3.shadow.camera.near = 0.1;
    spotLight3.shadow.camera.far = 350;
    spotLight3.shadow.mapSize.width = 1000;
    spotLight3.shadow.mapSize.height = 1000;
    spotLight3.castShadow = true;
    spotLight3.shadowCameraVisible = true; // 在老版本的threejs库中才支持，新版本已废除
    // spotLight3.target = fbxModel;
    scene.add(spotLight3);
    // scene.add(new THREE.CameraHelper(spotLight3.shadow.camera));

    let spotLight4 = new THREE.SpotLight(0xffffff, 1.8);
    spotLight4.name = 'Spot Light1';
    spotLight4.angle = Math.PI / 5;
    spotLight4.penumbra = 0.3;
    spotLight4.position.set(-10, 0, 0);
    spotLight4.shadow.camera.near = 0.1;
    spotLight4.shadow.camera.far = 350;
    spotLight4.shadow.mapSize.width = 1000;
    spotLight4.shadow.mapSize.height = 1000;
    spotLight4.castShadow = true;
    spotLight4.shadowCameraVisible = true; // 在老版本的threejs库中才支持，新版本已废除
    // spotLight4.target = fbxModel;
    scene.add(spotLight4);
    // scene.add(new THREE.CameraHelper(spotLight4.shadow.camera));
  }

  function initModel() {
    //辅助工具
    var helper = new THREE.AxesHelper(50);
    // scene.add(helper);

    // 地板
    let floorSize = 20;
    var floor = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(floorSize, floorSize),
      new THREE.MeshPhongMaterial({ color: 0xffffff, depthWrite: false }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    //添加地板割线
    var grid = new THREE.GridHelper(floorSize, 10, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    // scene.add(grid);

    //加载模型
    var loader = new FBXLoader();
    // const model = "/src/assets/threejs/models/fbx/Naruto.fbx";
    // const model = "/src/assets/threejs/models/fbx/Samba Dancing.fbx";
    // const model = '/src/assets/threejs/models/fbx/bulu.fbx';
    // const model = '/src/assets/threejs/models/fbx/ds.fbx';
    // const model = "/src/assets/threejs/models/fbx/shaoqing.fbx";
    // const model = '/src/assets/threejs/models/fbx/spaceman.fbx';

    // const model = '/src/assets/threejs/models/fbx/bulu04121009.fbx';
    // const model = '/src/assets/threejs/models/fbx/bulu04121026.fbx';
    const model = '/src/assets/threejs/models/fbx/bulu04121057.fbx';

    // const model = '/src/assets/threejs/models/fbx/bulu/bulu-7.fbx';
    // const model = '/src/assets/threejs/models/fbx/bulu/bulu-7-1.fbx';
    // const model = '/src/assets/threejs/models/fbx/bulu/bulu-7-2.fbx';
    // const model = '/src/assets/threejs/models/fbx/bulu/bulu-7-3.fbx';
    // const model = '/src/assets/threejs/models/fbx/bulu/bulu-7-4.fbx';

    loader.load(model, function (modelObj) {
      console.log(`🚀 ~ modelObj`, modelObj);

      //添加骨骼辅助
      meshHelper = new THREE.SkeletonHelper(modelObj);
      // scene.add(meshHelper);

      // //设置模型的每个部位都可以投影
      // modelObj.traverse(function (child) {
      //   if (child.isMesh) {
      //     child.castShadow = true;
      //     child.receiveShadow = true;
      //   }
      // });

      // TODO: 处理模型材质相关的设置
      // 给贴图调整相关的属性
      // SkinnedMesh
      // material
      // 反射率: reflectivity: 0.5
      // 透明度: opacity: 0.5
      // 光泽度: shininess: 0.5
      // normalScale.set(0.1, -0.1);
      let SkinnedMesh = modelObj.children.filter((obj) => {
        return obj.type === 'SkinnedMesh';
      });
      console.log(`🚀 ~ zThree ~ loadModel ~ SkinnedMesh`, SkinnedMesh);
      // 法线问题 => 修改法线强度
      SkinnedMesh.forEach((obj) => {
        // Object.prototype.toString.call(obj) === '[object Array]'
        if (obj && Array.isArray(obj)) {
          obj.material.forEach((m) => {
            // m.normalScale.set(0.5, 0.5);
            // m.normalScale.set(0.1, -0.1);
            // m.bumpScale = 0.01;
            m.bumpScale *= 0.3;
            // m.reflectivity = 0;
            // m.opacity = 0.5;
            // m.shininess = 0.3;
            // m.roughness = 0.5;
            // m.metalness = 1;
            // if (m.name === 'YIFU') {
            //   m.normalMap = `${this.assets}/models/bulu/QIUBITE_Normal_OpenGL-1.png`;
            // }
          });
        }
        if (obj?.material?.bumpScale) {
          // obj.material.normalScale.set(0.1, -0.1);
          // obj.material.bumpScale = 0.01;
          obj.material.bumpScale *= 0.3;
        }
      });

      // 按时长排序动画顺序
      modelObj.animations.sort((a, b) => a.duration - b.duration);
      let time = 0;
      const durationArr = modelObj.animations.map((ani) => ani.duration);
      modelObj.animations.forEach((item, index) => {
        item.tracks.forEach((tracks) => {
          tracks.times = tracks.times.map((t) => {
            // let x = time ? time - 2.5 : 0;
            // let x = time ? time - 2 : 0;
            let x = time ? time : 0;
            x = x < 0 ? 0 : x;
            return t - x;
          });
        });
        time = item.duration;
        // 解决模型动画衔接卡顿的问题
        // ? item.duration - (durationArr[index - 1] || 0) + 2.2
        item.duration = !!index ? item.duration - (durationArr[index - 1] || 0) : item.duration;
      });
      console.log(
        `🚀 ~ zThree ~ modelObj.animations.forEach ~ modelObj.animations`,
        modelObj.animations,
      );

      //AnimationMixer是场景中特定对象的动画播放器。当场景中的多个对象独立动画时，可以为每个对象使用一个AnimationMixer
      mixer = modelObj.mixer = new THREE.AnimationMixer(modelObj);

      //mixer.clipAction 返回一个可以控制动画的AnimationAction对象  参数需要一个AnimationClip 对象
      //AnimationAction.setDuration 设置一个循环所需要的时间，当前设置了一秒
      //告诉AnimationAction启动该动作
      //action = mixer.clipAction(modelObj.animations[0]);
      //action.play();

      var actions = []; //所有的动画数组
      var animations = datGui.addFolder('animations');

      for (var i = 0; i < modelObj.animations.length; i++) {
        createAction(i);
      }

      function createAction(i) {
        actions[i] = mixer.clipAction(modelObj.animations[i]);
        gui['action' + i] = function () {
          for (var j = 0; j < actions.length; j++) {
            if (j === i) {
              actions[j].play();
            } else {
              actions[j].stop();
            }
          }
        };

        animations.add(gui, 'action' + i);
      }

      //添加暂停所有动画的按键
      gui.stop = function () {
        for (var i = 0; i < actions.length; i++) {
          actions[i].stop();
        }
      };

      datGui.add(gui, 'stop');
      modelObj.position.set(0, -0.2, 0);
      scene.add(modelObj);
    });
  }

  //初始化性能插件
  function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
  }

  function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    //设置控制器的中心点
    //controls.target.set( 0, 100, 0 );
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    //设置相机距离原点的最远距离
    controls.minDistance = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance = 2000;
    //是否开启右键拖拽
    controls.enablePan = true;
  }

  function render() {
    var time = clock.getDelta();
    if (mixer) {
      mixer.update(time);
    }

    controls.update();
  }

  //窗口变动触发的函数
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    //更新控制器
    render();

    //更新性能插件
    stats.update();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  function draw() {
    //兼容性判断
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();

    animate();
    window.onresize = onWindowResize;
  }

  /**
   * TODO:
   *   模型剧中
   *   手势交互
   *   法线贴图
   */
  export default {
    data() {},
    mounted() {
      draw();
    },
    methods: {
      onTX(e) {
        // 模型手势交互 Raycaster
        console.log(`🚀 ~ onTX ~ e`, e);
        // if (threeModel) {
        //   threeModel.dispatchTouchEvent(e);
        // }
      },
      clickModel(ev) {
        console.log(`🚀 ~ clickModel ~ ev`, ev);
        mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // 这里我们只检测模型的选中情况
        let intersects = raycaster.intersectObjects(scene.children, true);
        console.log(`🚀 ~ clickModel ~ intersects`, intersects);

        if (intersects.length > 0) {
          let selectedObjects = intersects[0].object;
          console.log(`🚀 ~ clickModel ~ selectedObjects`, selectedObjects);
          //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
          // for (var i = 0; i < intersects.length; i++) {
          //   intersects[i].object.material.color.set(0xff0000);
          // }
        }
      },
      clickModel2(event) {
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        mouse.x = (event.detail.x / (this.canvas.width / THREE.$window.devicePixelRatio)) * 2 - 1;
        mouse.y = -(event.detail.y / (this.canvas.height / THREE.$window.devicePixelRatio)) * 2 + 1;
        // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
        raycaster.setFromCamera(mouse, this.camera);
        // 获取raycaster直线和所有模型相交的数组集合
        var intersects = raycaster.intersectObjects(this.scene.children);
        return intersects[0];
      },
    },
  };

  // onMounted(() => {
  //   draw();
  //   // animate();
  // });
</script>

<style lang="less" scoped>
  #container {
    background-color: #bfe3dd;
  }
</style>
