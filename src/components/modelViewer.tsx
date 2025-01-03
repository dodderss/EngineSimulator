import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import V6 from "../assets/models/v6.stl";
import V8 from "../assets/models/v8.stl";
import V10 from "../assets/models/v10.stl";
import V12 from "../assets/models/v12.stl";
import { Euler } from "three";
import { useContext, useEffect, Suspense, useState } from "react";
import { EngineContext } from "../services/globals";

function Model() {
  const { engine } = useContext(EngineContext);
  const [model, setModel] = useState(V8);

  useEffect(() => {
    if (engine.engineCylinders === 6) {
      setModel(V6);
    } else if (engine.engineCylinders === 8) {
      setModel(V8);
    } else if (engine.engineCylinders === 10) {
      setModel(V10);
    } else if (engine.engineCylinders === 12) {
      setModel(V12);
    }
  }, [engine]);

  const geometry = useLoader(STLLoader, model);

  return (
    <mesh
      geometry={geometry}
      rotation={new Euler(-Math.PI / 2, 0, Math.PI / 2)}
    >
      <meshPhongMaterial color="white" />
    </mesh>
  );
}   
function ModelViewer() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <directionalLight position={[-5, -5, -5]} intensity={2} />
        <Environment preset="studio" background={false} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ModelViewer;
