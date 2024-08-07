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
            <p className="grow font-jamsilBold">오랜만이군</p>
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
            <label
              className="flex h-[40px] w-[130px] items-center justify-center rounded-md bg-pal-purple text-white"
              htmlFor="fileInput"
            >
              {/* <span>파일선택</span>
              <input
                className="hidden"
                id="fileInput"
                type="file"
                onChange={handleUploadImage}
              /> */}
            </label>
            {/* <GlobalBtn
              className="bg-pal-purple text-white"
              onClick={submitUploadImage}
              size={'md'}
              text={'업로드 하기'}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailBoxModal;
