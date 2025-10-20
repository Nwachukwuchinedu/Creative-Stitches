
"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    removeItem(product.id); // Remove from wishlist after adding to cart
    toast({
      title: "Added to Cart",
      description: `${product.name} has been moved to your cart.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>Your favorite items, all in one place.</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-24 w-24 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your wishlist yet.</p>
            <Button asChild className="mt-6">
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {items.map((product) => (
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
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex-col items-start">
                    <p className="text-lg font-semibold text-primary">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="w-full flex gap-2 mt-4">
                      <Button size="sm" className="w-full" onClick={() => handleAddToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => removeItem(product.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {items.length > 0 && (
                <>
                    <Separator className="my-12" />
                    <div className="text-center">
                        <Button variant="destructive" onClick={clearWishlist}>
                            Clear Wishlist
                        </Button>
                    </div>
                </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
