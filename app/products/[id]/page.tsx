import { readFileSync } from "fs";
import { join } from "path";
import ProductClient from "./product-client";

export async function generateStaticParams() {
  const products = JSON.parse(
    readFileSync(join(process.cwd(), "public/data/products.json"), "utf-8")
  );
  return products.map((p: { id: string }) => ({ id: p.id }));
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ProductClient params={params} />;
}
