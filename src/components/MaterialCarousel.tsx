import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import material images
import img1_sulfur from "@/assets/img1_sulfur_regolith.jpg";
import img2_sulfur from "@/assets/img2_sulfur_regolith.jpg";
import img3_sulfur from "@/assets/img3_sulfur_regolith.jpg";
import img4_sulfur from "@/assets/img4_sulfur_regolith.jpg";

import img1_geo from "@/assets/img1_geopolimero.jpg";
import img2_geo from "@/assets/img2_geopolimero.jpg";
import img3_geo from "@/assets/img3_geopolimero.jpg";
import img4_geo from "@/assets/img4_geopolimero.jpg";

import img1_kevlar from "@/assets/img1_kevlar.jpg";
import img2_kevlar from "@/assets/img2_kevlar.jpg";
import img3_kevlar from "@/assets/img3_kevlar.jpg";
import img4_kevlar from "@/assets/img4_kevlar.jpg";

interface MaterialCarouselProps {
  material: string;
  onClose: () => void;
}

export const MaterialCarousel = ({ material, onClose }: MaterialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
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
          <img
            src={images[currentIndex]}
            alt={`${material} - Vista ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback si la imagen no existe
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />

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
