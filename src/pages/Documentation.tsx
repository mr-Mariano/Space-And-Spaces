import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Radio, 
  Heart, 
  Bed, 
  Utensils, 
  Microscope,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { Button } from "@/components/ui/button";
import root1Operations from "@/assets/root1-operations.jpg";
import root2Wellbeing from "@/assets/root2-wellbeing.jpg";
import root3Rest from "@/assets/root3-rest.jpg";
import root4Food from "@/assets/root4-food.jpg";
import root5Research from "@/assets/root5-research.jpg";

const Documentation = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const rootAreas = [
    {
      id: "root1",
      name: t.docs.zones.root1.name,
      icon: Radio,
      color: "from-blue-500 to-blue-600",
      image: root1Operations,
      description: t.docs.zones.root1.desc,
      includes: [t.docs.zones.root1.control, t.docs.zones.root1.comms, t.docs.zones.root1.maintenance],
    },
    {
      id: "root2",
      name: t.docs.zones.root2.name,
      icon: Heart,
      color: "from-red-500 to-red-600",
      image: root2Wellbeing,
      description: t.docs.zones.root2.desc,
      includes: [t.docs.zones.root2.gym, t.docs.zones.root2.hygiene, t.docs.zones.root2.medical],
    },
    {
      id: "root3",
      name: t.docs.zones.root3.name,
      icon: Bed,
      color: "from-purple-500 to-purple-600",
      image: root3Rest,
      description: t.docs.zones.root3.desc,
      includes: [t.docs.zones.root3.bedrooms, t.docs.zones.root3.dressing, t.docs.zones.root3.storage],
    },
    {
      id: "root4",
      name: t.docs.zones.root4.name,
      icon: Utensils,
      color: "from-yellow-500 to-yellow-600",
      image: root4Food,
      description: t.docs.zones.root4.desc,
      includes: [t.docs.zones.root4.kitchen, t.docs.zones.root4.dining, t.docs.zones.root4.stores],
    },
    {
      id: "root5",
      name: t.docs.zones.root5.name,
      icon: Microscope,
      color: "from-green-500 to-green-600",
      image: root5Research,
      description: t.docs.zones.root5.desc,
      includes: [t.docs.zones.root5.lab, t.docs.zones.root5.greenhouse],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {t.docs.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.docs.subtitle}
            </p>
          </div>

          {/* TRUNK Section */}
          <Card className="p-8 md:p-12 glass-effect border-primary/30 mb-12 animate-fade-in">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-4 rounded-full bg-primary/20">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  {t.docs.zones.trunk.name}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.docs.zones.trunk.desc}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                    <h3 className="font-semibold text-foreground mb-2">{t.docs.zones.trunk.airlock}</h3>
                    <p className="text-sm text-muted-foreground">{t.docs.zones.trunk.airlockDesc}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                    <h3 className="font-semibold text-foreground mb-2">{t.docs.zones.trunk.eva}</h3>
                    <p className="text-sm text-muted-foreground">{t.docs.zones.trunk.evaDesc}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                    <h3 className="font-semibold text-foreground mb-2">{t.docs.zones.trunk.common}</h3>
                    <p className="text-sm text-muted-foreground">{t.docs.zones.trunk.commonDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* ROOT Areas Carousel */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-8 text-center text-foreground">
              {t.docs.rootAreasTitle || 'Áreas Modulares (ROOTs)'}
            </h2>
            
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {rootAreas.map((root) => {
                    const Icon = root.icon;
                    return (
                      <div key={root.id} className="flex-[0_0_100%] min-w-0 px-4">
                        <Card className="glass-effect border-primary/30 overflow-hidden">
                          <div className="relative h-[400px]">
                            <img 
                              src={root.image} 
                              alt={root.name}
                              className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${root.color} opacity-20`} />
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 to-transparent">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`p-3 rounded-full bg-gradient-to-br ${root.color}`}>
                                  <Icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{root.name}</h3>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                              {root.description}
                            </p>
                            
                            <div className="space-y-2">
                              <h4 className="font-semibold text-foreground mb-3">
                                {t.docs.includes || 'Incluye:'}
                              </h4>
                              <ul className="space-y-2">
                                {root.includes.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                    <span className="text-primary font-bold mt-1">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={scrollNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;
