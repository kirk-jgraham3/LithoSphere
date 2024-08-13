import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import Loader from './Loader';
import SettingsDrawer from './SettingsDrawer';
import {WebGLRenderTarget, LinearFilter, RGBAFormat, UnsignedByteType, Texture} from 'three';

const CameraController = ({ fov }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [fov, camera]);

  return null;
};

const TargetRendering = ({ onTextureReady }) => {
  const renderTargetRef = useRef(new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
    format: RGBAFormat,
    type: UnsignedByteType,
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    depthBuffer: true
  }));  
  const lastFrameTimeRef = useRef(Date.now());
  const [frameInterval, setFrameInterval] = useState(1000 / 30);

  window.addEventListener('resize', () => {
    renderTargetRef.current.setSize(window.innerWidth, window.innerHeight);
  });

  useFrame(({ gl, scene, camera }) => {
    const now = Date.now();
    const delta = now - lastFrameTimeRef.current;

      if (delta > frameInterval) {
          lastFrameTimeRef.current = now;

          if (renderTargetRef.current) {
              gl.setRenderTarget(renderTargetRef.current);
              gl.render(scene, camera);
              gl.setRenderTarget(null);

              renderTargetRef.current.texture.needsUpdate = true;
              const newTexture = renderTargetRef.current.texture.clone();
              onTextureReady(newTexture);
          }
      }
  });

  return null;
};

const SceneCanvas = ({ gltf, onTextureReady }) => {
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
          <Model gltf={gltf}/>
          <TargetRendering onTextureReady={onTextureReady}/>
        </Suspense>
        : null
      }

      <OrbitControls />
    </Canvas>
    </>
  );
}

export default SceneCanvas;
