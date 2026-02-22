import type { Metadata } from "next";
import { categories, getCategoryById } from "@/app/assets/data";
import CategoryClient from "./category-client";

export async function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const title = category.name;
  const description = category.description;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://tabletopreboxing.shop/category/${id}`,
    },
  };
}

export default function CategoryPage() {
  return <CategoryClient />;
}
