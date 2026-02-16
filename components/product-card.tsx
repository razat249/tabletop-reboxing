"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const categoryFallbacks: Record<string, string> = {
  "Board Game Inserts": "/images/default-inserts.svg",
  "Token Upgrades": "/images/default-tokens.svg",
  "Replacement Pieces": "/images/default-pieces.svg",
};

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(image);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image });
  };

  const handleImageError = () => {
    const fallback = categoryFallbacks[category];
    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  return (
    <Link href={`/products/${id}`} className="group block h-full">
      <div className="h-full bg-card rounded-xl border border-border/60 overflow-hidden shadow-card hover:shadow-card-hover hover:border-border smooth-transition">
        <div className="relative overflow-hidden bg-secondary aspect-[4/3]">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover smooth-transition group-hover:scale-[1.03]"
            onError={handleImageError}
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-primary text-primary-foreground p-2.5 rounded-lg opacity-0 translate-y-1 smooth-transition group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary/90 shadow-elevated"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart size={16} strokeWidth={2} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-2xs uppercase tracking-widest text-muted-foreground mb-1.5 font-medium">
            {category}
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary smooth-transition leading-snug font-sans">
            {name}
          </h3>
          <p className="text-base font-semibold text-foreground">
            ₹{price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Link>
  );
}
