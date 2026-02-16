"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchBox from "@/components/search-box";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { ChevronRight, ArrowUpDown, Check } from "lucide-react";
import { products as allProducts } from "@/app/assets/data";

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { id: "featured", label: "Featured First" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "name-asc", label: "Name: A to Z" },
    { id: "name-desc", label: "Name: Z to A" },
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
    { id: "token-upgrades", name: "Token Upgrades" },
    { id: "replacement-pieces", name: "Replacement Pieces" },
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

      <div className="section-padding relative">
        <div className="page-container relative">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
              All Products
            </h1>
            <p className="text-muted-foreground text-sm">
              Explore our collection of premium board game components.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
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
              <div className="mb-6">
                <SearchBox
                  onSearch={handleSearch}
                  onChange={handleSearch}
                  placeholder="Search products..."
                />
              </div>

              {/* Sort & Results Count Bar */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-muted-foreground">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>

                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    onBlur={() => setTimeout(() => setIsSortOpen(false), 150)}
                    className="flex items-center gap-2 px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground bg-card border border-border/60 rounded-lg hover:bg-secondary smooth-transition shadow-card"
                  >
                    <ArrowUpDown size={14} strokeWidth={1.75} />
                    <span className="font-medium">
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

              {/* Results */}
              {filteredProducts.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredProducts.map((product) => (
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
