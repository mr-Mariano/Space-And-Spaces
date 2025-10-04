import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Rocket, Leaf, Users, Zap, Building2, Sprout } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Building2,
      title: "Arquitectura Modular",
      description: "Sistema ROOT expansible que crece según las necesidades de la misión",
    },
    {
      icon: Users,
      title: "Diseñado para 4 Astronautas",
      description: "Espacios optimizados para el bienestar psicológico y físico del equipo",
    },
    {
      icon: Leaf,
      title: "Autosustentable",
      description: "Primer sistema completo de soporte vital independiente en Marte",
    },
    {
      icon: Zap,
      title: "Tecnología Avanzada",
      description: "Integración de sistemas de última generación para máxima eficiencia",
    },
  ];

  const roots = [
    { name: "TRUNK", desc: "Núcleo Central", color: "from-primary to-primary-glow" },
    { name: "ROOT 1", desc: "Operativa", color: "from-secondary to-primary" },
    { name: "ROOT 2", desc: "Bienestar", color: "from-primary to-secondary" },
    { name: "ROOT 3", desc: "Descanso", color: "from-secondary to-primary" },
    { name: "ROOT 4", desc: "Recursos", color: "from-primary to-secondary" },
    { name: "ROOT 5", desc: "Investigación", color: "from-secondary to-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(175,76,15,0.1),transparent_50%)]" />
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/30">
              <Sprout className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Plantando Vida en Marte
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
                EDEN TREE
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-primary">
                Hábitat Espacial Modular
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Diseña el futuro de la vida humana en Marte. Un sistema de soporte vital 
              completo y autosustentable donde hasta 4 astronautas pueden sentirse en casa.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/editor">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 shadow-[0_0_30px_rgba(175,76,15,0.4)] hover:shadow-[0_0_40px_rgba(175,76,15,0.6)] transition-all"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Diseña tu Hábitat
                </Button>
              </Link>
              <Link to="/docs">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 text-foreground font-semibold text-lg px-8"
                >
                  Explorar Documentación
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Element - Tree Structure */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="relative">
              {/* Trunk */}
              <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_40px_rgba(175,76,15,0.4)] animate-glow">
                <span className="font-bold text-background text-lg">TRUNK</span>
              </div>
              
              {/* Roots spreading out */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                {roots.slice(1).map((root, idx) => (
                  <div 
                    key={root.name}
                    className="flex flex-col items-center gap-2 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${root.color} flex items-center justify-center shadow-lg`}>
                      <span className="font-bold text-background text-sm">{root.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{root.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Sistema Completo de Vida
            </h2>
            <p className="text-lg text-muted-foreground">
              EDEN TREE integra tecnología avanzada con diseño centrado en el ser humano
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="p-6 glass-effect border-primary/20 hover-lift animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect rounded-2xl p-8 md:p-12 border border-primary/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/20">
                  <Sprout className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    La Metáfora del Árbol
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Como un árbol que planta sus raíces profundamente en tierra fértil, 
                    EDEN TREE establece las bases permanentes de la vida humana en Marte.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">EDEN:</strong> El hábitat ideal donde la humanidad puede prosperar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">TREE:</strong> Arquitectura modular - raíces (ROOT), tronco (TRUNK), y capacidad de crecimiento</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">Misión:</strong> Crear espacios donde los astronautas se sientan verdaderamente en casa</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-primary/10 to-background">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Comienza a Diseñar el Futuro
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explora el editor 3D interactivo y personaliza cada zona del hábitat EDEN TREE
          </p>
          <Link to="/editor">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-10 shadow-[0_0_30px_rgba(175,76,15,0.4)] hover:shadow-[0_0_40px_rgba(175,76,15,0.6)] transition-all"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Abrir Editor 3D
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
