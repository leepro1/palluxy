import PropTypes from 'prop-types';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { fetchFrameAngle } from '@/api/memorySpace/frameImageApi';
import { fetchAllFrameImage } from '@api/memorySpace/frameImageApi';

const ImgRotationBtn = ({ index }) => {
  const queryClient = useQueryClient();

  const { data: frameData, isSuccess } = useQuery({
    queryKey: ['palFrameImage'],
    queryFn: fetchAllFrameImage,
    staleTime: 60000,
  });

  const { mutate } = useMutation({
    mutationFn: fetchFrameAngle,
    onSuccess: () => {
      // Invalidate and refetch
      console.log('mutate');
      queryClient.invalidateQueries({
        queryKey: ['palFrameImage'],
      });
    },
  });
  // Mutations
  const handleRotation = () => {
    if (isSuccess) {
      const selectFrame = frameData.find((frame) => frame.index === index);
      if (selectFrame) {
        const newAngle = (selectFrame.angle + 1.5) % 6;
        console.log(newAngle);
        mutate({ angle: newAngle, imageId: selectFrame.imageId });
      }
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
};

ImgRotationBtn.propTypes = {
  index: PropTypes.number.isRequired,
};

export default ImgRotationBtn;
