import { PHONE_DISPLAY, PHONE_HREF, PhoneIcon } from "./ui";

/** Bouton téléphone flottant en bas à droite, sur toutes les pages publiques. */
export function FloatingPhone() {
  return (
    <a
      href={PHONE_HREF}
      aria-label={`Appeler le ${PHONE_DISPLAY}`}
      className="fixed z-30 bottom-4 right-4 lg:bottom-6 lg:right-6 flex items-center justify-center gap-2.5 w-[60px] h-[60px] lg:w-auto lg:h-14 lg:px-5 bg-iv-orange text-iv-ink border-2 border-iv-ink font-bold text-lg shadow-[0_6px_18px_rgba(32,30,29,0.25)] hover:bg-iv-orange-hover transition-colors"
    >
      <PhoneIcon size={26} className="lg:hidden" />
      <PhoneIcon className="hidden lg:block" />
      <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
    </a>
  );
}
