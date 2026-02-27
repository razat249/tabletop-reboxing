import type { Metadata } from "next";
import { products, getProductById, config } from "@/app/assets/data";
import ProductClient from "./product-client";

const BASE_URL = "https://tabletopreboxing.shop";

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
  const url = `${BASE_URL}/products/${id}`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      ...(product.image && {
        images: [{ url: product.image.startsWith("/") ? `${BASE_URL}${product.image}` : product.image, alt: product.name }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(product.image && { images: [product.image.startsWith("/") ? `${BASE_URL}${product.image}` : product.image] }),
    },
  };
}

function buildProductSchema(
  product: ReturnType<typeof getProductById>,
  id: string
) {
  if (!product) return null;
  const imageUrl = product.image?.startsWith("/") ? `${BASE_URL}${product.image}` : product.image;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(imageUrl && { image: imageUrl }),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: config.currency,
      availability: product.outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: `${BASE_URL}/products/${id}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  const productSchema = buildProductSchema(product ?? undefined, id);

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductClient params={params} />
    </>
  );
}
