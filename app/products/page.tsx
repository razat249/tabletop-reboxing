import { Suspense } from "react";
import ProductsClient from "./products-client";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
