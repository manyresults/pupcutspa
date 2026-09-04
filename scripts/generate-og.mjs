/**
 * Generates public/og-image.png (1200x630) — the default social share image.
 * Run with: node scripts/generate-og.mjs
 * Composites the white Patty's Pup Cuts logo onto a pink brand gradient.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "../public/og-image.png");
const logoPath = resolve(__dirname, "../src/assets/logo-pattys-pup-cuts-white.png");

const bg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fe318e"/>
      <stop offset="1" stop-color="#e21a78"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.15" cy="0.85" r="0.7">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="600" y="470" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#ffffff">Home-based dog grooming &#183; Morrisville, PA</text>
  <text x="600" y="524" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" fill="#ffffff" opacity="0.9">By appointment only &#183; (267) 499-6674</text>
</svg>`;

// Scale the white logo to ~420px wide and center it in the upper area.
const logo = await sharp(logoPath)
  .resize({ width: 460 })
  .toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp(Buffer.from(bg))
  .composite([
    {
      input: logo,
      top: Math.round(150 - (logoMeta.height ?? 0) / 2 + 40),
      left: Math.round(600 - (logoMeta.width ?? 0) / 2),
    },
  ])
  .png()
  .toFile(out);

console.log("Wrote", out);
