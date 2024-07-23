import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const convertTexture = async (imgPath) => {
  try {
    const convertedTexutre = useLoader(TextureLoader, imgPath);
    return convertedTexutre;
  } catch (error) {
    console.log(error);
  }
};

export default convertTexture;
