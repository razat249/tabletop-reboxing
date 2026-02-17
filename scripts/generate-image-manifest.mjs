import { readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMAGES_DIR = join(ROOT, "public", "images");
const MANIFEST_PATH = join(ROOT, "app", "assets", "data", "image-manifest.json");
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".svg", ".webp", ".avif"]);

/**
 * Scans public/images/ for files matching the [product_id]_[number].[ext] pattern.
 * Generates a manifest mapping product IDs to sorted arrays of image paths.
 *
 * Example output:
 * {
 *   "brass-birmingham": ["/images/brass-birmingham_1.jpg", "/images/brass-birmingham_2.jpg"],
 *   "scythe": ["/images/scythe_1.png"]
 * }
 */
function generateManifest() {
  let files;
  try {
    files = readdirSync(IMAGES_DIR);
  } catch {
    console.log("No public/images/ directory found. Creating empty manifest.");
    writeFileSync(MANIFEST_PATH, JSON.stringify({}, null, 2) + "\n");
    return;
  }

  const manifest = {};

  for (const file of files) {
    const dotIndex = file.lastIndexOf(".");
    if (dotIndex === -1) continue;

    const ext = file.slice(dotIndex).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(ext)) continue;

    const baseName = file.slice(0, dotIndex);
    const underscoreIndex = baseName.lastIndexOf("_");
    if (underscoreIndex === -1) continue;

    const num = baseName.slice(underscoreIndex + 1);
    if (!/^\d+$/.test(num)) continue;

    const productId = baseName.slice(0, underscoreIndex);
    if (!productId) continue;

    if (!manifest[productId]) {
      manifest[productId] = [];
    }

    manifest[productId].push({
      path: `/images/${file}`,
      order: parseInt(num, 10),
    });
  }

  for (const productId of Object.keys(manifest)) {
    manifest[productId].sort((a, b) => a.order - b.order);
    manifest[productId] = manifest[productId].map((entry) => entry.path);
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");

  const productCount = Object.keys(manifest).length;
  const imageCount = Object.values(manifest).reduce((sum, imgs) => sum + imgs.length, 0);
  console.log(`Image manifest: ${imageCount} images for ${productCount} products → ${MANIFEST_PATH}`);
}

generateManifest();
