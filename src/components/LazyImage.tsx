/**
 * ============================================================================
 * LAZY IMAGE COMPONENT - Optimized Image Loading with Skeleton
 * ============================================================================
 * 
 * Performance optimized image component with lazy loading and skeleton state.
 * Reduces initial bundle size and improves perceived performance.
 * ============================================================================
 */

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  eager?: boolean;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className, 
  onError,
  eager = false 
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div className={cn("relative w-full h-full", className)}>
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};
