
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingCart, Heart, User, LogIn } from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { useWishlist } from "@/hooks/use-wishlist";

const loggedOutNavLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

const loggedInNavLinks = [
    { href: "/products", label: "Shop" },
];

const NavLink = ({ href, label, icon: Icon }: { href: string; label: string, icon?: React.ElementType }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Link>
  );
};

const HeaderActions = () => {
    const { totalItems: totalCartItems } = useCart();
    const { items: wishlistItems } = useWishlist();
    const [isClient, setIsClient] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onLoginToggle = () => {
        // This is a placeholder for actual auth logic
    }

    if (!isClient) {
        return (
            <div className="flex items-center justify-end space-x-2 md:space-x-4">
                <div className="hidden lg:flex items-center space-x-2 h-10"></div>
                <div className="h-10 w-10"></div>
                <div className="h-10 w-10"></div>
                <div className="hidden lg:block h-10 w-[78px]"></div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-end space-x-2 md:space-x-4">
            <div className="hidden lg:flex items-center space-x-2">
                <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input 
                    placeholder="Search..." 
                    className="pl-9 w-40 focus:w-64 transition-all duration-300 ease-in-out" 
                />
                </div>
            </div>
            
            <Button variant="ghost" size="icon" asChild>
                <Link href="/account/wishlist" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistItems.length > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        {wishlistItems.length}
                    </span>
                    )}
                    <span className="sr-only">Wishlist</span>
                </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
                <Link href="/cart" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {totalCartItems > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        {totalCartItems}
                    </span>
                    )}
                    <span className="sr-only">Shopping Cart</span>
                </Link>
            </Button>
            
            {isLoggedIn ? (
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/account">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </Link>
                </Button>
            ) : (
                <Button onClick={onLoginToggle} asChild className="hidden lg:inline-flex">
                    <Link href="/login">
                        <LogIn className="mr-2 h-4 w-4" /> Login
                    </Link>
                </Button>
            )}
      </div>
    )
}


const MainHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navLinks = isLoggedIn ? loggedInNavLinks : loggedOutNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Nav */}
        <div className="flex w-full items-center justify-between lg:hidden">
             <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <Logo />
                <div className="mt-8 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                    <NavLink key={`mobile-${link.href}`} {...link} />
                    ))}
                    {!isLoggedIn && (
                        <NavLink href="/login" label="Login" icon={LogIn} />
                    )}
                </div>
                </SheetContent>
            </Sheet>

            <div className="flex justify-center flex-1">
                <Logo />
            </div>

            <div className="flex items-center">
                 <HeaderActions />
            </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden w-full items-center lg:flex">
             <Logo />
       
            <nav className="flex items-center space-x-6 ml-10">
            {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
            ))}
            </nav>
            
            <div className="flex-1">
                <HeaderActions />
            </div>
        </div>

      </div>
    </header>
  );
};

export default MainHeader;
