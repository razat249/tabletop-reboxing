import productsData from "./products.json";
import categoriesData from "./categories.json";
import imageManifest from "./image-manifest.json";

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

const manifest = imageManifest as Record<string, string[]>;

/**
 * Enrich products with images discovered from public/images/.
 * Convention: [product_id]_1.ext is the primary image, _2, _3, etc. are gallery images.
 * If no images exist in the manifest, `image` and `images` remain empty strings/arrays
 * and the component-level fallback (category default) handles display.
 */
export const products: Product[] = (
  productsData as Omit<Product, "image" | "images">[]
).map((p) => {
  const discovered = manifest[p.id] || [];
  return {
    ...p,
    image: discovered[0] || "",
    images: discovered,
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
