import { products } from "@/lib/data";
import ProductsPageClient from "./page.client";
import { Suspense } from 'react';

// Add metadata for SEO
export const metadata = {
  title: 'Products - Creative Stitches',
  description: 'Browse our collection of unique African fashion pieces',
};

// Add static generation config
export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

// Add generateStaticParams function for static generation
export async function generateStaticParams() {
  // Generate static pages for all categories
  const categories = [...new Set(products.map(p => p.category))];
  return categories.map(category => ({
    category,
  }));
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageClient />
    </Suspense>
  );
}