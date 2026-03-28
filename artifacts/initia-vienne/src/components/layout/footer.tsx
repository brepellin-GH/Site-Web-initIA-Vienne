import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src="/logo.png" alt="initIA Vienne" className="h-14 w-auto brightness-0 invert mb-4" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Ateliers d'initiation à l'intelligence artificielle — accessibles à tous, partout dans le Viennois.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-base mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accueil — Grand Public
                </Link>
              </li>
              <li>
                <Link href="/collectivites" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Collectivités & Associations
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Demander un devis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+33756958511"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  07 56 95 85 11
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@initia-vienne.fr"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  contact@initia-vienne.fr
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                Vienne (38) — Isère
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} initIA Vienne — Tous droits réservés</p>
          <p className="mt-1">Mots-clés : IA Vienne · Atelier numérique Isère · Initiation ChatGPT senior</p>
        </div>
      </div>
    </footer>
  );
}
