import Link from "next/link";
import { getHome } from "@/lib/content";
import { ArrowRight } from "@/components/Icons";
import Avatar from "@/components/Avatar";
import Reveal from "@/components/Reveal";

export default function Leadership() {
  const { leadership } = getHome();
  const [president, ...rest] = leadership.members;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{leadership.eyebrow}</p>
            <h2 className="display-2 mt-5">{leadership.headline}</h2>
            <p className="lede mt-6">{leadership.subhead}</p>
          </Reveal>
          <Reveal delay={100} className="flex-none">
            <Link href={leadership.cta.href} className="btn btn-outline">
              {leadership.cta.label}
              <ArrowRight />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* President — featured */}
          <Reveal className="lg:row-span-2">
            <article className="flex h-full flex-col justify-between bg-ink p-8 text-white lg:p-10">
              <div>
                <Avatar src={president.photo} name={president.name} size={96} tone="dark" />
                <span className="mt-7 inline-block bg-tie-red px-3 py-1.5 text-[10.5px] font-bold tracking-[0.12em] text-white uppercase">
                  {president.role}
                </span>
                <h3 className="mt-5 text-3xl leading-none font-extrabold !text-white lg:text-4xl">
                  {president.name}
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-white/60">{president.company}</p>
              </div>
              <p className="mt-10 border-t border-white/12 pt-6 text-[12px] font-medium text-white/40 uppercase">
                Executive Committee 2026–27
              </p>
            </article>
          </Reveal>

          {/* The rest of the EC */}
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-2">
            {rest.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 60} className="bg-white">
                <div className="flex h-full items-start gap-4 p-6 transition-colors hover:bg-paper-alt">
                  <Avatar src={m.photo} name={m.name} />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold tracking-[0.1em] text-tie-red uppercase">
                      {m.role}
                    </p>
                    <h3 className="mt-1.5 text-[16px] leading-tight font-bold text-ink">{m.name}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-snug font-normal text-slate">{m.company}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Mentors */}
        <Reveal delay={80} className="mt-12">
          <div className="border-t-2 border-tie-red bg-paper-alt p-8 lg:p-10">
            <p className="eyebrow-plain">{leadership.mentorsLabel}</p>
            <ul className="mt-7 grid gap-8 sm:grid-cols-2 lg:gap-12">
              {leadership.mentors.map((m) => (
                <li key={m.name} className="flex items-start gap-4">
                  <Avatar src={m.photo} name={m.name} />
                  <div>
                    <h3 className="text-[16px] leading-tight font-bold text-ink">{m.name}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-snug font-normal text-ink-600">{m.role}</p>
                    <p className="mt-1 text-[12.5px] leading-snug font-normal text-slate">{m.company}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
