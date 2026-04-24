const crypto = require("crypto");

function expectedToken(email) {
  return crypto
    .createHmac("sha256", process.env.UNSUBSCRIBE_SECRET)
    .update(email)
    .digest("hex");
}

exports.handler = async (event) => {
  console.log("[unsubscribe] queryStringParameters:", JSON.stringify(event.queryStringParameters));

  const { email, token } = event.queryStringParameters || {};

  if (!email || !token) {
    console.error("[unsubscribe] Paramètres manquants — email:", email, "token:", token);
    return { statusCode: 400, body: "Paramètres manquants." };
  }

  console.log("[unsubscribe] email reçu:", email);

  const expected = expectedToken(email);
  console.log("[unsubscribe] token reçu  :", token);
  console.log("[unsubscribe] token attendu:", expected);

  if (token !== expected) {
    console.error("[unsubscribe] Token invalide.");
    return { statusCode: 403, body: "Lien de désabonnement invalide ou expiré." };
  }

  console.log("[unsubscribe] Token valide. Mise à jour Supabase...");

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error("[unsubscribe] Variables d'environnement Supabase manquantes.");
    return { statusCode: 500, body: "Erreur de configuration serveur." };
  }

  const url = `${supabaseUrl}/rest/v1/abonnes?email=eq.${encodeURIComponent(email)}`;
  console.log("[unsubscribe] PATCH URL:", url);

  const patchRes = await fetch(url, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
    body: JSON.stringify({ actif: false }),
  });

  const patchBody = await patchRes.text();
  console.log("[unsubscribe] PATCH status:", patchRes.status);
  console.log("[unsubscribe] PATCH réponse:", patchBody);

  if (!patchRes.ok) {
    console.error("[unsubscribe] Échec PATCH Supabase:", patchRes.status, patchBody);
  } else {
    const rows = JSON.parse(patchBody || "[]");
    if (rows.length === 0) {
      console.warn("[unsubscribe] Aucune ligne mise à jour — email introuvable en base:", email);
    } else {
      console.log("[unsubscribe] Désabonnement effectué pour:", email);
    }
  }

  return {
    statusCode: 302,
    headers: { Location: "/desabonnement-confirme" },
    body: "",
  };
};
