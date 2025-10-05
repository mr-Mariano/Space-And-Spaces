/**
 * ============================================================================
 * HABITATMODEL COMPONENT - 3D Interactive Zone Management System
 * ============================================================================
 * 
 * AI DEVELOPMENT DISCLOSURE:
 * This component was developed in a 2-day sprint using AI-assisted tools.
 * The complexity and sophistication of this 3D interaction system would 
 * typically require 1-2 weeks of manual development.
 * 
 * AI Tools Used:
 * - Lovable (GPT Engineer): Initial 3D model loading boilerplate (~60%)
 * - Cursor AI Editor: Zone detection and hover/click logic refinement (~30%)
 * - GitHub Copilot: Code completion for material properties (~10%)
 * 
 * Human Intervention:
 * - Precise zone mapping algorithm (findMeshesByName with exact matching)
 * - Complex material state management (duplicate zones, hover, selection priorities)
 * - Debugging of mesh collection detection (trunk vs root identification)
 * - Visual styling decisions (colors, emissive properties, opacity)
 * - Render mode switching logic (Standard vs AutoCAD/Render modes)
 * 
 * Technologies:
 * - Three.js v0.160.1 (3D rendering engine)
 * - React Three Fiber v8.18.0 (React renderer for Three.js)
 * - React Three Drei v9.122.0 (Helper components and hooks)
 * - TypeScript (Type-safe 3D object manipulation)
 * 
 * Complexity: VERY HIGH
 * - Real-time 3D interaction with precise mesh detection
 * - Multiple visual states (selected, hovered, duplicate, normal)
 * - Dynamic material updates based on render mode
 * - Custom raycasting and event handling
 * 
 * Estimated Development Time:
 * - With AI assistance: 8-10 hours (across 2 days)
 * - Without AI: 7-10 business days (1-2 weeks)
 * 
 * Why AI assistance was necessary:
 * The 2-day deadline made manual implementation of this complex 3D system
 * practically impossible. AI provided rapid prototyping while human expertise
 * ensured precision and reliability in the final implementation.
 * ============================================================================
 */

import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import trunkModel from "@/assets/trunk.glb";

interface HabitatModelProps {
  selectedZone: string | null;
  onZoneSelect: (zone: string | null) => void;
  duplicateZones: string[];
  renderMode: "standard" | "autocad";
}

