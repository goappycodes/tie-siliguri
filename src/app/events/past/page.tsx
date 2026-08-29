import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEvents } from "@/lib/content";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

const { pages, past, gallery } = getEvents();
const p = pages.past;

export const metadata: Metadata = {
  title: p.title,
  description: p.summary,
  openGraph: { title: p.title, description: p.summary },
};

export default function PastEventsPage() {
  return (
    <>
      <PageHeader slug={p.slug} eyebrow={p.eyebrow} title={p.title} summary={p.summary} />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          {past.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {past.map((e, i) => (
                <Reveal as="li" key={e.title} delay={(i % 3) * 80}>
                  <EventCard event={e} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="lede max-w-2xl">{p.empty}</p>
          )}

          <div className="mt-12">
            <Link href="/events/upcoming" className="btn btn-primary">
              See what's coming up
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {gallery?.images?.length ? (
        <section className="border-t border-line bg-paper-alt py-14 sm:py-20 lg:py-24">
          <div className="shell">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">{gallery.eyebrow}</p>
              <h2 className="display-2 mt-5">{gallery.headline}</h2>
              {gallery.summary && <p className="lede mt-5">{gallery.summary}</p>}
            </Reveal>

            {/* Masonry columns so every photo shows at its full, natural aspect
                ratio — nothing is cropped. Cards flow top-to-bottom per column. */}
            <ul className="mt-12 gap-4 [column-gap:1rem] sm:[column-gap:1.25rem] columns-1 sm:columns-2 lg:columns-3">
              {gallery.images.map((img, i) => (
                <Reveal as="li" key={img.src} delay={(i % 3) * 60} className="mb-4 break-inside-avoid sm:mb-5">
                  <figure className="group relative overflow-hidden bg-ink">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.w}
                      height={img.h}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      quality={90}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10 text-[11.5px] leading-snug font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {img.alt}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
