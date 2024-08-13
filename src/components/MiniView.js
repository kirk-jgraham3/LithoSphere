import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const MiniViewMesh = ({ texture }) => {
  const meshRef = useRef();
  const lastFrameTimeRef = useRef(Date.now());
  const [frameInterval, setFrameInterval] = useState(1000 / 5);

  useEffect(() => {
    if (texture && meshRef.current) {
      meshRef.current.material.map = texture;
      meshRef.current.material.needsUpdate = true;
      meshRef.current.material.envMapIntensity = 3.5;

      console.log('texture updated', texture);
      console.log('texture image', texture.image);
    }
  }, [texture]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial />
    </mesh>
  );
};

const MiniView = ({texture}) => {
  
	return (
		<div className='mini-view'>
			<Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
				<ambientLight intensity={10.0} />
				<MiniViewMesh texture={texture} />
				<OrbitControls />
			</Canvas>
		</div>
	);
};

export default MiniView;