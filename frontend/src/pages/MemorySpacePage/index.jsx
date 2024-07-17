import ContentsLayout from '@layout/ContentsLayout';

import RoomCanvas from '@components/Model/RoomCanvas';
import ImgRotationBtn from '@components/Model/ImgRotationBtn';
import Button from '@components/Button';
import MemoerySideBar from '@pages/MemorySpacePage/MemorySideBar';

const MemorySpacePage = () => {
  return (
    <div className="h-full w-full">
      <ContentsLayout>
        <div className="flex">
          <div className="flex grow flex-col">
            <div className="flex w-[1000px] justify-end gap-x-10 py-7">
              <Button
                className="bg-pal-purple text-white"
                size={'md'}
                text={'모델 생성'}
              />
              <Button
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

          {/* <div className="flex flex-col">
            <div>
              <span>position x</span>
              <Slider
                type={'position'}
                coordinate={'x'}
              />
            </div>
            <div>
              <span>position y</span>
              <Slider
                type={'position'}
                coordinate={'y'}
              />
            </div>
            <div>
              <span>position z</span>
              <Slider
                type={'position'}
                coordinate={'z'}
              />
            </div>
            <div>
              <span>rotation x</span>
              <Slider
                type={'rotation'}
                coordinate={'x'}
              />
            </div>
            <div>
              <span>rotation y</span>
              <Slider
                type={'rotation'}
                coordinate={'y'}
              />
            </div>
            <div>
              <span>rotation z</span>
              <Slider
                type={'rotation'}
                coordinate={'z'}
              />
            </div>
            <div>
              <span>rotation Frame1</span>
              <ImgRotationBtn />
            </div>
          </div> */}
        </div>
      </ContentsLayout>
    </div>
  );
};

export default MemorySpacePage;
