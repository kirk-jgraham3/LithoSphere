import React, {useState, useEffect, useRef} from 'react';
import { ChakraProvider, Heading } from '@chakra-ui/react'
import './App.css';
import FileUpload from './components/FileUpload';
import SceneCanvas from './components/SceneCanvas';
import Loader from './components/Loader';
import MiniView from './components/MiniView';
import { render } from '@react-three/fiber';
import * as THREE from 'three';

function App() {
  const [gltf, setGLTF] = useState(null);
  const [progress, setProgress] = useState({started: false, pc: 0});
  const [uploadmsg, setUploadMsg] = useState({success: false, msg: ""});
  const [texture, setTexture] = useState(null);

  const handleFileUpload = (gltf) => {
    setGLTF(gltf);
  };

  const handleUploadProgress = ({started, pc}) => {
    setProgress({started: started, pc: pc});
    console.log(pc);
  };

  const handleUploadSuccess = ({success, msg}) => {
    setUploadMsg({success: success, msg: msg});
    console.log(msg);
  }

  const handleTextureReady = (t) => {
    setTexture(t);
  };

  return (
    <ChakraProvider>
      <div className="app">
      <div className="top-bar">
        <Heading as="h1">Scene to Lithophane Converter</Heading>

        <FileUpload 
          onFileUpload={handleFileUpload}
          onUploadProgress={handleUploadProgress}
          onUploadSuccess={handleUploadSuccess}
        />
      </div>
      <div className="canvas-container">
        { uploadmsg.success ? 
          <>
            <SceneCanvas gltf={gltf} onTextureReady={handleTextureReady}/>
            {texture && <MiniView texture={texture}/>}
          </>
          : 
          <div>
            { progress.started && 
              <Loader pc={progress.pc} />
            }
          </div>
        }
      </div>
    </div>
    </ChakraProvider>
  );
}

export default App;
