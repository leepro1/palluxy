import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { Environment } from '@react-three/drei';

import { Vector3 } from 'three';

import PalModel from '@components/Model/PalModel';
import RooomModel from '@components/Model/RoomModel';
import CameraOption from '@components/Model/CameraOption';

const RoomCanvas = () => {
  const [position, setPosition] = useState(new Vector3(-100, 100, 100));
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });

  const handleModelClick = (event) => {
    if (event.object.name.includes('frame')) {
      if (event.object.name === 'frame001') {
        setTarget(event.object.position);
        setPosition({ x: 20, y: 24, z: 28 });
      }
      if (event.object.name === 'frame002') {
        setTarget(event.object.position);
        setPosition({ x: 20, y: 24, z: 4 });
      }
      if (event.object.name === 'frame003') {
        setTarget(event.object.position);
        setPosition({ x: 20, y: 24, z: -20 });
      }
      if (event.object.name === 'frame004') {
        setTarget(event.object.position);
        setPosition({ x: 20, y: 24, z: -20 });
      }
      if (event.object.name === 'frame005') {
        setTarget(event.object.position);
        setPosition({ x: -5, y: 24, z: -20 });
      }
      if (event.object.name === 'frame006') {
        setTarget(event.object.position);
        setPosition({ x: -30, y: 24, z: -20 });
      }
    }
  };

  // frame 1 x: 20, y: 24, z: 28
  // frame 2 x: 20, y: 24, z: 4
  // frame 3 x: 20, y: 24, z: -20
  // frame 4 x: 20, y: 24, z: -20
  // frame 5 x: -5, y: 24, z: -20
  // frame 6 x: -30, y: 24, z: -20

  return (
    <div className="h-[617px] w-[1000px]">
      <Canvas flat>
        <CameraOption
          position={position}
          target={target}
        />
        <ambientLight intensity={Math.PI / 2} />
        <group onClick={(e) => handleModelClick(e)}>
          <RooomModel />
          <mesh>
            <PalModel />
          </mesh>
        </group>
        <Environment
          preset="city"
          background="only"
          backgroundBlurriness="1"
          blur={1}
        />
      </Canvas>
    </div>
  );
};

export default RoomCanvas;
