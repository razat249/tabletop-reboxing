import type { Metadata } from "next";
import { products, getProductById } from "@/app/assets/data";
import ProductClient from "./product-client";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = product.name;
  const description = product.description;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://tabletopreboxing.shop/products/${id}`,
      ...(product.image && {
        images: [{ url: product.image, alt: product.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(product.image && { images: [product.image] }),
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ProductClient params={params} />;
}
