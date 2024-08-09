import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchFrameAngle } from '@/api/memorySpace/frameImageApi';
import React from 'react';
import { useParams } from 'react-router-dom';

const ImgRotationBtn = React.memo(({ index }) => {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { mutate } = useMutation({
    mutationFn: fetchFrameAngle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['palFrameImage', userId],
      });
    },
  });

  const handleRotation = () => {
    const frameData = queryClient.getQueryData(['palFrameImage', userId]);
    const selectData = frameData.images.find((frame) => frame.index === index);
    if (selectData) {
      const newAngle = selectData.angle + 1.5708;
      mutate({ angle: newAngle, imageId: selectData.imageId });
    }
  };

  return (
    <span
      className="material-symbols-outlined cursor-pointer"
      onClick={() => handleRotation()}
    >
      rotate_90_degrees_ccw
    </span>
  );
});

ImgRotationBtn.propTypes = {
  index: PropTypes.number.isRequired,
};

ImgRotationBtn.displayName = 'ImgRotationBtn';
export default ImgRotationBtn;
