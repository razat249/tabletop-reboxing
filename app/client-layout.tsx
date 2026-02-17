"use client";

import { useState } from "react";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/header";
import CartSidebar from "@/components/cart-sidebar";
import FloatingCartBar from "@/components/floating-cart-bar";
import AnimatedBackground from "@/components/animated-background";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <AnimatedBackground />
      <div className="relative z-[1]">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        <main>{children}</main>
        <FloatingCartBar onCartClick={() => setIsCartOpen(true)} />
      </div>
    </CartProvider>
  );
}
