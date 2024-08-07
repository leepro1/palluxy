import PropTypes from 'prop-types';

import GlobalBtn from '@components/GlobalBtn';

const MailBoxModal = ({ handler }) => {
  return (
    <div className="">
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => handler(false)}
      ></div>
      <div className="fixed left-1/2 top-1/2 z-40 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="flex h-full w-full flex-col">
          <div className="flex p-8">
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
          {/* btn */}
          <div className="flex justify-end gap-x-8 px-8 py-4">
            <GlobalBtn
              className="bg-pal-purple text-white"
              // onClick={submitUploadImage}
              size={'md'}
              text={'업로드 하기'}
            />
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
