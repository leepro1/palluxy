import MemorySideBarLayout from '@layout/MemorySideBarLayout';
import Slider from '@components/Model/Slider';
import GlobalBtn from '@components/GlobalBtn';

import { useState, useCallback } from 'react';
import FileUploadModal from '@components/Modal/FileUploadModal';
import ImgRotationBtn from '@components/Model/ImgRotationBtn';
import { useModelPositionStore } from '@store/memorySpace';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePalRotation, updatePalPosition } from '@/api/petapi';

const SettingSideBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectFrame, setSelectFrame] = useState();
  const queryClient = useQueryClient();
  const position = useModelPositionStore((state) => state.position);
  const rotation = useModelPositionStore((state) => state.rotation);

  const handleModal = useCallback(
    (frame) => {
      if (isModalOpen) {
        setModalOpen(false);
      }
      if (!isModalOpen) {
        setSelectFrame(frame);
        setModalOpen(true);
      }
    },
    [isModalOpen],
  );

  const { mutate: palPositionMutation } = useMutation({
    mutationFn: updatePalPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['palMeta'],
      });
      return alert('성공적으로 저장되었습니다!');
    },
  });

  const { mutate: palRotationMutation } = useMutation({
    mutationFn: updatePalRotation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['palMeta'],
      });
      return alert('성공적으로 저장되었습니다!');
    },
  });

  const handlePositionSave = () => {
    const palMetaData = queryClient.getQueryData(['palMeta']);
    const roomData = queryClient.getQueryData(['memorySpace']);

    if (!palMetaData || palMetaData.length === 0) {
      return alert('아직 펫이 없습니다!');
    }
    const payload = {
      roomId: roomData.roomId,
      petMetaId: palMetaData[0].petMetaId,
      position: {
        positionX: position.positionX,
        positionY: position.positionY,
        positionZ: position.positionZ,
      },
    };
    palPositionMutation(payload);
  };
  const handleRotationSave = () => {
    const palMetaData = queryClient.getQueryData(['palMeta']);
    const roomData = queryClient.getQueryData(['memorySpace']);

    if (!palMetaData || palMetaData.length === 0) {
      return alert('아직 펫이 없습니다!');
    }
    const payload = {
      roomId: roomData.roomId,
      petMetaId: palMetaData[0].petMetaId,
      rotation: {
        rotationX: rotation.rotationX,
        rotationY: rotation.rotationY,
        rotationZ: rotation.rotationZ,
      },
    };
    palRotationMutation(payload);
  };

  return (
    <MemorySideBarLayout>
      <div className="flex flex-col items-center gap-y-8">
        {/* 위치 변경 */}
        <div className="flex items-center gap-6 text-white">
          <span className="">위치</span>
          <div className="gap-y-2">
            <div className="flex gap-x-3">
              <span>X</span>
              <Slider
                type={'position'}
                coordinate={'positionX'}
              />
            </div>
            <div className="flex gap-x-3">
              <span>Y</span>
              <Slider
                type={'position'}
                coordinate={'positionY'}
              />
            </div>
            <div className="flex gap-x-3">
              <span>Z</span>
              <Slider
                type={'position'}
                coordinate={'positionZ'}
              />
            </div>
          </div>
        </div>
        {/* 위치 변경 저장 */}
        <div className="flex w-full justify-end pr-10">
          <GlobalBtn
            className="bg-white font-jamsilRegular text-sm"
            size={'sm'}
            text={'저장'}
            onClick={() => {
              handlePositionSave();
            }}
          />
        </div>
        {/* 회전 변경 */}
        <div className="flex items-center gap-6 text-white">
          <span className="">회전</span>
          <div className="gap-y-2">
            <div className="flex gap-x-3">
              <span>X</span>
              <Slider
                type={'rotation'}
                coordinate={'rotationX'}
              />
            </div>
            <div className="flex gap-x-3">
              <span>Y</span>
              <Slider
                type={'rotation'}
                coordinate={'rotationY'}
              />
            </div>
            <div className="flex gap-x-3">
              <span>Z</span>
              <Slider
                type={'rotation'}
                coordinate={'rotationZ'}
              />
            </div>
          </div>
        </div>
        {/* 회전 변경 저장 */}
        <div className="flex w-full justify-end pr-10">
          <GlobalBtn
            className="bg-white font-jamsilRegular text-sm"
            size={'sm'}
            text={'저장'}
            onClick={() => {
              handleRotationSave();
            }}
          />
        </div>
        {/* 액자 설정 */}
        <div className="flex items-center gap-6 text-white">
          <div className="flex flex-col">
            <span className="">사진</span>
            <span className="">설정</span>
          </div>
          <div className="flex flex-col items-end gap-y-3">
            <div className="flex gap-x-3">
              <span>첫 번째 액자</span>
              <div className="flex gap-x-1">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    handleModal(0);
                  }}
                >
                  upload_file
                </span>
                <ImgRotationBtn index={0} />
              </div>
            </div>
            <div className="flex gap-x-3">
              <span>두 번째 액자</span>
              <div className="flex gap-x-1">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    handleModal(1);
                  }}
                >
                  upload_file
                </span>
                <ImgRotationBtn index={1} />
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <FileUploadModal
            handler={setModalOpen}
            selectFrame={selectFrame}
          />
        )}
      </div>
    </MemorySideBarLayout>
  );
};

export default SettingSideBar;
