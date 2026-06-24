import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Mail, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type Envoi = {
  id: string;
  numero: string | null;
  sujet: string | null;
  fichier_html: string | null;
  date_envoi: string;
};

function formatDateCourte(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function SubscribeForm() {
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, email }),
      });
      const data = await res.json();
      if (data.status === "already_subscribed") setStatus("already");
      else setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success" || status === "already") {
    return (
      <div className="text-center space-y-3 py-6">
        <div className="mx-auto w-14 h-14 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <p className="font-semibold text-primary text-lg">
          {status === "success" ? "Inscription confirmée !" : "Vous êtes déjà inscrit !"}
        </p>
        <p className="text-muted-foreground text-sm">
          {status === "success"
            ? "Vous recevrez la prochaine newsletter dès sa publication."
            : "Votre adresse est bien dans la liste de diffusion."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-primary" htmlFor="prenom">Prénom</label>
          <input
            id="prenom"
            type="text"
            required
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Jean"
            className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-brand-green transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold text-primary" htmlFor="email-nl">Email</label>
          <input
            id="email-nl"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jean@exemple.com"
            className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:outline-none focus:border-brand-green transition-colors"
          />
        </div>
      </div>
      {status === "error" && (
        <p className="text-red-500 text-sm">Une erreur est survenue. Réessayez ou contactez-moi directement.</p>
      )}
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Inscription..." : (
          <>
            S'abonner à la newsletter
            <Mail className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        Désabonnement possible à tout moment via le lien dans chaque email.
      </p>
    </form>
  );
}

export default function Newsletter() {
  usePageMeta({
    title: "L'IA en clair, la newsletter gratuite | initIA Vienne",
    description: "Recevez gratuitement L'IA en clair, la newsletter qui explique l'intelligence artificielle simplement, pour les débutants et les seniors.",
  });
  const [envois, setEnvois] = useState<Envoi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("envois_newsletter")
      .select("id, numero, sujet, fichier_html, date_envoi")
      .order("date_envoi", { ascending: false })
      .then(({ data }) => {
        const rows = (data as Envoi[]) ?? [];
        const seen = new Set<number>();
        const dedup = rows.filter(e => {
          if (seen.has(e.numero)) return false;
          seen.add(e.numero);
          return true;
        });
        setEnvois(dedup);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex-1 w-full">

      {/* ── HERO ──────────────────────────────── */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden bg-brand-cream">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 text-brand-orange font-semibold text-sm mb-6 border border-brand-orange/20"
          >
            <Mail className="w-4 h-4" />
            Newsletter gratuite
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-display font-extrabold text-primary leading-tight mb-4"
          >
            L'IA en clair
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Une newsletter simple et accessible pour comprendre l'intelligence artificielle
            sans jargon. Des conseils pratiques, des outils utiles, des exemples concrets.
          </motion.p>
        </div>
      </section>

      {/* ── INSCRIPTION ───────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-cream rounded-3xl p-8 md:p-10 border border-brand-green/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-primary">S'abonner gratuitement</h2>
                <p className="text-sm text-muted-foreground">Recevez chaque numéro directement dans votre boîte mail</p>
              </div>
            </div>
            <SubscribeForm />
          </motion.div>
        </div>
      </section>

      {/* ── ARCHIVES ──────────────────────────── */}
      <section className="py-16 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-brand-orange" />
            <h2 className="text-2xl font-display font-bold text-primary">Numéros précédents</h2>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Chargement...</div>
          ) : envois.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucun numéro archivé pour le moment.
            </div>
          ) : (
            <div className="space-y-4">
              {envois.map((envoi, i) => (
                <motion.div
                  key={envoi.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-brand-green/20 hover:shadow-sm transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {envoi.numero && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange">
                          {envoi.numero}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">{formatDateCourte(envoi.date_envoi)}</span>
                    </div>
                    <p className="font-semibold text-primary truncate">{envoi.sujet || "Sans titre"}</p>
                  </div>
                  {envoi.fichier_html && (
                    <a
                      href={`/newsletters/${envoi.fichier_html}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:text-brand-green/80 transition-colors shrink-0"
                      )}
                    >
                      Lire
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
