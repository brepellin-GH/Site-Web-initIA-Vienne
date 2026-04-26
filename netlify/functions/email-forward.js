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

  console.log("[email-forward] Webhook reçu — type:", payload.type);

  // Resend envoie { type, created_at, data: { from, to, subject, text, html } }
  if (payload.type !== "email.received") {
    console.log("[email-forward] Événement ignoré :", payload.type);
    return { statusCode: 200, headers: CORS, body: "Ignored" };
  }

  const data = payload.data || {};
  const from    = data.from    || "Inconnu";
  const subject = data.subject || "(sans objet)";
  const htmlBody = data.html   || "";
  const textBody = data.text   || "";

  console.log(`[email-forward] Email reçu de : ${from} — sujet : ${subject}`);

  // Corps du message de transfert
  const forwardHtml = `
<p><strong>De :</strong> ${from}</p>
<p><strong>Sujet original :</strong> ${subject}</p>
<hr style="border:none;border-top:1px solid #eee;margin:16px 0">
${htmlBody || `<p>${textBody.replace(/\n/g, "<br>")}</p>`}
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
    console.log(`[email-forward] ✓ Transféré vers initia.vienne@gmail.com`);
    return { statusCode: 200, headers: CORS, body: "Forwarded" };
  } else {
    const err = await emailRes.text();
    console.error(`[email-forward] ✗ Échec transfert — ${emailRes.status} — ${err}`);
    return { statusCode: 500, headers: CORS, body: "Forward failed" };
  }
};
