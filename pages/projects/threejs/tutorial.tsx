import { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import HeadComponent from '../../../components/HeadComponent';

const Box = () => {
  const [ref, api] = useBox(() => ({ mass: 2 }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 10, 10);
      }}
      ref={ref}
      position={[0, 2, 0]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

const Plane = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
};

const Tutorial: NextPage = () => {
  return (
    <div className="three">
      <HeadComponent title="tutorial 3D" description="3d tutorial artwork" />

      <div>
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <Stars />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Physics>
            <Box />
            <Plane />
          </Physics>
        </Canvas>
      </div>
      <h4>drag and click box</h4>

      <style jsx>
        {`
          div.three {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            padding: 30px;
            width: 100%;
          }

          div.three > div {
            border: 1px solid black;
            background-color: rgb(30, 30, 30);
            width: 60vw;
            height: 30vw;
          }
        `}
      </style>
    </div>
  );
};

export default Tutorial;
