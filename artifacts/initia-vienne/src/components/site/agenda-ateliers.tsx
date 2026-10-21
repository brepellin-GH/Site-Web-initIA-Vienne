import { useEffect, useState } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { outlineButtonClass, textLinkClass } from "@/components/site/ui";

// Lecture de la table ateliers : une seule requête (visible = true), séparée
// ensuite entre ateliers publics (agenda) et privés (références).

type Atelier = {
  id: string;
  titre: string;
  date_heure: string;
  lieu: string;
  public_cible: string | null;
  themes: string | null;
  inscription_type: string | null;
  inscription_contact: string | null;
  inscription_label: string | null;
  places_restantes: number | null;
  acces: string | null;
};

// acces absent ou inconnu : l'atelier est traité comme public.
const estPrive = (a: Atelier) => a.acces === "prive";

const dateLocale = (iso: string) => new Date(iso.replace(/([+-]\d{2}:\d{2}|Z)$/, ""));

function formatDate(iso: string) {
  const date = dateLocale(iso);
  const datePart = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return datePart.charAt(0).toUpperCase() + datePart.slice(1) + " à " + timePart;
}

function formatMois(iso: string) {
  return dateLocale(iso).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

const actionCls =
  "inline-flex items-center gap-3 h-12 px-[18px] font-bold text-lg border-2 border-iv-ink text-iv-ink hover:bg-iv-ink/10 transition-colors";

const badgeCls = "self-start px-2 py-0.5 font-semibold border-2";

export type AteliersParAcces = {
  loading: boolean;
  publics: Atelier[];
  prives: Atelier[];
};

export function useAteliers(): AteliersParAcces {
  const [state, setState] = useState<AteliersParAcces>({ loading: true, publics: [], prives: [] });

  useEffect(() => {
    supabase
      .from("ateliers")
      .select("*")
      .eq("visible", true)
      .order("date_heure", { ascending: true })
      .then(({ data }) => {
        const rows = (data as Atelier[]) ?? [];
        const now = Date.now();
        const ilYaUnAn = new Date();
        ilYaUnAn.setFullYear(ilYaUnAn.getFullYear() - 1);
        const t = (a: Atelier) => new Date(a.date_heure).getTime();

        // Publics : à venir uniquement, par date croissante.
        const publics = rows.filter((a) => !estPrive(a) && t(a) > now);

        // Privés : à venir (du plus proche au plus lointain), puis réalisés
        // des 12 derniers mois (du plus récent au plus ancien).
        const prives = rows.filter(estPrive);
        const aVenir = prives.filter((a) => t(a) > now);
        const realises = prives.filter((a) => t(a) <= now && t(a) >= ilYaUnAn.getTime()).reverse();

        setState({ loading: false, publics, prives: [...aVenir, ...realises] });
      });
  }, []);

  return state;
}

export function AgendaAteliers({ loading, ateliers }: { loading: boolean; ateliers: Atelier[] }) {
  if (loading) {
    return <p className="m-0 text-iv-ink">Chargement de l'agenda…</p>;
  }

  if (ateliers.length === 0) {
    return (
      <div className="flex flex-col gap-3 text-[19px] text-iv-ink">
        <p className="m-0">
          Pas de date ouverte au public pour le moment. Vous représentez une structure&nbsp;? Je peux animer un atelier chez vous.
        </p>
        <p className="m-0 flex flex-wrap gap-x-6 gap-y-2">
          <a href="#fiches" className={cn(textLinkClass, "underline")}>
            Voir les fiches de présentation
          </a>
          <Link href="/contact" className={cn(textLinkClass, "underline")}>
            Me contacter
          </Link>
        </p>
        <p className="m-0 text-lg">
          Pour être prévenu des prochaines dates, abonnez-vous à la{" "}
          <Link href="/newsletter" className="font-bold text-iv-green underline underline-offset-4 hover:text-iv-green-dark">
            newsletter
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col m-0 p-0 list-none border-t-2 border-iv-ink">
      {ateliers.map((atelier) => (
        <li
          key={atelier.id}
          className="flex flex-col gap-1.5 py-[18px] lg:grid lg:grid-cols-[3fr_5fr_auto] lg:gap-6 lg:items-center lg:py-5 border-b border-iv-hair"
        >
          <span className="text-lg lg:text-[19px] font-bold text-iv-green">{formatDate(atelier.date_heure)}</span>
          <span className="flex flex-col gap-0.5">
            <span className="text-xl font-bold text-iv-ink">{atelier.titre}</span>
            <span>{atelier.lieu}</span>
            {atelier.public_cible && <span>Public : {atelier.public_cible}</span>}
            {atelier.themes && <span>Thèmes : {atelier.themes}</span>}
            {atelier.places_restantes !== null && (
              <span
                className={cn(
                  "self-start mt-1 px-2 py-0.5 font-semibold border-2",
                  atelier.places_restantes <= 3 ? "border-[#B42318] text-[#B42318]" : "border-iv-green text-iv-green",
                )}
              >
                {atelier.places_restantes <= 0
                  ? "Complet"
                  : `${atelier.places_restantes} place${atelier.places_restantes > 1 ? "s" : ""} restante${atelier.places_restantes > 1 ? "s" : ""}`}
              </span>
            )}
          </span>
          <span className="mt-1.5 lg:mt-0">
            {atelier.inscription_type === "direct" ? (
              <Link href="/contact" className={actionCls}>
                S'inscrire
              </Link>
            ) : atelier.inscription_contact ? (
              <a
                href={
                  atelier.inscription_contact.startsWith("http")
                    ? atelier.inscription_contact
                    : `mailto:${atelier.inscription_contact}`
                }
                target={atelier.inscription_contact.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={actionCls}
              >
                Contacter {atelier.inscription_label || "l'organisateur"}
              </a>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

// Ateliers privés : références, sans inscription, contact, places ni heure.
export function InterventionsPrivees({ ateliers }: { ateliers: Atelier[] }) {
  const now = Date.now();
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col m-0 p-0 list-none border-t-2 border-iv-ink">
        {ateliers.map((atelier) => {
          const aVenir = new Date(atelier.date_heure).getTime() > now;
          return (
            <li
              key={atelier.id}
              className="flex flex-col gap-1.5 py-[18px] lg:grid lg:grid-cols-[3fr_5fr] lg:gap-6 lg:items-start lg:py-5 border-b border-iv-hair"
            >
              <span className="flex flex-col gap-2">
                <span className="text-lg lg:text-[19px] font-bold text-iv-green first-letter:uppercase">
                  {formatMois(atelier.date_heure)}
                </span>
                <span className="flex flex-wrap gap-2">
                  <span className={cn(badgeCls, "border-iv-ink text-iv-ink")}>Atelier privé</span>
                  <span className={cn(badgeCls, aVenir ? "border-iv-green text-iv-green" : "border-iv-text text-iv-text")}>
                    {aVenir ? "À venir" : "Réalisé"}
                  </span>
                </span>
              </span>
              <span className="flex flex-col gap-0.5 mt-1 lg:mt-0">
                <span className="text-xl font-bold text-iv-ink">{atelier.titre}</span>
                <span>{atelier.lieu}</span>
                {atelier.public_cible && <span>Public : {atelier.public_cible}</span>}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <p className="m-0 text-[19px] text-iv-ink">
          Vous représentez une association, une collectivité ou une entreprise&nbsp;? Je peux animer un atelier chez vous.
        </p>
        <a href="#fiches" className={cn(outlineButtonClass, "self-start lg:self-auto flex-none")}>
          Voir les fiches
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
