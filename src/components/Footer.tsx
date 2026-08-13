import Image from "next/image";
import Link from "next/link";
import { getSite } from "@/lib/content";

const site = getSite();

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/60">
      {/* Top: brand + sitemap */}
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.15fr_2fr] lg:gap-16 lg:py-20">
        <div>
          <Link href="/" aria-label={`${site.chapter.name} — home`} className="inline-block">
            <span className="inline-block bg-white px-4 py-3">
              <Image
                src={site.chapter.logo}
                alt={`${site.chapter.name} — ${site.chapter.tagline}`}
                width={600}
                height={219}
                className="h-9 w-auto"
              />
            </span>
          </Link>

          <p className="mt-6 max-w-md text-[13.5px] leading-relaxed">{site.footer.blurb}</p>

          <dl className="mt-7 space-y-2.5 text-[13.5px]">
            <div>
              <dt className="sr-only">Email</dt>
              <dd>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-semibold text-white transition-colors hover:text-tie-red"
                >
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-4">
              <dt className="sr-only">Phone</dt>
              {site.contact.phones.map((p) => (
                <dd key={p}>
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                    {p}
                  </a>
                </dd>
              ))}
            </div>
            <div>
              <dt className="sr-only">Location</dt>
              <dd>{site.contact.city}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 px-4 py-2 text-[11px] font-bold tracking-[0.1em] uppercase transition-colors hover:border-tie-red hover:bg-tie-red hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Sitemap */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
          {site.nav
            .filter((i) => i.children?.length)
            .map((item) => (
              <div key={item.href}>
                <h3 className="text-[11px] font-bold tracking-[0.12em] text-white uppercase">
                  <Link href={item.href} className="transition-colors hover:text-tie-red">
                    {item.label}
                  </Link>
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {item.children!.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="text-[13px] leading-snug transition-colors hover:text-white"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.12em] text-white uppercase">More</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/contact" className="text-[13px] transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
              {site.footer.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.footer.globalLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] transition-colors hover:text-white"
                >
                  {site.footer.globalLink.label} ↗
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-6 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.footer.copyrightHolder}. All rights reserved.
          </p>
          <p className="text-white/40">
            {site.chapter.tagline} · Hub chapter: {site.chapter.hubChapter}
          </p>
        </div>
      </div>

      {/* Brand rule, echoing the TiE deck footer */}
      <div className="h-1.5 bg-tie-red" />
    </footer>
  );
}
