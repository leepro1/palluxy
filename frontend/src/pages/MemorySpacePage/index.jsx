import ContentsLayout from '@layout/ContentsLayout';

import RoomCanvas from '@components/Model/RoomCanvas';
import ImgRotationBtn from '@components/Model/ImgRotationBtn';
import GlobalBtn from '@components/GlobalBtn';
import MemoerySideBar from '@pages/MemorySpacePage/MemorySideBar';

const MemorySpacePage = () => {
  return (
    <div className="h-full w-full">
      <ContentsLayout>
        <div className="flex">
          <div className="flex grow flex-col">
            <div className="flex w-[1000px] justify-end gap-x-10 py-7">
              <GlobalBtn
                className="bg-pal-purple text-white"
                size={'md'}
                text={'모델 생성'}
              />
              <GlobalBtn
                className="bg-pal-purple text-white"
                size={'md'}
                text={'추억공간 생성'}
              />
            </div>
            <RoomCanvas />
          </div>
          <div className="w-[310px] rounded-xl bg-pal-purple">
            <MemoerySideBar />
          </div>
        </div>
      </ContentsLayout>
    </div>
  );
};

export default MemorySpacePage;
