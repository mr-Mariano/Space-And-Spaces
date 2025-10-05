/**
 * ============================================================================
 * HABITAT PAGE - Technical Documentation & Zone Details
 * ============================================================================
 * 
 * AI DEVELOPMENT DISCLOSURE:
 * This technical documentation page showcases the habitat zones with
 * interactive carousel, developed primarily with AI assistance.
 * 
 * AI Tools Used:
 * - Lovable (GPT Engineer): Page layout and carousel structure (~80%)
 * - Cursor AI Editor: Card designs and responsive grid (~15%)
 * - GitHub Copilot: Image imports and data mapping (~5%)
 * 
 * Human Intervention:
 * - Technical content organization (TRUNK + 5 ROOT modules)
 * - Image curation for each zone
 * - Carousel UX decisions
 * - Zone color gradients selection
 * 
 * Technologies:
 * - React 18.3.1 + TypeScript
 * - Embla Carousel React v8.6.0
 * - Tailwind CSS (gradients, glassmorphism)
 * - Lucide React (zone icons)
 * 
 * Content Structure:
 * - TRUNK (central core) detailed card
 * - 5 ROOT zones in interactive carousel:
 *   * ROOT 1: Operations (Control, Comms, Maintenance)
 *   * ROOT 2: Health & Fitness (Gym, Hygiene, Medical)
 *   * ROOT 3: Rest (Bedrooms, Dressing, Storage)
 *   * ROOT 4: Food & Resources (Kitchen, Dining, Stores)
 *   * ROOT 5: Research (Lab, Greenhouse)
 * - Each zone has image, description, and feature list
 * 
 * Complexity: MEDIUM-HIGH
 * Lines of code: 199
 * 
 * Estimated Development Time:
 * - With AI assistance: 4-5 hours
 * - Without AI: 5-7 business days
 * ============================================================================
 */

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
  Check
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import root1Operations from "@/assets/root1-operations.jpg";
import root2Wellbeing from "@/assets/root2-wellbeing.jpg";
import root3Rest from "@/assets/root3-rest.jpg";
import root4Food from "@/assets/root4-food.jpg";
import root5Research from "@/assets/root5-research.jpg";

const Habitat = () => {
  const { t } = useLanguage();

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
                </div>
              </div>
            </div>
          </Card>

          {/* ROOT Areas Carousel */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center text-foreground">
              {t.docs.rootAreasTitle || 'Áreas Modulares (ROOTs)'}
            </h2>
            
            <Carousel
              opts={{
                align: "center",
                loop: true,
                containScroll: "trimSnaps",
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {rootAreas.map((root) => {
                  const Icon = root.icon;
                  return (
                    <CarouselItem key={root.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-2/5">
                      <div className="transition-all duration-300 hover:scale-[1.03]">
                        <Card className="glass-effect border-primary/30 overflow-hidden backdrop-blur-xl shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all">
                          <div className="relative h-[180px] md:h-[200px]">
                            <img 
                              src={root.image} 
                              alt={root.name}
                              className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${root.color} opacity-25`} />
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background via-background/85 to-transparent backdrop-blur-md">
                              <div className="flex items-center gap-3">
                                <div className={`p-2.5 md:p-3 rounded-full bg-gradient-to-br ${root.color} shadow-lg`}>
                                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-foreground">{root.name}</h3>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 md:p-4">
                            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
                              {root.description}
                            </p>
                            
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold text-foreground mb-2">
                                {t.docs.includes || 'Incluye:'}
                              </h4>
                              <ul className="space-y-1">
                                {root.includes.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="line-clamp-1">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 bg-background/90 backdrop-blur-sm hover:bg-background border-primary/30 hover:border-primary/50 shadow-lg" />
              <CarouselNext className="hidden md:flex -right-12 lg:-right-16 bg-background/90 backdrop-blur-sm hover:bg-background border-primary/30 hover:border-primary/50 shadow-lg" />
            </Carousel>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Habitat;
