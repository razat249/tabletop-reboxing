import productsData from "./products.json";
import categoriesData from "./categories.json";
import productImages from "../images/product-images";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  featured: boolean;
  specs: {
    material?: string;
    [key: string]: string | undefined;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  defaultImage?: string;
  productCount: number;
  icon: string;
}

/**
 * Enrich products with images discovered from app/assets/images/.
 * Convention: [product_id]_1.ext is the primary image, _2, _3, etc. are gallery images.
 * Images are webpack-imported so they get hashed URLs that work with basePath on GitHub Pages.
 * If no images exist, components fall back to category default images.
 */
export const products: Product[] = (
  productsData as Omit<Product, "image" | "images">[]
).map((p) => {
  const imgs = productImages[p.id] || [];
  return {
    ...p,
    image: imgs[0]?.src || "",
    images: imgs.map((img) => img.src),
  };
});

// Compute productCount from actual products data
export const categories: Category[] = (categoriesData as Category[]).map(
  (cat) => ({
    ...cat,
    productCount: products.filter((p) => p.category === cat.name).length,
  })
);

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter((p) => p.category === categoryName);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
