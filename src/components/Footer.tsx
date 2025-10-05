import { Rocket, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Eden Tree
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">{t.footer.navigation}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.project}
                </Link>
              </li>
              <li>
                <Link to="/habitat" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.docs}
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.location}
                </Link>
              </li>
              <li>
                <Link to="/editor" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.editor}
                </Link>
              </li>
            </ul>
          </div>

          {/* Habitat Zones */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">{t.footer.zones}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t.footer.trunk}</li>
              <li>{t.footer.root1}</li>
              <li>{t.footer.root2}</li>
              <li>{t.footer.root3}</li>
              <li>{t.footer.root4}</li>
              <li>{t.footer.root5}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@edentree.space"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  contact@edentree.space
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2025 Eden Tree. {t.footer.rights} {t.footer.concept}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
