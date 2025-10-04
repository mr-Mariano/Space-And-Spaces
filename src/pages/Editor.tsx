import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, FlaskConical, HeartPulse, Bed, UtensilsCrossed, Users, AlertCircle } from "lucide-react";
import { useState } from "react";
import Canvas3D from "@/components/Canvas3D";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type AreaType = "Investigación" | "Salud" | "Descanso" | "Comida y Recursos" | "Social";

const Editor = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [areaAssignments, setAreaAssignments] = useState<Record<string, AreaType>>({
    root1: "Investigación",
    root2: "Salud",
    root3: "Descanso",
    root4: "Comida y Recursos",
    root5: "Social",
  });

  const zones = [
    { id: "trunk", name: "TRUNK", color: "from-primary to-primary-glow" },
    { id: "root1", name: "ROOT 1", color: "from-secondary to-primary" },
    { id: "root2", name: "ROOT 2", color: "from-primary to-secondary" },
    { id: "root3", name: "ROOT 3", color: "from-secondary to-primary" },
    { id: "root4", name: "ROOT 4", color: "from-primary to-secondary" },
    { id: "root5", name: "ROOT 5", color: "from-secondary to-primary" },
  ];

  const areaInfo: Record<AreaType, { icon: any; description: string; color: string }> = {
    "Investigación": {
      icon: FlaskConical,
      description: "Laboratorios y espacios dedicados a investigación científica y análisis de datos marcianos",
      color: "text-blue-400"
    },
    "Salud": {
      icon: HeartPulse,
      description: "Centro médico equipado para atención de salud y monitoreo de la tripulación",
      color: "text-red-400"
    },
    "Descanso": {
      icon: Bed,
      description: "Habitaciones privadas y áreas de descanso para recuperación y sueño",
      color: "text-purple-400"
    },
    "Comida y Recursos": {
      icon: UtensilsCrossed,
      description: "Cocina, comedor, almacenamiento de alimentos y gestión de recursos",
      color: "text-yellow-400"
    },
    "Social": {
      icon: Users,
      description: "Sala de reuniones y áreas comunes para interacción social de la tripulación",
      color: "text-green-400"
    }
  };

  const handleAreaChange = (rootId: string, newArea: AreaType) => {
    setAreaAssignments(prev => ({
      ...prev,
      [rootId]: newArea
    }));

    toast({
      title: "Área actualizada",
      description: `${zones.find(z => z.id === rootId)?.name} ahora es: ${newArea}`,
    });
  };

  const validateAssignments = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const areaCount: Record<string, string[]> = {};

    // Verificar áreas duplicadas
    Object.entries(areaAssignments).forEach(([rootId, area]) => {
      if (!areaCount[area]) {
        areaCount[area] = [];
      }
      areaCount[area].push(zones.find(z => z.id === rootId)?.name || rootId);
    });

    Object.entries(areaCount).forEach(([area, roots]) => {
      if (roots.length > 1) {
        errors.push(`El área "${area}" está asignada a: ${roots.join(", ")}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleExportOrShare = () => {
    const validation = validateAssignments();
    
    if (!validation.isValid) {
      toast({
        title: "Configuración inválida",
        description: validation.errors.join(" • "),
        variant: "destructive",
      });
      return;
    }

    // Aquí iría la lógica de exportar/compartir
    toast({
      title: "¡Listo para exportar!",
      description: "Todas las áreas están correctamente asignadas",
    });
  };

  const getAllAreas = (): AreaType[] => {
    return ["Investigación", "Salud", "Descanso", "Comida y Recursos", "Social"];
  };

  const getDuplicateAreas = (): string[] => {
    const areaCount: Record<string, number> = {};
    Object.values(areaAssignments).forEach(area => {
      areaCount[area] = (areaCount[area] || 0) + 1;
    });
    return Object.entries(areaCount)
      .filter(([_, count]) => count > 1)
      .map(([area, _]) => area);
  };

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
            <div className="lg:col-span-2 space-y-6">
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

              {/* Panel de Información Detallada - Solo para ROOTs */}
              {selectedZone && selectedZone !== "trunk" && (
                <Card className="p-6 glass-effect border-secondary/30 animate-fade-in">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const area = areaAssignments[selectedZone];
                          const AreaIcon = areaInfo[area].icon;
                          return (
                            <>
                              <div className={`w-12 h-12 rounded-lg glass-effect flex items-center justify-center ${areaInfo[area].color}`}>
                                <AreaIcon className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-foreground">
                                  {zones.find(z => z.id === selectedZone)?.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">Área asignada</p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Función del ROOT
                        </label>
                        <Select
                          value={areaAssignments[selectedZone]}
                          onValueChange={(value) => handleAreaChange(selectedZone, value as AreaType)}
                        >
                          <SelectTrigger className="w-full border-border/50 bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            {getAllAreas().map((area) => {
                              const AreaIcon = areaInfo[area].icon;
                              const isDuplicate = getDuplicateAreas().includes(area);
                              return (
                                <SelectItem key={area} value={area}>
                                  <div className="flex items-center gap-2">
                                    <AreaIcon className={`w-4 h-4 ${areaInfo[area].color}`} />
                                    <span>{area}</span>
                                    {isDuplicate && area === areaAssignments[selectedZone] && (
                                      <AlertCircle className="w-3 h-3 text-yellow-500 ml-1" />
                                    )}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="flex items-start gap-2">
                          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">
                            {areaInfo[areaAssignments[selectedZone]].description}
                          </p>
                        </div>
                      </div>

                      {getDuplicateAreas().length > 0 && (
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-yellow-500">
                              Advertencia: Hay áreas duplicadas ({getDuplicateAreas().join(", ")}). 
                              Debes corregir esto antes de exportar o compartir.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Control Panel */}
            <div className="space-y-6 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <Card className="p-6 glass-effect border-secondary/30">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Seleccionar Zona
                </h2>
                <div className="space-y-3">
                  {zones.map((zone) => {
                    const isRoot = zone.id !== "trunk";
                    const area = isRoot ? areaAssignments[zone.id] : null;
                    const AreaIcon = area ? areaInfo[area].icon : null;
                    
                    return (
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
                        <div className="flex items-center gap-3 w-full">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${zone.color} flex-shrink-0`} />
                          <div className="flex-1 text-left">
                            <div className="font-semibold">{zone.name}</div>
                            {isRoot && area && (
                              <div className="text-xs opacity-80 flex items-center gap-1 mt-0.5">
                                {AreaIcon && <AreaIcon className="w-3 h-3" />}
                                {area}
                              </div>
                            )}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
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
                <div className="grid grid-cols-2 gap-2 mb-4">
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
                
                <Button 
                  onClick={handleExportOrShare}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Exportar / Compartir
                </Button>
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
