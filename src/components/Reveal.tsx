"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "static" | "hidden" | "shown";

/**
 * Fades + lifts children into view once, without ever making content depend on
 * JavaScript:
 *
 *  - Server render is plain and fully visible ("static"), so the page reads
 *    even if JS is disabled, blocked, or slow to hydrate.
 *  - On mount, anything already within the viewport stays visible with no
 *    animation, which avoids a flash of content disappearing then fading back.
 *  - Only elements still below the fold get hidden and animated on scroll.
 *
 * Disabled wholesale by prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") return; // stay "static"

    // Already on screen: leave it as-is rather than animating it out and back.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setPhase("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const phaseClass = phase === "hidden" ? "reveal-hidden" : phase === "shown" ? "reveal-shown" : "";

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${phaseClass} ${className}`.trim()}
      style={delay && phase !== "static" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
