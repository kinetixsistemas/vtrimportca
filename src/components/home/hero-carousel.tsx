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

const AUTOPLAY_MS = 6000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setDirection("next");
      setHasChanged(true);
      setIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [paused, slides.length, index]);

  const active = slides[index] ?? slides[0];
  const counter = String(index + 1).padStart(2, "0");
  const total = String(slides.length).padStart(2, "0");

  function goTo(nextIndex: number) {
    setDirection(nextIndex > index ? "next" : "prev");
    setHasChanged(true);
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
      <div
        role="region"
        aria-roledescription="carrusel"
        aria-label="Novedades del catálogo"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(index - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(index + 1);
          }
        }}
        className="clip-corner relative h-[460px] overflow-hidden border border-white/10 bg-white sm:h-[560px] lg:h-[660px] xl:h-[650px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(30,107,30,0.35),transparent_65%)]" />

        {slides.map((slide, slideIndex) => (
          <Link
            key={slide.src}
            href={slide.href}
            aria-hidden={slideIndex !== index}
            tabIndex={slideIndex === index ? 0 : -1}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              slideIndex === index
                ? cn(
                    "z-10 opacity-100",
                    hasChanged &&
                      (direction === "next"
                        ? "hero-slide-in-next"
                        : "hero-slide-in-prev"),
                  )
                : "pointer-events-none opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              sizes="(max-width: 1024px) 100vw, 55vw"
              className={cn(
                "object-contain object-center transition-transform duration-[6000ms] ease-out",
                slideIndex === index ? "scale-100" : "scale-[1.03]",
              )}
            />
          </Link>
        ))}

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-vtr-black via-vtr-black/15 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-vtr-black/80 to-transparent" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-0.5 bg-white/15 motion-reduce:hidden"
        >
          <span
            key={`${index}-${paused}`}
            className="hero-progress block h-full origin-left bg-vtr-amber"
            style={{
              animationDuration: `${AUTOPLAY_MS}ms`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>

        <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 sm:left-5 sm:top-5">
          <span className="clip-corner-sm bg-vtr-amber px-2.5 py-1 font-display text-xs font-extrabold italic leading-none text-vtr-black">
            {counter}
            <span className="text-vtr-black/55"> / {total}</span>
          </span>
          <span className="hidden border border-white/15 bg-vtr-black/65 px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur sm:inline">
            Novedades
          </span>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Imagen anterior"
            className="clip-corner-sm pointer-events-auto grid h-11 w-11 place-items-center border border-white/20 bg-vtr-black/65 text-white backdrop-blur transition-colors hover:border-vtr-amber hover:bg-vtr-black/85 hover:text-vtr-amber sm:h-12 sm:w-12"
          >
            <ArrowRightIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Imagen siguiente"
            className="clip-corner-sm pointer-events-auto grid h-11 w-11 place-items-center border border-white/20 bg-vtr-black/65 text-white backdrop-blur transition-colors hover:border-vtr-amber hover:bg-vtr-black/85 hover:text-vtr-amber sm:h-12 sm:w-12"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>

        <div
          aria-live="polite"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 sm:p-7"
        >
          <div key={index} className="hero-caption-in">
            <p className="flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.22em] text-vtr-amber">
              <span aria-hidden="true" className="h-0.5 w-6 bg-vtr-amber" />
              {active.label}
            </p>
            <p className="mt-2 max-w-[85%] text-2xl leading-[0.95] text-white sm:text-4xl lg:text-3xl">
              {active.title}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-vtr-amber transition-colors hover:text-white sm:text-[12px]">
              Ver productos
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(slideIndex)}
            aria-label={`Ir a ${slide.title}`}
            aria-current={slideIndex === index}
            className={cn(
              "h-1.5 transition-all duration-300",
              slideIndex === index
                ? "w-12 bg-vtr-amber"
                : "w-6 bg-white/25 hover:bg-white/50",
            )}
          />
        ))}
        <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          Catálogo VTR
        </span>
      </div>
    </div>
  );
}
