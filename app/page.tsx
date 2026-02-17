"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SearchBox, { type SearchSuggestion } from "@/components/search-box";
import CategoryCard from "@/components/category-card";
import ProductCard from "@/components/product-card";
import NewsletterSignup from "@/components/newsletter-signup";
import { ArrowRight } from "lucide-react";
import { products, categories, getFeaturedProducts } from "@/app/assets/data";
import { heroBackdrop, logo } from "@/app/assets/images";

const allProducts: SearchSuggestion[] = products;
const featuredProducts = getFeaturedProducts();

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="section-padding">
          <div className="page-container max-w-3xl text-center">
            <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">
              Premium Board Game Accessories
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground mb-5 text-balance">
              Elevate Your{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Board Game
              </span>{" "}
              Collection
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto text-balance leading-relaxed">
              Custom inserts, board game upgrades, and replacement pieces designed
              and printed for modern board games.
            </p>
            <div className="max-w-xl mx-auto pb-4">
              <SearchBox
                onSearch={handleSearch}
                suggestions={allProducts}
                placeholder="Search for game inserts, tokens, or pieces..."
                variant="hero"
              />
            </div>
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

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 relative">
        <div className="page-container section-padding-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src={logo}
                  alt="Tabletop Re-Boxing"
                  width={32}
                  height={32}
                />
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-sm tracking-tight text-foreground">
                    Tabletop
                  </span>
                  <span className="text-[0.6rem] font-medium tracking-wider uppercase text-primary">
                    Re-Boxing
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium board game inserts, board game upgrades, and replacement
                pieces. Designed with care, crafted with precision.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/products"
                    className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h4>
              <p className="text-sm text-muted-foreground">
                <a
                  href="mailto:razat249@gmail.com"
                  className="hover:text-foreground smooth-transition"
                >
                  razat249@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Tabletop Re-Boxing. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
