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
        camera={{ position: [8, 6, 8], fov: 60 }}
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
          minDistance={0.5}
          maxDistance={50}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={1.2}
          panSpeed={0.8}
          screenSpacePanning={false}
          target={[0, 0, 0]}
        />
      </Canvas>
      <Loader />
    </>
  );
};

export default Canvas3D;
