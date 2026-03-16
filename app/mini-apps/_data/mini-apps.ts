export interface MiniApp {
  slug: string;
  name: string;
  description: string;
  game: string;
  icon: string;
  status: "live" | "coming-soon";
  gradient: string;
  borderAccent: string;
}

export const miniApps: MiniApp[] = [
  {
    slug: "terraforming-mars-player-mat",
    name: "Terraforming Mars Player Mat",
    description:
      "Track all 6 resources — MegaCredits, Steel, Titanium, Plants, Energy, and Heat — with production and stock counters.",
    game: "Terraforming Mars",
    icon: "🪐",
    status: "live",
    gradient: "from-red-600/15 via-orange-500/10 to-amber-400/5",
    borderAccent: "hover:border-red-400/40",
  },
  {
    slug: "sea-salt-and-paper-score-counter",
    name: "Sea Salt & Paper Score Counter",
    description:
      "Multi-player score tracker with round-by-round scoring. Add players, log each round, and see running totals.",
    game: "Sea Salt & Paper",
    icon: "🐚",
    status: "live",
    gradient: "from-cyan-500/15 via-teal-400/10 to-sky-300/5",
    borderAccent: "hover:border-teal-400/40",
  },
  {
    slug: "flip-7-score-counter",
    name: "Flip 7 Score Counter",
    description:
      "Track scores across rounds for up to 8 players. Running totals update automatically after each round.",
    game: "Flip 7",
    icon: "🃏",
    status: "live",
    gradient: "from-violet-500/15 via-fuchsia-400/10 to-purple-300/5",
    borderAccent: "hover:border-violet-400/40",
  },
];

export function getMiniAppBySlug(slug: string): MiniApp | undefined {
  return miniApps.find((app) => app.slug === slug);
}

export function getLiveMiniApps(): MiniApp[] {
  return miniApps.filter((app) => app.status === "live");
}
