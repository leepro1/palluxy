import PropTypes from 'prop-types';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

import { useModelPositionStore } from '@store/memorySpace';

const PalModel = ({ objURL }) => {
  const obj = useLoader(OBJLoader, objURL);

  const position = useModelPositionStore((state) => state.position);
  const rotation = useModelPositionStore((state) => state.rotation);

  obj.position.x = position.x;
  obj.position.y = position.y;
  obj.position.z = position.z;
  obj.rotation.x = rotation.x;
  obj.rotation.y = rotation.y;
  obj.rotation.z = rotation.z;

  obj.scale.x = 2;
  obj.scale.y = 2;
  obj.scale.z = 2;

  return <primitive object={obj} />;
};

PalModel.propTypes = {
  objURL: PropTypes.string.isRequired,
};

export default PalModel;
