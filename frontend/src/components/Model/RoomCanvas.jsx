import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import { Vector3 } from 'three';

import PalModel from '@components/Model/PalModel';
import RooomModel from '@components/Model/RoomModel';
import CameraOption from '@components/Model/CameraOption';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAllFrameImage } from '@api/memorySpace/frameImageApi';
import Loading from '@components/Loading';
import GlobalBtn from '@components/GlobalBtn';

import MailBoxModal from '@components/Modal/MailBoxModal';
import PalCreateModal from '@components//Modal/PalCreateModal';
import { fetchPalmeta } from '@api/memorySpace/createApi';

import { useModelPositionStore } from '@store/memorySpace';

const RoomCanvas = () => {
  const queryClient = useQueryClient();
  const [isMailModalOpen, setMailModalOpen] = useState(false);
  const [isPalModalOpen, setPalModalOpen] = useState(false);
  const [position, setPosition] = useState(new Vector3(-6, 2, 6));
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const roomData = queryClient.getQueryData(['memorySpace']);
  const userData = queryClient.getQueryData(['userInfo']);

  const updatePosition = useModelPositionStore((state) => state.fetchPosition);
  const updateRotation = useModelPositionStore((state) => state.fetchRotation);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['palFrameImage'],
    queryFn: () => fetchAllFrameImage(roomData.roomId),
    // staleTime: 1000 * 60 * 10,
  });

  const { data: palMetaData, isSuccess: isPalMetaSuccess } = useQuery({
    queryKey: ['palMeta'],
    queryFn: () => fetchPalmeta(roomData.roomId),
    // staleTime: 1000 * 60 * 10,
  });

  if (isPalMetaSuccess) {
    updatePosition({
      positionX: palMetaData[0] ? palMetaData[0].positionX : 0,
      positionY: palMetaData[0] ? palMetaData[0].positionY : 0,
      positionZ: palMetaData[0] ? palMetaData[0].positionZ : 0,
    });
    updateRotation({
      rotationX: palMetaData[0] ? palMetaData[0].rotationX : 0,
      rotationY: palMetaData[0] ? palMetaData[0].rotationY : 0,
      rotationZ: palMetaData[0] ? palMetaData[0].rotationZ : 0,
    });
  }

  const handleModelClick = (event) => {
    console.log(event.object.name);
    if (event.object.name.includes('post')) {
      setMailModalOpen(!isMailModalOpen);
      return;
    }

    if (event.object.name.includes('frame')) {
      if (event.object.name === 'frame001') {
        setTarget(event.object.position);
        console.log(event.object.position);
        setPosition({ x: -1, y: 3.8, z: -1 });
      }
      if (event.object.name === 'frame002') {
        setTarget(event.object.position);
        console.log(event.object.position);
        setPosition({ x: 0, y: 2.3, z: -1.4 });
      }
    }
  };
  const handleCameraReset = () => {
    setTarget({ x: 0, y: 0, z: 0 });
    setPosition(new Vector3(-6, 2, 6));
  };
  const handlePalCreate = () => {
    setPalModalOpen(!isPalModalOpen);
    return;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative h-[617px] w-[1000px]">
      <p className="absolute left-0 top-4 z-40 px-10 font-jamsilRegular text-xl text-white">
        추억공간 : {roomData.name}
      </p>
      <div className="absolute right-2 top-4 z-40 flex items-center gap-x-3">
        {userData.id === roomData.userId && (
          <GlobalBtn
            className="bg-pal-purple text-white"
            size={'md'}
            text={'펫 불러오기'}
            onClick={() => {
              handlePalCreate();
            }}
          />
        )}
        <GlobalBtn
          className="bg-pal-purple text-white"
          size={'md'}
          text={'카메라 초기화'}
          onClick={() => {
            handleCameraReset();
          }}
        />
      </div>
      <Canvas
        flat
        className="z-0"
      >
        <CameraOption
          position={position}
          target={target}
        />
        <ambientLight intensity={Math.PI / 2} />
        <group onClick={(e) => handleModelClick(e)}>
          {/* <SceneUpdater /> */}
          <RooomModel data={isSuccess ? data.images : []} />
          <mesh>
            {palMetaData?.length >= 1 && <PalModel objData={palMetaData[0]} />}
            {/* <PalModel /> */}
          </mesh>
        </group>
      </Canvas>
      {isPalModalOpen && (
        <PalCreateModal
          roomId={roomData.roomId}
          handler={setPalModalOpen}
        />
      )}
      {isMailModalOpen && <MailBoxModal handler={setMailModalOpen} />}
    </div>
  );
};

export default RoomCanvas;
