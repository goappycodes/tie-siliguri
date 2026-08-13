import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";

export default function Pillars() {
  const { pillars } = getHome();

  return (
    <section className="border-y border-line bg-paper-alt py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="eyebrow">{pillars.eyebrow}</p>
            <h2 className="display-2 mt-5">{pillars.headline}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">{pillars.subhead}</p>
            <p className="mt-5 text-lg leading-snug font-bold text-tie-red sm:text-xl">
              {pillars.punchline}
            </p>
          </Reveal>
        </div>

        {/* Five pillars fill five of six cells; the sixth becomes a CTA so the
            grid reads as deliberate rather than short one card. */}
        <Carousel
          className="mt-10 lg:mt-14"
          gridClass="sm:grid sm:grid-cols-2 sm:gap-px sm:border sm:border-line sm:bg-line lg:grid-cols-3"
        >
          {pillars.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 70} className="group w-[72%] flex-none snap-start border border-line bg-white sm:w-auto sm:border-0">
              <div className="flex h-full flex-col p-6 transition-colors duration-300 group-hover:bg-ink max-sm:p-4 lg:p-9">
                <div className="flex items-center gap-3.5">
                  <span className="tick" aria-hidden="true" />
                  <h3 className="display-3 !text-[1.25rem] transition-colors group-hover:!text-white max-sm:!text-[15px]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600 transition-colors group-hover:text-white/65 max-sm:mt-2 max-sm:text-[13px] max-sm:leading-[1.45]">
                  {item.body}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-auto pt-6 text-[11px] max-sm:pt-4 font-bold tracking-[0.14em] text-line-strong transition-colors group-hover:text-tie-red"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}

          <Reveal as="li" delay={pillars.items.length * 70} className="w-[72%] flex-none snap-start bg-tie-red sm:w-auto">
            <Link
              href={pillars.cta.href}
              className="group/cta flex h-full flex-col justify-between p-6 transition-colors duration-300 hover:bg-tie-red-dark lg:p-9"
            >
              <p className="text-[1.25rem] leading-tight font-bold text-white">{pillars.cta.title}</p>
              <span className="mt-8 inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.14em] text-white uppercase">
                {pillars.cta.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </Carousel>
      </div>
    </section>
  );
}
