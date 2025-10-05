import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Loader } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import HabitatModel from "./HabitatModel";
import { MaterialCarousel } from "./MaterialCarousel";

interface Canvas3DProps {
  selectedZone: string | null;
  onZoneSelect: (zone: string | null) => void;
  duplicateZones: string[];
  renderMode: "standard" | "autocad" | "revit";
  selectedMaterial: string | null;
}

const Canvas3D = ({ 
  selectedZone, 
  onZoneSelect, 
  duplicateZones, 
  renderMode,
  selectedMaterial
}: Canvas3DProps) => {
  const [showCarousel, setShowCarousel] = useState(false);

  // Mostrar carrusel cuando se selecciona un material en modo standard
  useEffect(() => {
    if (selectedMaterial && renderMode === "standard") {
      setShowCarousel(true);
    } else {
      setShowCarousel(false);
    }
  }, [selectedMaterial, renderMode]);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 60 }}
        shadows={renderMode === "standard"}
        className="w-full h-full"
      >
        <color attach="background" args={[
          renderMode === "revit" ? "#ffffff" : 
          renderMode === "autocad" ? "#1a1a2e" : 
          "#0a0a0a"
        ]} />
        
        {/* Lighting según modo */}
        {renderMode === "standard" && (
          <>
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[-10, -10, -5]} intensity={0.3} />
          </>
        )}
        
        {renderMode === "autocad" && (
          <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 10, 7]} intensity={1.2} />
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#00d4ff" />
          </>
        )}
        
        {renderMode === "revit" && (
          <>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
          </>
        )}
        
        {/* 3D Model */}
        <Suspense fallback={null}>
          <HabitatModel 
            selectedZone={selectedZone} 
            onZoneSelect={onZoneSelect}
            duplicateZones={duplicateZones}
            renderMode={renderMode}
          />
        </Suspense>
        
        {/* Environment solo en modo standard */}
        {renderMode === "standard" && <Environment preset="night" />}
        
        {/* Grid en modo Revit */}
        {renderMode === "revit" && (
          <gridHelper args={[50, 50, "#cccccc", "#eeeeee"]} />
        )}
        
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
      
      {/* Carrusel de materiales superpuesto */}
      {showCarousel && selectedMaterial && (
        <MaterialCarousel 
          material={selectedMaterial}
          onClose={() => setShowCarousel(false)}
        />
      )}
    </div>
  );
};

export default Canvas3D;
