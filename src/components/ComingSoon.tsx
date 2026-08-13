import Link from "next/link";
import { getSite, type StubPage } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";

/**
 * Placeholder shell used for every page in the sitemap that is not yet built.
 * It still carries the real page title, positioning copy and an outline of what
 * is coming, so the site reads as deliberate rather than unfinished.
 */
export default function ComingSoon({ page }: { page: StubPage }) {
  const site = getSite();

  // Sibling links from the nav, to keep visitors moving.
  const parent = site.nav.find(
    (item) => item.href === page.slug || item.children?.some((c) => c.href === page.slug),
  );
  const siblings = (parent?.children ?? []).filter((c) => c.href !== page.slug);

  return (
    <>
      {/* Page header */}
      <section className="relative isolate overflow-hidden bg-ink py-16 text-white lg:py-24">
        <div aria-hidden="true" className="contours contours-light !opacity-[0.08]" />
        <div
          aria-hidden="true"
          className="globe-motif -top-8 -right-24 h-[16rem] w-[36rem] opacity-25 mix-blend-screen"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-tie-red/15 blur-3xl"
        />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-[11.5px] font-semibold text-white/45 uppercase">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {parent && parent.href !== page.slug && (
                <>
                  <li aria-hidden="true" className="text-white/25">
                    /
                  </li>
                  <li>
                    <Link href={parent.href} className="transition-colors hover:text-white">
                      {parent.label}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true" className="text-white/25">
                /
              </li>
              <li className="text-white/80">{page.title}</li>
            </ol>
          </nav>

          <p className="eyebrow !text-tie-red">{page.eyebrow}</p>
          <h1 className="display-1 mt-5 max-w-4xl !text-[clamp(2.1rem,4.6vw,3.75rem)] !text-white">
            {page.title}
          </h1>
          <p className="lede mt-6 max-w-2xl !text-white/70">{page.summary}</p>
        </div>
      </section>

      {/* Coming soon body */}
      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-3 border border-line bg-paper-alt px-4 py-2.5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tie-red opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tie-red" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.14em] text-ink uppercase">
                Coming soon
              </span>
            </div>

            <h2 className="display-2 mt-7 !text-[clamp(1.6rem,3vw,2.5rem)]">
              This page is being built.
            </h2>
            <p className="lede mt-6">
              We are publishing the TiE Siliguri site in stages. This section is next up — in the
              meantime, the chapter team can answer anything you need directly.
            </p>

            {page.bullets?.length ? (
              <div className="mt-10">
                <p className="eyebrow-plain">What will be here</p>
                <ul className="mt-5 space-y-3.5">
                  {page.bullets.map((b) => (
                    <li key={b} className="flex gap-3.5">
                      <span className="tick mt-1.5" aria-hidden="true" />
                      <span className="text-[16px] leading-relaxed text-ink-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${site.contact.email}`} className="btn btn-primary">
                Email the chapter team
                <ArrowRight />
              </a>
              <Link href="/" className="btn btn-outline">
                Back to home
              </Link>
            </div>
          </div>

          {/* Aside: contact + siblings */}
          <aside className="space-y-8">
            <div className="border-t-2 border-tie-red bg-paper-alt p-8">
              <p className="eyebrow-plain">Talk to us</p>
              <dl className="mt-5 space-y-4 text-[14px]">
                <div>
                  <dt className="text-[10.5px] font-bold tracking-[0.1em] text-slate uppercase">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-bold text-ink underline decoration-tie-red decoration-2 underline-offset-4 hover:text-tie-red"
                    >
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] font-bold tracking-[0.1em] text-slate uppercase">
                    Phone
                  </dt>
                  {site.contact.phones.map((p) => (
                    <dd key={p} className="mt-1">
                      <a href={`tel:${p.replace(/\s/g, "")}`} className="text-ink-700 hover:text-tie-red">
                        {p}
                      </a>
                    </dd>
                  ))}
                </div>
                <div>
                  <dt className="text-[10.5px] font-bold tracking-[0.1em] text-slate uppercase">
                    Location
                  </dt>
                  <dd className="mt-1 text-ink-700">{site.contact.city}</dd>
                </div>
              </dl>
            </div>

            {siblings.length > 0 && (
              <div className="border border-line p-8">
                <p className="eyebrow-plain">Also in {parent!.label}</p>
                <ul className="mt-5 divide-y divide-line">
                  {siblings.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="group flex items-center justify-between gap-3 py-3.5 text-[15px] font-medium text-ink-700 transition-colors hover:text-tie-red"
                      >
                        {s.label}
                        <ArrowRight className="h-3.5 w-3.5 flex-none text-tie-red opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
