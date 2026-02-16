"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 smooth-transition"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-md bg-background border-l border-border z-50 flex flex-col smooth-transition transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg smooth-transition text-muted-foreground hover:text-foreground"
            aria-label="Close cart"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <ShoppingBag
                size={40}
                strokeWidth={1}
                className="text-muted-foreground/40"
              />
              <p className="text-sm text-muted-foreground">
                Your cart is empty
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 bg-secondary/60 border border-border/40 rounded-lg p-3"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <h4 className="text-sm font-medium text-foreground line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                  <div className="flex items-center gap-1.5 mt-auto pt-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-muted rounded smooth-transition text-muted-foreground hover:text-foreground"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} strokeWidth={2} />
                    </button>
                    <span className="w-6 text-center text-xs font-semibold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-muted rounded smooth-transition text-muted-foreground hover:text-foreground"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} strokeWidth={2} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto p-1 hover:bg-destructive/10 rounded smooth-transition text-muted-foreground hover:text-destructive"
                      aria-label="Remove item"
                    >
                      <X size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-semibold text-foreground tabular-nums">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium text-center hover:bg-primary/90 smooth-transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
