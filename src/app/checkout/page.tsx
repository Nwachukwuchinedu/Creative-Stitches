
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  shippingAddress: z.string().min(10),
  city: z.string().min(2),
  country: z.string().min(2),
  paymentMethod: z.enum(["card", "paypal", "bank_transfer"]),
});


export default function CheckoutPage() {
  const { items: cartItems, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const shipping = cartItems.length > 0 ? 25.00 : 0;
  const total = subtotal + shipping;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      shippingAddress: "",
      city: "",
      country: "",
      paymentMethod: "card",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle checkout logic
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
    
    // In a real app, you would get a real order ID from your backend
    const mockOrderId = "ORD-001";
    
    clearCart();
    
    // Redirect to an order confirmation page
    router.push(`/orders/${mockOrderId}`);
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
          Checkout
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
        <div className="lg:order-last">
          <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
          <div className="mt-4 rounded-lg border bg-card p-6 shadow-sm">
            <ul role="list" className="divide-y divide-border">
                {cartItems.map(product => (
                    <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image src={product.imageUrl} alt={product.name} width={96} height={96} data-ai-hint={product.imageHint} className="h-full w-full object-cover object-center"/>
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-foreground">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-muted-foreground">Qty {product.quantity}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <Separator className="my-6"/>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-foreground font-medium">${shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-2"/>
              <div className="flex justify-between text-base font-medium text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Contact & Shipping</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Fashion Ave" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                        <Input placeholder="Lagos" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                        <Input placeholder="Nigeria" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>

              <Separator className="my-8"/>

              <h2 className="text-xl font-semibold text-foreground">Payment</h2>
               <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>Select Payment Method</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                            <RadioGroupItem value="card" />
                            </FormControl>
                            <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                            <RadioGroupItem value="paypal" />
                            </FormControl>
                            <FormLabel className="font-normal">PayPal</FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                            <RadioGroupItem value="bank_transfer" />
                            </FormControl>
                            <FormLabel className="font-normal">Bank Transfer</FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              <Button type="submit" size="lg" className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={cartItems.length === 0}>Pay ${total.toFixed(2)}</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

    