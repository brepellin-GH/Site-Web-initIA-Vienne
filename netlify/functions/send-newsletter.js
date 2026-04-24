const crypto = require("crypto");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function unsubscribeToken(email) {
  return crypto
    .createHmac("sha256", process.env.UNSUBSCRIBE_SECRET)
    .update(email)
    .digest("hex");
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS };
  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers: CORS, body: "Method Not Allowed" };

  let sujet, numero, fichier_html, contenu_html, corps_message, password;
  try {
    ({ sujet, numero, fichier_html, contenu_html, corps_message, password } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "Corps invalide" }) };
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: "Non autorisé" }) };
  }

  if (!sujet || !corps_message) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: "sujet et corps_message requis" }) };
  }

  const base = process.env.SUPABASE_URL + "/rest/v1";
  const sbHeaders = {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(`${base}/abonnes?actif=eq.true&select=prenom,email`, { headers: sbHeaders });
  const abonnes = await res.json();

  if (!Array.isArray(abonnes) || abonnes.length === 0) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ nb_destinataires: 0, erreurs: 0, message: "Aucun abonné actif" }) };
  }

  let succes = 0;
  let erreurs = 0;
  const BATCH_SIZE = 5;

  const sendOne = async (abonne) => {
    const token = unsubscribeToken(abonne.email);
    const unsubscribeUrl = `https://initia-vienne.com/.netlify/functions/unsubscribe?email=${encodeURIComponent(abonne.email)}&token=${token}`;

    const corpsPersonnalise = (corps_message || "").replace(/\{prenom\}/g, abonne.prenom || "");

    let htmlBody;
    if (contenu_html && /<body[\s>]/i.test(contenu_html)) {
      htmlBody = contenu_html.replace(/(<body[^>]*>)/i, `$1\n${corpsPersonnalise}\n`);
    } else {
      htmlBody = [corpsPersonnalise, contenu_html || ""].filter(Boolean).join("\n");
    }

    htmlBody = htmlBody
      .replace(/\{\{UNSUBSCRIBE_URL\}\}/g, unsubscribeUrl)
      .replace(/https?:\/\/[^"']*\/desabonnement-confirme[^"']*/g, unsubscribeUrl)
      .replace(/(?<=['"])\/desabonnement-confirme[^"']*/g, unsubscribeUrl);

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bruno Repellin <bruno@initia-vienne.com>",
        to: [abonne.email],
        subject: sujet,
        html: htmlBody,
      }),
    });

    if (emailRes.ok) {
      succes++;
      console.log(`[send-newsletter] ✓ Envoyé à ${abonne.email}`);
    } else {
      erreurs++;
      const errBody = await emailRes.text();
      console.error(`[send-newsletter] ✗ Échec pour ${abonne.email} — status ${emailRes.status} — ${errBody}`);
    }
  };

  // Envoi par batch de BATCH_SIZE en parallèle
  for (let i = 0; i < abonnes.length; i += BATCH_SIZE) {
    const batch = abonnes.slice(i, i + BATCH_SIZE);
    console.log(`[send-newsletter] Batch ${Math.floor(i / BATCH_SIZE) + 1} : ${batch.map(a => a.email).join(", ")}`);
    await Promise.all(batch.map(sendOne));
  }

  await fetch(`${base}/envois_newsletter`, {
    method: "POST",
    headers: sbHeaders,
    body: JSON.stringify({
      numero: numero || null,
      sujet,
      fichier_html: fichier_html || null,
      nb_envoyes: succes,
      nb_erreurs: erreurs,
      date_envoi: new Date().toISOString(),
    }),
  });

  return {
    statusCode: 200,
    headers: CORS,
    body: JSON.stringify({ nb_destinataires: succes, erreurs }),
  };
};
