import {
  BoxBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  Object3D,
  SphereGeometry,
  Points,
  Line,
} from 'three';

/**
 * Mesh 网状网
 * XxxBufferGeometry Xxx几何体缓存
 * MeshXxxMaterial 网格Xxx材质
 */
// 3.0 创建一个立方体
const boxGeometry: BoxBufferGeometry = new BoxBufferGeometry(4, 4, 4);
// MeshStandardMaterial 材质设置颜色不会直接生效(需要通过灯光点亮,不设置颜色会随灯光颜色,设置颜色显示设置的颜色)
// const material: MeshStandardMaterial = new MeshStandardMaterial();
const boxMaterial: MeshStandardMaterial = new MeshStandardMaterial({ color: 0xff0000 });
// const material: MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
const cube: Mesh = new Mesh(boxGeometry, boxMaterial);
cube.position.set(-8, 0, 0);

// 创建小球
const sphereGeometry = new SphereGeometry(3, 20, 20);
const sphereMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
const sphereMesh = new Mesh(sphereGeometry, sphereMaterial);
const sphereLine = new Line(sphereGeometry); // 线条绘制
const spherePoints = new Points(sphereGeometry); // 点绘制
sphereMesh.position.set(6, 0, 0);
sphereLine.position.set(0, 6, 0);
spherePoints.position.set(0, 0, 6);

export const objs: Object3D[] = [cube, sphereMesh, sphereLine, spherePoints];

// export { cube, sphere };
