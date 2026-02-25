"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchBox from "@/components/search-box";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { ChevronRight, ArrowUpDown, Check, LayoutGrid, List } from "lucide-react";
import { products as allProducts, config } from "@/app/assets/data";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>(config.defaultSort);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sortOptions = [
    { id: "newest", label: "Newest", shortLabel: "Newest" },
    { id: "featured", label: "Featured First", shortLabel: "Featured" },
    { id: "price-asc", label: "Price: Low to High", shortLabel: "Price ↑" },
    { id: "price-desc", label: "Price: High to Low", shortLabel: "Price ↓" },
    { id: "name-asc", label: "Name: A to Z", shortLabel: "A → Z" },
    { id: "name-desc", label: "Name: Z to A", shortLabel: "Z → A" },
  ];

  const categoryFilter = searchParams.get("category") || "";
  const searchFilter = searchParams.get("search") || "";

  useEffect(() => {
    let filtered = allProducts;

    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
      filtered = filtered.filter(
        (p) =>
          p.category.toLowerCase().replace(/\s+/g, "-") ===
          categoryFilter.toLowerCase()
      );
    }

    if (searchFilter) {
      setSearchQuery(searchFilter);
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          p.category.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return allProducts.indexOf(b) - allProducts.indexOf(a);
        case "featured":
          if (a.featured === b.featured) return 0;
          return a.featured ? -1 : 1;
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(sorted);
  }, [categoryFilter, searchFilter, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (categoryFilter) params.set("category", categoryFilter);
    window.history.replaceState(null, "", `/products?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (searchQuery) params.set("search", searchQuery);
    window.history.replaceState(null, "", `/products?${params.toString()}`);
  };

  const categories = [
    { id: "board-game-inserts", name: "Board Game Inserts" },
    { id: "board-game-upgrades", name: "Board Game Upgrades" },
    { id: "other-accessories", name: "Other Accessories" },
  ];

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
            <span className="text-foreground font-medium">Products</span>
          </nav>
        </div>
      </div>

      <div className="py-4 sm:section-padding relative">
        <div className="page-container relative">
          {/* Header — compact on mobile */}
          <div className="mb-4 sm:mb-10">
            <h1 className="font-serif text-2xl sm:text-4xl text-foreground mb-1 sm:mb-2">
              All Products
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm hidden sm:block">
              Explore our collection of premium board game components.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
            {/* Filters Sidebar — desktop only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-card border border-border/60 rounded-xl p-5 sticky top-20 shadow-card">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 font-sans">
                  Categories
                </h3>
                <div className="space-y-0.5">
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm smooth-transition ${
                      !selectedCategory
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm smooth-transition ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search */}
              <div className="mb-3 sm:mb-6">
                <SearchBox
                  onSearch={handleSearch}
                  onChange={handleSearch}
                  placeholder="Search products..."
                />
              </div>

              {/* Mobile: Filters + Sort + View — single compact bar */}
              <div className="lg:hidden flex items-center gap-2 mb-3">
                <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium smooth-transition ${
                      !selectedCategory
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium smooth-transition ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort & Results Count Bar */}
              <div className="flex items-center justify-between mb-3 sm:mb-5">
                <p className="text-xs text-muted-foreground">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                </p>

                <div className="flex items-center gap-1.5 sm:gap-2">
                {/* View Toggle — mobile only */}
                <div className="flex sm:hidden border border-border/60 rounded-lg overflow-hidden shadow-card">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 smooth-transition ${
                      viewMode === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={13} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 smooth-transition ${
                      viewMode === "list"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label="List view"
                  >
                    <List size={13} strokeWidth={2} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    onBlur={() => setTimeout(() => setIsSortOpen(false), 150)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground bg-card border border-border/60 rounded-lg hover:bg-secondary smooth-transition shadow-card"
                  >
                    <ArrowUpDown size={13} strokeWidth={1.75} className="flex-shrink-0 sm:[&]:w-3.5 sm:[&]:h-3.5" />
                    <span className="font-medium sm:hidden">
                      {sortOptions.find((o) => o.id === sortBy)?.shortLabel}
                    </span>
                    <span className="font-medium hidden sm:inline">
                      {sortOptions.find((o) => o.id === sortBy)?.label}
                    </span>
                  </button>

                  {isSortOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-52 bg-card border border-border/60 rounded-xl shadow-lg z-20 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id);
                            setIsSortOpen(false);
                          }}
                          className={`flex items-center justify-between w-full px-3.5 py-2 text-sm smooth-transition ${
                            sortBy === option.id
                              ? "text-primary font-medium bg-primary/5"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}
                        >
                          {option.label}
                          {sortBy === option.id && (
                            <Check size={14} strokeWidth={2} className="text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                </div>
              </div>

              {/* Results */}
              {filteredProducts.length > 0 ? (
                <div>
                  <div className={
                    viewMode === "list"
                      ? "flex flex-col gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:gap-5"
                      : "grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5"
                  }>
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        category={product.category}
                        outOfStock={product.outOfStock}
                        variant={viewMode === "list" ? "list" : "grid"}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-sm mb-4">
                    No products found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      handleCategoryChange("");
                      handleSearch("");
                    }}
                    className="text-primary hover:text-primary/80 text-sm font-medium smooth-transition"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
