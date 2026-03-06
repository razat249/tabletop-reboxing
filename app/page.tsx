"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchBox, { type SearchSuggestion } from "@/components/search-box";
import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import NewsletterSignup from "@/components/newsletter-signup";
import {
  ArrowRight,
  MessageCircle,
  Package,
  Truck,
  Sparkles,
} from "lucide-react";
import { products, categories, getFeaturedProducts } from "@/app/assets/data";
import { useRequest } from "@/lib/request-context";

const allProducts: SearchSuggestion[] = products;
const featuredProducts = getFeaturedProducts();
const newArrivals = products.slice(-8).reverse();

export default function Home() {
  const router = useRouter();
  const { openRequest } = useRequest();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(var(--primary)/0.12),transparent_50%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,hsl(172_50%_40%/0.06),transparent_50%)]"
          aria-hidden
        />
        <div className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="page-container max-w-3xl text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-2xs font-semibold uppercase tracking-widest border border-primary/20 mb-4">
              Premium Board Game Accessories
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-5 text-balance leading-tight">
              Elevate Your{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Board
              </span>{" "}
              <span className="text-teal-500 dark:text-teal-400">Game</span>{" "}
              Collection
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto text-balance leading-relaxed">
              Premium 3D-printed inserts, dice towers, and accessories for your
              favourite board games. Less setup, more game time.
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBox
                onSearch={handleSearch}
                suggestions={allProducts}
                placeholder="Search by game name — Terraforming Mars, Wingspan, Carcassonne..."
                variant="hero"
              />
              <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-2xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Package className="size-3.5 text-primary" /> 60+ products
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="size-3.5 text-primary" /> India-wide
                  shipping
                </span>
              </div>
              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/15 border border-primary/20 smooth-transition"
                >
                  Browse all products
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/60 bg-card/50">
        <div className="page-container py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-2xs sm:text-xs text-muted-foreground">
            <span className="flex items-center gap-2 font-medium text-foreground/90">
              <Sparkles className="size-4 text-amber-500" /> Custom colours &
              requests
            </span>
            <span className="flex items-center gap-2 font-medium text-foreground/90">
              <Package className="size-4 text-primary" /> Quality PLA, made to
              last
            </span>
            <span className="flex items-center gap-2 font-medium text-foreground/90">
              <Truck className="size-4 text-primary" /> 4–5 day delivery
            </span>
          </div>
        </div>
      </section>

      {/* About / Request Box */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="page-container max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div
              className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl"
              aria-hidden
            />
            <div className="relative flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageCircle className="size-8 text-primary" />
            </div>
            <div className="relative text-center sm:text-left flex-1">
              <p className="text-base text-foreground leading-relaxed mb-1">
                Hi, I&apos;m{" "}
                <span className="font-semibold text-primary">Rajat</span> — I
                design and print every insert by hand. Don&apos;t see your game?
                Request a custom order.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Different colours, new games, or bulk orders — just ask via
                WhatsApp.
              </p>
            </div>
            <button
              onClick={openRequest}
              className="relative flex-shrink-0 group overflow-hidden rounded-xl smooth-transition"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 group-hover:from-emerald-400 group-hover:via-teal-400 group-hover:to-cyan-400 smooth-transition" />
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 smooth-transition" />
              <span className="relative flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white">
                <MessageCircle size={18} strokeWidth={2} />
                Make a Request
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="relative overflow-hidden py-14 sm:py-20">
          <div
            className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-background to-cyan-500/5"
            aria-hidden
          />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"
            aria-hidden
          />
          <div className="relative section-padding">
            <div className="page-container">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 text-2xs font-semibold uppercase tracking-widest border border-teal-500/25 mb-3">
                    Just landed
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
                    New Arrivals
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-md">
                  The latest inserts and accessories, fresh from the workshop.
                  First to see them, first to organize.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
                {newArrivals.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    outOfStock={product.outOfStock}
                  />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-500/20 smooth-transition"
                >
                  View all products
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="section-padding relative py-14 sm:py-20">
        <div className="page-container relative">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-2xs font-semibold uppercase tracking-widest border border-primary/20 mb-3">
              For every game
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Inserts, upgrades, dice towers, travel boxes, and more — find what
              fits your collection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                image={category.image}
                defaultImage={category.defaultImage}
                productCount={category.productCount}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="relative py-14 sm:py-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-secondary/30 to-orange-500/5"
            aria-hidden
          />
          <div className="relative page-container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-2xs font-semibold uppercase tracking-widest border border-amber-500/25 mb-3">
                  Bestsellers
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
                  Featured Products
                </h2>
                <p className="text-muted-foreground">
                  Top picks from fellow board gamers — inserts and accessories
                  that make game night smoother.
                </p>
              </div>
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 smooth-transition shrink-0"
              >
                View all
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  outOfStock={product.outOfStock}
                />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 smooth-transition"
              >
                View all products
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="section-padding relative py-14 sm:py-20">
        <div className="page-container max-w-2xl relative">
          <div className="rounded-2xl border border-border/60 bg-card/80 p-6 sm:p-8 shadow-card">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}
