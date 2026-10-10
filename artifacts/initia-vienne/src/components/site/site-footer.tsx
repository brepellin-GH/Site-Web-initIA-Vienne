import { Link } from "wouter";
import { CopyEmailButton, EMAIL, PHONE_DISPLAY, PHONE_HREF, PhoneIcon, SocialLinks } from "./ui";

const LOGO_SRC = `${import.meta.env.BASE_URL}images/site/logo-clair.webp`;

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/ateliers", label: "Ateliers" },
  { href: "/a-propos", label: "À propos" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/contact", label: "Contact" },
];

const iconProps = {
  "aria-hidden": true,
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#F07E01",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SiteFooter() {
  return (
    <footer className="iv-dark iv-band [--pad:48px] flex flex-col gap-8 lg:gap-10 px-5 pt-10 pb-24 lg:px-12 lg:pt-14 lg:pb-10 bg-iv-green text-iv-paper border-t-2 border-iv-ink">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-9 lg:gap-12">
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label="initIA Vienne, accueil" className="flex self-start">
            <img src={LOGO_SRC} alt="initIA Vienne" width={141} height={64} className="block h-16 w-auto" />
          </Link>
          <p className="m-0 max-w-[340px] font-medium leading-normal">
            Ateliers d'initiation à l'intelligence artificielle. Simples, concrets et bienveillants.
          </p>
        </div>
        <div className="flex flex-col gap-3.5">
          <span className="text-xl font-bold">Contact</span>
          <a href={PHONE_HREF} className="flex items-center gap-3 min-h-11 text-iv-paper hover:text-iv-orange">
            <PhoneIcon className="text-iv-orange" />
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 min-h-11 text-iv-paper hover:text-iv-orange break-all">
            <svg {...iconProps}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {EMAIL}
          </a>
          <CopyEmailButton className="ml-8 text-iv-paper" />
          <span className="flex items-center gap-3 min-h-11">
            <svg {...iconProps}>
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Vienne (38) et environs
          </span>
        </div>
        <nav aria-label="Pied de page" className="flex flex-col gap-1.5">
          <span className="text-xl font-bold mb-2">Navigation</span>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="min-h-10 flex items-center text-iv-paper underline underline-offset-4 hover:text-iv-orange">
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-3 pt-6 border-t border-iv-hair-light">
        <span>© 2026 initIA Vienne. Tous droits réservés.</span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <SocialLinks />
          <Link href="/mentions-legales" className="text-iv-paper underline underline-offset-4 hover:text-iv-orange">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="text-iv-paper underline underline-offset-4 hover:text-iv-orange">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
