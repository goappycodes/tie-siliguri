import Image from "next/image";
import Link from "next/link";
import { getEvents, getHome } from "@/lib/content";
import { ArrowRight, Calendar, Clock, Pin } from "@/components/Icons";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";

export default function EventsStrip() {
  const { events } = getHome();
  const upcoming = getEvents().upcoming.slice(0, 3);

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="eyebrow">{events.eyebrow}</p>
            <h2 className="display-2 mt-5">{events.headline}</h2>
          </Reveal>
          <Reveal delay={100} className="flex-none">
            <Link href={events.cta.href} className="link-arrow">
              {events.cta.label}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Reveal>
        </div>

        <Carousel className="mt-10 lg:mt-12" gridClass="sm:grid sm:gap-6 lg:grid-cols-3">
          {upcoming.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 90} className="w-[82%] flex-none snap-start sm:w-auto">
              <Link
                href={e.href}
                className="group flex h-full flex-col border border-line transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_50px_-20px_rgba(17,17,17,0.28)]"
              >
                {/* Cover — the event's own creative. Anchored to the top so the
                    title block of the artwork stays in frame when cropped. */}
                <div className="relative aspect-[16/11] overflow-hidden bg-paper-alt">
                  <Image
                    src={e.image}
                    alt={e.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Anchored bottom-left: the creatives carry the TiE logo
                      top-left, so a top chip would sit on top of it. */}
                  <span className="absolute bottom-0 left-0 bg-ink px-2.5 py-1.5 text-[10px] font-bold tracking-[0.1em] text-white uppercase transition-colors group-hover:bg-tie-red">
                    {e.type}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 lg:p-7">
                  <span className="text-[10.5px] font-bold tracking-[0.08em] text-slate uppercase">
                    {e.audience}
                  </span>

                  <h3 className="mt-3 text-[19px] leading-tight font-bold text-ink transition-colors group-hover:text-tie-red">
                    {e.title}
                  </h3>

                  <p className="mt-4 text-[14.5px] leading-relaxed font-normal text-ink-600">
                    {e.summary}
                  </p>

                  {/* mt-auto keeps the date/venue block flush to the card
                      bottom so it lines up across all three cards. */}
                  <dl className="mt-auto space-y-2 border-t border-line pt-5">
                    <div className="flex items-center gap-2.5 text-[13.5px] font-semibold text-ink">
                      <dt className="sr-only">Date</dt>
                      <Calendar className="h-3.5 w-3.5 flex-none text-tie-red" />
                      <dd>{e.dateLabel}</dd>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13.5px] text-slate">
                      <dt className="sr-only">Time</dt>
                      <Clock className="h-3.5 w-3.5 flex-none text-tie-red" />
                      <dd>{e.time}</dd>
                    </div>
                    <div className="flex items-start gap-2.5 text-[13.5px] text-slate">
                      <dt className="sr-only">Venue</dt>
                      <Pin className="mt-0.5 h-3.5 w-3.5 flex-none text-tie-red" />
                      <dd>{e.venue}</dd>
                    </div>
                  </dl>
                </div>
              </Link>
            </Reveal>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
