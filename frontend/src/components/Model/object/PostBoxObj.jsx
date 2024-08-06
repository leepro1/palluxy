import { useGLTF } from '@react-three/drei';

const PostBoxObj = () => {
  const { scene } = useGLTF('/models/object/postBox.glb');
  // 위치
  scene.position.x = -35;
  scene.position.y = 12;
  scene.position.z = 45.475;

  // // 회전
  scene.rotation.y = -0.97508;

  // // // 축적
  scene.scale.x = 5;
  scene.scale.y = 5;
  scene.scale.z = 5;

  return <primitive object={scene} />;
};

export default PostBoxObj;
