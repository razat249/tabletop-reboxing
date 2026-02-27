import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guide: Care for Board Game Inserts",
  description:
    "How to clean, store, and care for 3D-printed board game inserts and organizers. Simple tips to keep your tabletop accessories in good shape.",
  openGraph: {
    title: "How to Care for Board Game Inserts – Tabletop Re-Boxing",
    description:
      "Simple guide to cleaning and caring for 3D-printed board game inserts and organizers.",
    url: "https://tabletopreboxing.shop/guide",
  },
  alternates: { canonical: "https://tabletopreboxing.shop/guide" },
  keywords: [
    "board game insert care",
    "3D printed insert cleaning",
    "board game organizer storage",
    "tabletop accessory care",
  ],
};

export default function GuidePage() {
  return (
    <div className="section-padding">
      <div className="page-container max-w-2xl">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
          How to Care for Your Board Game Inserts
        </h1>
        <p className="text-muted-foreground mb-8">
          A short guide to keeping your 3D-printed organizers in good condition.
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">
            Cleaning
          </h2>
          <p className="leading-relaxed">
            Wipe inserts with a dry or slightly damp cloth. Avoid harsh
            chemicals or solvents, which can affect the plastic. For dust, a
            soft brush or compressed air works well in the grooves.
          </p>

          <h2 className="text-lg font-semibold text-foreground mt-6">
            Storage
          </h2>
          <p className="leading-relaxed">
            Keep inserts inside the game box, in a cool, dry place. Avoid
            long exposure to direct sunlight to prevent colour fade. Stack
            boxes normally; the inserts are designed to hold weight.
          </p>

          <h2 className="text-lg font-semibold text-foreground mt-6">
            Handling
          </h2>
          <p className="leading-relaxed">
            PLA is sturdy for everyday use but can snap if bent sharply. Lift
            trays from the base rather than by thin edges. For travel boxes,
            pack the box so it isn’t crushed under heavy luggage.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
          >
            Shop board game inserts
          </Link>
        </div>
      </div>
    </div>
  );
}
