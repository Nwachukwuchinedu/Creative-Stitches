import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    name: "Adebayo Alonge",
    quote: "The attention to detail on my Agbada was impeccable. I received so many compliments! Creative Stitches is my go-to for traditional wear.",
    rating: 5,
    avatar: "AA",
    imageUrl: "https://picsum.photos/seed/person1/100/100",
    imageHint: "man portrait",
  },
  {
    name: "Chiamaka Nwosu",
    quote: "I ordered a custom dress for a wedding, and it was everything I dreamed of. The fabric, the fit, the finish... simply perfect.",
    rating: 5,
    avatar: "CN",
    imageUrl: "https://picsum.photos/seed/person2/100/100",
    imageHint: "woman portrait",
  },
  {
    name: "Tariq Bello",
    quote: "From the consultation to the final fitting, the experience was seamless. True professionals who understand style.",
    rating: 5,
    avatar: "TB",
    imageUrl: "https://picsum.photos/seed/person3/100/100",
    imageHint: "man headshot",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          What Our Customers Are Saying
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We're proud to create pieces our clients love.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="flex flex-col justify-between">
            <CardContent className="p-6 text-center">
              <p className="mt-4 text-muted-foreground">"{testimonial.quote}"</p>
            </CardContent>
            <div className="border-t p-6 flex flex-col items-center text-center">
               <Avatar className="mb-4">
                <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                <AvatarFallback>{testimonial.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex items-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-accent" fill="currentColor" />
                ))}
              </div>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
