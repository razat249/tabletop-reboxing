import { products } from "@/app/assets/data";
import ProductClient from "./product-client";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ProductClient params={params} />;
}
