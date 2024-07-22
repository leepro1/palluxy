import ContentsLayout from '@layout/ContentsLayout';

import RoomCanvas from '@components/Model/RoomCanvas';
import GlobalBtn from '@components/GlobalBtn';
import MemoerySideBar from '@pages/MemorySpacePage/MemorySideBar';

const MemorySpacePage = () => {
  // 임시변수
  const isCreateSpace = false;

  return (
    <ContentsLayout>
      {isCreateSpace ? (
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
      ) : (
        <div className="flex h-full justify-center">
          <div className="font-jamsilMedium text-white">
            <div className="flex flex-col items-center gap-y-6">
              <p className="text-4xl">아직 추억공간이 없으시네요</p>
              <p className="text-4xl">추억공간을 만들러 떠나볼까요?</p>
              <GlobalBtn
                className="bg-pal-purple"
                size={'lg'}
                text={'추억공간 만들기'}
              />
            </div>
          </div>
        </div>
      )}
    </ContentsLayout>
  );
};

export default MemorySpacePage;
