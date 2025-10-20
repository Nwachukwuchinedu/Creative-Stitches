import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import CategoryCarousel from "@/components/category-carousel";
import Testimonials from "@/components/testimonials";
import CallToAction from "@/components/cta";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <Image
          src="https://picsum.photos/seed/hero/1800/1200"
          alt="Hero background"
          fill
          data-ai-hint="fashion runway"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
            Elegance in Every Stitch
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-200">
            Discover bespoke Nigerian fashion that tells your story.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/products">Shop The Collection</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">Featured Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
                  <CardHeader className="p-0">
                    <div className="aspect-h-4 aspect-w-3 overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={600}
                        height={800}
                        data-ai-hint={product.imageHint}
                        className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4">
                    <h3 className="text-lg font-medium text-foreground">{product.name}</h3>
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
                </Card>
              </Link>
            ))}
          </div>
           <div className="mt-12 text-center">
                <Button size="lg" variant="outline" asChild>
                    <Link href="/products">View All Products</Link>
                </Button>
            </div>
        </div>
      </section>
      
      <CategoryCarousel />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Testimonials />
        <CallToAction />
      </div>

    </div>
  );
}
