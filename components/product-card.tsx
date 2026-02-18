"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { getImageSrc, categoryFallbacks } from "@/app/assets/images";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  outOfStock?: boolean;
  variant?: "grid" | "list";
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  outOfStock = false,
  variant = "grid",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const fallback = categoryFallbacks[category] || "";
  const [imgSrc, setImgSrc] = useState(
    image ? getImageSrc(image) : fallback
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart({ id, name, price, image });
  };

  const handleImageError = () => {
    const fallback = categoryFallbacks[category];
    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  if (variant === "list") {
    return (
      <Link href={`/products/${id}`} className="group block">
        <div className="flex gap-3.5 bg-card rounded-xl border border-border/60 overflow-hidden shadow-card hover:shadow-card-hover hover:border-border smooth-transition p-2.5">
          <div className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-secondary ${outOfStock ? "opacity-60" : ""}`}>
            <Image
              src={imgSrc}
              alt={name}
              fill
              className="object-cover"
              onError={handleImageError}
            />
            {outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="text-white text-2xs font-semibold uppercase tracking-wider">Sold Out</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
            <p className="text-2xs uppercase tracking-widest text-muted-foreground mb-0.5 font-medium">
              {category}
            </p>
            <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary smooth-transition leading-snug font-sans mb-1">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className={`text-base font-semibold ${outOfStock ? "text-muted-foreground" : "text-foreground"}`}>
                  ₹{price.toLocaleString("en-IN")}
                </p>
                {outOfStock && (
                  <span className="text-2xs text-destructive font-medium">Unavailable</span>
                )}
              </div>
              {!outOfStock && (
                <button
                  onClick={handleAddToCart}
                  className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 smooth-transition shadow-sm"
                  aria-label={`Add ${name} to cart`}
                >
                  <ShoppingCart size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${id}`} className="group block h-full">
      <div className="h-full bg-card rounded-xl border border-border/60 overflow-hidden shadow-card hover:shadow-card-hover hover:border-border smooth-transition">
        <div className={`relative overflow-hidden bg-secondary aspect-[4/3] ${outOfStock ? "opacity-60" : ""}`}>
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover smooth-transition group-hover:scale-[1.03]"
            onError={handleImageError}
          />
          {outOfStock && (
            <div className="absolute top-3 left-3 bg-foreground/80 text-background text-2xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md">
              Out of Stock
            </div>
          )}
          {!outOfStock && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-2.5 rounded-lg opacity-0 translate-y-1 smooth-transition group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary/90 shadow-elevated"
              aria-label={`Add ${name} to cart`}
            >
              <ShoppingCart size={16} strokeWidth={2} />
            </button>
          )}
        </div>
        <div className="p-4">
          <p className="text-2xs uppercase tracking-widest text-muted-foreground mb-1.5 font-medium">
            {category}
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary smooth-transition leading-snug font-sans">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <p className={`text-base font-semibold ${outOfStock ? "text-muted-foreground" : "text-foreground"}`}>
              ₹{price.toLocaleString("en-IN")}
            </p>
            {outOfStock && (
              <span className="text-2xs text-destructive font-medium">Unavailable</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
