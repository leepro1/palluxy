import { Canvas } from '@react-three/fiber';
import {
  CameraControls,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';

import PalModel from '@components/Model/PalModel';
import RooomModel from '@components/Model/RoomModel';

const RoomCanvas = () => {
  return (
    <div style={{ height: 500, width: 700 }}>
      <Canvas flat>
        <CameraControls
          minPolarAngle={1}
          maxPolarAngle={Math.PI / 3.6}
          maxAzimuthAngle={0}
          minAzimuthAngle={-2}
          mouseButtons={{ wheel: 8, left: 1, right: 0 }}
        />
        <OrbitControls
          minDistance={10}
          maxDistance={120}
        />
        <ambientLight intensity={Math.PI / 2} />
        <group>
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
        <PerspectiveCamera
          makeDefault
          position={[-100, 100, 100]}
        />
      </Canvas>{' '}
    </div>
  );
};

export default RoomCanvas;
