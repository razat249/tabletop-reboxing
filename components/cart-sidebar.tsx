"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Truck } from "lucide-react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const FREE_SHIPPING_THRESHOLD = 1000;
  const SHIPPING_CHARGE = 120;
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const grandTotal = total + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

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
        className={`fixed right-0 top-0 h-dvh w-full max-w-md bg-background border-l border-border z-50 flex flex-col smooth-transition transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-border">
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
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
                  {item.customization && (
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 italic">
                      Note: {item.customization}
                    </p>
                  )}
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
          <div className="border-t border-border px-5 py-4 sm:px-6 sm:py-5 space-y-3 sm:space-y-4">
            {/* Free shipping nudge */}
            {amountToFreeShipping > 0 ? (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-2">
                <Truck size={14} className="text-amber-600 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Add{" "}
                  <span className="font-semibold">
                    ₹{amountToFreeShipping.toLocaleString("en-IN")}
                  </span>{" "}
                  more for <span className="font-semibold">free shipping!</span>
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 rounded-lg px-3 py-2">
                <Truck size={14} className="text-emerald-600 flex-shrink-0" strokeWidth={1.75} />
                <p className="text-xs text-emerald-700 font-medium">
                  Free shipping unlocked!
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-emerald-600 font-medium">Free</span>
                ) : (
                  <span className="tabular-nums">₹{shipping.toLocaleString("en-IN")}</span>
                )}
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-border">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="text-lg font-semibold text-foreground tabular-nums">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
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
