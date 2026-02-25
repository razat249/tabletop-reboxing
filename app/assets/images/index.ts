import assortedTokens from "./assorted-tokens.svg";
import catanTokens from "./catan-tokens.svg";
import categoryInserts from "./category-inserts.svg";
import categoryPieces from "./category-pieces.svg";
import categoryTokens from "./category-tokens.svg";
import defaultInserts from "./default-inserts.svg";
import defaultPieces from "./default-pieces.svg";
import defaultTokens from "./default-tokens.svg";
import diceSet from "./dice-set.svg";
import diceTower from "./dice-tower.svg";
import everdellOrganizer from "./everdell-organizer.svg";
import gloomhavenInsert from "./gloomhaven-insert.svg";
import heroBackdrop from "./hero-backdrop.svg";
import logo from "./logo.svg";
import meeples from "./meeples.svg";
import pandemicInsert from "./pandemic-insert.svg";
import spiritIslandTokens from "./spirit-island-tokens.svg";
import splendorCoins from "./splendor-coins.svg";
import ticketToRideTrains from "./ticket-to-ride-trains.svg";
import wingspanEggs from "./wingspan-eggs.svg";
import categoryInsertsPng from "./category-inserts.png";
import categoryTokensPng from "./category-tokens.png";
import categoryPiecesPng from "./category-pieces.png";
import carcassonneTravelBox from "./carcassonne_travel_box_220gm_1.webp";
import phonepeQr from "./phonepe_qr.jpg";

type ImageImport = {
  src: string;
  width: number;
  height: number;
};

const imageMap: Record<string, ImageImport> = {
  "/images/assorted-tokens.svg": assortedTokens,
  "/images/catan-tokens.svg": catanTokens,
  "/images/category-inserts.svg": categoryInserts,
  "/images/category-pieces.svg": categoryPieces,
  "/images/category-tokens.svg": categoryTokens,
  "/images/default-inserts.svg": defaultInserts,
  "/images/default-pieces.svg": defaultPieces,
  "/images/default-tokens.svg": defaultTokens,
  "/images/dice-set.svg": diceSet,
  "/images/dice-tower.svg": diceTower,
  "/images/everdell-organizer.svg": everdellOrganizer,
  "/images/gloomhaven-insert.svg": gloomhavenInsert,
  "/images/hero-backdrop.svg": heroBackdrop,
  "/images/logo.svg": logo,
  "/images/meeples.svg": meeples,
  "/images/pandemic-insert.svg": pandemicInsert,
  "/images/spirit-island-tokens.svg": spiritIslandTokens,
  "/images/splendor-coins.svg": splendorCoins,
  "/images/ticket-to-ride-trains.svg": ticketToRideTrains,
  "/images/wingspan-eggs.svg": wingspanEggs,
  "/images/category-inserts.png": categoryInsertsPng,
  "/images/category-tokens.png": categoryTokensPng,
  "/images/category-pieces.png": categoryPiecesPng,
  "/images/carcassonne_travel_box_220gm_1.webp": carcassonneTravelBox,
};

/** Resolve an image path to the bundled asset src. Falls back to the original path. */
export function getImageSrc(path: string): string {
  const img = imageMap[path];
  return img ? img.src : path;
}

/** Get the full image import object (src, width, height) */
export function getImage(path: string): ImageImport | undefined {
  return imageMap[path];
}

/** Category fallback images */
export const categoryFallbacks: Record<string, string> = {
  "Board Game Inserts": defaultInserts.src,
  "Board Game Upgrades": defaultTokens.src,
  "Travel Boxes": defaultInserts.src,
  "Other Accessories": defaultPieces.src,
};

export {
  logo,
  heroBackdrop,
  defaultInserts,
  defaultTokens,
  defaultPieces,
  phonepeQr,
};
