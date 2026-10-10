import { Link } from "wouter";
import { Coffee, HandHeart, Presentation, Scale, ShieldAlert, type LucideIcon } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { cn } from "@/lib/utils";
import { DAUPHINE_HREF, HeroBadge, Kicker, OrangeButton, OrangeRule } from "@/components/site/ui";

const IMG = `${import.meta.env.BASE_URL}images/site/`;

const WAYS: [LucideIcon, string, string][] = [
  [Presentation, "Démonstrations en direct", "On regarde les outils fonctionner, en vrai, sur grand écran."],
  [Coffee, "Exemples du quotidien", "Les exercices partent de situations que les participants connaissent."],
  [Scale, "Outils présentés sans parti pris", "ChatGPT, Claude, Gemini et Vibe, solution française."],
  [ShieldAlert, "Esprit critique et vigilance", "Fausses informations, données personnelles : on apprend à se protéger."],
  [HandHeart, "Aucune pression commerciale", "On vient pour apprendre, pas pour acheter."],
];

const PARTNERS = ["Club Léo Lagrange de Vienne", "Centre social d'Estressin", "Compagnons du Devoir, centre de Brignais"];

const FIGURES: [string, string][] = [
  ["Plus de 100", "participants"],
  ["10", "ateliers réalisés"],
  ["64", "abonnés à la newsletter"],
];

const rowCls = "flex flex-col gap-1 lg:grid lg:grid-cols-[200px_1fr] lg:gap-6 px-5 py-[18px] lg:px-12 lg:py-6 border-b border-iv-hair";
const rowLabel = "font-semibold";

