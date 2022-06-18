import { WebGLRenderer } from 'three';

export class $T {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.renderer = new WebGLRenderer();
    dom.appendChild(this.renderer.domElement);
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight);
    // this.renderer.render();
    console.log(`🚀 ~ $T dom`, dom);
  }
}
