
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import { categories } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";

export default function CategoryCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Our Categories</h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="pl-4 basis-4/5 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Link href={`/products?category=${category.id}`} className="group">
                    <Card className="overflow-hidden">
                        <CardContent className="relative aspect-square flex items-center justify-center p-0">
                            <Image
                                src={category.imageUrl}
                                alt={category.name}
                                fill
                                data-ai-hint={category.imageHint}
                                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <h3 className="relative text-2xl font-bold text-white z-10">
                                {category.name}
                            </h3>
                        </CardContent>
                    </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
