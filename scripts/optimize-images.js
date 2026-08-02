// Optimisation automatique des images après le build Eleventy.
// 1) Convertit chaque .jpg/.jpeg/.png de _site/assets/uploads en .webp allégé.
// 2) Réécrit les pages HTML pour pointer vers les .webp.
// Les images du <head> (og-image, favicons) sont exclues.

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const UPLOADS = "_site/assets/uploads";
const SITE = "_site";
const MAX_WIDTH = 1600;
const QUALITY = 80;

// Fichiers à ne PAS convertir/réécrire (utilisés en <meta>/<link>)
const DENYLIST = new Set(["og-image.png"]);

async function convertAll() {
  if (!fs.existsSync(UPLOADS)) return new Set();
  const converted = new Set();
  const files = fs.readdirSync(UPLOADS);
  for (const f of files) {
    if (!/\.(jpe?g|png)$/i.test(f)) continue;
    if (DENYLIST.has(f)) continue;
    const src = path.join(UPLOADS, f);
    const out = path.join(UPLOADS, f.replace(/\.(jpe?g|png)$/i, ".webp"));
    try {
      const meta = await sharp(src).metadata();
      let img = sharp(src).rotate(); // respecte l'orientation EXIF
      if (meta.width && meta.width > MAX_WIDTH) img = img.resize({ width: MAX_WIDTH });
      await img.webp({ quality: QUALITY }).toFile(out);
      converted.add(f.replace(/\.(jpe?g|png)$/i, ""));
    } catch (e) {
      console.warn("  ! image ignorée:", f, e.message);
    }
  }
  return converted;
}

function walkHtml(dir, list) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkHtml(p, list);
    else if (entry.name.endsWith(".html")) list.push(p);
  }
  return list;
}

function rewriteHtml(convertedBaseNames) {
  const htmlFiles = walkHtml(SITE, []);
  const re = /\/assets\/uploads\/([A-Za-z0-9._-]+?)\.(jpe?g|png)/g;
  let count = 0;
  for (const file of htmlFiles) {
    let html = fs.readFileSync(file, "utf8");
    let changed = false;
    html = html.replace(re, function (match, name, ext) {
      if (DENYLIST.has(name + "." + ext)) return match;
      if (!convertedBaseNames.has(name)) return match;
      changed = true;
      return "/assets/uploads/" + name + ".webp";
    });
    if (changed) { fs.writeFileSync(file, html); count++; }
  }
  return count;
}

(async () => {
  const converted = await convertAll();
  const pages = rewriteHtml(converted);
  console.log(`[optimize-images] ${converted.size} image(s) WebP · ${pages} page(s) réécrite(s)`);
})();
