"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
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
  Sparkles,
  MessageCircle,
  Box,
  Search,
  ChevronsUpDown,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useRequest } from "@/lib/request-context";
import { products, colors, type Product, type ProductVariant } from "@/app/assets/data";
import { getImageSrc, categoryFallbacks } from "@/app/assets/images";

const ModelViewer = dynamic(() => import("@/components/model-viewer"), { ssr: false });

type CarouselSlide = { type: "image"; src: string } | { type: "model"; src: string };

function isModelFile(src: string): boolean {
  return /\.(glb|gltf)$/i.test(src);
}

function modelLabel(src: string): string {
  const filename = src.split("/").pop() ?? "";
  const base = filename.replace(/\.(glb|gltf)$/i, "");
  // Strip common prefixes like "unmatched-battle-of-legends-1-" or "unmatched-tmnt-"
  const stripped = base
    .replace(/^unmatched-(?:battle-of-legends-\d+-|cobble-and-fog-|brains-and-brawn-|for-king-and-country-|hells-kitchen-|jurassic-park-|redemption-row-|slings-and-arrows-|suns-origin-|tales-to-amaze-(?:minion-)?|teen-spirit-|the-witcher-|tmnt-(?:extra-toppings-|minion-)?|buffy-)?/i, "")
    .replace(/[-_](BLACK|WHITE|GRAY|RED|GREEN|BLUE|YELLOW|ORANGE|PURPLE|BROWN)(?:[-_].*)?$/i, "")
    .replace(/[-_]\d+gm[-_]\d+$/i, "");
  return stripped
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export interface ProductClientProps {
  params: Promise<{ id: string }>;
}

function VariantCombobox({
  variants,
  selectedIndex,
  onSelect,
}: {
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (idx: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query
    ? variants
        .map((v, i) => ({ v, i }))
        .filter(({ v }) => v.subname.toLowerCase().includes(query.toLowerCase()))
    : variants.map((v, i) => ({ v, i }));

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-border bg-background text-left smooth-transition hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        <span className="text-sm font-medium text-foreground truncate">
          {variants[selectedIndex]?.subname}
        </span>
        <ChevronsUpDown size={16} className="flex-shrink-0 text-muted-foreground" strokeWidth={2} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-background border border-border rounded-xl shadow-elevated overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
            <Search size={14} className="text-muted-foreground flex-shrink-0" strokeWidth={2} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search variants..."
              className="flex-1 text-sm bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>
          <div className="max-h-60 overflow-y-auto overscroll-contain">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No variants found
              </div>
            ) : (
              filtered.map(({ v, i }) => (
                <button
                  key={i}
                  onClick={() => {
                    onSelect(i);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm smooth-transition flex items-center gap-2.5 ${
                    i === selectedIndex
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {i === selectedIndex && <Check size={14} strokeWidth={2.5} className="flex-shrink-0" />}
                  <span className={i === selectedIndex ? "" : "pl-[22px]"}>{v.subname}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
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
  const { openRequest } = useRequest();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.id || "");
  const [isAdded, setIsAdded] = useState(false);
  const [id, setId] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [customization, setCustomization] = useState("");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

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
    const colorName = product.showColorOption
      ? colors.find((c) => c.id === selectedColor)?.name || ""
      : "";
    const variantSuffix = activeVariant ? `__var_${selectedVariantIndex}` : "";
    let cartId = product.showColorOption
      ? `${product.id}${variantSuffix}__${selectedColor}`
      : `${product.id}${variantSuffix}`;
    if (customization.trim()) {
      cartId += `__custom_${customization.trim()}`;
    }
    const cartName = activeVariant
      ? `${product.name} — ${activeVariant.subname}`
      : product.name;
    const cartDisplayName = colorName ? `${cartName} (${colorName})` : cartName;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: cartId,
        name: cartDisplayName,
        price: displayPrice,
        image: product.image,
        ...(customization.trim() && { customization: customization.trim() }),
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const variants = product?.enableVariants;
  const activeVariant = variants?.[selectedVariantIndex];

  const displayName = product
    ? activeVariant
      ? `${product.name} — ${activeVariant.subname}`
      : product.name
    : "";

  const displayDescription = product
    ? activeVariant
      ? `${product.description}\n${activeVariant.description}`
      : product.description
    : "";

  const displayPrice = activeVariant?.price ?? product?.price ?? 0;

  const fallbackSrc = product
    ? categoryFallbacks[product.category] || ""
    : "";

  const rawSrcs = activeVariant?.images?.length
    ? activeVariant.images
    : product?.images && product.images.length > 0
    ? product.images
    : product?.image
    ? [product.image]
    : fallbackSrc
    ? [fallbackSrc]
    : [];

  const allSlides: CarouselSlide[] = rawSrcs.map((src) =>
    isModelFile(src)
      ? { type: "model" as const, src }
      : { type: "image" as const, src: getImageSrc(src) }
  );

  const allImages = allSlides.filter((s): s is { type: "image"; src: string } => s.type === "image").map((s) => s.src);

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
              {/* Main Image / 3D Model */}
              {allSlides[selectedImageIndex]?.type === "model" ? (
                <div className="relative rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 dark:from-slate-700 dark:via-slate-800 dark:to-slate-950">
                  <ModelViewer
                    src={allSlides[selectedImageIndex].src}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-2xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 pointer-events-none">
                    <Box size={12} strokeWidth={2.5} />
                    3D
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {modelLabel(allSlides[selectedImageIndex].src)}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="relative bg-secondary rounded-xl overflow-hidden aspect-square cursor-zoom-in group"
                  onClick={() => {
                    const imgIndex = allImages.indexOf(allSlides[selectedImageIndex]?.src);
                    handleOpenLightbox(imgIndex >= 0 ? imgIndex : 0);
                  }}
                >
                  <Image
                    src={resolveImageSrc(allSlides[selectedImageIndex]?.src)}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover smooth-transition group-hover:scale-[1.02]"
                    priority
                    onError={() =>
                      handleImageError(allSlides[selectedImageIndex]?.src)
                    }
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 smooth-transition" />
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 smooth-transition">
                    <ZoomIn size={18} strokeWidth={1.5} />
                  </div>
                </div>
              )}

              {/* Thumbnails */}
              {allSlides.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden smooth-transition ring-2 ${
                        idx === selectedImageIndex
                          ? "ring-primary opacity-100"
                          : "ring-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      {slide.type === "model" ? (
                        <div className="w-full h-full bg-slate-700 flex flex-col items-center justify-center gap-0.5 px-1">
                          <Box size={14} strokeWidth={1.5} className="text-white/80 flex-shrink-0" />
                          <span className="text-[8px] leading-tight font-medium text-white text-center line-clamp-2">
                            {modelLabel(slide.src)}
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={resolveImageSrc(slide.src)}
                          alt={`${product.name} - Image ${idx + 1}`}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(slide.src)}
                        />
                      )}
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
                {displayName}
              </h1>

              <p className="text-2xl font-semibold text-foreground mb-6 tabular-nums">
                ₹{displayPrice.toLocaleString("en-IN")}
              </p>

              {/* Variant Selector */}
              {variants && variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 font-sans">
                    Variant
                  </h3>
                  {variants.length <= 5 ? (
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedVariantIndex(idx);
                            setSelectedImageIndex(0);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium smooth-transition border ${
                            idx === selectedVariantIndex
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-secondary/60 text-foreground border-border hover:bg-secondary hover:border-border/80"
                          }`}
                        >
                          {v.subname}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <VariantCombobox
                      variants={variants}
                      selectedIndex={selectedVariantIndex}
                      onSelect={(idx) => {
                        setSelectedVariantIndex(idx);
                        setSelectedImageIndex(0);
                      }}
                    />
                  )}
                </div>
              )}

              <div className="text-sm text-muted-foreground mb-6 leading-relaxed space-y-2">
                {displayDescription.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Color Selector */}
              {product.showColorOption && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider font-sans">
                      Color
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      — {colors.find((c) => c.id === selectedColor)?.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {colors
                      .filter((color) => color.id !== "assorted" || product.showAssortedColor)
                      .map((color) => {
                        const isGradient = color.hex.includes("gradient");
                        return (
                          <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className={`relative w-9 h-9 flex-shrink-0 rounded-full smooth-transition ${
                              selectedColor === color.id
                                ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                                : "ring-1 ring-border hover:scale-105"
                            }`}
                            style={isGradient ? { background: color.hex } : { backgroundColor: color.hex }}
                            aria-label={`Select ${color.name}`}
                            title={color.name}
                          >
                            {selectedColor === color.id && (
                              <Check
                                size={14}
                                strokeWidth={3}
                                className={`absolute inset-0 m-auto ${
                                  color.id === "white" || color.id === "wood"
                                    ? "text-foreground"
                                    : "text-white"
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Specs */}
              <div className="bg-secondary/60 border border-border/40 rounded-xl p-5 mb-8">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 font-sans">
                  Specifications
                </h3>
                <div className="space-y-2.5">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-4 text-sm"
                    >
                      <span className="text-muted-foreground capitalize flex-shrink-0">
                        {key}
                      </span>
                      <span className="font-medium text-foreground sm:text-right break-words">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization Input */}
              {product.customizable && (
                <div className="mb-6">
                  <label
                    htmlFor="customization"
                    className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2 font-sans"
                  >
                    Customization
                  </label>
                  <textarea
                    id="customization"
                    value={customization}
                    onChange={(e) => setCustomization(e.target.value)}
                    placeholder={product.customizable}
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 smooth-transition resize-none"
                  />
                </div>
              )}

              {/* Add to Cart */}
              {product.outOfStock ? (
                <div className="mb-6 space-y-3">
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg px-4 py-3 flex items-center gap-2">
                    <span className="text-sm font-medium text-destructive">
                      Currently Out of Stock
                    </span>
                  </div>
                  <button
                    onClick={openRequest}
                    className="w-full py-3 rounded-lg text-sm font-medium smooth-transition flex items-center justify-center gap-2 bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                  >
                    <MessageCircle size={16} strokeWidth={2} />
                    Request When Available
                  </button>
                </div>
              ) : (
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
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck size={14} strokeWidth={1.75} />
                <span>
                  Free shipping on orders over ₹1,000. Ships within 4-5 business
                  days.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Request CTA */}
      <div className="border-t border-border/60 bg-secondary/20">
        <div className="page-container max-w-5xl py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={20} className="text-primary" strokeWidth={1.75} />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
              Looking for Something Different?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 max-w-lg mx-auto">
              Hi, I&apos;m Rajat — the person behind Tabletop Re-Boxing. I understand that every board game collection is unique. If you need a custom color, a different size, or an insert for a game we haven&apos;t listed yet — I&apos;d love to help. Every piece is handcrafted with care, and I&apos;m always happy to work with you on something special.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
              Just tell me what you have in mind, and I&apos;ll get back to you with a quote and timeline. No obligation, no pressure — just a friendly conversation.
            </p>
            <button
              onClick={openRequest}
              className="inline-flex items-center justify-center gap-2 bg-primary/10 backdrop-blur-md text-primary border border-primary/20 shadow-sm hover:bg-primary/15 hover:shadow-md px-6 py-3 rounded-lg text-sm font-medium smooth-transition group"
            >
              <MessageCircle size={16} strokeWidth={2} className="group-hover:scale-110 smooth-transition" />
              Send Us a Custom Request
            </button>
            <p className="text-[11px] text-muted-foreground mt-3">
              Opens WhatsApp — we usually respond within a few hours
            </p>
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
