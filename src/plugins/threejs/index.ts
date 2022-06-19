import {
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

export class $T {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  constructor(dom: HTMLElement) {
    console.log(`🚀 ~ $T dom`, dom);
    // 1.0 将渲染器挂载到指定dom上
    this.dom = dom;
    this.renderer = new WebGLRenderer();
    this.dom.appendChild(this.renderer.domElement);
    // 1.1 初始化渲染器尺寸
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight);

    // 2.0 创建场景和相机
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000);

    // 相机如果设置不对会看不到场景里的模型
    // 4.0 设置相机位置
    this.camera.position.set(10, 10, 10);
    // 4.1 设置相机目标位置
    this.camera.lookAt(0, 0, 0);
    // 4.2 设置相机的方向
    this.camera.up.set(0, 1, 0);

    // 3.0 创建一个立方体
    const geometry: BoxBufferGeometry = new BoxBufferGeometry(3, 3, 3);
    // MeshStandardMaterial 材质设置颜色无效
    // const material: MeshStandardMaterial = new MeshStandardMaterial();
    const material: MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube: Mesh = new Mesh(geometry, material);

    // 3.1 将立方体添加到场景中
    this.scene.add(cube);

    // 对于动态场景的渲染，需要每次更新场景
    // 5.0 设置清空颜色，可以给场景设置背景色(默认是黑色)
    this.renderer.setClearColor(0xffffff, 1);
    // 5.1 清空渲染器颜色
    this.renderer.clearColor();

    // 2.1 将场景和相机挂载到渲染器上
    this.renderer.render(this.scene, this.camera);
  }
}
