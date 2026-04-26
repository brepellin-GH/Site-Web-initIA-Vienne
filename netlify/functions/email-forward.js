const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS };
  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers: CORS, body: "Method Not Allowed" };

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers: CORS, body: "Corps invalide" };
  }

  if (payload.type !== "email.received") {
    console.log("[email-forward] Événement ignoré :", payload.type);
    return { statusCode: 200, headers: CORS, body: "Ignored" };
  }

  const data = payload.data || {};
  const from    = data.from    || data.sender || "Inconnu";
  const subject = data.subject || "(sans objet)";

  console.log(`[email-forward] Email reçu — from="${from}" subject="${subject}"`);

  const forwardHtml = `
<p>Vous avez reçu une réponse à votre newsletter.</p>
<table style="border-collapse:collapse;margin:16px 0">
  <tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:bold">De :</td><td><a href="mailto:${from}">${from}</a></td></tr>
  <tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:bold">Sujet :</td><td>${subject}</td></tr>
</table>
<p style="color:#666;font-style:italic">Le contenu du message n'est pas disponible automatiquement (limitation du plan Resend).</p>
<p>Pour répondre, écrivez directement à : <a href="mailto:${from}">${from}</a></p>
`;

  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Transfert initIA <bruno@initia-vienne.com>",
      to: ["initia.vienne@gmail.com"],
      subject: `[Réponse newsletter] ${subject}`,
      html: forwardHtml,
    }),
  });

  if (emailRes.ok) {
    console.log("[email-forward] ✓ Notification transférée vers initia.vienne@gmail.com");
    return { statusCode: 200, headers: CORS, body: "Forwarded" };
  } else {
    const err = await emailRes.text();
    console.error(`[email-forward] ✗ Échec — ${emailRes.status} — ${err}`);
    return { statusCode: 500, headers: CORS, body: "Forward failed" };
  }
};
