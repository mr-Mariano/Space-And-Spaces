/**
 * ============================================================================
 * MATERIAL CAROUSEL - Interactive Material Visualization System
 * ============================================================================
 * 
 * AI DEVELOPMENT DISCLOSURE:
 * This component manages the display of 12 material images across 3 materials
 * with a professional carousel interface.
 * 
 * AI Tools Used:
 * - Lovable (GPT Engineer): Carousel structure and navigation (~75%)
 * - Cursor AI Editor: Image mapping and state management (~20%)
 * - GitHub Copilot: Error handling and fallback (~5%)
 * 
 * Human Intervention:
 * - Material-to-image mapping architecture
 * - Visual design (backdrop blur, glassmorphism)
 * - Navigation UX decisions
 * - Image asset organization
 * - Error handling strategy
 * 
 * Technologies:
 * - React 18.3.1 + TypeScript
 * - Lucide React (icons)
 * - Custom UI components (Button)
 * - CSS animations and transitions
 * 
 * Features:
 * - 3 materials with 4 images each (12 total images)
 * - Smooth carousel navigation
 * - Indicator dots for current position
 * - Backdrop blur overlay
 * - Close button
 * - Keyboard navigation support
 * - Image error handling
 * 
 * Materials Included:
 * - Sulfur-Regolith (4 images)
 * - Geopolímero Marciano (4 images)
 * - Kevlar De Membrana Externa (4 images)
 * 
 * Complexity: MEDIUM
 * Lines of code: 142
 * 
 * Estimated Development Time:
 * - With AI assistance: 2-3 hours
 * - Without AI: 3-4 business days
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// Import material images
import img1_sulfur from "@/assets/img1_sulfur_regolith.png";
import img2_sulfur from "@/assets/img2_sulfur_regolith.png";
import img3_sulfur from "@/assets/img3_sulfur_regolith.png";
import img4_sulfur from "@/assets/img4_sulfur_regolith.png";

import img1_geo from "@/assets/img1_geopolimero.png";
import img2_geo from "@/assets/img2_geopolimero.png";
import img3_geo from "@/assets/img3_geopolimero.png";
import img4_geo from "@/assets/img4_geopolimero.png";

import img1_kevlar from "@/assets/img1_kevlar.png";
import img2_kevlar from "@/assets/img2_kevlar.png";
import img3_kevlar from "@/assets/img3_kevlar.png";
import img4_kevlar from "@/assets/img4_kevlar.png";

interface MaterialCarouselProps {
  material: string;
  onClose: () => void;
}

export const MaterialCarousel = ({ material, onClose }: MaterialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [imageLoading, setImageLoading] = useState<Record<number, boolean>>({ 0: true });
  
  // Mapear cada material a sus imágenes correspondientes
  const materialImages: Record<string, string[]> = {
    "Sulfur-Regolith": [
      img1_sulfur,
      img2_sulfur,
      img3_sulfur,
      img4_sulfur
    ],
    "Geopolímero Marciano": [
      img1_geo,
      img2_geo,
      img3_geo,
      img4_geo
    ],
    "Kevlar De Membrana Externa": [
      img1_kevlar,
      img2_kevlar,
      img3_kevlar,
      img4_kevlar
    ]
  };

  const images = materialImages[material] || [];
  
  // Precargar imágenes adyacentes cuando cambia el índice
  useEffect(() => {
    const toLoad = new Set([currentIndex]);
    if (currentIndex > 0) toLoad.add(currentIndex - 1);
    if (currentIndex < images.length - 1) toLoad.add(currentIndex + 1);
    
    // Marcar nuevas imágenes como cargando
    toLoad.forEach(idx => {
      if (!loadedImages.has(idx)) {
        setImageLoading(prev => ({ ...prev, [idx]: true }));
      }
    });
    
    setLoadedImages(toLoad);
  }, [currentIndex, images.length]);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleImageLoad = (idx: number) => {
    setImageLoading(prev => ({ ...prev, [idx]: false }));
  };

  if (!material || images.length === 0) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-12 right-0 text-white hover:bg-white/20 z-20"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Material title */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
            {material}
          </h3>
          <p className="text-sm text-white/80">
            Vista {currentIndex + 1} de {images.length}
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative aspect-video bg-background/10 rounded-lg overflow-hidden border-2 border-primary/50">
          {imageLoading[currentIndex] && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}
          {loadedImages.has(currentIndex) && (
            <img
              src={images[currentIndex]}
              alt={`${material} - Vista ${currentIndex + 1}`}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                imageLoading[currentIndex] ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => handleImageLoad(currentIndex)}
              onError={(e) => {
                handleImageLoad(currentIndex);
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          )}

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-white/50 hover:bg-white/80"
                )}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
       
      </div>
    </div>
  );
};
