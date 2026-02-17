"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, ChevronRight } from "lucide-react";

const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_CHARGE = 120;

interface FloatingCartBarProps {
  onCartClick: () => void;
}

export default function FloatingCartBar({ onCartClick }: FloatingCartBarProps) {
  const { items, total } = useCart();
  const pathname = usePathname();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const grandTotal = total + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  // Hide on checkout page or when cart is empty
  if (items.length === 0 || pathname === "/checkout") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 sm:px-4 sm:pb-4 pointer-events-none animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        {/* Free shipping nudge strip */}
        {amountToFreeShipping > 0 && (
          <div className="bg-amber-50 border border-amber-200/60 border-b-0 rounded-t-xl px-4 py-1.5 text-center">
            <p className="text-[11px] text-amber-800">
              Add{" "}
              <span className="font-semibold">
                ₹{amountToFreeShipping.toLocaleString("en-IN")}
              </span>{" "}
              more for <span className="font-semibold">free shipping</span>
            </p>
          </div>
        )}

        {/* Main bar */}
        <div
          className={`bg-foreground text-background flex items-center gap-3 px-4 py-3 shadow-lg ${
            amountToFreeShipping > 0
              ? "rounded-b-xl"
              : "rounded-xl"
          }`}
        >
          {/* Cart info — tappable to open sidebar */}
          <button
            onClick={onCartClick}
            className="flex items-center gap-2.5 flex-1 min-w-0 text-left"
          >
            <div className="relative flex-shrink-0">
              <ShoppingBag size={18} strokeWidth={1.75} className="text-background/80" />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {itemCount}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold tabular-nums">
                ₹{grandTotal.toLocaleString("en-IN")}
              </p>
              {shipping > 0 && (
                <p className="text-[10px] text-background/50 leading-tight">
                  incl. ₹{shipping} shipping
                </p>
              )}
              {shipping === 0 && (
                <p className="text-[10px] text-emerald-400 leading-tight font-medium">
                  Free shipping
                </p>
              )}
            </div>
          </button>

          {/* Direct checkout link */}
          <Link
            href="/checkout"
            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 smooth-transition flex-shrink-0"
          >
            Checkout
            <ChevronRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
