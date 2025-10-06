/**
 * ============================================================================
 * CANVAS3D COMPONENT - Three.js Scene Configuration & Material System
 * ============================================================================
 * 
 * AI DEVELOPMENT DISCLOSURE:
 * This component manages the 3D rendering environment and was developed
 * with significant AI assistance during the 2-day development sprint.
 * 
 * AI Tools Used:
 * - Lovable (GPT Engineer): Canvas setup, lighting configuration (~70%)
 * - Cursor AI Editor: Dual-mode rendering logic, material carousel integration (~25%)
 * - GitHub Copilot: OrbitControls fine-tuning (~5%)
 * 
 * Human Intervention:
 * - Lighting strategy for each render mode (Standard vs AutoCAD/Render)
 * - Camera positioning and FOV optimization
 * - Material carousel overlay positioning and state management
 * - Performance optimization (shadows, environment maps)
 * - Background color selection for each mode
 * 
 * Technologies:
 * - React Three Fiber v8.18.0 (React renderer for Three.js)
 * - React Three Drei v9.122.0 (OrbitControls, Environment, Loader)
 * - Three.js v0.160.1 (WebGL rendering)
 * 
 * Complexity: HIGH
 * - Dual rendering modes with different visual styles
 * - Dynamic lighting configuration
 * - Material carousel overlay management
 * - Optimized camera controls
 * 
 * Estimated Development Time:
 * - With AI assistance: 3-4 hours
 * - Without AI: 3-5 business days
 * ============================================================================
 */

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Loader } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import HabitatModel from "./HabitatModel";
import { MaterialCarousel } from "./MaterialCarousel";
import { Skeleton } from "@/components/ui/skeleton";

interface Canvas3DProps {
  selectedZone: string | null;
  onZoneSelect: (zone: string | null) => void;
  duplicateZones: string[];
  renderMode: "standard" | "autocad";
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
          renderMode === "autocad" ? "#1a1a2e" : "#0a0a0a"
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
            <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow={false} />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} />
          </>
        )}
        
        {/* 3D Model */}
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#333" wireframe />
          </mesh>
        }>
          <HabitatModel 
            selectedZone={selectedZone} 
            onZoneSelect={onZoneSelect}
            duplicateZones={duplicateZones}
            renderMode={renderMode}
          />
        </Suspense>
        
        {/* Environment solo en modo standard */}
        {renderMode === "standard" && <Environment preset="night" />}
        
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
