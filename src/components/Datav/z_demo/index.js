import * as THREE from '@/plugin/threejs/three.module.js';
import { WechatPlatform } from '@/plugin/threejs/WechatPlatform';
import { FBXLoader } from '@/plugin/threejs/FBXLoader';
import { OrbitControls } from '@/plugin/threejs/OrbitControls';
// import { VertexNormalsHelper } from '@/plugin/threejs/VertexNormalsHelper';

// 模型渲染相关的初始参数
const initOpts = {
  modelPos: [0, 0, 0], // 模型在场景中的位置
  cameraPos: [0, 0, 0], // 镜头位置
  aniIdx: 0, // 模型动画索引
  aniAutoPlay: true,
  aniLoop: true,
  modelSrc: '', // 模型路径
  addModel: false,
  addLight: true,
  addGround: false,
  addShadow: false,
};

export default class zThree {
  constructor(canvas, opts) {
    this.opts = {
      ...initOpts,
      ...opts,
    };
    this.clock = null;
    this.renderer = null;
    this.mixer = null;
    this.fbxModel = null;
    this.AnimationAction = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.disposing = false;
    this.frameId = null;
    this.canvas = null;
    this.platform = null;
    this.actionFinish = true;
    this.loadFinish = null;
    // this.onLoad = (fn) => {
    //   fn;
    // };

    this.init(canvas);
  }

  // 初始化环境
  // TODO: 材质问题 & 灯光位置固定 & 动画锁 & 模型禁止缩放
  init(canvas) {
    // 初始化加载提示
    uni.showLoading({
      title: '模型加载中...',
      mask: true,
    });
    // this.loadFinish = false;

    // console.log('init');
    this.canvas = canvas;

    this.initPlatform();
    this.initScene();
    this.initCamera();
    if (this.opts.addModel) this.addModel(); // 加载绘制的模型
    if (this.opts.modelSrc) this.loadModel(); // 加载外部模型
    if (this.opts.addLight) this.addLight();
    if (this.opts.addGround) this.addGround();
    // this.addModel();
    // this.addModel2();
    // this.addGround();
    // // this.addLight();
    // this.addLight2();
    // // this.loadShadow();
    this.initRenderer();
    this.render();
  }
  initPlatform() {
    const platform = new WechatPlatform(this.canvas); // webgl canvas
    THREE.PLATFORM.set(platform);
    this.platform = platform;
  }
  initScene() {
    this.scene = new THREE.Scene();
  }
  initCamera() {
    //创建相机对象
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.canvas.width / this.canvas.height,
      0.1,
      1000
    );
    // this.camera.position.set(0, 0, 2); //设置相机位置
    // this.camera.position.set(700, 200, -500);

