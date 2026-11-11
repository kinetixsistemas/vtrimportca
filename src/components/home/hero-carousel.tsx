"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type HeroSlide = {
  src: string;
  alt: string;
  href: string;
  label: string;
  title: string;
};

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [paused, slides.length]);

  const active = slides[index] ?? slides[0];

  function goTo(nextIndex: number) {
    setIndex((nextIndex + slides.length) % slides.length);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="clip-corner relative aspect-[4/5] overflow-hidden border border-white/10 bg-vtr-black">
        {slides.map((slide, slideIndex) => (
          <Link
            key={slide.src}
            href={slide.href}
            aria-hidden={slideIndex !== index}
            tabIndex={slideIndex === index ? 0 : -1}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              slideIndex === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </Link>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vtr-black via-vtr-black/10 to-transparent" />

        <div className="absolute right-3 top-3 flex gap-1.5">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Imagen anterior"
            className="grid h-9 w-9 place-items-center border border-white/20 bg-vtr-black/60 text-white backdrop-blur transition-colors hover:border-vtr-amber hover:text-vtr-amber"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Imagen siguiente"
            className="grid h-9 w-9 place-items-center border border-white/20 bg-vtr-black/60 text-white backdrop-blur transition-colors hover:border-vtr-amber hover:text-vtr-amber"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-vtr-amber">
            {active.label}
          </p>
          <p className="mt-1 text-2xl leading-none text-white sm:text-3xl">
            {active.title}
          </p>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(slideIndex)}
            aria-label={`Ir a ${slide.title}`}
            aria-current={slideIndex === index}
            className={cn(
              "h-1.5 transition-all",
              slideIndex === index
                ? "w-8 bg-vtr-amber"
                : "w-3 bg-white/30 hover:bg-white/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
