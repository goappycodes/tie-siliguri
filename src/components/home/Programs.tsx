import Image from "next/image";
import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";

export default function Programs() {
  const { programs } = getHome();

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{programs.eyebrow}</p>
            <h2 className="display-2 mt-5">{programs.headline}</h2>
            <p className="lede mt-6">{programs.subhead}</p>
          </Reveal>
          <Reveal delay={100} className="flex-none">
            <Link href={programs.cta.href} className="btn btn-outline">
              {programs.cta.label}
              <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <Carousel className="mt-10 lg:mt-14" gridClass="sm:grid sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {programs.items.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 100} className="group w-[76%] flex-none snap-start sm:w-auto">
              <Link href={p.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    quality={90}
                    className="object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <span className="absolute top-0 left-0 bg-tie-red px-4 py-2 text-[10.5px] font-bold text-white">
                    {p.kicker}
                  </span>
                </div>

                <div className="border border-t-0 border-line p-5 transition-colors group-hover:border-line-strong max-sm:p-4 lg:p-8">
                  <h3 className="display-3 transition-colors group-hover:text-tie-red max-sm:!text-[16px] max-sm:!leading-[1.2]">{p.name}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-600 max-sm:mt-2 max-sm:text-[13px] max-sm:leading-[1.45]">{p.summary}</p>

                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 max-sm:mt-3 max-sm:gap-x-3">
                    {p.meta.map((m) => (
                      <li
                        key={m}
                        className="flex items-center gap-2 text-[12px] font-semibold text-slate max-sm:text-[11px]"
                      >
                        <span className="h-1 w-1 flex-none bg-tie-red" aria-hidden="true" />
                        {m}
                      </li>
                    ))}
                  </ul>

                  <span className="link-arrow mt-6 max-sm:mt-4">
                    Programme details
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
