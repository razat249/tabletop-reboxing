import productsData from "./products.json";
import categoriesData from "./categories.json";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images?: string[];
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

export const products: Product[] = productsData as Product[];
export const categories: Category[] = categoriesData as Category[];

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
