
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ProductQuickView } from '@/components/product-quick-view';
import type { Product } from '@/lib/types';

export default function ProductsPage() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    // Initialize from URL param if available
    if (typeof window !== 'undefined') {
      const initialCategory = searchParams?.get('category');
      return initialCategory ? [initialCategory] : [];
    }
    return [];
  });
  const [sortOption, setSortOption] = useState("popularity");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && searchParams) {
      const initialCategory = searchParams.get('category');
      if (initialCategory) {
        setSelectedCategories([initialCategory]);
      }
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategories.length > 0
      ? products.filter(p => selectedCategories.includes(p.category))
      : products;

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popularity':
        default:
          return b.stock - a.stock; // Example popularity sort
      }
    });
  }, [selectedCategories, sortOption]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="py-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
              Shop Our Collection
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Find the perfect piece that speaks to you.
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-1/4 lg:w-1/5">
              <div className="sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <h3 className="font-semibold mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={category.id} className="font-normal cursor-pointer">{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="w-full md:w-3/4 lg:w-4/5">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-8">
                <p className="text-sm text-muted-foreground">{filteredAndSortedProducts.length} products found</p>
                <div className="flex items-center space-x-4">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px] rounded-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Sort by Popularity</SelectItem>
                      <SelectItem value="price-asc">Sort by Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Sort by Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                {filteredAndSortedProducts.map((product) => (
                  <Card key={product.id} className="group relative flex h-full flex-col overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
                    <CardHeader className="p-0">
                      <div className="aspect-h-4 aspect-w-3 overflow-hidden">
                        <Link href={`/products/${product.slug}`} className="block h-full w-full">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={600}
                            height={800}
                            data-ai-hint={product.imageHint}
                            className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                          />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-4">
                      <h3 className="text-lg font-medium text-foreground">
                        <Link href={`/products/${product.slug}`}>{product.name}</Link>
                      </h3>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-accent" fill="currentColor"/>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <p className="text-lg font-semibold text-primary">
                        ${product.price.toFixed(2)}
                      </p>
                    </CardFooter>
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="outline" className="rounded-full bg-background/80 backdrop-blur-sm" onClick={() => setSelectedProduct(product)}>
                          <Eye className="h-5 w-5" />
                          <span className="sr-only">Quick View</span>
                        </Button>
                        <Button size="icon" className="rounded-full" onClick={() => handleAddToCart(product)}>
                          <ShoppingCart className="h-5 w-5" />
                          <span className="sr-only">Add to cart</span>
                        </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductQuickView 
          product={selectedProduct} 
          open={!!selectedProduct} 
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedProduct(null);
            }
          }}
        />
      )}
    </>
  );
}
