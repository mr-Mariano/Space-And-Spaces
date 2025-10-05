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

const steps: WalkthroughStep[] = [
  {
    id: 1,
    targetClass: "canvas-3d-container",
    position: "bottom"
  },
  {
    id: 2,
    targetClass: "zone-selector",
    position: "left"
  },
  {
    id: 3,
    targetClass: "area-selector",
    position: "top"
  },
  {
    id: 4,
    targetClass: "texture-selector",
    position: "top"
  },
  {
    id: 5,
    targetClass: "export-panel",
    position: "left"
  }
];

export const EditorWalkthrough = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenWalkthrough = localStorage.getItem("eden-editor-walkthrough-seen");
    if (!hasSeenWalkthrough) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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
    localStorage.setItem("eden-editor-walkthrough-seen", "true");
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay oscuro */}
      <div className="fixed inset-0 bg-black/70 z-50 animate-fade-in" onClick={handleComplete} />
      
      {/* Card con instrucciones */}
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[52] p-6 glass-effect border-primary/50 max-w-md w-[90%] animate-scale-in">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleComplete}
        >
          <X className="w-4 h-4" />
        </Button>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              {t.editor.walkthrough.step} {currentStep + 1} {t.editor.walkthrough.of} {steps.length}
            </span>
            <div className="flex gap-1">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === currentStep ? "bg-primary w-4" : "bg-primary/30"
                  )}
                />
              ))}
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {t.editor.walkthrough.steps[currentStep].title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t.editor.walkthrough.steps[currentStep].description}
          </p>
        </div>
        
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t.editor.walkthrough.previous}
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {currentStep < steps.length - 1 ? (
              <>
                {t.editor.walkthrough.next}
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              t.editor.walkthrough.start
            )}
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-xs text-muted-foreground"
          onClick={handleComplete}
        >
          {t.editor.walkthrough.skip}
        </Button>
      </Card>
    </>
  );
};
