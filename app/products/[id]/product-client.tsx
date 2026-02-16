"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  Check,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products, type Product } from "@/app/assets/data";
import { getImageSrc, categoryFallbacks } from "@/app/assets/images";

export interface ProductClientProps {
  params: Promise<{ id: string }>;
}

function LightboxModal({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0)
        onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1)
        onNavigate(currentIndex + 1);
    },
    [currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 smooth-transition"
        aria-label="Close lightbox"
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/60 text-sm font-medium tabular-nums">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Previous button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          className="absolute left-4 z-10 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 smooth-transition"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>
      )}

      {/* Next button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          className="absolute right-4 z-10 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 smooth-transition"
          aria-label="Next image"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>
      )}

      {/* Main image */}
      <div
        className="relative w-[90vw] h-[85vh] max-w-5xl animate-in zoom-in-95 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          fill
          className="object-contain select-none"
          priority
        />
      </div>

      {/* Thumbnail strip at bottom */}
      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-3 py-2 rounded-xl bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 smooth-transition ring-2 ${
                idx === currentIndex
                  ? "ring-white opacity-100"
                  : "ring-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductClient({ params }: ProductClientProps) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [id, setId] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    params.then((resolvedParams) => setId(resolvedParams.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const found = products.find((p) => p.id === id);
    setProduct(found || null);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const allImages =
    product?.images && product.images.length > 0
      ? product.images.map(getImageSrc)
      : product
        ? [getImageSrc(product.image)]
        : [];

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxNavigate = (index: number) => {
    setSelectedImageIndex(index);
  };

  const resolveImageSrc = (src: string) => {
    if (failedImages.has(src) && product) {
      return categoryFallbacks[product.category] || src;
    }
    return src;
  };

  const handleImageError = (src: string) => {
    setFailedImages((prev) => new Set(prev).add(src));
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-border/60 bg-secondary/30">
        <div className="page-container py-3">
          <nav className="flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground smooth-transition"
            >
              Home
            </Link>
            <ChevronRight
              size={14}
              strokeWidth={1.5}
              className="text-muted-foreground/50"
            />
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground smooth-transition"
            >
              Products
            </Link>
            <ChevronRight
              size={14}
              strokeWidth={1.5}
              className="text-muted-foreground/50"
            />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="section-padding">
        <div className="page-container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {/* Image Gallery */}
            <div className="space-y-3">
              {/* Main Image */}
              <div
                className="relative bg-secondary rounded-xl overflow-hidden aspect-square cursor-zoom-in group"
                onClick={() => handleOpenLightbox(selectedImageIndex)}
              >
                <Image
                  src={resolveImageSrc(allImages[selectedImageIndex])}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover smooth-transition group-hover:scale-[1.02]"
                  priority
                  onError={() => handleImageError(allImages[selectedImageIndex])}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 smooth-transition" />
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 smooth-transition">
                  <ZoomIn size={18} strokeWidth={1.5} />
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden smooth-transition ring-2 ${
                        idx === selectedImageIndex
                          ? "ring-primary opacity-100"
                          : "ring-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={resolveImageSrc(img)}
                        alt={`${product.name} - Image ${idx + 1}`}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(img)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <p className="text-2xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">
                {product.category}
              </p>

              <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
                {product.name}
              </h1>

              <p className="text-2xl font-semibold text-foreground mb-6 tabular-nums">
                ₹{product.price.toLocaleString("en-IN")}
              </p>

              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="bg-secondary/60 border border-border/40 rounded-xl p-5 mb-8">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 font-sans">
                  Specifications
                </h3>
                <div className="space-y-2.5">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-muted-foreground capitalize">
                        {key}
                      </span>
                      <span className="font-medium text-foreground">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary smooth-transition rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center py-2.5 border-x border-border bg-background text-foreground text-sm font-medium tabular-nums focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary smooth-transition rounded-r-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 rounded-lg text-sm font-medium smooth-transition flex items-center justify-center gap-2 ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={16} strokeWidth={2} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} strokeWidth={2} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck size={14} strokeWidth={1.75} />
                <span>
                  Free shipping on orders over ₹2,000. Ships within 2-3
                  business days.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <LightboxModal
          images={allImages.map((img) => resolveImageSrc(img))}
          currentIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={handleLightboxNavigate}
        />
      )}
    </div>
  );
}
