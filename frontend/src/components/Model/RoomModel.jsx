import { useGLTF } from '@react-three/drei';
import { FRAME_INDEX } from '@/constants/frameIndex';
import convertTexture from '@/utils/convertTexture';
import FrameTexture from '@components/Model/FrameTexture';
import PropTypes from 'prop-types';
import React from 'react';

const RoomModel = React.memo(({ data }) => {
  const { materials, scene } = useGLTF('/models/frameRoom.glb');

  data.forEach(async (frameData) => {
    const matrialName = FRAME_INDEX[frameData.index];
    const texture = await convertTexture(frameData.url);
    if (texture) {
      materials[matrialName].map = texture;
      texture.center.set(0.5, 0.5);
      texture.rotation = frameData.angle;
    }
  });

  return (
    <primitive object={scene}>
      {/* {data.map((frameData) => {
        const matrialName = FRAME_INDEX[frameData.index];
        console.log(frameData);
        <FrameTexture
          frameData={frameData}
          materials={matrialName}
          matrialName={matrialName}
        />;
      })} */}
    </primitive>
  );
});

RoomModel.displayName = 'RoomModel';

RoomModel.propTypes = {
  data: PropTypes.any.isRequired,
};
export default RoomModel;
