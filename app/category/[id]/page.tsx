import { readFileSync } from "fs";
import { join } from "path";
import CategoryClient from "./category-client";

export async function generateStaticParams() {
  const categories = JSON.parse(
    readFileSync(join(process.cwd(), "public/data/categories.json"), "utf-8")
  );
  return categories.map((c: { id: string }) => ({ id: c.id }));
}

export default function CategoryPage() {
  return <CategoryClient />;
}
