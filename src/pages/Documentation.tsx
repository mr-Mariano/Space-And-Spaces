import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Radio, 
  Heart, 
  Bed, 
  Utensils, 
  Microscope,
  Shield,
  Cpu
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Documentation = () => {
  const { t } = useLanguage();
  
  const zones = [
    {
      id: "trunk",
      name: t.docs.zones.trunk.name,
      icon: Building2,
      color: "primary",
      description: t.docs.zones.trunk.desc,
      areas: [
        {
          name: t.docs.zones.trunk.airlock,
          details: t.docs.zones.trunk.airlockDesc,
        },
        {
          name: t.docs.zones.trunk.eva,
          details: t.docs.zones.trunk.evaDesc,
        },
        {
          name: t.docs.zones.trunk.common,
          details: t.docs.zones.trunk.commonDesc,
        },
        {
          name: t.docs.zones.trunk.recreation,
          details: t.docs.zones.trunk.recreationDesc,
        },
      ],
    },
    {
      id: "root1",
      name: t.docs.zones.root1.name,
      icon: Radio,
      color: "secondary",
      description: t.docs.zones.root1.desc,
      areas: [
        {
          name: t.docs.zones.root1.control,
          details: t.docs.zones.root1.controlDesc,
        },
        {
          name: t.docs.zones.root1.comms,
          details: t.docs.zones.root1.commsDesc,
        },
        {
          name: t.docs.zones.root1.maintenance,
          details: t.docs.zones.root1.maintenanceDesc,
        },
      ],
    },
    {
      id: "root2",
      name: t.docs.zones.root2.name,
      icon: Heart,
      color: "primary",
      description: t.docs.zones.root2.desc,
      areas: [
        {
          name: t.docs.zones.root2.gym,
          details: t.docs.zones.root2.gymDesc,
        },
        {
          name: t.docs.zones.root2.hygiene,
          details: t.docs.zones.root2.hygieneDesc,
        },
        {
          name: t.docs.zones.root2.medical,
          details: t.docs.zones.root2.medicalDesc,
        },
      ],
    },
    {
      id: "root3",
      name: t.docs.zones.root3.name,
      icon: Bed,
      color: "secondary",
      description: t.docs.zones.root3.desc,
      areas: [
        {
          name: t.docs.zones.root3.bedrooms,
          details: t.docs.zones.root3.bedroomsDesc,
        },
        {
          name: t.docs.zones.root3.dressing,
          details: t.docs.zones.root3.dressingDesc,
        },
        {
          name: t.docs.zones.root3.storage,
          details: t.docs.zones.root3.storageDesc,
        },
      ],
    },
    {
      id: "root4",
      name: t.docs.zones.root4.name,
      icon: Utensils,
      color: "primary",
      description: t.docs.zones.root4.desc,
      areas: [
        {
          name: t.docs.zones.root4.kitchen,
          details: t.docs.zones.root4.kitchenDesc,
        },
        {
          name: t.docs.zones.root4.dining,
          details: t.docs.zones.root4.diningDesc,
        },
        {
          name: t.docs.zones.root4.stores,
          details: t.docs.zones.root4.storesDesc,
        },
      ],
    },
    {
      id: "root5",
      name: t.docs.zones.root5.name,
      icon: Microscope,
      color: "secondary",
      description: t.docs.zones.root5.desc,
      areas: [
        {
          name: t.docs.zones.root5.lab,
          details: t.docs.zones.root5.labDesc,
        },
        {
          name: t.docs.zones.root5.greenhouse,
          details: t.docs.zones.root5.greenhouseDesc,
        },
      ],
    },
  ];

  const getIconColor = (color: string) => {
    return color === "primary" ? "text-primary" : "text-secondary";
  };

  const getBgColor = (color: string) => {
    return color === "primary" ? "bg-primary/20" : "bg-secondary/20";
  };

  const getBorderColor = (color: string) => {
    return color === "primary" ? "border-primary/20" : "border-secondary/20";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {t.docs.title}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.docs.subtitle}
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 glass-effect border-primary/20 text-center hover-lift">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-2">{t.docs.overview.zones}</h3>
              <p className="text-muted-foreground">{t.docs.overview.zonesDesc}</p>
            </Card>
            <Card className="p-6 glass-effect border-secondary/20 text-center hover-lift">
              <Shield className="h-12 w-12 text-secondary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-2">{t.docs.overview.crew}</h3>
              <p className="text-muted-foreground">{t.docs.overview.crewDesc}</p>
            </Card>
            <Card className="p-6 glass-effect border-primary/20 text-center hover-lift">
              <Cpu className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-2">{t.docs.overview.sustainable}</h3>
              <p className="text-muted-foreground">{t.docs.overview.sustainableDesc}</p>
            </Card>
          </div>

          {/* Detailed Zones */}
          <Tabs defaultValue="trunk" className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full glass-effect h-auto p-2 gap-2">
              {zones.map((zone) => {
                const Icon = zone.icon;
                return (
                  <TabsTrigger 
                    key={zone.id} 
                    value={zone.id}
                    className={`flex flex-col items-center gap-2 py-3 data-[state=active]:${getBgColor(zone.color)}`}
                  >
                    <Icon className={`h-5 w-5 ${getIconColor(zone.color)}`} />
                    <span className="text-xs font-medium">{zone.name.split(' - ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {zones.map((zone) => {
              const Icon = zone.icon;
              return (
                <TabsContent key={zone.id} value={zone.id} className="animate-fade-in">
                  <Card className={`p-8 md:p-12 glass-effect ${getBorderColor(zone.color)}`}>
                    <div className="flex items-start gap-4 mb-8">
                      <div className={`p-4 rounded-full ${getBgColor(zone.color)} flex-shrink-0`}>
                        <Icon className={`h-10 w-10 ${getIconColor(zone.color)}`} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-3 text-foreground">
                          {zone.name}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {zone.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {zone.areas.map((area, idx) => (
                        <div 
                          key={idx}
                          className="p-6 rounded-lg bg-card/50 border border-border/50 hover-lift"
                        >
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {area.name}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {area.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>

          {/* Technical Specs Summary */}
          <Card className="mt-16 p-8 glass-effect border-primary/20 animate-slide-up">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              {t.docs.techSpecs.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{t.docs.techSpecs.lifesupport}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• {t.docs.techSpecs.water}</li>
                  <li>• {t.docs.techSpecs.oxygen}</li>
                  <li>• {t.docs.techSpecs.temp}</li>
                  <li>• {t.docs.techSpecs.pressure}</li>
                  <li>• {t.docs.techSpecs.gravity}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{t.docs.techSpecs.energy}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• {t.docs.techSpecs.primary}</li>
                  <li>• {t.docs.techSpecs.backup}</li>
                  <li>• {t.docs.techSpecs.consumption}</li>
                  <li>• {t.docs.techSpecs.waterStored}</li>
                  <li>• {t.docs.techSpecs.food}</li>
                </ul>
              </div>
            </div>
          </Card>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;
