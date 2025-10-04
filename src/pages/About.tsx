import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Sprout, Target, Heart, Users, Rocket, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/30 mb-6">
              <Sprout className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{t.about.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {t.about.title}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>

          {/* Mission Card */}
          <Card className="p-8 md:p-12 glass-effect border-primary/20 mb-8 animate-slide-up">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/20 flex-shrink-0">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{t.about.purpose.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.purpose.description}
                </p>
              </div>
            </div>
          </Card>

          {/* Tree Metaphor */}
          <Card className="p-8 md:p-12 glass-effect border-secondary/20 mb-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-secondary/20 flex-shrink-0">
                <Leaf className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{t.about.metaphor.title}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed text-lg">
                    {t.about.metaphor.intro}
                  </p>
                  
                  <div className="space-y-4 pl-4 border-l-2 border-primary/30">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 text-lg">{t.about.metaphor.eden}</h3>
                      <p className="leading-relaxed">{t.about.metaphor.edenDesc}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 text-lg">{t.about.metaphor.tree}</h3>
                      <p className="leading-relaxed mb-3">{t.about.metaphor.treeDesc}</p>
                      <ul className="list-none ml-4 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-secondary font-bold">•</span>
                          <span><strong className="text-secondary">{t.about.metaphor.trunk}</strong> {t.about.metaphor.trunkDesc}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary font-bold">•</span>
                          <span><strong className="text-secondary">{t.about.metaphor.root}</strong> {t.about.metaphor.rootDesc}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary font-bold">•</span>
                          <span><strong className="text-secondary">{t.about.metaphor.growth}</strong> {t.about.metaphor.growthDesc}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="leading-relaxed pt-2 text-lg">
                    {t.about.metaphor.vision} <strong className="text-foreground">
                    {t.about.metaphor.visionQuote}</strong>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Wellbeing Focus */}
          <Card className="p-8 md:p-12 glass-effect border-primary/20 mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/20 flex-shrink-0">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{t.about.wellbeing.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {t.about.wellbeing.p1}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.wellbeing.p2}
                </p>
              </div>
            </div>
          </Card>

          {/* Capacity */}
          <Card className="p-8 md:p-12 glass-effect border-secondary/20 mb-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-secondary/20 flex-shrink-0">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{t.about.capacity.title}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    <strong className="text-foreground">{t.about.capacity.max}</strong> {t.about.capacity.maxValue}
                  </p>
                  <p className="leading-relaxed">
                    {t.about.capacity.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50 hover-lift">
                      <h3 className="font-semibold text-foreground mb-2">{t.about.capacity.modules}</h3>
                      <p className="text-sm">{t.about.capacity.modulesDesc}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50 hover-lift">
                      <h3 className="font-semibold text-foreground mb-2">{t.about.capacity.trunk}</h3>
                      <p className="text-sm">{t.about.capacity.trunkDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Vision */}
          <Card className="p-8 md:p-12 glass-effect border-primary/20 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/20 flex-shrink-0">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{t.about.vision.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t.about.vision.intro}
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl flex-shrink-0">•</span>
                    <span className="leading-relaxed">{t.about.vision.expansion}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl flex-shrink-0">•</span>
                    <span className="leading-relaxed">{t.about.vision.adaptation}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl flex-shrink-0">•</span>
                    <span className="leading-relaxed">{t.about.vision.selfsufficiency}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold text-xl flex-shrink-0">•</span>
                    <span className="leading-relaxed">{t.about.vision.integration}</span>
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
