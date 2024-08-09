import { useGLTF } from '@react-three/drei';
import { FRAME_INDEX } from '@/constants/frameIndex';
import FrameTexture from '@components/Model/FrameTexture';
import PropTypes from 'prop-types';
import React from 'react';

const RoomModel = React.memo(({ data }) => {
  const { materials, scene } = useGLTF('/models/palluxy.glb');

  scene.scale.x = 1.3;
  scene.scale.y = 1.3;
  scene.scale.z = 1.3;

  return (
    <primitive object={scene}>
      {data.map((frameData) => (
        <FrameTexture
          key={frameData.imageId}
          frameData={frameData}
          materials={materials}
          matrialName={FRAME_INDEX[frameData.index]}
        />
      ))}
    </primitive>
  );
});

RoomModel.displayName = 'RoomModel';

RoomModel.propTypes = {
  data: PropTypes.any.isRequired,
};
export default RoomModel;
