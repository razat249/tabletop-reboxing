"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SearchBox, { type SearchSuggestion } from "@/components/search-box";
import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import NewsletterSignup from "@/components/newsletter-signup";
import { ArrowRight, MessageCircle } from "lucide-react";
import { products, categories, getFeaturedProducts } from "@/app/assets/data";
import { useRequest } from "@/lib/request-context";

const allProducts: SearchSuggestion[] = products;
const featuredProducts = getFeaturedProducts();

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
      <section className="relative">
        <div className="py-10 md:py-14 px-4 sm:px-6 lg:px-8">
          <div className="page-container max-w-3xl text-center">
            <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
              Premium Board Game Accessories
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-4 text-balance">
              Elevate Your{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Board Game
              </span>{" "}
              Collection
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto text-balance leading-relaxed">
              Custom inserts, board game upgrades, and accessories designed
              and printed for modern board games.
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBox
                onSearch={handleSearch}
                suggestions={allProducts}
                placeholder="Search for game inserts, tokens, or pieces..."
                variant="hero"
              />
              <div className="mt-4 flex items-center justify-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 smooth-transition group"
                >
                  Browse all products
                  <ArrowRight size={14} strokeWidth={2} className="group-hover:translate-x-0.5 smooth-transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Request Box */}
      <section className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="page-container max-w-4xl">
          <div className="bg-card border border-border/60 rounded-xl shadow-card p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            {/* SVG Illustration */}
            <div className="flex-shrink-0">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <rect x="8" y="16" width="44" height="48" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <rect x="16" y="8" width="44" height="48" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                <rect x="24" y="24" width="44" height="48" rx="4" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="2" />
                <path d="M36 44L42 38L54 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                <circle cx="40" cy="36" r="3" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                <path d="M32 60H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <path d="M32 56H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
              </svg>
            </div>

            {/* Text */}
            <div className="text-center sm:text-left flex-1">
              <p className="text-sm text-foreground leading-relaxed mb-1">
                Hi, I&apos;m <span className="font-semibold">Rajat</span> — I handcraft every insert and accessory with care, one piece at a time. If you don&apos;t see what you need, just ask.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Custom orders, special colors, or a game not listed — I&apos;m happy to help.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={openRequest}
              className="relative flex-shrink-0 group overflow-hidden rounded-xl smooth-transition"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-90 group-hover:opacity-100 smooth-transition" />
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-40 blur-md smooth-transition" />
              <span className="relative flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white">
                <MessageCircle size={16} strokeWidth={2} className="group-hover:rotate-12 smooth-transition" />
                Make a Request
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding relative">
        <div className="page-container relative">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Browse our curated selection of 3D printed board game accessories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <section className="section-padding bg-secondary/30 relative">
          <div className="page-container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
                  Featured Products
                </h2>
                <p className="text-muted-foreground">
                  Our most popular items, hand-picked for you.
                </p>
              </div>
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 smooth-transition"
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
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 smooth-transition"
              >
                View all products
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="section-padding relative">
        <div className="page-container max-w-2xl relative">
          <NewsletterSignup />
        </div>
      </section>

    </div>
  );
}
