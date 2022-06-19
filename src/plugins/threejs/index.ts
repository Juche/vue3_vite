import {
  AmbientLight,
  AxesHelper,
  BoxBufferGeometry,
  BufferGeometry,
  CameraHelper,
  GridHelper,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MOUSE,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
// import { cube, sphere } from './Objects';

export class $T {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  constructor(dom: HTMLElement) {
    console.log(`🚀 ~ $T dom`, dom);
    this.dom = dom;
    // 1.0 创建渲染器
    this.renderer = new WebGLRenderer({
      antialias: true, // 抗锯齿
    });
    // 1.2 初始化渲染器尺寸
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight);

    // 2.0 创建场景和相机
    this.scene = new Scene();
    // 2.1 创建相机
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000);

    // 相机如果设置不对会看不到场景里的模型
    // 4.0 设置相机位置
    this.camera.position.set(20, 20, 20);
    // 4.1 设置相机目标位置
    this.camera.lookAt(0, 0, 0);
    // 4.2 设置相机的方向
    this.camera.up.set(0, 1, 0);

    // 3.0 创建一个立方体
    // const geometry: BoxBufferGeometry = new BoxBufferGeometry(3, 3, 3);
    // // MeshStandardMaterial 材质设置颜色不会直接生效(需要通过灯光点亮,不设置颜色会随灯光颜色,设置颜色显示设置的颜色)
    // // const material: MeshStandardMaterial = new MeshStandardMaterial();
    // const material: MeshStandardMaterial = new MeshStandardMaterial({ color: 0xff0000 });
    // // const material: MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
    // const cube: Mesh = new Mesh(geometry, material);

    // 6.0 创建环境光
    const ambientLight: AmbientLight = new AmbientLight(0xffffff, 0.5); // 强度设为 1 导致点光源不能产生强度衰减效果!!!
    // 13.0 创建点光源
    const pointLight: PointLight = new PointLight(0xffffff, 0.5, 20, 0.1);
    // 13.1 设置点光源位置
    pointLight.position.set(5, 5, 5);
    // 13.2 设置点光源聚光范围
    // pointLight.shadow.camera.near = 1;
    // pointLight.shadow.camera.far = 20;
    // pointLight.shadow.camera.fov = 90;
    // 13.3 设置点光源聚光投射面
    // pointLight.shadow.mapSize.width = 1024;
    // pointLight.shadow.mapSize.height = 1024;
    // 13.4 设置点光源聚光投射面的偏移
    // pointLight.shadow.bias = 0.001;
    // pointLight.shadow.radius = 1;
    // 13.5 设置点光源投射阴影
    // pointLight.castShadow = true;
    // pointLight.target = ;

    // 7.0 创建场景坐标辅助
    const axesHelper: AxesHelper = new AxesHelper(10);
    // 8.0 创建场地网格辅助
    const gridHelper: GridHelper = new GridHelper(100, 100, 0x888888, 0x888888);
    // 8.1 设置场地网格辅助的偏移
    gridHelper.position.set(0, -4, 0);
    // 9.0 创建轨道控制器
    const controls: OrbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    // 9.1 设置轨道控制器坐标系
    controls.target.set(0, 0, 0);
    // 9.3 设置轨道控制器自动旋转
    controls.autoRotate = true;
    // 9.4 设置轨道控制器自动旋转速度
    controls.autoRotateSpeed = 0.5;
    // 9.5 设置轨道控制器惯性
    controls.enableDamping = true;
    // 9.6 设置轨道控制器按键绑定
    controls.mouseButtons = {
      // 默认设置
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN,
    };
    // 11.0 创建性能监视器(States 是函数,直接调用)
    const stats: Stats = Stats();
    // 11.1 设置性能监视器位置
    const statsDom: HTMLElement = stats.domElement;
    statsDom.style.position = 'fixed';
    statsDom.style.top = '50px';
    statsDom.style.left = '0';

    // 3.1 将立方体添加到场景中
    // this.scene.add(cube);
    // 12.1 使用 addObjs 方法将 3D 对象统一添加到场景中
    // this.addObjs(cube, sphere);
    // 6.1 将环境光添加到场景中
    this.scene.add(ambientLight);
    // 13.5 将点光源添加到场景中
    this.scene.add(pointLight);
    // 13.6 添加灯光辅助
    // this.scene.add(new CameraHelper(pointLight.shadow.camera));
    // 7.1 将辅助添加到场景中
    this.scene.add(axesHelper);
    // 8.1 将网格辅助添加到场景中
    this.scene.add(gridHelper);

    // 对于动态场景的渲染，需要每次更新场景
    // 5.0 设置清空颜色，可以给场景设置背景色(默认是黑色)
    // this.renderer.setClearColor(0xffffff, 1);
    // 5.1 清空渲染器颜色
    // this.renderer.clearColor();

    // 1.1 将渲染器挂载到指定dom上
    this.dom.appendChild(this.renderer.domElement);
    // 11.2 将性能监视器添加到dom中
    this.dom.appendChild(statsDom);

    // 2.1 将场景和相机挂载到渲染器上
    // this.renderer.render(this.scene, this.camera);

    // 10.0 动态更新场景
    const animate = () => {
      requestAnimationFrame(animate);
      // 设置立方体在 x 轴移动
      // cube.position.y += 0.01;
      // 设置立方体在 y 轴上旋转
      // cube.rotation.y += 0.01;
      // 设置相机在 x 轴移动
      // this.camera.position.x += 0.01;
      // 9.2 动态更新轨道控制器
      controls.update();
      // 11.2 动态更新性能监视器
      stats.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  // 12.0 将 3D 对象的创建提取到单独的文件中, addObjs 方法用来添加 3D 对象到场景中
  addObjs(...objs: Object3D[]): void {
    console.log(`🚀 ~ $T ~ addObjs ~ objs`, objs);
    objs.forEach((obj) => {
      this.scene.add(obj);
    });
  }
}
