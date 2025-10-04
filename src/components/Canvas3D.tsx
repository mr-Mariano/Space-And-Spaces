import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Loader } from "@react-three/drei";
import { Suspense } from "react";
import HabitatModel from "./HabitatModel";

interface Canvas3DProps {
  selectedZone: string | null;
  onZoneSelect: (zone: string | null) => void;
}

const Canvas3D = ({ selectedZone, onZoneSelect }: Canvas3DProps) => {
  return (
    <>
      <Canvas
        camera={{ position: [5, 3, 5], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        <color attach="background" args={["#0a0a0a"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        {/* 3D Model */}
        <Suspense fallback={null}>
          <HabitatModel selectedZone={selectedZone} onZoneSelect={onZoneSelect} />
        </Suspense>
        
        {/* Environment */}
        <Environment preset="night" />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <Loader />
    </>
  );
};

export default Canvas3D;
