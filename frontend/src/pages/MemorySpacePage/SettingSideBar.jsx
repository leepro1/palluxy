import MemorySideBarLayout from '@layout/MemorySideBarLayout';
import Slider from '@components/Model/Slider';
import GlobalBtn from '@components/GlobalBtn';

import { useState, useCallback } from 'react';
import FileUploadModal from '@components/Modal/FileUploadModal';
import ImgRotationBtn from '@components/Model/ImgRotationBtn';
import { useModelPositionStore } from '@store/memorySpace';

const SettingSideBar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectFrame, setSelectFrame] = useState();

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

  const handlePositionSave = () => {
    console.log(position);
  };
  const handleRotationSave = () => {
    console.log(rotation);
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
                coordinate={'x'}
              />
            </div>
            <div className="flex gap-x-3">
              <span>Y</span>
              <Slider
                type={'position'}
                coordinate={'y'}
              />
            </div>
            <div className="flex gap-x-3">
              <span>Z</span>
              <Slider
                type={'position'}
                coordinate={'z'}
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
                coordinate={'x'}
              />
            </div>
            <div className="flex gap-x-3">
              <span>Y</span>
              <Slider
                type={'rotation'}
                coordinate={'y'}
              />
            </div>
            <div className="flex gap-x-3">
              <span>Z</span>
              <Slider
                type={'rotation'}
                coordinate={'z'}
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
            <span className="">추억</span>
            <span className="">사진</span>
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
            <div className="flex gap-x-3">
              <span>세 번째 액자</span>
              <div className="flex gap-x-1">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    handleModal(2);
                  }}
                >
                  upload_file
                </span>
                <ImgRotationBtn index={2} />
              </div>
            </div>
            <div className="flex gap-x-3">
              <span>네 번째 액자</span>
              <div className="flex gap-x-1">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    handleModal(3);
                  }}
                >
                  upload_file
                </span>
                <ImgRotationBtn index={3} />
              </div>
            </div>
            <div className="flex gap-x-3">
              <span>다섯 번째 액자</span>
              <div className="flex gap-x-1">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    handleModal(4);
                  }}
                >
                  upload_file
                </span>
                <ImgRotationBtn index={4} />
              </div>
            </div>
            <div className="flex gap-x-3">
              <span>여섯 번째 액자</span>
              <div className="flex gap-x-1">
                <span
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    handleModal(5);
                  }}
                >
                  upload_file
                </span>
                <ImgRotationBtn index={5} />
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
