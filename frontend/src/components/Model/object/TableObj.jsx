import { useGLTF } from '@react-three/drei';

const TableObj = () => {
  const { scene } = useGLTF('/models/object/tableObj.glb');
  // 위치
  scene.position.x = -10;
  scene.position.y = 1;
  scene.position.z = 10;

  // // 회전
  scene.rotation.y = -0.97508;

  // // // 축적
  scene.scale.x = 1;
  scene.scale.y = 1;
  scene.scale.z = 1;

  return <primitive object={scene} />;
};

export default TableObj;
