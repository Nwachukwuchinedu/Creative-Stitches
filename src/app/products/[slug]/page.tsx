
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetailClient } from "@/components/product-detail-client";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
