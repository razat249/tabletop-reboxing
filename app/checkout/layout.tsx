import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order for custom board game inserts and accessories.",
  openGraph: {
    type: "website",
    title: "Checkout",
    description: "Complete your order for custom board game inserts and accessories.",
    url: "https://tabletopreboxing.shop/checkout",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
