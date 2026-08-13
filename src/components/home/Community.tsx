import Image from "next/image";
import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export default function Community() {
  const { community } = getHome();

  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28">
      <Image
        src={community.image}
        alt={community.imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-[50%_40%] opacity-20"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/92 to-ink" />
      {/* Halftone globe, anchored top-right as on tie.org */}
      <div
        aria-hidden="true"
        className="globe-motif -top-10 -right-20 h-[20rem] w-[42rem] opacity-30 mix-blend-screen lg:h-[26rem] lg:w-[54rem]"
      />

      <div className="shell relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-tie-red">{community.eyebrow}</p>
            <h2 className="display-2 mt-5 !text-white">{community.headline}</h2>
            <p className="lede mt-6 !text-white/65">{community.subhead}</p>
          </Reveal>
          <Reveal delay={100} className="flex-none">
            <Link href={community.cta.href} className="btn btn-ghost-light">
              {community.cta.label}
              <ArrowRight />
            </Link>
          </Reveal>
        </div>

        {/* Mobile: collapsed accordion, so eight sectors do not become a long
            scroll. Native <details>, so it works without JavaScript. */}
        <ul className="mt-9 border-t border-white/12 sm:hidden">
          {community.sectors.map((sector) => (
            <li key={sector.name} className="border-b border-white/12">
              <details className="group/acc">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5">
                  <span className="text-[11px] font-bold text-tie-red uppercase">
                    {sector.name}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[11px] font-medium text-white/40">
                      {sector.companies.length}
                    </span>
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className="h-3 w-3 flex-none fill-none stroke-white/50 transition-transform group-open/acc:rotate-180"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 4.5 6 7.5 9 4.5" />
                    </svg>
                  </span>
                </summary>
                <ul className="space-y-1.5 pb-4">
                  {sector.companies.map((c) => (
                    <li key={c} className="text-[15px] leading-snug font-normal text-white/75">
                      {c}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>

        {/* Desktop: the full grid. */}
        <ul className="mt-14 hidden gap-px border border-white/12 bg-white/12 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {community.sectors.map((sector, i) => (
            <Reveal as="li" key={sector.name} delay={i * 50} className="bg-ink">
              <div className="flex h-full flex-col p-7 transition-colors duration-300 hover:bg-white/[0.04]">
                <h3 className="text-[11px] font-bold text-tie-red uppercase">
                  {sector.name}
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {sector.companies.map((c) => (
                    <li key={c} className="text-[15px] leading-snug font-normal text-white/75">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
