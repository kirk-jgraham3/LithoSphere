import React from 'react';
import { useGLTF } from '@react-three/drei';

const Model = ({gltf}) => {
    return <primitive object={gltf.scene} />;
}

export default Model;