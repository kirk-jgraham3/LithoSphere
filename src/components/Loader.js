import React from 'react';
import { Html } from "@react-three/drei"

const Loader = ({pc, msg}) => {
    return (
        <div className="loader">
            <progress max={100} value={pc} />
            <span>{msg}</span>
        </div>
    )
}

export default Loader;