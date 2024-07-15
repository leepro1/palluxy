import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

import useModelPositionStore from '@store/memorySpace';

const Modeling = () => {
  const obj = useLoader(OBJLoader, '/models/dog4.obj');

  const position = useModelPositionStore((state) => state.position);
  const rotation = useModelPositionStore((state) => state.rotation);

  obj.position.x = position.x;
  obj.position.y = position.y;
  obj.position.z = position.z;
  obj.rotation.x = rotation.x;
  obj.rotation.y = rotation.y;
  obj.rotation.z = rotation.z;

  obj.scale.x = 35;
  obj.scale.y = 35;
  obj.scale.z = 35;
  console.log(obj);

  return <primitive object={obj} />;
};

export default Modeling;
