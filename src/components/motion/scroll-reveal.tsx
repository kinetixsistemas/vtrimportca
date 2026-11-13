"use client";

import { useEffect } from "react";

const REVEAL_KEYFRAMES: Keyframe[] = [
  { opacity: 0, transform: "translate3d(0, 26px, 0)" },
  { opacity: 1, transform: "translate3d(0, 0, 0)" },
];

const REVEAL_TIMING: KeyframeAnimationOptions = {
  duration: 650,
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
};

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.animate(REVEAL_KEYFRAMES, REVEAL_TIMING);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    function observeAll() {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          if (observed.has(element)) return;
          observed.add(element);
          observer.observe(element);
        });
    }

    observeAll();

    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
