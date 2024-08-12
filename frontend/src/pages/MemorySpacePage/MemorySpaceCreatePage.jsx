import PropTypes from 'prop-types';
import ContentsLayout from '@layout/ContentsLayout';
import GlobalBtn from '@components/GlobalBtn';
import { useQuery } from '@tanstack/react-query';
import { fetchpetPersonalities } from '@/api/petapi';
import { useForm, FormProvider } from 'react-hook-form';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { ErrorMessage } from '@hookform/error-message';
import { postCreateRoom, postCreatePet } from '@/api/memorySpace/createApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    // resetField,
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

  const navigate = useNavigate();
  const [previewPath, setPreviewPath] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const queryClient = useQueryClient();
  const { mutateAsync: petMutate } = useMutation({
    mutationFn: postCreatePet,
  });
  const { mutateAsync: roomMutate } = useMutation({
    mutationFn: postCreateRoom,
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

  const handleUploadImage = (event) => {
    if (event.target.files) {
      setUploadImage(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setPreviewPath(reader.result);
      };
    }
  };

  const memorySpaceCreateSubmit = async (formValues) => {
    // resetField('name');
    // resetField('password');
    if (!uploadImage) {
      return alert('추억공간 대표 이미지는 필수입니다.');
    }
    const userInfo = queryClient.getQueryData(['userInfo']);
    const characters = queryClient.getQueryData(['petPersonalities']);
    const filteredValue = formValues.character.map((character) => {
      const value = characters.find((item) => item.type === character);
      return value;
    });

    const memorySpacePayload = new FormData();
    memorySpacePayload.append('file', uploadImage);
    memorySpacePayload.append('name', formValues.name);
    memorySpacePayload.append('description', formValues.description);
    memorySpacePayload.append('userId', userInfo.id);

    const petPayload = {
      userId: userInfo.id,
      name: formValues.pet_name,
      relation: formValues.relation,
      species: formValues.petSpecies,
      personalities: filteredValue,
      firstAt: formValues.first_at,
      lastAt: formValues.last_at,
    };

    try {
      await petMutate(petPayload);
      await roomMutate(memorySpacePayload);
      navigate(`/memoryspace/${userInfo.id}`);
    } catch (e) {
      console.error(e);
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

  const petgenderRegister = register('petSpecies', {
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
              <h3 className="font-bold">추억공간 생성하기</h3>
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
                  <div className="overflow-hidden">
                    {previewPath && (
                      <img
                        src={previewPath}
                        alt="preview image"
                      />
                    )}
                  </div>
                  <div className="flex gap-x-4">
                    <label
                      className="flex h-[40px] w-[130px] items-center justify-center rounded-md bg-pal-purple text-white"
                      htmlFor="fileInput"
                    >
                      파일선택
                    </label>
                    <input
                      className="hidden"
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </div>
                </div>
                {/* 반려동물 정보 시작 */}
                <div className="flex flex-col gap-y-1">
                  <div className="pt-4">
                    <h3 className="font-bold">반려동물 정보</h3>
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
                  <span>동물종</span>
                  <div className="relative flex gap-x-4">
                    <div className="flex items-center gap-x-1">
                      <input
                        id="강아지"
                        name="petSpecies"
                        className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                        type="radio"
                        value="강아지"
                        {...petgenderRegister}
                      />
                      <label
                        htmlFor="강아지"
                        className="shrink-0"
                      >
                        강아지
                      </label>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <input
                        id="고양이"
                        name="petSpecies"
                        className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                        type="radio"
                        value="고양이"
                        {...petgenderRegister}
                      />
                      <label
                        htmlFor="고양이"
                        className="shrink-0"
                      >
                        고양이
                      </label>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <input
                        id="햄스터"
                        name="petSpecies"
                        className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                        type="radio"
                        value="햄스터"
                        {...petgenderRegister}
                      />
                      <label
                        htmlFor="햄스터"
                        className="shrink-0"
                      >
                        햄스터
                      </label>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <input
                        id="기타"
                        name="petSpecies"
                        className="h-[40px] w-full rounded-md border-2 border-black bg-pal-lightwhite"
                        type="radio"
                        value="기타"
                        {...petgenderRegister}
                      />
                      <label
                        htmlFor="기타"
                        className="shrink-0"
                      >
                        기타
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

PersonalityCheckbox.propTypes = {
  personality: PropTypes.object.isRequired,
  checkboxName: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
};

export default MemorySpaceCreatePage;
