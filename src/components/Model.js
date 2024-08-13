import React, {useState, useRef} from 'react';

const Model = ({gltf}) => {
    return <primitive object={gltf.scene} />;
}

export default Model;