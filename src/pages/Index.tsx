import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Rocket, Leaf, Users, Zap, Building2, Sprout } from "lucide-react";
import eden from "@/assets/eden.jpeg";
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
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={eden} 
            alt="Eden Tree System Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_70%)]" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-white/60 bg-black/40 backdrop-blur-sm">
              <Sprout className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_60%)]">
                {t.home.badge}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              <img 
                src={logo2} 
                alt="Eden Tree"
                className="w-64 md:w-96 mx-auto invert-0 dark:invert drop-shadow-2xl"
              />
              <br />
              <span className="text-3xl md:text-5xl text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                {t.home.subtitle}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto drop-shadow-xl [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">
              {t.home.description}
            </p>

            {/* Modern Visual Element */}
            <div className="flex items-center justify-center mt-8 mb-4">
              <div className="flex items-center gap-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                <div className="relative flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-white/90 shadow-lg animate-pulse"></div>
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-white/30 animate-ping"></div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                </div>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/20 animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-white/25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>

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

        </div>
      </section>

      {/* Space & Spaces Information Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-card/20 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/30 mb-6">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {t.home.spaceSpaces.badge}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {t.home.spaceSpaces.title}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center animate-slide-up">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6 border border-primary/20">
                <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  {t.home.spaceSpaces.mission.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.home.spaceSpaces.mission.description}
                </p>
              </div>

              <div className="glass-effect rounded-2xl p-6 border border-secondary/20">
                <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-secondary" />
                  </div>
                  {t.home.spaceSpaces.nasa.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.home.spaceSpaces.nasa.description}
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="glass-effect rounded-2xl p-8 border border-primary/20 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-foreground">
                  {t.home.spaceSpaces.comfort.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {t.home.spaceSpaces.comfort.description}
                </p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-secondary/20 animate-pulse" style={{animationDelay: '1s'}}></div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-foreground">
                    {t.home.philosophy.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    {t.home.philosophy.description}
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>{t.home.philosophy.innovation}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>{t.home.philosophy.customization}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>{t.home.philosophy.sustainability}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid gap-4">
              
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
