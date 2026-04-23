const crypto = require("crypto");

function expectedToken(email) {
  return crypto
    .createHmac("sha256", process.env.UNSUBSCRIBE_SECRET)
    .update(email)
    .digest("hex");
}

exports.handler = async (event) => {
  const { email, token } = event.queryStringParameters || {};

  if (!email || !token) {
    return { statusCode: 400, body: "Paramètres manquants." };
  }

  if (token !== expectedToken(email)) {
    return { statusCode: 403, body: "Lien de désabonnement invalide ou expiré." };
  }

  const base = process.env.SUPABASE_URL + "/rest/v1";
  const headers = {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
  };

  await fetch(`${base}/abonnes?email=eq.${encodeURIComponent(email)}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ actif: false }),
  });

  return {
    statusCode: 302,
    headers: { Location: "/desabonnement-confirme" },
    body: "",
  };
};
