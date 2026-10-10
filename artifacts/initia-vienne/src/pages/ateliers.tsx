import {
  Briefcase,
  Clock,
  HeartHandshake,
  Landmark,
  Lock,
  MapPin,
  MessageSquareText,
  Projector,
  ScanSearch,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { cn } from "@/lib/utils";
import { ContactBlock } from "@/components/contact-form";
import { SiteFaq } from "@/components/site/site-faq";
import { AgendaAteliers } from "@/components/site/agenda-ateliers";
import { HeroBadge, Kicker, OrangeButton, OrangeRule, PHONE_DISPLAY, PHONE_HREF } from "@/components/site/ui";

const ANCHORS: [string, string][] = [
  ["#agenda", "Agenda"],
  ["#socle", "Socle commun"],
  ["#deroule", "Déroulé"],
  ["#associations", "Associations"],
  ["#collectivites", "Collectivités"],
  ["#reseaux-pros", "Réseaux pros"],
  ["#formats", "Formats"],
  ["#modalites", "Modalités"],
  ["#faq", "FAQ"],
];

const GOALS = [
  "Comprendre ce qu'est l'IA et comment elle fonctionne",
  "Utiliser des outils d'IA simples en autonomie totale",
  "Démystifier les idées reçues et les peurs sur la technologie",
  "Renforcer la confiance numérique globale des participants",
  "Repartir avec des exercices pratiques à refaire chez soi",
];

const TOOLS = ["ChatGPT", "Claude", "Gemini", "Vibe"];

const STEPS: [string, string][] = [
  ["Découverte", "Les participants comprennent ce qu'est vraiment l'IA, sans les clichés de la science-fiction."],
  ["Démonstration", "Ils voient les outils fonctionner en direct : ChatGPT, Claude, Gemini, Vibe."],
  ["Pratique", "Chacun essaie à son tour, avec des exercices guidés adaptés à son niveau."],
  ["Échanges", "Le groupe pose ses questions librement et partage ses découvertes."],
];

type Public = {
  id: string;
  Icon: LucideIcon;
  label: string;
  hook: string;
  whyTitle?: string;
  whyText?: string;
  whyBlocks?: [LucideIcon, string, string][];
  lead?: string;
  items: [string, string][];
  refLabel?: string;
  refs?: string[];
  testimonials?: boolean;
};

const PUBLICS: Public[] = [
  {
    id: "associations",
    Icon: Users,
    label: "Associations et centres sociaux",
    hook: "Pour les clubs, MJC, centres sociaux et associations de bénévoles.",
    testimonials: true,
    whyTitle: "Pourquoi un atelier IA dans votre association ?",
    whyText:
      "L'IA s'invite dans le quotidien de chacun, souvent sans mode d'emploi. Un atelier en groupe permet à vos adhérents et à vos bénévoles de l'apprivoiser, à leur rythme et en confiance.",
    whyBlocks: [
      [ShieldCheck, "Autonomie", "Chacun apprend à se servir des outils seul, pour ses démarches comme pour ses projets."],
      [ScanSearch, "Esprit critique", "On voit ce que l'IA sait faire, ses limites et ses pièges. La méfiance laisse place à un usage éclairé."],
      [HeartHandshake, "Lien social", "Un moment de partage qui rassemble les adhérents autour d'un sujet qui concerne tout le monde."],
    ],
    items: [
      ["Le compte rendu d'assemblée générale", "Transformer ses notes en un compte rendu clair, prêt à envoyer aux adhérents."],
      ["Les comptes de l'association", "Présenter un bilan financier lisible et préparer une demande de subvention."],
      ["Le message qui fait plaisir", "Écrire à un petit-enfant, préparer une sortie, comprendre un courrier administratif : l'IA dans la vie de tous les jours."],
    ],
    refLabel: "Ils me font déjà confiance",
    refs: ["Club Léo Lagrange de Vienne", "Centre social d'Estressin", "Club de tarot de Vienne Estrablin"],
  },
  {
    id: "collectivites",
    Icon: Landmark,
    label: "Collectivités",
    hook: "Pour les mairies, médiathèques et services municipaux.",
    lead: "De plus en plus de démarches passent par le numérique, et l'IA accélère ce mouvement. Un atelier pour vos habitants, vos agents ou les associations de votre territoire aide à éviter que l'écart se creuse entre ceux qui maîtrisent ces outils et les autres.",
    items: [
      ["Une soirée découverte en médiathèque", "Un atelier ouvert aux habitants pour démystifier l'IA et apprendre à s'en servir sans risque."],
      ["Former les agents", "Rédiger un courrier, résumer un document, préparer une note, en gardant la maîtrise des données."],
      ["Sensibiliser les associations du territoire", "Un cycle pour les bénévoles et les trésoriers."],
    ],
  },
  {
    id: "reseaux-pros",
    Icon: Briefcase,
    label: "Réseaux professionnels",
    hook: "Pour les commerçants, artisans et créateurs d'entreprise, via leur association ou leur organisme de formation.",
    whyTitle: "Pourquoi un atelier IA pour votre réseau ?",
    whyText:
      "Avis clients, devis, réseaux sociaux : les tâches qui ne sont pas votre métier prennent du temps. Bien utilisée, l'IA vous en fait gagner chaque semaine, sans perdre votre ton ni la maîtrise de vos données.",
    whyBlocks: [
      [Clock, "Gagner du temps", "Les écrits du quotidien se rédigent en quelques minutes au lieu d'une soirée."],
      [MessageSquareText, "Mieux communiquer", "Des messages clairs et soignés, pour vos clients comme pour vos réseaux."],
      [Lock, "Garder la main", "Savoir quoi confier à l'IA, quoi vérifier, et quelles données ne jamais lui donner."],
    ],
    items: [
      ["Répondre aux avis clients", "Une réponse soignée à un avis Google en deux minutes, même quand il est négatif."],
      ["Relancer un devis", "Un mail de relance courtois et efficace, adapté à votre métier."],
      ["Faire vivre ses réseaux sociaux", "Une publication Facebook ou Instagram pour annoncer une nouveauté ou un événement."],
      ["Se différencier", "Trouver ce qui distingue votre activité et le dire en quelques phrases claires, pour votre site, vos devis ou vos réseaux."],
    ],
    refLabel: "Références",
    refs: ["Compagnons du Devoir, centre de Brignais"],
  },
];

// Avis réels : citations reprises telles quelles.
const TESTIMONIALS = [
  {
    text: "« Très bonne intervention sur l'intelligence artificielle auprès des jeunes. Le contenu était clair et accessible, avec une approche ludique qui a su capter leur attention. Merci pour ce moment de qualité ! »",
    name: "Laura M.",
    role: "Animatrice référente accompagnement scolaire, primaire et collège, Centre social d'Estressin Louis Van Herck",
  },
  {
    text: "« Formation au top et adaptée au public — merci Bruno ! »",
    name: "Denis G.",
    role: "Directeur, Centre social d'Estressin Louis Van Herck",
  },
];

const FORMATS: [string, string, string][] = [
  ["Atelier d'initiation (niveau 1)", "2 h", "Tous publics, groupe d'une même structure"],
  ["Atelier niveau 2", "2 h", "Groupes ayant suivi l'initiation"],
  ["Atelier thématique", "2 h", "Un métier ou une mission : trésoriers, agents, bénévoles"],
  ["Atelier professionnel", "3 à 4 h", "Réseaux pros, créateurs d'entreprise"],
  ["Conférence avec démonstrations", "Environ 1 h + échanges", "Sensibilisation : mairies, événements, jusqu'à 40 personnes"],
  ["Présentation courte", "20 à 30 min", "Matinales, assemblées générales, réunions de réseau"],
  ["Accompagnement individuel", "Sur mesure", "Commerçants, artisans, créateurs d'entreprise"],
];

const MODAL: [LucideIcon, string, string][] = [
  [Clock, "Durée", "2 heures pour l'initiation. Autres formats dans le tableau ci-dessus."],
  [Users, "Groupes", "10 à 15 personnes pour un accompagnement idéal, jusqu'à 40 en sensibilisation."],
  [MapPin, "Lieu", "Interventions en présentiel directement dans vos locaux, Vienne et environs."],
  [
    Projector,
    "Matériel",
    "Vidéoprojecteur fourni. Une salle avec tables, un écran ou un mur clair, et du wifi ou une bonne réception 4G ou 5G. Participants équipés de leur smartphone, tablette ou ordinateur portable.",
  ],
];

const h2Cls = "m-0 text-[28px] leading-[1.1]";
const iconCls = "w-7 h-7 flex-none text-iv-green";

function SplitHead({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 lg:gap-3 px-5 pt-9 pb-5 lg:p-12 lg:py-14 lg:border-r-2 border-iv-ink">
      <Kicker>{kicker}</Kicker>
      <h2 className={cn(h2Cls, "lg:text-4xl")}>{title}</h2>
      {children}
    </div>
  );
}

function PublicSection({ p }: { p: Public }) {
  return (
    <section id={p.id} aria-labelledby={`${p.id}-titre`} className="iv-band min-[1280px]:bg-[linear-gradient(to_right,#F1E8D8_50%,#FAF3E8_50%)] flex flex-col lg:grid lg:grid-cols-[4fr_8fr] border-b-2 border-iv-ink">
      <div className="flex flex-col gap-3 lg:gap-4 px-5 pt-9 pb-7 lg:p-12 lg:py-14 bg-iv-sand border-b-2 lg:border-b-0 lg:border-r-2 border-iv-ink">
        <p.Icon aria-hidden="true" className="w-10 h-10 text-iv-green" />
        <h2 id={`${p.id}-titre`} className={cn(h2Cls, "lg:text-4xl text-balance")}>
          {p.label}
        </h2>
        <p className="m-0 font-medium text-iv-ink lg:text-[19px] leading-normal">{p.hook}</p>
      </div>
      <div className="flex flex-col bg-iv-cream">
        {p.whyBlocks && (
          <>
            <div className="flex flex-col gap-2.5 px-5 pt-7 pb-4 lg:px-12 lg:pt-10 lg:pb-7">
              <h3 className="m-0 text-[22px] lg:text-[26px]">{p.whyTitle}</h3>
              <p className="m-0 leading-[1.55]">{p.whyText}</p>
            </div>
            <ul className="flex flex-col lg:grid lg:grid-cols-3 m-0 p-0 list-none border-t border-iv-hair lg:border-b-2 lg:border-b-iv-ink">
              {p.whyBlocks.map(([Icon, t, d], i) => (
                <li
                  key={t}
                  className={cn(
                    "grid grid-cols-[36px_1fr] gap-3 px-5 py-[18px] border-b border-iv-hair lg:flex lg:flex-col lg:gap-2.5 lg:px-8 lg:py-7 lg:border-b-0",
                    i < 2 && "lg:border-r",
                  )}
                >
                  <Icon aria-hidden="true" className={iconCls} />
                  <span className="flex flex-col gap-1 lg:gap-2.5">
                    <span className="text-xl lg:text-[21px] font-bold text-iv-ink">{t}</span>
                    <span className="leading-normal">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        {p.lead && (
          <p className="m-0 px-5 pt-7 pb-1 lg:px-12 lg:pt-10 lg:pb-2 lg:text-[19px] leading-[1.6] text-iv-ink text-pretty">{p.lead}</p>
        )}
        <div className="px-5 pt-6 pb-2 lg:px-12 lg:pt-8 lg:pb-3">
          <Kicker>Exemples d'ateliers</Kicker>
        </div>
        <ol className="m-0 p-0 list-none">
          {p.items.map(([t, d], i) => (
            <li key={t} className="grid grid-cols-[40px_1fr] lg:grid-cols-[56px_1fr] gap-3 lg:gap-4 px-5 py-[18px] lg:px-12 lg:py-5 border-t border-iv-hair">
              <span aria-hidden="true" className="text-xl lg:text-2xl font-extrabold text-iv-green">
                {"0" + (i + 1)}
              </span>
              <span className="flex flex-col gap-1">
                <h3 className="m-0 text-xl lg:text-[21px] leading-[1.25]">{t}</h3>
                <span className="leading-normal">{d}</span>
              </span>
            </li>
          ))}
        </ol>
        {p.refs && p.refs.length > 0 && (
          <div className="flex flex-col gap-3 lg:gap-3.5 px-5 pt-6 pb-7 lg:px-12 lg:pt-7 lg:pb-9 border-t-2 border-iv-ink">
            <Kicker>{p.refLabel}</Kicker>
            <ul className="flex flex-wrap gap-2 lg:gap-2.5 m-0 p-0 list-none">
              {p.refs.map((r) => (
                <li key={r} className="px-3.5 lg:px-4 py-2.5 border-2 border-iv-ink font-semibold text-iv-ink bg-iv-paper">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        {p.testimonials && (
          <div className="flex flex-col lg:grid lg:grid-cols-2 border-t-2 border-iv-ink">
            {TESTIMONIALS.map((q, i) => (
              <figure
                key={q.name}
                className={cn(
                  "flex flex-col justify-between gap-3.5 lg:gap-[18px] m-0 px-5 py-6 lg:px-12 lg:py-8 bg-iv-paper border-b border-iv-hair lg:border-b-0",
                  i > 0 && "lg:border-l",
                )}
              >
                <blockquote className="m-0 text-[19px] lg:text-xl font-medium leading-[1.45] text-iv-ink">{q.text}</blockquote>
                <figcaption className="flex flex-col gap-0.5 leading-[1.4]">
                  <strong className="text-iv-ink">{q.name}</strong>
                  <span>{q.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Ateliers() {
  usePageMeta({
    title: "Ateliers IA pour associations, collectivités et réseaux professionnels à Vienne | initIA Vienne",
    description:
      "Formation IA à Vienne : ateliers d'initiation sur mesure pour les associations, les collectivités et les réseaux professionnels. Agenda, formats, modalités et devis gratuit.",
  });

  return (
    <main>
      {/* Bandeau */}
      <section className="iv-dark bg-iv-green text-iv-paper">
        <div className="iv-band [--pad:48px] flex flex-col gap-[22px] lg:gap-7 px-5 pt-10 pb-8 lg:px-12 lg:pt-[72px] lg:pb-14">
          <HeroBadge>Agenda et offre des ateliers</HeroBadge>
          <h1 className="m-0 max-w-[1060px] text-iv-paper text-[38px] md:text-[56px] xl:text-[72px] font-extrabold leading-[1.02] xl:leading-[0.98] tracking-[-0.02em] xl:tracking-[-0.025em] text-balance">
            Ateliers d'initiation à l'IA à Vienne, pour votre structure
          </h1>
          <p className="m-0 max-w-[760px] lg:text-[21px] leading-normal">
            Des ateliers sur mesure pour les associations, les collectivités et les réseaux professionnels. Dans vos locaux, en petit groupe, à partir de vos situations réelles.
          </p>
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2.5 lg:gap-4">
            <OrangeButton href="#contact" className="w-full lg:w-auto lg:min-w-[300px]">
              Demander un devis gratuit
            </OrangeButton>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center h-14 px-5 font-bold text-lg border-2 border-iv-paper text-iv-paper hover:bg-iv-paper hover:text-iv-green transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <OrangeRule />
      </section>

      {/* Sommaire de la page */}
      <nav aria-label="Sur cette page" className="iv-band flex overflow-x-auto lg:flex-wrap lg:overflow-visible border-b-2 border-iv-ink bg-iv-sand">
        {ANCHORS.map(([href, label], i) => (
          <a
            key={href}
            href={href}
            className={cn(
              "flex-none flex items-center min-h-[52px] lg:min-h-14 px-4 lg:px-5 border-r border-iv-hair whitespace-nowrap font-semibold text-iv-ink hover:bg-iv-cream hover:text-iv-green",
              i === ANCHORS.length - 1 && "lg:border-r-0",
            )}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Agenda */}
      <section id="agenda" aria-labelledby="agenda-titre" className="iv-band flex flex-col lg:grid lg:grid-cols-[4fr_8fr] border-b-2 border-iv-ink">
        <div className="flex flex-col gap-3 lg:gap-2.5 px-5 pt-9 pb-4 lg:p-12 lg:py-14 lg:border-r-2 border-iv-ink">
          <Kicker>Agenda des ateliers</Kicker>
          <h2 id="agenda-titre" className={cn(h2Cls, "lg:text-4xl")}>
            Prochains ateliers ouverts
          </h2>
        </div>
        <div className="flex flex-col justify-center px-5 pb-9 lg:px-12 lg:py-10">
          <AgendaAteliers />
        </div>
      </section>

      {/* Socle commun */}
      <section id="socle" aria-label="Le socle commun" className="iv-band flex flex-col lg:grid lg:grid-cols-[4fr_8fr] border-b-2 border-iv-ink">
        <SplitHead kicker="Le socle commun" title="Mes objectifs pédagogiques">
          <p className="m-0 leading-[1.55]">
            Chaque atelier s'adapte au niveau et au quotidien de vos participants, avec une priorité : passer très vite à la pratique.
          </p>
        </SplitHead>
        <div className="flex flex-col">
          <ul className="m-0 p-0 list-none border-t-2 lg:border-t-0 border-iv-ink">
            {GOALS.map((g) => (
              <li key={g} className="grid grid-cols-[26px_1fr] lg:grid-cols-[28px_1fr] gap-3 lg:gap-4 items-start px-5 py-4 lg:px-12 lg:py-5 border-b border-iv-hair">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#006D29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="font-medium lg:text-[19px] leading-[1.45] text-iv-ink">{g}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 lg:gap-3.5 px-5 pt-6 pb-9 lg:px-12 lg:pt-7">
            <Kicker>Outils présentés, à égalité</Kicker>
            <ul className="grid grid-cols-2 lg:grid-cols-4 m-0 p-0 list-none border-2 border-iv-ink">
              {TOOLS.map((name, i) => (
                <li
                  key={name}
                  className={cn(
                    "flex items-center min-h-[60px] lg:min-h-16 px-4 lg:px-5 bg-iv-paper text-[19px] lg:text-xl font-bold text-iv-ink border-iv-hair",
                    i % 2 === 0 && "border-r",
                    i < 2 && "border-b lg:border-b-0",
                    i === 1 && "lg:border-r",
                    i === 3 && "lg:border-r-0",
                  )}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Déroulé */}
      <section id="deroule" aria-labelledby="deroule-titre" className="iv-band [--pad:48px] iv-dark flex flex-col gap-5 lg:gap-8 px-5 py-9 lg:p-12 lg:py-14 bg-iv-green text-iv-paper border-b-2 border-iv-ink">
        <div className="flex flex-col gap-2.5">
          <Kicker className="text-iv-paper">Déroulé d'un atelier</Kicker>
          <h2 id="deroule-titre" className={cn(h2Cls, "lg:text-[40px] text-iv-paper")}>
            Comment se déroule un atelier ?
          </h2>
          <p className="m-0 lg:text-[19px] leading-normal">Une méthode éprouvée, basée sur l'échange et la pratique.</p>
        </div>
        <ol className="flex flex-col lg:grid lg:grid-cols-4 m-0 p-0 list-none border-t-2 border-iv-paper">
          {STEPS.map(([t, d], i) => (
            <li
              key={t}
              className={cn(
                "grid grid-cols-[44px_1fr] gap-3 py-5 border-b border-iv-hair-light lg:flex lg:flex-col lg:gap-3.5 lg:pt-8 lg:pb-2 lg:border-b-0",
                i === 0 ? "lg:pr-7" : "lg:px-7 lg:border-l",
              )}
            >
              <span aria-hidden="true" className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-iv-orange text-iv-ink text-lg lg:text-xl font-extrabold">
                {i + 1}
              </span>
              <span className="flex flex-col gap-1 lg:gap-3.5">
                <h3 className="m-0 text-[21px] lg:text-2xl text-iv-paper">{t}</h3>
                <span className="leading-normal lg:leading-[1.55]">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {PUBLICS.map((p) => (
        <PublicSection key={p.id} p={p} />
      ))}

      {/* Formats */}
      <section id="formats" aria-labelledby="formats-titre" className="iv-band [--pad:48px] flex flex-col gap-4 lg:gap-7 px-5 py-9 lg:p-12 lg:py-14 border-b-2 border-iv-ink">
        <div className="flex flex-col gap-2.5">
          <Kicker>Formats</Kicker>
          <h2 id="formats-titre" className={cn(h2Cls, "lg:text-[40px]")}>
            Formats proposés
          </h2>
        </div>
        <table className="w-full border-collapse border-t-2 border-iv-ink">
          <thead className="hidden lg:table-header-group">
            <tr className="border-b-2 border-iv-ink">
              {["Format", "Durée", "Pour qui"].map((h) => (
                <th key={h} scope="col" className="py-3.5 pr-6 text-left text-base font-bold uppercase tracking-[0.06em] text-iv-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FORMATS.map(([f, d, p]) => (
              <tr key={f} className="flex flex-col gap-1 py-4 lg:table-row lg:py-0 border-b border-iv-hair">
                <th scope="row" className="lg:w-[33%] lg:py-[18px] lg:pr-6 text-left text-xl font-bold leading-[1.3] text-iv-ink align-top">
                  {f}
                </th>
                <td className="lg:w-[17%] lg:py-[18px] lg:pr-6 font-semibold leading-[1.4] text-iv-green align-top">{d}</td>
                <td className="lg:py-[18px] leading-[1.45] align-top">{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modalités */}
      <section id="modalites" aria-labelledby="modalites-titre" className="iv-band">
        <div className="flex flex-col gap-2.5 px-5 pt-9 pb-5 lg:px-12 lg:pt-14 lg:pb-7">
          <Kicker>Modalités pratiques</Kicker>
          <h2 id="modalites-titre" className={cn(h2Cls, "lg:text-[40px]")}>
            Une organisation simple pour faciliter la mise en place de vos ateliers.
          </h2>
        </div>
        <ul className="flex flex-col lg:grid lg:grid-cols-4 m-0 p-0 list-none border-t-2 border-iv-ink">
          {MODAL.map(([Icon, t, d], i) => (
            <li
              key={t}
              className={cn(
                "grid grid-cols-[36px_1fr] gap-3 px-5 py-[18px] border-b border-iv-hair lg:flex lg:flex-col lg:px-8 lg:pt-8 lg:pb-9 lg:border-b-0",
                i < 3 && "lg:border-r",
              )}
            >
              <Icon aria-hidden="true" className={iconCls} />
              <span className="flex flex-col gap-1 lg:gap-3">
                <h3 className="m-0 text-xl lg:text-[22px]">{t}</h3>
                <span className="leading-normal">{d}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="m-0 px-5 py-[18px] lg:px-12 lg:py-[22px] lg:border-t border-iv-hair bg-iv-sand font-medium text-iv-ink leading-normal">
          Tarif selon la prestation. Devis gratuit et sans engagement.
        </p>
      </section>

      <div id="faq">
        <SiteFaq set="full" />
      </div>

      <div id="contact">
        <ContactBlock
          label="Contact"
          title="Construisons votre projet ensemble"
          intro="Devis gratuit. J'adapte le contenu et la durée à vos contraintes et à vos publics."
        />
      </div>
    </main>
  );
}
