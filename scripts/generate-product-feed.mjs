#!/usr/bin/env node
/**
 * Generates a product feed for Instagram/Facebook catalog and dynamic ads.
 * - Reads products.json (excludes hidden)
 * - Writes public/product-feed.csv (and public/product-feed.json)
 * - Optionally copies first product image to public/feed-images/ so image_link URLs work
 *
 * Usage:
 *   node scripts/generate-product-feed.mjs
 *   COPY_IMAGES=1 node scripts/generate-product-feed.mjs   # also copy images to public/feed-images
 *
 * Base URL: BASE_URL=https://yoursite.com node scripts/generate-product-feed.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PRODUCTS_PATH = path.join(ROOT, "app", "assets", "data", "products.json");
const IMAGES_DIR = path.join(ROOT, "app", "assets", "images");
const PUBLIC_DIR = path.join(ROOT, "public");
const FEED_IMAGES_DIR = path.join(PUBLIC_DIR, "feed-images");

const BASE_URL = process.env.BASE_URL || "https://tabletopreboxing.shop";
const COPY_IMAGES = process.env.COPY_IMAGES === "1" || process.env.COPY_IMAGES === "true";

const SUPPORTED_EXT = [".webp", ".jpg", ".jpeg", ".png"];

function escapeCsv(str) {
  if (str == null) return "";
  const s = String(str).replace(/"/g, '""');
  return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s;
}

function main() {
  const productsRaw = JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"));
  const products = productsRaw.filter((p) => !p.hidden);

  const productIdToFirstImage = new Map();
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!SUPPORTED_EXT.includes(ext)) continue;
      const base = path.basename(file, ext);
      const idx = base.lastIndexOf("_");
      if (idx === -1) continue;
      const num = base.slice(idx + 1);
      if (num !== "1") continue;
      const productId = base.slice(0, idx);
      if (!productIdToFirstImage.has(productId)) productIdToFirstImage.set(productId, file);
    }
  } catch {
    // ignore
  }

  if (COPY_IMAGES) {
    if (!fs.existsSync(FEED_IMAGES_DIR)) fs.mkdirSync(FEED_IMAGES_DIR, { recursive: true });
  }

  const rows = [];
  const jsonFeed = [];

  for (const p of products) {
    const firstImage = productIdToFirstImage.get(p.id);
    let imageLink = "";
    if (firstImage) {
      const ext = path.extname(firstImage).toLowerCase();
      if (COPY_IMAGES) {
        const srcPath = path.join(IMAGES_DIR, firstImage);
        const destName = `${p.id}${ext}`;
        const destPath = path.join(FEED_IMAGES_DIR, destName);
        try {
          fs.copyFileSync(srcPath, destPath);
        } catch (e) {
          console.warn("Copy failed for", p.id, e.message);
        }
        imageLink = `${BASE_URL}/feed-images/${destName}`;
      } else {
        imageLink = `${BASE_URL}/feed-images/${p.id}${ext}`;
      }
    }

    const link = `${BASE_URL}/products/${p.id}`;
    const title = (p.name || "").trim();
    const description = (p.description || "").trim().replace(/\s+/g, " ").slice(0, 5000);
    const price = p.price != null ? `${p.price} INR` : "";
    const availability = p.outOfStock ? "out of stock" : "in stock";

    rows.push({
      id: p.id,
      title,
      description,
      link,
      image_link: imageLink,
      price,
      availability,
      condition: "new",
      brand: "Tabletop Re-Boxing",
      category: p.category || "",
      game: (p.game || "").trim(),
    });

    jsonFeed.push({
      id: p.id,
      title,
      description,
      link,
      image_link: imageLink,
      price: p.price,
      availability,
      condition: "new",
      brand: "Tabletop Re-Boxing",
      category: p.category || "",
      game: p.game || "",
    });
  }

  const csvHeader =
    "id,title,description,link,image_link,price,availability,condition,brand,category,game";
  const csvLines = [csvHeader];
  for (const r of rows) {
    csvLines.push(
      [
        escapeCsv(r.id),
        escapeCsv(r.title),
        escapeCsv(r.description),
        escapeCsv(r.link),
        escapeCsv(r.image_link),
        escapeCsv(r.price),
        escapeCsv(r.availability),
        escapeCsv(r.condition),
        escapeCsv(r.brand),
        escapeCsv(r.category),
        escapeCsv(r.game),
      ].join(",")
    );
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, "product-feed.csv"), csvLines.join("\n") + "\n", "utf8");
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "product-feed.json"),
    JSON.stringify(jsonFeed, null, 2) + "\n",
    "utf8"
  );

  console.log("Product feed written: public/product-feed.csv, public/product-feed.json");
  console.log("Products:", rows.length);
  if (COPY_IMAGES) console.log("Images copied to public/feed-images/");
  if (!COPY_IMAGES && rows.some((r) => r.image_link)) {
    console.log("Tip: run COPY_IMAGES=1 node scripts/generate-product-feed.mjs to copy images for image_link URLs.");
  }
}

main();
