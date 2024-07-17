import MemorySideBarLayout from '@layout/MemorySideBarLayout';
import Slider from '@components/Model/Slider';

const SettingSideBar = () => {
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
      </div>
    </MemorySideBarLayout>
  );
};

export default SettingSideBar;