const HabitatModel = ({ selectedZone, onZoneSelect, duplicateZones, renderMode }: HabitatModelProps) => {
  const { scene } = useGLTF(trunkModel);
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

  // Find meshes by collection name with more precise matching
  const findMeshesByName = (name: string): THREE.Mesh[] => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // More precise matching - check if the name starts with or contains the exact collection name
        // This prevents ROOT_5 from matching ROOT_1, ROOT_2, etc.
        if (child.name === name || 
            child.name.startsWith(name + "_") || 
            child.name.startsWith(name + ".") ||
            child.name.includes(name + "_") ||
            child.name.includes(name + ".")) {
          meshes.push(child);
        }
      }
    });
    return meshes;
  };

  // Debug: Log all mesh names to understand the structure
  useEffect(() => {
    console.log("=== ALL MESH NAMES ===");
    const allMeshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        allMeshes.push(child);
        console.log(`Mesh: "${child.name}"`);
      }
    });
    
    console.log("=== ROOT MESHES ===");
    const meshToZoneMap: Record<string, string[]> = {};
    
    Object.entries(zoneMap).forEach(([zoneId, collectionName]) => {
      const meshes = findMeshesByName(collectionName);
      console.log(`${zoneId} (${collectionName}):`, meshes.map(m => m.name));
      
      // Track which zones each mesh belongs to
      meshes.forEach(mesh => {
        if (!meshToZoneMap[mesh.name]) {
          meshToZoneMap[mesh.name] = [];
        }
        meshToZoneMap[mesh.name].push(zoneId);
      });
    });
    
    // Check for overlapping meshes
    console.log("=== MESH OVERLAP CHECK ===");
    Object.entries(meshToZoneMap).forEach(([meshName, zones]) => {
      if (zones.length > 1) {
        console.warn(`⚠️ Mesh "${meshName}" belongs to multiple zones:`, zones);
      }
    });
  }, [scene]);

  // Update materials based on selection, hover and render mode
  useEffect(() => {
    console.log("=== MATERIAL UPDATE ===");
    console.log("Selected zone:", selectedZone);
    console.log("Hovered zone:", hoveredZone);
    console.log("Duplicate zones:", duplicateZones);
    console.log("Render mode:", renderMode);
    
    // First, reset all meshes to default state
    Object.entries(zoneMap).forEach(([zoneId, collectionName]) => {
      const meshes = findMeshesByName(collectionName);
      meshes.forEach((mesh) => {
        if (mesh.material) {
          // Clone the material to avoid sharing materials between meshes
          if (!mesh.userData.originalMaterial) {
            // Handle both single material and material array
            if (Array.isArray(mesh.material)) {
              mesh.userData.originalMaterial = mesh.material.map(mat => mat.clone());
            } else {
              mesh.userData.originalMaterial = mesh.material.clone();
            }
          }
          
          const material = Array.isArray(mesh.userData.originalMaterial) 
            ? mesh.userData.originalMaterial[0] as THREE.MeshStandardMaterial
            : mesh.userData.originalMaterial as THREE.MeshStandardMaterial;
          
          mesh.material = mesh.userData.originalMaterial;
          
          // Apply render mode effects first
          if (renderMode === "autocad") {
            material.wireframe = false;
            material.metalness = 0.7;
            material.roughness = 0.3;
            material.emissive = new THREE.Color(0x000000);
            material.emissiveIntensity = 0.2;
          } else {
            material.wireframe = false;
            material.metalness = 0.5;
            material.roughness = 0.5;
            material.emissive = new THREE.Color(0x000000);
            material.emissiveIntensity = 0;
          }
          
          material.needsUpdate = true;
        }
      });
    });
    
    // Then apply effects with priority: duplicate > selected > hover
    Object.entries(zoneMap).forEach(([zoneId, collectionName]) => {
      const meshes = findMeshesByName(collectionName);
      const isSelected = selectedZone === zoneId;
      const isHovered = hoveredZone === zoneId;
      const isDuplicate = duplicateZones.includes(zoneId);
      
      console.log(`${zoneId}: ${meshes.length} meshes, selected: ${isSelected}, hovered: ${isHovered}, duplicate: ${isDuplicate}`);

      if (isDuplicate) {
        console.log(`🔴 DUPLICATE ${zoneId} - Applying RED to:`, meshes.map(m => m.name));
        meshes.forEach((mesh) => {
          if (mesh.material) {
            const material = Array.isArray(mesh.material) 
              ? mesh.material[0] as THREE.MeshStandardMaterial
              : mesh.material as THREE.MeshStandardMaterial;
            
            material.emissive = new THREE.Color(0xff0000);
            material.emissiveIntensity = 0.4;
            material.needsUpdate = true;
          }
        });
      } else if (isSelected) {
        console.log(`🎯 SELECTING ${zoneId} - Applying GREEN to:`, meshes.map(m => m.name));
        meshes.forEach((mesh) => {
          if (mesh.material) {
            const material = Array.isArray(mesh.material) 
              ? mesh.material[0] as THREE.MeshStandardMaterial
              : mesh.material as THREE.MeshStandardMaterial;
            
            material.emissive = new THREE.Color(0x00ff00);
            material.emissiveIntensity = 0.3;
            material.needsUpdate = true;
          }
        });
      } else if (isHovered) {
        console.log(`👆 HOVERING ${zoneId} - Applying WHITE to:`, meshes.map(m => m.name));
        meshes.forEach((mesh) => {
          if (mesh.material) {
            const material = Array.isArray(mesh.material) 
              ? mesh.material[0] as THREE.MeshStandardMaterial
              : mesh.material as THREE.MeshStandardMaterial;
            
            material.emissive = new THREE.Color(0xffffff);
            material.emissiveIntensity = 0.2;
            material.needsUpdate = true;
          }
        });
      }
    });
  }, [selectedZone, hoveredZone, duplicateZones, renderMode, scene]);

  // Handle click on zones with more precise matching
  const handleClick = (event: any) => {
    event.stopPropagation();
    const clickedObject = event.object;
    console.log("Clicked object:", clickedObject.name);
    
    // Find which zone was clicked with precise matching
    for (const [zoneId, collectionName] of Object.entries(zoneMap)) {
      if (clickedObject.name === collectionName || 
          clickedObject.name.startsWith(collectionName + "_") || 
          clickedObject.name.startsWith(collectionName + ".") ||
          clickedObject.name.includes(collectionName + "_") ||
          clickedObject.name.includes(collectionName + ".")) {
        console.log(`Selected zone: ${zoneId} (${collectionName})`);
        onZoneSelect(selectedZone === zoneId ? null : zoneId);
        return;
      }
    }
  };

  // Handle hover with precise matching
  const handlePointerOver = (event: any) => {
    event.stopPropagation();
    const hoveredObject = event.object;
    for (const [zoneId, collectionName] of Object.entries(zoneMap)) {
      if (hoveredObject.name === collectionName || 
          hoveredObject.name.startsWith(collectionName + "_") || 
          hoveredObject.name.startsWith(collectionName + ".") ||
          hoveredObject.name.includes(collectionName + "_") ||
          hoveredObject.name.includes(collectionName + ".")) {
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
useGLTF.preload(trunkModel);

export default HabitatModel;
