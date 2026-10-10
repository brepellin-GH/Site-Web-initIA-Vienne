import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "wouter";
import { Briefcase, Landmark, Users, type LucideIcon } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { cn } from "@/lib/utils";
import { ContactBlock } from "@/components/contact-form";
import { SiteFaq } from "@/components/site/site-faq";
import {
  formatDateCourte,
  newsletterHref,
  titreCourt,
  useNewsletterArchives,
} from "@/components/site/newsletter";
import {
  DAUPHINE_HREF,
  GOOGLE_REVIEWS_HREF,
  HeroBadge,
  Kicker,
  OrangeButton,
  OrangeRule,
  greenButtonClass,
  outlineButtonClass,
  textLinkClass,
} from "@/components/site/ui";

const IMG = `${import.meta.env.BASE_URL}images/site/`;

type Tab = { id: string; label: string; Icon: LucideIcon; href: string; hook: string; items: [string, string][] };

const TABS: Tab[] = [
  {
    id: "associations",
    label: "Associations et centres sociaux",
    Icon: Users,
    href: "/ateliers#associations",
    hook: "Pour les clubs, MJC, centres sociaux et associations de bénévoles.",
    items: [
      ["Le compte rendu d'assemblée générale", "Transformer ses notes en un compte rendu clair, prêt à envoyer aux adhérents."],
      ["Les comptes de l'association", "Présenter un bilan financier lisible et préparer une demande de subvention."],
      ["Le message qui fait plaisir", "Écrire à un petit-enfant, préparer une sortie, comprendre un courrier administratif : l'IA dans la vie de tous les jours."],
    ],
  },
  {
    id: "collectivites",
    label: "Collectivités",
    Icon: Landmark,
    href: "/ateliers#collectivites",
    hook: "Pour les mairies, médiathèques et services municipaux.",
    items: [
      ["Une soirée découverte en médiathèque", "Un atelier ouvert aux habitants pour démystifier l'IA et apprendre à s'en servir sans risque."],
      ["Former les agents", "Rédiger un courrier, résumer un document, préparer une note, en gardant la maîtrise des données."],
      ["Sensibiliser les associations du territoire", "Un cycle pour les bénévoles et les trésoriers."],
    ],
  },
  {
    id: "reseaux-pros",
    label: "Réseaux professionnels",
    Icon: Briefcase,
    href: "/ateliers#reseaux-pros",
    hook: "Pour les commerçants, artisans et créateurs d'entreprise, via leur association ou leur organisme de formation.",
    items: [
      ["Répondre aux avis clients", "Une réponse soignée à un avis Google en deux minutes, même quand il est négatif."],
      ["Relancer un devis", "Un mail de relance courtois et efficace, adapté à votre métier."],
      ["Faire vivre ses réseaux sociaux", "Une publication Facebook ou Instagram pour annoncer une nouveauté ou un événement."],
    ],
  },
];

const STEPS: [string, string][] = [
  ["On échange.", "Un appel ou un rendez-vous pour comprendre votre public, vos attentes et vos contraintes de salle et d'horaire."],
  ["J'adapte l'atelier.", "Le programme reste globalement le même, mais les exemples et les exercices sont construits pour vos participants."],
  ["Vos participants repartent avec un support.", "Un récapitulatif des points clés et des demandes types à réutiliser chez eux."],
];

const REFS: [string, string][] = [
  ["Club Léo Lagrange de Vienne", ""],
  ["Centre social d'Estressin", ""],
  ["Compagnons du Devoir", "Centre de Brignais"],
  ["Club de tarot de Vienne Estrablin", ""],
];

