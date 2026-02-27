import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./products-client";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our full catalog of custom 3D-printed board game inserts, upgrades, dice towers, token trays, and more.",
  alternates: { canonical: "https://tabletopreboxing.shop/products" },
  openGraph: {
    type: "website",
    title: "All Products",
    description:
      "Browse our full catalog of custom 3D-printed board game inserts, upgrades, dice towers, token trays, and more.",
    url: "https://tabletopreboxing.shop/products",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Products",
    description:
      "Browse our full catalog of custom 3D-printed board game inserts, upgrades, dice towers, token trays, and more.",
  },
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
