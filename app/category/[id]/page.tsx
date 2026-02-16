import { categories } from "@/app/assets/data";
import CategoryClient from "./category-client";

export async function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export default function CategoryPage() {
  return <CategoryClient />;
}