    // this.camera.position.set(0, 40, 100);
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
  addLight0() {
    //环境光
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    this.scene.add(new THREE.AmbientLight(0x666666));
    // TODO: 光源控制阴影
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    // const light = new THREE.PointLight(0xff0000, 0.5);
    light.position.set(100, 50, 60); //点光源位置
    // light.position.set(-500, 500, 500); //点光源位置
    light.castShadow = true; // 允许阴影投射
    light.shadowCameraVisible = true;
    this.scene.add(light); //点光源添加到场景中
    const light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    // const light1 = new THREE.PointLight(0x00ffff, 0.5);
    light1.position.set(-100, -50, -60); //点光源位置
    // light1.position.set(-800, 800, 800); //点光源位置
    light1.castShadow = true; // 允许阴影投射
    light1.shadowCameraVisible = true;
    this.scene.add(light1); //点光源添加到场景中

    let spotLight = new THREE.SpotLight(0xffffff, 2);
    // let spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.name = 'Spot Light';
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.3;
    // ##########
    // spotLight.position.set(-120, 220, -120); // 单个
    spotLight.position.set(80, 80, 80); // 单个
    spotLight.shadow.camera.near = 0.1;
    spotLight.shadow.camera.far = 350;
    spotLight.shadow.mapSize.width = 1000;
    spotLight.shadow.mapSize.height = 1000;
    // ##########
    // spotLight.position.set(0, 80, 60); // 一堆
    // spotLight.shadow.camera.near = 0.1;
    // spotLight.shadow.camera.far = 120;
    // spotLight.shadow.mapSize.width = 300;
    // spotLight.shadow.mapSize.height = 300;
    // ##########
    // spotLight.position.set(0, 20, 20); // 开盒
    // spotLight.shadow.camera.near = 0.1;
    // spotLight.shadow.camera.far = 80;
    // spotLight.shadow.mapSize.width = 300;
    // spotLight.shadow.mapSize.height = 300;
    spotLight.castShadow = true;
    spotLight.shadowCameraVisible = true; // 在老版本的threejs库中才支持，新版本已废除
    this.scene.add(spotLight);
    // this.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
  }
  addLight() {
    // #444a4f
    // #bdae4e

    this.scene.add(new THREE.AmbientLight(0x444a4f, 1));
    // this.scene.add(new THREE.AmbientLight(0xffffff, 1));

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
    // spotLight1.target = this.fbxModel;
    this.scene.add(spotLight1);
    // this.scene.add(new THREE.CameraHelper(spotLight1.shadow.camera));

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
    // spotLight2.target = this.fbxModel;
    this.scene.add(spotLight2);
    // this.scene.add(new THREE.CameraHelper(spotLight2.shadow.camera));

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
    // spotLight3.target = this.fbxModel;
    this.scene.add(spotLight3);
    // this.scene.add(new THREE.CameraHelper(spotLight3.shadow.camera));

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
    // spotLight4.target = this.fbxModel;
    this.scene.add(spotLight4);
    // this.scene.add(new THREE.CameraHelper(spotLight4.shadow.camera));

    // let spotLight5 = new THREE.SpotLight(0xffffff, 0.6);
    // spotLight5.name = 'Spot Light1';
    // spotLight5.angle = Math.PI / 5;
    // spotLight5.penumbra = 0.3;
    // spotLight5.position.set(10, 0, 0);
    // spotLight5.shadow.camera.near = 0.1;
    // spotLight5.shadow.camera.far = 350;
    // spotLight5.shadow.mapSize.width = 1000;
    // spotLight5.shadow.mapSize.height = 1000;
    // spotLight5.castShadow = true;
    // spotLight5.shadowCameraVisible = true; // 在老版本的threejs库中才支持，新版本已废除
    // // spotLight5.target = this.fbxModel;
    // this.scene.add(spotLight5);
    // this.scene.add(new THREE.CameraHelper(spotLight5.shadow.camera));

    // ##########

    // let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    // dirLight.name = 'Dir. Light';
    // dirLight.position.set(-120, 120, 120);
    // dirLight.castShadow = true;
    // dirLight.shadow.camera.near = 1;
    // dirLight.shadow.camera.far = 1000;
    // dirLight.shadow.camera.right = 80;
    // dirLight.shadow.camera.left = -80;
    // dirLight.shadow.camera.top = 80;
    // dirLight.shadow.camera.bottom = -80;
    // dirLight.shadow.mapSize.width = 3000;
    // dirLight.shadow.mapSize.height = 3000;
    // this.scene.add(dirLight);
    // this.scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
  }
  addLight2() {
    //立方体
    // const geometry1 = new THREE.BufferGeometry(10, 10, 10);
    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const cubeMaterial1 = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
    });
    const cubeMaterial2 = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });

    let cube = new THREE.Mesh(geometry, cubeMaterial1);
    // cube = new THREE.Mesh(geometry, cubeMaterial2);
    cube.position.x = 30;
    cube.position.y = 5;
    cube.position.z = -5;
    //告诉立方体需要投射阴影
    cube.castShadow = true;
    this.scene.add(cube);

    let ambientLight = new THREE.AmbientLight('#666666');
    this.scene.add(ambientLight);

    let spotLight = new THREE.PointLight('#ffffff');
    // spotLight.position.set(15, 30, 10);
    spotLight.position.set(80, 80, 80);
    spotLight.target = cube;

    //告诉平行光需要开启阴影投射
    spotLight.castShadow = true;

    this.scene.add(spotLight);
    this.scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
  }
  addGround() {
    //底部平面
    const planeGeometry = new THREE.PlaneGeometry(5000, 5000, 20, 20);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
    });

    const ground = new THREE.Mesh(planeGeometry, planeMaterial);
    ground.rotation.x = -0.5 * Math.PI;
    ground.position.y = -0;

    //告诉底部平面需要接收阴影
    ground.receiveShadow = true;

    this.scene.add(ground);

    // 场地
    // // const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x404040, specular: 0x111111 });
    // const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111 });
    // const ground = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 8, 8), groundMaterial);
    // ground.rotation.x = -Math.PI / 2;
    // ground.receiveShadow = true;
    // this.scene.add(ground);
    // 场地
    // let geometry = new THREE.BoxGeometry(10, 0.15, 10);
    // let material = new THREE.MeshPhongMaterial({
    //   color: 0xa0adaf,
    //   shininess: 150,
    //   specular: 0x111111,
    // });
    // const ground = new THREE.Mesh(geometry, material);
    // ground.scale.multiplyScalar(3);
    // ground.castShadow = false;
    // ground.receiveShadow = true;
    // this.scene.add(ground);
  }
  addModel() {
    //辅助工具
    const helper = new THREE.AxisHelper(10);
    this.scene.add(helper);

    //球体
    const sphereGeometry = new THREE.SphereGeometry(10, 30, 30);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-20, 20, 0);
    sphere.castShadow = true;
    this.scene.add(sphere);

    //立方体
    // const geometry1 = new THREE.BufferGeometry(10, 10, 10);
    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const cubeMaterial1 = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
    });
    const cubeMaterial2 = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });

    let cube = new THREE.Mesh(geometry, cubeMaterial1);
    // cube = new THREE.Mesh(geometry, cubeMaterial2);
    cube.position.x = 30;
    cube.position.y = 5;
    cube.position.z = -5;
    //告诉立方体需要投射阴影
    cube.castShadow = true;
    this.scene.add(cube);
  }
  addModel2() {
    //辅助工具
    // const helper = new THREE.AxisHelper(10);
    // this.scene.add(helper);

    //球体
    const sphereGeometry = new THREE.SphereGeometry(5, 15, 15);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xeeeeee,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-10, 10, 0);
    sphere.castShadow = true;
    this.scene.add(sphere);

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
    this.scene.add(cube);

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
    // // this.scene.add(crashObject, boxHelper);
    // this.scene.add(boxHelper);
    // this.scene.add(crashObject);

    // 在改变坐标的时候 及时的更新box3d 和 boxHelper的坐标
    // public refreshCrashObjectPos (x: number, y: number) {
    //   this.crashObject.position.x = x;
    //   this.crashObject.position.y = y;
    //   this.box3d.setFromObject(this.crashObject);
    //   this.boxHelper.update();
    // }

    // // 2：需要检测碰撞的物体,同样记得创建包围盒 和 辅助线
    // let geometry2 = new THREE.SphereGeometry(0.01, 16, 16);
    // let material2 = new THREE.MeshPhongMaterial({
    //   map: texture,
    //   transparent: true,
    //   side: THREE.DoubleSide,
    // });

    // this.stone = new THREE.Mesh(geometry2, material2);

    // let startX = GameMgr.i.getRandomFloat(-GameConfig.i.stoneStartX, GameConfig.i.stoneStartX);
    // let startY = GameMgr.i.getRandomFloat(-GameConfig.i.stoneStartY, GameConfig.i.stoneStartY);

    // this.stone.position.x = startX;
    // this.stone.position.y = startY;
    // this.stone.position.z = GameConfig.i.stoneStartZ;
    // this.box3d = new THREE.Box3().setFromObject(this.stone);
    // this.boxHelper = new THREE.BoxHelper(this.stone, 0xff0000);

    // // this.add(this.stone, this.boxHelper);
    // this.scene.add(this.boxHelper);
    // this.scene.add(this.stone);

    // // 3：在检测碰撞用 调用 包围盒检测是否碰撞
    // let crashBox = this.crashObject.box3d;
    // for (let i = 0; i < this.stoneList.length; i++) {
    //   let oneStone = this.stoneList[i];
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
  // 加载全部模型
  async loadModel() {
    try {
      // 一分钟未获加载到模型
      let timer = setTimeout(function () {
        uni.hideLoading();
        // this.loadFinish && this.loadFinish();
        uni.showToast({
          title: '模型加载超时',
          icon: 'error',
        });
      }, 60000);
      this.fbxModel = await this.loadFBXModel(this.opts.modelSrc);
      console.log(`🚀 ~ zThree ~ this.loadFBXModel ~ this.fbxModel`, this.fbxModel);

      clearTimeout(timer);
      timer = null;

      // TODO: 处理模型材质相关的设置
      // 给贴图调整相关的属性
      // SkinnedMesh
      // material
      // 反射率: reflectivity: 0.5
      // 透明度: opacity: 0.5
      // 光泽度: shininess: 0.5
      // normalScale.set(0.1, -0.1);
      let SkinnedMesh = this.fbxModel.children.filter((obj) => {
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

      console.log(`🚀 ~ zThree ~ this.loadFBXModel ~ this.fbxModel`, this.fbxModel);

      if (this.opts.addShadow) {
        this.addLight2();
        this.loadShadow();
      }
      this.sceneAddFBX();
      uni.hideLoading();
      // this.loadFinish && this.loadFinish();
      console.log(`🚀 ~ zThree ~ loadModel ~ this.loadFinish`, this.loadFinish);
    } catch (error) {
      uni.hideLoading();
      // this.loadFinish && this.loadFinish();
      console.log(`🚀 ~ zThree ~ loadModel ~ this.loadFinish`, this.loadFinish);
      uni.showToast({
        icon: 'none',
        title: error,
      });
    }
  }
  // 加载FBX模型
  loadFBXModel(url) {
    this.mixer = null;
    return new Promise((resolve, reject) => {
      if (url.toLocaleLowerCase().indexOf('.fbx') === -1) {
        reject('没匹配到正确格式的模型');
      }
      var loader = new FBXLoader();
      loader.load(url, (obj) => {
        // obj.scale.set(8, 8, 8);

        // 按时长排序动画顺序
        obj.animations.sort((a, b) => a.duration - b.duration);
        let time = 0;
        const durationArr = obj.animations.map((ani) => ani.duration);
        obj.animations.forEach((item, index) => {
          item.tracks.forEach((tracks) => {
            tracks.times = tracks.times.map((t) => {
              // let x = time ? time - 2.5 : 0;
              let x = time ? time - 2 : 0;
              x = x < 0 ? 0 : x;
              return t - x;
            });
          });
          time = item.duration;
          // 解决模型动画衔接卡顿的问题
          item.duration = !!index
            ? item.duration - (durationArr[index - 1] || 0) + 2.2
            : item.duration;
        });
        console.log(`🚀 ~ zThree ~ obj.animations.forEach ~ obj.animations`, obj.animations);

        // obj.children.forEach((item) => {
        //   this.createCrashObject(item);
        // });
        // console.log(obj, 'xxxxxxxxxxxxxxxxxxxxxx');
        resolve(obj);
        // 模型加载完成,关闭加载提示
      });
    });
  }

  createCrashObject(crashObject) {
    if (crashObject.name.indexOf('Index_') === 0) {
      console.log(`🚀 ~ zThree ~ createCrashObject ~ crashObject`, crashObject);

      // 创建他的包围盒的辅助线
      let boxHelper = new THREE.BoxHelper(crashObject, 0xff0000);
      // 创建包围盒
      // let box3d = new THREE.Box3().setFromObject(crashObject);
      // this.scene.add(crashObject, boxHelper);
      this.scene.add(boxHelper);
      // this.scene.add(crashObject);
    }
  }
  loadShadow() {
    // 解决外部模型无法投射阴影的问题
    for (const key in this.fbxModel.children) {
      this.fbxModel.children[key].castShadow = true;
      this.fbxModel.children[key].receiveShadow = true;
    }
  }
  // 添加模型到场景
  sceneAddFBX(opts) {
    opts = {
      // aniIdx: 0,
      // modelPos: [0, 0, 0],
      // cameraPos: [0, 0, 0],
      ...this.opts,
      ...opts,
    };
    console.log(`🚀 ~ zThree ~ sceneAddFBX ~ opts`, opts);
    this.fbxModel.position.set(...opts.modelPos);
    // this.fbxModel.receiveShadow = true; // 模型接受阴影
    this.fbxModel.castShadow = true; // 模型投射阴影
    this.scene.add(this.fbxModel);
    this.camera.position.set(...opts.cameraPos);
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.lookAt(this.fbxModel.position);
    // 是否自动播放动画
    if (this.opts.aniAutoPlay) this.startAni(opts.aniIdx);
  }
  // 创建渲染器
  initRenderer() {
    console.log(`🚀 ~ zThree ~ initRenderer ~ initRenderer`);
    const renderer = new THREE.WebGL1Renderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(this.canvas.width, this.canvas.height); //设置渲染区域尺寸
    // 背景透明
    renderer.setClearAlpha(0);
    // renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    renderer.setPixelRatio(THREE.$window.devicePixelRatio);
    // renderer.shadowMapEnabled = true; // 允许阴影投射
    renderer.shadowMap.enabled = true; // 允许阴影投射
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    console.log(THREE.$window.devicePixelRatio, 'THREE.$window.devicePixelRatio');
    // 创建一个时钟对象Clock
    this.clock = new THREE.Clock();
    this.renderer = renderer;

    const controls = new OrbitControls(this.camera, this.canvas);
    // TODO: ios 禁止缩放 & 安卓控制缩放级别
    const platform = uni.$vuex.get('systemInfo').platform;
    console.log(`🚀 ~ zThree ~ initRenderer ~ platform`, platform);

    if (platform === 'ios') {
      controls.enableZoom = false;
      //是否开启右键拖拽 => 禁止后不能旋转模型
      // controls.enablePan = false;
    } else {
      // controls.enableDamping = true;
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
      controls.minDistance = 1.5;
      //设置相机距离原点的最远距离
      controls.maxDistance = 3.5;
      //是否开启右键拖拽
      controls.enablePan = true;
    }
    this.controls = controls;
  }
  // 更新视图
  render() {
    // console.log(`🚀 ~ zThree ~ render ~ render`);
    if (!this.disposing) {
      this.frameId = THREE.$requestAnimationFrame(this.render.bind(this));
    }
    if (this.controls) {
      this.controls.update();
    }
    if (this.mixer !== null) {
      // 更新混合器相关的时间
      this.mixer.update(this.clock.getDelta());
    }
    this.renderer.render(this.scene, this.camera);
  }
  // 手势事件传递
  dispatchTouchEvent(e) {
    this.platform.dispatchTouchEvent(e);
  }
  // 点击事件
  onclick(event) {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    mouse.x = (event.detail.x / (this.canvas.width / THREE.$window.devicePixelRatio)) * 2 - 1;
    mouse.y = -(event.detail.y / (this.canvas.height / THREE.$window.devicePixelRatio)) * 2 + 1;
    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera(mouse, this.camera);
    // 获取raycaster直线和所有模型相交的数组集合
    var intersects = raycaster.intersectObjects(this.scene.children);
    return intersects[0];
  }
  // 开始动画
  startAni(aniIdx) {
    let toyDynamicEffect = uni.$vuex.get('toyDynamicEffect');
    if (!toyDynamicEffect) return;
    // debugger;
    // if (!this.actionFinish) {
    //   uni.showToast({
    //     title: '请等待当前动画完成...',
    //   });
    //   return;
    // }
    this.stopAni();
    aniIdx = aniIdx || 0;
    if (!this.mixer) {
      this.mixer = new THREE.AnimationMixer(this.fbxModel);
      this.mixer.addEventListener('finished', (e) => {
        this.actionFinish = true;
        this.startAni(0);
      });
    }
    this.AnimationAction = this.mixer.clipAction(this.fbxModel.animations[aniIdx]);
    // 控制动画只播放一次
    // if (!this.opts.aniLoop) {
    //   this.AnimationAction.setLoop(THREE.LoopOnce);
    // }
    // 监听动画完成事件(一直循环的动画不会触发)
    // TODO: 添加相应控制状态
    this.AnimationAction.clampWhenFinished = true;
    this.AnimationAction.enable = true;
    this.AnimationAction.setLoop(THREE.LoopOnce);
    this.AnimationAction.play();
    this.actionFinish = false;
    // 控制动画播放完后回去播待机动画
    // if (this.opts.aniLoop) {
    //   const initAni = this.mixer.clipAction(this.fbxModel.animations[0]);
    //   initAni.setLoop(THREE.LoopOnce);
    //   initAni.clampWhenFinished = true;
    //   initAni.enable = true;

    // }

    // 控制播放对应的动画
    // // this.AnimationAction = []; //所有的动画数组
    // for (let i = 0; i < this.fbxModel.animations.length; i++) {
    //   this.AnimationAction[i] = this.mixer.clipAction(this.fbxModel.animations[i]);
    // }

    // // for (let j = 0; j < this.AnimationAction.length; j++) {
    // //   if (j === aniIdx) {
    // //     this.AnimationAction[j].play();
    // //   } else {
    // //     this.AnimationAction[j].stop();
    // //   }
    // // }

    // // gui["action"+i] = function () {
    // //   for(var j=0; j<actions.length; j++){
    // //       if(j === i){
    // //           actions[j].play();
    // //       }
    // //       else{
    // //           actions[j].stop();
    // //       }
    // //   }
    // // };
    // // animations.add(gui, 'action' + i);
    // // this.AnimationAction[aniIdx]._clip.duration = 2;
    // // this.AnimationAction[aniIdx].play();
    // // console.log(
    // //   `🚀 ~ zThree ~ startAni ~ this.AnimationAction[aniIdx]`,
    // //   this.AnimationAction[aniIdx]
    // // );

    // this.AnimationAction[aniIdx].play();
    // // 控制动画播放完后回去播待机动画
    // if (this.opts.aniLoop) {
    //   this.mixer.addEventListener('finished', (e) => {
    //     console.log(`🚀 ~ zThree ~ this.mixer.addEventListener ~ finished`, e);
    //     this.AnimationAction[0].play();
    //   });
    // }
  }
  // 停止动画
  stopAni() {
    // if (this.AnimationAction.length) {
    //   this.AnimationAction.forEach((action) => {
    //     action.stop();
    //   });
    //   this.AnimationAction = [];
    //   this.mixer = null;
    // }
    if (this.AnimationAction) {
      this.AnimationAction.stop();
      this.AnimationAction = null;
    }
    if (this.mixer) {
      this.mixer.removeEventListener('finished');
      this.mixer = null;
    }
  }
  // 切换模型
  // switchModel(aniIdx = 0) {
  //   // const model = this.fbxModel[index];
  //   const model = this.fbxModel;
  //   console.log(`🚀 ~ zThree ~ switchModel ~ this.fbxModel`, this.fbxModel);
  //   // console.log(index, model, this.fbxModel, 'index');
  //   if (model) {
  //     this.clearModel();
  //     this.sceneAddFBX(model, { aniIdx: aniIdx });
  //   }
  // }
  // 删除模型
  clearModel() {
    if (this.scene) {
      this.scene.remove(this.fbxModel);
    }
  }
  // 重载模型
  async reload() {
    this.fbxModel = await this.loadFBXModel(this.opts.modelSrc);
    this.clearModel();
    this.sceneAddFBX();
  }
  // 销毁实例
  dispose() {
    this.disposing = true;
    THREE.$cancelAnimationFrame(this.frameId);
    THREE.PLATFORM.dispose();
    this.mixer = null;
    this.platform = null;
  }
}
