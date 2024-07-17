import React, { useEffect, useRef } from 'react';

const VideoBox = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager) {
      streamManager.addVideoElement(videoRef.current);
    }
  });
  // }, [streamManager]);

  return (
    <video
      autoPlay={true}
      ref={videoRef}
      className="h-full w-full"
    />
  );
};

export default VideoBox;
