import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllFrameImage } from '@api/memorySpace/frameImageApi';
import { FRAME_INDEX, FRAME_NAME } from '@/constants/frameIndex';
import convertTexture from '@/utils/convertTexture';
import * as THREE from 'three';

const SceneUpdater = () => {
  const { scene } = useThree();
  const { data: frameImages, isSuccess } = useQuery({
    queryKey: ['palFrameImage'],
    queryFn: fetchAllFrameImage,
  });

  useEffect(() => {
    console.log(isSuccess);
    console.log(scene.getObjectByName('frame001'));

    //
    const loadTexture = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const texture = new THREE.Texture();
          texture.image = img;
          texture.needsUpdate = true; // 텍스처 업데이트
          resolve(texture);
        };
      });
    };

    //

    if (isSuccess) {
      console.log('suc');
      frameImages.forEach((frameData) => {
        const matrialName = FRAME_NAME[frameData.index];
        console.log(matrialName);
        // const texture = convertTexture(frameData.url);
        const box = scene.getObjectByName(matrialName);
        console.log(box);
        loadTexture(frameData.url).then((texture) => {
          // box.material.map = texture;
          console.log(texture);
          // const newMaterial = new THREE.MeshStandardMaterial({
          //   map: texture,
          // });
          texture.center.set(0.5, 0.5);
          texture.rotation = frameData.angle;
          // console.log(materials[matrialName].map.center);
          box.material.map = texture;
        });
      });
    }
    // if (box) {
    //   box.position.set(1, 1, 1);
    //   console.log(box.material.map);
    // }
  }, [scene, isSuccess]);

  return null;
};

export default SceneUpdater;
