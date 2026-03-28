import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    setMobileMenuOpen(false);
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  };

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/collectivites", label: "Collectivités & Associations" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <img 
              src={`${import.meta.env.BASE_URL}logo.png`} 
              alt="initIA Vienne Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
              onError={(e) => {
                // Fallback if logo not found during dev
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40"><rect width="100" height="40" fill="%232D6A2D" rx="4"/><text x="50" y="25" font-family="Arial" font-size="16" fill="white" text-anchor="middle">initIA</text></svg>';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "font-medium text-[15px] transition-colors hover:text-brand-orange",
                  location === link.href ? "text-brand-orange" : "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:0756958511" className="flex items-center gap-2 text-primary font-bold hover:text-brand-orange transition-colors">
              <Phone className="w-4 h-4" />
              07 56 95 85 11
            </a>
            <Button onClick={scrollToContact} variant="accent">
              Me contacter
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-border animate-in slide-in-from-top-2">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl font-medium text-lg",
                  location === link.href ? "bg-brand-orange/10 text-brand-orange" : "text-primary hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <a 
              href="tel:0756958511" 
              className="flex items-center justify-center gap-2 px-4 py-3 text-primary font-bold text-lg"
            >
              <Phone className="w-5 h-5" />
              07 56 95 85 11
            </a>
            <Button onClick={scrollToContact} variant="accent" className="w-full">
              Me contacter
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
