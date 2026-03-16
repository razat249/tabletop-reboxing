"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Gamepad2, Search, X } from "lucide-react";
import { miniApps, type MiniApp } from "./_data/mini-apps";

export default function MiniAppsClient() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return miniApps;
    const q = query.toLowerCase();
    return miniApps.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.game.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="section-padding">
      <div className="page-container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 text-2xs font-semibold uppercase tracking-widest border border-violet-500/25 mb-4">
            <Gamepad2 size={13} strokeWidth={2} />
            Digital Companions
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Mini Apps
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-balance leading-relaxed">
            Free tools to use right at the game table — player mats, score
            trackers, and more. Works on any device, no install needed.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search
              size={16}
              strokeWidth={2}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mini apps by name or game..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border/60 bg-card/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 shadow-card smooth-transition"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
              >
                <X size={15} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        {/* App Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((app) => {
              const isLive = app.status === "live";

              return (
                <div key={app.slug} className="relative group">
                  {isLive ? (
                    <Link
                      href={`/mini-apps/${app.slug}`}
                      className={`block h-full rounded-2xl border border-border/60 bg-gradient-to-br ${app.gradient} p-5 sm:p-6 shadow-card hover:shadow-card-hover ${app.borderAccent} smooth-transition`}
                    >
                      <CardContent app={app} />
                    </Link>
                  ) : (
                    <div
                      className={`block h-full rounded-2xl border border-border/40 bg-gradient-to-br ${app.gradient} p-5 sm:p-6 opacity-60 cursor-default`}
                    >
                      <CardContent app={app} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm mb-3">
              No mini apps found for &ldquo;{query}&rdquo;
            </p>
            <button
              onClick={() => setQuery("")}
              className="text-primary hover:text-primary/80 text-sm font-medium smooth-transition"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            More apps coming soon. Have a request?{" "}
            <Link
              href="/mini-apps"
              className="text-primary hover:underline font-medium"
            >
              Let us know
            </Link>{" "}
            which game you&apos;d like to see next.
          </p>
        </div>
      </div>
    </div>
  );
}

function CardContent({ app }: { app: MiniApp }) {
  const isLive = app.status === "live";

  return (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-2xl leading-none">{app.icon}</span>
        {!isLive && (
          <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-2xs font-semibold uppercase tracking-wider">
            Coming soon
          </span>
        )}
      </div>
      <p className="text-2xs font-semibold uppercase tracking-wider text-primary mb-1">
        {app.game}
      </p>
      <h2 className="font-serif text-lg text-foreground mb-2">{app.name}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {app.description}
      </p>
      {isLive && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2 smooth-transition">
          Open app
          <ArrowRight size={13} strokeWidth={2.5} />
        </span>
      )}
    </>
  );
}
