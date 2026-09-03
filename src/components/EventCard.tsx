import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Pin } from "@/components/Icons";

/**
 * Event card, used on the Events section pages. Upcoming events carry a summary,
 * time and audience; past events carry a speaker instead. Both share the cover
 * creative + type chip, so one component renders either — fields render only
 * when present. Past events with a photo gallery link to their gallery page.
 */
export type GalleryImage = { src: string; w: number; h: number; alt: string };

export type EventItem = {
  title: string;
  type: string;
  dateLabel?: string;
  time?: string;
  venue?: string;
  summary?: string;
  audience?: string;
  speaker?: string;
  image?: string;
  imageAlt?: string;
  slug?: string;
  gallery?: GalleryImage[];
};

export default function EventCard({ event: e }: { event: EventItem }) {
  return (
    <article className="flex h-full flex-col border border-line bg-white">
      <div className="relative aspect-square overflow-hidden bg-paper-alt">
        {e.image ? (
          <Image
            src={e.image}
            alt={e.imageAlt ?? e.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            quality={90}
            className="object-contain p-2.5"
          />
        ) : (
          /* Branded fallback until the event creative is supplied — mirrors the
             homepage hero treatment so the card reads as intentional. */
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-ink p-6 text-center">
            <div
              aria-hidden="true"
              className="globe-motif -top-10 -right-16 h-[14rem] w-[22rem] opacity-25 mix-blend-screen"
            />
            <h3 className="relative text-[19px] leading-tight font-extrabold text-white max-sm:text-[17px]">
              {e.title}
            </h3>
          </div>
        )}
        <span className="absolute bottom-0 left-0 bg-ink px-2.5 py-1.5 text-[10px] font-bold tracking-[0.02em] text-white">
          {e.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-7">
        {e.audience && (
          <span className="text-[10.5px] font-bold tracking-[0.02em] text-slate">
            {e.audience}
          </span>
        )}

        <h3 className="mt-3 text-[19px] leading-tight font-bold text-ink max-sm:text-[17px]">
          {e.title}
        </h3>

        {e.summary && (
          <p className="mt-4 text-[14.5px] leading-relaxed font-normal text-ink-600">{e.summary}</p>
        )}

        {e.speaker && (
          <p className="mt-4 text-[14px] leading-relaxed text-ink-600">
            <span className="font-semibold text-ink">Speaker:</span> {e.speaker}
          </p>
        )}

        <dl className="mt-auto space-y-2 border-t border-line pt-5">
          {e.dateLabel && (
            <div className="flex items-center gap-2.5 text-[13.5px] font-semibold text-ink">
              <dt className="sr-only">Date</dt>
              <Calendar className="h-3.5 w-3.5 flex-none text-tie-red" />
              <dd>{e.dateLabel}</dd>
            </div>
          )}
          {e.time && (
            <div className="flex items-center gap-2.5 text-[13.5px] text-slate">
              <dt className="sr-only">Time</dt>
              <Clock className="h-3.5 w-3.5 flex-none text-tie-red" />
              <dd>{e.time}</dd>
            </div>
          )}
          {e.venue && (
            <div className="flex items-start gap-2.5 text-[13.5px] text-slate">
              <dt className="sr-only">Venue</dt>
              <Pin className="mt-0.5 h-3.5 w-3.5 flex-none text-tie-red" />
              <dd>{e.venue}</dd>
            </div>
          )}
        </dl>

        {e.slug && e.gallery?.length ? (
          <Link href={e.slug} className="link-arrow mt-5">
            View photos ({e.gallery.length})
            <ArrowRight />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
