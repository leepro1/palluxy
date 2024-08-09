import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const convertTexture = async (imgPath) => {
  const convertedTexutre = useLoader(TextureLoader, imgPath);
  return convertedTexutre;
};

export default convertTexture;
