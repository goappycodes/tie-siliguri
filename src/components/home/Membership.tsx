import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export default function Membership() {
  const { membership } = getHome();

  return (
    <section className="border-y border-line bg-paper-alt py-20 lg:py-28">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{membership.eyebrow}</p>
          <h2 className="display-2 mt-5">{membership.headline}</h2>
          <p className="lede mt-6">{membership.subhead}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {membership.tiers.map((tier, i) => (
            <Reveal as="article" key={tier.name} delay={i * 110}>
              <div
                className={`flex h-full flex-col p-8 lg:p-10 ${
                  tier.featured
                    ? "bg-ink text-white shadow-[0_28px_70px_-28px_rgba(17,17,17,0.5)]"
                    : "border border-line bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`display-3 ${tier.featured ? "!text-white" : ""}`}>{tier.name}</h3>
                    <p
                      className={`mt-2 text-[11px] font-bold tracking-[0.1em] uppercase ${
                        tier.featured ? "text-tie-red" : "text-slate"
                      }`}
                    >
                      {tier.access}
                    </p>
                  </div>
                  {tier.featured && (
                    <span className="flex-none bg-tie-red px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-white uppercase">
                      By invitation
                    </span>
                  )}
                </div>

                <dl
                  className={`mt-7 space-y-3 border-t pt-6 text-[13.5px] ${
                    tier.featured ? "border-white/12" : "border-line"
                  }`}
                >
                  {[
                    { k: "Who it's for", v: tier.for },
                    { k: "Stage", v: tier.stage },
                    { k: "Your role", v: tier.role },
                  ].map((row) => (
                    <div key={row.k} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                      <dt
                        className={`text-[10.5px] font-bold tracking-[0.08em] uppercase ${
                          tier.featured ? "text-white/40" : "text-slate"
                        }`}
                      >
                        {row.k}
                      </dt>
                      <dd className={tier.featured ? "text-white/80" : "text-ink-600"}>{row.v}</dd>
                    </div>
                  ))}
                </dl>

                <ul
                  className={`mt-7 space-y-3 border-t pt-6 ${
                    tier.featured ? "border-white/12" : "border-line"
                  }`}
                >
                  {tier.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="tick mt-1.5" aria-hidden="true" />
                      <span
                        className={`text-[13.5px] leading-relaxed ${
                          tier.featured ? "text-white/75" : "text-ink-600"
                        }`}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                <dl
                  className={`mt-auto grid grid-cols-2 gap-6 border-t pt-7 ${
                    tier.featured ? "border-white/12" : "border-line"
                  }`}
                >
                  {tier.fees.map((f) => (
                    <div key={f.label}>
                      <dt
                        className={`text-[10.5px] font-bold tracking-[0.08em] uppercase ${
                          tier.featured ? "text-white/40" : "text-slate"
                        }`}
                      >
                        {f.label}
                      </dt>
                      <dd
                        className={`mt-1.5 text-2xl font-extrabold tracking-tight ${
                          tier.featured ? "text-white" : "text-ink"
                        }`}
                      >
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href={tier.cta.href}
                  className={`btn mt-8 w-full ${tier.featured ? "btn-primary" : "btn-dark"}`}
                >
                  {tier.cta.label}
                  <ArrowRight />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-10 text-center">
          <Link href={membership.compareCta.href} className="link-arrow">
            {membership.compareCta.label}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
