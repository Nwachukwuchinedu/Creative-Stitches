
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateItemQuantity, subtotal } = useCart();
  const shipping = items.length > 0 ? 25.00 : 0;
  const total = subtotal + shipping;

  const getItemId = (item: {id: string, size?: string}) => `${item.id}-${item.size}`;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
          Shopping Cart
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul role="list" className="divide-y divide-border">
              {items.map((item) => (
                <li key={getItemId(item)} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={96}
                      height={96}
                      data-ai-hint={item.imageHint}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-foreground">
                        <h3>
                          <Link href={`/products/${item.slug}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                       <p className="mt-1 text-sm text-muted-foreground">{item.category} {item.size && `- Size: ${item.size}`}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`quantity-${getItemId(item)}`} className="sr-only">Quantity</label>
                        <Input
                          id={`quantity-${getItemId(item)}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(getItemId(item), parseInt(e.target.value))}
                          className="w-16 h-8"
                        />
                      </div>
                      <div className="flex">
                        <Button
                          variant="ghost"
                          type="button"
                          onClick={() => removeItem(getItemId(item))}
                          className="font-medium text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4 mr-1"/>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
            <div className="mt-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-foreground font-medium">${shipping.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-medium text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button asChild size="lg" className="w-full mt-6 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
