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
  Cpu,
  Dumbbell,
  ChefHat,
  FlaskConical
} from "lucide-react";

const Documentation = () => {
  const zones = [
    {
      id: "trunk",
      name: "TRUNK - Núcleo Central",
      icon: Building2,
      color: "primary",
      description: "El corazón del hábitat EDEN TREE. Como el tronco de un árbol, conecta todos los módulos ROOT y sirve como centro de vida social y operaciones.",
      areas: [
        {
          name: "Airlock Principal",
          details: "Entrada/salida segura con sistema de presurización y descontaminación. Capacidad para 2 astronautas simultáneos.",
        },
        {
          name: "EVA Support",
          details: "Almacenamiento para 4 trajes espaciales con sistemas de mantenimiento y carga. Incluye estación de inspección pre-misión.",
        },
        {
          name: "Sala Común",
          details: "Espacio central de convivencia con capacidad para 4 personas. Área multipropósito para reuniones, comidas sociales y descanso.",
        },
        {
          name: "Zona de Recreación",
          details: "Área de ocio con pantallas multimedia, biblioteca digital y juegos. Esencial para el bienestar psicológico.",
        },
      ],
    },
    {
      id: "root1",
      name: "ROOT 1 - Operativa",
      icon: Radio,
      color: "secondary",
      description: "Centro de comando y control. Desde aquí se coordinan todas las operaciones del hábitat y las misiones extravehiculares.",
      areas: [
        {
          name: "Centro de Control",
          details: "Estación de monitoreo de sistemas vitales del hábitat: energía, aire, agua, temperatura. Sistemas redundantes para máxima seguridad.",
        },
        {
          name: "Comunicaciones",
          details: "Equipos para comunicación con la Tierra (delay 4-24 min). Antenas de alta ganancia y sistemas de respaldo. Incluye centro de procesamiento de datos científicos.",
        },
        {
          name: "Sala de Mantenimiento",
          details: "Taller con herramientas especializadas, impresora 3D para piezas de repuesto, y almacén de componentes críticos.",
        },
      ],
    },
    {
      id: "root2",
      name: "ROOT 2 - Bienestar",
      icon: Heart,
      color: "primary",
      description: "Dedicado a la salud física y mental de la tripulación. Uno de los módulos más críticos para misiones de larga duración.",
      areas: [
        {
          name: "Gimnasio",
          details: "Equipo de resistencia para contrarrestar pérdida muscular por gravedad reducida. Esencial para mantener densidad ósea (mínimo 2h/día/persona).",
        },
        {
          name: "Área de Higiene",
          details: "Sistema de duchas con reciclaje de agua (95% recuperación). Sanitarios con procesamiento de desechos. Área de aseo personal.",
        },
        {
          name: "Enfermería",
          details: "Equipamiento médico completo: diagnóstico, cirugía menor, farmacia. Incluye sistemas de telemedicina con especialistas en Tierra.",
        },
      ],
    },
    {
      id: "root3",
      name: "ROOT 3 - Descanso",
      icon: Bed,
      color: "secondary",
      description: "Espacios privados para descanso y almacenamiento personal. El refugio íntimo de cada astronauta.",
      areas: [
        {
          name: "Dormitorios (x4)",
          details: "Habitaciones individuales de 8m³ cada una. Incluyen: cama adaptada, espacio de trabajo personal, iluminación regulable que simula ciclos día/noche terrestres.",
        },
        {
          name: "Vestidores",
          details: "Áreas personales con almacenamiento para ropa y efectos personales. Sistema de lavandería compartida.",
        },
        {
          name: "Almacenamiento Personal",
          details: "Casilleros individuales para objetos de valor sentimental y equipamiento personal (límite de masa por astronauta).",
        },
      ],
    },
    {
      id: "root4",
      name: "ROOT 4 - Comida y Recursos",
      icon: Utensils,
      color: "primary",
      description: "Sustento alimentario y gestión de recursos. Combina alimentos deshidratados con producción local del invernadero.",
      areas: [
        {
          name: "Cocina",
          details: "Estación de preparación de alimentos con sistemas de calentamiento, rehidratación e higiene. Diseñada para gravedad reducida.",
        },
        {
          name: "Comedor",
          details: "Mesa común para 4 personas. Fomenta la cohesión social mediante comidas grupales diarias.",
        },
        {
          name: "Almacenes",
          details: "Depósitos de alimentos deshidratados (suministro 18 meses), agua de emergencia, suministros generales y equipamiento de reserva.",
        },
      ],
    },
    {
      id: "root5",
      name: "ROOT 5 - Investigación",
      icon: Microscope,
      color: "secondary",
      description: "Corazón científico de la misión. Donde se estudia Marte y se desarrollan tecnologías de supervivencia.",
      areas: [
        {
          name: "Laboratorio Científico",
          details: "Equipamiento para análisis geológico, biológico y químico de muestras marcianas. Incluye microscopios, espectrógrafos y centrifugadoras adaptadas.",
        },
        {
          name: "Invernadero/Biolab",
          details: "Cultivo de vegetales frescos (lechugas, tomates, hierbas) bajo luz LED. Vital para nutrición, reciclaje de CO₂ y bienestar psicológico. Sistema hidropónico cerrado.",
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
    return color === "primary" ? "border-primary/30" : "border-secondary/30";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Documentación
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Guía completa de las zonas del hábitat EDEN TREE y sus especificaciones técnicas
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 glass-effect border-primary/30 text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-2">6 Zonas</h3>
              <p className="text-muted-foreground">1 TRUNK + 5 ROOT modules</p>
            </Card>
            <Card className="p-6 glass-effect border-secondary/30 text-center">
              <Shield className="h-12 w-12 text-secondary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-2">4 Astronautas</h3>
              <p className="text-muted-foreground">Capacidad máxima óptima</p>
            </Card>
            <Card className="p-6 glass-effect border-primary/30 text-center">
              <Cpu className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Autosustentable</h3>
              <p className="text-muted-foreground">Sistema cerrado de vida</p>
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
                      <div className={`p-4 rounded-full ${getBgColor(zone.color)}`}>
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
          <Card className="mt-12 p-8 glass-effect border-primary/30 animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Especificaciones Técnicas Generales
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Sistemas de Soporte Vital</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Reciclaje de agua: 95% eficiencia</li>
                  <li>• Generación de oxígeno: Electrólisis del agua</li>
                  <li>• Temperatura: 18-24°C regulada</li>
                  <li>• Presión: 1 atm (101.3 kPa)</li>
                  <li>• Gravedad: 0.38g (Marte)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Energía y Recursos</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Fuente primaria: Paneles solares + baterías</li>
                  <li>• Backup: Reactor nuclear pequeño (opcional)</li>
                  <li>• Consumo diario: ~50 kWh</li>
                  <li>• Agua almacenada: 6 meses de reserva</li>
                  <li>• Alimentos: 18 meses de suministro</li>
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
