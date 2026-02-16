"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { getImageSrc } from "@/app/assets/images";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  defaultImage?: string;
  productCount: number;
  icon: string;
}

export default function CategoryCard({
  id,
  name,
  description,
  image,
  defaultImage,
  productCount,
  icon,
}: CategoryCardProps) {
  const resolvedImage = getImageSrc(image);
  const resolvedDefault = defaultImage ? getImageSrc(defaultImage) : undefined;
  const [imgSrc, setImgSrc] = useState(resolvedImage);

  const handleImageError = () => {
    if (resolvedDefault && imgSrc !== resolvedDefault) {
      setImgSrc(resolvedDefault);
    }
  };

  return (
    <Link href={`/products?category=${id}`} className="group block h-full">
      <div className="h-full bg-card rounded-xl border border-border/60 overflow-hidden shadow-card hover:shadow-card-hover hover:border-border smooth-transition">
        <div className="relative overflow-hidden bg-secondary aspect-[16/10]">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover smooth-transition group-hover:scale-[1.03]"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-4xl drop-shadow-lg">{icon}</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary smooth-transition font-sans">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                <ArrowRight size={14} strokeWidth={2} />
              </div>
            </div>
          </div>
          <p className="text-2xs uppercase tracking-widest text-muted-foreground font-medium mt-3">
            {productCount} Products
          </p>
        </div>
      </div>
    </Link>
  );
}
