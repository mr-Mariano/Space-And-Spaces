import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface WalkthroughStep {
  id: number;
  targetClass: string;
  position: "top" | "bottom" | "left" | "right";
}

interface EditorWalkthroughProps {
  onComplete: () => void;
  onModeChange?: (mode: "standard" | "autocad") => void;
}

const steps: WalkthroughStep[] = [
  {
    id: 1,
    targetClass: "canvas-3d-container",
    position: "bottom"
  },
  {
    id: 2,
    targetClass: "texture-selector",
    position: "left"
  },
  {
    id: 3,
    targetClass: "texture-selector",
    position: "left"
  },
  {
    id: 4,
    targetClass: "zone-selector",
    position: "left"
  },
  {
    id: 5,
    targetClass: "export-panel",
    position: "left"
  }
];

const stepIcons = ['🚀', '🎨', '🖼️', '⚙️', '📤'];

export const EditorWalkthrough = ({ onComplete, onModeChange }: EditorWalkthroughProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    // Mostrar inmediatamente al montar el componente
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const step = steps[currentStep];
    const element = document.querySelector(`.${step.targetClass}`);
    
    if (element) {
      const rect = element.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      // Si el elemento no existe, no mostrar spotlight
      setTargetRect(null);
    }
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // Cambiar automáticamente a modo Render en el paso 4 (zona selector)
      if (currentStep === 2 && onModeChange) {
        onModeChange("autocad");
      }
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const step = steps[currentStep];
  
  // Safety check: return null if translations aren't loaded yet
  if (!t?.editor?.walkthrough) return null;
  
  const walkthroughStep = t.editor.walkthrough.steps?.[currentStep];
  if (!walkthroughStep) return null;

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      {/* Overlay con glassmorphism */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 animate-fade-in" 
        onClick={handleComplete} 
      />
      
      {/* Spotlight sobre elemento target */}
      {targetRect && (
        <div
          className="fixed z-[51] pointer-events-none border-4 border-primary/80 rounded-lg animate-pulse-slow shadow-2xl shadow-primary/50"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        />
      )}
      
      {/* Card con instrucciones mejorado */}
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[52] glass-effect border-primary/50 max-w-lg w-[90%] animate-scale-in shadow-2xl shadow-primary/20 overflow-hidden">
        {/* Progress bar superior */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-background/30">
          <div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="p-6 pt-8">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 hover:bg-destructive/20 hover:text-destructive transition-colors"
            onClick={handleComplete}
          >
            <X className="w-4 h-4" />
          </Button>
          
          {/* Header con icono y título */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl shadow-lg shrink-0 animate-glow">
              {stepIcons[currentStep]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {t.editor.walkthrough.step} {currentStep + 1} {t.editor.walkthrough.of} {steps.length}
              </p>
              <h3 className="text-2xl font-bold text-foreground leading-tight">
                {walkthroughStep.title}
              </h3>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {walkthroughStep.description}
          </p>

          {/* Progress indicators */}
          <div className="flex gap-1.5 mb-6 justify-center">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  idx === currentStep 
                    ? "bg-gradient-to-r from-primary to-secondary w-8 shadow-lg shadow-primary/50" 
                    : idx < currentStep
                    ? "bg-primary/50 w-2"
                    : "bg-primary/20 w-2"
                )}
              />
            ))}
          </div>
          
          {/* Botones de navegación */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {t.editor.walkthrough.previous}
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={cn(
                "flex-1 font-semibold shadow-lg transition-all",
                currentStep < steps.length - 1
                  ? "bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:shadow-primary/50"
                  : "bg-gradient-to-r from-primary via-secondary to-primary animate-glow hover:shadow-xl hover:shadow-primary/50"
              )}
            >
              {currentStep < steps.length - 1 ? (
                <>
                  {t.editor.walkthrough.next}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  {t.editor.walkthrough.start}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
          
          {/* Link para saltar */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleComplete}
          >
            {t.editor.walkthrough.skip}
          </Button>
        </div>
      </Card>
    </>
  );
};
