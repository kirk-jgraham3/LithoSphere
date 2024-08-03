import React, { Suspense, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import Loader from './Loader';
import SettingsDrawer from './SettingsDrawer';

const CameraController = ({ fov }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [fov, camera]);

  return null;
};

const SceneCanvas = ({ gltf }) => {
  const [fov, setFov] = React.useState(75);
  const [intensity, setIntensity] = React.useState(0.8);
  const [bgColor, setBgColor] = React.useState('#f0f0f0');
  
  const handleFovChange = (value) => {
    setFov(Number(value));
  }

  const handleIntensityChange = (value) => {
    setIntensity(Number(value));
  }

  const handleColorChange = (color) => {
    setBgColor(color.hex);
  }

  return (
    <>
    <SettingsDrawer
      fov={fov} onFovChange={handleFovChange}
      intensity={intensity} onIntensityChange={handleIntensityChange}
      bgColor={bgColor} onColorChange={handleColorChange}
    />
    <Canvas camera={{ fov: fov, position: [0, 0, 5] }}>
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={intensity} />

      <CameraController fov={fov} />

      {gltf ?
        <Suspense fallback={<Loader />}>
          <Model gltf={gltf} />
        </Suspense>
        : null
      }

      <OrbitControls />
    </Canvas>
    </>
  );
}

export default SceneCanvas;
