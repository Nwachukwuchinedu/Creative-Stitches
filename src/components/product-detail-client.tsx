
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Truck, ShoppingCart, Heart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { products } from "@/lib/data";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";

export function ProductDetailClient({ product }: { product: Product }) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isItemInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (product.category !== 'sewing-materials' && !selectedSize) {
      toast({
        variant: "destructive",
        title: "Please select a size",
        description: "You need to select a size before adding to cart.",
      });
      return;
    }
    addItem({ ...product, size: selectedSize || undefined });
    toast({
      title: "Added to Cart",
      description: `${product.name} ${selectedSize ? `(Size: ${selectedSize})` : ''} has been added to your cart.`,
      action: (
        <Button variant="outline" size="sm" asChild>
          <Link href="/cart">View Cart</Link>
        </Button>
      ),
    });
  };
  
  const handleWishlistToggle = () => {
    if (isItemInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const inWishlist = isItemInWishlist(product.id);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={1000}
              data-ai-hint={product.imageHint}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              {product.name}
            </h1>
            <p className="mt-4 text-3xl tracking-tight text-primary">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="space-y-6 text-base text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={`rating-${product.id}-${rating}`}
                      className="h-5 w-5 flex-shrink-0 text-accent"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-muted-foreground">42 Reviews</p>
              </div>
            </div>

            {product.category !== 'sewing-materials' && (
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">Size</h3>
                </div>

                <RadioGroup
                  value={selectedSize || ""}
                  onValueChange={setSelectedSize}
                  className="mt-4 grid grid-cols-5 gap-4"
                >
                  {sizes.map((size) => (
                    <Label
                      key={size}
                      htmlFor={`size-${size}`}
                      className={`flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-muted ${selectedSize === size ? 'ring-2 ring-primary' : ''}`}
                    >
                      <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                      {size}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}


            <div className="mt-10 flex gap-4">
              <Button size="lg" className="flex-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
               <Button size="icon" variant="outline" className="rounded-full" onClick={handleWishlistToggle}>
                  <Heart className={cn("h-5 w-5", inWishlist && "fill-destructive text-destructive")} />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
            </div>

            <div className="mt-8">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                        <AccordionContent>
                        Free shipping on orders over $150. Returns are accepted within 30 days of purchase. Custom orders are final sale.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Fabric & Care</AccordionTrigger>
                        <AccordionContent>
                        Made from 100% premium cotton. Machine wash cold, tumble dry low. Iron on low heat.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            
            <div className="mt-8 flex items-center text-sm text-muted-foreground">
                <Truck className="mr-2 h-5 w-5" />
                <span>Fast delivery available in Lagos and Abuja.</span>
            </div>

          </div>
        </div>
        
         <div className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`} className="group">
                <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
                  <CardHeader className="p-0">
                    <div className="aspect-h-4 aspect-w-3 overflow-hidden">
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        width={600}
                        height={800}
                        data-ai-hint={relatedProduct.imageHint}
                        className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4">
                    <h3 className="text-lg font-medium text-foreground">{relatedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">{relatedProduct.category}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <p className="text-lg font-semibold text-primary">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
