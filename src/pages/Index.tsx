import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Rocket, Leaf, Users, Zap, Building2, Sprout } from "lucide-react";
import edenTreeSystem from "@/assets/eden-tree-system.jpg";
import habitatInterior from "@/assets/habitat-interior.jpg";
import greenhouseLife from "@/assets/greenhouse-life.jpg";
import logo2 from "@/assets/logo2.svg";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: Building2,
      title: t.home.features.modular.title,
      description: t.home.features.modular.desc,
    },
    {
      icon: Users,
      title: t.home.features.crew.title,
      description: t.home.features.crew.desc,
    },
    {
      icon: Zap,
      title: t.home.features.tech.title,
      description: t.home.features.tech.desc,
    },
  ];

  const roots = [
    { name: "TRUNK", desc: t.docs.zones.trunk.name.split(' - ')[1] || "Central Core", color: "from-primary to-primary-glow" },
    { name: "ROOT 1", desc: t.docs.zones.root1.name.split(' - ')[1] || "Operations", color: "from-secondary to-primary" },
    { name: "ROOT 2", desc: t.docs.zones.root2.name.split(' - ')[1] || "Health & Fitness", color: "from-primary to-secondary" },
    { name: "ROOT 3", desc: t.docs.zones.root3.name.split(' - ')[1] || "Rest", color: "from-secondary to-primary" },
    { name: "ROOT 4", desc: t.docs.zones.root4.name.split(' - ')[1] || "Resources", color: "from-primary to-secondary" },
    { name: "ROOT 5", desc: t.docs.zones.root5.name.split(' - ')[1] || "Research", color: "from-secondary to-primary" },
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
                {t.home.badge}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <img 
                src={logo2} 
                alt="EDEN TREE"
                className="w-64 md:w-96 mx-auto mb-4"
              />
              <br />
              <span className="text-3xl md:text-5xl text-primary">
                {t.home.subtitle}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {t.home.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/editor">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 shadow-[0_0_30px_rgba(175,76,15,0.4)] hover:shadow-[0_0_40px_rgba(175,76,15,0.6)] transition-all"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  {t.home.ctaDesign}
                </Button>
              </Link>
              <Link to="/habitat">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 text-foreground font-semibold text-lg px-8"
                >
                  {t.home.ctaDocs}
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Element - EDEN TREE System Image */}
          <div className="mt-16 max-w-5xl mx-auto animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
              <img 
                src={edenTreeSystem} 
                alt="EDEN TREE modular habitat system with TRUNK and 5 ROOT modules on Mars surface" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {t.home.featuresTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.home.featuresSubtitle}
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

      {/* Philosophy Section with Images */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="glass-effect rounded-2xl p-8 md:p-12 border border-primary/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/20">
                  <Sprout className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    {t.home.metaphor.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    {t.home.metaphor.description}
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">EDEN:</strong> {t.home.metaphor.eden}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">TREE:</strong> {t.home.metaphor.tree}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">{t.home.metaphor.mission.split(':')[0]}:</strong> {t.home.metaphor.mission.split(':')[1] || t.home.metaphor.mission}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/20 hover-lift">
                <img 
                  src={habitatInterior} 
                  alt="Interior de hábitat EDEN TREE con astronautas en espacio común acogedor" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-primary/20 hover-lift">
                <img 
                  src={greenhouseLife} 
                  alt="Astronauta cuidando plantas en invernadero del hábitat marciano" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-primary/10 to-background">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            {t.home.ctaFinal.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t.home.ctaFinal.description}
          </p>
          <Link to="/editor">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-10 shadow-[0_0_30px_rgba(175,76,15,0.4)] hover:shadow-[0_0_40px_rgba(175,76,15,0.6)] transition-all"
            >
              <Rocket className="mr-2 h-5 w-5" />
              {t.home.ctaFinal.button}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
