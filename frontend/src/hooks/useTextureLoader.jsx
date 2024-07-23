import { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const useTextureLoader = (imgPath) => {
  const [texture, setTexture] = useState(null);
  const convertedTexutre = useLoader(TextureLoader, imgPath);

  const handleTexture = () => {
    setTexture(convertedTexutre);
  };

  return { texture, handleTexture };
};

export default useTextureLoader;
