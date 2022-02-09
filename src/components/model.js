import { useFrame, useThree } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {  useRef } from 'react';
import { useGLTF } from "@react-three/drei";

const Model = props => {
    // const model = useLoader(GLTFLoader, props.path);
    const model = useGLTF(props.path);

    const ref = useRef();
    const three = useThree();

    let mouseX = 0;
    let mouseY = 0; 
    let isDragging = false;

    // console.log(three);
    useFrame(() => {
        // ref.current.rotation.x += 0.01;
        // ref.current.rotation.y += 0.01;
        mouseX = three.mouse.x * 5;
        mouseY = three.mouse.y * 5;
        // console.log(mouseX);
    })
    
    
    const handlePointerDown = e => {
        isDragging = true;
    }

    const handlePointerUp = e => {
        isDragging = false;
    }

    const handlePointerMove = e => {
        if(isDragging){
            ref.current.rotation.y = mouseX;
            ref.current.rotation.x = -mouseY;
        }
    }

    // const handlePointerOut = e => {
    //     isDragging = false;
    //     console.log('alert');
    // }

    return (
        <primitive 
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            // onPointerOut={handlePointerOut}
            ref={ref}
            scale={props.scale} 
            // position={props.position} 
            object={model.scene} 
        />
    )
}


export default Model;