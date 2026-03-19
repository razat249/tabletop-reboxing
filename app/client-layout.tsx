"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/lib/cart-context";
import { RequestProvider } from "@/lib/request-context";
import Header from "@/components/header";
import CustomRequestBar from "@/components/custom-request-bar";
import CartSidebar from "@/components/cart-sidebar";
import FloatingCartBar from "@/components/floating-cart-bar";
import Footer from "@/components/footer";
import RequestModal from "@/components/request-modal";
import AnimatedBackground from "@/components/animated-background";
import AnnouncementBanner from "@/components/announcement-banner";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CartProvider>
        <RequestProvider onOpen={() => setIsRequestOpen(true)}>
          <AnimatedBackground />
          <div className="relative z-[1]">
            <AnnouncementBanner />
            <Header onCartClick={() => setIsCartOpen(true)} onRequestClick={() => setIsRequestOpen(true)} />
            <CustomRequestBar onRequestClick={() => setIsRequestOpen(true)} />
            <CartSidebar
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />
            <main>{children}</main>
            <Footer />
            <FloatingCartBar onCartClick={() => setIsCartOpen(true)} />
            <RequestModal isOpen={isRequestOpen} onClose={() => setIsRequestOpen(false)} />
          </div>
        </RequestProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
