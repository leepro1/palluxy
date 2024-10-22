import PropTypes from 'prop-types';
import GlobalBtn from '@components/GlobalBtn';
import { useState } from 'react';
import { FRAME_NAME_KOR } from '@/constants/frameIndex';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
  fetchFrameImage,
  updateFrameImage,
} from '@/api/memorySpace/frameImageApi';
import { useParams } from 'react-router-dom';

const FileUploadModal = ({ handler, selectFrame }) => {
  const { userId } = useParams();
  const [uploadImage, setUploadImage] = useState(null);
  const [previewPath, setPreviewPath] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: fetchMutate } = useMutation({
    mutationFn: fetchFrameImage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['palFrameImage', userId],
      });
      handler(false);
    },
  });
  const { mutate: updateMutate } = useMutation({
    mutationFn: updateFrameImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['palFrameImage', userId],
      });
      handler(false);
    },
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

  const submitUploadImage = () => {
    if (!uploadImage) {
      return;
    }
    const formData = new FormData();
    const frameData = queryClient.getQueryData(['palFrameImage', userId]);
    const selectData = frameData.images.find(
      (frame) => frame.index === selectFrame,
    );

    formData.append('file', uploadImage);
    if (selectData) {
      updateMutate({
        data: formData,
        imageId: selectData.imageId,
        albumId: frameData.albumId,
      });
    } else {
      formData.append('index', selectFrame);
      fetchMutate({ data: formData, albumId: frameData.albumId });
    }
  };

  return (
    <div className="z-50">
      <div
        className="fixed left-0 top-0 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => handler(false)}
      ></div>
      <div className="fixed left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="flex h-full w-full flex-col">
          <div className="flex p-8">
            <p className="grow font-jamsilBold">
              {FRAME_NAME_KOR[selectFrame]} 이미지 업로드
            </p>
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={() => {
                handler(false);
              }}
            >
              close
            </span>
          </div>
          <div>
            <p className="px-8 text-pal-error">
              사진 업로드 후 새로고침을 해주세요!
            </p>
          </div>
          {/* none */}
          <div className="flex h-[400px] grow justify-center px-8">
            {previewPath && (
              <img
                className="h-full"
                src={previewPath}
                alt="preview image"
              />
            )}
          </div>
          {/* btn */}
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
      </div>
    </div>
  );
};

FileUploadModal.propTypes = {
  handler: PropTypes.func.isRequired,
  selectFrame: PropTypes.number.isRequired,
};

export default FileUploadModal;
