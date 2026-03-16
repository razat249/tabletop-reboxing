import type { Metadata } from "next";
import MiniAppsClient from "./mini-apps-client";

export const metadata: Metadata = {
  title: "Mini Apps",
  description:
    "Free digital companions for your favourite board games — player mats, score counters, and more. Use them on your phone right at the table.",
  openGraph: {
    title: "Mini Apps – Board Game Companions | Tabletop Re-Boxing",
    description:
      "Free digital companions for your favourite board games — player mats, score counters, and more.",
    url: "https://tabletopreboxing.shop/mini-apps",
  },
  alternates: { canonical: "https://tabletopreboxing.shop/mini-apps" },
};

export default function MiniAppsPage() {
  return <MiniAppsClient />;
}
