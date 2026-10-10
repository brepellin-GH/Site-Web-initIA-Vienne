import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export const PHONE_DISPLAY = "06 73 98 42 85";
export const PHONE_HREF = "tel:+33673984285";
export const WHATSAPP_HREF = "https://wa.me/33673984285";
export const EMAIL = "initia.vienne@gmail.com";
export const INSTAGRAM_HREF = "https://www.instagram.com/initia.vienne";
export const LINKEDIN_HREF = "https://www.linkedin.com/in/bruno-repellin-b1425a21";
export const GOOGLE_REVIEWS_HREF = "https://www.google.com/search?q=initia+vienne";
export const DAUPHINE_HREF =
  "https://www.ledauphine.com/societe/2026/03/19/isere-vienne-cet-expert-donne-ses-conseils-pour-un-bon-usage-de-l-intelligence-artificielle";

/** Petit libellé en capitales au-dessus des titres de section. */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("block text-base font-semibold uppercase tracking-[0.06em]", className)}>
      {children}
    </span>
  );
}

/** Pastille encadrée d'orange en tête des bandeaux verts. */
export function HeroBadge({ children }: { children: ReactNode }) {
  return (
    <span className="self-start flex items-center gap-2.5 px-3 lg:px-3.5 py-2 border-2 border-iv-orange font-semibold leading-[1.3]">
      <span aria-hidden="true" className="w-2.5 h-2.5 flex-none bg-iv-orange" />
      {children}
    </span>
  );
}

/** Filet orange sous les bandeaux verts. */
export function OrangeRule() {
  return <div aria-hidden="true" className="h-2 lg:h-2.5 bg-iv-orange" />;
}

const btnBase =
  "inline-flex items-center gap-4 h-14 px-5 font-bold text-lg no-underline transition-colors";

/** Bouton orange (action principale sur fond vert ou clair). */
export function OrangeButton({
  href,
  children,
  className,
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  const cls = cn(
    btnBase,
    "justify-between bg-iv-orange text-iv-ink hover:bg-iv-orange-hover hover:text-iv-ink",
    className,
  );
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </>
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {content}
    </a>
  );
}

/** Bouton vert plein (S'abonner, Envoyer…). */
export const greenButtonClass =
  "inline-flex items-center justify-between gap-4 h-14 px-5 font-bold text-lg bg-iv-green text-iv-paper hover:bg-iv-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

/** Bouton encadré noir (Voir tous les avis…). */
export const outlineButtonClass =
  "inline-flex items-center justify-between gap-4 h-[52px] px-5 font-bold text-lg border-2 border-iv-ink text-iv-ink hover:bg-iv-ink/10 transition-colors";

/** Lien vert gras du texte courant. */
export const textLinkClass = "font-bold text-iv-green underline-offset-4 hover:text-iv-green-dark hover:underline";

/** Champ de formulaire. */
export const inputClass =
  "w-full h-[52px] px-4 border-2 border-iv-text bg-iv-paper text-iv-ink text-lg rounded-none placeholder:text-iv-text/60 focus:outline-none focus:border-iv-green focus:ring-2 focus:ring-iv-green/30";

export function PhoneIcon({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function LinkedinIcon({ size = 22 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/** Petit bouton « Copier l'adresse » à côté du lien e-mail (utile sans messagerie installée). */
export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Repli pour les navigateurs sans accès au presse-papiers
      const field = document.createElement("textarea");
      field.value = EMAIL;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center self-start min-h-11 px-3 border-2 border-current text-base font-semibold cursor-pointer bg-transparent hover:bg-iv-paper/15 transition-colors",
        className,
      )}
    >
      <span aria-live="polite">{copied ? "Adresse copiée ✓" : "Copier l'adresse"}</span>
    </button>
  );
}

/** Icônes Instagram et LinkedIn (en-tête et pied de page). */
export function SocialLinks() {
  const cls = "w-11 h-11 flex items-center justify-center text-iv-paper hover:text-iv-orange transition-colors";
  return (
    <>
      <a href={INSTAGRAM_HREF} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={cls}>
        <InstagramIcon />
      </a>
      <a href={LINKEDIN_HREF} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={cls}>
        <LinkedinIcon />
      </a>
    </>
  );
}
