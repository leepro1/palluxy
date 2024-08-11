import PropTypes from 'prop-types';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const FrameTexture = ({ frameData, materials, matrialName }) => {
  const convertedTexutre = useLoader(TextureLoader, frameData.url);

  materials['frameMaterial.001'].map = null;
  materials['frameMaterial.002'].map = null;
  materials[matrialName].map = convertedTexutre;
  convertedTexutre.center.set(0.5, 0.5);
  convertedTexutre.rotation = frameData.angle;

  return null;
};

FrameTexture.propTypes = {
  frameData: PropTypes.object.isRequired,
  materials: PropTypes.object.isRequired,
  matrialName: PropTypes.string.isRequired,
};

export default FrameTexture;
