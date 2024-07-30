import ContentsLayout from '@layout/ContentsLayout';
import GlobalBtn from '@components/GlobalBtn';
import { useQuery } from '@tanstack/react-query';
import { fetchpetPersonalities } from '@/api/petapi';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { ErrorMessage } from '@hookform/error-message';
import {
  postCreateAlbum,
  postCreateRoom,
  postCreatePet,
} from '@/api/memorySpace/createApi';

const PersonalityCheckbox = ({ personality, checkboxName, register }) => {
  return (
    <div className="flex gap-x-2">
      <input
        type="checkbox"
        name={checkboxName}
        id={personality.type}
        value={personality.type}
        {...register}
      />
      <label htmlFor={personality.type}>{personality.type}</label>
    </div>
  );
};

const MemorySpaceCreatePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      character: [],
      separationDate: '',
      pet_name: '',
      pet_gender: '',
      relation: '',
    },
  });
  const queryClient = useQueryClient();
  const { mutate: petMutate, isSuccess: petSuccess } = useMutation({
    mutationFn: postCreatePet,
    onSuccess: async () => {
      console.log('mutate');
      // await queryClient.invalidateQueries({
      //   queryKey: ['palFrameImage'],
      // });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate: roomMutate, isSuccess: roomSuccess } = useMutation({
    mutationFn: postCreateRoom,
    onSuccess: async () => {
      console.log('mutate');
      // await queryClient.invalidateQueries({
      //   queryKey: ['palFrameImage'],
      // });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: petPersonalities, isSuccess } = useQuery({
    queryKey: ['petPersonalities'],
    queryFn: fetchpetPersonalities,
    staleTime: 60000,
  });

  if (!isSuccess) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  const memorySpaceCreateSubmit = (formValues) => {
    // resetField('name');
    // resetField('password');
    console.log(formValues);
    // {
    //   "roomId": 0,
    //   "name": "string",
    //   "description": "string",
    //   "thumbnailUrl": "string",
    //   "createdAt": "2024-07-27T05:43:02.915Z",
    //   "updatedAt": "2024-07-27T05:43:02.915Z",
    //   "backgroundMusic": 0,
    //   "type": 0,
    //   "likeCount": 0,
    //   "userId": 0
    // }
    const userInfo = queryClient.getQueryData(['userInfo']);
    const memorySpacePayload = {
      name: formValues.name,
      description: formValues.description,
      userId: userInfo.id,
    };

    // {
    //   "name": "string",
    //   "species": "string",
    //   "relation": "string",
    //   "personalities": [
    //     {
    //       "id": 0,
    //       "type": "string"
    //     }
    //   ],
    //   "firstAt": "2024-07-27",
    //   "lastAt": "2024-07-27"
    // }
    const characters = queryClient.getQueryData(['petPersonalities']);

    const filteredValue = formValues.character.map((character) => {
      const value = characters.find((item) => item.type === character);
      return value;
    });

    const petPayload = {
      name: formValues.pet_name,
      relation: formValues.relation,
      species: formValues.pet_gender,
      personalities: filteredValue,
      firstAt: formValues.first_at,
      lastAt: formValues.last_at,
    };
    console.log(memorySpacePayload);
    petMutate(petPayload);
    roomMutate(memorySpacePayload);

    if (petSuccess && roomSuccess) {
      console.log('다 성공');
    }
  };

  const validatePersonality = (value) => {
    if (value.length < 1 || value.length > 3) {
      return '성격을 1개 이상, 3개 이하로 선택해야 합니다.';
    }
    return true;
  };

  const validateDateRange = (dates) => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (
      new Date(dates) > new Date(currentDate) ||
      new Date(dates) > new Date(currentDate)
    ) {
      return '날짜는 현재 날짜를 넘어설 수 없습니다.';
    }
    return true;
  };

  const roomNameRegister = register('name', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    pattern: {
      value: /^[가-힣a-zA-Z0-9]{1,100}$/,
      message: '추억공간 이름이 올바르지 않습니다.',
    },
  });

  const roomDesRegister = register('description', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    pattern: {
      value: /^[가-힣a-zA-Z0-9]{1,500}$/,
      message: '추억공간 설명이 올바르지 않습니다.',
    },
  });

  const petNameRegister = register('pet_name', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
  });

  const petgenderRegister = register('pet_gender', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
  });

  const relationRegister = register('relation', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
  });

  const personalityRegister = register('character', {
    validate: validatePersonality, // 커스텀 유효성 검사 추가
  });

  const firstMeetDateRegister = register('first_at', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    validate: validateDateRange,
  });

  const separateDateRegister = register('last_at', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
    validate: validateDateRange,
  });

  return (
    <ContentsLayout>
      <div className="flex justify-center">
        <div className="w-[400px] rounded-md bg-white lg:w-[500px]">
          <div className="mb-4 flex flex-col px-6 py-4">
            <div className="py-5">
              <h3>추억공간 생성하기</h3>
            </div>
            {/* 폼 */}
            <FormProvider>
              <form
                className="flex flex-col gap-y-6"
                onSubmit={handleSubmit(memorySpaceCreateSubmit)}
              >
                {/* 이름 */}
                <div className="flex flex-col gap-y-1">
                  <span>추억공간 이름</span>
                  <div className="relative flex flex-col gap-x-4">
                    <input
                      className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                      type="text"
                      id="name"
                      {...roomNameRegister}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="name"
                      render={({ message }) => (
                        <span className="absolute -bottom-5 text-sm text-pal-error">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                </div>
                {/* 소개 */}
                <div className="flex flex-col gap-y-1">
                  <span>추억공간 소개</span>
                  <div className="relative flex gap-x-4">
                    <textarea
                      className="h-32 w-full resize-none rounded-md border-2 border-black bg-pal-lightwhite"
                      type="text"
                      {...roomDesRegister}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="description"
                      render={({ message }) => (
                        <span className="absolute -bottom-5 text-sm text-pal-error">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                </div>
                {/* 파일 업로드 */}
                <div className="flex flex-col gap-y-1">
                  <span>추억공간 대표이미지</span>
                  <div className="flex gap-x-4">
                    <GlobalBtn
                      className="bg-pal-purple text-white"
                      size={'sm'}
                      text={'파일선택'}
                    />
                  </div>
                </div>
                {/* 반려동물 정보 시작 */}
                <div className="flex flex-col gap-y-1">
                  <div className="pt-4">
                    <h3>반려동물 인적사항??</h3>
                  </div>
                </div>
                {/* 반려동물 이름 & 별칭 */}
                <div className="flex flex-col gap-y-1">
                  <div className="flex justify-between gap-x-2">
                    <div className="flex flex-col">
                      <span>이름</span>
                      <div className="relative flex gap-x-4">
                        <input
                          className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                          type="text"
                          {...petNameRegister}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="pet_name"
                          render={({ message }) => (
                            <span className="absolute -bottom-5 text-sm text-pal-error">
                              {message}
                            </span>
                          )}
                        />
                      </div>
                    </div>
                    {/* 반려동물 별칭 */}
                    <div className="flex flex-col">
                      <span>별칭</span>
                      <div className="relative flex gap-x-4">
                        <input
                          className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite px-1"
                          type="text"
                          {...relationRegister}
                        />
                        <ErrorMessage
                          errors={errors}
                          name="relation"
                          render={({ message }) => (
                            <span className="absolute -bottom-5 text-sm text-pal-error">
                              {message}
                            </span>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 반려동물 성별 */}
                <div className="flex flex-col gap-y-1">
                  <span>성별</span>
                  <div className="relative flex gap-x-4">
                    <div className="flex items-center gap-x-1">
                      <input
                        id="petMale"
                        name="petGender"
                        className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                        type="radio"
                        value="petMale"
                        {...petgenderRegister}
                      />
                      <label
                        htmlFor="petMale"
                        className="shrink-0"
                      >
                        수컷
                      </label>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <input
                        id="petFemale"
                        name="petGender"
                        className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                        type="radio"
                        value="petFemale"
                        {...petgenderRegister}
                      />
                      <label
                        htmlFor="petFemale"
                        className="shrink-0"
                      >
                        암컷
                      </label>
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="pet_gender"
                      render={({ message }) => (
                        <span className="absolute -bottom-5 text-sm text-pal-error">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                </div>
                {/* 반려동물 성격 */}
                <div className="flex flex-col gap-y-1">
                  <span>성격</span>
                  <div className="relative flex gap-x-4">
                    {/* 성격 첫 번째 줄 */}
                    <div className="grid w-full grid-cols-4 grid-rows-3">
                      {petPersonalities.map((personality) => (
                        <PersonalityCheckbox
                          key={personality.id}
                          personality={personality}
                          checkboxName="character"
                          register={personalityRegister}
                        />
                      ))}
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="character"
                      render={({ message }) => (
                        <span className="absolute -bottom-5 text-sm text-pal-error">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                </div>

                {/* 반려동물 처음만난날 */}
                <div className="flex flex-col gap-y-1">
                  <span>처음만난 날</span>
                  <div className="relative flex gap-x-4">
                    <input
                      className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                      type="date"
                      {...firstMeetDateRegister}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="first_at"
                      render={({ message }) => (
                        <span className="absolute -bottom-5 text-sm text-pal-error">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                </div>
                {/* 반려동물 헤어진 날 */}
                <div className="flex flex-col gap-y-1">
                  <span>헤어진 날</span>
                  <div className="relative flex gap-x-4">
                    <input
                      className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                      type="date"
                      {...separateDateRegister}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="last_at"
                      render={({ message }) => (
                        <span className="absolute -bottom-5 text-sm text-pal-error">
                          {message}
                        </span>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-center py-2">
                  <GlobalBtn
                    className="bg-pal-purple text-white"
                    size={'sm'}
                    text={'생성하기'}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </ContentsLayout>
  );
};

export default MemorySpaceCreatePage;
