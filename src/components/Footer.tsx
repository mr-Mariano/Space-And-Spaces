import { Rocket, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                EDEN TREE
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plantando las bases permanentes de vida humana en Marte
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Proyecto
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentación
                </Link>
              </li>
              <li>
                <Link to="/editor" className="text-muted-foreground hover:text-primary transition-colors">
                  Editor 3D
                </Link>
              </li>
            </ul>
          </div>

          {/* Habitat Zones */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Zonas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>TRUNK - Núcleo</li>
              <li>ROOT 1 - Operativa</li>
              <li>ROOT 2 - Bienestar</li>
              <li>ROOT 3 - Descanso</li>
              <li>ROOT 4 - Recursos</li>
              <li>ROOT 5 - Investigación</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contacto</h3>
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
          <p>© 2025 EDEN TREE Habitat Project. Diseñando el futuro de la humanidad en Marte.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
