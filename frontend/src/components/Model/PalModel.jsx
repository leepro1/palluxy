import PropTypes from 'prop-types';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

import { useModelPositionStore } from '@store/memorySpace';
import { useEffect } from 'react';

const PalModel = ({ objData }) => {
  const obj = useLoader(OBJLoader, objData.objFilePath);

  const position = useModelPositionStore((state) => state.position);
  const rotation = useModelPositionStore((state) => state.rotation);

  obj.position.x = objData.positionX;
  obj.position.y = objData.positionY;
  obj.position.z = objData.positionZ;
  obj.rotation.x = objData.rotationX;
  obj.rotation.y = objData.rotationY;
  obj.rotation.z = objData.rotationZ;

  useEffect(() => {
    obj.position.x = position.positionX;
    obj.position.y = position.positionY;
    obj.position.z = position.positionZ;
    obj.rotation.x = rotation.rotationX;
    obj.rotation.y = rotation.rotationY;
    obj.rotation.z = rotation.rotationZ;
  }, [position, rotation]);

  obj.scale.x = 2;
  obj.scale.y = 2;
  obj.scale.z = 2;

  return <primitive object={obj} />;
};

PalModel.propTypes = {
  objData: PropTypes.object.isRequired,
};

export default PalModel;
