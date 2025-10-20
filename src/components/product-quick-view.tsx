
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";

export function ProductQuickView({ 
    product,
    open,
    onOpenChange
}: { 
    product: Product;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      action: (
        <Button variant="outline" size="sm" asChild>
          <Link href="/cart">View Cart</Link>
        </Button>
      ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-l-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={1000}
              data-ai-hint={product.imageHint}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col p-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
              {product.name}
            </h1>
            <p className="mt-2 text-2xl tracking-tight text-primary">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-4">
              <h3 className="sr-only">Description</h3>
              <p className="space-y-6 text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className="h-4 w-4 flex-shrink-0 text-accent"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-xs text-muted-foreground">42 Reviews</p>
              </div>
            </div>

            <div className="mt-6">
              <Button size="lg" className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
               <Button size="lg" variant="outline" className="w-full mt-2" asChild>
                <Link href={`/products/${product.slug}`}>View Full Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
