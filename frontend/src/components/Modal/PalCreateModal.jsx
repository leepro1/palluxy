import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import GlobalBtn from '@components/GlobalBtn';
import { useState } from 'react';

import { postPalImage, postCreatePalmeta } from '@api/memorySpace/createApi';

const PalCreateModal = ({ roomId, handler }) => {
  const [uploadImage, setUploadImage] = useState(null);
  const [previewPath, setPreviewPath] = useState(null);
  const queryClient = useQueryClient();

  const { mutateAsync: palImageMutate, isPending: isPalImagePending } =
    useMutation({
      mutationFn: postPalImage,
      onSuccess: async (res) => {
        // handler(false);
        console.log('이게 되나?');
        console.log(res);
        // window.location.href = '/memorySpace';
      },
    });
  const { mutateAsync: palMetaMutate } = useMutation({
    mutationFn: postCreatePalmeta,
    onSuccess: () => {
      console.log('mutate');
      queryClient.invalidateQueries({
        queryKey: ['palMeta'],
      });
      handler(false);
    },
  });

  const handleUploadImage = (event) => {
    console.log(event.target.files[0]);
    if (event.target.files) {
      setUploadImage(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setPreviewPath(reader.result);
      };
    }
  };

  const submitUploadImage = async () => {
    if (!uploadImage) {
      return;
    }
    const formData = new FormData();

    formData.append('file', uploadImage);
    const payload = {
      roomId: roomId,
      data: formData,
    };
    try {
      const res = await palImageMutate(payload);
      const palMetaPayload = {
        roomId: res.data.result.roomId,
        objFilePath: res.data.result.file,
      };
      await palMetaMutate(palMetaPayload);
    } catch (e) {
      alert('렌더링 과정 중 오류가 발생했습니다.');
    }

    // if (selectData) {
    //   updateMutate({
    //     data: formData,
    //     imageId: selectData.imageId,
    //     albumId: frameData.albumId,
    //   });
    // } else {
    //   formData.append('index', selectFrame);
    //   fetchMutate({ data: formData, albumId: frameData.albumId });
    // }
  };

  return (
    <div className="">
      <div
        className="fixed left-0 top-0 z-40 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => handler(false)}
      ></div>
      <div className="fixed left-1/2 top-1/2 z-40 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="flex h-full w-full flex-col">
          <div className="flex p-8">
            <p className="grow font-jamsilBold">반려동물 불러오기</p>
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={() => {
                handler(false);
              }}
            >
              close
            </span>
          </div>
          <div className="px-8 pb-2">
            <p className="text-pal-purple">
              주변사물이 최대한 없고, 모든 부위가 나와야 렌더링이 잘 됩니다.
            </p>
          </div>
          {/* none */}
          {isPalImagePending ? (
            <div>
              <p>3D 렌더링이 진행 중 입니다.</p>
              <p>20 ~ 30초의 시간이 걸리니 창을 닫지 말아주세요.</p>
            </div>
          ) : (
            <div>
              <div className="grow px-8">
                {previewPath && (
                  <img
                    src={previewPath}
                    alt="preview image"
                  />
                )}
              </div>
              <div className="flex justify-end gap-x-8 px-8 py-4">
                <label
                  className="flex h-[40px] w-[130px] items-center justify-center rounded-md bg-pal-purple text-white"
                  htmlFor="fileInput"
                >
                  <span>파일선택</span>
                  <input
                    className="hidden"
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                </label>
                <GlobalBtn
                  className="bg-pal-purple text-white"
                  onClick={submitUploadImage}
                  size={'md'}
                  text={'업로드 하기'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PalCreateModal.propTypes = {
  handler: PropTypes.func.isRequired,
  roomId: PropTypes.number.isRequired,
};

export default PalCreateModal;
