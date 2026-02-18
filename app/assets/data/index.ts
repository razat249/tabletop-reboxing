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
  hidden: boolean;
  outOfStock: boolean;
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
const allProducts: Product[] = (
  productsData as Omit<Product, "image" | "images">[]
).map((p) => {
  const imgs = productImages[p.id] || [];
  return {
    ...p,
    image: imgs[0]?.src || "",
    images: imgs.map((img) => img.src),
  };
});

/** Visible products (hidden = false). Used for listings, search, and featured. */
export const products: Product[] = allProducts.filter((p) => !p.hidden);

// Compute productCount from visible products only
export const categories: Category[] = (categoriesData as Category[]).map(
  (cat) => ({
    ...cat,
    productCount: products.filter((p) => p.category === cat.name).length,
  })
);

/** Find product by ID — includes hidden products so direct URLs still work. */
export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
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
