import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';
// public\desktop_pc\scene.gltf
// when creating 3d elemebts, let's start with a mesh, and add a light

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={3} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.62}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={3} decay={2} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.7}
        position={ isMobile ? [0, -3, -2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  
  const [ isMobile, setIsMobile ] = useState(false);

  useEffect(() => {
    // listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    // sets init value of isMobile var
    setIsMobile(mediaQuery.matches);
    // define callback func to handle changes
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }
    // add callback func as a listener for changes to media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    // removes listenr when component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [])
  
  return (
    <Canvas
      frameloop="demand"
      shadows 
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>

      <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas;