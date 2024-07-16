import ContentsLayout from '@layout/ContentsLayout';

import RoomCanvas from '@components/Model/RoomCanvas';
import Slider from '@components/Model/Slider';
import ImgRotationBtn from '@components/Model/ImgRotationBtn';

const MemorySpacePage = () => {
  return (
    <div className="h-full w-full bg-white">
      <ContentsLayout>
        <div className="flex">
          <RoomCanvas />
          <div className="flex flex-col">
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
          </div>
        </div>
      </ContentsLayout>
    </div>
  );
};

export default MemorySpacePage;
