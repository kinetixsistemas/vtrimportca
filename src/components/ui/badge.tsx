import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "green" | "amber" | "outline" | "dark" | "light";

const variants: Record<BadgeVariant, string> = {
  green: "bg-vtr-green text-white",
  amber: "bg-vtr-amber text-vtr-black",
  outline: "border border-vtr-black/20 text-vtr-black",
  dark: "bg-vtr-gray-dark text-white",
  light: "bg-white/10 text-white",
};

export function Badge({
  children,
  variant = "green",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "clip-corner-sm inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
