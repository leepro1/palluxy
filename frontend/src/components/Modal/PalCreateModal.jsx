import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import GlobalBtn from '@components/GlobalBtn';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { postPalImage, postCreatePalmeta } from '@api/memorySpace/createApi';
import { postFirstLetter, fetchPetId } from '@api/memorySpace/letterApi';
import { updatePalObj } from '@api/petapi';

const PalCreateModal = ({ roomId, handler }) => {
  const [uploadImage, setUploadImage] = useState(null);
  const [previewPath, setPreviewPath] = useState(null);
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const { mutateAsync: palImageMutate, isPending: isPalImagePending } =
    useMutation({
      mutationFn: postPalImage,
    });

  const { mutateAsync: updatePalMetaMutate } = useMutation({
    mutationFn: updatePalObj,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['palMeta', userId],
      });
      handler(false);
    },
  });

  const { mutateAsync: palMetaMutate } = useMutation({
    mutationFn: postCreatePalmeta,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['palMeta', userId],
      });
      handler(false);
    },
  });

  const { mutateAsync: palLetterMutate } = useMutation({
    mutationFn: postFirstLetter,
  });

  const handleUploadImage = (event) => {
    if (!event.target.files[0].type.includes('image')) {
      return alert('이미지파일이 아닙니다!');
    }
    const extension = event.target.files[0].type.split('/');
    if (extension[1] === 'png' || extension[1] === 'jpeg') {
      if (event.target.files) {
        setUploadImage(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          setPreviewPath(reader.result);
        };
      }
    } else {
      return alert('png, jpg 확장자만 지원합니다.');
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
    const palData = queryClient.getQueryData(['palMeta', userId]);
    if (palData.length >= 1) {
      try {
        // 3d 파일 받기
        const res = await palImageMutate(payload);
        const palMetaPayload = {
          roomId: res.roomId,
          petMetaId: palData[0].petMetaId,
          data: { objFilePath: res.file },
        };
        // palmeta 생성
        await updatePalMetaMutate(palMetaPayload);
      } catch (e) {
        alert('렌더링 과정 중 오류가 발생했습니다.');
      }
    } else {
      try {
        // 3d 파일 받기
        const res = await palImageMutate(payload);
        const palMetaPayload = {
          roomId: res.roomId,
          objFilePath: res.file,
        };
        // palmeta 생성
        await palMetaMutate(palMetaPayload);
        const petId = await fetchPetId();
        const letterPayload = {
          roomId: res.roomId,
          petId: petId,
        };
        // 첫편지 보내기
        await palLetterMutate(letterPayload);
      } catch (e) {
        alert('렌더링 과정 중 오류가 발생했습니다.');
      }
    }
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
            <div className="flex flex-col items-center px-8 pb-2 text-pal-purple">
              <p>3D 렌더링이 진행 중 입니다.</p>
              <p>20 ~ 30초의 시간이 걸리니 창을 닫지 말아주세요.</p>
            </div>
          ) : (
            <div>
              <div className="flex h-[400px] grow justify-center px-8">
                {previewPath && (
                  <img
                    className="h-full"
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
