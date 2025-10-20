
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { orders } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrderProgress } from '@/components/order-progress';
import { Package, Calendar, User, Mail, DollarSign } from 'lucide-react';

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const order = orders.find(o => o.id.toLowerCase() === params.id.toLowerCase());

  if (!order) {
    notFound();
  }
  
  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 25.00; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="bg-muted/20">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Order Tracking
                </h1>
                <p className="mt-4 text-xl text-muted-foreground">
                Thank you for your order! Here's the current status.
                </p>
            </div>

            <Card className="max-w-4xl mx-auto shadow-lg">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                <Package className="w-6 h-6 text-primary" />
                                Order #{order.id}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-2">
                                <Calendar className="w-4 h-4"/>
                                Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </CardDescription>
                        </div>
                        <div className="text-right">
                             <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-bold text-primary text-lg">{order.status}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="my-8">
                       <OrderProgress status={order.status} />
                    </div>

                    <Separator className="my-8"/>

                    <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                    <ul role="list" className="divide-y divide-border">
                        {order.items.map(item => (
                            <li key={item.productId} className="flex py-4">
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div className="flex justify-between text-base font-medium text-foreground">
                                        <h3>{item.productName}</h3>
                                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <Separator className="my-6"/>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                             <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
                             <div className="space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-2"><User className="w-4 h-4 text-primary"/> {order.customerName}</p>
                                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary"/> {order.customerEmail}</p>
                             </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                                <Separator className="my-2"/>
                                <div className="flex justify-between text-base font-medium text-foreground"><span>Total</span><span>${total.toFixed(2)}</span></div>
                             </div>
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="text-center text-muted-foreground text-sm">
                    <p>If you have any questions about your order, please contact our support team.</p>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}

    