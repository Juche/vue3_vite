import { BoxBufferGeometry, MeshStandardMaterial, Mesh, Object3D, SphereGeometry } from 'three';

// 3.0 创建一个立方体
const boxGeometry: BoxBufferGeometry = new BoxBufferGeometry(2, 2, 2);
// MeshStandardMaterial 材质设置颜色不会直接生效(需要通过灯光点亮,不设置颜色会随灯光颜色,设置颜色显示设置的颜色)
// const material: MeshStandardMaterial = new MeshStandardMaterial();
const boxMaterial: MeshStandardMaterial = new MeshStandardMaterial({ color: 0xff0000 });
// const material: MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
const cube: Mesh = new Mesh(boxGeometry, boxMaterial);

// 创建一个小球
const sphereGeometry = new SphereGeometry(1, 100, 100);
const sphereMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
const sphere = new Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(3, 0, 0);

export const objs: Object3D[] = [cube, sphere];

// export { cube, sphere };
