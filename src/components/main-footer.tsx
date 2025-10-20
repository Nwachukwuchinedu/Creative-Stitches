
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";

const MainFooter = () => {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Bespoke Nigerian fashion, crafted with passion.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Women</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Men</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">About Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#"><Facebook className="h-5 w-5 text-muted-foreground" /></Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#"><Twitter className="h-5 w-5 text-muted-foreground" /></Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#"><Instagram className="h-5 w-5 text-muted-foreground" /></Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Creative Stitches & Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
