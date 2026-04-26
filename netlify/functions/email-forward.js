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

  // Log structuré pour identifier où se trouve le corps
  console.log("[email-forward] Clés racine :", Object.keys(payload).join(", "));
  console.log("[email-forward] type :", payload.type);
  if (payload.data) {
    console.log("[email-forward] Clés data :", Object.keys(payload.data).join(", "));
    const d = payload.data;
    console.log("[email-forward] data.from :", d.from);
    console.log("[email-forward] data.subject :", d.subject);
    console.log("[email-forward] data.html (longueur) :", typeof d.html === "string" ? d.html.length : d.html);
    console.log("[email-forward] data.text (longueur) :", typeof d.text === "string" ? d.text.length : d.text);
    console.log("[email-forward] data.body :", typeof d.body === "string" ? d.body.slice(0, 200) : d.body);
    // Log les champs restants non connus
    const known = new Set(["from","to","subject","html","text","body","email_id","id","sender","headers","attachments","spf","dkim"]);
    const extra = Object.keys(d).filter(k => !known.has(k));
    if (extra.length) console.log("[email-forward] data champs supplémentaires :", JSON.stringify(Object.fromEntries(extra.map(k => [k, typeof d[k] === "string" ? d[k].slice(0, 100) : d[k]]))));
  } else {
    console.log("[email-forward] Pas de champ data — payload complet :", JSON.stringify(payload).slice(0, 500));
  }

  if (payload.type !== "email.received") {
    console.log("[email-forward] Événement ignoré :", payload.type);
    return { statusCode: 200, headers: CORS, body: "Ignored" };
  }

  const data = payload.data || payload;
  const from    = data.from    || data.sender || "Inconnu";
  const subject = data.subject || "(sans objet)";
  const emailId = data.email_id || data.id;

  // Extraction du corps depuis le payload webhook
  let htmlBody = data.html || data.html_body || "";
  let textBody = data.text || data.text_body || data.body || "";

  console.log(`[email-forward] Corps extrait — html=${htmlBody.length}c text=${textBody.length}c`);
  if (!emailId) console.warn("[email-forward] Aucun email_id dans le payload.");

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
