#!/usr/bin/env node
const fs   = require("fs");
const path = require("path");

// Juice installé globalement
let juice;
try {
  juice = require("juice");
} catch {
  juice = require("C:/Users/brepe/AppData/Roaming/npm/node_modules/juice");
}

const BASE_URL = "https://initia-vienne.com/images";

// Correspondance classe HTML → URL Netlify
const IMAGE_MAP = [
  { classAttr: "header-logo",  url: `${BASE_URL}/Logo_V3.png`,                alt: "initIA Vienne" },
  { classAttr: "actu-image",   url: `${BASE_URL}/Passerelle_BFM_28_mars.png`, alt: "Atelier Passerelle BFM – 28 mars" },
];

const INPUT  = path.join(__dirname, "..", "newsletter_initia_vienne_n01_v5.html");
const OUTPUT = path.join(__dirname, "..", "newsletter_initia_vienne_n01_v5_gmail.html");

let html = fs.readFileSync(INPUT, "utf-8");

// --- 1. Remplacement ciblé par classe ---
for (const { classAttr, url, alt } of IMAGE_MAP) {
  // src avant class
  let re = new RegExp(
    `<img([^>]*)src="data:[^"]*"([^>]*class="[^"]*${classAttr}[^"]*"[^>]*)>`,
    "g"
  );
  let next = html.replace(re, (_, b, a) => `<img${b}src="${url}"${a}>`);

  if (next === html) {
    // class avant src
    re = new RegExp(
      `<img([^>]*class="[^"]*${classAttr}[^"]*"[^>]*)src="data:[^"]*"([^>]*)>`,
      "g"
    );
    next = html.replace(re, (_, b, a) => `<img${b}src="${url}"${a}>`);
  }
  html = next;
}

// --- 2. Fallback : remplace les base64 restantes dans l'ordre ---
const pending = IMAGE_MAP.map((m) => m.url).filter((u) => !html.includes(u));
let i = 0;
html = html.replace(/src="data:[^"]{20,}"/g, () => {
  const u = pending[i++];
  return u ? `src="${u}"` : 'src=""';
});

// --- 3. Inline CSS via juice ---
const inlined = juice(html, {
  removeStyleTags: true,
  applyStyleTags: true,
  preserveMediaQueries: false,
  webResources: { images: false },
});

fs.writeFileSync(OUTPUT, inlined, "utf-8");

// --- Rapport ---
const remaining  = (inlined.match(/src="data:/g) || []).length;
const urlsFound  = IMAGE_MAP.filter((m) => inlined.includes(m.url)).length;
console.log("✓ Fichier généré :", OUTPUT);
console.log(`  Images remplacées : ${urlsFound}/${IMAGE_MAP.length}`);
console.log(`  Images base64 restantes : ${remaining}`);
if (remaining > 0) console.warn("  ⚠  Certaines images base64 n'ont pas été remplacées — vérifiez les classes CSS dans le HTML source.");
