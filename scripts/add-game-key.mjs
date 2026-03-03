#!/usr/bin/env node
/**
 * Adds a "game" key to every product in products.json.
 * Value is derived from specs.compatibility (main game name) or "" for generic products.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToProducts = path.join(__dirname, "..", "app", "assets", "data", "products.json");

const products = JSON.parse(fs.readFileSync(pathToProducts, "utf8"));

function extractGame(product) {
  const comp = product.specs?.compatibility;
  if (!comp || typeof comp !== "string") return "";
  const s = comp.trim();
  const separators = [" — ", " - ", " with ", " + ", " ("];
  let idx = s.length;
  for (const sep of separators) {
    const i = s.indexOf(sep);
    if (i !== -1 && i < idx) idx = i;
  }
  return idx < s.length ? s.slice(0, idx).trim() : s;
}

for (const p of products) {
  p.game = extractGame(p);
}

fs.writeFileSync(pathToProducts, JSON.stringify(products, null, 2) + "\n", "utf8");
console.log("Added 'game' key to", products.length, "products.");
console.log("Sample:", products.slice(0, 3).map((p) => ({ id: p.id, game: p.game })));
