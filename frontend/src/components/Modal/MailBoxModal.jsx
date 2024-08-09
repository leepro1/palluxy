import PropTypes from 'prop-types';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLetter } from '@api/memorySpace/letterApi';

import { LetterIcon, LetterContent, LetterCreate } from '@components/Letter';
import { useState } from 'react';

const MailBoxModal = ({ handler }) => {
  const queryClient = useQueryClient();

  const [selectMail, setSelectMail] = useState(null);
  const [isPostMail, setPostMail] = useState(false);
  const roomData = queryClient.getQueryData(['memorySpace']);

  const { data: letterData, isSuccess } = useQuery({
    queryKey: ['letter'],
    queryFn: () => fetchLetter(roomData.roomId),
  });

  const handleOpenMail = (id) => {
    setSelectMail(id);
    setPostMail(false);
  };

  const handlePostMail = () => {
    const lastLetter = letterData[letterData.length - 1];
    if (lastLetter.writer === 'USER') {
      return alert('이전에 보낸 편지에 대한 답장이 아직 안왔어요');
    }
    setPostMail(true);
  };

  return (
    <div className="">
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => handler(false)}
      ></div>
      <div className="fixed left-1/2 top-1/2 z-40 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="flex h-full w-full flex-col">
          <div className="flex px-8 pb-5 pt-8">
            <p className="grow font-jamsilBold">우편함</p>
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={() => {
                handler(false);
              }}
            >
              close
            </span>
          </div>
          <div className="flex justify-end px-8 pb-5">
            <button
              className="rounded-md bg-pal-purple px-3 py-1 text-white"
              onClick={() => {
                handlePostMail();
              }}
            >
              편지 작성하기
            </button>
          </div>
          <div className="flex px-6 pb-10">
            <div className="letterBoxOverflow flex h-[400px] flex-col gap-y-2 overflow-y-scroll rounded-md border-2 border-black px-2 py-4">
              {isSuccess &&
                letterData.map((data) => (
                  <div
                    key={data.id}
                    onClick={() => {
                      handleOpenMail(data.id);
                    }}
                  >
                    <LetterIcon data={data} />
                  </div>
                ))}
            </div>
            <div className="flex grow flex-col justify-center">
              {selectMail && !isPostMail && (
                <LetterContent
                  data={letterData.filter((item) => item.id === selectMail)}
                />
              )}
              {!isPostMail && !selectMail && (
                <div className="flex w-full justify-center">
                  <p className="font-semibold">
                    편지함을 눌러 편지를 확인해보세요
                  </p>
                </div>
              )}

              {isPostMail && <LetterCreate handler={setPostMail} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MailBoxModal.propTypes = {
  handler: PropTypes.func.isRequired,
  roomId: PropTypes.number.isRequired,
};

export default MailBoxModal;
