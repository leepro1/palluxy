import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { getFrameImage } from '@api/memorySpace/frameImageApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useLayoutEffect } from 'react';

const RoomModel = () => {
  const { nodes, materials, scene } = useGLTF('/models/frameRoom.glb');
  const texture = useLoader(TextureLoader, '/models/texture_1.jpg');
  const texture1 = useLoader(
    TextureLoader,
    'https://palluxytest-resdstone.s3.ap-northeast-2.amazonaws.com/cat2.jpg',
  );
  // console.log(nodes);
  // // console.log(scene);
  // console.log(materials);

  const { data: frameImages, isSuccess } = useQuery({
    queryKey: ['nika'],
    queryFn: getFrameImage,
  });

  if (isSuccess) {
    // console.log(texture);
    // console.log(frameImages[0].url);
    materials['frameMaterial.001'].map = texture1;
    materials['frameMaterial.002'].map = texture;
  }
  // console.log(frameImages);
  // console.log(frameImages);

  // materials['frameMaterial.001'].map = texture;
  // materials['frameMaterial.002'].map = texture;
  // materials['frameMaterial.003'].map = texture;
  // materials['frameMaterial.004'].map = texture;
  // materials['frameMaterial.005'].map = texture;
  // materials['frameMaterial.006'].map = texture;

  // const handleModelClick = (event) => {
  //   console.log(event.object);
  //   if (event.object.name === 'frame006') {
  //     console.log('select 6');
  //   }
  // };
  useLayoutEffect(() => {});
  return (
    <primitive
      object={scene}
      // onClick={(e) => handleModelClick(e)}
    />
  );
};

// useGLTF.preload('/models/Room.glb');

export default RoomModel;
