import { useGLTF } from '@react-three/drei';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Room = () => {
  const { nodes, materials, scene } = useGLTF('/models/frameRoom.glb');
  const texture = useLoader(TextureLoader, '/models/texture_1.jpg');
  console.log(nodes);
  console.log(scene);
  console.log(materials);
  texture.center.set(0.5, 0.5);
  // 왼쪽으로 90도 돌리기
  texture.rotation = 1.57;

  materials['frameMaterial.001'].map = texture;
  materials['frameMaterial.002'].map = texture;
  materials['frameMaterial.003'].map = texture;
  materials['frameMaterial.004'].map = texture;
  materials['frameMaterial.005'].map = texture;
  materials['frameMaterial.006'].map = texture;

  console.log(materials);

  return (
    <primitive
      object={scene}
      onClick={() => console.log('test click')}
    />
  );
};

// useGLTF.preload('/models/Room.glb');

export default Room;
