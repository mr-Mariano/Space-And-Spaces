import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, FlaskConical, HeartPulse, Bed, UtensilsCrossed, Users, AlertCircle, Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Canvas3D from "@/components/Canvas3D";
import { EditorWalkthrough } from "@/components/EditorWalkthrough";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

type AreaType = "research" | "health" | "rest" | "foodResources" | "social";

const Editor = () => {
  const { t } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [renderMode, setRenderMode] = useState<"standard" | "autocad" | "revit">("standard");
  const [selectedTexture, setSelectedTexture] = useState<string>("Metálica");
  const [areaAssignments, setAreaAssignments] = useState<Record<string, AreaType>>({
    root1: "research",
    root2: "health",
    root3: "rest",
    root4: "foodResources",
    root5: "social",
  });

  const zones = [
    { id: "trunk", name: "TRUNK", color: "from-primary to-primary-glow" },
    { id: "root1", name: "ROOT 1", color: "from-secondary to-primary" },
    { id: "root2", name: "ROOT 2", color: "from-primary to-secondary" },
    { id: "root3", name: "ROOT 3", color: "from-secondary to-primary" },
    { id: "root4", name: "ROOT 4", color: "from-primary to-secondary" },
    { id: "root5", name: "ROOT 5", color: "from-secondary to-primary" },
  ];

  const areaInfo: Record<AreaType, { icon: any; color: string }> = {
    research: {
      icon: FlaskConical,
      color: "text-blue-400"
    },
    health: {
      icon: HeartPulse,
      color: "text-red-400"
    },
    rest: {
      icon: Bed,
      color: "text-purple-400"
    },
    foodResources: {
      icon: UtensilsCrossed,
      color: "text-yellow-400"
    },
    social: {
      icon: Users,
      color: "text-green-400"
    }
  };

  const handleAreaChange = (rootId: string, newArea: AreaType) => {
    setAreaAssignments(prev => ({
      ...prev,
      [rootId]: newArea
    }));

    toast({
      title: t.editor.areaUpdated,
      description: `${zones.find(z => z.id === rootId)?.name} ${t.editor.rootNowIs} ${t.editor.areas[newArea]}`,
    });
  };

  const validateAssignments = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const areaCount: Record<string, string[]> = {};

    Object.entries(areaAssignments).forEach(([rootId, area]) => {
      if (!areaCount[area]) {
        areaCount[area] = [];
      }
      areaCount[area].push(zones.find(z => z.id === rootId)?.name || rootId);
    });

    Object.entries(areaCount).forEach(([area, roots]) => {
      if (roots.length > 1) {
        errors.push(`${t.editor.duplicateArea} "${t.editor.areas[area as AreaType]}" ${t.editor.assignedTo} ${roots.join(", ")}`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const generatePDF = () => {
    const validation = validateAssignments();
    
    if (!validation.isValid) {
      toast({
        title: t.editor.invalidConfig,
        description: validation.errors.join(" • "),
        variant: "destructive",
      });
      return;
    }

    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(175, 76, 15);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("EDEN TREE - Hábitat Marciano", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.text("Especificaciones de Configuración", 105, 30, { align: "center" });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    
    // Information
    doc.text("Fecha de generación: " + new Date().toLocaleDateString(), 20, 50);
    
    // Table data
    const tableData = Object.entries(areaAssignments).map(([rootId, area]) => {
      const zone = zones.find(z => z.id === rootId);
      return [
        zone?.name || rootId,
        t.editor.areas[area],
        t.editor.areaDescriptions[area]
      ];
    });
    
    autoTable(doc, {
      startY: 60,
      head: [['Zona', t.editor.assignedArea, 'Descripción']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [175, 76, 15],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 50 },
        2: { cellWidth: 100 }
      }
    });
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Página ${i} de ${pageCount} - EDEN TREE © ${new Date().getFullYear()}`,
        105,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
    }
    
    // Download
    doc.save(`eden-tree-habitat-${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: t.editor.pdfGenerated,
      description: t.editor.pdfSuccess,
    });
  };

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'facebook' | 'linkedin' | 'instagram') => {
    const validation = validateAssignments();
    
    if (!validation.isValid) {
      toast({
        title: t.editor.invalidConfig,
        description: t.editor.completeConfig,
        variant: "destructive",
      });
      return;
    }

    const shareText = `${t.editor.justDesigned} 🚀🔴
    
${Object.entries(areaAssignments).map(([rootId, area]) => {
  const zone = zones.find(z => z.id === rootId);
  return `${zone?.name}: ${t.editor.areas[area]}`;
}).join('\n')}

#EdenTree #Mars #SpaceHabitat`;

    const encodedText = encodeURIComponent(shareText);
    const currentUrl = encodeURIComponent(window.location.href);

    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
      instagram: ''
    };

    if (platform === 'instagram') {
      toast({
        title: t.editor.instagram,
        description: t.editor.instagramCopy,
      });
      navigator.clipboard.writeText(shareText);
      return;
    }

    window.open(urls[platform], '_blank', 'width=600,height=400');
    
    toast({
      title: `${t.editor.shareOn} ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      description: t.editor.openingWindow,
    });
  };

  const getAllAreas = (): AreaType[] => {
    return ["research", "health", "rest", "foodResources", "social"];
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

  const getDuplicateZones = (): string[] => {
    const areaCount: Record<string, string[]> = {};
    
    // Group zones by assigned area
    Object.entries(areaAssignments).forEach(([zoneId, area]) => {
      if (!areaCount[area]) {
        areaCount[area] = [];
      }
      areaCount[area].push(zoneId);
    });
    
    // Return all zones that have duplicate areas
    const duplicateZones: string[] = [];
    Object.values(areaCount).forEach(zones => {
      if (zones.length > 1) {
        duplicateZones.push(...zones);
      }
    });
    
    return duplicateZones;
  };

  const handleTextureChange = (zoneId: string, texture: string) => {
    setSelectedTexture(texture);
    toast({
      title: t.editor.textureUpdated || "Textura actualizada",
      description: `${zones.find(z => z.id === zoneId)?.name}: ${texture}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <EditorWalkthrough onComplete={() => {}} />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
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
          <Card className="p-4 mb-8 glass-effect border-primary/30 flex items-start gap-3 animate-slide-up">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">{t.editor.note}</strong> {t.editor.noteText}
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
          {/* 3D Viewport */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selector de Modo de Renderizado */}
            <Card className="p-4 glass-effect border-border/30">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  {t.editor.renderMode || "Modo de Visualización"}
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant={renderMode === "standard" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRenderMode("standard")}
                    className="text-xs"
                  >
                    🎨 {t.editor.standard || "Normal"}
                  </Button>
                  <Button
                    variant={renderMode === "autocad" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRenderMode("autocad")}
                    className="text-xs"
                  >
                    ✨ {t.editor.autocad || "Render"}
                  </Button>
                  <Button
                    variant={renderMode === "revit" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRenderMode("revit")}
                    className="text-xs"
                  >
                    📐 {t.editor.revit || "Técnico"}
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="canvas-3d-container p-0 glass-effect border-primary/30 overflow-hidden h-[600px] relative animate-fade-in">
              <Canvas3D 
                selectedZone={selectedZone} 
                onZoneSelect={setSelectedZone}
                duplicateZones={getDuplicateZones()}
                renderMode={renderMode}
              />

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

            {/* Panel de Información Detallada - Solo para ROOTs */}
            {selectedZone && selectedZone !== "trunk" && (
              <Card className="area-selector p-6 glass-effect border-secondary/30 animate-fade-in">
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
                          {t.editor.rootFunction}
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
                                    <span>{t.editor.areas[area]}</span>
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
                            {t.editor.areaDescriptions[areaAssignments[selectedZone]]}
                          </p>
                        </div>
                      </div>

                      {getDuplicateAreas().length > 0 && (
                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-yellow-500">
                              {t.editor.warning} {t.editor.duplicateWarning} ({getDuplicateAreas().map(a => t.editor.areas[a]).join(", ")}). 
                              {t.editor.mustCorrect}
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
            <Card className="zone-selector p-6 glass-effect border-secondary/30">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  {t.editor.selectZone}
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
                                {t.editor.areas[area]}
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
              <Card className="texture-selector p-6 glass-effect border-primary/30 animate-fade-in">
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {t.editor.customization}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">
                      {t.editor.texture}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "Metálica", icon: "🔩", color: "from-gray-400 to-gray-600" },
                        { name: "Mate", icon: "⚪", color: "from-gray-300 to-gray-400" },
                        { name: "Madera", icon: "🪵", color: "from-amber-700 to-amber-900" },
                        { name: "Tejido", icon: "🧵", color: "from-blue-400 to-blue-600" }
                      ].map((texture) => (
                        <Button
                          key={texture.name}
                          variant={selectedTexture === texture.name ? "default" : "outline"}
                          className={cn(
                            "h-20 flex flex-col items-center justify-center gap-2",
                            selectedTexture === texture.name 
                              ? `bg-gradient-to-br ${texture.color} text-white` 
                              : "border-border/50 hover:bg-secondary/10"
                          )}
                          onClick={() => handleTextureChange(selectedZone, texture.name)}
                        >
                          <span className="text-2xl">{texture.icon}</span>
                          <span className="text-xs font-medium">{texture.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <Card className="export-panel p-6 glass-effect border-border/30">
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Exportar Configuración
                </h3>
                
                {getDuplicateZones().length > 0 && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-500">
                        <strong>{t.editor.cannotExport}:</strong> {t.editor.duplicateAreasError}
                      </p>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={generatePDF}
                  disabled={getDuplicateZones().length > 0}
                  className={cn(
                    "w-full font-semibold mb-4 flex items-center justify-center gap-2",
                    getDuplicateZones().length > 0
                      ? "bg-gray-400 cursor-not-allowed opacity-50"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                >
                  <Download className="w-4 h-4" />
                  Descargar PDF
                </Button>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartir en Redes Sociales
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      disabled={getDuplicateZones().length > 0}
                      onClick={() => handleShare('whatsapp')}
                      className={cn(
                        "border-border/50 flex items-center justify-center gap-2",
                        getDuplicateZones().length > 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-500/10"
                      )}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </Button>
                    
                    <Button
                      variant="outline"
                      disabled={getDuplicateZones().length > 0}
                      onClick={() => handleShare('twitter')}
                      className={cn(
                        "border-border/50 flex items-center justify-center gap-2",
                        getDuplicateZones().length > 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-500/10"
                      )}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter/X
                    </Button>
                    
                    <Button
                      variant="outline"
                      disabled={getDuplicateZones().length > 0}
                      onClick={() => handleShare('facebook')}
                      className={cn(
                        "border-border/50 flex items-center justify-center gap-2",
                        getDuplicateZones().length > 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-600/10"
                      )}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                    
                    <Button
                      variant="outline"
                      disabled={getDuplicateZones().length > 0}
                      onClick={() => handleShare('linkedin')}
                      className={cn(
                        "border-border/50 flex items-center justify-center gap-2",
                        getDuplicateZones().length > 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700/10"
                      )}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    disabled={getDuplicateZones().length > 0}
                    onClick={() => handleShare('instagram')}
                    className={cn(
                      "w-full mt-2 border-border/50 flex items-center justify-center gap-2",
                      getDuplicateZones().length > 0
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-pink-500/10"
                    )}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                    Copiar para Instagram
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
                <span>Explora el modelo 3D rotándolo con el mouse y cambia entre modos de visualización</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">2</span>
                <span>Selecciona una zona (ROOT 1-5) y asígnale una función específica</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">3</span>
                <span>Personaliza la textura de cada zona para darle tu toque único</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">4</span>
                <span>Descarga tu diseño completo en PDF o compártelo en redes sociales</span>
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
