import type { Metadata } from "next";
import { miniApps } from "./_data/mini-apps";
import MiniAppsClient from "./mini-apps-client";

const BASE_URL = "https://tabletopreboxing.shop";

const TITLE = "Free Board Game Mini Apps – Player Mats & Score Counters";
const DESCRIPTION =
  "Free digital companions for your favourite board games — player mats, score counters, and more. Use them on your phone right at the table. No install needed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "board game mini apps",
    "board game score counter",
    "board game player mat",
    "Terraforming Mars player mat",
    "Terraforming Mars resource tracker",
    "Sea Salt and Paper score counter",
    "Flip 7 score counter",
    "free board game tools",
    "board game companion app",
    "digital board game accessories",
    "board game score tracker online",
    "tabletop game tools",
  ],
  alternates: { canonical: `${BASE_URL}/mini-apps` },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/mini-apps`,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Board Game Mini Apps",
  description: DESCRIPTION,
  url: `${BASE_URL}/mini-apps`,
  numberOfItems: miniApps.filter((a) => a.status === "live").length,
  itemListElement: miniApps
    .filter((a) => a.status === "live")
    .map((app, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: app.name,
      url: `${BASE_URL}/mini-apps/${app.slug}`,
    })),
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: `${BASE_URL}/mini-apps`,
  isPartOf: { "@type": "WebSite", url: BASE_URL },
  about: {
    "@type": "Thing",
    name: "Board Game Digital Companions",
  },
};

export default function MiniAppsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <MiniAppsClient />
    </>
  );
}
