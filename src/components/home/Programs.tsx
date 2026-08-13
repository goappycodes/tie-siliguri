import Image from "next/image";
import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export default function Programs() {
  const { programs } = getHome();

  return (
    <section className="bg-white py-20 lg:py-28">
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

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {programs.items.map((p, i) => (
            <Reveal as="article" key={p.name} delay={i * 100} className="group">
              <Link href={p.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                  />
                  <span className="absolute top-0 left-0 bg-tie-red px-4 py-2 text-[10.5px] font-bold tracking-[0.12em] text-white uppercase">
                    {p.kicker}
                  </span>
                </div>

                <div className="border border-t-0 border-line p-7 transition-colors group-hover:border-line-strong lg:p-8">
                  <h3 className="display-3 transition-colors group-hover:text-tie-red">{p.name}</h3>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-600">{p.summary}</p>

                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {p.meta.map((m) => (
                      <li
                        key={m}
                        className="flex items-center gap-2 text-[12px] font-semibold text-slate"
                      >
                        <span className="h-1 w-1 flex-none bg-tie-red" aria-hidden="true" />
                        {m}
                      </li>
                    ))}
                  </ul>

                  <span className="link-arrow mt-7">
                    Programme details
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
