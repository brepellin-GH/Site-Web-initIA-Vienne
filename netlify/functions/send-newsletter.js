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

  const numeroStr = String(numero || "");
  const base = process.env.SUPABASE_URL + "/rest/v1";
  const sbHeaders = {
    apikey: process.env.SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
    "Content-Type": "application/json",
  };

  // 1. Récupère tous les abonnés actifs
  const resAbonnes = await fetch(`${base}/abonnes?actif=eq.true&select=prenom,email`, { headers: sbHeaders });
  const tousAbonnes = await resAbonnes.json();

  if (!Array.isArray(tousAbonnes) || tousAbonnes.length === 0) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ nb_destinataires: 0, erreurs: 0, message: "Aucun abonné actif" }) };
  }

  // 2. Récupère les emails déjà envoyés avec succès pour ce numéro
  const dejaEnvoyesRes = await fetch(
    `${base}/envois_details?numero=eq.${encodeURIComponent(numeroStr)}&statut=eq.succes&select=email`,
    { headers: sbHeaders }
  );
  const dejaEnvoyes = await dejaEnvoyesRes.json();
  const dejaEnvoyesSet = new Set(Array.isArray(dejaEnvoyes) ? dejaEnvoyes.map(r => r.email) : []);

  const abonnes = tousAbonnes.filter(a => !dejaEnvoyesSet.has(a.email));

  console.log(`[send-newsletter] Numéro ${numeroStr} — ${tousAbonnes.length} abonnés actifs, ${dejaEnvoyesSet.size} déjà envoyés, ${abonnes.length} à traiter`);

  if (abonnes.length === 0) {
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ nb_destinataires: 0, erreurs: 0, message: "Tous les abonnés ont déjà reçu ce numéro" }) };
  }

  // 3. Crée la ligne envois_newsletter au départ pour obtenir l'id
  const envoisRes = await fetch(`${base}/envois_newsletter`, {
    method: "POST",
    headers: { ...sbHeaders, Prefer: "return=representation" },
    body: JSON.stringify({
      numero: numero || null,
      sujet,
      fichier_html: fichier_html || null,
      nb_envoyes: 0,
      nb_erreurs: 0,
      date_envoi: new Date().toISOString(),
    }),
  });
  const envoisData = await envoisRes.json();
  const envoi_id = Array.isArray(envoisData) ? envoisData[0]?.id : envoisData?.id;
  console.log(`[send-newsletter] envoi_id : ${envoi_id}`);

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

    let statut, message_erreur;
    if (emailRes.ok) {
      succes++;
      statut = "succes";
      message_erreur = null;
      console.log(`[send-newsletter] ✓ Envoyé à ${abonne.email}`);
    } else {
      erreurs++;
      statut = "erreur";
      message_erreur = await emailRes.text();
      console.error(`[send-newsletter] ✗ Échec pour ${abonne.email} — status ${emailRes.status} — ${message_erreur}`);
    }

    // 4. Log dans envois_details
    await fetch(`${base}/envois_details`, {
      method: "POST",
      headers: sbHeaders,
      body: JSON.stringify({
        envoi_id: envoi_id || null,
        numero: numeroStr,
        email: abonne.email,
        prenom: abonne.prenom || null,
        statut,
        message_erreur,
      }),
    });
  };

  // 5. Envoi par batch avec délai
  for (let i = 0; i < abonnes.length; i += BATCH_SIZE) {
    const batch = abonnes.slice(i, i + BATCH_SIZE);
    console.log(`[send-newsletter] Batch ${Math.floor(i / BATCH_SIZE) + 1} : ${batch.map(a => a.email).join(", ")}`);
    await Promise.all(batch.map(sendOne));
    if (i + BATCH_SIZE < abonnes.length) {
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
  }

  // 6. Met à jour envois_newsletter avec les comptes réels
  if (envoi_id) {
    await fetch(`${base}/envois_newsletter?id=eq.${envoi_id}`, {
      method: "PATCH",
      headers: sbHeaders,
      body: JSON.stringify({ nb_envoyes: succes, nb_erreurs: erreurs }),
    });
  }

  return {
    statusCode: 200,
    headers: CORS,
    body: JSON.stringify({ nb_destinataires: succes, erreurs }),
  };
};
