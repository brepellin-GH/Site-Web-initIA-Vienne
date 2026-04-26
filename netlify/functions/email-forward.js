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

  console.log("[email-forward] Payload brut :", JSON.stringify(payload));

  if (payload.type !== "email.received") {
    console.log("[email-forward] Événement ignoré :", payload.type);
    return { statusCode: 200, headers: CORS, body: "Ignored" };
  }

  const data = payload.data || payload;
  const from    = data.from    || data.sender || "Inconnu";
  const subject = data.subject || "(sans objet)";
  const emailId = data.email_id || data.id;

  console.log(`[email-forward] from="${from}" subject="${subject}" email_id="${emailId}"`);

  // Récupère le contenu complet via GET /emails/{email_id}
  let htmlBody = "";
  let textBody = "";
  if (emailId) {
    const fetchRes = await fetch(`https://api.resend.com/emails/${emailId}`, {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    if (fetchRes.ok) {
      const full = await fetchRes.json();
      console.log("[email-forward] Contenu complet :", JSON.stringify(full));
      htmlBody = full.html || "";
      textBody = full.text || "";
    } else {
      console.error(`[email-forward] Échec GET /emails/${emailId} — ${fetchRes.status}`);
    }
  } else {
    console.warn("[email-forward] Aucun email_id dans le payload.");
  }

  const bodyContent = htmlBody
    || (textBody ? `<p>${textBody.replace(/\n/g, "<br>")}</p>` : "<p>(corps vide)</p>");

  const forwardHtml = `
<p><strong>De :</strong> ${from}</p>
<p><strong>Sujet original :</strong> ${subject}</p>
<hr style="border:none;border-top:1px solid #eee;margin:16px 0">
${bodyContent}
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
