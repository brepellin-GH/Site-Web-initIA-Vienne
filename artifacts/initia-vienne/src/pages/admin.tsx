import { useState, useEffect, useRef } from "react";
import { supabase, type Contact } from "@/lib/supabase";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;
const PAGE_SIZE = 20;

type Tab = "dashboard" | "newsletter" | "ateliers" | "abonnes";

interface Abonne {
  id: string;
  email: string;
  nom: string | null;
  prenom: string | null;
  actif: boolean;
  source: string;
  created_at: string;
}

interface Atelier {
  id: string;
  titre: string;
  date_heure: string;
  lieu: string;
  public_cible: string | null;
  themes: string | null;
  inscription_type: "direct" | "organisateur";
  inscription_contact: string | null;
  inscription_label: string | null;
  places_restantes: number | null;
  visible: boolean;
  created_at: string;
}

interface Envoi {
  id: string;
  numero: number;
  sujet: string;
  nb_destinataires: number;
  fichier_html: string | null;
  created_at: string;
}

const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600";
const labelCls = "block text-xs font-semibold text-gray-500 uppercase mb-1";
const btnPrimary = "px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50";
const btnSecondary = "px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors";
const btnDanger = "px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors";

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function fmtDate(iso: string) {
  return new Date(iso.replace(/([+-]\d{2}:\d{2}|Z)$/, "")).toLocaleString("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin initIA Vienne</h1>
          <p className="text-sm text-gray-500 mt-1">Accès réservé</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Mot de passe"
            className={inputCls}
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">Mot de passe incorrect.</p>}
          <button type="submit" className={`${btnPrimary} w-full py-3`}>
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const [nbAbonnes, setNbAbonnes] = useState<number | null>(null);
  const [nbAteliers, setNbAteliers] = useState<number | null>(null);
  const [dernierEnvoi, setDernierEnvoi] = useState<Envoi | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("abonnes").select("id", { count: "exact" }).eq("actif", true)
      .then(({ count }) => setNbAbonnes(count ?? 0));

    supabase.from("ateliers").select("id", { count: "exact" })
      .eq("visible", true).gt("date_heure", new Date().toISOString())
      .then(({ count }) => setNbAteliers(count ?? 0));

    supabase.from("envois_newsletter").select("*").order("created_at", { ascending: false }).limit(1)
      .then(({ data }) => setDernierEnvoi(data?.[0] ?? null));

    supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setContacts((data as Contact[]) ?? []));
  }, []);

  const TYPE_COLORS: Record<string, string> = {
    Particulier: "bg-blue-100 text-blue-700",
    Association: "bg-green-100 text-green-700",
    Collectivite: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-green-700">{nbAbonnes ?? "…"}</p>
          <p className="text-sm text-gray-500 mt-1">Abonnés actifs</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-green-700">{nbAteliers ?? "…"}</p>
          <p className="text-sm text-gray-500 mt-1">Ateliers à venir</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-green-700">
            {dernierEnvoi ? `#${dernierEnvoi.numero}` : "—"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {dernierEnvoi ? `Dernier envoi · ${fmt(dernierEnvoi.created_at)}` : "Aucun envoi"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Derniers contacts</h2>
        </div>
        {contacts.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">Aucun contact.</p>
        ) : (
          <div>
            {contacts.map((c) => (
              <div key={c.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  className="w-full text-left px-5 py-3 flex flex-wrap items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xs text-gray-400 w-32 shrink-0">{fmtDate(c.created_at)}</span>
                  <span className="font-medium text-gray-800 flex-1 min-w-32">{c.name}</span>
                  <span className="text-sm text-gray-500 flex-1 min-w-40">{c.email}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[c.type] ?? "bg-gray-100 text-gray-600"}`}>
                    {c.type}
                  </span>
                  <span className="text-gray-300 text-xs">{expanded === c.id ? "▲" : "▼"}</span>
                </button>
                {expanded === c.id && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Message</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{c.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Gestion Newsletter ───────────────────────────────────────────────────────
function GestionNewsletter() {
  const [numero, setNumero] = useState("");
  const [sujet, setSujet] = useState("");
  const [corps, setCorps] = useState("");
  const [fichierNom, setFichierNom] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [envois, setEnvois] = useState<Envoi[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadEnvois = () => {
    supabase.from("envois_newsletter").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setEnvois((data as Envoi[]) ?? []));
  };

  useEffect(() => { loadEnvois(); }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFichierNom(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setCorps((ev.target?.result as string) ?? "");
    reader.readAsText(file, "utf-8");
  };

  const handleSend = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!numero || !sujet || !corps) return;
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/.netlify/functions/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: ADMIN_PASSWORD,
          numero: Number(numero),
          sujet,
          corps_message: corps,
          fichier_html: fichierNom || null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, msg: `✓ Envoyé à ${data.nb_destinataires} abonné(s).` });
        setNumero(""); setSujet(""); setCorps(""); setFichierNom("");
        if (fileRef.current) fileRef.current.value = "";
        loadEnvois();
      } else {
        setResult({ ok: false, msg: data.error ?? "Erreur lors de l'envoi." });
      }
    } catch {
      setResult({ ok: false, msg: "Erreur réseau." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Envoyer une newsletter</h2>
        <form onSubmit={handleSend} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Numéro</label>
              <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)}
                className={inputCls} placeholder="Ex : 3" required />
            </div>
            <div>
              <label className={labelCls}>Sujet</label>
              <input type="text" value={sujet} onChange={(e) => setSujet(e.target.value)}
                className={inputCls} placeholder="Objet de l'email" required />
            </div>
          </div>

          <div>
            <label className={labelCls}>Fichier HTML (optionnel)</label>
            <input ref={fileRef} type="file" accept=".html,.htm" onChange={handleFile}
              className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 file:text-sm file:font-medium hover:file:bg-gray-200" />
            {fichierNom && <p className="text-xs text-gray-400 mt-1">Fichier : {fichierNom}</p>}
          </div>

          <div>
            <label className={labelCls}>Corps du message (HTML)</label>
            <textarea value={corps} onChange={(e) => setCorps(e.target.value)}
              className={`${inputCls} font-mono text-xs`} rows={8}
              placeholder="<p>Bonjour,</p>..." required />
          </div>

          {result && (
            <p className={`text-sm px-3 py-2 rounded-lg ${result.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {result.msg}
            </p>
          )}

          <div className="flex justify-end">
            <button type="submit" disabled={sending} className={btnPrimary}>
              {sending ? "Envoi en cours…" : "Envoyer la newsletter"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Historique des envois</h2>
        </div>
        {envois.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">Aucun envoi.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="px-5 py-2">#</th>
                <th className="px-5 py-2">Sujet</th>
                <th className="px-5 py-2">Destinataires</th>
                <th className="px-5 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {envois.map((e) => (
                <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-500">#{e.numero}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{e.sujet}</td>
                  <td className="px-5 py-3 text-gray-500">{e.nb_destinataires}</td>
                  <td className="px-5 py-3 text-gray-400">{fmt(e.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Gestion Ateliers ─────────────────────────────────────────────────────────
const ATELIER_EMPTY = {
  titre: "",
  date_heure: "",
  lieu: "",
  public_cible: "",
  themes: "",
  inscription_type: "direct" as "direct" | "organisateur",
  inscription_contact: "",
  inscription_label: "",
  places_restantes: "",
  visible: true,
};

function GestionAteliers() {
  const [ateliers, setAteliers] = useState<Atelier[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(ATELIER_EMPTY);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    supabase.from("ateliers").select("*").order("date_heure", { ascending: false })
      .then(({ data }) => { setAteliers((data as Atelier[]) ?? []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(ATELIER_EMPTY); setEditId(null); setShowForm(true); };
  const openEdit = (a: Atelier) => {
    setForm({
      titre: a.titre,
      date_heure: a.date_heure.slice(0, 16),
      lieu: a.lieu,
      public_cible: a.public_cible ?? "",
      themes: a.themes ?? "",
      inscription_type: a.inscription_type,
      inscription_contact: a.inscription_contact ?? "",
      inscription_label: a.inscription_label ?? "",
      places_restantes: a.places_restantes !== null ? String(a.places_restantes) : "",
      visible: a.visible,
    });
    setEditId(a.id);
    setShowForm(true);
  };

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      titre: form.titre,
      date_heure: form.date_heure,
      lieu: form.lieu,
      public_cible: form.public_cible || null,
      themes: form.themes || null,
      inscription_type: form.inscription_type,
      inscription_contact: form.inscription_contact || null,
      inscription_label: form.inscription_label || null,
      places_restantes: form.places_restantes !== "" ? Number(form.places_restantes) : null,
      visible: form.visible,
    };
    if (editId) {
      await supabase.from("ateliers").update(payload).eq("id", editId);
    } else {
      await supabase.from("ateliers").insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    setEditId(null);
    load();
  };

  const toggleVisible = async (a: Atelier) => {
    await supabase.from("ateliers").update({ visible: !a.visible }).eq("id", a.id);
    load();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("ateliers").delete().eq("id", id);
    setDeleteId(null);
    load();
  };

  const f = (field: keyof typeof ATELIER_EMPTY, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  return (
    <div className="space-y-6">
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-700 mb-4">{editId ? "Modifier l'atelier" : "Nouvel atelier"}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Titre *</label>
                <input type="text" value={form.titre} onChange={(e) => f("titre", e.target.value)}
                  className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Date et heure *</label>
                <input type="datetime-local" value={form.date_heure} onChange={(e) => f("date_heure", e.target.value)}
                  className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Lieu *</label>
                <input type="text" value={form.lieu} onChange={(e) => f("lieu", e.target.value)}
                  className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Public cible</label>
                <input type="text" value={form.public_cible} onChange={(e) => f("public_cible", e.target.value)}
                  className={inputCls} placeholder="Ex : Seniors, Tout public…" />
              </div>
              <div>
                <label className={labelCls}>Places restantes</label>
                <input type="number" value={form.places_restantes} onChange={(e) => f("places_restantes", e.target.value)}
                  className={inputCls} placeholder="Laisser vide si illimité" min={0} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Thèmes</label>
                <input type="text" value={form.themes} onChange={(e) => f("themes", e.target.value)}
                  className={inputCls} placeholder="Ex : ChatGPT, Images IA…" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Type d'inscription</label>
              <div className="flex gap-6 mt-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="inscription_type" value="direct"
                    checked={form.inscription_type === "direct"}
                    onChange={() => f("inscription_type", "direct")} />
                  Direct (contact Bruno)
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="inscription_type" value="organisateur"
                    checked={form.inscription_type === "organisateur"}
                    onChange={() => f("inscription_type", "organisateur")} />
                  Via organisateur
                </label>
              </div>
            </div>

            {form.inscription_type === "organisateur" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Lien d'inscription</label>
                  <input type="url" value={form.inscription_contact} onChange={(e) => f("inscription_contact", e.target.value)}
                    className={inputCls} placeholder="https://…" />
                </div>
                <div>
                  <label className={labelCls}>Libellé du bouton</label>
                  <input type="text" value={form.inscription_label} onChange={(e) => f("inscription_label", e.target.value)}
                    className={inputCls} placeholder="Ex : S'inscrire sur MaVille" />
                </div>
              </div>
            )}

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.visible} onChange={(e) => f("visible", e.target.checked)}
                className="rounded" />
              Visible sur le site
            </label>

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className={btnSecondary}>
                Annuler
              </button>
              <button type="submit" disabled={saving} className={btnPrimary}>
                {saving ? "Enregistrement…" : editId ? "Mettre à jour" : "Créer l'atelier"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Ateliers ({ateliers.length})</h2>
          {!showForm && (
            <button onClick={openNew} className={btnPrimary}>+ Ajouter</button>
          )}
        </div>

        {loading ? (
          <p className="text-center py-8 text-gray-400 text-sm">Chargement…</p>
        ) : ateliers.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">Aucun atelier.</p>
        ) : (
          <div>
            {ateliers.map((a) => (
              <div key={a.id} className="border-b border-gray-100 last:border-0 px-5 py-4 flex flex-wrap items-start gap-3">
                <div className="flex-1 min-w-48">
                  <p className="font-medium text-gray-800">{a.titre}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{fmtDate(a.date_heure)} · {a.lieu}</p>
                  {a.public_cible && <p className="text-xs text-gray-500 mt-0.5">Public : {a.public_cible}</p>}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {a.visible ? "Visible" : "Masqué"}
                  </span>
                  <button onClick={() => toggleVisible(a)} className={btnSecondary}>
                    {a.visible ? "Masquer" : "Afficher"}
                  </button>
                  <button onClick={() => openEdit(a)} className={btnSecondary}>Modifier</button>
                  {deleteId === a.id ? (
                    <>
                      <button onClick={() => handleDelete(a.id)} className={btnDanger}>Confirmer</button>
                      <button onClick={() => setDeleteId(null)} className={btnSecondary}>Annuler</button>
                    </>
                  ) : (
                    <button onClick={() => setDeleteId(a.id)} className={btnDanger}>Supprimer</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Gestion Abonnés ──────────────────────────────────────────────────────────
function GestionAbonnes() {
  const [abonnes, setAbonnes] = useState<Abonne[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [emailAdd, setEmailAdd] = useState("");
  const [nomAdd, setNomAdd] = useState("");
  const [prenomAdd, setPrenomAdd] = useState("");
  const [adding, setAdding] = useState(false);
  const [addResult, setAddResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const load = () => {
    setLoading(true);
    supabase.from("abonnes").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setAbonnes((data as Abonne[]) ?? []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const actifs = abonnes.filter((a) => a.actif);
  const inactifs = abonnes.filter((a) => !a.actif);
  const paginated = abonnes.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(abonnes.length / PAGE_SIZE);

  const handleAdd = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddResult(null);
    const { error } = await supabase.from("abonnes").insert({
      email: emailAdd.toLowerCase().trim(),
      nom: nomAdd || null,
      prenom: prenomAdd || null,
      source: "admin",
      actif: true,
    });
    if (error) {
      setAddResult({ ok: false, msg: error.code === "23505" ? "Cet email est déjà inscrit." : error.message });
    } else {
      setAddResult({ ok: true, msg: "Abonné ajouté." });
      setEmailAdd(""); setNomAdd(""); setPrenomAdd("");
      load();
    }
    setAdding(false);
  };

  const handleUnsub = async (a: Abonne) => {
    await supabase.from("abonnes").update({ actif: false }).eq("id", a.id);
    load();
  };

  const handleReactivate = async (a: Abonne) => {
    await supabase.from("abonnes").update({ actif: true }).eq("id", a.id);
    load();
  };

  const exportCsv = () => {
    const rows = [["email", "nom", "prenom", "source", "date_inscription"], ...actifs.map((a) => [
      a.email, a.nom ?? "", a.prenom ?? "", a.source, fmt(a.created_at),
    ])];
    const csv = rows.map((r) => r.join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `abonnes_actifs_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-green-700">{abonnes.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-green-700">{actifs.length}</p>
          <p className="text-sm text-gray-500 mt-1">Actifs</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-3xl font-bold text-gray-400">{inactifs.length}</p>
          <p className="text-sm text-gray-500 mt-1">Désabonnés</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Ajouter manuellement</h2>
        <form onSubmit={handleAdd} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Email *</label>
              <input type="email" value={emailAdd} onChange={(e) => setEmailAdd(e.target.value)}
                className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Prénom</label>
              <input type="text" value={prenomAdd} onChange={(e) => setPrenomAdd(e.target.value)}
                className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Nom</label>
              <input type="text" value={nomAdd} onChange={(e) => setNomAdd(e.target.value)}
                className={inputCls} />
            </div>
          </div>
          {addResult && (
            <p className={`text-sm px-3 py-2 rounded-lg ${addResult.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {addResult.msg}
            </p>
          )}
          <div className="flex justify-end">
            <button type="submit" disabled={adding} className={btnPrimary}>
              {adding ? "Ajout…" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-700">Liste des abonnés</h2>
          <button onClick={exportCsv} className={btnSecondary}>Exporter CSV</button>
        </div>

        {loading ? (
          <p className="text-center py-8 text-gray-400 text-sm">Chargement…</p>
        ) : abonnes.length === 0 ? (
          <p className="text-center py-8 text-gray-400 text-sm">Aucun abonné.</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100">
                  <th className="px-5 py-2">Email</th>
                  <th className="px-5 py-2 hidden sm:table-cell">Nom</th>
                  <th className="px-5 py-2 hidden md:table-cell">Source</th>
                  <th className="px-5 py-2 hidden md:table-cell">Inscrit le</th>
                  <th className="px-5 py-2">Statut</th>
                  <th className="px-5 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-800 font-medium">{a.email}</td>
                    <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">
                      {[a.prenom, a.nom].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{a.source}</td>
                    <td className="px-5 py-3 text-gray-400 hidden md:table-cell">{fmt(a.created_at)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.actif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {a.actif ? "Actif" : "Désabonné"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {a.actif ? (
                        <button onClick={() => handleUnsub(a)} className={btnDanger}>Désabonner</button>
                      ) : (
                        <button onClick={() => handleReactivate(a)} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-100 transition-colors">
                          Réactiver
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <span>Page {page + 1} / {totalPages}</span>
                <div className="flex gap-2">
                  <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className={btnSecondary}>Précédent</button>
                  <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className={btnSecondary}>Suivant</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Admin root ───────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string }[] = [
  { id: "dashboard", label: "Tableau de bord" },
  { id: "newsletter", label: "Newsletter" },
  { id: "ateliers", label: "Ateliers" },
  { id: "abonnes", label: "Abonnés" },
];

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "true");
  const [tab, setTab] = useState<Tab>("dashboard");

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  if (!authed) return <LoginForm onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Admin initIA Vienne</h1>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-1 rounded-lg hover:bg-red-50">
          Déconnexion
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                tab === t.id ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && <Dashboard />}
        {tab === "newsletter" && <GestionNewsletter />}
        {tab === "ateliers" && <GestionAteliers />}
        {tab === "abonnes" && <GestionAbonnes />}
      </div>
    </div>
  );
}
