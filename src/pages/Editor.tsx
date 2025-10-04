import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";
import Canvas3D from "@/components/Canvas3D";

const Editor = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

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
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Editor 3D - EDEN TREE
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explora y personaliza el hábitat modular de Marte
            </p>
          </div>

          {/* Info Alert */}
          <Card className="p-4 mb-8 glass-effect border-primary/30 flex items-start gap-3 animate-slide-up">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">Nota:</strong> Este es el espacio donde se integrará el modelo 3D del hábitat EDEN TREE. 
              La visualización requiere un archivo .glb/.glTF del diseño del hábitat. Una vez cargado el modelo, podrás rotarlo, 
              hacer zoom, y seleccionar zonas para personalizar colores y texturas.
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* 3D Viewport */}
            <div className="lg:col-span-2">
              <Card className="p-0 glass-effect border-primary/30 overflow-hidden h-[600px] relative animate-fade-in">
                <Canvas3D selectedZone={selectedZone} onZoneSelect={setSelectedZone} />

                {/* Controls overlay */}
                <div className="absolute top-4 left-4 glass-effect p-3 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Controles:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Click + Arrastrar: Rotar</li>
                    <li>• Scroll: Zoom</li>
                    <li>• Click derecho: Pan</li>
                  </ul>
                </div>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <Card className="p-6 glass-effect border-secondary/30">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Seleccionar Zona
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
                <Card className="p-6 glass-effect border-primary/30 animate-fade-in">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    Personalización
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Color Principal
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {["#af4c0f", "#d49f85", "#8b7355", "#c47d5f"].map((color) => (
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
                        Textura
                      </label>
                      <div className="space-y-2">
                        {["Metálica", "Mate", "Madera", "Tejido"].map((texture) => (
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
                      Aplicar Cambios
                    </Button>
                  </div>
                </Card>
              )}

              <Card className="p-6 glass-effect border-border/30">
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  Vistas Rápidas
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-border/50 hover:bg-primary/10">
                    Superior
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:bg-primary/10">
                    Lateral
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:bg-primary/10">
                    Frontal
                  </Button>
                  <Button variant="outline" className="border-border/50 hover:bg-primary/10">
                    Isométrica
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Instructions */}
          <Card className="mt-8 p-6 glass-effect border-secondary/30 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-bold mb-4 text-foreground">
              Tutorial de Uso
            </h3>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">1</span>
                <span>Usa el mouse o touch para rotar el modelo 3D y explorar el hábitat desde todos los ángulos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">2</span>
                <span>Selecciona una zona (TRUNK o ROOT 1-5) del panel lateral para personalizarla</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">3</span>
                <span>Elige colores y texturas que reflejen tu visión del hábitat marciano</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">4</span>
                <span>Aplica los cambios y visualiza el resultado en tiempo real</span>
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
