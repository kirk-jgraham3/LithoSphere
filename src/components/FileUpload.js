import * as Three from 'three';
import React, { useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import JSZip from 'jszip';
import { Button, Tag } from '@chakra-ui/react';
import { FiUpload } from "react-icons/fi";

const FileUpload = ({onFileUpload, onUploadProgress, onUploadSuccess}) => {
    const [file, setFile] = useState(null);
    const fileInput = useRef(null);
    const zip = new JSZip();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async (e) => {
        if (!file) {
            console.log("No file selected");
            return;
        }

        const files = {};

        onUploadProgress({started: false, pc: 0});
        onUploadSuccess({success: false, msg: ""});
        const content = await zip.loadAsync(file);

        // Extract all files from the zip and create object URLs
        await Promise.all(Object.keys(content.files).map(async (filename) => {
            const fileData = await content.files[filename].async("blob");
            files[filename] = URL.createObjectURL(fileData);
        }));

        const gltf = Object.keys(files).find(
            (filename) => filename.endsWith(".gltf") || filename.endsWith(".glb")
        );
        if (!gltf) {
            console.log("No GLTF or GLB file found");
            return;
        }
        
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();

        dracoLoader.setDecoderPath("/draco/");
        loader.setDRACOLoader(dracoLoader);
        
        loader.manager.setURLModifier((url) => {
            const temp = new URL(url).pathname;
            const pathname = new URL(temp).pathname.substring(1);
            console.log(pathname);
            const resolvedUrl = files[pathname] || url;
            return resolvedUrl;
        });

        loader.load(
            files[gltf],
            (gltf) => {
                onFileUpload(gltf);
                onUploadSuccess({success: true, msg: "Upload successful"});
                onUploadProgress({started: true, pc: 100});
            },
            (xhr) => {
                onUploadSuccess({success: false, msg: "Uploading..."});
                onUploadProgress({started: true, pc: (xhr.loaded / xhr.total) * 100});
            },
            (error) => {
                console.log(error);
                onUploadSuccess({success: false, msg: "Upload failed"});
            }
        );
    }

    return (
        <div style={{width: "auto", alignSelf: "center", alignItems: "stretch"}}>
            <input
                type="file"
                multiple
                size="md"
                onChange={handleFileChange}
                accept=".zip"
                ref={fileInput}
                style={{display: "none"}}
            />
            <Button onClick={() => fileInput.current.click()}>{file ? file.name : "Select File"}</Button>

            <Button onClick={handleUpload} disabled={!file}>
                <FiUpload />
            </Button>
        </div>
    );
}

export default FileUpload;