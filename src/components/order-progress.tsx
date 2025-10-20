
"use client";

import { cn } from "@/lib/utils";
import { Check, Loader, Package, Truck } from 'lucide-react';

const statuses = [
  { id: 'Pending', label: 'Order Placed', icon: Check },
  { id: 'Processing', label: 'Processing', icon: Loader },
  { id: 'Shipped', label: 'Shipped', icon: Truck },
  { id: 'Delivered', label: 'Delivered', icon: Package },
];

export function OrderProgress({ status }: { status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' }) {
    if (status === 'Cancelled') {
        return <div className="text-center text-destructive">This order has been cancelled.</div>
    }

  const currentStatusIndex = statuses.findIndex(s => s.id === status);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {statuses.map((s, index) => (
          <div key={s.id} className="flex-1 flex flex-col items-center text-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                index <= currentStatusIndex ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground"
              )}
            >
              <s.icon className={cn("w-5 h-5", s.id === "Processing" && index <= currentStatusIndex ? 'animate-spin' : '')} />
            </div>
            <p className={cn(
                "mt-2 text-xs sm:text-sm font-medium",
                index <= currentStatusIndex ? "text-primary" : "text-muted-foreground"
            )}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-2 px-5 sm:px-10">
        {statuses.slice(0, -1).map((_, index) => (
            <div key={`line-${index}`} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{
                background: index < currentStatusIndex ? 'hsl(var(--primary))' : 'hsl(var(--border))'
            }}
            />
        ))}
      </div>
    </div>
  );
}

    