import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 flex items-center gap-3 text-m font-bold uppercase tracking-[0.24em]",
            align === "center" && "justify-center",
            tone === "light" ? "text-vtr-green" : "text-vtr-amber",
          )}
        >
          <span
            aria-hidden="true"
            className="h-0.5 w-8 bg-current"
          />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "text-4xl leading-[0.95] sm:text-5xl lg:text-6xl",
          tone === "light" ? "text-vtr-black" : "text-white",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-vtr-gray-dark" : "text-white/70",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
