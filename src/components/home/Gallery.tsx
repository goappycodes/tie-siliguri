import Image from "next/image";
import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export default function Gallery() {
  const { gallery } = getHome();

  return (
    <section className="border-t border-line bg-paper-alt py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="eyebrow">{gallery.eyebrow}</p>
            <h2 className="display-2 mt-5">{gallery.headline}</h2>
          </Reveal>
          <Reveal delay={100} className="flex-none">
            <Link href={gallery.cta.href} className="link-arrow">
              {gallery.cta.label}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Reveal>
        </div>

        {/* Editorial mosaic on a fixed row height, so wide and square cells tile
            flush with no orphan at the end. Spans repeat: wide, square, square. */}
        <ul className="mt-12 grid grid-cols-2 gap-3 [grid-auto-rows:11rem] sm:gap-4 sm:[grid-auto-rows:13rem] lg:grid-cols-4 lg:[grid-auto-rows:15.5rem]">
          {gallery.images.map((img, i) => {
            const wide = i % 3 === 0;
            return (
              <Reveal as="li" key={img.src} delay={i * 60} className={wide ? "col-span-2" : ""}>
                <figure className="group relative h-full overflow-hidden bg-ink">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={wide ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    quality={90}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10 text-[11.5px] leading-snug font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {img.alt}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