// Avis Google réels : citations reprises telles quelles.
const REVIEWS: [number, string, string, string][] = [
  [5, "Excellente initiation à l'intelligence artificielle. Bruno est très pédagogue. Avec des termes simples, il a su nous en expliquer les bases. Je lui souhaite bonne continuation.", "Chérif H.", "Mars 2026"],
  [5, "Très bonne intervention accessible à tous, y compris les personnes qui ne pratiquent pas régulièrement les outils informatiques.", "Daniel B.", "Mars 2026"],
  [4, "Très bonne intervention sur l'intelligence artificielle auprès des jeunes. Le contenu était clair et accessible, avec une approche ludique qui a su capter leur attention. Merci pour ce moment de qualité !", "Laura M.", "Mars 2026"],
  [5, "Bruno est très clair et j'ai hâte de faire un autre atelier ensemble.", "Monique M.", "Mars 2026"],
  [5, "Bien qu'ayant déjà quelques connaissances sur l'IA, nous avons appris d'autres utilisations très intéressantes — une présentation très positive.", "Christiane P.", "Mars 2026"],
  [4, "Formation au top et adaptée au public — merci Bruno !", "Denis G.", "Mars 2026"],
  [5, "Atelier très intéressant et très bien fait. On apprend beaucoup et c'est très accessible.", "Guy B.", "Mars 2026"],
  [5, "Formation de qualité avec un support très adapté.", "Sandrine P.", "Mars 2026"],
  [5, "Explications claires. Exemples bien choisis.", "Patrick D.", "Avril 2026"],
  [5, "Très bon atelier d'initiation à l'IA. Merci Bruno", "Michel D.", "Avril 2026"],
];

const h2Section = "m-0 text-[30px] lg:text-[44px] leading-[1.1] lg:leading-[1.08] text-balance";

function SectionHead({ kicker, title, className }: { kicker: string; title: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2 lg:gap-3 px-5 pt-10 pb-6 lg:px-12 lg:pt-14 lg:pb-10", className)}>
      <Kicker>{kicker}</Kicker>
      <h2 className={h2Section}>{title}</h2>
    </div>
  );
}

function PublicTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = TABS[active];

  const select = (i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const n = TABS.length;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select((active + 1) % n);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select((active + n - 1) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0);
    } else if (e.key === "End") {
      e.preventDefault();
      select(n - 1);
    }
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="Ateliers par public"
        onKeyDown={onKeyDown}
        className="flex flex-col lg:grid lg:grid-cols-3 border-t-2 lg:border-b-2 border-iv-ink"
      >
        {TABS.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls="panel-publics"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center justify-between lg:justify-start gap-3 lg:gap-4 min-h-16 px-5 py-3.5 lg:px-10 lg:py-7 text-left cursor-pointer border-b-2 lg:border-b-0 border-iv-ink",
                i < 2 && "lg:border-r-2",
                on
                  ? "bg-iv-green text-iv-paper shadow-[inset_6px_0_0_#F07E01] lg:shadow-[inset_0_-6px_0_#F07E01]"
                  : "bg-iv-cream text-iv-ink hover:bg-iv-sand",
              )}
            >
              <span className="flex items-center gap-3.5 lg:gap-4">
                <t.Icon aria-hidden="true" className={cn("w-[30px] h-[30px] flex-none", on ? "text-iv-paper" : "text-iv-green")} />
                <span className="text-xl lg:text-[23px] font-bold leading-[1.2]">{t.label}</span>
              </span>
              <span aria-hidden="true" className="lg:hidden text-[22px] font-bold">
                {on ? "–" : "+"}
              </span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="panel-publics"
        aria-labelledby={`tab-${cur.id}`}
        tabIndex={0}
        className="flex flex-col border-b-2 border-iv-ink"
      >
        <div className="flex justify-between items-center gap-8 p-5 lg:px-12 lg:py-6 border-b border-iv-hair">
          <span className="text-lg lg:text-xl font-medium text-iv-ink">{cur.hook}</span>
          <Link href={cur.href} className={cn(textLinkClass, "hidden lg:inline flex-none")}>
            Voir l'offre détaillée →
          </Link>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-3">
          {cur.items.map(([t, d], i) => (
            <div
              key={t}
              className={cn(
                "flex flex-col gap-1.5 lg:gap-3 px-5 py-[22px] lg:px-10 lg:py-9 border-b lg:border-b-0 border-iv-hair",
                i < 2 && "lg:border-r-2 lg:border-r-iv-ink",
              )}
            >
              <h3 className="m-0 text-xl lg:text-2xl leading-[1.2]">{t}</h3>
              <p className="m-0 leading-[1.55]">{d}</p>
            </div>
          ))}
        </div>
        <Link href={cur.href} className={cn(textLinkClass, "lg:hidden flex items-center min-h-14 px-5")}>
          Voir l'offre détaillée →
        </Link>
      </div>
    </>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span role="img" aria-label={`${n} étoiles sur 5`} className="text-iv-orange text-xl font-bold tracking-[2px]">
      {"★".repeat(n) + "☆".repeat(5 - n)}
    </span>
  );
}

