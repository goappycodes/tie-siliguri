"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getHome } from "@/lib/content";
import { Close, Play } from "@/components/Icons";
import Reveal from "@/components/Reveal";

/**
 * The "1st year of TiE Siliguri" film. The video is click-to-play in a modal so
 * the 13 MB file never loads on first paint — only the poster does.
 */
export default function YearOne() {
  const { yearOne } = getHome();
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    videoRef.current?.pause();
    setOpen(false);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    videoRef.current?.play().catch(() => {
      /* autoplay may be blocked; the native controls remain available */
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
      {/* TiE contour artwork in white over ink, plus a faint brand wash */}
      <div aria-hidden="true" className="contours contours-light !opacity-[0.09]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-tie-red/12 blur-3xl"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow !text-tie-red">{yearOne.eyebrow}</p>
          <h2 className="display-2 mt-5 !text-white">{yearOne.headline}</h2>
          <p className="lede mt-6 !text-white/65">{yearOne.body}</p>

          <dl className="mt-11 grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3">
            {yearOne.stats.map((s) => (
              <div key={s.label} className="grid border-l-2 border-tie-red pl-4">
                <dt className="row-start-2 mt-2 text-[11px] leading-tight font-semibold tracking-[0.08em] text-white/50 uppercase">
                  {s.label}
                </dt>
                <dd className="row-start-1 text-3xl leading-none font-extrabold text-white sm:text-4xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Poster / play trigger */}
        <Reveal delay={120}>
          <button
            ref={openerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Play the film: ${yearOne.headline}`}
            className="group relative block w-full cursor-pointer overflow-hidden text-left"
          >
            <div className="relative aspect-video">
              <Image
                src={yearOne.poster}
                alt="A still from the TiE Siliguri year one film"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
              />
            </div>

            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-tie-red text-white shadow-[0_10px_40px_-6px_rgba(226,30,36,0.7)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-tie-red">
                <Play className="ml-1 h-7 w-7" />
              </span>
            </span>

            <span className="absolute bottom-0 left-0 flex items-center gap-3 p-6">
              <span className="text-[11px] font-bold tracking-[0.14em] text-white/80 uppercase">
                {yearOne.videoLabel}
              </span>
            </span>
          </button>
        </Reveal>
      </div>

      {/* Modal player */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TiE Siliguri year one film"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white sm:top-6 sm:right-6"
          >
            <Close className="h-6 w-6" />
          </button>

          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            poster={yearOne.poster}
            className="max-h-full w-full max-w-6xl bg-black shadow-2xl"
          >
            <source src={yearOne.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </section>
  );
}
