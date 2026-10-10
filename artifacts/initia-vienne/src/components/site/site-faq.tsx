import { useId, useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Kicker } from "./ui";

type QA = [question: string, answer: string];

function questions(home: boolean): Record<string, QA> {
  return {
    prerequis: [
      "Vos participants doivent-ils avoir des compétences en informatique ?",
      "Non, aucune. Les ateliers sont conçus pour des débutants : je pars de zéro et j'avance au rythme du groupe. S'ils savent utiliser un smartphone ou envoyer un e-mail, ils ont déjà tout ce qu'il faut. Et si le niveau est hétérogène, les exercices s'adaptent pour que chacun progresse.",
    ],
    tarif: [
      home ? "Combien coûte un atelier ?" : "Comment se calcule le tarif ?",
      "Le tarif dépend du format, de la durée et du nombre de participants. Je vous adresse un devis gratuit et sans engagement.",
    ],
    lieu: [
      "Puis-je organiser un atelier dans mes locaux ?",
      "Oui. J'interviens dans vos locaux ou en salle partenaire, à Vienne et dans les environs.",
    ],
    publics: [
      "Quels publics peuvent bénéficier de ces ateliers ?",
      "Tous les publics, des adolescents aux retraités, quelle que soit leur aisance numérique. J'interviens auprès d'adhérents et de bénévoles d'associations, de publics accueillis en centre social, d'agents de collectivité et de professionnels (commerçants, artisans, créateurs d'entreprise). Les exemples et les exercices sont adaptés à chaque groupe.",
    ],
    delai: [
      "Combien de temps à l'avance faut-il planifier ?",
      "Idéalement 4 à 6 semaines à l'avance pour caler les disponibilités et préparer un contenu adapté à votre public. Je peux parfois intervenir plus rapidement selon mes disponibilités.",
    ],
    materiel: [
      "Quel équipement faut-il prévoir dans vos locaux ?",
      "Une salle équipée de tables, avec un écran de projection ou un mur clair. J'apporte le vidéoprojecteur. Côté connexion, l'idéal est un accès wifi pour les participants. À défaut, la salle doit offrir une bonne réception 4G ou 5G. Chaque participant vient avec son smartphone, sa tablette ou son ordinateur portable, et sa propre connexion mobile si aucun wifi n'est disponible.",
    ],
    sessions: [
      "Peut-on organiser plusieurs sessions pour le même groupe ?",
      "Oui. Un atelier de niveau 2 est possible pour les groupes qui ont suivi l'initiation, ainsi que des ateliers thématiques par métier ou par mission.",
    ],
  };
}

const HOME_KEYS = ["prerequis", "tarif", "lieu"];
const FULL_KEYS = ["publics", "delai", "prerequis", "materiel", "lieu", "tarif", "sessions"];

export function SiteFaq({ set = "home" }: { set?: "home" | "full" }) {
  const home = set === "home";
  const Q = questions(home);
  const items = (home ? HOME_KEYS : FULL_KEYS).map((k) => Q[k]);
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="iv-band [--pad:48px] grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-7 lg:gap-12 px-5 py-10 lg:px-12 lg:py-16 border-t-2 border-iv-ink">
      <div className="flex flex-col gap-3">
        <Kicker>Questions fréquentes</Kicker>
        <h2 className="m-0 text-[28px] lg:text-4xl leading-[1.12] text-balance">
          {home ? "Les questions qu'on me pose le plus souvent." : "Vos questions, mes réponses"}
        </h2>
        {!home && <p className="m-0">Tout ce que les structures me demandent habituellement.</p>}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col border-t-2 border-iv-ink">
          {items.map(([q, a], i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={q} className="flex flex-col border-b border-iv-hair">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex justify-between items-center gap-4 min-h-16 py-4 bg-transparent text-iv-ink text-left cursor-pointer"
                  >
                    <span className="text-[19px] lg:text-[21px] font-bold leading-[1.3]">{q}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex-none w-9 h-9 flex items-center justify-center border-2 text-xl font-bold",
                        isOpen ? "border-iv-green bg-iv-green text-iv-paper" : "border-iv-text text-iv-ink",
                      )}
                    >
                      {isOpen ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}>
                  <p className="m-0 lg:pr-12 pb-5 leading-[1.6] text-pretty">{a}</p>
                </div>
              </div>
            );
          })}
        </div>
        {home && (
          <Link href="/ateliers#faq" className="font-bold text-iv-green hover:text-iv-green-dark">
            Toutes les questions sur la page Ateliers →
          </Link>
        )}
      </div>
    </div>
  );
}
