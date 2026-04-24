const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS };
  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers: CORS, body: "Method Not Allowed" };

  let prenom, email;
  try {
    ({ prenom, email } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Corps invalide" }) };
  }

  if (!prenom || !email) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Prénom et email requis" }) };
  }

  const base = process.env.SUPABASE_URL + "/rest/v1";
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
  };

  // Vérifie si l'email existe déjà
  const checkRes = await fetch(
    `${base}/abonnes?email=eq.${encodeURIComponent(email)}&select=email,actif`,
    { headers }
  );
  const existing = await checkRes.json();

  if (existing.length > 0) {
    if (existing[0].actif) {
      return { statusCode: 200, headers: CORS, body: JSON.stringify({ status: "already_subscribed" }) };
    }
    // Réactivation
    await fetch(`${base}/abonnes?email=eq.${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ actif: true }),
    });
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ status: "reactivated" }) };
  }

  // Nouvel abonné
  await fetch(`${base}/abonnes`, {
    method: "POST",
    headers,
    body: JSON.stringify({ prenom, email, source: "site", actif: true, date_inscription: new Date().toISOString() }),
  });

  return { statusCode: 200, headers: CORS, body: JSON.stringify({ status: "subscribed" }) };
};
