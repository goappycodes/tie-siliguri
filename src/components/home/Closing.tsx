import Link from "next/link";
import { getHome, getSite } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export default function Closing() {
  const { closing } = getHome();
  const site = getSite();

  return (
    <section className="relative isolate overflow-hidden bg-tie-red py-20 text-white lg:py-28">
      {/* TiE Global's topographic contour artwork, tinted dark over brand red */}
      <div aria-hidden="true" className="contours contours-dark" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 -right-24 h-[40rem] w-[40rem] rounded-full bg-white/[0.07] blur-2xl"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-20">
        <Reveal>
          <p className="text-[11px] font-bold text-white/70">
            {closing.eyebrow}
          </p>
          <h2 className="display-2 mt-5 !text-white">{closing.headline}</h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85">{closing.subhead}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href={closing.primaryCta.href}
              className="btn flex-1 bg-white !text-tie-red hover:bg-ink hover:!text-white"
            >
              {closing.primaryCta.label}
              <ArrowRight />
            </Link>
            <Link
              href={closing.secondaryCta.href}
              className="btn flex-1 border-[1.5px] border-white/50 text-white hover:border-white hover:bg-white/10"
            >
              {closing.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-8 space-y-1.5 border-t border-white/25 pt-7 text-[14.5px]">
            <a
              href={`mailto:${site.contact.email}`}
              className="block font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              {site.contact.email}
            </a>
            {site.contact.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="block text-white/80 hover:text-white"
              >
                {p}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
