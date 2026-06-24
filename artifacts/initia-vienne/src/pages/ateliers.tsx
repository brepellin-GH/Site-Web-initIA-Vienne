import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Calendar, MapPin, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Link } from "wouter";

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

export default function Ateliers() {
  usePageMeta({
    title: "Nos ateliers IA à Vienne | initIA Vienne",
    description: "Calendrier des ateliers d'initiation à l'intelligence artificielle à Vienne : niveau 1, niveau 2, places et inscriptions pour associations et particuliers.",
  });
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

  return (
    <main className="flex-1 w-full">

      {/* ── HERO ──────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-brand-cream">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 text-brand-green font-semibold text-sm mb-6 border border-brand-green/20"
          >
            <Calendar className="w-4 h-4" />
            Agenda des ateliers
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-display font-extrabold text-primary leading-tight mb-4"
          >
            Prochains ateliers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Des ateliers d'initiation à l'IA simples, concrets et bienveillants.
            Venez avec votre smartphone ou tablette, aucune connaissance préalable n'est requise.
          </motion.p>
        </div>
      </section>

      {/* ── LISTE ATELIERS ────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Chargement...</div>
          ) : ateliers.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-lg text-muted-foreground">
                Aucun atelier programmé pour le moment.
              </p>
              <p className="text-muted-foreground">
                Contactez-moi pour être informé des prochaines dates.
              </p>
              <Link href="/#contact">
                <Button variant="accent" className="mt-4">
                  Me contacter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {ateliers.map((atelier, i) => (
                <motion.div
                  key={atelier.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md hover:border-brand-green/20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1 space-y-4">
                      <h2 className="text-xl md:text-2xl font-display font-bold text-primary">
                        {atelier.titre}
                      </h2>

                      <div className="flex flex-col gap-3 text-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-brand-green" />
                            <span>{formatDate(atelier.date_heure)}</span>
                          </div>
                          <span className="hidden md:block text-muted-foreground/30">·</span>
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-green" />
                            <span>{atelier.lieu}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {atelier.public_cible && (
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <Users className="w-4 h-4 mt-0.5 shrink-0 text-brand-green" />
                              <span>{atelier.public_cible}</span>
                            </div>
                          )}
                          {atelier.places_restantes !== null && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${atelier.places_restantes <= 3 ? "bg-red-100 text-red-700" : "bg-brand-green/10 text-brand-green"}`}>
                              {atelier.places_restantes <= 0 ? "Complet" : `${atelier.places_restantes} place${atelier.places_restantes > 1 ? "s" : ""} restante${atelier.places_restantes > 1 ? "s" : ""}`}
                            </span>
                          )}
                        </div>
                      </div>

                      {atelier.themes && (
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                          <BookOpen className="w-4 h-4 mt-0.5 shrink-0 text-brand-orange" />
                          <span>{atelier.themes}</span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0">
                      {atelier.inscription_type === "direct" ? (
                        <Link href="/#contact">
                          <Button variant="accent" className="w-full md:w-auto">
                            Je m'inscris
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      ) : atelier.inscription_contact ? (
                        <a
                          href={atelier.inscription_contact.startsWith("http") ? atelier.inscription_contact : `mailto:${atelier.inscription_contact}`}
                          target={atelier.inscription_contact.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="w-full md:w-auto border-primary/20 hover:bg-primary/5">
                            Contacter {atelier.inscription_label || "l'organisateur"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold text-primary mb-3">
            Vous organisez des ateliers ?
          </h2>
          <p className="text-muted-foreground mb-6">
            Collectivités, associations, centres sociaux — je me déplace dans vos locaux sur toute la région de Vienne.
          </p>
          <Link href="/collectivites">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
              Découvrir l'offre collectivités
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}
