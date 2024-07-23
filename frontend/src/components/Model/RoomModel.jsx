import { useGLTF } from '@react-three/drei';
import { FRAME_INDEX } from '@/constants/frameIndex';
import convertTexture from '@/utils/convertTexture';
import PropTypes from 'prop-types';
import React from 'react';

const RoomModel = React.memo(({ data }) => {
  const { materials, scene } = useGLTF('/models/frameRoom.glb');

  console.log('실행됨');
  data.forEach(async (frameData) => {
    console.log(frameData.index);
    const matrialName = FRAME_INDEX[frameData.index];
    const texture = await convertTexture(frameData.url);
    if (texture) {
      materials[matrialName].map = texture;
      texture.center.set(0.5, 0.5);
      texture.rotation = frameData.angle;
    }
  });

  return <primitive object={scene} />;
});

RoomModel.displayName = 'RoomModel';

RoomModel.propTypes = {
  data: PropTypes.any.isRequired,
};
export default RoomModel;
