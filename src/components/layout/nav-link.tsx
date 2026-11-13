"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative inline-flex items-center py-2 text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
        isActive ? "text-vtr-amber" : "text-white/80 hover:text-white",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-vtr-amber transition-transform duration-300 group-hover:scale-x-100",
          isActive ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}
