import MemorySideBarLayout from '@layout/MemorySideBarLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const UsageTipSideBar = () => {
  const queryClient = useQueryClient();
  const { userId: visitUserId } = useParams();
  const navigate = useNavigate();
  const currentConnetUserId = queryClient.getQueryData(['userInfo']);

  useEffect(() => {
    if (parseInt(visitUserId) !== currentConnetUserId.id) {
      navigate(`/memoryspace/${visitUserId}`);
    }
  }, []);

  return (
    <MemorySideBarLayout>
      <div className="flex flex-col gap-y-3 px-4 text-sm">
        <div className="rounded-md bg-white px-4 py-4 text-center font-bold">
          <p>1. 아직 펫이 없다면 펫 불러오기를 해보세요</p>
          <br />
          <p>펫이 있어야 편지를 작성할 수 있어요</p>
        </div>
        <div className="rounded-md bg-white px-4 py-4 text-center font-bold">
          <p>2. 설정 탭에서 펫의 위치를 조정해보세요</p>
          <br />
          <p>저장을 꼭 눌러야 반영이됩니다.</p>
        </div>
        <div className="rounded-md bg-white px-4 py-4 text-center font-bold">
          <p>3. 액자를 클릭해보세요.</p>
          <br />
          <p>소중한 사진을 더 가까이서 볼 수 있어요.</p>
        </div>
        <div className="rounded-md bg-white px-4 py-4 text-center font-bold">
          <p>4. 우편함을 눌러 편지를 작성해보세요</p>
          <br />
          <p>
            <span className="text-pal-purple">보라색 편지</span>는 펫이
          </p>
          <p>
            <span className="text-[#91C166]">초록색 편지</span>는 당신이 적은
            편지입니다.
          </p>
        </div>
        <div className="rounded-md bg-white px-4 py-4 text-center font-bold">
          <p>5. 액자를 클릭해보세요.</p>
          <br />
          <p>
            <span className="text-pal-error">하드웨어 가속</span>을 키시면 더욱
            원활히 이용 가능합니다.
          </p>
        </div>
      </div>
    </MemorySideBarLayout>
  );
};

export default UsageTipSideBar;
