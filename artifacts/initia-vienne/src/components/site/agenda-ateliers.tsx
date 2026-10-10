import { useEffect, useState } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

// Lecture de la table ateliers : requête et format de date inchangés.

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
};

function formatDate(iso: string) {
  const date = new Date(iso.replace(/([+-]\d{2}:\d{2}|Z)$/, ""));
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

const actionCls =
  "inline-flex items-center gap-3 h-12 px-[18px] font-bold text-lg border-2 border-iv-ink text-iv-ink hover:bg-iv-ink/10 transition-colors";

export function AgendaAteliers() {
  const [ateliers, setAteliers] = useState<Atelier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("ateliers")
      .select("*")
      .eq("visible", true)
      .gt("date_heure", new Date().toISOString())
      .order("date_heure", { ascending: true })
      .then(({ data }) => {
        setAteliers((data as Atelier[]) ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="m-0 text-iv-ink">Chargement de l'agenda…</p>;
  }

  if (ateliers.length === 0) {
    return (
      <p className="m-0 text-[19px] text-iv-ink">
        Pas d'atelier ouvert programmé en ce moment. Recevez les prochaines dates avec la{" "}
        <Link href="/newsletter" className="font-bold text-iv-green underline underline-offset-4 hover:text-iv-green-dark">
          newsletter
        </Link>
        .
      </p>
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
