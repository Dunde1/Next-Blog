import { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import HeadComponent from '../../../components/HeadComponent';
import { Suspense } from 'react';

const Iphone = () => {
  const { scene } = useGLTF('/resources/threejs/gltf/iphone.gltf');
  return <primitive object={scene} scale={0.01} rotation={[0, -Math.PI / 2, 0]} />;
};

const ImportModel: NextPage = () => {
  return (
    <div className="three">
      <HeadComponent title="import 3D" description="3d import model artwork" />

      <div>
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Iphone />
          </Suspense>
        </Canvas>
      </div>
      <h4>drag iphone</h4>

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
            background-color: rgb(117, 195, 226);
            width: 60vw;
            height: 30vw;
          }
        `}
      </style>
    </div>
  );
};

export default ImportModel;
