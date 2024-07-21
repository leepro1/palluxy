import { useGLTF } from '@react-three/drei';
import { fetchAllFrameImage } from '@api/memorySpace/frameImageApi';
import { useQuery } from '@tanstack/react-query';
import { FRAME_INDEX } from '@/constants/frameIndex';
import convertTexture from '@/utils/convertTexture';

const RoomModel = () => {
  const { nodes, materials, scene } = useGLTF('/models/frameRoom.glb');

  const { data: frameImages, isSuccess } = useQuery({
    queryKey: ['palFrameImage'],
    queryFn: fetchAllFrameImage,
    staleTime: 60000,
  });

  if (isSuccess) {
    frameImages.forEach((frameData) => {
      const matrialName = FRAME_INDEX[frameData.index];
      const texture = convertTexture(frameData.url);
      materials[matrialName].map = texture;
      texture.center.set(0.5, 0.5);
      texture.rotation = frameData.angle;
    });
  }

  return <primitive object={scene} />;
};

export default RoomModel;
