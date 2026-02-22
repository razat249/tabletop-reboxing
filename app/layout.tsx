import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

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
    images: [{ url: "/icon.svg", width: 40, height: 40, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Custom Board Game Inserts & Accessories`,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
