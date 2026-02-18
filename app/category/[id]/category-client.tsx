"use client";

import { useParams } from "next/navigation";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  categories as allCategories,
  products as allProducts,
  getCategoryById,
  getProductsByCategory,
} from "@/app/assets/data";

export default function CategoryClient() {
  const params = useParams();
  const categoryId = params.id as string;

  const category = getCategoryById(categoryId);
  const categoryProducts = category
    ? getProductsByCategory(category.name)
    : [];

  if (!category) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground mb-3">
            Category Not Found
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="text-sm text-primary hover:text-primary/80 font-medium smooth-transition"
          >
            Back to Products
          </Link>
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
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <section className="section-padding-sm bg-gradient-to-b from-secondary/40 to-background">
        <div className="page-container">
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
            {category.name}
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="page-container">
          {categoryProducts.length > 0 ? (
            <>
              <p className="text-xs text-muted-foreground mb-6">
                {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
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
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-sm text-muted-foreground mb-4">
                No products found in this category yet.
              </p>
              <Link
                href="/products"
                className="text-sm text-primary hover:text-primary/80 font-medium smooth-transition"
              >
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
