import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { postLetter, fetchPetId } from '@api/memorySpace/letterApi';

export const LetterIcon = ({ data, sequence, clickedMail }) => {
  return (
    <div
      className={`flex flex-col gap-y-2 rounded-md px-3 py-2 text-sm text-white ${clickedMail === sequence && 'bg-[#E3E3E3]'}`}
    >
      <div
        className={`relative flex ${data.writer === 'USER' ? 'justify-start' : 'justify-end'} `}
      >
        <span className="absolute -left-2 -top-2 w-4 items-center justify-center rounded-full bg-pal-purple text-center text-xs text-white">
          {sequence}
        </span>
        <span
          className={`material-symbols-outlined cursor-pointer ${data.writer === 'USER' ? 'text-[#91C166]' : 'text-pal-purple'}`}
        >
          mail
        </span>
      </div>
    </div>
  );
};

export const LetterContent = ({ data }) => {
  return (
    <div className="letterBoxOverflow flex h-[363px] w-[363px] grow flex-col items-start justify-start overflow-y-scroll px-4">
      <p className="font-semibold">제목 : {data[0].title}</p>
      <p className="whitespace-pre-line pt-3 font-medium">{data[0].content}</p>
    </div>
  );
};

export const LetterCreate = ({ handler }) => {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { register, handleSubmit, resetField } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: postLetter,
    onSuccess: () => {
      queryClient.invalidateQueries(['letter', userId]);
    },
  });

  const LetterSubmit = async (formValues) => {
    const roomData = queryClient.getQueryData(['memorySpace', userId]);
    const petId = await fetchPetId();
    const payload = {
      petId: petId,
      roomId: roomData.roomId,
      data: {
        title: formValues.letterTitle,
        content: formValues.letterContent,
      },
    };
    resetField('letterTitle');
    resetField('letterContent');
    handler(false);
    mutateAsync(payload);
  };

  const letterTitleRegister = register('letterTitle', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
  });

  const letterContentRegister = register('letterContent', {
    required: {
      value: true,
      message: '해당 칸이 빈칸입니다.',
    },
  });

  return (
    <form
      className="flex grow flex-col px-3"
      onSubmit={handleSubmit(LetterSubmit)}
    >
      <div className="flex flex-col">
        <label
          htmlFor="letterTitle"
          className="font-bold"
        >
          제목
        </label>
        <input
          id="letterTitle"
          className="h-10 w-full px-2 py-2 text-sm"
          name=""
          placeholder="편지의 제목을 적어주세요."
          {...letterTitleRegister}
        />
      </div>
      <div className="flex grow flex-col">
        <label
          htmlFor="letterContent"
          className="font-semibold"
        >
          내용
        </label>
        <textarea
          id="letterContent"
          className="h-full w-full resize-none overflow-y-auto border-2 border-black px-2 py-2 text-sm"
          name=""
          placeholder="사랑하는 반려동물에게 편지를 보내보세요"
          {...letterContentRegister}
        />
      </div>
      <button className="mt-3 rounded-md bg-pal-purple py-1 text-white">
        편지 보내기
      </button>
    </form>
  );
};

LetterIcon.propTypes = {
  data: PropTypes.object.isRequired,
  sequence: PropTypes.number.isRequired,
  clickedMail: PropTypes.number.isRequired,
};

LetterContent.propTypes = {
  data: PropTypes.array.isRequired,
};

LetterCreate.propTypes = {
  handler: PropTypes.func.isRequired,
};
