import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { config } from "@/app/assets/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_NAME = "Tabletop Re-Boxing";
const SITE_DESCRIPTION =
  "Premium board game inserts, board game upgrades, and accessories. Re-box your games with custom-fit accessories.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tabletopreboxing.shop"),
  title: {
    default: `${SITE_NAME} - Custom Board Game Inserts & Accessories`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Custom Board Game Inserts & Accessories`,
    description: SITE_DESCRIPTION,
    url: "https://tabletopreboxing.shop",
    locale: "en_IN",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Custom Board Game Inserts & Accessories`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tabletopreboxing.shop",
  },
  keywords: [
    "board game inserts",
    "3D printed board game",
    "board game organizers",
    "dice tower",
    "game storage",
    "tabletop accessories",
    "India",
    "board games india",
    "board game india",
    "shuffle with apporva",
    "board game bazaar",
    "ttox india",
    "TTOX",
    "ttox",
    "board game company",
  ],
  authors: [{ name: SITE_NAME, url: "https://tabletopreboxing.shop" }],
  creator: SITE_NAME,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const BASE_URL = "https://tabletopreboxing.shop";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: [
    "Shuffle with Apporva",
    "Board Game Bazaar",
    "TTOX",
    "TTOX India",
    "Board Game Company",
  ],
  url: BASE_URL,
  email: config.contactEmail,
  description: SITE_DESCRIPTION,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: [
    "Shuffle with Apporva",
    "Board Game Bazaar",
    "TTOX",
    "TTOX India",
    "Board Game Company",
  ],
  url: BASE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@type": "Organization", name: SITE_NAME },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      url: `${BASE_URL}/products?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
