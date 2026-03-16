import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { miniApps, getMiniAppBySlug } from "../_data/mini-apps";

import TerraformingMarsPlayerMat from "../_apps/terraforming-mars-player-mat";
import SeaSaltAndPaperScoreCounter from "../_apps/sea-salt-and-paper-score-counter";
import Flip7ScoreCounter from "../_apps/flip-7-score-counter";

const BASE_URL = "https://tabletopreboxing.shop";

const appComponents: Record<string, React.ComponentType> = {
  "terraforming-mars-player-mat": TerraformingMarsPlayerMat,
  "sea-salt-and-paper-score-counter": SeaSaltAndPaperScoreCounter,
  "flip-7-score-counter": Flip7ScoreCounter,
};

export function generateStaticParams() {
  return miniApps
    .filter((app) => app.status === "live")
    .map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getMiniAppBySlug(slug);
  if (!app) return {};

  const title = `Free ${app.name} – Online ${app.game} Companion`;
  const description = `${app.description} Free to use on any device, no install needed.`;
  const url = `${BASE_URL}/mini-apps/${app.slug}`;
  const keywords = [
    app.name,
    `${app.game} companion app`,
    `${app.game} online tool`,
    `${app.game} digital`,
    "board game companion app",
    "free board game tool",
    "board game score tracker",
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${title} | Tabletop Re-Boxing`,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Tabletop Re-Boxing`,
      description,
    },
  };
}

function buildAppSchema(slug: string) {
  const app = getMiniAppBySlug(slug);
  if (!app) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: app.name,
    description: `${app.description} Free to use on any device, no install needed.`,
    url: `${BASE_URL}/mini-apps/${app.slug}`,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    about: {
      "@type": "Game",
      name: app.game,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Tabletop Re-Boxing",
      url: BASE_URL,
    },
  };
}

function buildBreadcrumbSchema(slug: string) {
  const app = getMiniAppBySlug(slug);
  if (!app) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mini Apps",
        item: `${BASE_URL}/mini-apps`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: app.name,
        item: `${BASE_URL}/mini-apps/${app.slug}`,
      },
    ],
  };
}

export default async function MiniAppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getMiniAppBySlug(slug);
  if (!app || app.status !== "live") notFound();

  const AppComponent = appComponents[app.slug];
  if (!AppComponent) notFound();

  const appSchema = buildAppSchema(slug);
  const breadcrumbSchema = buildBreadcrumbSchema(slug);

  return (
    <>
      {appSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
      <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="page-container max-w-4xl">
          {/* Back link + title */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/mini-apps"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground smooth-transition"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              All Mini Apps
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="font-serif text-2xl sm:text-3xl text-foreground">
              {app.icon} {app.name}
            </h1>
          </div>

          {/* App container */}
          <div className="rounded-2xl border border-border/60 bg-card/80 shadow-card overflow-hidden">
            <AppComponent />
          </div>
        </div>
      </div>
    </>
  );
}
