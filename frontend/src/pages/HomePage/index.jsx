import ContentsLayout from '@layout/ContentsLayout';

const HomePage = () => {
  return (
    <ContentsLayout>
      <div className="flex flex-col">
        {/* slo */}
        <div className="flex flex-col items-center gap-y-3 py-16 font-jamsilBold text-2xl text-white lg:text-5xl">
          <h1>반려동물의 상실을 겪은 당신을 위한</h1>
          <h1>PAL:Luxy</h1>
        </div>

        {/* preview */}
        <div className="mx-5 my-10">
          <div className="grid justify-center gap-y-10 lg:flex lg:justify-between">
            {/* 추억공간 */}
            <div className="flex flex-col gap-y-5 font-jamsilBold text-white">
              <h2 className="text-3xl">반려동물 추억공간</h2>
              <div className="h-[200px] w-[300px] bg-black lg:h-[300px] lg:w-[500px]"></div>
              <h3 className="font-jamsilRegular text-xl">
                반려동물을 만나보세요
              </h3>
            </div>
            {/* 치유모임 */}
            <div className="flex flex-col gap-y-5 font-jamsilBold text-white">
              <h2 className="text-3xl">치유모임</h2>
              <div className="h-[200px] w-[300px] bg-black lg:h-[300px] lg:w-[500px]"></div>
              <h3 className="font-jamsilRegular text-xl">
                사람들을 만나보세요
              </h3>
            </div>
          </div>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default HomePage;
