import PropTypes from 'prop-types';
import Button from '@components/Button';
import { useState } from 'react';
import { instance } from '@/utils/axios';

const FileUploadModal = ({ handler, selectFrame }) => {
  const [uploadImage, setUploadImage] = useState(null);
  const [previewPath, setPreviewPath] = useState(null);

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

  const submitUploadImage = () => {
    if (!uploadImage) {
      console.log('이미지 없음');

      return;
    }
    const formData = new FormData();
    formData.append('file', uploadImage);
    formData.append('filleNmae', uploadImage.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    instance.post('/asdf', formData, config);
    handler(false);
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((error) => {
    //   console.log('err');
    // });
  };

  return (
    <div>
      <div
        className="fixed left-0 top-0 h-screen w-screen overflow-hidden bg-black opacity-50"
        onClick={() => handler(false)}
      ></div>
      <div className="absolute left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 bg-white">
        <div className="flex h-full w-full flex-col">
          <div className="flex p-8">
            <p className="grow font-jamsilBold">{selectFrame}이미지 업로드</p>
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={() => {
                handler(false);
              }}
            >
              close
            </span>
          </div>
          {/* none */}
          <div className="grow px-8">
            {previewPath && (
              <img
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
                onChange={handleUploadImage}
              />
            </label>
            <Button
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
  selectFrame: PropTypes.string,
};

export default FileUploadModal;
