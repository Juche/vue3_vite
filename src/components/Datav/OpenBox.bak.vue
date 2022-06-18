<template>
  <canvas id="canvasCtn"></canvas>
</template>

<!-- 只能在APP和h5端运行 -->
<script setup>
  import { onMounted, onUnmounted } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  let gui, datGui, meshHelper, axesHelper, stats;
  let renderer, scene, modelSrc, modelObj, camera, light, plane, controls, mixer, action;
  let // modelPos = [0, -0.2, 0],
    // cameraPos = [0, 0, 2],
    // controlsDis = [1.5, 3];
    modelPos = [0, 0, 0],
    cameraPos = [100, 100, 100],
    controlsDis = [1.5, 3];

  // [0, 128, 255], // RGB array
  // [0, 128, 255, 0.3], // RGB with alpha
  // {h: 350, s: 0.9, v: 0.3} // Hue, saturation, value
  let ambientLight = {
      ins: null,
      cfg: {
        color: '#ffffff',
        intensity: 1,
      },
    },
    spotLight1 = {
      ins: null,
      cfg: {
        color: '#ffffff',
        intensity: 0.8,
        // penumbra: 0.3,
        x: 0,
        y: 80,
        z: 30,
      },
    },
    spotLight2 = {
      ins: null,
      cfg: {
        color: '#ffffff',
        intensity: 1,
        // penumbra: 0.3,
        x: -10,
        y: 0,
        z: 80,
      },
    },
    spotLight3 = {
      ins: null,
      cfg: {
        color: '#ffffff',
        intensity: 1,
        // penumbra: 0.3,
        x: 0,
        y: 0,
        z: -80,
      },
    },
    spotLight4 = {
      ins: null,
      cfg: {
        color: '#bdae4e',
        intensity: 1.2,
        // penumbra: 0.3,
        x: 0,
        y: 80,
        z: 0,
      },
    };

  let clock = new THREE.Clock();
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  // 只在 H5 端打印消息
  function log() {
    // #ifdef H5
    console.log(...arguments);
    // #endif
  }

  onMounted(() => {
    initBox();
  });

  onUnmounted(() => {
    dispose();
  });

  function initRender() {
    const canvasCtn = document.getElementById('canvasCtn');

    renderer = new THREE.WebGLRenderer({
      // canvas: canvas,
      antialias: true,
      alpha: true, // 设置透明，为true时，背景颜色需要注释掉
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xeeeeee);
    // renderer.setClearColor(0XECF1F3, 1); // 设置背景颜色
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    // document.body.appendChild(renderer.domElement);
    canvasCtn.appendChild(renderer.domElement);
  }
  function initScene() {
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xa0a0a0);
    // scene.fog = new THREE.Fog(0xa0a0a0, 20, 100);
  }
  function initBox() {
    // 定义场景、相机、渲染器、网格、地面、环境光、点光源 变量
    var scene, camera, renderer, mesh, meshfloor, ambientLight, pointLight;
    var meshTexture, meshNormalMap, meshBumpMap;
    var meshFloorTexture, meshFloorNormalMap, meshFloorBumpMap;
    //diffuse texture 漫反射贴图 normal texture 法线贴图  Bump Mapping 凹凸贴图
    scene = new THREE.Scene();
    // camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // 加载贴图
    var textureLoader = new THREE.TextureLoader();
    meshTexture = textureLoader.load(
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.xxLtCX-kf3F8wdlVHIiFPQHaHX?w=184&h=183&c=7&r=0&o=5&pid=1.7',
    );
    meshNormalMap = textureLoader.load(
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.xxLtCX-kf3F8wdlVHIiFPQHaHX?w=184&h=183&c=7&r=0&o=5&pid=1.7',
    );
    meshBumpMap = textureLoader.load(
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.xxLtCX-kf3F8wdlVHIiFPQHaHX?w=184&h=183&c=7&r=0&o=5&pid=1.7',
    );
    // 新建一个箱子
    mesh = new THREE.Mesh(
      new THREE.BoxGeometry(60, 80, 60), //创建5*5*5的箱子的大小
      // 注意：箱子不能使用MeshBasicMaterial，否则会出现光照无反应
      new THREE.MeshPhongMaterial({
        color: 0x757575,
        map: meshTexture,
        normalMap: meshNormalMap,
        bumpMap: meshBumpMap,
      }),
    );
    // 箱子去接受光源
    mesh.receiveShadow = true;
    // 箱子去投射光源
    mesh.castShadow = true;
    mesh.position.y += 5 / 2; //设置箱子的位置坐标

    meshFloorTexture = textureLoader.load(
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.snLk0cTXFZIxIQ9GHfOmQQHaE7?w=291&h=194&c=7&r=0&o=5&pid=1.7',
    );
    meshFloorNormalMap = textureLoader.load(
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.snLk0cTXFZIxIQ9GHfOmQQHaE7?w=291&h=194&c=7&r=0&o=5&pid=1.7',
    );
    meshFloorBumpMap = textureLoader.load(
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.snLk0cTXFZIxIQ9GHfOmQQHaE7?w=291&h=194&c=7&r=0&o=5&pid=1.7',
    );
    // 创建一个地面
    meshfloor = new THREE.Mesh(
      new THREE.PlaneGeometry(130, 130, 10, 10),
      new THREE.MeshPhongMaterial({
        color: 0x1b5e20,
        map: meshFloorTexture,
        normalMap: meshFloorNormalMap,
        bumpMap: meshFloorBumpMap,
      }),
    );
    meshfloor.rotation.x -= Math.PI / 2;
    // 地面同样设置去接受光源
    meshfloor.receiveShadow = true;

    // 将所有创建的物体加入到场景中去
    scene.add(mesh);
    scene.add(meshfloor);

    // 环境光
    ambientLight = new THREE.AmbientLight(0xffffff, 1); //环境光的颜色以及强弱
    // 点光
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 20, -2);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 25;

    scene.add(ambientLight);
    scene.add(pointLight);

    camera.position.set(10, 10, 10);
    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // // 给渲染器添加阴影效果
    // renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.BasicShadowMap;
    // document.body.appendChild(renderer.domElement);

    // const container: HTMLElement | null = document.getElementById('container');
    const canvasCtn = document.getElementById('canvasCtn');

    renderer = new THREE.WebGLRenderer({
      // canvas: canvas,
      antialias: true,
      alpha: true, // 设置透明，为true时，背景颜色需要注释掉
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xeeeeee);
    // renderer.setClearColor(0XECF1F3, 1); // 设置背景颜色
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    // document.body.appendChild(renderer.domElement);
    canvasCtn.appendChild(renderer.domElement);

    // 每一帧去循环调用render()函数
    animate();

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
  }
  function initBox2() {
    let camera, scene, renderer;
    let mesh;

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();
    // const texture = textureLoader.load( './img/crate.gif');
    const texture = textureLoader.load('./img/crate.gif', function (texture) {
      console.log(`🚀 ~ initBox ~ texture`, texture);
      renderer.render(scene, camera);
    });

    // console.log(`🚀 ~ initBox ~ texture`, texture)

    const geometry = new THREE.BoxGeometry(60, 80, 60);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // const material = new THREE.MeshPhongMaterial( { map: texture } );
    // const material = new THREE.MeshLambertMaterial( { map: texture } );

    mesh = new THREE.Mesh(geometry, material);
    console.log(`🚀 ~ initBox ~ mesh`, mesh);
    scene.add(mesh);

    // renderer = new THREE.WebGLRenderer( { antialias: true } );
    // renderer.setPixelRatio( window.devicePixelRatio );
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );

    const canvasCtn = document.getElementById('canvasCtn');

    renderer = new THREE.WebGLRenderer({
      // canvas: canvas,
      antialias: true,
      alpha: true, // 设置透明，为true时，背景颜色需要注释掉
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xeeeeee);
    // renderer.setClearColor(0XECF1F3, 1); // 设置背景颜色
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    // document.body.appendChild(renderer.domElement);
    canvasCtn.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    // function animate() {

    //   requestAnimationFrame( animate );

    //   mesh.rotation.x += 0.005;
    //   mesh.rotation.y += 0.01;

    //   renderer.render( scene, camera );

    // }

    // // renderer.render( scene, camera );
    // animate();
  }
  function addModel() {
    //辅助工具
    // const helper = new THREE.AxisHelper(10);
    // scene.add(helper);

    //球体
    const sphereGeometry = new THREE.SphereGeometry(1, 300, 300);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 2, 0);
    sphere.castShadow = true;
    scene.add(sphere);

    //立方体
    const loader = new THREE.TextureLoader();
    // const one = loader.load( '@/assets/models/openBox/posx.jpg');
    const one = loader.load('img/posx.jpg');
    const two = loader.load('@/assets/models/openBox/negx.jpg');
    const three = loader.load('@/assets/models/openBox/posy.jpg');
    const four = loader.load('@/assets/models/openBox/negy.jpg');
    const five = loader.load('@/assets/models/openBox/posz.jpg');
    const six = loader.load('@/assets/models/openBox/negz.jpg');

    const material1 = new THREE.MeshBasicMaterial({ map: one });
    const material2 = new THREE.MeshBasicMaterial({ map: two });
    const material3 = new THREE.MeshBasicMaterial({ map: three });
    const material4 = new THREE.MeshBasicMaterial({ map: four });
    const material5 = new THREE.MeshBasicMaterial({ map: five });
    const material6 = new THREE.MeshBasicMaterial({ map: six });

    const materials = [material1, material2, material3, material4, material5, material6];

    // const geometry1 = new THREE.BufferGeometry(10, 10, 10);
    const geometry = new THREE.BoxGeometry(0.5, 0.75, 0.5);
    const cubeMaterial1 = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
    });
    const cubeMaterial2 = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });

    // let cube = new THREE.Mesh(geometry, cubeMaterial1);
    // let cube = new THREE.Mesh(geometry, materials);
    let cube = new THREE.Mesh(geometry, material1);
    // cube = new THREE.Mesh(geometry, cubeMaterial2);
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    //告诉立方体需要投射阴影
    cube.castShadow = true;
    console.log(`🚀 ~ addModel ~ cube`, cube);
    scene.add(cube);
  }
  function addModel2() {
    //辅助工具
    // const helper = new THREE.AxisHelper(10);
    // scene.add(helper);

    //球体
    const sphereGeometry = new THREE.SphereGeometry(5, 15, 15);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-10, 10, 0);
    sphere.castShadow = true;
    scene.add(sphere);

    //立方体
    // const geometry1 = new THREE.BufferGeometry(10, 10, 10);
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const cubeMaterial1 = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
    });
    const cubeMaterial2 = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });

    let cube = new THREE.Mesh(geometry, cubeMaterial1);
    // cube = new THREE.Mesh(geometry, cubeMaterial2);
    cube.position.x = 10;
    cube.position.y = 5;
    cube.position.z = -5;
    //告诉立方体需要投射阴影
    cube.castShadow = true;
    scene.add(cube);

    // 根据官方文档：https://threejs.org/docs/#api/en/math/Box3.intersectsSphere

    // // 1： 我需要操作的物体
    // // 创建一个正方体
    // let geometry = new THREE.BoxGeometry(0.1, 0.025, 0.05, 1, 1, 1);
    // let material = new THREE.MeshPhongMaterial({ color: 0x000000, transparent: true });
    // let crashObject = new THREE.Mesh(geometry, material);
    // crashObject.material.opacity = 0.5;
    // crashObject.position.z = GameConfig.i.shipZDis;

    // // 创建他的包围盒的辅助线
    // let boxHelper = new THREE.BoxHelper(crashObject, 0xff0000);
    // // 创建包围盒
    // let box3d = new THREE.Box3().setFromObject(crashObject);
    // // scene.add(crashObject, boxHelper);
    // scene.add(boxHelper);
    // scene.add(crashObject);

    // 在改变坐标的时候 及时的更新box3d 和 boxHelper的坐标
    // public refreshCrashObjectPos (x: number, y: number) {
    //   crashObject.position.x = x;
    //   crashObject.position.y = y;
    //   box3d.setFromObject(crashObject);
    //   boxHelper.update();
    // }

    // // 2：需要检测碰撞的物体,同样记得创建包围盒 和 辅助线
    // let geometry2 = new THREE.SphereGeometry(0.01, 16, 16);
    // let material2 = new THREE.MeshPhongMaterial({
    //   map: texture,
    //   transparent: true,
    //   side: THREE.DoubleSide,
    // });

    // stone = new THREE.Mesh(geometry2, material2);

    // let startX = GameMgr.i.getRandomFloat(-GameConfig.i.stoneStartX, GameConfig.i.stoneStartX);
    // let startY = GameMgr.i.getRandomFloat(-GameConfig.i.stoneStartY, GameConfig.i.stoneStartY);

    // stone.position.x = startX;
    // stone.position.y = startY;
    // stone.position.z = GameConfig.i.stoneStartZ;
    // box3d = new THREE.Box3().setFromObject(stone);
    // boxHelper = new THREE.BoxHelper(stone, 0xff0000);

    // // add(stone, boxHelper);
    // scene.add(boxHelper);
    // scene.add(stone);

    // // 3：在检测碰撞用 调用 包围盒检测是否碰撞
    // let crashBox = crashObject.box3d;
    // for (let i = 0; i < stoneList.length; i++) {
    //   let oneStone = stoneList[i];
    //   if (oneStone) {
    //     let stoneBox = oneStone.box3d;
    //     let flag = crashBox.intersectsBox(stoneBox);
    //     if (flag) {
    //       console.log(`🚀 ~ zThree ~ addModel2 ~ flag`, flag);
    //       // 撞到了
    //       console.log(`🚀 ~ zThree ~ addModel2 ~ 撞到了`);
    //     }
    //   }
    // }
  }
  function addModel3() {
    // var scene = new THREE.Scene();

    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大

    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(100, 200, 250); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    var loader = new THREE.TextureLoader();
    var geometry = new THREE.BoxGeometry(30, 30, 30);
    // 换成自己的图片路径
    // '@/assets/models/openBox/posx.jpg',
    // '@/assets/models/openBox/negx.jpg',
    // '@/assets/models/openBox/posy.jpg',
    // '@/assets/models/openBox/negy.jpg',
    // '@/assets/models/openBox/posz.jpg',
    // '@/assets/models/openBox/negz.jpg',
    let one = loader.load('@/assets/models/openBox/logo.png');
    let two = loader.load('@/assets/models/openBox/logo.png');
    let three = loader.load('@/assets/models/openBox/logo.png');
    let four = loader.load('@/assets/models/openBox/logo.png');
    let five = loader.load('@/assets/models/openBox/logo.png');
    let six = loader.load('@/assets/models/openBox/logo.png');

    const material1 = new THREE.MeshBasicMaterial({ map: one });
    const material2 = new THREE.MeshBasicMaterial({ map: two });
    const material3 = new THREE.MeshBasicMaterial({ map: three });
    const material4 = new THREE.MeshBasicMaterial({ map: four });
    const material5 = new THREE.MeshBasicMaterial({ map: five });
    const material6 = new THREE.MeshBasicMaterial({ map: six });

    const materials = [material1, material2, material3, material4, material5, material6];

    const dice = new THREE.Mesh(geometry, materials);
    scene.add(dice);

    // 光源
    var light = new THREE.AmbientLight('rgb(255, 255, 255)'); // soft white light
    scene.add(light);

    var spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
    spotLight.position.set(100, 1000, 1000);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // var renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    // function draw() {
    //     dice.rotation.x += 0.01;
    //     dice.rotation.y += 0.01;
    //     renderer.render(scene, camera);
    //     stop = requestAnimationFrame(draw);
    // }

    // draw();
  }
  function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10);
    // camera.position.set(100, 200, 300);
    camera.position.set(...cameraPos);
    // camera.lookAt(new THREE.Vector3(0, 0, 0)); // 控制相机的焦点(镜头)位置，决定相机的朝向（取值为3维坐标对象-THREE.Vector3(x,y,z)）
  }
  function initLight() {
    addAmbientLight();

    // lightFolder = datGui.addFolder('Light');
    addSpotLight(spotLight1, 'spotLight1');
    addSpotLight(spotLight2, 'spotLight2');
    addSpotLight(spotLight3, 'spotLight3');
    // addSpotLight(spotLight4, 'spotLight4');

    // // addSpecificLight();
    // // if(modelSrc.includes('bululu.fbx'))
    // const bluModelName = ['blulu', 'bulu', 'bululu'];
    // const isBlu = bluModelName.some((name) => modelSrc.includes(name));
    // log(`🚀 ~ zThree ~ initLight ~ isBlu`, isBlu);
    // if (isBlu) {
    //   addSpotLight(spotLight4, 'spotLight4');
    // }

    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 0, 10);
    // light.shadow.camera.top = 18;
    // light.shadow.camera.bottom = -10;
    // light.shadow.camera.left = -12;
    // light.shadow.camera.right = 12;
    // //告诉平行光需要开启阴影投射
    // light.castShadow = true;
    // scene.add(light);
  }
  function addAmbientLight() {
    // datGui.addColor(ambientLight.cfg, 'color').name('AmbientColor').onChange( render );
    // datGui.add(ambientLight.cfg, 'intensity', 0, 3).name('AmbientIntensity').onChange( render );

    // function (e) {ambientLight.color = new THREE.Color(e);}
    ambientLight.ins = new THREE.AmbientLight(ambientLight.cfg.color, ambientLight.cfg.intensity);
    scene.add(ambientLight.ins);
  }
  function addSpotLight(light, name) {
    // lightFolder.addColor(light.cfg, 'color').onChange( render );
    // lightFolder.add(light.cfg, 'intensity', 0, 3).onChange( render );
    // // lightFolder.add(light.cfg, 'penumbra', 0, 1).onChange( render );
    // lightFolder.add(light.cfg, 'x', -80, 80).onChange( render );
    // lightFolder.add(light.cfg, 'y', -80, 80).onChange( render );
    // lightFolder.add(light.cfg, 'z', -80, 80).onChange( render );

    light.ins = new THREE.SpotLight(light.cfg.color, light.cfg.intensity);
    light.ins.name = name;
    light.ins.angle = Math.PI / 5;
    // light.ins.penumbra = light.cfg.penumbra;
    // light.ins.position.set(0, 80, -80);
    light.ins.position.set(light.cfg.x, light.cfg.y, light.cfg.z);
    light.ins.shadow.camera.near = 0.1;
    light.ins.shadow.camera.far = 10;
    light.ins.shadow.mapSize.width = 10;
    light.ins.shadow.mapSize.height = 10;
    light.ins.castShadow = true;
    // light.ins.target = fbxModel;
    scene.add(light.ins);
    // scene.add(new THREE.CameraHelper(light.ins.shadow.camera));
  }
  function initPlane() {
    //辅助工具
    axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    // 地板
    let planeSize = 20;
    plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(planeSize, planeSize),
      new THREE.MeshPhongMaterial({ color: 0xffffff, depthWrite: false }),
    );
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    //添加地板割线
    let grid = new THREE.GridHelper(planeSize, 10, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);
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
    controls.autoRotateSpeed = 50;
    //设置相机距离原点的最远距离
    controls.minDistance = controlsDis[0];
    //设置相机距离原点的最远距离
    controls.maxDistance = controlsDis[1];
    //是否开启右键拖拽
    controls.enablePan = true;
  }
  function render() {
    let time = clock.getDelta();
    if (mixer) {
      mixer.update(time);
    }
    controls.update();
  }
  function animate() {
    //更新控制器
    render();
    //更新性能插件
    // stats.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  function draw() {
    //兼容性判断
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    // // initGui();
    initRender();
    // initScene();
    // initCamera();
    // initLight();
    initBox();
    // addModel();
    // addModel2();
    // addModel3();
    // initModel();
    // initPlane();
    initControls();
    // initStats();
    animate();
    // window.onresize = onWindowResize;
  }
  function dispose() {
    try {
      mixer.stopAllAction();
      scene.remove(modelObj);
      renderer.dispose();
    } catch (error) {}
    gui = null;
    datGui = null;
    meshHelper = null;
    axesHelper = null;
    stats = null;
    renderer = null;
    scene = null;
    modelObj = null;
    modelSrc = null;
    camera = null;
    light = null;
    plane = null;
    controls = null;
    mixer = null;
    action = null;

    // modelPos = null;
    // cameraPos = null;
    // controlsDis = null;

    // ambientLight = null;
    // spotLight1 = null;
    // spotLight2 = null;
    // spotLight3 = null;
    // spotLight4 = null;

    // clock = null
    // raycaster = null
    // mouse = null
  }
</script>

<style lang="less">
  // .container-full {
  //   background: linear-gradient(180deg, #d6d2cf 17.98%, #b7b8c1 79.75%);
  // }
  // .btn-group-col {
  //   position: fixed;
  //   bottom: $px60;
  // }
  // .share {
  //   position: fixed;
  //   z-index: 2;
  //   top: px(130);
  //   right: px(32);
  // }
  // // .box-img {
  // //   position: fixed;
  // //   top: 0;
  // //   left: 0;
  // //   width: 100vw;
  // // }
  // .webgl-canvas {
  //   // position: absolute;
  //   // left: 0;
  //   // top: 0;
  //   // width: 750rpx;
  //   width: 100vw;
  //   height: 100vh;
  //   flex: 1;
  // }
</style>
