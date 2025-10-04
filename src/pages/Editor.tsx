import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Info } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Editor = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const { t } = useLanguage();

  const zones = [
    { id: "trunk", name: "TRUNK", color: "from-primary to-primary-glow" },
    { id: "root1", name: "ROOT 1", color: "from-secondary to-primary" },
    { id: "root2", name: "ROOT 2", color: "from-primary to-secondary" },
    { id: "root3", name: "ROOT 3", color: "from-secondary to-primary" },
    { id: "root4", name: "ROOT 4", color: "from-primary to-secondary" },
    { id: "root5", name: "ROOT 5", color: "from-secondary to-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {t.editor.title}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.editor.subtitle}
            </p>
          </div>

          {/* Info Alert */}
          <Card className="p-4 mb-8 glass-effect border-primary/20 flex items-start gap-3 animate-slide-up max-w-4xl mx-auto">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">{t.editor.note}</strong> {t.editor.noteText}
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* 3D Viewport */}
            <div className="lg:col-span-2">
              <Card className="p-0 glass-effect border-primary/20 overflow-hidden h-[600px] relative animate-fade-in">
                {/* Placeholder for 3D canvas */}
                <div className="w-full h-full bg-gradient-to-br from-background via-primary/5 to-background flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Box className="h-24 w-24 text-primary/30 mx-auto animate-pulse" />
                    <div>
                      <p className="text-xl font-semibold text-foreground mb-2">
                        {t.editor.viewport}
                      </p>
                      <p className="text-muted-foreground max-w-md">
                        {t.editor.viewportDesc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Controls overlay */}
                <div className="absolute top-4 left-4 glass-effect p-3 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">{t.editor.controls}</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• {t.editor.clickDrag}</li>
                    <li>• {t.editor.scroll}</li>
                    <li>• {t.editor.rightClick}</li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <Card className="p-6 glass-effect border-secondary/20">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  {t.editor.selectZone}
                </h2>
                <div className="space-y-3">
                  {zones.map((zone) => (
                    <Button
                      key={zone.id}
                      variant={selectedZone === zone.id ? "default" : "outline"}
                      className={`w-full justify-start ${
                        selectedZone === zone.id 
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                          : "border-border/50 hover:bg-primary/10"
                      }`}
                      onClick={() => setSelectedZone(zone.id)}
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${zone.color} mr-3`} />
                      {zone.name}
                    </Button>
                  ))}
                </div>
              </Card>

              {selectedZone && (
                <Card className="p-6 glass-effect border-primary/20 animate-fade-in">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {t.editor.customization}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        {t.editor.mainColor}
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {["#ff6b35", "#f1c5a8", "#8b7355", "#c47d5f"].map((color) => (
                          <button
                            key={color}
                            className="w-full aspect-square rounded-lg border-2 border-border/50 hover:border-primary transition-all"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        {t.editor.texture}
                      </label>
                      <div className="space-y-2">
                        {[t.editor.textures.metallic, t.editor.textures.matte, t.editor.textures.wood, t.editor.textures.fabric].map((texture) => (
                          <Button
                            key={texture}
                            variant="outline"
                            className="w-full justify-start border-border/50 hover:bg-secondary/10"
                          >
                            {texture}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      {t.editor.applyChanges}
                    </Button>
                  </div>
                </Card>
              )}

              <Card className="p-6 glass-effect border-border/30">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {t.editor.quickViews}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-border/50 hover:bg-primary/10">
                    {t.editor.top}
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:bg-primary/10">
                    {t.editor.side}
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:bg-primary/10">
                    {t.editor.front}
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:bg-primary/10">
                    {t.editor.isometric}
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Instructions */}
          <Card className="mt-12 p-8 glass-effect border-secondary/20 animate-slide-up max-w-4xl mx-auto" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-bold mb-6 text-foreground">
              {t.editor.tutorial}
            </h3>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">1</span>
                <span>{t.editor.step1}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">2</span>
                <span>{t.editor.step2}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">3</span>
                <span>{t.editor.step3}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">4</span>
                <span>{t.editor.step4}</span>
              </li>
            </ol>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Editor;
