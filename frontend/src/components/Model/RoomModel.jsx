import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const RoomModel = () => {
  const { nodes, materials, scene } = useGLTF('/models/frameRoom.glb');
  const texture = useLoader(TextureLoader, '/models/texture_1.jpg');
  // console.log(nodes);
  // // console.log(scene);
  // console.log(materials);

  materials['frameMaterial.001'].map = texture;
  materials['frameMaterial.002'].map = texture;
  materials['frameMaterial.003'].map = texture;
  materials['frameMaterial.004'].map = texture;
  materials['frameMaterial.005'].map = texture;
  materials['frameMaterial.006'].map = texture;

  const handleModelClick = (event) => {
    console.log(event.object);
    if (event.object.name === 'frame006') {
      console.log('select 6');
    }
  };

  return (
    <primitive
      object={scene}
      // onClick={(e) => handleModelClick(e)}
    />
  );
};

// useGLTF.preload('/models/Room.glb');

export default RoomModel;
