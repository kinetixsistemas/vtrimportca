import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "light" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      aria-label="VTR Import C.A. — Ir al inicio"
      className={cn(
        "group inline-flex items-center gap-3 focus-visible:outline-offset-4",
        className,
      )}
    >
      <span className="clip-corner-sm relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden bg-vtr-green">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1.5 bg-vtr-amber"
        />
        <span className="font-display text-lg font-extrabold italic leading-none text-white">
          VTR
        </span>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-2xl font-extrabold italic tracking-tight",
            isLight ? "text-white" : "text-vtr-black",
          )}
        >
          VTR{" "}
          <span className={isLight ? "text-vtr-green-light" : "text-vtr-green"}>
            IMPORT
          </span>
        </span>
        <span
          className={cn(
            "mt-1 block text-[9px] font-semibold uppercase tracking-[0.32em]",
            isLight ? "text-white/55" : "text-vtr-black/55",
          )}
        >
          C.A. · Mayorista
        </span>
      </span>
    </Link>
  );
}
