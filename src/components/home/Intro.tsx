import Image from "next/image";
import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export default function Intro() {
  const { intro } = getHome();

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">{intro.eyebrow}</p>
          <h2 className="display-2 mt-5">{intro.headline}</h2>
          <div className="mt-7 space-y-5">
            {intro.body.map((p) => (
              <p key={p.slice(0, 24)} className="lede">
                {p}
              </p>
            ))}
          </div>
          <Link href={intro.cta.href} className="link-arrow mt-8">
            {intro.cta.label}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <figure className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={intro.image}
                alt={intro.imageAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                quality={90}
                className="object-cover"
              />
            </div>
            {/* Red corner accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 -z-10 h-28 w-28 bg-tie-red"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
