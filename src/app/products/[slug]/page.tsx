import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetailClient } from "@/components/product-detail-client";
import type { Product } from "@/lib/types";

// Add generateMetadata function for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

// Add generateStaticParams function for static generation
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product as Product} />;
}