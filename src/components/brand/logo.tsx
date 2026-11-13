import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="VTR Import C.A. — Ir al inicio"
      className={cn(
        "group inline-flex items-center transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-offset-4",
        className,
      )}
    >
      <Image
        src="/images/logo-vtr.png"
        alt="VTR Import C.A."
        width={1774}
        height={887}
        className="h-10 w-auto sm:h-11"
      />
    </Link>
  );
}
