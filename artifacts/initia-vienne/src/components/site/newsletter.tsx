import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { greenButtonClass, inputClass } from "./ui";

// ── Archives (lecture de la table envois_newsletter, logique inchangée) ──

export type Envoi = {
  id: string;
  numero: string | null;
  sujet: string | null;
  fichier_html: string | null;
  date_envoi: string;
};

export function formatDateCourte(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Le sujet enregistré commence par « L'IA en clair · N°x · » : on garde le titre seul. */
export function titreCourt(sujet: string | null) {
  if (!sujet) return "Sans titre";
  return sujet.replace(/^L[’']IA en clair\s*·\s*N°\s*\d+\s*·\s*/i, "");
}

export function newsletterHref(envoi: Envoi) {
  return envoi.fichier_html ? `/newsletters/${envoi.fichier_html}` : undefined;
}

export function useNewsletterArchives() {
  const [envois, setEnvois] = useState<Envoi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("envois_newsletter")
      .select("id, numero, sujet, fichier_html, date_envoi")
      .order("date_envoi", { ascending: false })
      .then(({ data }) => {
        const rows = (data as Envoi[]) ?? [];
        const seen = new Set<string | null>();
        const dedup = rows.filter((e) => {
          if (seen.has(e.numero)) return false;
          seen.add(e.numero);
          return true;
        });
        setEnvois(dedup);
        setLoading(false);
      });
  }, []);

  return { envois, loading };
}

// ── Formulaire d'abonnement (fonction Netlify subscribe, logique inchangée) ──

export function SubscribeForm({ className }: { className?: string }) {
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

  const heading = (
    <>
      <h2 className="m-0 text-[26px] lg:text-[28px]">S'abonner gratuitement</h2>
      <p className="m-0">Recevez chaque numéro directement dans votre boîte mail.</p>
    </>
  );

  if (status === "success" || status === "already") {
    return (
      <div className={cn("flex flex-col gap-4", className)} role="status">
        {heading}
        <div className="flex flex-col gap-2 p-5 border-2 border-iv-green bg-iv-paper">
          <p className="m-0 text-xl font-bold text-iv-green">
            {status === "success" ? "Inscription confirmée !" : "Vous êtes déjà inscrit !"}
          </p>
          <p className="m-0">
            {status === "success"
              ? "Vous recevrez la prochaine newsletter dès sa publication."
              : "Votre adresse est bien dans la liste de diffusion."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4 lg:gap-[18px] m-0", className)}>
      {heading}
      <label className="flex flex-col gap-2" htmlFor="prenom">
        <span className="font-semibold text-iv-ink">Prénom</span>
        <input
          id="prenom"
          type="text"
          required
          autoComplete="given-name"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Jean"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-2" htmlFor="email-nl">
        <span className="font-semibold text-iv-ink">E-mail</span>
        <input
          id="email-nl"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jean@exemple.com"
          className={inputClass}
        />
      </label>
      {status === "error" && (
        <p className="m-0 text-[#B42318]" role="alert">
          Une erreur est survenue. Réessayez ou contactez-moi directement.
        </p>
      )}
      <button type="submit" disabled={status === "loading"} className={cn(greenButtonClass, "w-full")}>
        {status === "loading" ? "Inscription..." : "S'abonner à la newsletter"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="m-0 leading-[1.45]">Désabonnement possible à tout moment via le lien dans chaque e-mail.</p>
    </form>
  );
}
