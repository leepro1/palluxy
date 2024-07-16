import { useFrameStore } from '@store/memorySpace';

import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const ImgRotationBtn = () => {
  const { materials } = useGLTF('/models/frameRoom.glb');
  const rotation = useFrameStore((state) => state.rotation);
  const texture = useLoader(TextureLoader, '/models/texture_1.jpg');
  const updateRotation = useFrameStore((state) => state.updateRotation);

  // console.log(materials['frameMaterial.001']);
  materials['frameMaterial.001'].map = texture;
  texture.center.set(0.5, 0.5);
  // // 왼쪽으로 90도 돌리기
  texture.rotation = rotation;

  const handleLeftRotation = () => {
    updateRotation(rotation + 1.5);
  };
  const handleRightRotation = () => {
    updateRotation(rotation - 1.5);
  };

  return (
    <div className="flex">
      <button
        className="border-2"
        onClick={() => handleLeftRotation()}
      >
        좌로
      </button>
      <button
        className="border-2"
        onClick={() => handleRightRotation()}
      >
        우로
      </button>
      {rotation}
    </div>
  );
};

export default ImgRotationBtn;
