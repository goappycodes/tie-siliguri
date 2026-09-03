"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/components/EventCard";
import Reveal from "@/components/Reveal";
import { Close } from "@/components/Icons";

export default function EventPhotoGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const isOpen = open !== null;

  const go = useCallback(
    (dir: number) => {
      setOpen((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length));
    },
    [images.length],
  );

  // Keyboard navigation + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, go]);

  const current = open !== null ? images[open] : null;

  return (
    <>
      {/* Masonry thumbnails — each opens the lightbox. */}
      <ul className="mt-10 gap-4 [column-gap:1rem] sm:[column-gap:1.25rem] columns-1 sm:columns-2 lg:columns-3">
        {images.map((img, i) => (
          <Reveal as="li" key={img.src} delay={(i % 3) * 50} className="mb-4 break-inside-avoid sm:mb-5">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
              className="group relative block w-full overflow-hidden bg-ink"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                quality={82}
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
            </button>
          </Reveal>
        ))}
      </ul>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${(open ?? 0) + 1} of ${images.length}`}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          {/* Top bar: counter + close */}
          <div className="flex flex-none items-center justify-between px-5 py-4 text-white sm:px-8">
            <span className="text-[13px] font-semibold tracking-[0.02em] text-white/70">
              {(open ?? 0) + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-3 pb-6 sm:px-16">
            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                go(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-tie-red sm:left-5"
            >
              <Arrow dir="left" />
            </button>

            {/* Clicking the image itself should not close the lightbox. */}
            <div className="relative flex max-h-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.w}
                height={current.h}
                quality={88}
                priority
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>

            <button
              type="button"
              onClick={(ev) => {
                ev.stopPropagation();
                go(1);
              }}
              aria-label="Next photo"
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-tie-red sm:right-5"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
