import { Link } from "wouter";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl inline-block w-fit">
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`} 
                alt="initIA Vienne" 
                className="h-10 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40"><rect width="100" height="40" fill="%232D6A2D" rx="4"/><text x="50" y="25" font-family="Arial" font-size="16" fill="white" text-anchor="middle">initIA</text></svg>';
                }}
              />
            </div>
            <p className="text-primary-foreground/80 max-w-sm mt-4 font-medium">
              Ateliers d'initiation à l'intelligence artificielle.
              Simples, concrets et bienveillants pour tous.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-4 text-brand-orange-light">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:0673984285" className="flex items-center gap-3 text-primary-foreground/80 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  06 73 98 42 85
                </a>
              </li>
              <li>
                <a href="mailto:initia.vienne@gmail.com" className="flex items-center gap-3 text-primary-foreground/80 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  initia.vienne@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  Vienne (38) et environs
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-display font-bold mb-4 text-brand-orange-light">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-brand-orange transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/collectivites" className="text-primary-foreground/80 hover:text-brand-orange transition-colors">
                  Collectivités & Associations
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-brand-orange transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} initIA Vienne. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/initia.vienne" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/bruno-repellin-b1425a21" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
