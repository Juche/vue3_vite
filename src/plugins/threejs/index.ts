import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export class $T {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  constructor(dom: HTMLElement) {
    console.log(`🚀 ~ $T dom`, dom);
    this.dom = dom;
    this.renderer = new WebGLRenderer();
    this.dom.appendChild(this.renderer.domElement);
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, dom.offsetWidth / dom.offsetHeight, 1, 1000);

    this.renderer.render(this.scene, this.camera);
  }
}
