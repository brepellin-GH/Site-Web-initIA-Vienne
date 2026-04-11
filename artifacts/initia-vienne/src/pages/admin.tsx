import { useState, useEffect } from "react";
import { supabase, type Contact } from "@/lib/supabase";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

const TYPE_LABELS: Record<string, string> = {
  Particulier: "Particulier",
  Association: "Association",
  Collectivite: "Collectivité",
};

const TYPE_COLORS: Record<string, string> = {
  Particulier: "bg-blue-100 text-blue-700",
  Association: "bg-green-100 text-green-700",
  Collectivite: "bg-orange-100 text-orange-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "true");
  const [input, setInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setInput("");
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setContacts((data as Contact[]) ?? []);
        setLoading(false);
      });
  }, [authed]);

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.type === filter);
  const counts = {
    all: contacts.length,
    Particulier: contacts.filter((c) => c.type === "Particulier").length,
    Association: contacts.filter((c) => c.type === "Association").length,
    Collectivite: contacts.filter((c) => c.type === "Collectivite").length,
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin initIA Vienne</h1>
            <p className="text-sm text-gray-500 mt-1">Accès réservé</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-600 transition-colors"
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm">Mot de passe incorrect.</p>}
            <button
              type="submit"
              className="w-full py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-colors"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Contacts initIA Vienne</h1>
          <p className="text-sm text-gray-500">{contacts.length} demande{contacts.length > 1 ? "s" : ""} reçue{contacts.length > 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-1 rounded-lg hover:bg-red-50"
        >
          Déconnexion
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total", value: counts.all, color: "bg-white border-gray-200", key: "all" },
            { label: "Particuliers", value: counts.Particulier, color: "bg-blue-50 border-blue-200", key: "Particulier" },
            { label: "Associations", value: counts.Association, color: "bg-green-50 border-green-200", key: "Association" },
            { label: "Collectivités", value: counts.Collectivite, color: "bg-orange-50 border-orange-200", key: "Collectivite" },
          ].map(({ label, value, color, key }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`${color} border-2 rounded-xl p-4 text-left transition-all ${filter === key ? "ring-2 ring-green-500" : ""}`}
            >
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">Aucun contact pour ce filtre.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpanded(expanded === contact.id ? null : contact.id)}
                  className="w-full text-left px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xs text-gray-400 shrink-0 w-32">{formatDate(contact.created_at)}</span>
                  <span className="font-semibold text-gray-800 flex-1">{contact.name}</span>
                  <span className="text-sm text-gray-500 flex-1">{contact.email}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${TYPE_COLORS[contact.type] ?? "bg-gray-100 text-gray-600"}`}>
                    {TYPE_LABELS[contact.type] ?? contact.type}
                  </span>
                  <span className="text-gray-300 text-sm">{expanded === contact.id ? "▲" : "▼"}</span>
                </button>

                {expanded === contact.id && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Email</p>
                        <a href={`mailto:${contact.email}`} className="text-green-700 hover:underline">{contact.email}</a>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Type</p>
                        <p>{TYPE_LABELS[contact.type] ?? contact.type}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Message</p>
                      <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">{contact.message}</p>
                    </div>
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
