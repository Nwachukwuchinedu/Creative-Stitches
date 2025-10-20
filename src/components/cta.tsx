import Link from "next/link";
import { Button } from "./ui/button";

export default function CallToAction() {
  return (
    <section className="my-16">
        <div className="relative overflow-hidden rounded-lg bg-accent/10 px-6 py-16 text-center shadow-lg">
            <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
                    Have a unique design in mind?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Let us bring your vision to life. From bespoke gowns to tailored suits, your masterpiece awaits.
                </p>
                <Button size="lg" asChild className="mt-8 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/custom-order">Request a Custom Order</Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
