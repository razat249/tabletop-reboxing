import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Tabletop Re-Boxing makes custom 3D-printed board game inserts and accessories in India. Handcrafted organizers, dice towers, and travel boxes for your favourite games.",
  openGraph: {
    title: "About Tabletop Re-Boxing – Board Game Inserts India",
    description:
      "Custom 3D-printed board game inserts and accessories in India. Handcrafted with care for tabletop gamers.",
    url: "https://tabletopreboxing.shop/about",
  },
  alternates: { canonical: "https://tabletopreboxing.shop/about" },
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="page-container max-w-2xl">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-6">
          About Tabletop Re-Boxing
        </h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="leading-relaxed">
            We design and 3D-print board game inserts, organizers, dice towers, and
            travel boxes in India. Every piece is made to fit your games so
            setup is faster and storage stays tidy.
          </p>

          <h2 className="text-lg font-semibold text-foreground mt-8">
            How we make them
          </h2>
          <p className="leading-relaxed">
            Our inserts are printed in-house with quality PLA, then checked
            before shipping. We offer custom colours and can adapt designs for
            expansions or different card sizes. If you don’t see a game listed,
            use the Request option — we often add new products based on what
            you ask for.
          </p>

          <h2 className="text-lg font-semibold text-foreground mt-8">
            Shipping in India
          </h2>
          <p className="leading-relaxed">
            We ship across India. Orders are packed carefully and typically
            dispatched within a few days. You can reach us by email or WhatsApp
            for any questions about your order or a custom request.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
          >
            Browse all products
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
