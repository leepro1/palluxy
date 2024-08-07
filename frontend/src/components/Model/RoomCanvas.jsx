import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { Environment } from '@react-three/drei';

import { Vector3 } from 'three';

import PalModel from '@components/Model/PalModel';
import RooomModel from '@components/Model/RoomModel';
import CameraOption from '@components/Model/CameraOption';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAllFrameImage } from '@api/memorySpace/frameImageApi';
import Loading from '@components/Loading';
import GlobalBtn from '@components/GlobalBtn';
import PostBoxObj from '@components/Model/object/PostBoxObj';

import MailBoxModal from '@components/Modal/MailBoxModal';
import PalCreateModal from '@components//Modal/PalCreateModal';
import TableObj from '@components/Model/object/TableObj';

const RoomCanvas = () => {
  const queryClient = useQueryClient();
  const [isMailModalOpen, setMailModalOpen] = useState(false);
  const [isPalModalOpen, setPalModalOpen] = useState(false);
  const [position, setPosition] = useState(new Vector3(-100, 100, 100));
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const roomData = queryClient.getQueryData(['memorySpace']);
  const userData = queryClient.getQueryData(['userInfo']);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['palFrameImage'],
    queryFn: () => fetchAllFrameImage(roomData.roomId),
    staleTime: 1000 * 60 * 10,
  });

  const handleModelClick = (event) => {
    console.log(event.object.name);
    if (event.object.name.includes('POST')) {
      setMailModalOpen(!isMailModalOpen);
      return;
    }

    if (event.object.name.includes('frame')) {
      if (event.object.name === 'frame001') {
        setTarget(event.object.position);
        setPosition({ x: 20, y: 24, z: 28 });
      }
      if (event.object.name === 'frame002') {
        setTarget(event.object.position);
        setPosition({ x: 20, y: 24, z: 4 });
      }
      if (event.object.name === 'frame003') {
        setTarget(event.object.position);
        setPosition({ x: 20, y: 24, z: -20 });
      }
      if (event.object.name === 'frame004') {
        setTarget(event.object.position);
        setPosition({ x: 20, y: 24, z: -20 });
      }
      if (event.object.name === 'frame005') {
        setTarget(event.object.position);
        setPosition({ x: -5, y: 24, z: -20 });
      }
      if (event.object.name === 'frame006') {
        setTarget(event.object.position);
        setPosition({ x: -30, y: 24, z: -20 });
      }
    }
  };
  const handleCameraReset = () => {
    setTarget({ x: 0, y: 0, z: 0 });
    setPosition(new Vector3(-100, 100, 100));
  };
  const handlePalCreate = () => {
    setPalModalOpen(!isPalModalOpen);
    return;
  };

  // frame 1 x: 20, y: 24, z: 28
  // frame 2 x: 20, y: 24, z: 4
  // frame 3 x: 20, y: 24, z: -20
  // frame 4 x: 20, y: 24, z: -20
  // frame 5 x: -5, y: 24, z: -20
  // frame 6 x: -30, y: 24, z: -20

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative h-[617px] w-[1000px]">
      <p className="absolute left-0 top-4 z-40 px-10 font-jamsilRegular text-xl text-pal-purple text-white">
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
            <PalModel />
            <PostBoxObj />
            <TableObj />
          </mesh>
        </group>
        {/* <Environment
          preset="sunset"
          background="only"
          backgroundBlurriness="0.1"
          blur={1}
        /> */}
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
