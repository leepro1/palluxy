import ContentsLayout from '@layout/ContentsLayout';
import meetingPreview from '@assets/images/homePage/meetingPreview.png';
import roomPreview from '@assets/images/homePage/roomPreview.png';
const HomePage = () => {
  return (
    <ContentsLayout>
      <div className="flex flex-col">
        {/* slo */}
        <div className="flex flex-col items-center gap-y-3 py-16 font-jamsilBold text-2xl text-white lg:text-4xl">
          <h1>반려동물의 상실을 겪은 당신을 위한</h1>
          <h1>PAL:LUXY</h1>
        </div>

        {/* preview */}
        <div className="mx-5 my-10">
          <div className="grid justify-center gap-y-10 lg:flex lg:justify-between">
            {/* 추억공간 */}
            <div className="flex flex-col gap-y-5 rounded-md px-4 py-10 font-jamsilBold text-white">
              <h2 className="text-2xl">반려동물 추억공간</h2>
              <div className="h-[180px] w-[280px] bg-black lg:h-[300px] lg:w-[500px]">
                <img
                  className="h-full w-full"
                  src={roomPreview}
                  alt="추억공간 미리보기"
                />
              </div>
              <div className="flex flex-col gap-y-3 font-jamsilRegular text-lg">
                <p>o 소중한 반려동물과의 추억을 저장해 보세요.</p>
                <p>o 팰럭시에 살고있는 반려동물과 편지를 주고받아 보세요.</p>
                <p>o 펫로스를 겪은 다른 반려인에게 방명록을 남겨보세요.</p>
              </div>
            </div>
            {/* 치유모임 */}
            <div className="flex flex-col gap-y-5 rounded-md px-4 py-10 font-jamsilBold text-white">
              <h2 className="text-2xl">치유모임</h2>
              <div className="h-[180px] w-[280px] bg-black lg:h-[300px] lg:w-[500px]">
                <img
                  className="h-full w-full"
                  src={meetingPreview}
                  alt="치유모임 미리보기"
                />
              </div>
              <div className="flex flex-col gap-y-3 font-jamsilRegular text-lg">
                <p>
                  o 펫로스를 겪은 다른 반려인들과의 화상 모임을 통해 서로 소통해
                  보세요.
                </p>
                <p>o 상처를 치유하고 아픔을 극복하는 데 도움이 될 것입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default HomePage;
