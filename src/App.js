/* eslint-disable no-unused-vars */
import './App.css';
import React, { Suspense  } from 'react'
import { Canvas , useFrame ,  useThree } from '@react-three/fiber'
import { OrbitControls , Stars ,  ScrollControls, Scroll , useScroll , Html} from '@react-three/drei'
import Model from './components/model';

const planetList = [
  {
     name:'Allien planet',
     path:'/scene.gltf',
     scale:0.5,
     details:{
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry'
     }
  }
]


const Splash = () => {
    return (
      <div className="splashScreen">
          {/* <h1 style={{ fontSize:'3em'}}>Tutorial guide to join in BF football community</h1> */}
          <h2>Loading....</h2>
      </div>
    )
}

function Composition() {
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport)
 

  return (
    <Scroll>
        {
          planetList.map((item,index) => {
            return <group key={index}  position={[0, -height * index,0]}>
                <group>
                    {/* <Suspense fallback={null}> */}
                      <Model path={item.path} scale={item.scale} />
                    {/* </Suspense> */}
                </group>
                <Html fullscreen zIndexRange={[0, 0]}>
                  <div className="planetDetails">
                      <h1 className='planetTitle'> {item.name} </h1>
                      <p className='planetDescription'> {item.details.description} </p>
                  </div>
                </Html>
              </group>
          })
        }
    </Scroll>
  )
}




function App() {
  return (
    <div className="App">
       <Suspense fallback={<Splash/>}>
          <Canvas style={{background:'black'}} shadows dpr={[1, 2]} camera={{  near:0.1 , far:2000 , position: [0, 0, 10], fov: 70 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <ScrollControls pages={planetList.length} damping={2}>
                <Composition/>
            </ScrollControls>
            {/* <OrbitControls/> */}
            <Stars/>
          </Canvas>
        </Suspense>
    </div>
  );
}

export default App;
