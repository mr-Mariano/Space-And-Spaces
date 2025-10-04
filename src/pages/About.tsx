import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Sprout, Target, Heart, Users, Rocket, Leaf } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/30 mb-6">
              <Sprout className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Acerca del Proyecto</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                EDEN TREE
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Plantando las bases permanentes de vida humana en Marte
            </p>
          </div>

          {/* Mission Card */}
          <Card className="p-8 md:p-12 glass-effect border-primary/30 mb-8 animate-slide-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-full bg-primary/20">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Propósito</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  EDEN TREE es más que un hábitat espacial: es el primer sistema completo de soporte 
                  de vida autosustentable diseñado para Marte. Nuestro objetivo es crear un hogar donde 
                  hasta 4 astronautas no solo sobrevivan, sino que prosperen física y psicológicamente 
                  en el planeta rojo.
                </p>
              </div>
            </div>
          </Card>

          {/* Tree Metaphor */}
          <Card className="p-8 md:p-12 glass-effect border-secondary/30 mb-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-full bg-secondary/20">
                <Leaf className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">La Metáfora del Árbol</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Como un árbol que planta sus raíces en suelo fértil para crecer y dar vida, 
                    EDEN TREE establece las fundaciones de la civilización humana en Marte:
                  </p>
                  
                  <div className="space-y-3 pl-4 border-l-2 border-primary/30">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">EDEN - El Jardín Ideal</h3>
                      <p>Representa el hábitat perfecto donde la humanidad puede prosperar, 
                      incluso en las condiciones más extremas del espacio.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">TREE - Estructura Orgánica</h3>
                      <p>La arquitectura modular imita un árbol viviente:</p>
                      <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                        <li><strong className="text-secondary">TRUNK (Tronco):</strong> El núcleo central que conecta todo</li>
                        <li><strong className="text-secondary">ROOT (Raíces):</strong> Módulos especializados que se extienden del centro</li>
                        <li><strong className="text-secondary">Crecimiento:</strong> Capacidad de expansión según las necesidades</li>
                      </ul>
                    </div>
                  </div>

                  <p className="leading-relaxed pt-2">
                    Esta metáfora comunica inmediatamente nuestra visión: <strong className="text-foreground">
                    "Estamos plantando las bases permanentes de vida humana en Marte."</strong>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Wellbeing Focus */}
          <Card className="p-8 md:p-12 glass-effect border-primary/30 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-full bg-primary/20">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Bienestar Psicológico</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  La distancia entre la Tierra y Marte puede variar entre 54.6 millones y 401 millones 
                  de kilómetros. En este aislamiento extremo, el diseño del hábitat se convierte en un 
                  factor crítico para la salud mental de la tripulación.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  EDEN TREE integra espacios de recreación, zonas privadas, áreas sociales y un invernadero 
                  para crear un ambiente donde los astronautas puedan sentirse verdaderamente <em>en casa</em>, 
                  no solo supervivientes en un ambiente hostil.
                </p>
              </div>
            </div>
          </Card>

          {/* Capacity */}
          <Card className="p-8 md:p-12 glass-effect border-secondary/30 mb-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-full bg-secondary/20">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Capacidad y Diseño</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-foreground">Capacidad máxima:</strong> 4 astronautas
                  </p>
                  <p className="leading-relaxed">
                    El hábitat está diseñado específicamente para misiones de tamaño reducido, 
                    optimizando el balance entre eficiencia de recursos y espacio vital. Cada módulo 
                    ROOT está pensado para maximizar la funcionalidad sin comprometer la comodidad.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h3 className="font-semibold text-foreground mb-2">5 Módulos ROOT</h3>
                      <p className="text-sm">Áreas especializadas para todas las necesidades de la misión</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <h3 className="font-semibold text-foreground mb-2">1 Núcleo TRUNK</h3>
                      <p className="text-sm">Centro de operaciones y área común principal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Vision */}
          <Card className="p-8 md:p-12 glass-effect border-primary/30 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-full bg-primary/20">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Visión del Futuro</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  EDEN TREE no es solo un prototipo: es el modelo fundacional para la expansión humana 
                  en el sistema solar. Su diseño modular permite:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl">•</span>
                    <span>Expansión progresiva según crezcan las necesidades de la colonia</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl">•</span>
                    <span>Adaptación a diferentes condiciones planetarias</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl">•</span>
                    <span>Autosuficiencia energética y de recursos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl">•</span>
                    <span>Integración de nuevas tecnologías sin reconstrucción completa</span>
                  </li>
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

export default About;
