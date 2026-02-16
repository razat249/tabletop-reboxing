"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import SearchBox, { type SearchSuggestion } from "@/components/search-box";

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();
  const [products, setProducts] = useState<SearchSuggestion[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/60">
      <div className="page-container">
        <div className="flex items-center justify-between h-16 md:h-[4.25rem] gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Tabletop Re-Boxing"
              width={36}
              height={36}
              className="group-hover:scale-105 smooth-transition"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-bold text-sm tracking-tight text-foreground">
                Tabletop
              </span>
              <span className="text-[0.65rem] font-medium tracking-wider uppercase text-primary">
                Re-Boxing
              </span>
            </div>
          </Link>

          {/* Center Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBox
              onSearch={handleSearch}
              suggestions={products}
              placeholder="Search products..."
              compact
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 mr-1">
              <Link
                href="/"
                className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary smooth-transition font-medium"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary smooth-transition font-medium"
              >
                Products
              </Link>
            </nav>

            <button
              onClick={onCartClick}
              className="relative p-2.5 hover:bg-secondary rounded-lg smooth-transition text-muted-foreground hover:text-foreground"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-2xs font-semibold w-[1.125rem] h-[1.125rem] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 hover:bg-secondary rounded-lg smooth-transition text-muted-foreground hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={20} strokeWidth={1.75} />
              ) : (
                <Menu size={20} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border/60 pt-3 space-y-2">
            {/* Mobile Search */}
            <div className="px-1 pb-2">
              <SearchBox
                onSearch={(query) => {
                  handleSearch(query);
                  setIsMobileMenuOpen(false);
                }}
                suggestions={products}
                placeholder="Search products..."
                compact
              />
            </div>
            <Link
              href="/"
              className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg smooth-transition font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg smooth-transition font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