export default function APropos() {
  usePageMeta({
    title: "Bruno Repellin, formateur en IA à Vienne | initIA Vienne",
    description:
      "Bruno Repellin anime à Vienne (Isère) des ateliers d'initiation à l'intelligence artificielle pour les habitants et les structures de la région.",
  });

  return (
    <main>
      {/* Bandeau */}
      <section className="iv-dark bg-iv-green text-iv-paper">
        <div className="iv-band flex flex-col lg:grid lg:grid-cols-[5fr_7fr]">
          <div className="relative h-[340px] lg:h-auto lg:min-h-[560px] border-b-2 lg:border-b-0 lg:border-r-2 border-iv-ink overflow-hidden">
            <img
              src={`${IMG}bruno-2026-800.webp`}
              srcSet={`${IMG}bruno-2026-480.webp 480w, ${IMG}bruno-2026-800.webp 800w`}
              sizes="(min-width: 1024px) 42vw, 100vw"
              alt="Portrait de Bruno Repellin"
              width={800}
              height={949}
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover object-[50%_25%] lg:object-[50%_30%]"
            />
          </div>
          <div className="flex flex-col justify-end gap-5 lg:gap-7 px-5 py-8 lg:px-12 lg:pt-20 lg:pb-16">
            <HeroBadge>À propos</HeroBadge>
            <h1 className="m-0 text-iv-paper text-[30px] md:text-[40px] xl:text-[52px] font-extrabold leading-[1.12] xl:leading-[1.04] xl:tracking-[-0.02em] text-pretty">
              Je m'appelle Bruno Repellin. J'aide les habitants et les structures de la région de Vienne à apprivoiser l'intelligence artificielle.
            </h1>
          </div>
        </div>
        <OrangeRule />
      </section>

      {/* Parcours */}
      <section aria-label="Mon parcours" className="iv-band flex flex-col gap-3 lg:gap-0 lg:grid lg:grid-cols-[4fr_8fr] px-5 py-9 lg:p-0 border-b-2 border-iv-ink">
        <div className="flex flex-col gap-2.5 lg:gap-3 lg:px-12 lg:py-14 lg:border-r-2 border-iv-ink">
          <Kicker>Mon parcours</Kicker>
          <h2 className="m-0 text-[28px] lg:text-4xl leading-[1.1]">Une carrière dans le numérique, une envie de partager.</h2>
        </div>
        <p className="m-0 lg:px-12 lg:py-14 text-[19px] lg:text-[22px] leading-[1.6] text-iv-ink text-pretty">
          Après une carrière dans l'informatique chez Groupama Rhône-Alpes Auvergne, où j'ai notamment accompagné l'adoption de l'IA, j'ai créé initIA Vienne pour rendre ces outils accessibles à tous. Je vis à Vienne et j'interviens dans l'Isère et le Rhône (autres départements après étude).
        </p>
      </section>

      {/* Pourquoi */}
      <section aria-labelledby="pourquoi-titre" className="iv-band flex flex-col lg:grid lg:grid-cols-[4fr_8fr] border-b-2 border-iv-ink">
        <div className="flex flex-col gap-2.5 lg:gap-3 px-5 pt-9 pb-5 lg:px-12 lg:py-14 lg:border-r-2 border-iv-ink">
          <Kicker>Pourquoi initIA Vienne</Kicker>
          <h2 id="pourquoi-titre" className="m-0 text-[28px] lg:text-4xl leading-[1.1]">
            Transmettre, près de chez moi.
          </h2>
        </div>
        <p className="m-0 px-5 pt-5 pb-9 lg:px-12 lg:py-14 text-[19px] lg:text-[22px] leading-[1.6] text-iv-ink text-pretty">
          Pendant des années, j'ai vu l'informatique transformer le travail de mes collègues, puis l'IA arriver dans l'entreprise. J'ai surtout vu combien une bonne explication change tout : la méfiance laisse place à la curiosité, puis à l'envie d'essayer. Avec initIA Vienne, je veux offrir ce déclic au plus grand nombre, ici, dans la région où je vis.
        </p>
      </section>

      {/* Ma façon de faire */}
      <section aria-labelledby="facon-titre" className="iv-band">
        <div className="flex flex-col gap-2.5 px-5 pt-9 pb-5 lg:px-12 lg:pt-14 lg:pb-8">
          <Kicker>Ma façon de faire</Kicker>
          <h2 id="facon-titre" className="m-0 text-[28px] lg:text-[40px] leading-[1.1]">
            Pas de grand discours sur l'IA. On la teste.
          </h2>
        </div>
        <ul className="flex flex-col lg:grid lg:grid-cols-5 m-0 p-0 list-none border-t-2 border-b-2 border-iv-ink">
          {WAYS.map(([Icon, t, d], i) => (
            <li
              key={t}
              className={cn(
                "grid grid-cols-[36px_1fr] gap-3 px-5 py-[18px] border-b border-iv-hair lg:flex lg:flex-col lg:py-8 lg:border-b-0",
                i === 0 ? "lg:pl-12 lg:pr-7" : "lg:px-7",
                i < 4 && "lg:border-r",
                i === 4 && "border-b-0",
              )}
            >
              <Icon aria-hidden="true" className="w-7 h-7 text-iv-green" />
              <span className="flex flex-col gap-1 lg:gap-3">
                <h3 className="m-0 text-xl lg:text-[21px] leading-[1.25]">{t}</h3>
                <span className="leading-normal">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Ancrage local */}
      <section aria-labelledby="ancrage-titre" className="iv-band flex flex-col lg:grid lg:grid-cols-[4fr_8fr] border-b-2 border-iv-ink">
        <div className="flex flex-col gap-2.5 lg:gap-3 px-5 pt-9 pb-5 lg:px-12 lg:py-14 lg:border-r-2 border-iv-ink">
          <Kicker>Ancrage local</Kicker>
          <h2 id="ancrage-titre" className="m-0 text-[28px] lg:text-4xl leading-[1.1]">
            À Vienne, avec les acteurs du territoire.
          </h2>
        </div>
        <dl className="flex flex-col m-0 border-t-2 lg:border-t-0 border-iv-ink">
          <div className={rowCls}>
            <dt className={rowLabel}>Basé à</dt>
            <dd className="m-0 text-xl lg:text-[21px] font-bold text-iv-ink">Vienne (38)</dd>
          </div>
          <div className={rowCls}>
            <dt className={rowLabel}>Membre de</dt>
            <dd className="m-0 text-xl lg:text-[21px] font-bold text-iv-ink">Vienne Atout Commerce</dd>
          </div>
          <div className={cn(rowCls, "gap-2.5")}>
            <dt className={rowLabel}>Partenaires</dt>
            <dd className="m-0 flex flex-wrap gap-2">
              {PARTNERS.map((p) => (
                <span key={p} className="px-3 lg:px-3.5 py-2 border-2 border-iv-ink bg-iv-paper font-semibold text-iv-ink">
                  {p}
                </span>
              ))}
            </dd>
          </div>
          <div className={cn(rowCls, "gap-2.5 bg-iv-sand border-b-0")}>
            <dt className={rowLabel}>Presse</dt>
            <dd className="m-0 flex flex-col gap-2.5">
              <span className="font-semibold text-iv-ink">Vu dans Le Dauphiné Libéré · mars 2026</span>
              <span className="text-[19px] lg:text-[22px] font-semibold leading-[1.35] text-iv-ink">
                « Il faut qu'il y ait un intérêt à l'usage de l'IA, on ne peut pas tout faire avec. »
              </span>
              <span className="flex flex-col lg:flex-row lg:flex-wrap lg:items-baseline gap-x-2.5 gap-y-1">
                <a href={DAUPHINE_HREF} target="_blank" rel="noopener" className="font-bold leading-[1.4] text-iv-green underline-offset-4 hover:underline hover:text-iv-green-dark">
                  Lire l'article : Cet expert donne ses conseils pour un bon usage de l'IA →
                </a>
                <span className="text-base">(réservé aux abonnés)</span>
              </span>
            </dd>
          </div>
        </dl>
      </section>

      {/* Chiffres */}
      <section aria-labelledby="chiffres-titre" className="iv-band">
        <div className="px-5 pt-9 pb-4 lg:px-12 lg:pt-14 lg:pb-8">
          <h2 id="chiffres-titre" className="m-0">
            <Kicker>Quelques chiffres</Kicker>
          </h2>
        </div>
        <ul className="flex flex-col lg:grid lg:grid-cols-3 m-0 p-0 list-none border-t-2 border-b-2 border-iv-ink">
          {FIGURES.map(([n, label], i) => (
            <li
              key={label}
              className={cn(
                "flex items-baseline gap-4 p-5 border-b border-iv-hair lg:flex-col lg:items-start lg:gap-2.5 lg:px-12 lg:py-10 lg:border-b-0",
                i < 2 && "lg:border-r-2 lg:border-r-iv-ink",
                i === 2 && "border-b-0",
              )}
            >
              <span className="text-[40px] lg:text-[56px] font-extrabold leading-none text-iv-green">{n}</span>
              <span className="font-medium text-iv-ink">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Appel à l'action */}
      <section className="iv-dark iv-band [--pad:48px] flex flex-col gap-[18px] lg:flex-row lg:justify-between lg:items-center lg:gap-8 px-5 py-9 lg:p-12 lg:py-14 bg-iv-green text-iv-paper">
        <h2 className="m-0 text-[30px] lg:text-[44px] leading-[1.08] text-iv-paper">Parlons de votre projet</h2>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
          <OrangeButton href="/contact" className="w-full lg:w-auto lg:min-w-[260px]">
            Me contacter
          </OrangeButton>
          <Link href="/newsletter" className="py-2 lg:py-0 font-medium text-iv-paper underline underline-offset-4 hover:text-iv-orange">
            Recevoir la newsletter
          </Link>
        </div>
      </section>
    </main>
  );
}
