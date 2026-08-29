const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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

  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: "Non autorisé" }) };
  }

  if (action === "verify") {
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
  }

  const base = process.env.SUPABASE_URL + "/rest/v1";
  const sbHeaders = {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    if (action === "atelier_create") {
      const res = await fetch(`${base}/ateliers`, {
        method: "POST",
        headers: { ...sbHeaders, Prefer: "return=representation" },
        body: JSON.stringify(body.payload),
      });
      if (!res.ok) throw new Error(await res.text());
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
    }

    if (action === "atelier_update") {
      const res = await fetch(`${base}/ateliers?id=eq.${encodeURIComponent(body.id)}`, {
        method: "PATCH",
        headers: sbHeaders,
        body: JSON.stringify(body.payload),
      });
      if (!res.ok) throw new Error(await res.text());
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
    }

    if (action === "atelier_delete") {
      const res = await fetch(`${base}/ateliers?id=eq.${encodeURIComponent(body.id)}`, {
        method: "DELETE",
        headers: sbHeaders,
      });
      if (!res.ok) throw new Error(await res.text());
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
    }

    if (action === "abonne_set_actif") {
      const res = await fetch(`${base}/abonnes?id=eq.${encodeURIComponent(body.id)}`, {
        method: "PATCH",
        headers: sbHeaders,
        body: JSON.stringify({ actif: body.actif }),
      });
      if (!res.ok) throw new Error(await res.text());
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Action inconnue" }) };
  } catch (err) {
    console.error("[admin-write]", err);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: "Erreur serveur" }) };
  }
};
