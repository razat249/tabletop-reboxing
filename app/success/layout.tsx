import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order has been placed successfully. Thank you for shopping with Tabletop Re-Boxing!",
  openGraph: {
    type: "website",
    title: "Order Confirmed",
    description: "Your order has been placed successfully. Thank you for shopping with Tabletop Re-Boxing!",
    url: "https://tabletopreboxing.shop/success",
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
