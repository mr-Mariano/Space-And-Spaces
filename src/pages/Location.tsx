/**
 * ============================================================================
 * LOCATION PAGE - Gale Crater & Mars Environmental Data
 * ============================================================================
 * 
 * AI DEVELOPMENT DISCLOSURE:
 * This page presents scientific data about Mars and Gale Crater,
 * developed with substantial AI assistance for rapid deployment.
 * 
 * AI Tools Used:
 * - Lovable (GPT Engineer): Page layout and data card structure (~75%)
 * - Cursor AI Editor: Visual effects and hero section (~20%)
 * - GitHub Copilot: Icon and badge integration (~5%)
 * 
 * Human Intervention:
 * - NASA data research and validation
 * - Scientific accuracy review
 * - Content organization (Gale Crater specs, environmental conditions)
 * - Visual hierarchy decisions
 * - External link to NASA resources
 * 
 * Technologies:
 * - React 18.3.1 + TypeScript
 * - Tailwind CSS (responsive cards, gradients)
 * - Lucide React (scientific icons)
 * - Custom UI components (Card, Badge)
 * 
 * Content:
 * - Hero section with Mars imagery
 * - Gale Crater technical specifications
 *   * Coordinates: 5.4°S 137.8°E
 *   * Diameter: ~154 km
 *   * Age: 3.5-3.8 billion years
 * - 4 reasons why Gale Crater was selected
 * - 6 environmental condition cards:
 *   * Atmosphere (95.3% CO₂, 0.6 kPa)
 *   * Temperature (-63°C average, -125°C to +20°C range)
 *   * Radiation (30x Earth levels)
 *   * Gravity (0.38g)
 *   * Dust storms
 *   * Water availability
 * 
 * Complexity: MEDIUM
 * Lines of code: 248
 * 
 * Estimated Development Time:
 * - With AI assistance: 4-5 hours
 * - Without AI: 6-8 business days (including NASA data research)
 * ============================================================================
 */

import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Radio, 
  Thermometer, 
  Radiation, 
  Wind, 
  Droplets,
  Gauge
} from 'lucide-react';
import marsHero from '@/assets/mars-hero.png';
import galeCrater from '@/assets/crater.png';

const Location = () => {
  const { t } = useLanguage();

  const conditions = [
    {
      icon: Radio,
      title: t.location.conditions.atmosphere,
      value: '95.3% CO₂',
      pressure: '0.6 kPa',
      impact: t.location.conditions.atmosphereImpact,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Thermometer,
      title: t.location.conditions.temperature,
      value: '-63°C',
      range: '-125°C to +20°C',
      impact: t.location.conditions.temperatureImpact,
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Radiation,
      title: t.location.conditions.radiation,
      value: '30x Earth',
      detail: t.location.conditions.radiationDetail,
      impact: t.location.conditions.radiationImpact,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: Gauge,
      title: t.location.conditions.gravity,
      value: '0.38g',
      detail: '38% of Earth',
      impact: t.location.conditions.gravityImpact,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Wind,
      title: t.location.conditions.dustStorms,
      value: t.location.conditions.dustStormsFreq,
      duration: t.location.conditions.dustStormsDuration,
      impact: t.location.conditions.dustStormsImpact,
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Droplets,
      title: t.location.conditions.water,
      value: t.location.conditions.waterState,
      availability: t.location.conditions.waterAvail,
      impact: t.location.conditions.waterImpact,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Mars */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={marsHero} 
          alt="Mars Surface" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 animate-fade-in">
            <Badge variant="outline" className="mb-4 glass-effect">
              <MapPin className="h-4 w-4 mr-2" />
              {t.location.badge}
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground">
              {t.location.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.location.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Gale Crater Section */}
      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.location.crater.title}</h2>
            <p className="text-muted-foreground text-lg">{t.location.crater.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Technical Data */}
            <Card className="glass-effect border-primary/30">
              <CardHeader>
                <CardTitle>{t.location.crater.dataTitle}</CardTitle>
                <CardDescription>{t.location.crater.dataDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-semibold">{t.location.crater.coordinates}</span>
                  <span className="text-muted-foreground">5.4°S 137.8°E</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-semibold">{t.location.crater.diameter}</span>
                  <span className="text-muted-foreground">~154 km</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-semibold">{t.location.crater.depth}</span>
                  <span className="text-muted-foreground">~5 km</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-semibold">{t.location.crater.age}</span>
                  <span className="text-muted-foreground">3.5-3.8 {t.location.crater.billion}</span>
                </div>
              </CardContent>
            </Card>

            {/* Selection Reasons */}
            <Card className="glass-effect border-primary/30">
              <CardHeader>
                <CardTitle><a href="https://science.nasa.gov/resource/a-guide-to-gale-crater/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline hover:no-underline transition-all duration-200 cursor-pointer">{t.location.crater.whyTitle}</a></CardTitle>
                <CardDescription>{t.location.crater.whyDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  t.location.crater.reason1,
                  t.location.crater.reason2,
                  t.location.crater.reason3,
                  t.location.crater.reason4
                ].map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary-foreground">{idx + 1}</span>
                    </div>
                    <span className="text-sm">{reason}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Gale Crater Image */}
          <Card className="glass-effect border-primary/30 overflow-hidden">
            <CardHeader>
              <CardTitle>{t.location.crater.mapTitle}</CardTitle>
              <CardDescription>{t.location.crater.mapDesc}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[400px] md:h-[500px]">
                <img 
                  src={galeCrater} 
                  alt="Gale Crater" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
                    <MapPin className="h-12 w-12 text-primary drop-shadow-lg relative z-10" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environmental Conditions */}
      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.location.conditions.title}</h2>
            <p className="text-muted-foreground text-lg">{t.location.conditions.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition, idx) => {
              const Icon = condition.icon;
              return (
                <Card 
                  key={idx} 
                  className="glass-effect border-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                >
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${condition.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{condition.title}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-foreground">
                      {condition.value}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {condition.pressure && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Pressure:</span> {condition.pressure}
                      </p>
                    )}
                    {condition.range && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Range:</span> {condition.range}
                      </p>
                    )}
                    {condition.detail && (
                      <p className="text-sm text-muted-foreground">{condition.detail}</p>
                    )}
                    {condition.duration && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Duration:</span> {condition.duration}
                      </p>
                    )}
                    {condition.availability && (
                      <p className="text-sm text-muted-foreground">{condition.availability}</p>
                    )}
                    <div className="pt-3 mt-3 border-t border-border">
                      <p className="text-sm font-semibold mb-1">Impact:</p>
                      <p className="text-sm text-muted-foreground">{condition.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Location;
