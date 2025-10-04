import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

interface HabitatModelProps {
  selectedZone: string | null;
  onZoneSelect: (zone: string | null) => void;
}

const HabitatModel = ({ selectedZone, onZoneSelect }: HabitatModelProps) => {
  const { scene } = useGLTF("/src/assets/trunk.glb");
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Map zone IDs to collection names
  const zoneMap: Record<string, string> = {
    trunk: "TRUNK",
    root1: "ROOT_1",
    root2: "ROOT_2",
    root3: "ROOT_3",
    root4: "ROOT_4",
    root5: "ROOT_5",
  };

  // Find meshes by collection name
  const findMeshesByName = (name: string): THREE.Mesh[] => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.name.includes(name)) {
        meshes.push(child);
      }
    });
    return meshes;
  };

  // Update materials based on selection and hover
  useEffect(() => {
    Object.entries(zoneMap).forEach(([zoneId, collectionName]) => {
      const meshes = findMeshesByName(collectionName);
      const isSelected = selectedZone === zoneId;
      const isHovered = hoveredZone === zoneId;

      meshes.forEach((mesh) => {
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          
          if (isSelected) {
            material.emissive = new THREE.Color(0x00ff00);
            material.emissiveIntensity = 0.3;
          } else if (isHovered) {
            material.emissive = new THREE.Color(0xffffff);
            material.emissiveIntensity = 0.2;
          } else {
            material.emissive = new THREE.Color(0x000000);
            material.emissiveIntensity = 0;
          }
          material.needsUpdate = true;
        }
      });
    });
  }, [selectedZone, hoveredZone, scene]);

  // Handle click on zones
  const handleClick = (event: any) => {
    event.stopPropagation();
    const clickedObject = event.object;
    
    // Find which zone was clicked
    for (const [zoneId, collectionName] of Object.entries(zoneMap)) {
      if (clickedObject.name.includes(collectionName)) {
        onZoneSelect(selectedZone === zoneId ? null : zoneId);
        return;
      }
    }
  };

  // Handle hover
  const handlePointerOver = (event: any) => {
    event.stopPropagation();
    const hoveredObject = event.object;
    
    for (const [zoneId, collectionName] of Object.entries(zoneMap)) {
      if (hoveredObject.name.includes(collectionName)) {
        setHoveredZone(zoneId);
        document.body.style.cursor = "pointer";
        return;
      }
    }
  };

  const handlePointerOut = () => {
    setHoveredZone(null);
    document.body.style.cursor = "default";
  };

  return (
    <primitive
      object={scene}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={1}
      position={[0, 0, 0]}
    />
  );
};

// Preload the model
useGLTF.preload("/src/assets/trunk.glb");

export default HabitatModel;