function Reviews() {
  const [ri, setRi] = useState(0);
  const rn = REVIEWS.length;
  const prev = () => setRi((ri - 1 + rn) % rn);
  const next = () => setRi((ri + 1) % rn);
  const navBtn =
    "w-12 h-12 border-2 border-iv-ink bg-transparent text-iv-ink text-xl font-bold cursor-pointer hover:bg-iv-green hover:text-iv-paper hover:border-iv-green transition-colors";

  const card = (k: number, idx: number) => {
    const [stars, text, name, date] = REVIEWS[idx];
    return (
      <figure
        key={`${idx}-${k}`}
        className={cn(
          "flex flex-col gap-3.5 m-0",
          k > 0 && "hidden lg:flex lg:border-l lg:border-iv-hair",
          k === 0 ? "lg:pr-8 lg:pt-8" : "lg:px-8 lg:pt-8",
        )}
      >
        <Stars n={stars} />
        <blockquote className="m-0 text-iv-ink leading-[1.55]">« {text} »</blockquote>
        <figcaption className="flex flex-col gap-0.5">
          <span className="font-bold text-iv-ink">{name}</span>
          <span>{date}</span>
        </figcaption>
      </figure>
    );
  };

  const counter = (
    <span className="font-semibold text-iv-ink" aria-live="polite">
      {ri + 1} / {rn}
    </span>
  );

  return (
    <section aria-labelledby="avis-titre" className="iv-band [--pad:48px] flex flex-col gap-6 lg:gap-8 px-5 py-10 lg:px-12 lg:py-14 border-b-2 border-iv-ink">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
        <div className="flex flex-col gap-2">
          <Kicker>Avis Google</Kicker>
          <h2 id="avis-titre" className="m-0 flex items-baseline gap-3 lg:gap-4">
            <span className="text-5xl lg:text-[64px] font-extrabold leading-none tracking-[-0.02em]">4,8/5</span>
            <span aria-hidden="true" className="text-iv-orange text-[22px] lg:text-[28px] font-bold tracking-[3px]">
              ★★★★★
            </span>
          </h2>
          <span>Note moyenne sur 16 avis</span>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="pr-2">{counter}</span>
          <button type="button" onClick={prev} aria-label="Avis précédent" className={navBtn}>
            ←
          </button>
          <button type="button" onClick={next} aria-label="Avis suivant" className={navBtn}>
            →
          </button>
        </div>
      </div>
      <div className="pt-6 lg:pt-0 border-t-2 border-iv-ink grid grid-cols-1 lg:grid-cols-3">
        {[0, 1, 2].map((k) => card(k, (ri + k) % rn))}
      </div>
      <div className="flex lg:hidden items-center gap-3">
        <button type="button" onClick={prev} aria-label="Avis précédent" className={navBtn}>
          ←
        </button>
        <button type="button" onClick={next} aria-label="Avis suivant" className={navBtn}>
          →
        </button>
        <span className="pl-2">{counter}</span>
      </div>
      <div className="flex">
        <a href={GOOGLE_REVIEWS_HREF} target="_blank" rel="noopener" className={cn(outlineButtonClass, "w-full lg:w-auto lg:min-w-[320px]")}>
          Voir tous les avis Google <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

function LatestNewsletters() {
  const { envois, loading } = useNewsletterArchives();
  const latest = envois.slice(0, 2);
  const itemCls = "flex flex-col gap-1 lg:gap-2 py-4 lg:p-6 border-b lg:border-b-0 border-iv-hair text-iv-ink no-underline hover:bg-iv-cream/60";

  return (
    <section aria-labelledby="nl-titre" className="iv-band [--pad:48px] flex flex-col gap-[18px] lg:gap-8 px-5 py-10 lg:px-12 lg:py-14 bg-iv-sand border-t-2 border-iv-ink">
      <div className="flex justify-between items-end gap-8">
        <div className="flex flex-col gap-2">
          <Kicker>Newsletter gratuite</Kicker>
          <h2 id="nl-titre" className="m-0 text-[34px] lg:text-[44px]">
            L'IA en clair
          </h2>
          <p className="m-0 lg:mt-1">Un thème, une actu expliquée simplement, une astuce à essayer. Directement dans votre boîte mail.</p>
        </div>
        <Link href="/newsletter" className={cn(greenButtonClass, "hidden lg:inline-flex h-[52px] flex-none")}>
          S'abonner
        </Link>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 border-t-2 border-iv-ink">
        {loading && <p className="m-0 py-4 lg:p-6">Chargement…</p>}
        {latest.map((envoi, i) => (
          <a
            key={envoi.id}
            href={newsletterHref(envoi)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(itemCls, i === 0 ? "lg:pl-0 lg:pb-0" : "lg:border-l")}
          >
            <span className="font-bold text-iv-green">
              N°{envoi.numero} · {formatDateCourte(envoi.date_envoi)}
            </span>
            <span className="text-xl lg:text-[22px] font-bold leading-[1.25]">{titreCourt(envoi.sujet)}</span>
          </a>
        ))}
        <Link href="/newsletter" className={cn(itemCls, "lg:border-l")}>
          <span className="font-bold text-iv-text">Archives</span>
          <span className="text-xl lg:text-[22px] font-bold leading-[1.25]">Tous les numéros →</span>
        </Link>
      </div>
      <Link href="/newsletter" className={cn(greenButtonClass, "lg:hidden h-[52px] justify-start")}>
        S'abonner
      </Link>
    </section>
  );
}

export default function Home() {
  usePageMeta({
    title: "Ateliers d'initiation à l'IA à Vienne (Isère) | initIA Vienne",
    description:
      "Ateliers d'initiation à l'intelligence artificielle à Vienne (Isère) pour les associations, les collectivités et les réseaux professionnels. Concrets, sans jargon, dans vos locaux.",
  });

  const heroAlt = "Bruno Repellin anime un atelier d'initiation à l'IA devant un groupe, dans une salle voûtée à Vienne";

  return (
    <main>
      {/* Bandeau d'accueil */}
      <section className="iv-dark bg-iv-green text-iv-paper">
        <div className="iv-band flex flex-col-reverse lg:grid lg:grid-cols-[7fr_5fr]">
          <div className="flex flex-col gap-[22px] lg:gap-8 px-5 pt-9 pb-8 lg:px-12 lg:pt-20 lg:pb-16">
            <HeroBadge>Ateliers d'initiation à l'IA, Vienne (38)</HeroBadge>
            <h1 className="m-0 text-iv-paper text-[46px] md:text-[64px] xl:text-[92px] font-extrabold leading-[0.98] xl:leading-[0.95] tracking-[-0.02em] xl:tracking-[-0.03em] text-balance">
              Faites découvrir l'IA autrement.
            </h1>
            <p className="m-0 max-w-[620px] lg:text-[21px] leading-normal">
              Des ateliers d'initiation à l'IA pour les associations, les collectivités et les réseaux professionnels de Vienne et alentours. En petit groupe, sans jargon, à partir de vos situations réelles.
            </p>
            <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3 lg:gap-6 lg:items-center">
              <OrangeButton href="/contact" className="w-full lg:w-auto lg:min-w-[280px]">
                Organiser un atelier
              </OrangeButton>
              <Link href="/newsletter" className="py-2.5 lg:py-0 font-medium text-iv-paper underline underline-offset-4 hover:text-iv-orange">
                Recevoir la newsletter
              </Link>
            </div>
          </div>
          <div className="relative h-60 lg:h-auto lg:min-h-[560px] border-b-2 lg:border-b-0 lg:border-l-2 border-iv-ink overflow-hidden">
            <img
              src={`${IMG}atelier-hero-1600.webp`}
              srcSet={`${IMG}atelier-hero-800.webp 800w, ${IMG}atelier-hero-1600.webp 1600w`}
              sizes="(min-width: 1024px) 42vw, 100vw"
              alt={heroAlt}
              width={1600}
              height={900}
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover object-[37%_50%]"
            />
          </div>
        </div>
        <OrangeRule />
      </section>

      {/* Accroche */}
      <div className="iv-band [--pad:48px] flex flex-col gap-3 lg:grid lg:grid-cols-[5fr_7fr] lg:gap-12 lg:items-center px-5 py-8 lg:p-12 bg-iv-sand border-b-2 border-iv-ink">
        <h2 className="m-0 text-[30px] lg:text-[40px] leading-[1.1] text-balance">Pas de grand discours sur l'IA. On la teste.</h2>
        <p className="m-0 lg:text-[21px] leading-normal">Démonstrations en direct, exemples du quotidien, pratique et échanges.</p>
      </div>

      {/* Les ateliers par public */}
      <section aria-labelledby="ateliers-titre" className="iv-band">
        <div className="flex flex-col gap-2.5 lg:gap-3 px-5 pt-10 pb-6 lg:px-12 lg:pt-16 lg:pb-10">
          <Kicker>Les ateliers</Kicker>
          <h2 id="ateliers-titre" className={cn(h2Section, "max-w-[820px]")}>
            Des ateliers construits sur vos situations réelles.
          </h2>
          <p className="m-0 mt-1.5 lg:mt-2 max-w-[860px] lg:text-[19px] leading-[1.55] text-pretty">
            Le socle est le même pour tous : comprendre ce qu'est l'IA, choisir ses outils (ChatGPT, Claude, Gemini, Vibe), bien formuler ses demandes, connaître ses limites. Les exemples et les exercices, eux, viennent de votre quotidien.
          </p>
        </div>
        <PublicTabs />
        <p className="m-0 p-5 lg:px-12 lg:py-6 font-medium text-iv-ink">
          Vous avez un autre public en tête ?{" "}
          <Link href="/contact" className={textLinkClass}>
            Parlons-en →
          </Link>
        </p>
      </section>

      {/* Comment ça se passe */}
      <section className="iv-band border-t-2 border-iv-ink">
        <SectionHead kicker="Comment ça se passe ?" title="Organiser un atelier, en trois étapes." />
        <ol className="flex flex-col lg:grid lg:grid-cols-3 m-0 p-0 list-none border-t-2 border-iv-ink">
          {STEPS.map(([t, d], i) => (
            <li
              key={t}
              className={cn(
                "grid grid-cols-[40px_1fr] gap-3 px-5 py-6 border-b border-iv-hair lg:flex lg:flex-col lg:px-12 lg:py-10 lg:border-b-0",
                i < 2 && "lg:border-r-2 lg:border-r-iv-ink",
              )}
            >
              <span aria-hidden="true" className="text-[28px] lg:text-[40px] font-extrabold text-iv-green">
                {i + 1}
              </span>
              <span className="flex flex-col gap-1.5 lg:gap-3">
                <h3 className="m-0 text-xl lg:text-2xl leading-[1.2]">{t}</h3>
                <span className="leading-[1.55]">{d}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="m-0 p-5 lg:px-12 lg:py-6 lg:border-t border-iv-hair border-b-2 border-b-iv-ink bg-iv-sand font-medium text-iv-ink leading-[1.55]">
          Ateliers de 2 heures, idéalement 10 à 15 participants (jusqu'à 40 pour une intervention de sensibilisation). Sessions de niveau 2 possibles pour aller plus loin. Tarif selon la prestation, devis gratuit et sans engagement.
        </p>
      </section>

      {/* Références */}
      <section aria-labelledby="refs-titre" className="iv-band">
        <div className="flex flex-col gap-2 lg:gap-3 px-5 pt-10 pb-6 lg:px-12 lg:pt-14 lg:pb-10">
          <Kicker>Références</Kicker>
          <h2 id="refs-titre" className={h2Section}>
            Ils m'ont fait confiance
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 border-t-2 border-b-2 border-iv-ink">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-1.5 lg:gap-2.5 px-5 py-6 lg:px-12 lg:py-10 border-b lg:border-b-0 border-iv-hair lg:border-r-2 lg:border-r-iv-ink">
            <span className="text-[44px] lg:text-[56px] font-extrabold leading-none tracking-[-0.02em] text-iv-green">Plus de 100</span>
            <span className="font-medium text-iv-ink leading-[1.45]">participants formés à Vienne et alentours depuis janvier 2026</span>
          </div>
          <div className="flex flex-col gap-1.5 lg:gap-2.5 px-5 py-6 lg:px-12 lg:py-10 border-r border-iv-hair lg:border-r-2 lg:border-r-iv-ink">
            <span className="text-[44px] lg:text-[56px] font-extrabold leading-none text-iv-green">0</span>
            <span className="font-medium text-iv-ink leading-[1.4]">prérequis technique</span>
          </div>
          <div className="flex flex-col gap-1.5 lg:gap-2.5 px-5 py-6 lg:px-12 lg:py-10">
            <span className="text-[44px] lg:text-[56px] font-extrabold leading-none text-iv-green">4,8/5</span>
            <span className="font-medium text-iv-ink leading-[1.4]">
              <span className="lg:hidden">sur Google (16 avis)</span>
              <span className="hidden lg:inline">note moyenne sur Google (16 avis)</span>
            </span>
          </div>
        </div>
        <ul className="flex flex-col lg:grid lg:grid-cols-3 m-0 p-0 list-none border-b-2 border-iv-ink">
          {REFS.map(([name, note], i) => (
            <li
              key={name}
              className={cn(
                "flex flex-col justify-center gap-0.5 lg:gap-1.5 px-5 py-[18px] lg:min-h-[120px] lg:px-12 lg:py-7 border-b border-iv-hair",
                i % 3 < 2 && "lg:border-r",
                i >= 3 && "lg:border-b-0",
              )}
            >
              <span className="text-xl lg:text-[22px] font-bold leading-[1.25] text-iv-ink">{name}</span>
              {note && <span>{note}</span>}
            </li>
          ))}
          <li className="lg:col-span-2 flex flex-col justify-center gap-2.5 px-5 py-[22px] lg:px-12 lg:py-7 bg-iv-sand">
            <span className="font-semibold text-iv-ink">Vu dans Le Dauphiné Libéré · mars 2026</span>
            <p className="m-0 text-[19px] lg:text-xl font-semibold leading-[1.35] text-iv-ink">
              « Il faut qu'il y ait un intérêt à l'usage de l'IA, on ne peut pas tout faire avec. »
            </p>
            <a href={DAUPHINE_HREF} target="_blank" rel="noopener" className="self-start py-1.5 lg:py-0 font-semibold text-iv-green underline-offset-4 hover:underline hover:text-iv-green-dark">
              Lire l'article →
            </a>
          </li>
        </ul>
      </section>

      <Reviews />

      {/* Portrait */}
      <section aria-label="Bruno Repellin" className="iv-band flex flex-col lg:grid lg:grid-cols-[4fr_8fr] border-b-2 border-iv-ink">
        <div className="relative h-80 lg:h-auto lg:min-h-[440px] border-b-2 lg:border-b-0 lg:border-r-2 border-iv-ink overflow-hidden">
          <img
            src={`${IMG}bruno-2026-800.webp`}
            srcSet={`${IMG}bruno-2026-480.webp 480w, ${IMG}bruno-2026-800.webp 800w`}
            sizes="(min-width: 1024px) 34vw, 100vw"
            alt="Portrait de Bruno Repellin"
            width={800}
            height={949}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-[50%_25%] lg:object-[50%_30%]"
          />
        </div>
        <div className="flex flex-col justify-between gap-[18px] lg:gap-8 px-5 pt-8 pb-10 lg:p-14 lg:px-12">
          <blockquote className="m-0 text-2xl lg:text-[34px] font-semibold leading-[1.3] lg:leading-[1.25] text-iv-ink text-pretty">
            « On n'a pas besoin d'être informaticien pour se servir de l'IA. Il faut surtout quelqu'un qui prenne le temps d'expliquer, avec des exemples qui vous parlent. »
          </blockquote>
          <div className="flex flex-col gap-[18px]">
            <div className="flex gap-4 items-center">
              <span aria-hidden="true" className="hidden lg:block w-7 h-1 bg-iv-orange" />
              <span className="font-semibold text-iv-ink leading-[1.4]">Bruno Repellin, fondateur d'initIA Vienne</span>
            </div>
            <p className="m-0 max-w-[680px] leading-[1.6] text-pretty">
              Après une carrière dans l'informatique chez Groupama Rhône-Alpes Auvergne, où j'ai notamment accompagné l'adoption de l'IA, j'ai créé initIA Vienne pour rendre ces outils accessibles à tous. Je vis à Vienne et j'interviens dans l'Isère et le Rhône (autres départements après étude).
            </p>
            <Link href="/a-propos" className={cn(textLinkClass, "self-start py-2 lg:py-0")}>
              En savoir plus →
            </Link>
          </div>
        </div>
      </section>

      <SiteFaq set="home" />

      <LatestNewsletters />

      <ContactBlock
        label="Parlons de votre projet"
        title="Prêt à faire le premier pas ?"
        intro="Association, collectivité, réseau professionnel ou simple curieux : je suis là pour répondre à vos questions et construire avec vous l'atelier qui vous ressemble."
      />
    </main>
  );
}
