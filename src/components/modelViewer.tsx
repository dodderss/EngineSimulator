// Import necessary modules and components
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

// Define the Model functional component
function Model() {
  const { engine, units } = useContext(EngineContext); // Get the engine data from the EngineContext
  const [model, setModel] = useState(V8); // Define state for the current model

  // Update the model based on the number of engine cylinders
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

  const geometry = useLoader(STLLoader, model); // Load the model geometry

  return (
    <mesh
      geometry={geometry}
      rotation={new Euler(-Math.PI / 2, 0, Math.PI / 2)} // Set the rotation of the model
    >
      <meshPhongMaterial color={units.engineColour} /> {/* Apply material to the model */}
    </mesh>
  );
}

// Define the ModelViewer functional component
function ModelViewer() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} /> {/* Add ambient light */}
        <directionalLight position={[5, 5, 5]} intensity={3} /> {/* Add directional light */}
        <directionalLight position={[-5, -5, -5]} intensity={2} /> {/* Add directional light */}
        <Environment preset="studio" background={false} /> {/* Add environment */}
        <Suspense fallback={null}>
          <Model /> {/* Render the model */}
        </Suspense>
        <OrbitControls /> {/* Add orbit controls */}
      </Canvas>
    </div>
  );
}

// Export the ModelViewer component as the default export
export default ModelViewer;