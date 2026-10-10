import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { PHONE_DISPLAY, PHONE_HREF, PhoneIcon, SocialLinks } from "./ui";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/ateliers", label: "Ateliers" },
  { href: "/a-propos", label: "À propos" },
  { href: "/newsletter", label: "Newsletter" },
];

const LOGO_SRC = `${import.meta.env.BASE_URL}images/site/logo-clair.webp`;

export function SiteHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => (href === "/" ? location === "/" : location.startsWith(href));

  const contactBtn =
    "flex-none flex items-center h-12 whitespace-nowrap bg-iv-orange text-iv-ink font-bold text-lg hover:bg-iv-orange-hover transition-colors";

  return (
    <header className="iv-dark sticky top-0 z-40 bg-iv-green text-iv-paper border-b-2 border-iv-ink">
      {/* Ordinateur */}
      <div className="iv-band [--pad:40px] hidden lg:flex items-center gap-6 px-10 py-3">
        <Link href="/" aria-label="initIA Vienne, accueil" className="flex items-center flex-none min-h-12">
          <img src={LOGO_SRC} alt="initIA Vienne" width={124} height={56} className="block h-14 w-auto" />
        </Link>
        <nav aria-label="Navigation principale" className="flex gap-6 flex-1 min-w-0">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cn(
                "py-2.5 whitespace-nowrap text-lg font-medium text-iv-paper hover:text-iv-orange transition-colors",
                isActive(n.href) && "shadow-[inset_0_-4px_0_#F07E01]",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-0.5">
          <SocialLinks />
        </div>
        <a
          href={PHONE_HREF}
          className="hidden xl:flex flex-none items-center gap-2 min-h-11 whitespace-nowrap text-lg font-bold text-iv-paper hover:text-iv-orange transition-colors"
        >
          <PhoneIcon />
          {PHONE_DISPLAY}
        </a>
        <Link href="/contact" className={cn(contactBtn, "px-5")}>
          Me contacter
        </Link>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex flex-col">
        <div className="flex items-center gap-2 pl-4 pr-3 py-2">
          <Link href="/" aria-label="initIA Vienne, accueil" className="flex items-center flex-none min-h-12">
            <img src={LOGO_SRC} alt="initIA Vienne" width={97} height={44} className="block h-11 w-auto" />
          </Link>
          <Link href="/contact" className={cn(contactBtn, "ml-auto px-3.5")}>
            Me contacter
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="w-12 h-12 flex-none flex items-center justify-center bg-transparent border-2 border-iv-paper text-iv-paper text-[22px] font-bold"
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
        <div className="flex items-center gap-0.5 pl-4 pr-2 border-t border-iv-hair-light">
          <a href={PHONE_HREF} className="flex items-center gap-2 min-h-12 flex-1 text-lg font-bold text-iv-paper">
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>
          <SocialLinks />
        </div>
        {menuOpen && (
          <nav
            id="menu-mobile"
            aria-label="Navigation principale"
            className="flex flex-col border-t-2 border-iv-ink bg-iv-cream"
          >
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={cn(
                  "flex justify-between items-center min-h-14 px-4 border-b border-iv-hair text-iv-ink text-xl font-bold",
                  isActive(n.href) && "bg-iv-sand shadow-[inset_6px_0_0_#F07E01]",
                )}
              >
                {n.label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
