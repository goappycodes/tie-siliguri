import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import LogoSlot from "@/components/LogoSlot";
import Reveal from "@/components/Reveal";

export default function Trust() {
  const { trust } = getHome();

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{trust.eyebrow}</p>
            <h2 className="display-2 mt-5">{trust.headline}</h2>
            <p className="lede mt-6">{trust.body}</p>
            <p className="mt-7 text-lg leading-snug font-bold text-tie-red">{trust.punchline}</p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {trust.organisations.map((org) => (
                <li
                  key={org.name}
                  className="flex min-h-[7.5rem] flex-col items-center justify-center gap-3 bg-white p-4 transition-colors hover:bg-paper-alt"
                >
                  <LogoSlot src={org.logo} name={org.name} height={34} />
                  <span className="text-center text-[11.5px] leading-tight font-semibold text-ink-700">
                    {org.name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11.5px] leading-relaxed font-normal text-slate">
              Organisations that have partnered with TiE chapters and programs globally.
            </p>
          </Reveal>
        </div>

        {/* Chapter partners */}
        <Reveal delay={80} className="mt-16">
          <div className="border-t border-line pt-10">
            <p className="eyebrow-plain">{trust.partnersLabel}</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {trust.partners.map((p) => (
                <li key={p.name}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col gap-5 border border-line p-7 transition-all duration-300 hover:border-tie-red hover:shadow-[0_16px_40px_-18px_rgba(226,30,36,0.3)]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <LogoSlot
                        src={p.logo}
                        name={p.name}
                        height={44}
                        className="max-w-[62%] flex-none"
                      />
                      <ArrowRight className="h-4 w-4 flex-none text-tie-red transition-transform group-hover:translate-x-1" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[17px] leading-tight font-bold text-ink transition-colors group-hover:text-tie-red">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-[11px] font-bold text-slate">
                        {p.role}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
