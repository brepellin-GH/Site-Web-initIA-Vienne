import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/collectivites", label: "Collectivités & Associations" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.png"
              alt="initIA Vienne"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href
                    ? "text-primary border-b-2 border-primary pb-0.5"
                    : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+33756958511" className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              <Phone className="h-3.5 w-3.5" />
              07 56 95 85 11
            </a>
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#contact">Me contacter</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-base font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-foreground/70"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border space-y-2">
              <a
                href="tel:+33756958511"
                className="flex items-center gap-2 py-2 text-base font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                07 56 95 85 11
              </a>
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="#contact" onClick={() => setIsOpen(false)}>Me contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
