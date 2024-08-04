import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const FrameTexture = ({ frameData, materials, matrialName }) => {
  console.log(frameData);
  const convertedTexutre = useLoader(TextureLoader, frameData.url);
  materials[matrialName].map = convertedTexutre;
  convertedTexutre.center.set(0.5, 0.5);
  convertedTexutre.rotation = frameData.angle;

  return null;
};

export default FrameTexture;
