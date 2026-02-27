#!/usr/bin/env node
/**
 * Generates public/sitemap.xml and public/robots.txt for static export (e.g. GitHub Pages).
 * Run before build so these files are included in the export.
 * With output: 'export', Next.js may not serve app/sitemap.ts, so static files ensure SEO works.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const dataDir = path.join(projectRoot, "app", "assets", "data");

const BASE_URL = "https://tabletopreboxing.shop";

// Ensure public exists
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// Load data
const productsData = JSON.parse(
  fs.readFileSync(path.join(dataDir, "products.json"), "utf8")
);
const categoriesData = JSON.parse(
  fs.readFileSync(path.join(dataDir, "categories.json"), "utf8")
);

const products = productsData.filter((p) => !p.hidden);

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlNode(url, lastmod, changefreq, priority) {
  const lastmodStr = (lastmod || new Date()).toISOString().slice(0, 10);
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmodStr}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const now = new Date();
const urlEntries = [
  urlNode(BASE_URL, now, "daily", 1),
  urlNode(`${BASE_URL}/products`, now, "daily", 0.9),
  urlNode(`${BASE_URL}/checkout`, now, "monthly", 0.3),
  urlNode(`${BASE_URL}/about`, now, "monthly", 0.7),
  urlNode(`${BASE_URL}/guide`, now, "monthly", 0.6),
  ...categoriesData.map((c) =>
    urlNode(`${BASE_URL}/category/${c.id}`, now, "weekly", 0.8)
  ),
  ...products.map((p) =>
    urlNode(`${BASE_URL}/products/${p.id}`, now, "weekly", 0.8)
  ),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
console.log("Generated public/sitemap.xml (" + urlEntries.length + " URLs)");

const robotsTxt = `# https://tabletopreboxing.shop
User-agent: *
Allow: /
Disallow: /success

Sitemap: ${BASE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
console.log("Generated public/robots.txt");
