import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-primary",
        className
      )}
    >
      <Image src="/logo.svg" alt="Creative Stitches & Services Logo" width={200} height={200}/>
    </Link>
  );
};

export default Logo;
