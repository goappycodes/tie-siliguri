import Link from "next/link";
import { getEvents, getHome } from "@/lib/content";
import { ArrowRight, Calendar, Clock, Pin } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export default function EventsStrip() {
  const { events } = getHome();
  const upcoming = getEvents().upcoming.slice(0, 3);

  return (
    <section className="bg-white py-20 lg:py-28">
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

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {upcoming.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 90}>
              <Link
                href={e.href}
                className="group flex h-full flex-col border border-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_50px_-20px_rgba(17,17,17,0.28)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-ink px-2.5 py-1.5 text-[10px] font-bold tracking-[0.1em] text-white uppercase transition-colors group-hover:bg-tie-red">
                    {e.type}
                  </span>
                  <span className="text-[10.5px] font-bold tracking-[0.08em] text-slate uppercase">
                    {e.audience}
                  </span>
                </div>

                <h3 className="mt-6 text-[19px] leading-tight font-bold text-ink transition-colors group-hover:text-tie-red">
                  {e.title}
                </h3>

                <p className="mt-4 text-[13.5px] leading-relaxed font-normal text-ink-600">{e.summary}</p>

                <dl className="mt-6 space-y-2 border-t border-line pt-5">
                  <div className="flex items-center gap-2.5 text-[12.5px] font-semibold text-ink">
                    <dt className="sr-only">Date</dt>
                    <Calendar className="h-3.5 w-3.5 flex-none text-tie-red" />
                    <dd>{e.dateLabel}</dd>
                  </div>
                  <div className="flex items-center gap-2.5 text-[12.5px] text-slate">
                    <dt className="sr-only">Time</dt>
                    <Clock className="h-3.5 w-3.5 flex-none text-tie-red" />
                    <dd>{e.time}</dd>
                  </div>
                  <div className="flex items-start gap-2.5 text-[12.5px] text-slate">
                    <dt className="sr-only">Venue</dt>
                    <Pin className="mt-0.5 h-3.5 w-3.5 flex-none text-tie-red" />
                    <dd>{e.venue}</dd>
                  </div>
                </dl>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
