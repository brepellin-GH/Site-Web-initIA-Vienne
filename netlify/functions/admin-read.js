// Lectures de l'administration (contacts, abonnés, ateliers) avec la clé service.
// Remplace les lectures faites auparavant avec la clé anonyme publique.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const unauthorized = { statusCode: 401, headers: CORS, body: JSON.stringify({ error: "Non autorisé" }) };

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS };
  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers: CORS, body: "Method Not Allowed" };

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Corps invalide" }) };
  }

  const { password, action } = body;

  // Même contrôle que admin-write ; refus si la variable n'est pas configurée.
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return unauthorized;
  }

  const base = process.env.SUPABASE_URL + "/rest/v1";
  const sbHeaders = {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
  };

  try {
    if (action === "dashboard") {
      // Nombre d'abonnés actifs (en-tête Content-Range « 0-0/64 »), 5 derniers contacts
      // et nombre d'ateliers publics visibles à venir (acces vide traité comme public).
      const now = encodeURIComponent(new Date().toISOString());
      const [resCount, resContacts, resAteliers] = await Promise.all([
        fetch(`${base}/abonnes?actif=eq.true&select=id&limit=1`, {
          headers: { ...sbHeaders, Prefer: "count=exact" },
        }),
        fetch(`${base}/contacts?select=id,created_at,name,email,type,message&order=created_at.desc&limit=5`, {
          headers: sbHeaders,
        }),
        fetch(`${base}/ateliers?select=id&limit=1&visible=eq.true&date_heure=gt.${now}&or=(acces.is.null,acces.neq.prive)`, {
          headers: { ...sbHeaders, Prefer: "count=exact" },
        }),
      ]);
      if (!resCount.ok) throw new Error(await resCount.text());
      if (!resContacts.ok) throw new Error(await resContacts.text());
      if (!resAteliers.ok) throw new Error(await resAteliers.text());
      const total = (res) => Number((res.headers.get("content-range") || "").split("/")[1]) || 0;
      const nbAbonnesActifs = total(resCount);
      const nbAteliers = total(resAteliers);
      const contacts = await resContacts.json();
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ nbAbonnesActifs, contacts, nbAteliers }) };
    }

    if (action === "list-abonnes") {
      const res = await fetch(`${base}/abonnes?select=id,email,prenom,actif,source,date_inscription`, {
        headers: sbHeaders,
      });
      if (!res.ok) throw new Error(await res.text());
      const abonnes = await res.json();
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ abonnes }) };
    }

    if (action === "list-ateliers") {
      // Tous les ateliers, masqués compris.
      const res = await fetch(`${base}/ateliers?select=*&order=date_heure.desc`, { headers: sbHeaders });
      if (!res.ok) throw new Error(await res.text());
      const ateliers = await res.json();
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ ateliers }) };
    }

    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Action inconnue" }) };
  } catch (err) {
    console.error("[admin-read]", err);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: "Erreur serveur" }) };
  }
};
