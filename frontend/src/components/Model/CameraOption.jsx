import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CameraOption = ({ target, position }) => {
  const cameraRef = useRef();
  const { camera } = useThree();

  function cameraAnimate() {
    if (cameraRef.current) {
      gsap.to(camera.position, {
        duration: 1,
        x: position.x,
        y: position.y,
        z: position.z,
        ease: 'power3.inOut',
      });
      gsap.to(cameraRef.current.target, {
        duration: 1,
        repeat: 0,
        x: target.x,
        y: target.y,
        z: target.z,
        ease: 'power3.inOut',
      });
    }
  }

  useEffect(() => {
    cameraAnimate();
  }, [target]);

  return (
    <OrbitControls
      ref={cameraRef}
      minDistance={10}
      maxDistance={80}
    />
  );
};

export default CameraOption;
