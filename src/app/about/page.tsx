
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Target, HandHeart, Scissors } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative mb-24 overflow-hidden rounded-lg bg-cover bg-center p-8 text-center" style={{ backgroundImage: "url('https://picsum.photos/seed/aboutbg/1200/400')" }}>
           <div className="absolute inset-0 bg-black/50" />
           <div className="relative z-10">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-headline">
                    Our Story
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-200">
                    Weaving tradition with contemporary style, one stitch at a time.
                </p>
           </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline">Our Mission</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            At Creative Stitches & Services, our mission is to celebrate and elevate Nigerian fashion by creating bespoke pieces that honor our rich cultural heritage while embracing modern design. We are dedicated to exceptional craftsmanship, quality, and empowering our clients to express their unique identity through style.
          </p>
        </section>
        
        <section className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <PenTool className="h-6 w-6 text-primary"/>
                </div>
                <CardTitle className="mt-4">Craftsmanship</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Every piece is meticulously crafted by skilled artisans with an unwavering attention to detail.</p>
            </CardContent>
          </Card>
           <Card className="text-center">
            <CardHeader>
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-6 w-6 text-primary"/>
                </div>
                <CardTitle className="mt-4">Quality</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">We source the finest fabrics and materials to ensure longevity and a luxurious feel.</p>
            </CardContent>
          </Card>
           <Card className="text-center">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <HandHeart className="h-6 w-6 text-primary"/>
                </div>
                <CardTitle className="mt-4">Heritage</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Our designs are inspired by the rich tapestry of Nigerian culture and traditions.</p>
            </CardContent>
          </Card>
        </section>

        {/* Meet the Founder Section */}
        <section className="mb-24 rounded-lg bg-muted/40 p-8 md:p-12">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 items-center">
                <div className="md:col-span-1">
                    <Image
                        src="https://picsum.photos/seed/founder/400/500"
                        alt="Founder"
                        width={400}
                        height={500}
                        data-ai-hint="woman portrait"
                        className="rounded-lg object-cover shadow-lg"
                    />
                </div>
                <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold tracking-tight font-headline">Meet Our Founder</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Funmilayo Adebayo, the creative force behind Creative Stitches & Services, started her journey with a simple sewing machine and a passion for her heritage. Her vision was to create a fashion brand that was both deeply rooted in Nigerian culture and accessible to a global audience. Today, her dedication to quality and design continues to inspire every piece we create.
                    </p>
                    <p className="mt-4 text-lg text-muted-foreground">
                        "Fashion is more than just clothing; it's a form of storytelling. I wanted to tell the story of our culture, our people, and our artistry through my designs."
                    </p>
                    <p className="mt-2 font-semibold text-primary">- Funmilayo Adebayo</p>
                </div>
            </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
             <Scissors className="h-12 w-12 mx-auto text-accent mb-4"/>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Join Our Fashion Journey</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Explore our collections and find the perfect piece that tells your story.
            </p>
            <div className="mt-8">
                <Button size="lg" asChild>
                    <Link href="/">Shop Now</Link>
                </Button>
            </div>
        </section>
      </div>
    </div>
  );
}
