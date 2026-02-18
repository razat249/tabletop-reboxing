"use client";

import { useState } from "react";
import { CartProvider } from "@/lib/cart-context";
import { RequestProvider } from "@/lib/request-context";
import Header from "@/components/header";
import CartSidebar from "@/components/cart-sidebar";
import FloatingCartBar from "@/components/floating-cart-bar";
import Footer from "@/components/footer";
import RequestModal from "@/components/request-modal";
import AnimatedBackground from "@/components/animated-background";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <CartProvider>
      <RequestProvider onOpen={() => setIsRequestOpen(true)}>
        <AnimatedBackground />
        <div className="relative z-[1]">
          <Header onCartClick={() => setIsCartOpen(true)} onRequestClick={() => setIsRequestOpen(true)} />
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
  );
}
